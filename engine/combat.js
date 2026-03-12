// engine/combat.js
// Combat engine: auto-combat AI, damage formulas, spells, consumables.

import { chance } from '../util/random.js';
import { canAfford, spend } from './resources.js';
import { addJournalEntry } from '../ui/notifications.js';

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Returns the discipline of a completed node by looking it up in data.
 */
function getNodeDiscipline(data, nodeId) {
  const nodes = (data.disciplines && data.disciplines.nodes) || [];
  const node = nodes.find((n) => n.id === nodeId);
  return node ? node.discipline : null;
}

/**
 * Returns the tier of a completed node.
 */
function getNodeTier(data, nodeId) {
  const nodes = (data.disciplines && data.disciplines.nodes) || [];
  const node = nodes.find((n) => n.id === nodeId);
  return node ? node.tier : 0;
}

/**
 * Returns the highest tier among all completed research nodes.
 */
function getHighestCompletedTier(state, data) {
  let highest = 0;
  for (const nodeId of state.research.completed) {
    const tier = getNodeTier(data, nodeId);
    if (tier > highest) highest = tier;
  }
  return highest;
}

/**
 * Returns true if the player has at least one Tier 2 research node completed.
 */
function hasTier2Completed(state, data) {
  return state.research.completed.some((nodeId) => getNodeTier(data, nodeId) >= 2);
}

/**
 * Returns spell definitions available to the player (spells whose discipline
 * has at least one completed research node).
 */
function getAvailableSpells(state, data) {
  const spellDefs = (data.spells && data.spells.spells) || [];
  return spellDefs.filter((spell) => {
    // The spell is available if any completed research node belongs to the same discipline
    return state.research.completed.some(
      (nodeId) => getNodeDiscipline(data, nodeId) === spell.discipline
    );
  });
}

/**
 * Returns the current effective mana of the player.
 */
function getMana(state) {
  return state.resources.mana ? state.resources.mana.amount : 0;
}

/**
 * Awards loot from an encounter to the player.
 * @param {object} state
 * @param {object} encounter - Encounter definition with a loot array.
 * @param {number} fraction  - Fraction of loot to award (1.0 for full, 0.25 for retreat).
 */
function awardLoot(state, encounter, fraction) {
  const loot = encounter.loot || [];
  for (const item of loot) {
    if (!state.resources[item.resource]) {
      state.resources[item.resource] = { amount: 0, totalEarned: 0, totalSpent: 0 };
    }
    const amount = item.amount * fraction;
    state.resources[item.resource].amount += amount;
    state.resources[item.resource].totalEarned += amount;
  }
}

/**
 * Appends a message to the combat log, keeping only the last 10 entries.
 */
function addCombatLog(state, message) {
  state.combat.log.push(message);
  if (state.combat.log.length > 10) {
    state.combat.log.shift();
  }
}

/**
 * Clears the active combat state (but not recovery, health, inventory).
 */
function clearCombat(state) {
  state.combat.active = null;
  state.combat.manualSpell = null;
}

// ---------------------------------------------------------------------------
// Internal: victory / defeat
// ---------------------------------------------------------------------------

function victory(state) {
  const active = state.combat.active;
  if (!active) return;
  awardLoot(state, active.encounter, 1.0);
  addJournalEntry(state, `Victory: defeated ${active.encounter.name}`, 'combat');
  addCombatLog(state, `You defeated ${active.encounter.name}!`);
  clearCombat(state);
}

function defeat(state) {
  const active = state.combat.active;
  if (!active) return;
  const tier = active.encounter.tier || 1;
  state.combat.recovery = 30 * tier;
  addJournalEntry(state, `Defeated by ${active.encounter.name}. Recovery: ${state.combat.recovery}s`, 'combat');
  addCombatLog(state, `You were defeated by ${active.encounter.name}.`);
  clearCombat(state);
}

// ---------------------------------------------------------------------------
// Internal: player turn processing
// ---------------------------------------------------------------------------

/**
 * Resolves a single player attack action.
 * Returns a log message describing what happened.
 */
