# The Arcanist's Study — Design Specification

**Type:** Browser-based text idle game
**Tech:** Vanilla HTML/CSS/JavaScript (ES Modules)
**Architecture:** Data-driven engine with modular systems
**Save:** LocalStorage + export/import codes
**Inspiration:** Magic Research, Theory of Magic, Melvor Idle

---

## 1. Core Architecture

### File Structure

```
TextGame/
├── index.html              # Single entry point
├── css/
│   └── style.css           # Parchment/arcane theme
├── data/
│   ├── disciplines.json    # All magical disciplines & research trees
│   ├── spells.json         # Spell definitions for combat
│   ├── events.json         # Random events & discoveries
│   ├── encounters.json     # Combat encounters by tier
│   ├── resources.json      # Resource types & base rates
│   └── prestige.json       # Prestige rewards & unlocks
├── engine/
│   ├── game.js             # Main game loop & state coordinator
│   ├── resources.js        # Resource generation & management
│   ├── research.js         # Research tree progression
│   ├── combat.js           # Hybrid combat system
│   ├── events.js           # Random event dispatcher
│   ├── prestige.js         # Prestige/reset logic
│   └── offline.js          # Offline progress calculator
├── ui/
│   ├── renderer.js         # DOM updates & UI coordination
│   ├── panels.js           # Panel components (research, combat, etc.)
│   ├── notifications.js    # Event toasts & journal entries
│   └── themes.js           # Parchment aesthetic & effects
├── util/
│   ├── save.js             # LocalStorage + export/import
│   ├── format.js           # Number formatting (1.5M, 3.2B)
│   └── random.js           # Weighted random utilities
└── assets/
    └── fonts/              # Arcane/serif fonts
```

### Game Loop

One central state object passed by reference to all engines. Each engine reads and mutates only its own slice. The game loop ticks every second, calling each engine in order:

`resources → research → combat → events → UI render`

### Data Loading

On startup, all JSON files are fetched and cached. Engines reference the data but never modify it — runtime state is separate from definitions.

---

## 2. Magical Disciplines & Research Trees

### The Seven Disciplines

| Discipline | Domain | Core Resource | Fantasy |
|---|---|---|---|
| Temporal Arcana | Time | Chronos Essence | Bending moments, glimpsing futures, freezing decay |
| Spatial Weaving | Space | Aether Threads | Folding distances, pocket dimensions, portals |
| Mind Sculpting | Mind | Psyche Fragments | Telepathy, memory magic, illusions |
| Vital Alchemy | Life | Vital Ichor | Healing, growth, transmutation of living things |
| Shadow Binding | Death | Umbral Dust | Entropy, soul magic, speaking with the dead |
| Chaos Channeling | Chaos | Flux Sparks | Raw unstable power, mutation, wild surges |
| Order Forging | Order | Axiom Crystals | Wards, laws of magic, binding oaths, structure |

### Research Tree Structure

Each discipline has a tree with 4 tiers:

- **Tier 1 — Fundamentals** (3-4 nodes): Basic understanding, unlocks the discipline's resource generation
- **Tier 2 — Applications** (5-6 nodes): Practical spells, passive bonuses, cross-discipline synergies
- **Tier 3 — Mastery** (4-5 nodes): Powerful abilities, combat spells, major resource multipliers
- **Tier 4 — Transcendence** (2-3 nodes): Endgame capstones, prestige-related unlocks, cosmic-level powers

### Research Mechanics

- Researching costs **Mana** (universal resource) plus the discipline's specific resource
- Research takes real time (reduced by bonuses) — idle-friendly
- Nodes can have prerequisites within their tree AND cross-discipline requirements
- Each node has a discovery text — a journal entry in the wonder/mystery tone

### Cross-Discipline Synergies

Researching complementary schools unlocks hidden nodes that appear between trees. Each discipline participates in exactly one primary synergy pairing:

- Vital Alchemy + Shadow Binding → "The Cycle" (life and death intertwined)
- Chaos Channeling + Order Forging → "The Balance" (opposing forces unified)
- Temporal Arcana + Spatial Weaving → "The Continuum" (time-space mastery)
- Mind Sculpting + Vital Alchemy → "The Awakening" (consciousness meets life)

