# The Arcanist's Study — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a browser-based idle magic research game with data-driven architecture, placeholder lore, and all core systems functional.

**Architecture:** Data-driven engine — JSON data files define all content, ES module engines process them, central state object coordinates everything. Game loop ticks 1/sec: resources → research → combat → events → UI render.

**Tech Stack:** Vanilla HTML/CSS/JavaScript (ES Modules), no build tools, no dependencies. Requires local server for ES modules (Python http.server or VS Code Live Server).

**Note:** All narrative text uses placeholder copy. Lore will be written separately after mechanics are testable.

---

## File Structure

```
TextGame/
├── index.html
├── css/style.css
├── data/
│   ├── resources.json
│   ├── disciplines.json
│   ├── spells.json
│   ├── encounters.json
│   ├── events.json
│   └── prestige.json
├── engine/
│   ├── game.js
│   ├── resources.js
│   ├── research.js
│   ├── combat.js
│   ├── events.js
│   ├── prestige.js
│   └── offline.js
├── ui/
│   ├── renderer.js
│   ├── panels.js
│   └── notifications.js
├── util/
│   ├── save.js
│   ├── format.js
│   └── random.js
└── test.html
```

---

## Chunk 1: Foundation & Resource Loop

Gets the game running in browser with mana ticking, UI shell visible, and data loading working.

### Task 1: Project Setup

**Files:**
- Create: `index.html`
- Create: `css/style.css`

- [ ] **Step 1: Initialize git repo**

```bash
cd C:/TextGame
git init
echo "node_modules/" > .gitignore
```

- [ ] **Step 2: Create index.html with four-panel layout**

Create `index.html` — the single entry point. Loads style.css, imports game.js as ES module. Contains the four-panel DOM structure:
- `#top-bar` — title, mana display, arcane knowledge, convergence count
- `#grimoire` (left) — nav buttons for each discipline + combat/sanctum/prestige
- `#viewport` (center) — main content area, initially shows welcome message
- `#journal` (right) — rolling log of game events
- `#bottom-bar` — seven discipline resource displays

Each panel is a simple div with an id. Grimoire buttons use `data-panel` attributes. Viewport contains child divs for each view (research, combat, events, generators, sanctum, prestige) — only one visible at a time via `.active` class.

- [ ] **Step 3: Create css/style.css with parchment theme**