function executePlayerAction(state, data, spellId) {
  const active = state.combat.active;
  const stats = calculateStats(state, data);
  const encounter = active.encounter;

  // Dodge check: if enemy has dodge flag set, attack misses
  if (active.dodge) {
    active.dodge = false;
    addCombatLog(state, 'Your attack missed! Enemy dodged.');
    return;
  }

  // Determine if this is a spell action or basic attack
  let spellDef = null;
  if (spellId) {
    const spellDefs = (data.spells && data.spells.spells) || [];
    spellDef = spellDefs.find((s) => s.id === spellId);
  }

  // Calculate effective enemy defense (including active debuffs on enemy)
  let enemyDefense = encounter.defense || 0;
  for (const buff of (active.enemyBuffs || [])) {
    if (buff.stat === 'defense') enemyDefense += buff.value;
  }
  // Also check enemy debuffs stored in debuffs array (negative values)
  for (const debuff of (active.debuffs || [])) {
    if (debuff.stat === 'defense') enemyDefense += debuff.value;
  }

  // Calculate arcane_power with active player buffs
  let arcanePower = stats.arcanePower;
  for (const buff of (active.buffs || [])) {
    if (buff.stat === 'arcane_power') arcanePower += buff.value;
  }

  // Instability roll
  const instabilityRoll = 1 + (Math.random() * 2 - 1) * stats.instability;

  if (spellDef) {
    // Spell attack
    const spellDamage = spellDef.base_damage || 0;

    // Weakness/resistance bonus
    let weaknessBonus = 1.0;
    if (spellDef.discipline === encounter.weakness) weaknessBonus = 1.5;
    else if (spellDef.discipline === encounter.resistance) weaknessBonus = 0.5;

    const rawDamage = (arcanePower + spellDamage) * instabilityRoll * weaknessBonus - enemyDefense;
    const damage = Math.max(1, Math.floor(rawDamage));

    // Apply spell effects (heals, buffs, debuffs, shields)
    applySpellEffects(state, spellDef, stats);

    // Spend mana
    const manaCost = spellDef.mana_cost || 0;
    if (state.resources.mana) {
      state.resources.mana.amount = Math.max(0, state.resources.mana.amount - manaCost);
      state.resources.mana.totalSpent = (state.resources.mana.totalSpent || 0) + manaCost;
    }

    // Set cooldown
    state.combat.cooldowns[spellDef.id] = spellDef.cooldown || 0;

    // Apply damage if it's an offensive spell
    if (spellDef.type === 'damage') {
      active.enemyHealth -= damage;
      addCombatLog(state, `You cast ${spellDef.name} for ${damage} damage.`);
    } else {
      addCombatLog(state, `You cast ${spellDef.name}.`);
    }
  } else {
    // Basic attack: arcane_power damage
    const rawDamage = arcanePower * instabilityRoll - enemyDefense;
    const damage = Math.max(1, Math.floor(rawDamage));
    active.enemyHealth -= damage;
    addCombatLog(state, `You strike for ${damage} damage.`);
  }
}

/**
 * Applies effects from a spell: heal, buff, debuff, shield on player.
 */
function applySpellEffects(state, spellDef, stats) {
  const active = state.combat.active;

  // Handle heal type spells
  if (spellDef.type === 'heal') {
    const healAmount = spellDef.heal_amount || 0;
    state.combat.health = Math.min(state.combat.maxHealth, state.combat.health + healAmount);
  }

  // Handle shield type spells
  if (spellDef.type === 'shield') {
    const shieldAmount = spellDef.shield_amount || 0;
    state.combat.shield = (state.combat.shield || 0) + shieldAmount;
  }

  // Handle additional effects array
  const effects = spellDef.effects || [];
  for (const effect of effects) {
    if (effect.target === 'player') {
      if (effect.type === 'buff' || effect.type === 'debuff') {
        active.buffs.push({ stat: effect.stat, value: effect.value, duration: effect.duration });
      }
    } else if (effect.target === 'enemy') {
      if (effect.type === 'debuff') {
        // Store as negative debuff on enemy
        active.debuffs.push({ stat: effect.stat, value: effect.value, duration: effect.duration });
      }
    }
  }
}

/**
 * Runs the auto-combat AI to decide which spell to cast (or basic attack).
 * Returns a spellId or null (for basic attack).
 */