Note: Vital Alchemy appears in two synergies as the "bridge" discipline — Life connects to both Death and Mind thematically. To accommodate this, Vital Alchemy's research tree has 2 extra nodes at Tier 2 (7-8 nodes instead of 5-6) that serve as entry points for each synergy branch. All other disciplines have one primary synergy and standard tier sizes. Additional minor synergies (unlocking small bonuses rather than full hidden nodes) may exist between any pair, but only these four produce major cross-discipline research branches.

### Example Research Node

```json
{
  "id": "temporal_foresight",
  "discipline": "temporal_arcana",
  "tier": 2,
  "name": "The Art of Foresight",
  "description": "You learn to read the faint echoes of moments yet to come.",
  "discovery": "The future does not speak — it whispers. And only the patient hear.",
  "cost": { "mana": 500, "chronos_essence": 120 },
  "duration": 180,
  "requires": ["temporal_basics", "temporal_meditation"],
  "effects": [
    { "type": "resource_multiplier", "resource": "chronos_essence", "value": 1.5 },
    { "type": "unlock_spell", "spell": "glimpse_ahead" }
  ]
}
```

---

## 3. Resources & Idle Economy

### Resource Types

| Resource | Source | Role |
|---|---|---|
| **Mana** | Passive generation, always ticking | Universal currency for all research and actions |
| **Chronos Essence** | Temporal Arcana generators | Fuel for Temporal tree + time-related upgrades |
| **Aether Threads** | Spatial Weaving generators | Fuel for Spatial tree + dimension upgrades |
| **Psyche Fragments** | Mind Sculpting generators | Fuel for Mind tree + mental upgrades |
| **Vital Ichor** | Vital Alchemy generators | Fuel for Life tree + healing/growth |
| **Umbral Dust** | Shadow Binding generators | Fuel for Death tree + entropy powers |
| **Flux Sparks** | Chaos Channeling generators | Fuel for Chaos tree + wild magic |
| **Axiom Crystals** | Order Forging generators | Fuel for Order tree + ward/structure |
| **Arcane Knowledge** | Research, discoveries, events | Meta-currency for prestige upgrades |

### Generation Mechanics

- **Mana** ticks from the start at a base rate (1/sec). Everything else must be unlocked via Tier 1 research.
- Each discipline resource has **generators** — magical apparatus. Each discipline has 3 generator types unlocked at Tier 1, 2, and 3 respectively. Multiple instances of each can be built.
- **Generator tier progression:** Tier 1 generators have low base output but cheap costs (entry-level). Tier 2 generators produce ~3x the base output at ~5x the cost. Tier 3 generators produce ~8x the base output at ~15x the cost. This means Tier 1 generators remain useful for early bulk, while higher-tier generators are more efficient per-resource at scale.
- Generators have levels (1-10). Each level increases output by 50% of base rate (level 1 = 1x, level 5 = 3x, level 10 = 5.5x).
- **Purchase cost** scales exponentially: `base_cost * 1.15^(count)` for buying additional instances, `base_cost * 2^(level-1)` for upgrades.
- Research nodes and synergies provide multipliers to generation rates (applied after generator output).

### Generator Schema

```json
{
  "id": "temporal_observatory",
  "discipline": "temporal_arcana",
  "name": "Temporal Observatory",
  "description": "A chamber of frozen moments, each one crystallized for study.",
  "unlock_requires": "temporal_basics",
  "base_output": 0.5,
  "output_resource": "chronos_essence",
  "base_cost": { "mana": 100, "chronos_essence": 20 },
  "upgrade_cost": { "mana": 200, "chronos_essence": 50 },
  "max_level": 10
}
```

### Economy Curves

- **Early game:** Mana is the bottleneck. Player picks 1-2 disciplines to focus on.
- **Mid game:** Discipline resources become the bottleneck. Cross-discipline synergies matter.
- **Late game:** Arcane Knowledge gates final upgrades. Prestige becomes attractive.
- All costs and rates defined in `resources.json` for easy rebalancing.

### Resource Data Schema

```json
{
  "id": "mana",
  "name": "Mana",
  "icon": "❦",
  "base_rate": 1.0,
  "cap": null,
  "description": "The universal essence of magic.",
  "generators": []
}
```

```json
{
  "id": "chronos_essence",
  "name": "Chronos Essence",
  "icon": "⚗",
  "base_rate": 0,
  "cap": null,
  "description": "Distilled fragments of time itself.",
  "generators": ["temporal_observatory", "temporal_hourglass", "temporal_orrery"]
}
```