Parchment aesthetic using CSS only:
- Body: warm background using radial-gradient (`#f4e4c1`, `#e8d5a3`)
- Font: `'Crimson Text', 'Georgia', serif` (Google Fonts link in index.html)
- Text color: `#3d2b1f` (dark sepia)
- Panel borders: `2px solid #8b7355` with `box-shadow: inset 0 0 10px rgba(0,0,0,0.1)`
- Four-panel grid layout using CSS Grid: `grid-template-columns: 200px 1fr 250px`
- Grimoire nav items: styled as list, hover glow `rgba(218,165,32,0.3)`
- Buttons: `background: linear-gradient(#d4b896, #c4a882)`, embossed border
- Bottom bar: flexbox, even spacing for 7 resources
- Progress bars: `background: linear-gradient(90deg, #daa520, #b8860b)` inside dark track
- `.hidden` utility class: `display: none`
- Responsive: media query at 768px collapses to single column

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css .gitignore
git commit -m "feat: project skeleton with four-panel parchment layout"
```

### Task 2: Utilities

**Files:**
- Create: `util/format.js`
- Create: `util/random.js`

- [ ] **Step 1: Create util/format.js**

Export `formatNumber(n)`:
- < 1000: show as-is with up to 1 decimal
- >= 1K: "1.5K"
- >= 1M: "1.5M"
- >= 1B: "1.5B"
- >= 1T: "1.5T"

Export `formatTime(seconds)`:
- Returns "Xh Ym Zs" string, omitting zero components

- [ ] **Step 2: Create util/random.js**

Export `weightedRandom(items)` — takes array of `{weight, ...rest}`, returns one item based on weights.

Export `randomRange(min, max)` — returns float in range.

Export `chance(probability)` — returns true/false for 0-1 probability.

- [ ] **Step 3: Commit**

```bash
git add util/
git commit -m "feat: add number formatting and random utilities"
```

### Task 3: Data Files — Resources & Generators

**Files:**
- Create: `data/resources.json`

- [ ] **Step 1: Create data/resources.json**

Contains two top-level arrays: `resources` and `generators`.

`resources` array — 9 entries (mana + 7 discipline resources + arcane_knowledge):
```json
{
  "id": "mana",
  "name": "Mana",
  "icon": "❦",
  "base_rate": 1.0,
  "cap": null,
  "description": "Universal magical essence."
}
```
For each discipline resource: `base_rate: 0`, `cap: null`, with appropriate icon and id matching the spec (chronos_essence, aether_threads, psyche_fragments, vital_ichor, umbral_dust, flux_sparks, axiom_crystals). Arcane knowledge has `base_rate: 0`.

`generators` array — 21 entries (3 per discipline). Each follows the generator schema from spec. Use placeholder names like "Temporal Generator T1", "Temporal Generator T2", etc.

| Tier | base_output | base_cost (mana) | base_cost (resource) | upgrade_cost (mana) | upgrade_cost (resource) | max_level |
|------|-------------|-------------------|----------------------|---------------------|-------------------------|-----------|
| T1   | 0.5         | 100               | 20                   | 200                 | 50                      | 10        |
| T2   | 1.5         | 500               | 100                  | 1000                | 250                     | 10        |
| T3   | 4.0         | 2000              | 500                  | 4000                | 1000                    | 10        |

Every generator entry MUST include both `base_cost` and `upgrade_cost` objects, plus `max_level: 10`. Example:
```json
{
  "id": "temporal_gen_t1",
  "discipline": "temporal_arcana",
  "name": "Temporal Generator T1",
  "description": "Placeholder.",
  "unlock_requires": "temporal_basics",
  "base_output": 0.5,
  "output_resource": "chronos_essence",
  "base_cost": { "mana": 100, "chronos_essence": 20 },
  "upgrade_cost": { "mana": 200, "chronos_essence": 50 },
  "max_level": 10
}
```

- [ ] **Step 2: Commit**

```bash
git add data/resources.json
git commit -m "feat: add resource and generator data definitions"
```

### Task 4: Game State & Resource Engine

**Files:**
- Create: `engine/game.js`
- Create: `engine/resources.js`

- [ ] **Step 1: Create engine/game.js**

The central coordinator. Exports:

`createInitialState()` — returns the full game state object:
```javascript
{
  resources: {}, // keyed by resource id -> { amount: 0, totalEarned: 0, totalSpent: 0 }
  generators: {}, // keyed by generator id -> { count: 0, level: 1 }
  research: { completed: [], inProgress: null }, // inProgress: { nodeId, startTime, duration }
  combat: { active: null, health: 100, cooldowns: {}, stance: 'balanced', recovery: 0, inventory: {} },
  events: { active: null, history: [], discoveredHidden: [] },
  discoveries: { found: [], counters: {} }, // counters for condition tracking
  challenges: { active: null, completed: 0 },
  prestige: { enlightenmentPoints: 0, upgrades: {}, convergenceCount: 0, wizardMemory: [], convergenceTickCounter: 0 },
  settings: { lastSave: 0, lastOnline: Date.now(), version: 1 },
  multipliers: {} // calculated cache of all active multipliers
}
```

`loadData()` — fetches all JSON files from data/, returns object keyed by filename.

`startGameLoop(state, data, engines, renderFn)` — calls `setInterval` at 1000ms. Each tick:
1. Calculate `speedMultiplier`: check if Convergence Echo is active (prestige upgrade purchased AND fewer than 600 ticks since last convergence tracked in `state.prestige.convergenceTickCounter`). If active, `speedMultiplier = 3`. Otherwise `1`. Decrement counter each tick.
2. Run each engine `speedMultiplier` times per tick: `engines.resources.tick(state, data)`, `engines.research.tick(state, data)`, `engines.combat.tick(state, data)`, `engines.events.tick(state, data)`
3. Call `renderFn(state)`

This means during Echo, resource/research/combat ticks happen 3x per second instead of 1x, achieving the "3x speed for first 10 minutes" effect.

- [ ] **Step 2: Create engine/resources.js**

Exports `tick(state, data)` and helper functions.

`tick(state, data)`:
1. Add `base_rate` for each resource (applying multipliers from `state.multipliers`)
2. For each generator the player owns: add `base_output * level_multiplier * count * multiplier` where `level_multiplier = 1 + 0.5 * (level - 1)`
3. Update `totalEarned` tracking

`getGenerationRate(state, data, resourceId)` — returns current per-second rate for a resource (used by UI).

`canAfford(state, cost)` — checks if player has enough of each resource in cost object.

`spend(state, cost)` — deducts resources, updates `totalSpent`.

`buyGenerator(state, data, generatorId)` — checks affordability using `base_cost * 1.15^count`, deducts cost, increments count.

`upgradeGenerator(state, data, generatorId)` — checks affordability using `upgrade_cost * 2^(level-1)`, deducts cost, increments level. Max level 10.

- [ ] **Step 3: Commit**

```bash
git add engine/game.js engine/resources.js
git commit -m "feat: game state, data loading, and resource engine"
```

### Task 5: UI Shell & Resource Display

**Files:**
- Create: `ui/renderer.js`
- Create: `ui/notifications.js`

- [ ] **Step 1: Create ui/renderer.js**

The main UI coordinator. Exports:

`initUI(state, data, engines)` — sets up all event listeners:
- Grimoire nav buttons: click switches viewport panel via `.active` class
- Generator buy/upgrade buttons (delegated from viewport)
- Wires up all panel-specific click handlers

`render(state, data)` — called every tick:
- Updates top bar: mana amount, arcane knowledge, convergence count
- Updates bottom bar: all 7 discipline resource amounts (using `formatNumber`)
- Updates whichever viewport panel is active
- Updates journal with latest entries

`renderGeneratorPanel(state, data)` — renders the generators view in viewport:
- For each discipline with unlocked generators, show:
  - Generator name, count owned, current level
  - Output per second
  - Buy button with cost
  - Upgrade button with cost (if level < 10)
  - Buttons disabled if can't afford

- [ ] **Step 2: Create ui/notifications.js**

Exports:

`addJournalEntry(state, text, type)` — pushes to journal array in state. Types: 'info', 'discovery', 'combat', 'event'. Entries have timestamp.

`getJournalEntries(state, count)` — returns last N entries for display.

- [ ] **Step 3: Commit**

```bash
git add ui/renderer.js ui/notifications.js
git commit -m "feat: UI renderer with resource display and generator panel"
```

### Task 6: Wire It Up & Test

**Files:**
- Modify: `index.html` (add module script tag)

- [ ] **Step 1: Add bootstrap script to index.html**

Add `<script type="module">` at end of body that:
1. Imports `createInitialState`, `loadData`, `startGameLoop` from `engine/game.js`
2. Imports resource engine from `engine/resources.js`
3. Imports `initUI`, `render` from `ui/renderer.js`
4. On DOMContentLoaded: load data, create state, init UI, start game loop
5. Stub engines for research/combat/events with `{ tick() {} }`

- [ ] **Step 2: Manual test**

Start a local server:
```bash
cd C:/TextGame && python -m http.server 8080
```
(Or use VS Code Live Server)

Open http://localhost:8080. Verify:
- Four-panel parchment layout renders
- Mana ticks up by 1/sec in top bar
- Grimoire nav buttons switch viewport
- Bottom bar shows all resources at 0
- No console errors

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: wire up game loop — mana ticking, UI functional"
```