function runAI(state, data) {
  const active = state.combat.active;
  const stats = calculateStats(state, data);
  const stance = state.combat.stance || 'balanced';
  const healthPercent = state.combat.health / state.combat.maxHealth;

  // Determine heal threshold by stance
  let healThreshold;
  if (stance === 'aggressive') healThreshold = 0.15;
  else if (stance === 'defensive') healThreshold = 0.50;
  else healThreshold = 0.30; // balanced

  // Get available spells
  const availableSpells = getAvailableSpells(state, data);
  const cooldowns = state.combat.cooldowns || {};
  const mana = getMana(state);

  // Filter to usable spells (not on cooldown, can afford mana)
  const usable = availableSpells.filter(
    (s) => (cooldowns[s.id] || 0) <= 0 && mana >= (s.mana_cost || 0)
  );

  if (usable.length === 0) return null; // basic attack

  // Priority: healing spells when below threshold
  if (healthPercent <= healThreshold) {
    const healSpell = usable.find((s) => s.type === 'heal');
    if (healSpell) return healSpell.id;
  }

  // Defensive stance: prefer buffs and shields when health is below 75%
  if (stance === 'defensive' && healthPercent < 0.75) {
    const buffOrShield = usable.find((s) => s.type === 'buff' || s.type === 'shield');
    if (buffOrShield) return buffOrShield.id;
  }

  // Select highest priority damage spell
  const damageSpells = usable.filter((s) => s.type === 'damage');
  if (damageSpells.length > 0) {
    // Sort by auto_priority descending, pick highest
    damageSpells.sort((a, b) => (b.auto_priority || 0) - (a.auto_priority || 0));
    return damageSpells[0].id;
  }

  // Fallback: highest priority usable spell
  usable.sort((a, b) => (b.auto_priority || 0) - (a.auto_priority || 0));
  return usable[0].id;
}

// ---------------------------------------------------------------------------
// Exported: calculateStats
// ---------------------------------------------------------------------------

/**
 * Calculates current player combat stats from completed research.
 * Returns { arcanePower, resilience, speed, instability }.
 */
export function calculateStats(state, data) {
  const completed = state.research.completed || [];
  const nodes = (data.disciplines && data.disciplines.nodes) || [];

  let orderNodes = 0;
  let vitalNodes = 0;
  let temporalNodes = 0;
  let chaosNodes = 0;

  for (const nodeId of completed) {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) continue;
    if (node.discipline === 'order_forging') orderNodes++;
    if (node.discipline === 'vital_alchemy') vitalNodes++;
    if (node.discipline === 'temporal_arcana') temporalNodes++;
    if (node.discipline === 'chaos_channeling') chaosNodes++;
  }

  const arcanePower = 10 * completed.length;
  const resilience = 5 * (orderNodes + vitalNodes);
  const speed = Math.min(0.5, temporalNodes * 0.1);
  const instability = chaosNodes * 0.05;

  return { arcanePower, resilience, speed, instability };
}

// ---------------------------------------------------------------------------
// Exported: startCombat
// ---------------------------------------------------------------------------

export function startCombat(state, data, encounterId) {
  const encounters = data.encounters || [];
  const encounterDef = encounters.find((e) => e.id === encounterId);
  if (!encounterDef) return;

  const stats = calculateStats(state, data);

  state.combat.active = {
    encounter: encounterDef,
    enemyHealth: encounterDef.health,
    enemyMaxHealth: encounterDef.health,
    patternIndex: 0,
    buffs: [],        // player buffs: [{ stat, value, duration }]
    debuffs: [],      // enemy debuffs: [{ stat, value, duration }]
    enemyBuffs: [],   // enemy buffs: [{ stat, value, duration }]
    skipNext: false,
    dodge: false,
  };

  state.combat.health = 100 + stats.resilience * 5;
  state.combat.maxHealth = state.combat.health;
  state.combat.cooldowns = {};
  state.combat.log = [];
  state.combat.manualSpell = null;
  state.combat.shield = 0;

  addJournalEntry(state, `Combat started: ${encounterDef.name}`, 'combat');
  addCombatLog(state, `Encounter with ${encounterDef.name} begins!`);
}

// ---------------------------------------------------------------------------
// Exported: castSpell
// ---------------------------------------------------------------------------

export function castSpell(state, data, spellId) {
  state.combat.manualSpell = spellId;
}

// ---------------------------------------------------------------------------
// Exported: setStance
// ---------------------------------------------------------------------------

export function setStance(state, stance) {
  const valid = ['aggressive', 'balanced', 'defensive'];
  if (!valid.includes(stance)) return;
  state.combat.stance = stance;
}

// ---------------------------------------------------------------------------
// Exported: retreat
// ---------------------------------------------------------------------------

export function retreat(state) {
  const active = state.combat.active;
  if (!active) return;
  awardLoot(state, active.encounter, 0.25);
  addJournalEntry(state, `Retreated from ${active.encounter.name}`, 'combat');
  addCombatLog(state, `You retreat from ${active.encounter.name}.`);
  clearCombat(state);
}

// ---------------------------------------------------------------------------
// Exported: useConsumable
// ---------------------------------------------------------------------------