### Offline Progression

- Up to **8 hours** of resource generation calculated on return
- Generators tick at **50% efficiency** offline (incentivizes active play)
- **No combat or events offline** — only raw resource accumulation
- On return, player sees a summary: "While you were away (4h 23m): +12,400 Mana, +340 Chronos Essence..."

---

## 4. Combat System

### How Combat Triggers

- **Auto-encounters:** Happen periodically as you research deeper. Tier 2+ attracts attention — magical creatures, rival wizards, arcane anomalies.
- **Challenge encounters:** Optional, manually triggered from the Sanctum panel. Higher risk, higher reward.
- **Discovery encounters:** Unique one-time fights tied to research milestones or events.

### Auto-Combat Flow

Combat runs in rounds (one round every 2 seconds):

1. Your wizard casts from an equipped spell rotation (auto-selected from researched spells)
2. The enemy acts according to its pattern (defined in `encounters.json`)
3. Damage calculated, effects applied
4. Repeat until one side falls

### Player Intervention

At any point during combat, the player can:

- **Cast a special spell** — powerful abilities on cooldowns from Tier 2-3 research
- **Use a consumable** — crafted items from Vital Alchemy or Chaos Channeling
- **Switch strategy** — defensive, aggressive, or balanced stance
- **Retreat** — flee with partial rewards

Intervention is rewarded but never required. Auto-combat wins easier fights. Harder encounters need player input.

### Mana in Combat

Combat uses the player's **accumulated Mana pool** — the same Mana shown in the resource bar. Casting spells in combat spends real Mana. This creates a tension: spend Mana aggressively in combat for faster wins, or conserve it for research. Mana continues to generate during combat at normal rate.

### Combat Stats & Formulas

| Stat | Source | Formula |
|---|---|---|
| **Arcane Power** | Total completed research nodes | `10 * total_nodes_completed` — base damage for auto-attacks |
| **Resilience** | Order Forging + Vital Alchemy nodes | `5 * (order_nodes + vital_nodes)` — flat damage reduction per hit (min 1 damage taken) |
| **Speed** | Temporal Arcana nodes | `temporal_nodes * 0.1` — % chance to act twice in a round |
| **Instability** | Chaos Channeling nodes | `chaos_nodes * 0.05` — damage dealt is multiplied by random range `1 ± instability` (e.g., 0.3 instability = 0.7x to 1.3x) |

**Damage formula:** `max(1, (arcane_power + spell_damage) * instability_roll * weakness_bonus - enemy_defense)`
- `weakness_bonus`: 1.5x if spell discipline matches enemy weakness, 0.5x if matches resistance, 1.0x otherwise
- `enemy_defense`: flat reduction from encounter data

**Player health:** `100 + (resilience * 5)`. No healing between encounters unless a Vital Alchemy spell is used.

### Spells in Combat

Each researched combat spell has a data-driven definition:

### Spell Schema

```json
{
  "id": "glimpse_ahead",
  "discipline": "temporal_arcana",
  "name": "Glimpse Ahead",
  "description": "You read the next moment before it arrives, striking where your enemy will be.",
  "type": "damage",
  "base_damage": 60,
  "mana_cost": 50,
  "cooldown": 3,
  "effects": [],
  "synergy": {
    "requires_discipline": "spatial_weaving",
    "bonus_damage": 20
  },
  "auto_priority": 2,
  "tags": ["offensive", "single_target"]
}
```

Spell effect types: `damage`, `heal`, `buff`, `debuff`, `shield`. Effects array can add status conditions:

```json
{
  "type": "debuff",
  "target": "enemy",
  "stat": "defense",
  "value": -10,
  "duration": 2
}
```

### Auto-Combat AI

The baseline auto-combat AI uses a simple priority system:

1. If player health < 30% and a heal spell is available, cast it
2. Otherwise, cast the available spell (off cooldown) with the highest `auto_priority` value
3. If no spells are available (all on cooldown or no mana), perform a basic attack for `arcane_power` damage
4. Strategy stances modify this:
   - **Aggressive:** Skip heal threshold (only heal at 15%), prioritize highest damage spells
   - **Balanced:** Default behavior above
   - **Defensive:** Heal threshold raised to 50%, prefer buff/shield spells