---

## Chunk 2: Research System

Adds discipline data, research engine, and research tree UI. After this chunk, players can research nodes and unlock generators.

### Task 7: Discipline & Research Data

**Files:**
- Create: `data/disciplines.json`

- [ ] **Step 1: Create data/disciplines.json**

Contains array of 7 discipline objects + research nodes. Each discipline:
```json
{
  "id": "temporal_arcana",
  "name": "Temporal Arcana",
  "domain": "Time",
  "resource": "chronos_essence",
  "icon": "⏳",
  "description": "Placeholder description."
}
```

Research nodes nested in a `nodes` array. Node counts per discipline MUST match the spec:

| Discipline | Tier 1 | Tier 2 | Tier 3 | Tier 4 | Total |
|---|---|---|---|---|---|
| Standard (6 disciplines) | 3 | 5 | 4 | 2 | 14 |
| Vital Alchemy (bridge) | 3 | 7 | 4 | 2 | 16 |

Total: 6×14 + 16 = **100 nodes** + synergy nodes (see below).

Use placeholder text for all names/descriptions. Each follows spec schema:
- Tier 1 nodes: cost ~50-200 mana + 10-50 discipline resource, duration 30-60s
- Tier 2 nodes: cost ~500-1000 mana + 100-200 resource, duration 120-300s
- Tier 3 nodes: cost ~2000-5000 mana + 500-1000 resource, duration 600-900s
- Tier 4 nodes: cost ~10000+ mana + 2000+ resource, duration 1200-1800s
- Tier 1 first node has no `requires` (entry point), others require at least one node from the same or previous tier
- Effects: Tier 1 includes `unlock_generator` for the T1 generator. Tier 2 includes `resource_multiplier` and `unlock_spell`. Tier 3 includes `unlock_generator` for T2/T3 generators.

**Cross-discipline synergy nodes:** In addition to the per-discipline nodes, create hidden synergy nodes for each of the 4 major pairings:
- Temporal Arcana + Spatial Weaving → "The Continuum" (3 hidden nodes)
- Vital Alchemy + Shadow Binding → "The Cycle" (3 hidden nodes)
- Chaos Channeling + Order Forging → "The Balance" (3 hidden nodes)
- Mind Sculpting + Vital Alchemy → "The Awakening" (3 hidden nodes)