export function useConsumable(state, data, consumableId) {
  const consumables = (data.spells && data.spells.consumables) || [];
  const def = consumables.find((c) => c.id === consumableId);
  if (!def) return false;

  const inventory = state.combat.inventory || {};
  if ((inventory[consumableId] || 0) <= 0) return false;

  state.combat.inventory[consumableId] -= 1;

  // Apply effect immediately
  const effect = def.effect;
  if (!effect) return true;

  if (effect.type === 'heal') {
    state.combat.health = Math.min(state.combat.maxHealth, state.combat.health + effect.value);
    addCombatLog(state, `Used ${def.name}: healed ${effect.value} HP.`);
  } else if (effect.type === 'buff') {
    if (state.combat.active) {
      state.combat.active.buffs.push({
        stat: effect.stat,
        value: effect.value,
        duration: effect.duration,
      });
    }
    addCombatLog(state, `Used ${def.name}: ${effect.stat} buffed by ${effect.value}.`);
  } else if (effect.type === 'damage') {
    if (state.combat.active) {
      state.combat.active.enemyHealth -= effect.value;
      addCombatLog(state, `Used ${def.name}: dealt ${effect.value} damage.`);
    }
  }

  return true;
}

// ---------------------------------------------------------------------------
// Exported: craftConsumable
// ---------------------------------------------------------------------------

export function craftConsumable(state, data, consumableId) {
  const consumables = (data.spells && data.spells.consumables) || [];
  const def = consumables.find((c) => c.id === consumableId);
  if (!def) return false;

  // Check research requirement
  if (def.requires_research && !state.research.completed.includes(def.requires_research)) {
    return false;
  }

  // Check affordability
  if (!canAfford(state, def.craft_cost || {})) return false;

  // Check inventory cap
  const inventory = state.combat.inventory || {};
  if ((inventory[consumableId] || 0) >= (def.max_stack || Infinity)) return false;

  // Spend resources and add to inventory
  spend(state, def.craft_cost || {});
  state.combat.inventory[consumableId] = (state.combat.inventory[consumableId] || 0) + 1;

  return true;
}

// ---------------------------------------------------------------------------
// Exported: tick
// ---------------------------------------------------------------------------