The prestige upgrade "Battle Instinct" adds smarter behavior per level:
- Level 1: AI considers enemy weakness when selecting spells
- Level 2: AI saves cooldowns for enemy burst patterns
- Level 3: AI pre-buffs before enemy special attacks

### Enemy Action Types

Enemy pattern actions are data-driven with defined behavior types:

| Action Type | Behavior |
|---|---|
| `strike` | Basic attack for `attack` damage |
| `heavy_strike` | 2x `attack` damage, skips next turn |
| `dodge` | Evades next incoming attack |
| `buff_self` | Increases own `attack` by 25% for 3 rounds |
| `debuff_player` | Reduces player Arcane Power by 20% for 2 rounds |
| `heal` | Restores 15% of max health |
| `special` | Unique named ability, damage/effect defined inline |

Special actions are defined in the encounter data:

```json
{
  "action": "temporal_burst",
  "type": "special",
  "damage_multiplier": 2.5,
  "effects": [{ "type": "debuff", "target": "player", "stat": "speed", "value": -0.5, "duration": 2 }],
  "description": "The wraith unravels a stolen second, unleashing it as a wave of distorted time."
}
```

### Example Encounter

```json
{
  "id": "chrono_wraith",
  "name": "Chrono-Wraith",
  "tier": 2,
  "description": "A creature unstuck from time. It flickers between moments, striking from seconds that haven't happened yet.",
  "health": 450,
  "attack": 35,
  "defense": 10,
  "pattern": ["strike", "phase_shift", "strike", "temporal_burst"],
  "actions": {
    "phase_shift": { "type": "dodge", "description": "The wraith flickers out of phase." },
    "temporal_burst": {
      "type": "special",
      "damage_multiplier": 2.5,
      "effects": [{ "type": "debuff", "target": "player", "stat": "speed", "value": -0.5, "duration": 2 }],
      "description": "The wraith unravels a stolen second."
    }
  },
  "weakness": "spatial_weaving",
  "resistance": "temporal_arcana",
  "loot": [
    { "resource": "chronos_essence", "amount": 200 },
    { "resource": "arcane_knowledge", "amount": 5 }
  ]
}
```

### Defeat & Recovery

Losing a fight costs time, not resources — recovery cooldown of `30 * encounter_tier` seconds (Tier 1 = 30s, Tier 2 = 60s, Tier 3 = 90s, Tier 4 = 120s). No permanent loss. Challenge encounters can be retried after recovery.

---

## 5. Random Events, Discoveries & Challenges

### Random Events

Events fire every 5-15 minutes of active play (tunable). Three categories:

- **Opportunities** — beneficial choices with different reward types
- **Dilemmas** — risk/reward tradeoffs with chance-based outcomes
- **Crises** — must respond or suffer a penalty

Events are weighted by game state — no Temporal events if that discipline isn't started. Some are one-time (milestone-tied), most are repeatable. History logged in Wizard's Journal.

### Event Probability & Hidden Outcomes

Choices can have **weighted outcome sets** — a single choice may lead to different results based on probability:

```json
{
  "label": "Reach into the rift",
  "outcome_sets": [
    {
      "weight": 70,
      "outcomes": [
        { "type": "resource", "resource": "flux_sparks", "amount": 500 },
        { "type": "narrative", "text": "The chaos bends to your will — barely." }
      ]
    },
    {
      "weight": 30,
      "outcomes": [
        { "type": "resource", "resource": "mana", "amount": -200 },
        { "type": "damage_generator", "discipline": "chaos_channeling", "levels": 1 },
        { "type": "narrative", "text": "The rift snaps shut. Your instruments shudder and dim." }
      ]
    }
  ]
}
```

**Hidden outcomes** are choices that appear as "???" until the player selects them once. After first selection, the choice text is revealed for future occurrences. Expressed in data with `"hidden": true` on the choice object.

### Example Event

```json
{
  "id": "wandering_scholar",
  "category": "opportunity",
  "weight": 10,
  "requires": { "discipline_unlocked": "shadow_binding" },
  "title": "The Stranger at the Gate",
  "text": "A figure in tattered robes stands at your threshold. Their eyes hold the weight of centuries. They offer knowledge — but knowledge of the dead always carries a price.",
  "choices": [
    {
      "label": "Welcome them in",
      "outcomes": [
        { "type": "resource", "resource": "umbral_dust", "amount": 300 },
        { "type": "narrative", "text": "They speak of shadows that remember. You listen until dawn." }
      ]
    },
    {
      "label": "Turn them away",
      "outcomes": [
        { "type": "resource", "resource": "mana", "amount": 500 },
        { "type": "narrative", "text": "Some doors are better left closed. Your wards hum with quiet reassurance." }
      ]
    }
  ]
}
```