= **12 synergy nodes** total. Each synergy node:
```json
{
  "id": "continuum_1",
  "discipline": "synergy_continuum",
  "tier": 2,
  "name": "Continuum Node 1",
  "description": "Placeholder.",
  "discovery": "Placeholder.",
  "cost": { "mana": 800, "chronos_essence": 150, "aether_threads": 150 },
  "duration": 240,
  "requires": ["temporal_t2_node1", "spatial_t2_node1"],
  "hidden": true,
  "synergy_pair": ["temporal_arcana", "spatial_weaving"],
  "effects": [{ "type": "resource_multiplier", "resource": "chronos_essence", "value": 1.3 }, { "type": "resource_multiplier", "resource": "aether_threads", "value": 1.3 }]
}
```

Synergy nodes have `"hidden": true` — they only become visible when BOTH required nodes from different disciplines are completed. Vital Alchemy's 2 extra Tier 2 nodes serve as the entry requirements for its two synergy pairings (The Cycle and The Awakening).

- [ ] **Step 2: Commit**

```bash
git add data/disciplines.json
git commit -m "feat: add discipline and research node data (placeholder text)"
```

### Task 8: Research Engine

**Files:**
- Create: `engine/research.js`

- [ ] **Step 1: Create engine/research.js**

Exports:

`tick(state, data)`:
1. If `state.research.inProgress` exists, check if `Date.now() >= startTime + duration * 1000` (adjusted by speed multipliers)
2. If complete: move node to `state.research.completed`, apply effects, set `inProgress` to null, add journal entry
3. Apply effects by type: `resource_multiplier` → update `state.multipliers`, `unlock_spell` → add to available spells, `unlock_generator` → mark generator as available

`canResearch(state, data, nodeId)` — checks: not already completed, prerequisites met (all `requires` nodes in completed), can afford cost.

`startResearch(state, data, nodeId)` — validates via canResearch, deducts cost, sets `inProgress` with `startTime: Date.now()`.

`getResearchProgress(state)` — returns 0-1 progress of current research, or null.

`getAvailableNodes(state, data, disciplineId)` — returns nodes that are visible and not yet completed. Visibility rules:
- Regular nodes: visible if tier 1 (entry point) or all `requires` nodes completed
- Synergy nodes (`hidden: true`): visible ONLY if all `requires` nodes from both `synergy_pair` disciplines are completed. Once visible, behaves like a regular node.

`getVisibleSynergyNodes(state, data)` — returns all synergy nodes whose prerequisites are met. Called by UI to show unlocked synergy branches.

`recalculateMultipliers(state, data)` — rebuilds `state.multipliers` from all completed research effects + prestige upgrades. Called on load and after completing research.

- [ ] **Step 2: Commit**

```bash
git add engine/research.js
git commit -m "feat: research engine with tree progression and effect system"
```

### Task 9: Research Tree UI

**Files:**
- Modify: `ui/renderer.js` (add research panel rendering)
- Modify: `ui/panels.js` or add research rendering to renderer.js

- [ ] **Step 1: Create ui/panels.js**

Exports panel rendering functions. Start with:

`renderResearchPanel(container, state, data, engines)`:
- Shows tabs for each discipline (only disciplines the player has started OR all if none started)
- For selected discipline: renders nodes as a vertical list grouped by tier
- Each node shows: name, description, cost, duration, status (locked/available/in-progress/completed)
- Available nodes have a "Research" button
- In-progress node shows progress bar with time remaining
- Completed nodes shown as checked/dimmed
- Locked nodes shown as greyed out with "Requires: [node names]"
- Click "Research" calls `engines.research.startResearch()`

`renderGeneratorPanel(container, state, data, engines)`:
- Move generator rendering here from renderer.js
- Only show generators whose `unlock_requires` node is in `state.research.completed`
- Show buy/upgrade buttons with costs

- [ ] **Step 2: Update renderer.js**

- Import panels.js functions
- In `render()`, call appropriate panel function based on active viewport
- Wire up discipline tab clicks in research panel
- Default viewport to research panel for Temporal Arcana

- [ ] **Step 3: Manual test**

Verify:
- Research panel shows Temporal Arcana Tier 1 nodes
- Can click Research on first node (costs mana)
- Progress bar counts down
- On completion: journal entry appears, generator unlocks
- Can buy unlocked generator, see resource start generating

- [ ] **Step 4: Commit**

```bash
git add ui/panels.js ui/renderer.js
git commit -m "feat: research tree UI with discipline tabs and progress tracking"
```

---

## Chunk 3: Combat System

Adds spells, encounters, combat engine, and combat UI. After this chunk, players can fight enemies.

### Task 10: Combat Data

**Files:**
- Create: `data/spells.json`
- Create: `data/encounters.json`