export function tick(state, data) {
  // Step 1: If in recovery, decrement and return
  if (state.combat.recovery > 0) {
    state.combat.recovery -= 1;
    return;
  }

  // Step 2: No active combat — check for auto-encounter trigger
  if (state.combat.active === null) {
    // Only trigger if player has at least one Tier 2 research node completed
    if (!hasTier2Completed(state, data)) return;

    if (chance(0.005)) {
      // Pick a random encounter whose tier <= highest completed tier
      const highestTier = getHighestCompletedTier(state, data);
      const encounters = data.encounters || [];
      const eligible = encounters.filter((e) => e.tier <= highestTier);
      if (eligible.length === 0) return;

      const picked = eligible[Math.floor(Math.random() * eligible.length)];
      startCombat(state, data, picked.id);
    }
    return;
  }

  // Step 3: Active combat — process one round every 2 ticks
  if (state.tick % 2 !== 0) return;

  const active = state.combat.active;

  // --- 3a. Player turn ---
  let spellToUse = null;

  if (state.combat.manualSpell) {
    // Use queued manual spell
    spellToUse = state.combat.manualSpell;
    state.combat.manualSpell = null;
  } else {
    // Run AI
    spellToUse = runAI(state, data);
  }

  executePlayerAction(state, data, spellToUse);

  // --- 3b. Speed check: chance for double action ---
  const stats = calculateStats(state, data);
  if (chance(stats.speed)) {
    // Run another player action
    let spellToUse2 = null;
    if (state.combat.manualSpell) {
      spellToUse2 = state.combat.manualSpell;
      state.combat.manualSpell = null;
    } else {
      spellToUse2 = runAI(state, data);
    }
    executePlayerAction(state, data, spellToUse2);
    addCombatLog(state, 'Double action!');
  }

  // --- 3c. Check enemy death ---
  if (active.enemyHealth <= 0) {
    victory(state);
    return;
  }

  // --- 3d. Enemy turn ---
  if (!active.skipNext) {
    const encounter = active.encounter;
    const pattern = encounter.pattern || [];

    if (pattern.length > 0) {
      const rawAction = pattern[active.patternIndex % pattern.length];
      active.patternIndex = (active.patternIndex + 1) % pattern.length;

      // Parse action name (may be "special:actionName")
      let actionType = rawAction;
      let specialKey = null;
      if (rawAction.startsWith('special:')) {
        actionType = 'special';
        specialKey = rawAction.slice('special:'.length);
      }

      // Get effective enemy attack (including buffs)
      let enemyAttack = encounter.attack || 0;
      for (const buff of (active.enemyBuffs || [])) {
        if (buff.stat === 'attack') enemyAttack += buff.value;
      }

      // Get effective player resilience (including active buffs)
      let playerResilience = stats.resilience;
      for (const buff of (active.buffs || [])) {
        if (buff.stat === 'resilience') playerResilience += buff.value;
        if (buff.stat === 'defense') playerResilience += buff.value;
      }

      switch (actionType) {
        case 'strike': {
          const damage = Math.max(1, enemyAttack - playerResilience);
          applyDamageToPlayer(state, damage);
          addCombatLog(state, `${encounter.name} strikes for ${damage} damage.`);
          break;
        }
        case 'heavy_strike': {
          const damage = Math.max(1, enemyAttack * 2 - playerResilience);
          applyDamageToPlayer(state, damage);
          active.skipNext = true;
          addCombatLog(state, `${encounter.name} heavy strikes for ${damage} damage!`);
          break;
        }
        case 'dodge': {
          active.dodge = true;
          addCombatLog(state, `${encounter.name} prepares to dodge.`);
          break;
        }
        case 'buff_self': {
          // Increase enemy attack by 25% for 3 rounds
          const buffValue = Math.floor(encounter.attack * 0.25);
          active.enemyBuffs.push({ stat: 'attack', value: buffValue, duration: 3 });
          addCombatLog(state, `${encounter.name} buffs itself (+${buffValue} attack for 3 rounds).`);
          break;
        }
        case 'debuff_player': {
          // Reduce player arcane_power by 20% for 2 rounds
          const debuffVal = -Math.floor(stats.arcanePower * 0.2);
          active.buffs.push({ stat: 'arcane_power', value: debuffVal, duration: 2 });
          addCombatLog(state, `${encounter.name} debuffs your arcane power (${debuffVal} for 2 rounds).`);
          break;
        }
        case 'heal': {
          const healAmt = Math.floor(active.enemyMaxHealth * 0.15);
          active.enemyHealth = Math.min(active.enemyMaxHealth, active.enemyHealth + healAmt);
          addCombatLog(state, `${encounter.name} heals for ${healAmt} HP.`);
          break;
        }
        case 'special': {
          if (specialKey && encounter.actions && encounter.actions[specialKey]) {
            const specialAction = encounter.actions[specialKey];
            const damage = Math.max(
              1,
              Math.floor((specialAction.damage_multiplier || 1) * enemyAttack - playerResilience)
            );
            if (specialAction.damage_multiplier > 0) {
              applyDamageToPlayer(state, damage);
            }
            // Apply special effects
            for (const effect of (specialAction.effects || [])) {
              if (effect.target === 'player') {
                active.buffs.push({
                  stat: effect.stat,
                  value: effect.value,
                  duration: effect.duration,
                });
              } else if (effect.target === 'self') {
                active.enemyBuffs.push({
                  stat: effect.stat,
                  value: effect.value,
                  duration: effect.duration,
                });
              }
            }
            addCombatLog(state, `${encounter.name} uses ${specialKey} for ${damage} damage.`);
          }
          break;
        }
        default:
          break;
      }
    }
  } else {
    // Skip this enemy turn (from heavy_strike)
    active.skipNext = false;
    addCombatLog(state, `${active.encounter.name} recovers from heavy strike.`);
  }

  // --- 3e. Check player death ---
  if (state.combat.health <= 0) {
    defeat(state);
    return;
  }

  // --- 3f. Decrement cooldowns ---
  const cooldowns = state.combat.cooldowns || {};
  for (const spellId of Object.keys(cooldowns)) {
    if (cooldowns[spellId] > 0) cooldowns[spellId] -= 1;
  }

  // --- 3g. Decrement buff/debuff durations ---
  if (active) {
    active.buffs = active.buffs
      .map((b) => ({ ...b, duration: b.duration - 1 }))
      .filter((b) => b.duration > 0);

    active.debuffs = active.debuffs
      .map((d) => ({ ...d, duration: d.duration - 1 }))
      .filter((d) => d.duration > 0);

    active.enemyBuffs = active.enemyBuffs
      .map((b) => ({ ...b, duration: b.duration - 1 }))
      .filter((b) => b.duration > 0);
  }
}

// ---------------------------------------------------------------------------
// Internal: apply damage to player (accounts for shield)
// ---------------------------------------------------------------------------

function applyDamageToPlayer(state, damage) {
  let remaining = damage;
  const shield = state.combat.shield || 0;
  if (shield > 0) {
    const absorbed = Math.min(shield, remaining);
    state.combat.shield -= absorbed;
    remaining -= absorbed;
  }
  if (remaining > 0) {
    state.combat.health -= remaining;
  }
}
