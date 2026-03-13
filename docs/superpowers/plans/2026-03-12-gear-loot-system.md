# Gear & Loot System Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a full Diablo/RuneScape-inspired equipment system with 8 slots, affix pools, legendaries, sets, salvaging, drag-and-drop paper doll inventory, and engagement hooks.

**Architecture:** All code lives in bundle.js (single IIFE, file:// protocol). Item definitions are inlined as `var itemsData = {...}` alongside existing data vars. New Armory panel follows the existing skeleton+targeted-update DOM pattern. Equipment bonuses are calculated once and cached, then merged into combat stats at combat start and resource rates at tick time.

**Tech Stack:** Vanilla JS, HTML5 Drag and Drop API, CSS animations for loot ceremony.

**Spec:** `docs/superpowers/specs/2026-03-12-gear-loot-system-design.md`

**Code Style:** The existing codebase uses a MIX of ES5 (`var`, `function()`) and ES6+ (`const`, `let`, arrow functions, `for...of`, template literals). Match the style of the section you're editing — combat/engine code uses ES6+, tutorial code uses ES5. When adding new standalone sections, prefer ES6+ (`const`/`let`, arrow functions, template literals) for consistency with the majority of the codebase.

**Compatibility Note:** Avoid `Object.values()` — the codebase does not use it. Use `Object.keys(obj).map(k => obj[k])` or `for...in` loops instead.

**Checkpoint Note:** The game will be in a partially-broken state between Chunks 2-3 (generation pipeline exists but nothing calls it). This is expected — it becomes functional after Task 7 (loot drops from combat). Tasks 1-7 should be implemented sequentially without testing in-browser. After Task 7, the core loop is testable.

---

## Chunk 1: Data & State Foundation

### Task 1: Item Data Definitions

**Files:**
- Create: `data/items.json`
- Modify: `bundle.js` (DATA section, ~line 2490-2700, after encountersData)

- [ ] **Step 1:** Create `data/items.json` with the complete item data structure containing: `materials` array (6 tiers with id, tier, name, color, iLvlRange, gate), `slots` object (8 slots with baseTypes arrays), `baseTypes` object (all 24 base types with slot, name, weights, icon:null), `affixes` array (13 affixes with id, name, type, tiers object mapping tier 1-6 to [min,max] ranges), `rarities` array (6 rarities with id, name, color, affixCount, dropWeight, dustYield), `salvageRecipes` object, `dropSources` object, `pity` thresholds object. Include empty `legendaries` and `sets` arrays (populated in Task 2).

All values come directly from the spec's Section 1 tables (affix ranges, base type weights, material tiers, rarity drop weights/dust yields, salvage costs).

- [ ] **Step 2:** Add `flavorText` array to items.json — all 30 strings from the spec's Section 8F.

- [ ] **Step 3:** Add inline `var itemsData = { ... };` to bundle.js DATA section after `var encountersData`. Copy the JSON content. Follow the exact same pattern as other inline data vars.

- [ ] **Step 4:** Update `loadData()` (~line 5239) to include items in the gameData object:
```javascript
var gameData = {
  resources: resourcesData,
  disciplines: disciplinesData,
  spells: spellsData,
  encounters: encountersData,
  events: eventsData,
  prestige: prestigeData,
  items: itemsData,        // ADD THIS
};
```

- [ ] **Step 5:** Verify bundle.js has no syntax errors:
```bash
node -c bundle.js
```

- [ ] **Step 6:** Commit:
```bash
git add data/items.json bundle.js
git commit -m "feat(gear): add item data definitions and inline itemsData"
```

---

### Task 2: Legendaries & Sets Data

**Files:**
- Modify: `data/items.json`
- Modify: `bundle.js` (itemsData section)

- [ ] **Step 1:** Add `legendaries` array to items.json with all 8 legendaries from the spec's Section 3 table. Each entry:
```json
{
  "id": "wick_eternal_burning",
  "name": "Wick of Eternal Burning",
  "slot": "head",
  "material": "grimsteel",
  "iLvl": 15,
  "affixCount": [3, 4],
  "uniqueEffect": {
    "id": "mana_refund_on_kill",
    "description": "Spells that kill an enemy refund 50% of their mana cost (max 100 mana)",
    "type": "on_kill",
    "value": 0.5,
    "cap": 100
  },
  "flavorText": "The wick never shortens. The flame never dims. Someone paid dearly for that.",
  "icon": null,
  "vfx": null
}
```
Include all 8: Wick of Eternal Burning (head/grimsteel), The Unblinking Eye (amulet/voidglass), Paradox Staff (weapon/astralweave), Robes of the First Arcanist (body/voidglass), Quicksilver Wraps (hands/grimsteel), Wanderer's Paradox (feet/astralweave), Ouroboros Band (ring/voidglass), Convergence Shard (ring/convergence).

- [ ] **Step 2:** Add `sets` array with all 3 sets and their individual piece definitions. Each set:
```json
{
  "id": "temporal_paradox",
  "name": "Temporal Paradox",
  "flavor": "Time bends around those who wear the full regalia.",
  "pieces": [
    { "id": "temporal_paradox_head", "slot": "head", "material": "voidglass", "iLvl": 20, "affixCount": [2,3] },
    { "id": "temporal_paradox_weapon", "slot": "weapon", "material": "voidglass", "iLvl": 20, "affixCount": [2,3] },
    { "id": "temporal_paradox_hands", "slot": "hands", "material": "voidglass", "iLvl": 20, "affixCount": [2,3] },
    { "id": "temporal_paradox_feet", "slot": "feet", "material": "voidglass", "iLvl": 20, "affixCount": [2,3] }
  ],
  "bonuses": {
    "2": { "stats": { "speed": 8 } },
    "3": { "stats": { "cdr_temporal": 2 } },
    "4": { "special": { "id": "temporal_loop", "description": "Once per combat, when you would die, reset to 50% HP and rewind all cooldowns", "type": "on_damaged" } }
  },
  "icon": null,
  "vfx": null
}
```
Include all 3 sets: Temporal Paradox (4pc), Voidwalker's Regalia (3pc), Convergence Echoes (4pc).

- [ ] **Step 3:** Update the inline `var itemsData` in bundle.js to match.

- [ ] **Step 4:** Add `"boss": true` to Tier 3+ encounters in `data/encounters.json` AND inline `encountersData` in bundle.js. Tier 3+ encounters: any with tier >= 3.

- [ ] **Step 5:** Verify: `node -c bundle.js`

- [ ] **Step 6:** Commit:
```bash
git add data/items.json data/encounters.json bundle.js
git commit -m "feat(gear): add legendaries, sets, and boss flags"
```

---

### Task 3: State Schema & Migration

**Files:**
- Modify: `bundle.js` — `createInitialState()` (~line 5177), migration block (~line 7355)

- [ ] **Step 1:** Add `equipment` and `shop` to `createInitialState()` return object, after the `tutorial` block:
```javascript
equipment: {
  inventory: [],
  equipped: {
    head: null,
    amulet: null,
    weapon: null,
    body: null,
    hands: null,
    ring1: null,
    ring2: null,
    feet: null
  },
  arcaneDust: 0,
  pityCounter: 0,
  codex: [],
  lastBountyDate: null,
  bountyStreak: 0,
  bountyActive: null,
  pendingLoot: []
},
shop: {
  cosmetics: []
},
```

- [ ] **Step 2:** Add migration logic in the migration block (~line 7355, after tutorial migration). For existing saves:
```javascript
if (!state.equipment) {
  state.equipment = {
    inventory: [],
    equipped: { head: null, amulet: null, weapon: null, body: null, hands: null, ring1: null, ring2: null, feet: null },
    arcaneDust: 0,
    pityCounter: 0,
    codex: [],
    lastBountyDate: null,
    bountyStreak: 0,
    bountyActive: null,
    pendingLoot: []
  };
}
if (!state.shop) {
  state.shop = { cosmetics: [] };
}
```

- [ ] **Step 3:** Verify: `node -c bundle.js`

- [ ] **Step 4:** Commit:
```bash
git add bundle.js
git commit -m "feat(gear): add equipment state schema and migration"
```

---

## Chunk 2: Item Generation Pipeline

### Task 4: Core Item Generation Function

**Files:**
- Modify: `bundle.js` — add new section after UTILITIES (~line 2949), before UI: NOTIFICATIONS

- [ ] **Step 1:** Add a new section header and the `generateItemId()` helper:
```javascript
// ============================================================
// EQUIPMENT: ITEM GENERATION
// ============================================================

function generateItemId() {
  return 'item_' + Math.random().toString(36).substr(2, 8) + Date.now().toString(36);
}
```

- [ ] **Step 2:** Add `getMaterialForILvl(iLvl, data)` — looks up which material tier contains the given iLvl:
```javascript
function getMaterialForILvl(iLvl, data) {
  var materials = data.items.materials;
  for (var i = materials.length - 1; i >= 0; i--) {
    if (iLvl >= materials[i].iLvlRange[0] && iLvl <= materials[i].iLvlRange[1]) {
      return materials[i];
    }
  }
  return materials[0];
}
```

- [ ] **Step 3:** Add `isMaterialUnlocked(material, state)` — checks if player has met the unlock gate:
```javascript
function isMaterialUnlocked(material, state) {
  if (!material.gate) return true;
  if (material.gate === 'any_t1') return state.research.completed.some(function(id) { return id.includes('_t1_'); });
  if (material.gate === 'any_t2') return state.research.completed.some(function(id) { return id.includes('_t2_'); });
  if (material.gate === 'any_t3') return state.research.completed.some(function(id) { return id.includes('_t3_'); });
  if (material.gate === 'any_t4') return state.research.completed.some(function(id) { return id.includes('_t4_'); });
  if (material.gate === 'post_convergence') return (state.prestige && state.prestige.convergenceCount > 0);
  return true;
}
```

- [ ] **Step 4:** Add `rollRarity(state, data, options)` — weighted rarity selection with Loot Bonus and pity timer:
```javascript
function rollRarity(state, data, options) {
  var rarities = data.items.rarities;
  var lootBonus = (options && options.lootBonus) || 0;
  var rarityMultipliers = { uncommon: 1, rare: 1.5, epic: 2, legendary: 3, set: 3 };
  var pity = state.equipment.pityCounter || 0;
  var pityThresholds = data.items.pity;

  // Pity guarantee
  if (pity >= pityThresholds.guaranteeAt) {
    return Math.random() < 0.5 ? 'legendary' : 'set';
  }

  var weights = [];
  var totalWeight = 0;
  for (var i = 0; i < rarities.length; i++) {
    var r = rarities[i];
    var w = r.dropWeight;
    if (r.id !== 'common') {
      var mult = rarityMultipliers[r.id] || 1;
      w = w * (1 + (lootBonus / 100) * mult);
      // Pity bonus for legendary/set
      if ((r.id === 'legendary' || r.id === 'set') && pity >= pityThresholds.doubleAt) {
        w *= (pity >= pityThresholds.tripleAt) ? 3 : 2;
      }
    }
    if (options && options.minRarity) {
      var order = ['common','uncommon','rare','epic','legendary','set'];
      if (order.indexOf(r.id) < order.indexOf(options.minRarity)) { w = 0; }
    }
    if (options && options.bossBonus && (r.id === 'legendary' || r.id === 'set')) {
      w *= 1.1;
    }
    weights.push(w);
    totalWeight += w;
  }

  var roll = Math.random() * totalWeight;
  var cumulative = 0;
  for (var j = 0; j < weights.length; j++) {
    cumulative += weights[j];
    if (roll <= cumulative) return rarities[j].id;
  }
  return 'common';
}
```

- [ ] **Step 5:** Add `rollAffixes(baseType, rarity, material, data)` — selects N affixes using weighted pool from base type:
```javascript
function rollAffixes(baseType, rarity, material, data) {
  var rarityDef = data.items.rarities.find(function(r) { return r.id === rarity; });
  var count = Array.isArray(rarityDef.affixCount)
    ? rarityDef.affixCount[0] + Math.floor(Math.random() * (rarityDef.affixCount[1] - rarityDef.affixCount[0] + 1))
    : rarityDef.affixCount;

  var baseTypeDef = data.items.baseTypes[baseType];
  var weights = baseTypeDef ? baseTypeDef.weights : {};

  // Build weighted pool
  var pool = [];
  var allAffixes = data.items.affixes;
  for (var i = 0; i < allAffixes.length; i++) {
    var a = allAffixes[i];
    var w = weights[a.id] || 0;
    if (w > 0) pool.push({ affix: a, weight: w });
  }

  var result = [];
  var used = {};
  for (var n = 0; n < count; n++) {
    // Filter out already-used affixes
    var available = pool.filter(function(p) { return !used[p.affix.id]; });

    // Fallback: if pool exhausted, pull from global affix list with weight 1
    if (available.length === 0) {
      for (var g = 0; g < allAffixes.length; g++) {
        if (!used[allAffixes[g].id]) {
          available.push({ affix: allAffixes[g], weight: 1 });
        }
      }
    }
    if (available.length === 0) break;

    // Weighted random selection
    var totalW = 0;
    for (var w2 = 0; w2 < available.length; w2++) totalW += available[w2].weight;
    var roll = Math.random() * totalW;
    var cum = 0;
    var selected = available[0].affix;
    for (var s = 0; s < available.length; s++) {
      cum += available[s].weight;
      if (roll <= cum) { selected = available[s].affix; break; }
    }

    // Roll value within material tier range
    var tierKey = String(material.tier);
    var range = selected.tiers[tierKey] || [0, 0];
    var value = range[0] + Math.random() * (range[1] - range[0]);

    // Round based on type
    if (selected.type === 'flat' && ['arcane_power','resilience','max_hp','hp_regen'].indexOf(selected.id) !== -1) {
      value = Math.round(value);
    } else {
      value = Math.round(value * 10) / 10;
    }

    result.push({ stat: selected.id, value: value, locked: false });
    used[selected.id] = true;
  }

  return result;
}
```

- [ ] **Step 6:** Add the main `generateItem(state, data, options)` function implementing the full 11-step pipeline from the spec:
```javascript
function generateItem(state, data, options) {
  options = options || {};
  var items = data.items;

  // Step 1-2: Determine iLvl
  var iLvlMin = options.iLvlMin || 1;
  var iLvlMax = options.iLvlMax || 5;
  var iLvl = iLvlMin + Math.floor(Math.random() * (iLvlMax - iLvlMin + 1));

  // Step 3: Material tier from iLvl
  var material = getMaterialForILvl(iLvl, data);
  if (options.forcedMaterial) {
    material = items.materials.find(function(m) { return m.id === options.forcedMaterial; }) || material;
    iLvl = material.iLvlRange[0] + Math.floor(Math.random() * (material.iLvlRange[1] - material.iLvlRange[0] + 1));
  }

  // Step 4: Rarity
  var lootBonus = options.lootBonus || 0;
  var rarity = options.forcedRarity || rollRarity(state, data, {
    lootBonus: lootBonus,
    minRarity: options.minRarity,
    bossBonus: options.bossBonus
  });

  // Step 5: Legendary/Set check
  if (rarity === 'legendary') {
    var eligible = items.legendaries.filter(function(l) { return l.material === material.id; });
    if (eligible.length > 0) {
      var leg = eligible[Math.floor(Math.random() * eligible.length)];
      var affixes = rollAffixes(items.baseTypes[items.slots[leg.slot].baseTypes[0]] ? items.slots[leg.slot].baseTypes[0] : 'band', rarity, material, data);
      // Update codex
      if (state.equipment.codex.indexOf(leg.id) === -1) {
        state.equipment.codex.push(leg.id);
      }
      state.equipment.pityCounter = 0;
      return {
        id: generateItemId(),
        baseType: items.slots[leg.slot].baseTypes[0],
        slot: leg.slot,
        material: material.id,
        iLvl: leg.iLvl,
        rarity: 'legendary',
        affixes: affixes,
        uniqueEffect: leg.uniqueEffect,
        setId: null,
        name: leg.name,
        flavorText: leg.flavorText,
        icon: leg.icon,
        vfx: leg.vfx,
        identified: false
      };
    } else {
      rarity = 'epic'; // Downgrade if no eligible legendary
    }
  }

  if (rarity === 'set') {
    var eligibleSets = [];
    for (var si = 0; si < items.sets.length; si++) {
      var setPieces = items.sets[si].pieces.filter(function(p) { return p.material === material.id; });
      for (var pi = 0; pi < setPieces.length; pi++) {
        eligibleSets.push({ set: items.sets[si], piece: setPieces[pi] });
      }
    }
    if (eligibleSets.length > 0) {
      // Smart loot: 3x weight for missing pieces
      var weightedPieces = [];
      for (var ei = 0; ei < eligibleSets.length; ei++) {
        var owned = state.equipment.inventory.some(function(inv) { return inv.setId === eligibleSets[ei].set.id && inv.setPieceId === eligibleSets[ei].piece.id; }) ||
          Object.values(state.equipment.equipped).some(function(eq) { return eq && eq.setId === eligibleSets[ei].set.id && eq.setPieceId === eligibleSets[ei].piece.id; });
        var w = owned ? 1 : 3;
        for (var ww = 0; ww < w; ww++) weightedPieces.push(eligibleSets[ei]);
      }
      var pick = weightedPieces[Math.floor(Math.random() * weightedPieces.length)];
      var piece = pick.piece;
      var setDef = pick.set;
      var setBaseType = items.slots[piece.slot].baseTypes[0];
      var setAffixes = rollAffixes(setBaseType, rarity, material, data);
      if (state.equipment.codex.indexOf(piece.id) === -1) {
        state.equipment.codex.push(piece.id);
      }
      state.equipment.pityCounter = 0;
      return {
        id: generateItemId(),
        baseType: setBaseType,
        slot: piece.slot,
        material: material.id,
        iLvl: piece.iLvl,
        rarity: 'set',
        affixes: setAffixes,
        uniqueEffect: null,
        setId: setDef.id,
        setPieceId: piece.id,
        name: setDef.name + ' ' + items.baseTypes[setBaseType].name,
        flavorText: setDef.flavor,
        icon: null,
        vfx: null,
        identified: false
      };
    } else {
      rarity = 'epic';
    }
  }

  // Steps 6-7: Slot and base type
  var slotKeys = Object.keys(items.slots).filter(function(k) { return k !== 'ring2'; }); // ring1/ring2 share pool
  var slot = options.forcedSlot || slotKeys[Math.floor(Math.random() * slotKeys.length)];
  if (slot === 'ring1' || slot === 'ring2') slot = Math.random() < 0.5 ? 'ring1' : 'ring2';
  var slotDef = items.slots[slot] || items.slots['ring1'];
  var baseTypes = slotDef.baseTypes;
  var baseType = baseTypes[Math.floor(Math.random() * baseTypes.length)];

  // Step 8-9: Affixes
  var affixes = rollAffixes(baseType, rarity, material, data);

  // Step 10: Flavor text (Uncommon+)
  var flavorText = null;
  if (rarity !== 'common') {
    var pool = items.flavorText || [];
    if (pool.length > 0) flavorText = pool[Math.floor(Math.random() * pool.length)];
  }

  // Update pity counter
  state.equipment.pityCounter = (state.equipment.pityCounter || 0) + 1;

  // Step 11: Create item
  return {
    id: generateItemId(),
    baseType: baseType,
    slot: slot,
    material: material.id,
    iLvl: iLvl,
    rarity: rarity,
    affixes: affixes,
    uniqueEffect: null,
    setId: null,
    name: material.name + ' ' + (items.baseTypes[baseType] ? items.baseTypes[baseType].name : baseType),
    flavorText: flavorText,
    icon: null,
    vfx: null,
    identified: rarity === 'common' || rarity === 'uncommon'
  };
}
```

- [ ] **Step 7:** Verify: `node -c bundle.js`

- [ ] **Step 8:** Commit:
```bash
git add bundle.js
git commit -m "feat(gear): add item generation pipeline"
```

---

### Task 5: Equipment Bonus Calculation

**Files:**
- Modify: `bundle.js` — add after generateItem, in the EQUIPMENT section

- [ ] **Step 1:** Add `calculateEquipmentBonuses(state, data)`:
```javascript
var _equipBonusCache = null;
var _equipBonusDirty = true;

function invalidateEquipCache() { _equipBonusDirty = true; }

function calculateEquipmentBonuses(state, data) {
  if (!_equipBonusDirty && _equipBonusCache) return _equipBonusCache;

  var bonuses = {
    arcane_power: 0, spell_crit_chance: 0, spell_crit_damage: 0,
    resilience: 0, max_hp: 0, hp_regen: 0, speed: 0, cdr: 0,
    instability: 0, evasion: 0, mana_efficiency: 0, resource_rate: 0,
    loot_bonus: 0, set_bonuses: [], unique_effects: []
  };

  var equipped = state.equipment.equipped;
  var setCounts = {};

  for (var slotId in equipped) {
    var item = equipped[slotId];
    if (!item) continue;

    // Sum affixes
    for (var a = 0; a < item.affixes.length; a++) {
      var affix = item.affixes[a];
      if (bonuses.hasOwnProperty(affix.stat)) {
        bonuses[affix.stat] += affix.value;
      }
    }

    // Track unique effects
    if (item.uniqueEffect) {
      bonuses.unique_effects.push(item.uniqueEffect);
    }

    // Count set pieces
    if (item.setId) {
      setCounts[item.setId] = (setCounts[item.setId] || 0) + 1;
    }
  }

  // Evaluate set bonuses
  if (data && data.items && data.items.sets) {
    for (var si = 0; si < data.items.sets.length; si++) {
      var setDef = data.items.sets[si];
      var count = setCounts[setDef.id] || 0;
      for (var threshold in setDef.bonuses) {
        if (count >= parseInt(threshold)) {
          var bonus = setDef.bonuses[threshold];
          bonuses.set_bonuses.push(setDef.id + '_' + threshold);
          if (bonus.stats) {
            for (var stat in bonus.stats) {
              if (bonuses.hasOwnProperty(stat)) bonuses[stat] += bonus.stats[stat];
            }
          }
          if (bonus.special) {
            bonuses.unique_effects.push(bonus.special);
          }
        }
      }
    }
  }

  // Round display values
  bonuses.spell_crit_chance = Math.round(bonuses.spell_crit_chance * 10) / 10;
  bonuses.evasion = Math.round(bonuses.evasion * 10) / 10;
  bonuses.speed = Math.round(bonuses.speed * 10) / 10;

  _equipBonusCache = bonuses;
  _equipBonusDirty = false;
  return bonuses;
}
```

- [ ] **Step 2:** Add `getAffixQuality(affix, material, data)` — returns quality tier for tooltip dots:
```javascript
function getAffixQuality(affix, material, data) {
  var affixDef = data.items.affixes.find(function(a) { return a.id === affix.stat; });
  if (!affixDef) return null;
  var tierKey = String(material);
  // Find material tier number from material id
  var mat = data.items.materials.find(function(m) { return m.id === material; });
  if (mat) tierKey = String(mat.tier);
  var range = affixDef.tiers[tierKey];
  if (!range) return null;
  var min = range[0], max = range[1];
  if (max === min) return (affix.value >= max) ? 'perfect' : null;
  var pct = (affix.value - min) / (max - min);
  if (pct >= 1.0) return 'perfect';
  if (pct >= 0.9) return 'exceptional';
  if (pct >= 0.75) return 'great';
  if (pct >= 0.5) return 'good';
  return null;
}
```

- [ ] **Step 3:** Verify: `node -c bundle.js`

- [ ] **Step 4:** Commit:
```bash
git add bundle.js
git commit -m "feat(gear): add equipment bonus calculation and affix quality"
```

---

## Chunk 3: Combat Integration

### Task 6: New Combat Mechanics (Crit, Evasion, HP Regen)

**Files:**
- Modify: `bundle.js` — ENGINE: COMBAT section (~line 3694-4393)

- [ ] **Step 1:** Modify `startCombat()` (~line 4040) to include equipment bonuses in max health calculation. After the existing `state.combat.health = 100 + stats.resilience * 5;` line, add equipment max_hp:
```javascript
var equipBonuses = calculateEquipmentBonuses(state, data);
state.combat.health = 100 + stats.resilience * 5 + (equipBonuses.max_hp || 0);
state.combat.maxHealth = state.combat.health;
```

- [ ] **Step 2:** Add HP Regen to the combat tick. In `combatTick()` (~line 4173), at the start of the player turn (after the `state.tick % 2 !== 0` check), add:
```javascript
// HP Regen from equipment
var eqBonus = calculateEquipmentBonuses(state, data);
var regenVal = eqBonus.hp_regen || 0;
// Robes of the First Arcanist: triple regen below 30% HP
if (regenVal > 0 && eqBonus.unique_effects.some(function(e) { return e.id === 'regen_boost_low_hp'; })) {
  if (state.combat.health < state.combat.maxHealth * 0.3) regenVal *= 3;
}
if (regenVal > 0 && state.combat.health < state.combat.maxHealth) {
  var regenAmt = Math.min(regenVal, state.combat.maxHealth - state.combat.health);
  state.combat.health += regenAmt;
  if (regenAmt >= 1) {
    state.combat.log.push({ text: 'You regenerate ' + Math.round(regenAmt) + ' HP.', type: 'heal' });
  }
}
```

- [ ] **Step 3:** Add Spell Crit mechanic. Find the damage application in the player action section of combatTick (where spell damage is calculated and applied to enemyHealth). After damage is calculated but before it's applied, add:
```javascript
// Spell Crit check
var critChance = (eqBonus.spell_crit_chance || 0) / 100;
var isCrit = Math.random() < critChance;
if (isCrit) {
  var critMult = 1.5 + (eqBonus.spell_crit_damage || 0);
  damage = Math.round(damage * critMult);
  state.combat.log.push({ text: 'CRITICAL HIT!', type: 'crit' });
}
```

- [ ] **Step 4:** Add Evasion mechanic. In the enemy turn section of combatTick, before enemy damage is applied to player health, add:
```javascript
// Evasion check
var evasionChance = (eqBonus.evasion || 0) / 100;
// Enemy specials have 50% reduced evasion effectiveness
if (isSpecialAttack) evasionChance *= 0.5;
if (Math.random() < evasionChance) {
  state.combat.log.push({ text: 'You dodged the attack!', type: 'dodge' });
  // Skip damage application
} else {
  // Apply damage as normal
}
```
Note: The implementer must identify the exact location where enemy damage is applied and wrap it in the else branch.

- [ ] **Step 5:** Add Mana Efficiency to spell casting. Find where spell mana cost is deducted (in the spell casting logic within combatTick). Modify the cost:
```javascript
var manaCost = spell.cost;
var manaEff = (eqBonus.mana_efficiency || 0);
if (manaEff > 0) manaCost = Math.ceil(manaCost * (1 - manaEff / 100));
```

- [ ] **Step 6:** Add equipment stat bonuses to `calculateStats()` (the function that computes player combat stats). Find `calculateStats()` and add equipment bonuses to each relevant stat:
```javascript
var eqBonus = calculateEquipmentBonuses(state, data);
stats.arcanePower += (eqBonus.arcane_power || 0);
stats.resilience += (eqBonus.resilience || 0);
stats.speed = Math.min(0.5, stats.speed + (eqBonus.speed || 0) / 100);
stats.instability += (eqBonus.instability || 0);
```

- [ ] **Step 7:** Add CDR to cooldown decrement. Find where cooldowns are decremented each round and modify:
```javascript
var cdrBonus = Math.floor(eqBonus.cdr || 0);
for (var spellId in state.combat.cooldowns) {
  state.combat.cooldowns[spellId] -= (1 + cdrBonus);
  if (state.combat.cooldowns[spellId] < 0) state.combat.cooldowns[spellId] = 0;
}
```

- [ ] **Step 8:** Verify: `node -c bundle.js`

- [ ] **Step 9:** Commit:
```bash
git add bundle.js
git commit -m "feat(gear): integrate equipment stats into combat (crit, evasion, regen, CDR)"
```

---

### Task 7: Loot Drops from Combat

**Files:**
- Modify: `bundle.js` — `victory()` function (~line 3804)

- [ ] **Step 1:** Change `victory(state)` signature (~line 3804) to `victory(state, data)`. Update the call site in `combatTick()` (~line 4234) from `victory(state)` to `victory(state, data)` (combatTick already receives `data` as a parameter).

- [ ] **Step 2:** In `victory()`, after the existing insight gain code, add loot drop logic:
```javascript
// Loot drop
var encounter = active.encounter;
var isBoss = encounter.boss || false;
var dropChance = isBoss ? 1.0 : 0.35;
var isFirstWin = (state.discoveries.counters.combat_win || 0) <= 1;
if (isFirstWin) dropChance = 1.0; // Guaranteed first drop

if (Math.random() < dropChance) {
  var tier = encounter.tier || 1;
  var iLvlRanges = { 1: [1,5], 2: [6,12], 3: [13,20], 4: [16,25] };
  // Post-convergence T4 extends to 30
  if (tier === 4 && state.prestige.convergenceCount > 0) iLvlRanges[4] = [16, 30];
  var range = iLvlRanges[tier] || [1, 5];

  var eqBonus = calculateEquipmentBonuses(state, data);
  var item = generateItem(state, data, {
    iLvlMin: range[0],
    iLvlMax: range[1],
    lootBonus: eqBonus.loot_bonus || 0,
    bossBonus: isBoss
  });

  if (item) {
    if (state.equipment.inventory.length < 60) {
      state.equipment.inventory.push(item);
    } else if (state.equipment.pendingLoot.length < 5) {
      state.equipment.pendingLoot.push(item);
      addJournalEntry(state, 'Inventory full! Item added to pending loot. Salvage or discard to make room.', 'info');
    } else {
      addJournalEntry(state, 'Inventory and pending loot full! A ' + item.rarity + ' item was lost.', 'info');
    }
    var rarityDef = data.items.rarities.find(function(r) { return r.id === item.rarity; });
    var color = rarityDef ? rarityDef.color : '#ccc';
    addJournalEntry(state, 'Loot: <span style="color:' + color + '">' + item.name + '</span> (' + item.rarity + ')', 'info');

    // First item narrator milestone
    if (state.equipment.inventory.length === 1 && !state.tutorial.seenMilestones.includes('first_item')) {
      state.tutorial.seenMilestones.push('first_item');
      addJournalEntry(state, 'Something clatters to the floor — solid, real, thrumming with power. The Study has armed you. The Armory awaits.', 'narrator');
    }

    // First legendary narrator entry
    if ((item.rarity === 'legendary' || item.rarity === 'set') && !state.tutorial.seenMilestones.includes('first_legendary')) {
      state.tutorial.seenMilestones.push('first_legendary');
      addJournalEntry(state, 'Something extraordinary falls into your hands. The Study recognizes it — this artifact has a name.', 'narrator');
    }
  }
}
```

- [ ] **Step 3:** Verify: `node -c bundle.js`

- [ ] **Step 4:** Commit:
```bash
git add bundle.js
git commit -m "feat(gear): add loot drops from combat victories"
```

---

### Task 7B: Event Reward Drops

**Files:**
- Modify: `bundle.js` — event choice handling (ENGINE: EVENTS section)

- [ ] **Step 1:** Find the `makeChoice()` function in the events engine (~line 4393+). After outcome rewards are applied, add a 15% chance for an item drop:
```javascript
// Item drop from events (~15% chance)
if (Math.random() < 0.15 && state.equipment) {
  var highestTier = 1;
  if (state.research.completed.some(id => id.includes('_t4_'))) highestTier = 4;
  else if (state.research.completed.some(id => id.includes('_t3_'))) highestTier = 3;
  else if (state.research.completed.some(id => id.includes('_t2_'))) highestTier = 2;
  var tierRanges = { 1: [1,5], 2: [6,12], 3: [13,20], 4: [16,25] };
  var range = tierRanges[highestTier];
  var eqBonus = calculateEquipmentBonuses(state, data);
  var eventItem = generateItem(state, data, { iLvlMin: range[0], iLvlMax: range[1], lootBonus: eqBonus.loot_bonus || 0 });
  if (eventItem && state.equipment.inventory.length < 60) {
    state.equipment.inventory.push(eventItem);
    addJournalEntry(state, 'The event yielded: ' + eventItem.name, 'info');
  }
}
```

Note: `makeChoice()` takes `(state, data, choiceIndex)` — verify this signature. The `data` parameter should already be available.

- [ ] **Step 2:** Verify: `node -c bundle.js`

- [ ] **Step 3:** Commit:
```bash
git add bundle.js
git commit -m "feat(gear): add item drops from event choices"
```

---

### Task 8: Resource Rate Integration

**Files:**
- Modify: `bundle.js` — `resourcesTick()` (~line 3295) and `getGenerationRate()` (~line 3331)

- [ ] **Step 1:** In `resourcesTick()`, after the generator gain calculation (in the Phase 2 loop ~line 3320), multiply by resource rate bonus:
```javascript
var eqBonus = calculateEquipmentBonuses(state, data);
var rateBonus = 1 + ((eqBonus.resource_rate || 0) / 100);
```
Apply `* rateBonus` to both the base_rate gain (Phase 1) and the generator gain (Phase 2). Calculate `eqBonus` once at the top of the function, not inside each loop.

- [ ] **Step 2:** In `getGenerationRate()`, also apply the resource rate bonus so the UI display matches:
```javascript
var eqBonus = calculateEquipmentBonuses(state, data);
var rateBonus = 1 + ((eqBonus.resource_rate || 0) / 100);
// Apply to the final returned rate
return totalRate * rateBonus;
```

- [ ] **Step 3:** Verify: `node -c bundle.js`

- [ ] **Step 4:** Commit:
```bash
git add bundle.js
git commit -m "feat(gear): integrate resource rate bonus from equipment"
```

---

## Chunk 4: Salvage & Enchanting

### Task 9: Salvage System

**Files:**
- Modify: `bundle.js` — add to EQUIPMENT section

- [ ] **Step 1:** Add `findItemById(state, itemId)` helper (must come before all functions that use it):
```javascript
function findItemById(state, itemId) {
  for (var i = 0; i < state.equipment.inventory.length; i++) {
    if (state.equipment.inventory[i].id === itemId) return state.equipment.inventory[i];
  }
  for (var slot in state.equipment.equipped) {
    if (state.equipment.equipped[slot] && state.equipment.equipped[slot].id === itemId) return state.equipment.equipped[slot];
  }
  return null;
}
```

- [ ] **Step 2:** Add `salvageItem(state, data, itemId)`:
```javascript
function salvageItem(state, data, itemId) {
  var idx = -1;
  var source = 'inventory';
  for (var i = 0; i < state.equipment.inventory.length; i++) {
    if (state.equipment.inventory[i].id === itemId) { idx = i; break; }
  }
  if (idx === -1) {
    for (var p = 0; p < state.equipment.pendingLoot.length; p++) {
      if (state.equipment.pendingLoot[p].id === itemId) { idx = p; source = 'pending'; break; }
    }
  }
  if (idx === -1) return null;

  var item = source === 'inventory' ? state.equipment.inventory[idx] : state.equipment.pendingLoot[idx];
  var rarityDef = data.items.rarities.find(function(r) { return r.id === item.rarity; });
  if (!rarityDef) return null;

  var dustRange = rarityDef.dustYield;
  var dust = dustRange[0] + Math.floor(Math.random() * (dustRange[1] - dustRange[0] + 1));

  if (source === 'inventory') {
    state.equipment.inventory.splice(idx, 1);
  } else {
    state.equipment.pendingLoot.splice(idx, 1);
  }

  state.equipment.arcaneDust += dust;
  return dust;
}
```

- [ ] **Step 2:** Add `getDustCost(recipe, materialId, data)`:
```javascript
function getDustCost(recipe, materialId, data) {
  var mat = data.items.materials.find(function(m) { return m.id === materialId; });
  var tier = mat ? mat.tier : 1;
  var recipes = data.items.salvageRecipes;
  var recipeDef = recipes[recipe];
  if (!recipeDef) return Infinity;
  return recipeDef.dustPerTier * tier;
}
```

- [ ] **Step 3:** Add `rerollAffixes(state, data, itemId)`:
```javascript
function rerollAffixes(state, data, itemId) {
  var item = findItemById(state, itemId);
  if (!item) return false;
  var cost = getDustCost('reroll_affixes', item.material, data);
  if (state.equipment.arcaneDust < cost) return false;
  state.equipment.arcaneDust -= cost;

  var material = data.items.materials.find(function(m) { return m.id === item.material; });
  var lockedAffixes = item.affixes.filter(function(a) { return a.locked; });
  var newAffixes = rollAffixes(item.baseType, item.rarity, material, data);
  // Preserve locked affixes
  for (var i = 0; i < lockedAffixes.length; i++) {
    // Remove any new affix with same stat as locked
    newAffixes = newAffixes.filter(function(a) { return a.stat !== lockedAffixes[i].stat; });
  }
  item.affixes = lockedAffixes.concat(newAffixes.slice(0, item.affixes.length - lockedAffixes.length));
  invalidateEquipCache();
  return true;
}
```

- [ ] **Step 4:** Add `enchantAffix(state, data, itemId, affixIndex)`:
```javascript
function enchantAffix(state, data, itemId, affixIndex) {
  var item = findItemById(state, itemId);
  if (!item || !item.affixes[affixIndex] || item.affixes[affixIndex].locked) return false;
  var cost = getDustCost('enchant_one', item.material, data);
  if (state.equipment.arcaneDust < cost) return false;
  state.equipment.arcaneDust -= cost;

  var material = data.items.materials.find(function(m) { return m.id === item.material; });
  var affixDef = data.items.affixes.find(function(a) { return a.id === item.affixes[affixIndex].stat; });
  if (!affixDef || !material) return false;

  var tierKey = String(material.tier);
  var range = affixDef.tiers[tierKey] || [0, 0];
  var value = range[0] + Math.random() * (range[1] - range[0]);
  if (affixDef.type === 'flat' && ['arcane_power','resilience','max_hp','hp_regen'].indexOf(affixDef.id) !== -1) {
    value = Math.round(value);
  } else {
    value = Math.round(value * 10) / 10;
  }
  item.affixes[affixIndex].value = value;
  invalidateEquipCache();
  return true;
}
```

- [ ] **Step 5:** Add `lockAffix(state, data, itemId, affixIndex)`, `upgradeRarity(state, data, itemId)`, `reforgeBaseType(state, data, itemId)`, `craftItem(state, data, slot, baseType, materialId)`:
```javascript
function lockAffix(state, data, itemId, affixIndex) {
  var item = findItemById(state, itemId);
  if (!item || !item.affixes[affixIndex]) return false;
  if (item.affixes.some(function(a) { return a.locked; })) return false; // Max 1 lock
  var cost = getDustCost('lock_affix', item.material, data);
  if (state.equipment.arcaneDust < cost) return false;
  state.equipment.arcaneDust -= cost;
  item.affixes[affixIndex].locked = true;
  return true;
}

function upgradeRarity(state, data, itemId) {
  var item = findItemById(state, itemId);
  if (!item) return false;
  var order = ['common','uncommon','rare','epic'];
  var idx = order.indexOf(item.rarity);
  if (idx === -1 || idx >= 3) return false; // Can't upgrade legendary/set or already epic
  var cost = getDustCost('upgrade_rarity', item.material, data);
  if (state.equipment.arcaneDust < cost) return false;
  state.equipment.arcaneDust -= cost;
  item.rarity = order[idx + 1];
  // Add one random affix
  var material = data.items.materials.find(function(m) { return m.id === item.material; });
  var newAffixes = rollAffixes(item.baseType, 'common', material, data); // Roll 1
  if (newAffixes.length > 0) {
    // Make sure no duplicate stat
    var existing = item.affixes.map(function(a) { return a.stat; });
    var valid = newAffixes.filter(function(a) { return existing.indexOf(a.stat) === -1; });
    if (valid.length > 0) item.affixes.push(valid[0]);
    else item.affixes.push(newAffixes[0]); // Fallback
  }
  item.name = material.name + ' ' + (data.items.baseTypes[item.baseType] ? data.items.baseTypes[item.baseType].name : item.baseType);
  invalidateEquipCache();
  return true;
}

function reforgeBaseType(state, data, itemId) {
  var item = findItemById(state, itemId);
  if (!item) return false;
  var cost = getDustCost('reforge_base', item.material, data);
  if (state.equipment.arcaneDust < cost) return false;
  state.equipment.arcaneDust -= cost;
  var slotKey = item.slot === 'ring2' ? 'ring1' : item.slot;
  var slotDef = data.items.slots[slotKey];
  if (!slotDef) return false;
  var otherBases = slotDef.baseTypes.filter(function(b) { return b !== item.baseType; });
  if (otherBases.length === 0) return false;
  item.baseType = otherBases[Math.floor(Math.random() * otherBases.length)];
  var material = data.items.materials.find(function(m) { return m.id === item.material; });
  item.affixes = rollAffixes(item.baseType, item.rarity, material, data);
  item.name = material.name + ' ' + (data.items.baseTypes[item.baseType] ? data.items.baseTypes[item.baseType].name : item.baseType);
  invalidateEquipCache();
  return true;
}

function craftItem(state, data, slot, baseType, materialId) {
  var material = data.items.materials.find(function(m) { return m.id === materialId; });
  if (!material || !isMaterialUnlocked(material, state)) return null;
  var cost = getDustCost('craft_base', materialId, data);
  if (state.equipment.arcaneDust < cost) return null;
  if (state.equipment.inventory.length >= 60) return null;
  state.equipment.arcaneDust -= cost;
  var iLvl = material.iLvlRange[0] + Math.floor(Math.random() * (material.iLvlRange[1] - material.iLvlRange[0] + 1));
  var affixes = rollAffixes(baseType, 'common', material, data);
  var item = {
    id: generateItemId(),
    baseType: baseType,
    slot: slot,
    material: materialId,
    iLvl: iLvl,
    rarity: 'common',
    affixes: affixes,
    uniqueEffect: null,
    setId: null,
    name: material.name + ' ' + (data.items.baseTypes[baseType] ? data.items.baseTypes[baseType].name : baseType),
    flavorText: null,
    icon: null,
    vfx: null,
    identified: true
  };
  state.equipment.inventory.push(item);
  return item;
}
```

- [ ] **Step 6:** Add `equipItem(state, data, itemId, targetSlot)` and `unequipItem(state, data, slotId)`:
```javascript
function equipItem(state, data, itemId, targetSlot) {
  var item = null;
  var invIdx = -1;
  for (var i = 0; i < state.equipment.inventory.length; i++) {
    if (state.equipment.inventory[i].id === itemId) { item = state.equipment.inventory[i]; invIdx = i; break; }
  }
  if (!item || !targetSlot) return false;
  // Validate slot compatibility
  var itemSlot = item.slot;
  if (itemSlot === 'ring1' || itemSlot === 'ring2') itemSlot = 'ring';
  var targetBase = targetSlot;
  if (targetBase === 'ring1' || targetBase === 'ring2') targetBase = 'ring';
  if (itemSlot !== targetBase && !(itemSlot === 'ring' && (targetSlot === 'ring1' || targetSlot === 'ring2'))) return false;

  // Remove from inventory
  state.equipment.inventory.splice(invIdx, 1);

  // Swap if slot occupied
  var existing = state.equipment.equipped[targetSlot];
  if (existing) {
    state.equipment.inventory.push(existing);
  }

  state.equipment.equipped[targetSlot] = item;
  invalidateEquipCache();
  return true;
}

function unequipItem(state, data, slotId) {
  var item = state.equipment.equipped[slotId];
  if (!item) return false;
  if (state.equipment.inventory.length >= 60) return false;
  state.equipment.equipped[slotId] = null;
  state.equipment.inventory.push(item);
  invalidateEquipCache();
  return true;
}
```

- [ ] **Step 8:** Verify: `node -c bundle.js`

- [ ] **Step 9:** Commit:
```bash
git add bundle.js
git commit -m "feat(gear): add salvage, enchanting, crafting, and equip/unequip"
```

---

## Chunk 5: Armory UI

### Task 10: Armory Panel Skeleton & Paper Doll

**Files:**
- Modify: `bundle.js` — UI: PANELS section (add new panel renderer)
- Modify: `css/style.css`

- [ ] **Step 1:** Add `_armoryBuildSkeleton(container, data)` function in the UI: PANELS section, following the existing skeleton pattern:
```javascript
function _armoryBuildSkeleton(container, data) {
  container._armoryInit = true;
  container.innerHTML = '<div class="armory-panel">' +
    '<div class="armory-layout">' +
      '<div class="paper-doll-section">' +
        '<h3>Equipment</h3>' +
        '<div class="paper-doll">' +
          '<div class="doll-slot" data-slot="head" id="equip-head"><span class="slot-label">Head</span></div>' +
          '<div class="doll-slot" data-slot="amulet" id="equip-amulet"><span class="slot-label">Amulet</span></div>' +
          '<div class="doll-slot" data-slot="weapon" id="equip-weapon"><span class="slot-label">Weapon</span></div>' +
          '<div class="doll-slot" data-slot="body" id="equip-body"><span class="slot-label">Body</span></div>' +
          '<div class="doll-slot" data-slot="hands" id="equip-hands"><span class="slot-label">Hands</span></div>' +
          '<div class="doll-slot" data-slot="ring1" id="equip-ring1"><span class="slot-label">Ring</span></div>' +
          '<div class="doll-slot" data-slot="ring2" id="equip-ring2"><span class="slot-label">Ring</span></div>' +
          '<div class="doll-slot" data-slot="feet" id="equip-feet"><span class="slot-label">Feet</span></div>' +
        '</div>' +
        '<div class="dust-counter" id="armory-dust">Arcane Dust: 0</div>' +
      '</div>' +
      '<div class="inventory-section">' +
        '<h3>Inventory <span id="inv-count">0/60</span></h3>' +
        '<div class="inv-filters" id="inv-filters">' +
          '<button class="inv-filter active" data-filter="all">All</button>' +
          '<button class="inv-filter" data-filter="weapon">Weapon</button>' +
          '<button class="inv-filter" data-filter="head">Head</button>' +
          '<button class="inv-filter" data-filter="body">Body</button>' +
          '<button class="inv-filter" data-filter="hands">Hands</button>' +
          '<button class="inv-filter" data-filter="feet">Feet</button>' +
          '<button class="inv-filter" data-filter="amulet">Amulet</button>' +
          '<button class="inv-filter" data-filter="ring">Ring</button>' +
        '</div>' +
        '<div class="inventory-grid" id="inv-grid"></div>' +
        '<div class="pending-loot" id="pending-loot" style="display:none">' +
          '<h4>Pending Loot</h4>' +
          '<div id="pending-grid"></div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="stat-summary-bar" id="stat-summary">' +
      '<div class="stat-primary" id="stat-primary"></div>' +
      '<div class="stat-expanded" id="stat-expanded" style="display:none"></div>' +
    '</div>' +
    '<div class="armory-tabs">' +
      '<button class="armory-tab active" data-tab="inventory">Inventory</button>' +
      '<button class="armory-tab" data-tab="salvage">Salvage</button>' +
      '<button class="armory-tab" data-tab="codex">Codex</button>' +
    '</div>' +
    '<div id="armory-tab-content"></div>' +
  '</div>';

  // Filter click handlers
  var filters = container.querySelectorAll('.inv-filter');
  for (var i = 0; i < filters.length; i++) {
    filters[i].addEventListener('click', function(e) {
      var active = container.querySelector('.inv-filter.active');
      if (active) active.classList.remove('active');
      e.target.classList.add('active');
      container._invFilter = e.target.getAttribute('data-filter');
    });
  }
  container._invFilter = 'all';

  // Tab click handlers
  var tabs = container.querySelectorAll('.armory-tab');
  for (var t = 0; t < tabs.length; t++) {
    tabs[t].addEventListener('click', function(e) {
      var activeTab = container.querySelector('.armory-tab.active');
      if (activeTab) activeTab.classList.remove('active');
      e.target.classList.add('active');
      container._armoryTab = e.target.getAttribute('data-tab');
    });
  }
  container._armoryTab = 'inventory';

  // Stat bar toggle
  var statBar = container.querySelector('.stat-summary-bar');
  if (statBar) {
    statBar.addEventListener('click', function() {
      var exp = document.getElementById('stat-expanded');
      if (exp) exp.style.display = exp.style.display === 'none' ? '' : 'none';
    });
  }

  // Setup drag-and-drop on slots (drop TO equip)
  var slots = container.querySelectorAll('.doll-slot');
  for (var s = 0; s < slots.length; s++) {
    slots[s].addEventListener('dragover', function(e) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; });
    slots[s].addEventListener('drop', function(e) {
      e.preventDefault();
      var itemId = e.dataTransfer.getData('text/plain');
      var targetSlot = this.getAttribute('data-slot');
      if (itemId && targetSlot && window._armoryState && window._armoryData) {
        equipItem(window._armoryState, window._armoryData, itemId, targetSlot);
      }
    });
    // Drag FROM equipped slot
    slots[s].addEventListener('dragstart', function(e) {
      var slotId = this.getAttribute('data-slot');
      if (window._armoryState && window._armoryState.equipment.equipped[slotId]) {
        e.dataTransfer.setData('text/plain', 'unequip:' + slotId);
      }
    });
  }

  // Setup drop on inventory grid (drop TO unequip)
  var invGrid = container.querySelector('.inventory-grid');
  if (invGrid) {
    invGrid.addEventListener('dragover', function(e) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; });
    invGrid.addEventListener('drop', function(e) {
      e.preventDefault();
      var data = e.dataTransfer.getData('text/plain');
      if (data && data.startsWith('unequip:') && window._armoryState && window._armoryData) {
        var slotId = data.replace('unequip:', '');
        unequipItem(window._armoryState, window._armoryData, slotId);
      }
    });
  }
}
```

- [ ] **Step 2:** Add base CSS for the armory panel to `css/style.css`. Include layout, paper doll positioning, slot styling, inventory grid, stat bar, filter buttons, tab buttons, and all rarity color classes. This is a large CSS block — see the spec's Section 13 for the full class list.

- [ ] **Step 3:** Verify: `node -c bundle.js`

- [ ] **Step 4:** Commit:
```bash
git add bundle.js css/style.css
git commit -m "feat(gear): add armory panel skeleton with paper doll and drag-drop"
```

---

### Task 11: Armory Panel Rendering

**Files:**
- Modify: `bundle.js` — add `renderArmoryPanel()` and item rendering helpers

- [ ] **Step 1:** Add `_renderItemCard(item, data, state)` helper that returns an HTML string for an inventory item card:
```javascript
function _renderItemCard(item, data, state) {
  var rarityDef = data.items.rarities.find(function(r) { return r.id === item.rarity; });
  var color = rarityDef ? rarityDef.color : '#ccc';
  var matDef = data.items.materials.find(function(m) { return m.id === item.material; });
  var displayName = item.identified === false ? 'Unidentified ' + (data.items.slots[item.slot === 'ring2' ? 'ring1' : item.slot] || {}).name || item.slot : item.name;

  return '<div class="item-card ' + item.rarity + '" draggable="true" data-item-id="' + item.id + '" ' +
    'ondragstart="event.dataTransfer.setData(\'text/plain\', \'' + item.id + '\')">' +
    '<div class="item-name" style="color:' + color + '">' + displayName + '</div>' +
    '<div class="item-meta">iLvl ' + item.iLvl + (matDef ? ' · ' + matDef.name : '') + '</div>' +
    '</div>';
}
```

- [ ] **Step 2:** Add `_renderItemTooltip(item, data, state)` that returns full tooltip HTML with affixes, quality dots, flavor text, set info:
```javascript
function _renderItemTooltip(item, data, state) {
  if (item.identified === false) {
    return '<div class="item-tooltip ' + item.rarity + '-border">' +
      '<div class="tooltip-name">Unidentified Item</div>' +
      '<div class="tooltip-rarity" style="color:' + (data.items.rarities.find(function(r){return r.id===item.rarity;})||{}).color + '">' + item.rarity + '</div>' +
      '<button class="identify-btn" data-item-id="' + item.id + '">Click to Identify</button>' +
      '</div>';
  }
  var rarityDef = data.items.rarities.find(function(r) { return r.id === item.rarity; });
  var matDef = data.items.materials.find(function(m) { return m.id === item.material; });
  var html = '<div class="item-tooltip ' + item.rarity + '-border">';
  html += '<div class="tooltip-name" style="color:' + (rarityDef ? rarityDef.color : '#ccc') + '">' + item.name + '</div>';
  html += '<div class="tooltip-rarity">' + (rarityDef ? rarityDef.name : item.rarity) + ' · iLvl ' + item.iLvl + '</div>';
  html += '<div class="tooltip-affixes">';
  for (var a = 0; a < item.affixes.length; a++) {
    var af = item.affixes[a];
    var affixDef = data.items.affixes.find(function(x) { return x.id === af.stat; });
    var quality = getAffixQuality(af, item.material, data);
    var qClass = quality ? ' quality-' + quality : '';
    var lockIcon = af.locked ? ' 🔒' : '';
    var prefix = affixDef && (affixDef.type === 'percent' || affixDef.type === 'multiplier') ? '' : '+';
    var suffix = affixDef && affixDef.type === 'percent' ? '%' : (affixDef && affixDef.type === 'multiplier' ? 'x' : '');
    html += '<div class="affix-line' + qClass + '">' + prefix + af.value + suffix + ' ' + (affixDef ? affixDef.name : af.stat) + lockIcon + '</div>';
  }
  html += '</div>';
  if (item.uniqueEffect) {
    html += '<div class="tooltip-unique">' + item.uniqueEffect.description + '</div>';
  }
  if (item.setId) {
    var setDef = data.items.sets.find(function(s) { return s.id === item.setId; });
    if (setDef) {
      html += '<div class="tooltip-set-name" style="color:#d4a017">' + setDef.name + '</div>';
      // Count equipped pieces
      var count = 0;
      for (var sl in state.equipment.equipped) {
        if (state.equipment.equipped[sl] && state.equipment.equipped[sl].setId === item.setId) count++;
      }
      for (var thresh in setDef.bonuses) {
        var active = count >= parseInt(thresh);
        html += '<div class="tooltip-set-bonus' + (active ? ' active' : '') + '">(' + thresh + ') ' + (setDef.bonuses[thresh].special ? setDef.bonuses[thresh].special.description : JSON.stringify(setDef.bonuses[thresh].stats)) + '</div>';
      }
    }
  }
  if (item.flavorText) {
    html += '<div class="tooltip-flavor">' + item.flavorText + '</div>';
  }
  if (matDef && matDef.gate) {
    html += '<div class="tooltip-req">Requires: ' + matDef.gate.replace(/_/g, ' ') + '</div>';
  }
  html += '</div>';
  return html;
}
```

- [ ] **Step 3:** Add `renderArmoryPanel(container, state, data, engines)` following the existing render pattern:
```javascript
function renderArmoryPanel(container, state, data, engines) {
  if (!container._armoryInit) _armoryBuildSkeleton(container, data);
  window._armoryState = state;
  window._armoryData = data;

  // Update equipped slots
  var slotIds = ['head','amulet','weapon','body','hands','ring1','ring2','feet'];
  for (var i = 0; i < slotIds.length; i++) {
    var slotId = slotIds[i];
    var el = document.getElementById('equip-' + slotId);
    if (!el) continue;
    var item = state.equipment.equipped[slotId];
    if (item) {
      var rarityDef = data.items.rarities.find(function(r) { return r.id === item.rarity; });
      el.innerHTML = '<span class="slot-item" style="color:' + (rarityDef ? rarityDef.color : '#ccc') + '">' + item.name + '</span>';
      el.className = 'doll-slot filled ' + item.rarity;
      el.draggable = true;
      el.setAttribute('data-item-id', item.id);
    } else {
      var label = slotId === 'ring1' || slotId === 'ring2' ? 'Ring' : slotId.charAt(0).toUpperCase() + slotId.slice(1);
      el.innerHTML = '<span class="slot-label">' + label + '</span>';
      el.className = 'doll-slot empty';
      el.draggable = false;
    }
  }

  // Update dust counter
  var dustEl = document.getElementById('armory-dust');
  if (dustEl) dustEl.textContent = 'Arcane Dust: ' + (state.equipment.arcaneDust || 0);

  // Update inventory count
  var countEl = document.getElementById('inv-count');
  if (countEl) countEl.textContent = state.equipment.inventory.length + '/60';

  // Update inventory grid
  var grid = document.getElementById('inv-grid');
  if (grid) {
    var filter = container._invFilter || 'all';
    var slotOrder = ['weapon','head','body','hands','feet','amulet','ring1','ring2'];
    var rarityOrder = ['set','legendary','epic','rare','uncommon','common'];
    var items = state.equipment.inventory.slice().sort(function(a, b) {
      var slotDiff = slotOrder.indexOf(a.slot) - slotOrder.indexOf(b.slot);
      if (slotDiff !== 0) return slotDiff;
      return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
    });
    var html = '';
    for (var j = 0; j < items.length; j++) {
      var itm = items[j];
      var slotMatch = filter === 'all' || itm.slot === filter || (filter === 'ring' && (itm.slot === 'ring1' || itm.slot === 'ring2'));
      if (!slotMatch) continue;
      html += _renderItemCard(itm, data, state);
    }
    if (html === '') html = '<div class="inv-empty">No items</div>';
    grid.innerHTML = html;
  }

  // Pending loot
  var pendingEl = document.getElementById('pending-loot');
  if (pendingEl) {
    if (state.equipment.pendingLoot.length > 0) {
      pendingEl.style.display = '';
      var pendingGrid = document.getElementById('pending-grid');
      if (pendingGrid) {
        var ph = '';
        for (var p = 0; p < state.equipment.pendingLoot.length; p++) {
          ph += _renderItemCard(state.equipment.pendingLoot[p], data, state);
        }
        pendingGrid.innerHTML = ph;
      }
    } else {
      pendingEl.style.display = 'none';
    }
  }

  // Stat summary bar
  var bonuses = calculateEquipmentBonuses(state, data);
  var primaryEl = document.getElementById('stat-primary');
  if (primaryEl) {
    primaryEl.innerHTML = 'AP: ' + Math.round(bonuses.arcane_power) +
      ' | Crit: ' + bonuses.spell_crit_chance + '%' +
      ' | Res: ' + Math.round(bonuses.resilience) +
      ' | HP: +' + Math.round(bonuses.max_hp) +
      ' | Spd: ' + bonuses.speed + '%' +
      ' | Eva: ' + bonuses.evasion + '%';
  }
  var expandedEl = document.getElementById('stat-expanded');
  if (expandedEl) {
    expandedEl.innerHTML = 'CDR: ' + Math.round(bonuses.cdr * 10) / 10 +
      ' | Instability: ' + Math.round(bonuses.instability * 100) / 100 +
      ' | Mana Eff: ' + Math.round(bonuses.mana_efficiency) + '%' +
      ' | HP Regen: ' + Math.round(bonuses.hp_regen) +
      ' | Crit Dmg: +' + Math.round(bonuses.spell_crit_damage * 100) / 100 + 'x' +
      ' | Res Rate: +' + Math.round(bonuses.resource_rate) + '%' +
      ' | Loot: +' + Math.round(bonuses.loot_bonus) + '%';
  }
}
```

- [ ] **Step 4:** Wire `renderArmoryPanel` into the render router. In `_renderActivePanel()` (~line 6861), add a case for `'armory'`:
```javascript
case 'armory':
  renderArmoryPanel(activePanel, state, data, engines);
  break;
```

- [ ] **Step 5:** Verify: `node -c bundle.js`

- [ ] **Step 6:** Commit:
```bash
git add bundle.js
git commit -m "feat(gear): add armory panel rendering with inventory grid and stat bar"
```

---

### Task 12: Nav Unlock & Panel Registration

**Files:**
- Modify: `bundle.js` — `_isNavUnlocked()` (~line 7194), `_updateGrimoireVisibility()` (~line 7254)

- [ ] **Step 1:** Add armory unlock condition in `_isNavUnlocked()`:
```javascript
if (panel === 'armory') {
  return state.equipment.inventory.length > 0 ||
    Object.keys(state.equipment.equipped).some(function(k) { return state.equipment.equipped[k] !== null; });
}
```

- [ ] **Step 2:** Add the armory nav button to the HTML nav bar. Find where nav buttons are created (in `index.html` or dynamically in bundle.js) and add:
```html
<button class="nav-btn" data-panel="armory" id="nav-armory">Armory</button>
```

- [ ] **Step 3:** Verify: `node -c bundle.js`

- [ ] **Step 4:** Commit:
```bash
git add bundle.js index.html
git commit -m "feat(gear): add armory nav button and unlock gating"
```

---

## Chunk 6: Engagement Hooks

### Task 13: Daily Bounty System

**Files:**
- Modify: `bundle.js` — add bounty logic, dashboard rendering

- [ ] **Step 1:** Add bounty generation and checking functions to the EQUIPMENT section:
```javascript
function generateBounty(state, data) {
  var today = new Date().toISOString().slice(0, 10);
  if (state.equipment.lastBountyDate === today && state.equipment.bountyActive) return;

  var hasT3 = state.research.completed.some(function(id) { return id.includes('_t3_'); });
  var hasT2 = state.research.completed.some(function(id) { return id.includes('_t2_'); });
  var hasCombat = (state.discoveries.counters.combat_win || 0) > 0;

  var bounty;
  if (hasT3) {
    bounty = { text: 'Win a Tier 2+ combat encounter', check: function(s) { return (s.discoveries.counters.combat_win || 0) > (s._bountyWinsAtStart || 0); } };
  } else if (hasCombat) {
    bounty = { text: 'Win a combat encounter', check: function(s) { return (s.discoveries.counters.combat_win || 0) > (s._bountyWinsAtStart || 0); } };
  } else if (hasT2) {
    bounty = { text: 'Complete a research node', check: function(s) { return s.research.completed.length > (s._bountyResearchAtStart || 0); } };
  } else {
    bounty = { text: 'Start a research project', check: function(s) { return s.research.inProgress !== null || s.research.completed.length > (s._bountyResearchAtStart || 0); } };
  }

  state.equipment.bountyActive = {
    text: bounty.text,
    type: hasT3 ? 'win_t2' : hasCombat ? 'win_any' : hasT2 ? 'complete_research' : 'start_research',
    winsAtStart: state.discoveries.counters.combat_win || 0,
    researchAtStart: state.research.completed.length
  };

  if (state.equipment.lastBountyDate !== today) {
    // Check if streak continues
    var yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (state.equipment.lastBountyDate !== yesterday) {
      state.equipment.bountyStreak = 0; // Reset streak
    }
  }
}

function checkBounty(state, data) {
  var b = state.equipment.bountyActive;
  if (!b) return;
  var met = false;
  if (b.type === 'win_t2' || b.type === 'win_any') {
    met = (state.discoveries.counters.combat_win || 0) > (b.winsAtStart || 0);
  } else if (b.type === 'complete_research') {
    met = state.research.completed.length > (b.researchAtStart || 0);
  } else if (b.type === 'start_research') {
    met = state.research.inProgress !== null || state.research.completed.length > (b.researchAtStart || 0);
  }
  if (met) completeBounty(state, data);
}

function completeBounty(state, data) {
  var today = new Date().toISOString().slice(0, 10);
  state.equipment.lastBountyDate = today;
  state.equipment.bountyStreak = (state.equipment.bountyStreak || 0) + 1;
  state.equipment.bountyActive = null;
  state._bountyCheckFn = null;

  // Reward: dust
  var dust = 15 + Math.floor(Math.random() * 16);
  state.equipment.arcaneDust += dust;

  // Reward: guaranteed item
  var minRarity = 'rare';
  if (state.equipment.bountyStreak % 30 === 0) minRarity = 'legendary';
  else if (state.equipment.bountyStreak % 7 === 0) minRarity = 'epic';

  // Find highest unlocked material
  var materials = data.items.materials;
  var highestMat = materials[0];
  for (var i = materials.length - 1; i >= 0; i--) {
    if (isMaterialUnlocked(materials[i], state)) { highestMat = materials[i]; break; }
  }

  var item = generateItem(state, data, {
    iLvlMin: highestMat.iLvlRange[0],
    iLvlMax: highestMat.iLvlRange[1],
    minRarity: minRarity
  });

  if (item && state.equipment.inventory.length < 60) {
    state.equipment.inventory.push(item);
  }

  addJournalEntry(state, 'Bounty complete! +' + dust + ' Arcane Dust. Streak: ' + state.equipment.bountyStreak, 'info');
}
```

- [ ] **Step 2:** Add bounty display to dashboard rendering. In `renderDashboardPanel()`, add a bounty card section after the pursuit section:
```javascript
// Bounty card
var bountyEl = document.getElementById('dash-bounty');
if (bountyEl) {
  if (state.equipment.bountyActive) {
    bountyEl.style.display = '';
    bountyEl.innerHTML = '<div class="bounty-card"><h4>Study Bounty</h4>' +
      '<div class="bounty-text">' + state.equipment.bountyActive.text + '</div>' +
      '<div class="bounty-streak">Streak: ' + (state.equipment.bountyStreak || 0) + '</div></div>';
  } else if (state.equipment.lastBountyDate === new Date().toISOString().slice(0, 10)) {
    bountyEl.style.display = '';
    bountyEl.innerHTML = '<div class="bounty-card completed"><h4>Study Bounty</h4><div class="bounty-text">Complete! Return tomorrow.</div>' +
      '<div class="bounty-streak">Streak: ' + (state.equipment.bountyStreak || 0) + ' 🔥</div></div>';
  } else {
    bountyEl.style.display = 'none';
  }
}
```

- [ ] **Step 3:** Add `<div id="dash-bounty"></div>` to the dashboard skeleton.

- [ ] **Step 4:** Wire `generateBounty` and `checkBounty` into the game loop. In `startGameLoop()`, after the tutorial system calls, add:
```javascript
generateBounty(state, data);
checkBounty(state, data);
```

- [ ] **Step 5:** Verify: `node -c bundle.js`

- [ ] **Step 6:** Commit:
```bash
git add bundle.js css/style.css
git commit -m "feat(gear): add daily bounty system with streak rewards"
```

---

### Task 14: Loot Ceremony & Identification

**Files:**
- Modify: `bundle.js` — add loot ceremony UI logic
- Modify: `css/style.css` — add ceremony animations

- [ ] **Step 1:** Add module-level loot ceremony queue and rendering:
```javascript
var _lootCeremonyQueue = [];
var _lootCeremonyActive = false;

function queueLootCeremony(item, data) {
  if (item.rarity === 'common' || item.rarity === 'uncommon') return; // No ceremony for commons
  _lootCeremonyQueue.push(item);
  if (!_lootCeremonyActive) showNextLootCeremony(data);
}

function showNextLootCeremony(data) {
  if (_lootCeremonyQueue.length === 0) { _lootCeremonyActive = false; return; }
  _lootCeremonyActive = true;
  var item = _lootCeremonyQueue.shift();
  var overlay = document.getElementById('loot-ceremony-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'loot-ceremony-overlay';
    overlay.className = 'loot-ceremony-overlay';
    document.body.appendChild(overlay);
  }

  var rarityDef = data.items.rarities.find(function(r) { return r.id === item.rarity; });
  var color = rarityDef ? rarityDef.color : '#ccc';
  var isLeg = item.rarity === 'legendary' || item.rarity === 'set';
  var shakeClass = isLeg ? ' screen-shake' : '';

  var displayName = item.identified === false ? 'Unidentified ' + item.slot : item.name;
  overlay.innerHTML = '<div class="loot-drop-ceremony' + shakeClass + '">' +
    '<div class="loot-flare" style="background:' + color + '"></div>' +
    '<div class="loot-item-reveal">' +
      '<div class="loot-rarity" style="color:' + color + '">' + (rarityDef ? rarityDef.name : item.rarity) + '</div>' +
      '<div class="loot-name" style="color:' + color + '">' + displayName + '</div>' +
    '</div>' +
    '<button class="loot-dismiss">Continue</button>' +
  '</div>';
  overlay.style.display = 'flex';

  overlay.querySelector('.loot-dismiss').addEventListener('click', function() {
    overlay.style.display = 'none';
    showNextLootCeremony(data);
  });
}
```

- [ ] **Step 2:** Add `identifyItem(state, itemId)`:
```javascript
function identifyItem(state, itemId) {
  var item = findItemById(state, itemId);
  if (item) item.identified = true;
}
```

- [ ] **Step 3:** Modify the loot drop in `victory()` to call `queueLootCeremony(item, data)` after adding to inventory.

- [ ] **Step 3B:** Add item comparison logic to the loot ceremony. When the dropped item's slot has an equipped item, show a comparison panel below the item name in the ceremony:
```javascript
// In showNextLootCeremony, after the item name:
var equipped = window._armoryState && window._armoryState.equipment.equipped[item.slot];
var compHtml = '';
if (equipped && item.identified !== false) {
  compHtml = '<div class="loot-comparison">' +
    '<div class="comp-equipped"><span class="comp-label">Equipped</span>' + equipped.name + '</div>' +
    '<div class="comp-vs">vs</div>' +
    '<div class="comp-new"><span class="comp-label">New</span>' + item.name + '</div>' +
    '<div class="comp-deltas">';
  // Compare affix totals
  var eqTotals = {}, newTotals = {};
  equipped.affixes.forEach(function(a) { eqTotals[a.stat] = (eqTotals[a.stat]||0) + a.value; });
  item.affixes.forEach(function(a) { newTotals[a.stat] = (newTotals[a.stat]||0) + a.value; });
  var allStats = Object.keys(Object.assign({}, eqTotals, newTotals));
  for (var si = 0; si < allStats.length; si++) {
    var stat = allStats[si];
    var diff = (newTotals[stat]||0) - (eqTotals[stat]||0);
    if (diff !== 0) {
      var cls = diff > 0 ? 'comp-up' : 'comp-down';
      var sign = diff > 0 ? '+' : '';
      compHtml += '<span class="' + cls + '">' + sign + (Math.round(diff*10)/10) + ' ' + stat.replace(/_/g,' ') + '</span> ';
    }
  }
  compHtml += '</div></div>';
}
// Insert compHtml after the loot-name div
```

- [ ] **Step 4:** Add CSS for loot ceremony: overlay, flare animation, bounce keyframes, screen shake keyframes, rarity glow borders.

- [ ] **Step 5:** Verify: `node -c bundle.js`

- [ ] **Step 6:** Commit:
```bash
git add bundle.js css/style.css
git commit -m "feat(gear): add loot drop ceremony and item identification"
```

---

### Task 15: Codex Tab

**Files:**
- Modify: `bundle.js` — add codex rendering in armory panel

- [ ] **Step 1:** Add `_renderCodexTab(container, state, data)` that shows all legendaries and set pieces with discovered/silhouette states:
```javascript
function _renderCodexTab(container, state, data) {
  var html = '<div class="codex-panel">';

  // Legendaries
  var legs = data.items.legendaries || [];
  var legFound = 0;
  html += '<h4>Legendaries (' + state.equipment.codex.filter(function(id) { return legs.some(function(l) { return l.id === id; }); }).length + '/' + legs.length + ')</h4>';
  html += '<div class="codex-grid">';
  for (var i = 0; i < legs.length; i++) {
    var found = state.equipment.codex.indexOf(legs[i].id) !== -1;
    if (found) {
      html += '<div class="codex-entry revealed legendary">' +
        '<div class="codex-name" style="color:#d4881e">' + legs[i].name + '</div>' +
        '<div class="codex-slot">' + legs[i].slot + '</div>' +
        '<div class="codex-effect">' + legs[i].uniqueEffect.description + '</div></div>';
    } else {
      html += '<div class="codex-entry silhouette">' +
        '<div class="codex-name">???</div>' +
        '<div class="codex-slot">' + legs[i].slot + '</div></div>';
    }
  }
  html += '</div>';

  // Sets
  var sets = data.items.sets || [];
  html += '<h4>Sets</h4>';
  for (var s = 0; s < sets.length; s++) {
    var setDef = sets[s];
    html += '<div class="codex-set"><div class="codex-set-name" style="color:#d4a017">' + setDef.name + '</div>';
    html += '<div class="codex-set-pieces">';
    for (var p = 0; p < setDef.pieces.length; p++) {
      var pieceFound = state.equipment.codex.indexOf(setDef.pieces[p].id) !== -1;
      html += '<span class="codex-piece' + (pieceFound ? ' found' : '') + '">' + setDef.pieces[p].slot + '</span>';
    }
    html += '</div>';
    // Show bonuses
    for (var b in setDef.bonuses) {
      html += '<div class="codex-set-bonus">(' + b + ') ' + (setDef.bonuses[b].special ? setDef.bonuses[b].special.description : JSON.stringify(setDef.bonuses[b].stats)) + '</div>';
    }
    html += '</div>';
  }
  html += '</div>';

  container.innerHTML = html;
}
```

- [ ] **Step 2:** Wire the codex tab into `renderArmoryPanel()` — when `container._armoryTab === 'codex'`, call `_renderCodexTab` into the `armory-tab-content` div.

- [ ] **Step 3:** Add CSS for codex entries (silhouette style, revealed style, set piece indicators).

- [ ] **Step 4:** Verify: `node -c bundle.js`

- [ ] **Step 5:** Commit:
```bash
git add bundle.js css/style.css
git commit -m "feat(gear): add collection codex tab"
```

---

### Task 16: Salvage UI Tab

**Files:**
- Modify: `bundle.js` — add salvage tab rendering in armory panel

- [ ] **Step 1:** Add `_renderSalvageTab(container, state, data)`:
```javascript
function _renderSalvageTab(container, state, data) {
  var html = '<div class="salvage-panel">';
  html += '<div class="dust-display">Arcane Dust: ' + (state.equipment.arcaneDust || 0) + '</div>';

  // Craft section
  html += '<h4>Craft New Item</h4>';
  html += '<div class="craft-section">';
  html += '<select id="craft-slot"><option value="">Select Slot</option>';
  var slotKeys = Object.keys(data.items.slots);
  for (var i = 0; i < slotKeys.length; i++) {
    html += '<option value="' + slotKeys[i] + '">' + data.items.slots[slotKeys[i]].name + '</option>';
  }
  html += '</select>';
  html += '<select id="craft-base"><option value="">Select Base Type</option></select>';
  html += '<select id="craft-material"><option value="">Select Material</option>';
  for (var m = 0; m < data.items.materials.length; m++) {
    var mat = data.items.materials[m];
    if (isMaterialUnlocked(mat, state)) {
      var cost = getDustCost('craft_base', mat.id, data);
      html += '<option value="' + mat.id + '">' + mat.name + ' (Cost: ' + cost + ' dust)</option>';
    }
  }
  html += '</select>';
  html += '<button id="craft-btn" class="salvage-btn">Craft</button>';
  html += '</div>';

  // Item operations (show when item selected)
  html += '<h4>Modify Item</h4>';
  html += '<div class="modify-section">';
  html += '<p class="modify-hint">Click an item in inventory to select it for modification.</p>';
  html += '<div id="modify-target" style="display:none"></div>';
  html += '</div>';

  html += '</div>';
  container.innerHTML = html;
}
```

- [ ] **Step 2:** Wire salvage tab into `renderArmoryPanel()` — when `container._armoryTab === 'salvage'`, render the salvage tab.

- [ ] **Step 3:** Add click handlers for craft button and item selection for modification (reroll, enchant, lock, upgrade, reforge, salvage).

- [ ] **Step 4:** Add CSS for salvage panel.

- [ ] **Step 5:** Verify: `node -c bundle.js`

- [ ] **Step 6:** Commit:
```bash
git add bundle.js css/style.css
git commit -m "feat(gear): add salvage and crafting UI tab"
```

---

## Chunk 7: Convergence Drop & Item Tooltip Interactions

### Task 17: Convergence Bonus Drop

**Files:**
- Modify: `bundle.js` — `converge()` function (~line 4925)

- [ ] **Step 1:** In `converge()`, BEFORE the research/resource resets (before line 4942 `state.resources[key].amount = 0`), compute the highest unlocked material tier and store it in a local variable. Then AFTER the convergence count increment and journal entry (~line 5010), use that pre-computed material to generate the drop:
At the TOP of `converge()`, before any resets:
```javascript
// Pre-compute highest material before research is wiped
var _convMaterials = data.items.materials;
var _convHighestMat = _convMaterials[0];
for (var mi = _convMaterials.length - 1; mi >= 0; mi--) {
  if (isMaterialUnlocked(_convMaterials[mi], state)) { _convHighestMat = _convMaterials[mi]; break; }
}
```

Then AFTER the convergence count increment and journal entry (~line 5010):
```javascript
// Convergence bonus item drop (uses pre-computed material)
var convItem = generateItem(state, data, {
  iLvlMin: _convHighestMat.iLvlRange[0],
  iLvlMax: _convHighestMat.iLvlRange[1],
  minRarity: 'rare'
});
if (convItem && state.equipment.inventory.length < 60) {
  state.equipment.inventory.push(convItem);
  addJournalEntry(state, 'The Convergence left behind: ' + convItem.name, 'info');
}
```

Note: `converge()` already takes `(state, data)` — verified.

- [ ] **Step 2:** Verify converge does NOT reset `state.equipment` (it shouldn't — equipment is a separate top-level key, not inside state.combat).

- [ ] **Step 3:** Verify: `node -c bundle.js`

- [ ] **Step 4:** Commit:
```bash
git add bundle.js
git commit -m "feat(gear): add guaranteed item drop on convergence"
```

---

### Task 18: Item Click Interactions & Tooltip Display

**Files:**
- Modify: `bundle.js` — add global tooltip handler
- Modify: `css/style.css`

- [ ] **Step 1:** Add a global tooltip element and click handler system. Near initialization (~line 7290):
```javascript
// Item tooltip system
var _tooltipEl = null;
function showItemTooltip(item, data, state, anchorEl) {
  if (!_tooltipEl) {
    _tooltipEl = document.createElement('div');
    _tooltipEl.id = 'item-tooltip-global';
    _tooltipEl.className = 'item-tooltip-container';
    document.body.appendChild(_tooltipEl);
  }
  _tooltipEl.innerHTML = _renderItemTooltip(item, data);
  _tooltipEl.style.display = 'block';
  // Position near anchor
  var rect = anchorEl.getBoundingClientRect();
  _tooltipEl.style.left = Math.min(rect.right + 8, window.innerWidth - 320) + 'px';
  _tooltipEl.style.top = Math.max(rect.top, 8) + 'px';

  // Add action buttons
  var actions = '<div class="tooltip-actions">';
  if (item.identified === false) {
    actions += '<button class="tooltip-btn" onclick="identifyItem(window._armoryState, \'' + item.id + '\'); hideItemTooltip();">Identify</button>';
  }
  // Check if in inventory (not equipped)
  var inInv = window._armoryState.equipment.inventory.some(function(i) { return i.id === item.id; });
  if (inInv && item.identified !== false) {
    actions += '<button class="tooltip-btn" onclick="var s=window._armoryState; var sl=\'' + item.slot + '\'; if(sl===\'ring1\'||sl===\'ring2\'){sl=s.equipment.equipped.ring1?\'ring2\':\'ring1\';} equipItem(s,window._armoryData,\'' + item.id + '\',sl); hideItemTooltip();">Equip</button>';
    actions += '<button class="tooltip-btn salvage" onclick="salvageItem(window._armoryState,window._armoryData,\'' + item.id + '\'); hideItemTooltip();">Salvage</button>';
  }
  // Check if equipped
  for (var slot in window._armoryState.equipment.equipped) {
    if (window._armoryState.equipment.equipped[slot] && window._armoryState.equipment.equipped[slot].id === item.id) {
      actions += '<button class="tooltip-btn" onclick="unequipItem(window._armoryState,window._armoryData,\'' + slot + '\'); hideItemTooltip();">Unequip</button>';
      break;
    }
  }
  actions += '</div>';
  _tooltipEl.innerHTML += actions;
}

function hideItemTooltip() {
  if (_tooltipEl) _tooltipEl.style.display = 'none';
}
```

- [ ] **Step 2:** Add delegated click handler on the armory container for item cards:
```javascript
// In _armoryBuildSkeleton, add:
container.addEventListener('click', function(e) {
  var card = e.target.closest('.item-card');
  if (card) {
    var itemId = card.getAttribute('data-item-id');
    var item = findItemById(window._armoryState, itemId);
    if (item) showItemTooltip(item, window._armoryData, window._armoryState, card);
    return;
  }
  // Click on equipped slot
  var slot = e.target.closest('.doll-slot.filled');
  if (slot) {
    var slotId = slot.getAttribute('data-slot');
    var eqItem = window._armoryState.equipment.equipped[slotId];
    if (eqItem) showItemTooltip(eqItem, window._armoryData, window._armoryState, slot);
    return;
  }
});

// Dismiss tooltip on click outside
document.addEventListener('click', function(e) {
  if (_tooltipEl && !_tooltipEl.contains(e.target) && !e.target.closest('.item-card') && !e.target.closest('.doll-slot')) {
    hideItemTooltip();
  }
});
```

- [ ] **Step 3:** Add CSS for tooltip positioning, action buttons, and dismiss behavior.

- [ ] **Step 4:** Verify: `node -c bundle.js`

- [ ] **Step 5:** Commit:
```bash
git add bundle.js css/style.css
git commit -m "feat(gear): add item tooltip display and click interactions"
```

---

## Chunk 8: CSS & Polish

### Task 19: Full CSS Styling

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1:** Add complete armory panel CSS:
- `.armory-panel` — dark background, padding
- `.armory-layout` — flexbox, side-by-side paper doll + inventory
- `.paper-doll-section` — fixed width left column
- `.paper-doll` — CSS grid positioning slots anatomically
- `.doll-slot` — bordered boxes, 80x50px, centered text, hover highlight
- `.doll-slot.empty` — dim border, muted text
- `.doll-slot.filled` — rarity-colored border
- `.inventory-section` — flex-grow right column
- `.inventory-grid` — CSS grid, 3 columns, gap, scrollable max-height
- `.item-card` — bordered card, padding, rarity border-left accent, hover glow, cursor pointer
- `.item-card.common` through `.item-card.set` — rarity-specific border colors matching spec colors
- `.item-name` — font-weight bold
- `.item-meta` — small, muted text

- [ ] **Step 2:** Add rarity glow/border CSS:
- `.common` border: #cccccc
- `.uncommon` border: #4dbd4d
- `.rare` border: #4d8bbd
- `.epic` border: #a64dbd
- `.legendary` border: #d4881e with subtle box-shadow glow
- `.set` border: #d4a017 with subtle box-shadow glow

- [ ] **Step 3:** Add tooltip CSS:
- `.item-tooltip-container` — fixed position, z-index 1000, dark background, border, max-width 300px, rounded corners
- `.item-tooltip` — padding, font-size
- `.tooltip-name` — large, bold
- `.tooltip-rarity` — small caps
- `.tooltip-affixes` — list of affix lines
- `.affix-line` — with quality dot indicator pseudo-elements
- `.quality-good` — blue dot
- `.quality-great` — purple dot
- `.quality-exceptional` — orange dot
- `.quality-perfect` — gold dot with sparkle animation
- `.tooltip-unique` — orange text, italic
- `.tooltip-set-name` — gold text
- `.tooltip-set-bonus` — dim when inactive, bright when active
- `.tooltip-flavor` — italic, muted
- `.tooltip-actions` — button row at bottom

- [ ] **Step 4:** Add loot ceremony CSS:
- `.loot-ceremony-overlay` — fullscreen, dark semi-transparent, flex center, z-index 2000
- `.loot-drop-ceremony` — centered card, dark background
- `.loot-flare` — radial gradient pulse animation
- `@keyframes lootBounce` — item drops in from top
- `@keyframes rarityFlare` — color pulse outward
- `.screen-shake` — 0.3s shake animation for legendaries
- `@keyframes screenShake` — translate jitter

- [ ] **Step 5:** Add stat bar, codex, salvage, bounty, filter, and tab CSS.

- [ ] **Step 6:** Add `.dust-counter` and `.insight-counter` styling (both on dashboard and armory).

- [ ] **Step 7:** Add combat log styles for new types:
- `.combat-crit` — gold text, bold
- `.combat-dodge` — blue-green text
- `.combat-heal` — green text (may already exist)

- [ ] **Step 8:** Commit:
```bash
git add css/style.css
git commit -m "feat(gear): add complete armory and loot ceremony CSS"
```

---

### Task 20: Unique Effect Hooks in Combat

**Files:**
- Modify: `bundle.js` — combat functions

- [ ] **Step 1:** Add `processUniqueEffects(state, data, hookType, context)`:
```javascript
function processUniqueEffects(state, data, hookType, context) {
  var bonuses = calculateEquipmentBonuses(state, data);
  var effects = bonuses.unique_effects || [];
  for (var i = 0; i < effects.length; i++) {
    var eff = effects[i];
    if (eff.type !== hookType) continue;

    switch (eff.id) {
      case 'mana_refund_on_kill':
        if (context && context.manaCost) {
          var refund = Math.min(Math.floor(context.manaCost * eff.value), eff.cap || 100);
          state.resources.mana.amount += refund;
          state.combat.log.push({ text: 'Mana refunded: ' + refund, type: 'info' });
        }
        break;
      case 'generator_crit_bonus':
        // The Unblinking Eye: passive, handled in calculateEquipmentBonuses
        break;
      case 'paradox_triple':
        // Paradox Staff: every 3rd spell does double damage
        state.combat._spellCastCount = (state.combat._spellCastCount || 0) + 1;
        if (state.combat._spellCastCount % 3 === 0 && context) {
          context.damageMultiplier = (context.damageMultiplier || 1) * 2;
          state.combat.log.push({ text: 'Paradox Staff surges with power!', type: 'crit' });
        }
        break;
      case 'regen_boost_low_hp':
        // Robes of the First Arcanist: handled in HP regen section
        break;
      case 'cdr_on_crit':
        // Quicksilver Wraps: extra CDR tick on crit
        for (var spellId in state.combat.cooldowns) {
          state.combat.cooldowns[spellId] = Math.max(0, state.combat.cooldowns[spellId] - 1);
        }
        state.combat.log.push({ text: 'Quicksilver Wraps flash!', type: 'info' });
        break;
      case 'evasion_after_spatial':
        // Wanderer's Paradox: 2 rounds of double evasion after spatial spell
        state.combat._evasionBoostRounds = 2;
        break;
      case 'lifesteal':
        // Ouroboros Band: 10% damage as HP
        if (context && context.damage) {
          var heal = Math.floor(context.damage * eff.value);
          state.combat.health = Math.min(state.combat.maxHealth, state.combat.health + heal);
          if (heal > 0) state.combat.log.push({ text: 'Ouroboros heals ' + heal + ' HP', type: 'heal' });
        }
        break;
      case 'double_insights':
        // Convergence Shard: passive, handled in victory()
        break;
      case 'temporal_loop':
        // Set bonus: prevent death once per combat
        if (context && context.wouldDie && !state.combat._temporalLoopUsed) {
          state.combat._temporalLoopUsed = true;
          state.combat.health = Math.floor(state.combat.maxHealth * 0.5);
          state.combat.cooldowns = {};
          state.combat.log.push({ text: 'Temporal Loop activates! Time rewinds!', type: 'crit' });
          context.wouldDie = false;
        }
        break;
      case 'void_step':
        // Set bonus: next spell free after dodge
        if (context && context.dodged) {
          state.combat._voidStepActive = true;
        }
        break;
    }
  }
}
```

- [ ] **Step 2:** Add calls to `processUniqueEffects` at each hook point in combatTick():
- `on_kill`: in `victory()` before clearing combat
- `on_crit`: after crit damage is confirmed
- `on_cast`: after spell is cast
- `on_hit`: after damage is dealt to enemy
- `on_damaged`: after player takes damage (add death prevention check)
- `on_dodge`: after successful evasion

- [ ] **Step 3:** Handle Convergence Shard (double insights) in `victory()`:
```javascript
var bonuses = calculateEquipmentBonuses(state, data);
if (bonuses.unique_effects.some(function(e) { return e.id === 'double_insights'; })) {
  insightGain *= 2;
}
```

- [ ] **Step 4:** Handle The Unblinking Eye (crit per generator) and Convergence Echoes 4pc (Echoing Power) in `calculateEquipmentBonuses`. After normal affix summation and set bonus evaluation:
```javascript
// After normal affix summation
var genCount = 0;
for (var gk in state.generators) { if (state.generators[gk].count > 0) genCount++; }
for (var ui = 0; ui < bonuses.unique_effects.length; ui++) {
  if (bonuses.unique_effects[ui].id === 'generator_crit_bonus') {
    bonuses.spell_crit_chance += genCount * 2;
  }
}

// Convergence Echoes 4pc "Echoing Power": items behave as if 5 iLvls higher
// Re-evaluate all equipped affix values using iLvl+5 tier ranges
if (bonuses.set_bonuses.indexOf('convergence_echoes_4') !== -1) {
  // Recalculate: for each equipped item, find what tier iLvl+5 would fall in,
  // then scale each affix value proportionally from current tier range to new tier range
  for (var ek in state.equipment.equipped) {
    var eItem = state.equipment.equipped[ek];
    if (!eItem) continue;
    var curMat = data.items.materials.find(function(m) { return m.id === eItem.material; });
    var boostedMat = getMaterialForILvl(eItem.iLvl + 5, data);
    if (!curMat || !boostedMat || curMat.tier === boostedMat.tier) continue;
    for (var ea = 0; ea < eItem.affixes.length; ea++) {
      var eAffix = eItem.affixes[ea];
      var eAffixDef = data.items.affixes.find(function(x) { return x.id === eAffix.stat; });
      if (!eAffixDef) continue;
      var curRange = eAffixDef.tiers[String(curMat.tier)];
      var newRange = eAffixDef.tiers[String(boostedMat.tier)];
      if (!curRange || !newRange) continue;
      // Calculate how far through the current range this roll is, apply to new range
      var pct = curRange[1] === curRange[0] ? 1 : (eAffix.value - curRange[0]) / (curRange[1] - curRange[0]);
      var boostedVal = newRange[0] + pct * (newRange[1] - newRange[0]);
      var diff = boostedVal - eAffix.value;
      if (diff > 0 && bonuses.hasOwnProperty(eAffix.stat)) {
        bonuses[eAffix.stat] += diff;
      }
    }
  }
}
```

- [ ] **Step 5:** Verify: `node -c bundle.js`

- [ ] **Step 6:** Commit:
```bash
git add bundle.js
git commit -m "feat(gear): add unique effect and set bonus combat hooks"
```

---

### Task 21: End-to-End Wiring & Verification

**Files:**
- Modify: `bundle.js` — final integration touches

- [ ] **Step 1:** Verify all new functions are accessible within the IIFE scope. Check that `generateItem`, `equipItem`, `unequipItem`, `salvageItem`, `calculateEquipmentBonuses`, `identifyItem`, and all salvage recipe functions are defined before they're used.

- [ ] **Step 2:** Add equipment-related functions to the `engines` object or expose them on `window.debug`:
```javascript
window.debug.equipment = {
  generateItem: function(opts) { return generateItem(state, data, opts); },
  equipItem: function(itemId, slot) { return equipItem(state, data, itemId, slot); },
  unequipItem: function(slot) { return unequipItem(state, data, slot); },
  salvageItem: function(itemId) { return salvageItem(state, data, itemId); },
  bonuses: function() { return calculateEquipmentBonuses(state, data); }
};
```

- [ ] **Step 3:** Add `_lastActionTime = Date.now()` reset to drag-and-drop and salvage actions (so ambient entries don't fire while player is actively managing inventory).

- [ ] **Step 4:** Verify full syntax check: `node -c bundle.js`

- [ ] **Step 5:** Manual testing checklist (open index.html in browser):
- [ ] New game starts without errors
- [ ] No Armory nav button visible initially
- [ ] Win first combat → item drops → Armory appears
- [ ] Can open Armory → paper doll shows 8 empty slots
- [ ] Item appears in inventory grid
- [ ] Can click item → tooltip shows
- [ ] Can drag item to slot → equips
- [ ] Stat summary bar updates
- [ ] Can drag back to unequip
- [ ] Can salvage → dust gained
- [ ] Loot ceremony fires for Rare+ drops
- [ ] Daily bounty appears on dashboard
- [ ] Codex tab shows legendaries as silhouettes
- [ ] Equipment stats affect combat (verify with debug.equipment.bonuses())

- [ ] **Step 6:** Commit:
```bash
git add bundle.js
git commit -m "feat(gear): final wiring and end-to-end integration"
```
