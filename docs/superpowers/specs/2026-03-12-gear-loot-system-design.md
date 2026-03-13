# Gear & Loot System

## Overview

The Arcanist's Study currently has no equipment or item system. Combat rewards are limited to Arcane Insights and resources. This design adds a full Diablo/RuneScape-inspired gear system: 8 equipment slots, 6 material tiers, 6 rarities, an affix pool with weighted random rolls, legendaries with unique effects, set bonuses, a salvage/enchanting economy, drag-and-drop inventory management with a character paper doll, and engagement hooks (loot ceremony, pity timer, collection codex, daily bounties).

## Goals

- Give combat meaningful, exciting loot drops that create a "one more fight" loop
- Add deep item customization through random affixes, enchanting, and salvaging
- Create a visual inventory experience with drag-and-drop equipping on a character paper doll
- Make every rarity tier feel distinct and every drop feel like it could be special
- Future-proof all item data with icon/vfx fields for eventual art and animation

## Non-Goals

- Art assets or sprite sheets (unicode/CSS-only for now, fields reserved for future)
- Cosmetic shop implementation (placeholder state only)
- Glyph Transcription minigame (separate follow-up project, will use this system's drop pipeline)
- Mobile-specific drag-and-drop handling
- Multiplayer trading

---

## Section 1: Equipment Slots & Base Types

### Slots

8 equipment slots on the character paper doll:

| Slot | Thematic Name | Primary Stat Tendency |
|------|--------------|----------------------|
| Head | Crown / Circlet / Hood / Mask | Arcane Power, Instability |
| Amulet | Pendant / Talisman / Choker | Resource generation rates |
| Weapon | Staff / Wand / Tome / Orb | Arcane Power, Spell Damage |
| Body | Robe / Vestment / Mantle | Resilience, Max HP |
| Hands | Gloves / Wraps / Bracers | Speed, Cooldown reduction |
| Ring 1 | Band / Signet / Loop / Seal | Any (wildcard slot) |
| Ring 2 | Band / Signet / Loop / Seal | Any (wildcard slot) |
| Feet | Boots / Sandals / Greaves | Speed, Evasion |

### Combat Stats

Items can roll any combination of these 13 stats:

| Stat | What It Does | Primary Sources |
|------|-------------|-----------------|
| **Arcane Power** | Base spell damage | Weapons, Heads |
| **Spell Crit Chance** | % chance to deal bonus spell damage | Rings, Amulets |
| **Spell Crit Damage** | Bonus multiplier on crits (default 1.5x) | Weapons, Rings |
| **Resilience** | Flat damage reduction on incoming hits | Body, Hands |
| **Max HP** | Bonus to health pool (stacks on top of existing `100 + resilience*5` formula) | Body, Feet, Amulets |
| **HP Regen** | HP restored per combat round | Body, Rings |
| **Speed** | % chance for bonus action per round (cap 50%) | Feet, Hands |
| **Cooldown Reduction** | Reduces spell cooldowns by N rounds (min 1) | Hands, Heads |
| **Instability** | Widens damage variance (can be good or bad) | Weapons, Heads |
| **Evasion** | % chance to fully dodge an enemy attack | Feet, Rings |
| **Mana Efficiency** | % reduction in spell mana costs | Amulets, Heads |
| **Resource Rate** | % bonus to a specific discipline's generator output | Amulets, Rings |
| **Loot Bonus** | % increased rarity weighting on drops | Rings, Amulets |

### Material Tiers

| Tier | Material Name | Color | iLvl Range | Unlock Gate | Feel |
|------|--------------|-------|------------|-------------|------|
| T1 | **Tallow** | Pale yellow (#f5e6a3) | 1-5 | Game start | Candle-wax crude implements. Barely enchanted. |
| T2 | **Copperscript** | Warm copper (#c87533) | 6-10 | Any T1 research complete | Etched copper with basic inscriptions. Reliable. |
| T3 | **Grimsteel** | Dark grey (#5a5a6e) | 11-15 | Any T2 research complete | Forged from condensed grimoire ink. Serious. |
| T4 | **Voidglass** | Deep purple (#7b2d8b) | 16-20 | Any T3 research complete | Crystallized void energy. Dangerous and powerful. |
| T5 | **Astralweave** | Shimmering blue-white (#a8d8ea) | 21-25 | Any T4 research complete | Woven from starlight and memory. Endgame. |
| T6 | **Convergence** | Shifting gold (#d4a017) | 26-30 | Post-convergence (`convergenceCount >= 1`) | Forged from the echoes of previous cycles. Prestige-tier. |

**Note on T5/T6 drop sources:** The game's research tree and encounter tiers cap at 4. T5/T6 materials are intentionally aspirational — they enter the economy through:
- **T5 (Astralweave):** Tier 4 encounters use an extended iLvl range of 16-25 (overlapping T4 and T5). Roughly 40% of T4 combat drops will roll iLvl 21-25, yielding T5 items. This is the primary T5 source.
- **T6 (Convergence):** Only available post-convergence. The convergence bonus drop always uses iLvl 26-30. Post-convergence Tier 4 encounters further extend their iLvl range to 16-30, with ~20% chance of rolling iLvl 26-30. T6 items are the rarest and most powerful.
- **Future puzzle tiers** (from the Glyph Transcription follow-up project) will provide additional T5/T6 drop sources.

### Base Types Per Slot

Each base type has a **stat weighting** that biases which affixes are more likely to roll. Weights: Heavy (5), Medium (3), Light (1), None (0 / omitted).

**Weapon Slot:**

| Base Type | Stat Weighting | Description |
|-----------|---------------|-------------|
| Staff | Arcane Power (5), Spell Crit Damage (3), Spell Crit Chance (1), Instability (1), Mana Efficiency (1) | Two-handed, raw damage focus |
| Wand | Spell Crit Chance (5), Speed (3), Arcane Power (1), Mana Efficiency (1) | Quick-casting, precision strikes |
| Tome | Mana Efficiency (5), CDR (3), Arcane Power (1), Spell Crit Chance (1) | Utility-focused, sustained casting |
| Orb | Instability (5), Arcane Power (3), Spell Crit Damage (1), Spell Crit Chance (1) | Volatile — high ceiling, low floor |

**Head Slot:**

| Base Type | Stat Weighting | Description |
|-----------|---------------|-------------|
| Circlet | Arcane Power (5), Spell Crit Chance (3), Mana Efficiency (1) | Offensive headgear |
| Hood | Evasion (5), Speed (3), Resilience (1) | Agility-focused |
| Crown | Max HP (5), CDR (3), Resilience (1) | Commanding presence, tanky |
| Mask | Instability (5), Mana Efficiency (3), Arcane Power (1) | Unhinged power |

**Body Slot:**

| Base Type | Stat Weighting | Description |
|-----------|---------------|-------------|
| Robe | Mana Efficiency (5), Max HP (3), Resilience (1) | Classic mage attire |
| Vestment | Resilience (5), HP Regen (3), Max HP (1) | Heavily warded |
| Mantle | Arcane Power (5), Spell Crit Damage (3), Resilience (1) | Offense through defense |

**Hands Slot:**

| Base Type | Stat Weighting | Description |
|-----------|---------------|-------------|
| Gloves | Speed (5), Spell Crit Chance (3), Evasion (1) | Dexterous casting |
| Wraps | Resilience (5), HP Regen (3), Max HP (1) | Protective binding |
| Bracers | CDR (5), Arcane Power (3), Speed (1) | Rune-etched forearm guards |

**Feet Slot:**

| Base Type | Stat Weighting | Description |
|-----------|---------------|-------------|
| Boots | Speed (5), Evasion (3), Resilience (1) | Quick movement |
| Sandals | Mana Efficiency (5), Resource Rate (3), Speed (1) | Grounded, channeling-focused |
| Greaves | Resilience (5), Max HP (3), Evasion (1) | Heavy, protective |

**Amulet Slot:**

| Base Type | Stat Weighting | Description |
|-----------|---------------|-------------|
| Pendant | Resource Rate (5), Mana Efficiency (3), Loot Bonus (1) | Production-oriented |
| Talisman | Max HP (5), HP Regen (3), Resilience (1) | Defensive ward |
| Choker | Spell Crit Chance (5), Spell Crit Damage (3), Arcane Power (1) | Aggressive focus |

**Ring Slot (x2):**

| Base Type | Stat Weighting | Description |
|-----------|---------------|-------------|
| Band | Arcane Power (2), Resilience (2), Speed (2), Max HP (2), Spell Crit Chance (2) | Jack of all trades |
| Signet | Resource Rate (5), Loot Bonus (3), Mana Efficiency (1) | Wealth and production |
| Loop | Evasion (5), Speed (3), CDR (1) | Agility-oriented |
| Seal | Arcane Power (5), Spell Crit Damage (3), Spell Crit Chance (1) | Pure offensive |

### Affix Value Ranges by Material Tier

| Affix | T1 Tallow | T2 Copper | T3 Grim | T4 Void | T5 Astral | T6 Conv |
|-------|-----------|-----------|---------|---------|-----------|---------|
| Arcane Power | +1-3 | +4-8 | +9-15 | +16-24 | +25-38 | +39-55 |
| Spell Crit % | +0.5-1.5% | +2-3.5% | +4-6% | +6.5-9% | +9.5-13% | +13.5-18% |
| Spell Crit Dmg | +0.02-0.05x | +0.06-0.12x | +0.13-0.2x | +0.21-0.3x | +0.31-0.42x | +0.43-0.6x |
| Resilience | +1-3 | +4-7 | +8-13 | +14-21 | +22-33 | +34-48 |
| Max HP | +5-12 | +13-28 | +29-50 | +51-80 | +81-120 | +121-175 |
| HP Regen | +1-2 | +3-4 | +5-7 | +8-11 | +12-16 | +17-23 |
| Speed | +0.5-1.5% | +2-3% | +3.5-5% | +5.5-7.5% | +8-10.5% | +11-14% |
| CDR (rounds) | +0.5 | +0.5-1 | +1 | +1-1.5 | +1.5-2 | +2-2.5 |
| Instability | +0.01-0.03 | +0.04-0.07 | +0.08-0.12 | +0.13-0.18 | +0.19-0.25 | +0.26-0.35 |
| Evasion | +0.5-1.5% | +2-3.5% | +4-5.5% | +6-8% | +8.5-11% | +11.5-15% |
| Mana Efficiency | +1-3% | +4-7% | +8-12% | +13-18% | +19-26% | +27-35% |
| Resource Rate | +1-2% | +3-5% | +6-9% | +10-14% | +15-21% | +22-30% |
| Loot Bonus | +2-5% | +6-10% | +11-17% | +18-26% | +27-38% | +39-55% |

Integer stats (Arcane Power, Resilience, Max HP, HP Regen) round to nearest whole number. Float values round to 1 decimal place.

---

## Section 2: Rarity System

### Affix Count & Drop Rates

| Rarity | Color | Affixes | Drop Weight | Dust Yield | Special |
|--------|-------|---------|-------------|------------|---------|
| **Common** | White (#cccccc) | 1 | 45% | 1-2 | — |
| **Uncommon** | Green (#4dbd4d) | 2 | 28% | 3-5 | — |
| **Rare** | Blue (#4d8bbd) | 3 | 16% | 8-12 | Drops as "Unidentified" |
| **Epic** | Purple (#a64dbd) | 4 | 7% | 18-25 | Drops as "Unidentified" |
| **Legendary** | Orange (#d4881e) | 3-4 random + 1 unique fixed effect | 3% | 40-55 | Named, build-defining. Drops as "Unidentified". |
| **Set** | Gold (#d4a017) | 2-3 random + set bonus at 2/3/4 pieces | 1% | 50-65 | Hand-authored sets. Drops as "Unidentified". |

### Convergence Behavior

- **All items persist through convergence** — full inventory and equipped items survive intact
- Equipment stays equipped, no disruption
- `state.equipment` lives at the top level of state (NOT inside `state.combat`)
- **Critical:** The `converge()` function must NOT touch `state.equipment`. The existing function resets `state.combat` — since equipment is at a separate top-level key, it will survive automatically, but implementers must verify this and not add equipment to the combat reset block.

---

## Section 3: Legendaries & Set Items

### Legendary Items

Hand-authored named items with a unique fixed effect that changes gameplay. Each legendary is tied to a specific slot and material tier. They drop at their fixed iLvl with 3-4 random affixes plus the unique effect.

| Name | Slot | Material | iLvl | Unique Effect |
|------|------|----------|------|--------------|
| **Wick of Eternal Burning** | Head | T3 Grimsteel | 15 | Spells that kill an enemy refund 50% of their mana cost (max 100 mana per refund) |
| **The Unblinking Eye** | Amulet | T4 Voidglass | 20 | +2% Spell Crit Chance for each active generator (stacks) |
| **Paradox Staff** | Weapon | T5 Astralweave | 25 | Every 3rd spell cast in combat deals double damage |
| **Robes of the First Arcanist** | Body | T4 Voidglass | 20 | HP Regen triples when below 30% health |
| **Quicksilver Wraps** | Hands | T3 Grimsteel | 15 | Cooldowns tick down 1 extra round when you crit |
| **Wanderer's Paradox** | Feet | T5 Astralweave | 25 | Evasion chance doubles for 2 rounds after casting a Spatial discipline spell |
| **Ouroboros Band** | Ring | T4 Voidglass | 20 | 10% of damage dealt is returned as HP |
| **Convergence Shard** | Ring | T6 Convergence | 30 | Arcane Insights drop rate doubled |

### Unique Effect Hook Types

| Effect Type | Hook Location | When |
|-------------|-------------|------|
| `on_kill` | `victory()` function | After enemy HP hits 0 |
| `on_crit` | Crit check in `combatTick()` | After a crit is confirmed |
| `on_dodge` | Evasion check in `combatTick()` | After a successful dodge |
| `on_cast` | `castSpell()` | After any spell cast |
| `on_hit` | Damage application | After player deals damage |
| `on_damaged` | Enemy damage phase | After player takes damage |
| `on_low_hp` | Player turn start | When HP below threshold |
| `passive` | `calculateEquipmentBonuses()` | Always active, modifies stats |

### Set Items

**Temporal Paradox Set** (4 pieces — Head, Weapon, Hands, Feet)
*"Time bends around those who wear the full regalia."*

| Pieces | Bonus |
|--------|-------|
| 2 | +8% Speed |
| 3 | Cooldown Reduction +2 on all Temporal spells |
| 4 | **Temporal Loop** — once per combat, when you would die, reset to 50% HP and rewind all cooldowns |

**Voidwalker's Regalia** (3 pieces — Body, Amulet, Ring)
*"Those who gaze into the void find it gazes back — approvingly."*

| Pieces | Bonus |
|--------|-------|
| 2 | +15% Evasion |
| 3 | **Void Step** — after dodging an attack, your next spell costs no mana |

**Convergence Echoes** (4 pieces — Head, Body, Weapon, Amulet)
*"Fragments of every past cycle, resonating together."* (T6 Convergence material — post-prestige set)

| Pieces | Bonus |
|--------|-------|
| 2 | +20% Resource Rate (all disciplines) |
| 3 | +15% Loot Bonus |
| 4 | **Echoing Power** — all equipped items behave as if they were 5 iLvls higher for affix calculations |

---

## Section 4: Salvage & Enchanting System

### Salvage

Breaking down items yields **Arcane Dust**, stored in `state.equipment.arcaneDust`.

Dust yield per rarity is listed in the rarity table above (Section 2).

### Spending Arcane Dust

| Recipe | Cost | Effect |
|--------|------|--------|
| **Reroll Affixes** | 15 dust × material tier | Rerolls all random affixes (keeps rarity, base type, unique/set effects). Locked affixes are preserved. |
| **Upgrade Rarity** | 30 dust × material tier | Common→Uncommon→Rare→Epic. Adds one random affix. Cannot upgrade to Legendary/Set (drop-only). Crafted/upgraded items skip the "Unidentified" reveal (you already know what they are). |
| **Reforge Base Type** | 20 dust × material tier | Changes base type within same slot (e.g., Staff→Wand). Rerolls all affixes. |
| **Craft Base Item** | 10 dust × material tier | Creates a Common item of chosen slot + base type at chosen material tier (must have unlocked that tier). |
| **Enchant One Affix** | 10 dust × material tier | Reroll a single chosen affix. All other affixes stay. |
| **Lock Affix** | 25 dust × material tier | Lock one affix so it cannot be changed by Reroll Affixes. Max 1 locked affix per item. Shows lock icon. |

---

## Section 5: Item Generation & Drop Pipeline

### Generation Flow

```
1. Determine source tier → iLvl range
2. Roll iLvl within range (uniform random integer)
3. Determine material tier from iLvl (lookup which tier's iLvl range contains the rolled value)
4. Roll rarity (weighted, modified by Loot Bonus)
5. If Legendary/Set: pick from eligible pool for that material tier → done
   - **Smart Loot for Sets:** When a Set drop occurs, pieces the player does NOT own are weighted 3x higher than pieces they already have. This prevents endless duplicates while still allowing them.
   - If no eligible legendary/set exists for that material tier, downgrade to Epic
6. Roll slot (uniform random, or forced for specific rewards)
7. Roll base type within slot (uniform random)
8. Roll N affixes based on rarity, using base type stat weights
   - If base type has fewer weighted stats than affixes needed, fill remaining from global affix pool (all stats weight 1)
9. Roll affix values within material tier range
10. Assign random flavor text (Uncommon+)
11. Generate unique ID → create item object
```

### Affix Rolling Algorithm

1. Build weighted pool from base type's stat weights
2. Roll first affix from pool (weighted random selection)
3. Remove that stat from pool (no duplicate affixes on one item)
4. Repeat until N affixes rolled

### Rarity Weighting with Loot Bonus

```
rarityMultiplier = { uncommon: 1, rare: 1.5, epic: 2, legendary: 3, set: 3 }
effectiveWeight[rarity] = baseWeight[rarity] * (1 + (lootBonus/100) * rarityMultiplier[rarity])
```

Common weight stays fixed. Higher Loot Bonus disproportionately boosts rarer tiers — a 50% Loot Bonus gives Uncommon +50% weight but Legendary +150% weight, genuinely shifting the curve toward better rarities.

### Drop Sources

| Source | When | Drop Rate | iLvl Source | Notes |
|--------|------|-----------|-------------|-------|
| **Combat Victory** | Every win | 35% base chance | Encounter tier | Standard drops |
| **Combat Victory (Boss)** | Tier 3+ encounters | 100% chance | Encounter tier | +10% legendary/set weight bonus |
| **Event Reward** | Certain event choices | ~15% on eligible events | Player progression | iLvl based on highest completed research tier |
| **Convergence Bonus** | On each convergence | 1 guaranteed drop | Highest unlocked tier max | Minimum Rare rarity |
| **Puzzle Reward (future)** | Glyph transcription | Scales with puzzle tier | Puzzle tier | Future project |

### Inventory Limits

- **Maximum 60 items** in inventory (not counting equipped)
- **Loot Pending queue** (max 5) when inventory is full. Toast notification warns player.
- If pending queue is also full, oldest pending item is lost (with warning)
- Salvaging directly from the pending queue is allowed

---

## Section 6: Inventory & Paper Doll UI

### Armory Panel

A new **"Armory"** nav panel. Contains two side-by-side regions:

**Left — Character Paper Doll:**
- CSS-drawn silhouette of a robed figure (no image assets)
- 8 equipment slots positioned anatomically: Head (top center), Amulet (neck), Weapon (left hand), Body (torso), Hands (right side), Ring 1 (lower left), Ring 2 (lower right), Feet (bottom center)
- Each slot is a bordered box showing equipped item name in rarity color, or dim placeholder label if empty
- Rarity glow border on filled slots

**Right — Inventory Grid:**
- Scrollable grid of owned items, sorted by slot then rarity (highest first)
- Each item shown as a card: base type name, material tier, rarity-colored border
- Filter tabs: All | Head | Weapon | Body | Hands | Feet | Amulet | Ring
- Item count display: "42/60"

**Bottom — Stat Summary Bar:**
- Horizontal bar showing totaled combat stats from all equipped gear
- Updates live as items are equipped/unequipped
- **Primary row** (always visible): `AP: 45 | Crit: 8.5% | Res: 32 | HP: 185/285 | Spd: 12% | Eva: 6%`
- **Expanded row** (toggle on click/hover): CDR, Instability, Mana Efficiency, HP Regen, Spell Crit Damage, Resource Rate, Loot Bonus

### Drag and Drop

- **Drag from inventory → drop on slot:** Equips item. If slot occupied, old item swaps to inventory.
- **Drag from slot → drop on inventory area:** Unequips item.
- **Drag Ring 1 ↔ Ring 2:** Swaps rings.
- **Click equip button fallback:** Each item tooltip has an "Equip" / "Unequip" button for accessibility.

Implementation: HTML5 Drag and Drop API (`dragstart`, `dragover`, `drop` events). Items get `draggable="true"`. Slot elements are drop targets. On drop, update `state.equipment.equipped[slotId]` and `state.equipment.inventory`, invalidate equipment bonus cache, re-render.

### Item Tooltip

On hover/click, items show a detailed tooltip:

```
┌──────────────────────────────────┐
│ Grimsteel Wand                   │  ← material + base type
│ ● Rare                           │  ← rarity in color
│ Item Level: 14                   │
│                                  │
│ +12 Arcane Power            ●◆   │  ← affix + quality dot
│ +4.8% Spell Crit Chance     ●    │
│ +6% Mana Efficiency              │
│                                  │
│ Requires: T2 Research            │  ← unlock gate
│                                  │
│ "The runes spell out a name      │  ← flavor text (italic)
│  you almost remember."           │
└──────────────────────────────────┘
```

Legendaries show unique effect in orange text. Set items show set name, all bonuses with (X/N) count, active bonuses highlighted.

### Salvage / Enchant UI

A sub-section within the Armory panel (below the inventory grid or as a tab):

- **Salvage button** on each item card/tooltip — click to break down, shows dust yield before confirming. **Legendary/Set items require a second confirmation** ("Are you sure? This item is [Legendary/Set].") to prevent accidental destruction.
- **Enchanting panel** — select an item, see available recipes with dust costs, click to perform
- **Craft panel** — select slot, base type, material tier, click to craft (shows cost)

---

## Section 7: Stat Integration with Combat

### Equipment Bonus Calculation

`calculateEquipmentBonuses(state)` iterates all equipped items, sums affix values by stat, evaluates set bonuses, and returns a flat bonus object. Result is cached; cache invalidates on any equipment change.

```javascript
{
  arcane_power: 45,
  spell_crit_chance: 8.5,
  spell_crit_damage: 0.15,
  resilience: 32,
  max_hp: 85,
  hp_regen: 6,
  speed: 12,
  cdr: 1.5,
  instability: 0.08,
  evasion: 6,
  mana_efficiency: 14,
  resource_rate: 8,
  loot_bonus: 12,
  set_bonuses: ['temporal_paradox_2', 'temporal_paradox_3'],
  unique_effects: ['mana_refund_on_kill']
}
```

### Stat Integration Points

| Stat | Integration Point | How |
|------|------------------|-----|
| **Arcane Power** | `combatTick()` damage calc | Add to base `stats.arcanePower` |
| **Spell Crit Chance** | `combatTick()` after damage roll | `if (Math.random() < critChance) damage *= critMultiplier` — **new mechanic** |
| **Spell Crit Damage** | Above crit check | `critMultiplier = 1.5 + equipBonus.spell_crit_damage` |
| **Resilience** | `combatTick()` enemy damage phase | Add to existing `stats.resilience` |
| **Max HP** | `combat.health` cap | Stacks additively on top of existing formula (`100 + resilience*5`). Effective max = `100 + (totalResilience * 5) + equipBonus.max_hp`. Healing capped at effective max. Display adjusted bar. |
| **HP Regen** | `combatTick()` start of player turn | `health = Math.min(health + hpRegen, maxHp)` — **new mechanic** |
| **Speed** | Existing speed proc check | Add to existing `stats.speed`, cap still 50% |
| **CDR** | `combatTick()` cooldown decrement | Total CDR is floored to integer before applying. E.g., 1.5 CDR from two items → floor(1.5) = 1 extra round removed per tick. Cooldowns decrement by `1 + floor(totalCDR)` per round (min 1 round remaining). |
| **Instability** | Existing instability roll | Add to `stats.instability` |
| **Evasion** | `combatTick()` before enemy damage | `if (Math.random() < evasion) skip damage` — **new mechanic**. Enemy specials have 50% reduced evasion effectiveness. |
| **Mana Efficiency** | `castSpell()` mana cost | `effectiveCost = Math.ceil(baseCost * (1 - manaEfficiency/100))` |
| **Resource Rate** | `resourceTick()` generator output | Applies to ALL discipline generators equally. Multiply each generator's output by `(1 + totalResourceRate/100)`. A single "Resource Rate" affix boosts all resource production, not a specific discipline. |
| **Loot Bonus** | `generateItem()` rarity weights | Feeds into Magic Find rarity weighting |

### New Combat Mechanics

Three mechanics added to support gear stats:

1. **Spell Crit** — After calculating spell damage, roll crit chance. On crit, multiply by crit damage multiplier. Show "CRITICAL!" in combat log with gold text.

2. **Evasion** — Before applying enemy damage, roll evasion chance. On success, skip damage entirely. Show "Dodged!" in combat log. Enemy special attacks have 50% reduced evasion effectiveness.

3. **HP Regen** — At start of each player turn, regenerate HP. Capped at max HP. Log only if regen > 0 and not at full HP.

---

## Section 8: Engagement Hooks

### 8A: Loot Drop Ceremony

- **Drop animation:** Items "fall" into view with bounce. Rarity determines intensity — commons slide in, legendaries slam with screen shake and golden particle burst.
- **Rarity color flare:** CSS-driven pulse outward from item card. Legendaries get a 0.5s anticipation delay before name reveal.
- **Unidentified reveal:** Rare+ items drop as "Unidentified [Slot]" with pulsing `?` glyph. Player clicks to reveal affixes and name.
- **Item comparison toast:** When item drops for an occupied slot, show split comparison: "Equipped vs New" with green/red stat deltas.

### 8B: Pity Timer

Hidden bad luck protection in `state.equipment.pityCounter`:

| Threshold | Effect |
|-----------|--------|
| 30 drops without Legendary/Set | Legendary/Set drop weight doubles |
| 50 drops | Legendary/Set drop weight triples |
| 75 drops | Next drop is guaranteed Legendary or Set |

Counter resets to 0 on any Legendary/Set drop. Player never sees this number.

### 8C: Collection Codex

A "Codex" tab in the Armory showing every legendary and set piece that exists in the game:

- Undiscovered items shown as silhouettes with "???" and slot type
- Found items shown with full stats and name (persists even after salvaging)
- **Completion counter:** "Legendaries: 5/8 discovered, Sets: 1/3 complete"
- **Set display:** All pieces shown, grayed if missing, lit if owned
- **First Discovery narrator entry:** *"Something extraordinary falls into your hands. The Study recognizes it — this artifact has a name."*
- Codex stored in `state.equipment.codex` — array of legendary/set IDs ever found, persists forever

### 8D: Affix Quality Indicators

Small colored dot next to each affix on tooltips:

| Roll Percentile | Label | Color |
|----------------|-------|-------|
| 0-50% | — | No indicator |
| 50-75% | Good | Light blue dot |
| 75-90% | Great | Purple dot |
| 90-99% | Exceptional | Orange dot |
| 100% (max roll) | Perfect | Gold dot + sparkle |

### 8E: Daily Bounty

Once per real-world calendar day (tracked via `state.equipment.lastBountyDate` as `YYYY-MM-DD` string):

- **Bounty card** on dashboard: task that scales with progression (early: "Complete a research node", late: "Win a Tier 3 combat")
- **Reward:** Guaranteed Rare+ drop from highest unlocked material tier + 15-30 bonus Arcane Dust
- **Streak bonus:** Consecutive daily completions build streak counter
  - Every 7 consecutive days: guaranteed Epic+ drop
  - Every 30 consecutive days: guaranteed Legendary drop
- **Streak display:** "Bounty Streak: 5/7" on dashboard
- Missing a day resets streak to 0

### 8F: Item Flavor Text

Every Uncommon+ item gets a randomly selected flavor text displayed in italic at bottom of tooltip. Pool of ~30 generic lines, plus legendaries/set items get hand-written flavor text.

---

## Section 9: Armory Nav Unlock & First Drop

- **Unlock condition:** `state.equipment.inventory.length > 0 || Object.values(state.equipment.equipped).some(v => v !== null)`
- **First combat victory:** Guaranteed item drop (overrides normal 35% chance)
- **Narrator milestone on first item:** *"Something clatters to the floor — solid, real, thrumming with power. The Study has armed you. The Armory awaits."*

---

## Section 10: State Schema

```javascript
// Added to createInitialState():
equipment: {
  inventory: [],          // array of item objects (max 60)
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
}

// Future placeholder:
shop: {
  cosmetics: []
}

// Each item object:
{
  id: 'item_a7f3b2',           // unique generated ID
  baseType: 'wand',            // base type key
  slot: 'weapon',              // slot key
  material: 'grimsteel',       // material tier key
  iLvl: 14,                    // item level
  rarity: 'rare',              // common/uncommon/rare/epic/legendary/set
  affixes: [
    { stat: 'arcane_power', value: 12, locked: false }
  ],
  uniqueEffect: null,          // legendary only: { id, description, type, value }
  setId: null,                 // set only: set definition ID
  flavorText: null,            // random flavor string (Uncommon+)
  icon: null,                  // future: image/sprite path
  vfx: null                    // future: CSS animation class
}
```

---

## Section 11: Data Files

**Important:** The game runs on `file://` protocol and uses inline data (`var encountersData = [...]`) in bundle.js, not external JSON files. All item data must follow this same pattern.

### New inline data: `var itemsData = { ... }`

Added to the DATA section of bundle.js alongside `disciplinesData`, `encountersData`, etc. Contains: materials, slots, baseTypes (with stat weights), affixes (with per-tier ranges), rarities (with colors, affix counts, drop weights, dust yields), legendaries, sets, flavorText pool, salvageRecipes, dropSources config, pity thresholds.

Full schema defined in the brainstorming conversation — all fields include `icon: null` and `vfx: null` for future art.

### Also new: `data/items.json`

A mirror of the inline data, kept as a reference/source-of-truth file for editing. When items.json changes, the inline `var itemsData` in bundle.js must be updated to match (same pattern as other data files in this project).

### Modified: `data/encounters.json` (and inline `var encountersData`)

Add `"boss": true` flag to Tier 3+ encounters for guaranteed drops and legendary weight bonus.

### No other existing data files change

Gear stats are additive on top of existing combat stats.

---

## Section 12: Migration

For existing saves:
- Add `state.equipment` object if missing, with all defaults
- Add `state.shop` object if missing, with defaults
- No retroactive item grants — returning players start getting drops from next combat victory
- Codex starts empty regardless of progression

---

## Section 13: CSS Additions

- `.armory-panel` — layout for paper doll + inventory grid
- `.paper-doll` — character silhouette with positioned slot boxes
- `.equip-slot` — individual slot, rarity-colored border when filled
- `.equip-slot.empty` — dim placeholder state
- `.inventory-grid` — scrollable item card grid with filter tabs
- `.item-card` — individual item in inventory, `draggable="true"`
- `.item-card.common` / `.uncommon` / `.rare` / `.epic` / `.legendary` / `.set` — rarity border glow
- `.item-tooltip` — detailed hover/click popup
- `.affix-line` — single affix row in tooltip
- `.quality-dot` / `.quality-good` / `.quality-great` / `.quality-exceptional` / `.quality-perfect` — affix quality indicators
- `.loot-ceremony` — drop animation container
- `.loot-reveal` — unidentified → revealed transition with anticipation delay
- `.loot-comparison` — side-by-side equipped vs new stat deltas
- `.codex-entry` / `.codex-silhouette` / `.codex-revealed` — collection book entries
- `.salvage-panel` — salvage/enchant/craft UI area
- `.bounty-card` / `.bounty-streak` — daily bounty display
- `.dust-counter` — Arcane Dust quick stat
- `.stat-summary-bar` — bottom stat totals bar
- `.screen-shake` — legendary drop animation
- `@keyframes lootBounce` / `@keyframes rarityFlare` / `@keyframes sparkle` — drop ceremony animations

---

## Future: Cosmetic Shop Placeholder

`state.shop.cosmetics` array for owned cosmetic IDs. Cosmetic skins override `icon` and `vfx` fields on items when equipped — purely visual, no stat impact. Not implemented now, just the state hook.