- [ ] **Step 1: Create data/spells.json**

Two top-level arrays: `spells` and `consumables`.

`spells` array: 2 spells per discipline = 14 spells. One damage type, one utility (heal/buff/debuff/shield). Each follows spec spell schema. Use placeholder descriptions. Example:

```json
{
  "id": "temporal_strike",
  "discipline": "temporal_arcana",
  "name": "Temporal Strike",
  "description": "Placeholder.",
  "type": "damage",
  "base_damage": 40,
  "mana_cost": 30,
  "cooldown": 2,
  "effects": [],
  "synergy": { "requires_discipline": "spatial_weaving", "bonus_damage": 15 },
  "auto_priority": 2,
  "tags": ["offensive"]
}
```

`consumables` array: 4 consumable items craftable from Vital Alchemy and Chaos Channeling resources. Each:
```json
{
  "id": "healing_salve",
  "name": "Healing Salve",
  "description": "Placeholder.",
  "craft_cost": { "vital_ichor": 50 },
  "requires_research": "vital_t1_node2",
  "effect": { "type": "heal", "value": 80 },
  "max_stack": 5
}
```

Create: 2 Vital Alchemy consumables (healing salve, vitality boost) and 2 Chaos Channeling consumables (wild surge potion, chaos bomb). Effects use the same type system as spell effects.

- [ ] **Step 2: Create data/encounters.json**

Array of encounters. Create 2 per tier (8 total). Tier 1: health 100-200, attack 10-20, defense 5. Tier 2: health 300-500, attack 25-40, defense 10. Tier 3: health 700-1000, attack 50-70, defense 20. Tier 4: health 1500-2000, attack 90-120, defense 35. Each has pattern array, weakness, resistance, loot. Use standard action types for most, one special per tier 2+. Placeholder descriptions.

- [ ] **Step 3: Commit**

```bash
git add data/spells.json data/encounters.json
git commit -m "feat: spell and encounter data (placeholder text)"
```

### Task 11: Combat Engine

**Files:**
- Create: `engine/combat.js`

- [ ] **Step 1: Create engine/combat.js**

Exports:

`tick(state, data)`:
1. If `state.combat.recovery > 0`, decrement by 1, return
2. If no active combat, check for auto-encounter trigger (random chance based on highest completed research tier, ~1% per tick at tier 2+)
3. If combat active, process one round every 2 ticks (2 seconds):
   a. Player turn: run auto-combat AI (select spell by priority, check heal threshold based on stance)
   b. Apply player action: calculate damage with formula from spec, apply effects
   c. Check speed stat for double-action chance
   d. Enemy turn: execute next action in pattern (cycling), apply damage/effects
   e. Check for victory (enemy health <= 0): award loot, add journal entry, clear combat
   f. Check for defeat (player health <= 0): set recovery timer, add journal entry, clear combat

`startCombat(state, data, encounterId)` — initializes combat state: sets active encounter, resets player health to `100 + resilience * 5`, sets enemy health, resets cooldowns, pattern index to 0.

`castSpell(state, data, spellId)` — manual spell cast by player. Checks cooldown and mana cost. Applies immediately on next round.

`setStance(state, stance)` — sets combat stance ('aggressive', 'balanced', 'defensive').

`retreat(state)` — ends combat, awards 25% of loot, no recovery timer.

`useConsumable(state, data, consumableId)` — uses a consumable from inventory during combat. Decrements `state.combat.inventory[consumableId]`, applies effect immediately. No cooldown.

`craftConsumable(state, data, consumableId)` — crafts a consumable outside combat. Checks `requires_research` is completed, deducts `craft_cost`, adds to `state.combat.inventory` (capped at `max_stack`).

`calculateStats(state, data)` — computes arcane_power, resilience, speed, instability from completed research nodes per spec formulas.

`calculateDamage(arcanePower, spellDamage, instability, weakness, resistance, spellDiscipline, enemyDefense)` — implements the damage formula from spec.

- [ ] **Step 2: Commit**

```bash
git add engine/combat.js
git commit -m "feat: combat engine with auto-combat AI and damage formulas"
```

### Task 12: Combat UI

**Files:**
- Modify: `ui/panels.js` (add combat panel)
- Modify: `ui/renderer.js` (wire combat panel)

- [ ] **Step 1: Add renderCombatPanel to panels.js**

`renderCombatPanel(container, state, data, engines)`:
- If no active combat and no recovery: show "No threats detected." and Sanctum button
- If recovery active: show "Recovering... Xs remaining"
- If combat active:
  - Enemy info: name, health bar, current action description
  - Player info: health bar, active effects/buffs
  - Combat log: last 5 actions as text lines
  - Spell buttons: one per available spell, showing mana cost and cooldown status, disabled if on cooldown or insufficient mana
  - Consumable buttons: one per owned consumable, showing count remaining, click to use
  - Stance selector: 3 buttons (aggressive/balanced/defensive), current highlighted
  - Retreat button