### Discoveries

Permanent unlocks triggered by specific conditions (not random):

- **Research discoveries** — complete specific node combinations across disciplines
- **Synergy discoveries** — reach thresholds in two+ disciplines simultaneously, unlocking hidden cross-discipline nodes
- **Secret discoveries** — hidden conditions expressed as data-driven triggers

Tracked in a collection panel with undiscovered ones showing as "???".

### Discovery Condition Schema

Conditions are expressed as composable data rules the engine evaluates each tick:

```json
{
  "id": "the_hoarder",
  "name": "The Hoarder's Revelation",
  "description": "???",
  "discovery_text": "To hold power without spending it is itself a form of mastery.",
  "condition": {
    "type": "threshold",
    "resource": "flux_sparks",
    "value": 10000,
    "constraint": { "type": "never_spent", "resource": "flux_sparks" }
  },
  "reward": { "arcane_knowledge": 10 }
}
```

```json
{
  "id": "the_persistent",
  "name": "Stubborn Resilience",
  "description": "???",
  "discovery_text": "Three falls. Three rises. The fourth time, you understood why.",
  "condition": {
    "type": "counter",
    "event": "combat_loss",
    "count": 3,
    "constraint": { "type": "consecutive" }
  },
  "reward": { "arcane_knowledge": 5 }
}
```

Supported condition types:
- `threshold` — resource reaches a value (with optional constraints like `never_spent`, `single_session`)
- `counter` — track occurrences of game events (`combat_loss`, `research_complete`, `event_choice`) with optional `consecutive` constraint
- `combination` — multiple research nodes completed (array of node IDs)
- `all_of` / `any_of` — compose multiple conditions together

### Challenges

Optional timed objectives appearing every 30-60 minutes:

- "Generate 5,000 Mana in 10 minutes"
- "Defeat 3 encounters without retreating"
- "Complete a Tier 2 research before the hourglass runs out"

Completing grants Arcane Knowledge and unique bonuses. Failing has no penalty — they expire. **Challenges expire if the player goes offline** — they are active-play-only content. The timer pauses if the browser tab is hidden (using Page Visibility API) and resumes when visible.

---

## 6. Prestige System — The Grand Convergence

### Trigger

Available once at least one discipline reaches Tier 4. Framed narratively as reaching a threshold of understanding.

### What Resets

- All resources, generators, research progress, combat progress, active events/challenges

### What You Keep

- **Enlightenment Points** — prestige currency earned on Convergence. Formula: `(total_research_nodes_completed * 2) + (discoveries_found * 5) + (challenges_completed * 3) + (tier_4_nodes * 10)`. A first Convergence with one Tier 4 discipline and moderate progress across others might yield ~80-120 EP.
- **Wizard's Memory** — permanent journal of all discovery texts (flavor, not mechanical)
- **Convergence Count** — tracks total resets

### Enlightenment Upgrades

| Upgrade | Effect |
|---|---|
| Mana Attunement | +25% base Mana generation per level |
| Quickened Mind | Research completes 10% faster per level |
| Resonant Generators | Generators start at level 2 instead of 1 |
| Deep Memory | Start each cycle with Tier 1 of a player-chosen discipline pre-completed |
| Arcane Magnetism | Events trigger 15% more frequently |
| Battle Instinct | Auto-combat AI improves (see Combat section for per-level details) |
| Offline Mastery | Offline efficiency raised from 50% to 65% per level (cap 90%) |
| Convergence Echo | First 10 minutes of each cycle run at 3x speed |

### Prestige Data Schema

```json
{
  "id": "mana_attunement",
  "name": "Mana Attunement",
  "description": "Your connection to the flow of Mana deepens with each Convergence.",
  "max_level": 10,
  "cost_base": 5,
  "cost_scaling": 1.8,
  "effect": {
    "type": "resource_rate_multiplier",
    "resource": "mana",
    "value_per_level": 0.25
  }
}
```