`renderCraftingPanel(container, state, data, engines)`:
- Shown within the Sanctum panel as a "Crafting" subsection
- Lists available consumables (whose `requires_research` is completed)
- Each shows: name, effect description, craft cost, current stock / max_stack
- "Craft" button, disabled if can't afford or at max stack

`renderSanctumPanel(container, state, data, engines)`:
- List of available challenge encounters (unlocked by research tier)
- Each shows: name, tier, description, "Challenge" button
- Shows combat stats summary (arcane power, resilience, speed, instability)

- [ ] **Step 2: Wire into renderer.js**

- Add combat and sanctum to viewport panel switching
- During active combat, auto-switch to combat panel
- Combat log updates every tick during combat

- [ ] **Step 3: Manual test**

- Research Temporal Arcana to Tier 2 to trigger auto-encounters
- Verify combat starts, rounds process, auto-combat casts spells
- Click manual spell cast, verify cooldown
- Switch stances, verify behavior change
- Win combat, verify loot awarded
- Go to Sanctum, manually start a challenge encounter

- [ ] **Step 4: Commit**

```bash
git add ui/panels.js ui/renderer.js
git commit -m "feat: combat and sanctum UI panels"
```

---

## Chunk 4: Events, Discoveries & Challenges

### Task 13: Event & Discovery Data

**Files:**
- Create: `data/events.json`

- [ ] **Step 1: Create data/events.json**

Contains three top-level arrays: `events`, `discoveries`, `challenges`.

`events`: 6 events (2 per category — opportunity, dilemma, crisis). Each follows spec event schema. Dilemmas use weighted outcome_sets. One event has a hidden choice. Use placeholder text but functional mechanics.

`discoveries`: 4 discoveries. One `threshold` type, one `counter` type, one `combination` type, one `all_of` composite. Placeholder text.

`challenges`: 3 challenges:
```json
{
  "id": "mana_burst",
  "name": "Mana Surge",
  "description": "Generate mana rapidly.",
  "objective": { "type": "generate", "resource": "mana", "amount": 500 },
  "duration": 300,
  "reward": { "arcane_knowledge": 3 }
}
```

- [ ] **Step 2: Commit**

```bash
git add data/events.json
git commit -m "feat: event, discovery, and challenge data (placeholder text)"
```

### Task 14: Events Engine

**Files:**
- Create: `engine/events.js`

- [ ] **Step 1: Create engine/events.js**

Exports:

`tick(state, data)`:
1. If event active, do nothing (wait for player choice)
2. If challenge active, update progress tracking. Check timer (decrement). If expired, clear challenge. If objective met, award reward, add journal entry, increment `state.challenges.completed`.
3. Check discovery conditions against current state. For each unfound discovery, evaluate condition. If met, mark found, apply reward, add journal entry.
4. Event timer: track ticks since last event. At random interval (300-900 ticks = 5-15 min), select a weighted random event whose `requires` conditions are met. Set as active.
5. Challenge timer: track ticks since last challenge. At random interval (1800-3600 ticks = 30-60 min), select a random challenge. Set as active.

`makeChoice(state, data, choiceIndex)` — resolves active event. If choice has `outcome_sets`, use weighted random to select outcome set. Apply outcomes (resource changes, narrative text to journal). Track hidden choice reveals. Clear active event.

`evaluateCondition(state, condition)` — recursive evaluator:
- `threshold`: check `state.resources[resource].amount >= value`, apply constraint
- `counter`: check `state.discoveries.counters[event] >= count`
- `combination`: check all node IDs in `state.research.completed`
- `all_of`: all sub-conditions pass
- `any_of`: any sub-condition passes

`trackEvent(state, eventType)` — increments counters for discovery conditions (called by other engines on combat_loss, research_complete, etc.)

- [ ] **Step 2: Commit**

```bash
git add engine/events.js
git commit -m "feat: event engine with discoveries, challenges, and condition evaluator"
```

### Task 15: Events UI

**Files:**
- Modify: `ui/panels.js` (add event panel, discovery panel)
- Modify: `ui/renderer.js` (wire event display)

- [ ] **Step 1: Add event rendering to panels.js**

`renderEventPanel(container, state, data)`:
- If active event: show title, text, and choice buttons
- Hidden choices show as "???" until revealed
- After choosing: show outcome narrative briefly before clearing

`renderDiscoveryPanel(container, state, data)`:
- Grid of discoveries: found ones show name and text, unfound show "???"
- Count: "X / Y Discovered"

`renderChallengeDisplay(state)`:
- If active challenge: floating indicator in top bar showing name, progress bar, and time remaining
- Uses Page Visibility API: pause timer on hidden, resume on visible

- [ ] **Step 2: Wire events into renderer.js**

- Event popover: when event is active, show overlay on viewport
- Challenge indicator in top bar
- Discoveries accessible from grimoire nav
- Auto-pop events over any active panel

- [ ] **Step 3: Manual test**

- Wait for event to fire (reduce timer to 30s for testing)
- Make choices, verify resource changes
- Check discovery panel
- Check challenge appears and tracks progress

- [ ] **Step 4: Commit**

```bash
git add ui/panels.js ui/renderer.js
git commit -m "feat: event, discovery, and challenge UI"
```

---

## Chunk 5: Prestige, Save & Offline

### Task 16: Prestige Data & Engine

**Files:**
- Create: `data/prestige.json`
- Create: `engine/prestige.js`

- [ ] **Step 1: Create data/prestige.json**

Array of 8 prestige upgrades following spec schema. Each has id, name, description (placeholder), max_level, cost_base, cost_scaling, and effect object.

- [ ] **Step 2: Create engine/prestige.js**

Exports:

`canConverge(state, data)` — checks if any discipline has a Tier 4 node completed.

`calculateEP(state, data)` — implements EP formula: `(nodes * 2) + (discoveries * 5) + (challenges * 3) + (tier4_nodes * 10)`.

`converge(state, data)` — performs the Grand Convergence:
1. Calculate and award EP
2. Save discovery texts to wizardMemory
3. Reset: resources, generators, research, combat, events, challenges
4. Increment convergenceCount
5. Set `convergenceTickCounter = 600` (if Convergence Echo upgrade purchased — enables 3x speed for 10 minutes)
6. Apply prestige effects (Deep Memory pre-completes a discipline tier if purchased)
7. Recalculate multipliers
8. Add journal entry

`buyUpgrade(state, data, upgradeId)` — checks EP cost (`cost_base * cost_scaling^current_level`), deducts EP, increments upgrade level, applies effect.

`getPrestigeEffects(state, data)` — returns all active prestige effects for multiplier calculation.

- [ ] **Step 3: Commit**

```bash
git add data/prestige.json engine/prestige.js
git commit -m "feat: prestige engine with Grand Convergence and EP upgrades"
```

### Task 17: Save System & Offline

**Files:**
- Create: `util/save.js`
- Create: `engine/offline.js`

- [ ] **Step 1: Create util/save.js**

Exports:

`saveGame(state)` — serializes state to JSON, stores in localStorage key `arcanist_save`. Updates `state.settings.lastSave`.

`loadGame()` — reads from localStorage, parses JSON, returns state or null.

`exportSave(state)` — returns Base64-encoded JSON string. Copies to clipboard via `navigator.clipboard.writeText()`.

`importSave(encoded)` — decodes Base64, validates version field exists, returns parsed state or throws.

`deleteSave()` — removes localStorage key.

`autoSave(state)` — called every tick, saves if 60+ seconds since last save.

- [ ] **Step 2: Create engine/offline.js**

Exports:

`calculateOfflineProgress(state, data)`:
1. Calculate seconds elapsed: `(Date.now() - state.settings.lastOnline) / 1000`
2. Cap at 28800 (8 hours)
3. For each resource with generators: add `rate * seconds * 0.5` (50% offline efficiency)
4. Apply prestige offline mastery bonus if purchased
5. Return summary object `{ elapsed, gains: { mana: X, ... } }` for UI display
6. Update `state.settings.lastOnline`

- [ ] **Step 3: Commit**

```bash
git add util/save.js engine/offline.js
git commit -m "feat: save system with export/import and offline progression"
```

### Task 18: Prestige UI & Save Integration

**Files:**
- Modify: `ui/panels.js` (add prestige panel)
- Modify: `ui/renderer.js` (add save controls, offline modal)
- Modify: `index.html` (add save/export UI elements)

- [ ] **Step 1: Add prestige panel to panels.js**