```json
{
  "id": "deep_memory",
  "name": "Deep Memory",
  "description": "Echoes of past mastery linger. One path remains clear.",
  "max_level": 1,
  "cost_base": 20,
  "cost_scaling": 1,
  "effect": {
    "type": "pre_complete_tier",
    "tier": 1,
    "choice": "player_selected"
  }
}
```

Cost formula: `cost_base * cost_scaling^current_level` Enlightenment Points per upgrade level.

Effect types mirror the research effect types where possible (`resource_rate_multiplier`, `research_speed_multiplier`, `generator_start_level`, etc.) so the engine uses the same effect application code.

### Scaling

- First Convergence achievable in a few days of play
- Each subsequent cycle faster due to accumulated upgrades
- Enlightenment costs scale exponentially
- Later Convergences unlock new events, encounters, and secret discoveries

### Design Intent

The prestige loop should feel like rereading a favorite book — familiar, but you notice new things each time.

---

## 7. UI & Aesthetic

### Layout — Four Panel Design

```
┌──────────────────────────────────────────────────┐
│  ≡ THE ARCANIST'S STUDY          ◈ Convergence 2 │
│  ❦ Mana: 12,450  ❦ Arcane Knowledge: 34          │
├──────────┬───────────────────────┬────────────────┤
│          │                       │                │
│ GRIMOIRE │    MAIN VIEWPORT      │   WIZARD'S     │
│          │                       │   JOURNAL      │
│ ◈ Temp.  │  (research tree,      │                │
│ ◈ Spat.  │   combat arena,       │  Rolling log   │
│ ◈ Mind   │   event choices,      │  of narrative   │
│ ◈ Vital  │   generator mgmt)     │  events and    │
│ ◈ Shadow │                       │  discoveries   │
│ ◈ Chaos  │                       │                │
│ ◈ Order  │                       │                │
│          │                       │                │
│ Combat   │                       │                │
│ Sanctum  │                       │                │
│ Prestige │                       │                │
├──────────┴───────────────────────┴────────────────┤
│ ⚗ Chronos: 340  ✦ Aether: 128  ψ Psyche: 56     │
│ ♥ Ichor: 210   ◘ Umbral: 89   ~ Flux: 44  □ Ax:71│
└──────────────────────────────────────────────────┘
```

- **Top bar:** Game title, Mana, Arcane Knowledge, Convergence count
- **Left panel (Grimoire):** Navigation — disciplines, combat, sanctum, prestige
- **Center (Main Viewport):** Active view — research trees, combat, events, generators
- **Right panel (Wizard's Journal):** Rolling narrative log
- **Bottom bar:** All seven discipline resources at a glance

### Parchment Aesthetic

- **Background:** Warm aged parchment texture (CSS gradients, no images)
- **Text:** Dark sepia, serif font (Crimson Text or IM Fell English)
- **Borders:** Subtle ornate lines via CSS borders and box-shadows
- **Panels:** Slightly different parchment shades for depth
- **Buttons:** Embossed look, warm amber glow on hover
- **Research nodes:** Arcane symbols connected by faint golden lines
- **Progress bars:** Styled as filling magical vials or glowing runes
- **Notifications:** Fade in like ink appearing on parchment

### Responsive Design

- **Desktop:** Full four-panel layout
- **Tablet:** Journal collapses into a toggle
- **Mobile:** Single panel with bottom tab navigation

### Animations (subtle)

- Resource numbers tick up smoothly
- Research completion: brief golden shimmer
- Combat spells: text flash effect
- New journal entries: ink-fade-in
- Events arriving: parchment unfurl effect

---

## 8. Save System

### LocalStorage

- Auto-save every 60 seconds
- Save on tab close (beforeunload event)
- Save state includes: all resources, research progress, generator levels, combat state, event history, discovery collection, prestige upgrades, settings

### Export/Import

- Export: encode full state to Base64 string, copy to clipboard
- Import: paste string, decode, validate, load
- Version field in save data for future migration support

---

## 9. Tone & Writing Style

The game's text should evoke **wonder and mystery** — a wizard's journal of discovery.

- Reverent toward magic, never flippant
- Sense of awe at what is being uncovered
- Short, evocative descriptions — "The rune pulses once, then stills. Something has changed."
- Discovery texts feel like personal revelations
- Combat descriptions are vivid but brief
- Event narratives create atmosphere in 2-3 sentences
- Never grimdark, but consequences feel real