`renderPrestigePanel(container, state, data, engines)`:
- Shows current EP total
- "Invoke Grand Convergence" button (disabled if can't converge) with EP preview
- List of upgrades: name, description, current level / max, cost, buy button
- Convergence count display

- [ ] **Step 2: Add save/offline UI to renderer.js**

- Save controls in settings area (hamburger menu or bottom of grimoire):
  - "Export Save" button
  - "Import Save" text input + button
  - "Delete Save" with confirmation
- On game load: check for existing save, calculate offline progress, show modal:
  - "Welcome back! While you were away (Xh Ym): [gains list]"
  - "Continue" button closes modal
- Wire autoSave into game loop
- Wire beforeunload to save

- [ ] **Step 3: Manual test**

- Play for a bit, close tab, reopen — verify offline gains
- Export save, delete save, import — verify round-trip
- Research to Tier 4, verify Convergence button enables
- Converge, verify reset and EP awarded

- [ ] **Step 4: Commit**

```bash
git add ui/panels.js ui/renderer.js index.html
git commit -m "feat: prestige UI, save controls, and offline progress modal"
```

---

## Chunk 6: Integration & Polish

### Task 19: Wire All Engines Together

**Files:**
- Modify: `engine/game.js` (import all engines)
- Modify: `ui/renderer.js` (final wiring)

- [ ] **Step 1: Update game.js bootstrap**

- Import all engines (resources, research, combat, events, prestige)
- Wire event tracking: combat engine calls `events.trackEvent()` on combat_loss/win
- Research engine calls `events.trackEvent()` on research_complete
- Ensure multiplier recalculation happens after research completion and prestige effects
- Load save on startup, calculate offline progress before starting loop

- [ ] **Step 2: Update renderer.js for complete panel switching**

- All grimoire nav items route to correct panels:
  - Discipline names → research panel (filtered to that discipline)
  - "Generators" → generator panel
  - "Combat" → combat panel
  - "Sanctum" → sanctum panel
  - "Prestige" → prestige panel
  - "Discoveries" → discovery panel
  - "Journal" → journal full view (mobile)
- Active combat takes priority — auto-switch to combat panel when encounter starts
- Active event shows as overlay regardless of current panel

- [ ] **Step 3: Commit**

```bash
git add engine/game.js ui/renderer.js
git commit -m "feat: wire all engines and UI panels together"
```

### Task 20: Journal & Notifications

**Files:**
- Modify: `ui/notifications.js`
- Modify: `css/style.css` (add animation classes)

- [ ] **Step 1: Enhance notifications.js**

- Journal renders in right panel as scrolling list (newest first)
- Each entry styled by type (info = default, discovery = gold border, combat = red tint, event = blue tint)
- Ink-fade-in CSS animation on new entries
- Toast notifications for important events (research complete, combat start, discovery found) — briefly show at top of viewport then fade

- [ ] **Step 2: Add CSS animations to style.css**

```css
@keyframes inkFadeIn { from { opacity: 0; filter: blur(2px); } to { opacity: 1; filter: blur(0); } }
@keyframes shimmer { 0%,100% { box-shadow: 0 0 5px rgba(218,165,32,0); } 50% { box-shadow: 0 0 15px rgba(218,165,32,0.5); } }
.journal-entry { animation: inkFadeIn 0.5s ease-in; }
.research-complete { animation: shimmer 1s ease-in-out; }
.toast { position: fixed; top: 10px; left: 50%; transform: translateX(-50%); animation: inkFadeIn 0.3s, inkFadeIn 0.3s 2.7s reverse forwards; }
```

- Resource numbers: use `requestAnimationFrame` to smoothly interpolate displayed values toward actual values.

- [ ] **Step 3: Commit**

```bash
git add ui/notifications.js css/style.css
git commit -m "feat: journal display, toast notifications, and CSS animations"
```

### Task 21: Final Testing & Cleanup

- [ ] **Step 1: Full playthrough test**

Open in browser, verify complete flow:
1. Mana ticks from start
2. Research Temporal Arcana T1 first node
3. Generator unlocks, buy it, see Chronos Essence generate
4. Research T2 node, verify cross-requirements work
5. Combat auto-triggers, watch auto-combat
6. Go to Sanctum, manually fight
7. Events fire, make choices
8. Check discoveries panel
9. Challenge appears and tracks
10. Export/import save
11. Close and reopen — offline gains shown
12. Research to T4, invoke Convergence
13. Verify reset, EP, buy upgrades, start new cycle

- [ ] **Step 2: Fix any issues found in testing**

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete game skeleton — all systems functional with placeholder text"
```

---

## Testing Strategy

No Node.js is available, so no automated test framework. Testing approach:

1. **Manual browser testing** at each task completion (noted in tasks above)
2. **Console debugging** — all engines export functions callable from devtools: `window.debug = { state, data, engines }` set during bootstrap
3. **Speed testing** — add a debug console command `window.debug.addMana(1000000)` and similar to quickly test late-game states
4. **Balance testing** — after all systems work, tweak data files and refresh to test different curves

Debug helpers to add in game.js bootstrap:
```javascript
window.debug = {
  state, data, engines,
  addResource: (id, amount) => { state.resources[id].amount += amount; },
  completeResearch: (nodeId) => { /* mark node complete, apply effects */ },
  triggerEvent: () => { /* force random event */ },
  speedUp: (multiplier) => { /* change tick rate */ }
};
```
