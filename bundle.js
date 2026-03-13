// bundle.js — Single-file game bundle (no ES modules needed)
// Auto-generated from modular source files.
(function() {
'use strict';

// ============================================================
// DATA
// ============================================================


var resourcesData = 
{
  "resources": [
    {
      "id": "mana",
      "name": "Mana",
      "icon": "❦",
      "base_rate": 1.0,
      "cap": null,
      "description": "The raw, unformed essence that bleeds through the veil between thought and reality. Every arcane working begins and ends with mana — it is the breath the universe holds before a spell is spoken."
    },
    {
      "id": "chronos_essence",
      "name": "Chronos Essence",
      "icon": "⚗",
      "base_rate": 0,
      "cap": null,
      "description": "Shards of time pried loose from the flow of moments and distilled into an amber-dark liquid. Handle with care — the essence remembers every second it once was, and it longs to return."
    },
    {
      "id": "aether_threads",
      "name": "Aether Threads",
      "icon": "✦",
      "base_rate": 0,
      "cap": null,
      "description": "Gossamer filaments drawn from the seams between places, where one location reluctantly becomes another. The threads hum faintly, as though the distance they once measured is still screaming to be whole."
    },
    {
      "id": "psyche_fragments",
      "name": "Psyche Fragments",
      "icon": "ψ",
      "base_rate": 0,
      "cap": null,
      "description": "Crystalline splinters of conscious thought, broken from minds that dreamed too deeply. They glitter with half-remembered intentions and whisper in the language of someone else's sleep."
    },
    {
      "id": "vital_ichor",
      "name": "Vital Ichor",
      "icon": "♥",
      "base_rate": 0,
      "cap": null,
      "description": "The luminous, viscous essence that animates all living things, coaxed from the boundary between life and its absence. It pulses with a warmth that feels uncomfortably like a heartbeat not your own."
    },
    {
      "id": "umbral_dust",
      "name": "Umbral Dust",
      "icon": "◘",
      "base_rate": 0,
      "cap": null,
      "description": "The fine, cold residue left where shadows have grown old and begun to forget the light that made them. It settles in still air with an unnatural patience, as though it is simply waiting."
    },
    {
      "id": "flux_sparks",
      "name": "Flux Sparks",
      "icon": "~",
      "base_rate": 0,
      "cap": null,
      "description": "Errant motes of entropy harvested from the moment probability tears itself apart. They crackle and shift color without reason — beautiful, capricious, and deeply untrustworthy."
    },
    {
      "id": "axiom_crystals",
      "name": "Axiom Crystals",
      "icon": "□",
      "base_rate": 0,
      "cap": null,
      "description": "Faceted gems precipitated from the sediment of immutable law, where the universe's own rules have grown dense enough to touch. Each crystal hums with the cold, absolute certainty of something that cannot be otherwise."
    },
    {
      "id": "arcane_knowledge",
      "name": "Arcane Knowledge",
      "icon": "◈",
      "base_rate": 0,
      "cap": null,
      "description": "The slow accumulation of understanding wrested from the dark — truths the universe did not wish to yield. It has no weight, yet every arcanist who carries enough of it is bent by the burden."
    }
  ],
  "generators": [
    {
      "id": "temporal_gen_t1",
      "discipline": "temporal_arcana",
      "name": "Ritual Hourglass",
      "description": "A sand-filled hourglass etched with binding sigils that slow each grain's descent, trapping slivers of passing time within the glass. As moments accumulate, they condense into raw Chronos Essence at the narrow waist.",
      "unlock_requires": "temporal_t1_1",
      "base_output": 0.5,
      "output_resource": "chronos_essence",
      "base_cost": { "mana": 25 },
      "upgrade_cost": { "mana": 100, "chronos_essence": 30 },
      "max_level": 10
    },
    {
      "id": "temporal_gen_t2",
      "discipline": "temporal_arcana",
      "name": "Temporal Rift Lens",
      "description": "A brass-framed lens ground from paradox glass, focused to tear a hairline fracture in the present moment. The rift bleeds Chronos Essence steadily — though the arcanist is advised not to look through it for long.",
      "unlock_requires": "temporal_t2_1",
      "base_output": 1.5,
      "output_resource": "chronos_essence",
      "base_cost": { "mana": 500, "chronos_essence": 100 },
      "upgrade_cost": { "mana": 1000, "chronos_essence": 250 },
      "max_level": 10
    },
    {
      "id": "temporal_gen_t3",
      "discipline": "temporal_arcana",
      "name": "Chronal Engine",
      "description": "A clockwork monstrosity of interlocked gear-rings that processes time itself as raw ore, smelting the present into Chronos Essence in great churning quantities. The clocks in the study run slightly wrong whenever it operates.",
      "unlock_requires": "temporal_t3_1",
      "base_output": 4.0,
      "output_resource": "chronos_essence",
      "base_cost": { "mana": 2000, "chronos_essence": 500 },
      "upgrade_cost": { "mana": 4000, "chronos_essence": 1000 },
      "max_level": 10
    },
    {
      "id": "spatial_gen_t1",
      "discipline": "spatial_weaving",
      "name": "Aether Spindle",
      "description": "A slender ivory spindle that draws filaments from the thin places in the air, winding the invisible seams between spaces into workable Aether Threads. It spins without being touched, and the threads it produces are cold as distance.",
      "unlock_requires": "spatial_t1_1",
      "base_output": 0.5,
      "output_resource": "aether_threads",
      "base_cost": { "mana": 25 },
      "upgrade_cost": { "mana": 100, "aether_threads": 30 },
      "max_level": 10
    },
    {
      "id": "spatial_gen_t2",
      "discipline": "spatial_weaving",
      "name": "Dimensional Loom",
      "description": "A loom strung not with fiber but with compressed space, its shuttle passing through carefully arranged folds in local geometry to produce dense, stable Aether Threads. The weaving produces a low sound like a place that is very far away.",
      "unlock_requires": "spatial_t2_1",
      "base_output": 1.5,
      "output_resource": "aether_threads",
      "base_cost": { "mana": 500, "aether_threads": 100 },
      "upgrade_cost": { "mana": 1000, "aether_threads": 250 },
      "max_level": 10
    },
    {
      "id": "spatial_gen_t3",
      "discipline": "spatial_weaving",
      "name": "Void Conduit",
      "description": "A column of inverted space anchored to the study's floor by seven binding chains, drawing Aether Threads directly from the formless void beyond measurable distance. Objects left too near its edge are sometimes found slightly elsewhere.",
      "unlock_requires": "spatial_t3_1",
      "base_output": 4.0,
      "output_resource": "aether_threads",
      "base_cost": { "mana": 2000, "aether_threads": 500 },
      "upgrade_cost": { "mana": 4000, "aether_threads": 1000 },
      "max_level": 10
    },
    {
      "id": "mind_gen_t1",
      "discipline": "mind_sculpting",
      "name": "Thought Well",
      "description": "A shallow obsidian basin filled with still water that reflects not the ceiling but something deeper — the surface tension of thought itself. Psyche Fragments precipitate at the bowl's rim like salt left by an evaporating dream.",
      "unlock_requires": "mind_t1_1",
      "base_output": 0.5,
      "output_resource": "psyche_fragments",
      "base_cost": { "mana": 25 },
      "upgrade_cost": { "mana": 100, "psyche_fragments": 30 },
      "max_level": 10
    },
    {
      "id": "mind_gen_t2",
      "discipline": "mind_sculpting",
      "name": "Psychic Resonator",
      "description": "A tuning fork of unknown silver alloy, struck against the edge of consciousness to vibrate at the exact frequency of unwanted thought. The resonance shakes loose Psyche Fragments from passing minds — including, occasionally, your own.",
      "unlock_requires": "mind_t2_1",
      "base_output": 1.5,
      "output_resource": "psyche_fragments",
      "base_cost": { "mana": 500, "psyche_fragments": 100 },
      "upgrade_cost": { "mana": 1000, "psyche_fragments": 250 },
      "max_level": 10
    },
    {
      "id": "mind_gen_t3",
      "discipline": "mind_sculpting",
      "name": "Mind Engine",
      "description": "A sealed iron cabinet that processes raw cognition through a series of internal sigil-etched chambers, reducing thought to its crystalline constituent fragments with terrible efficiency. It is best not to wonder whose thoughts fuel it.",
      "unlock_requires": "mind_t3_1",
      "base_output": 4.0,
      "output_resource": "psyche_fragments",
      "base_cost": { "mana": 2000, "psyche_fragments": 500 },
      "upgrade_cost": { "mana": 4000, "psyche_fragments": 1000 },
      "max_level": 10
    },
    {
      "id": "vital_gen_t1",
      "discipline": "vital_alchemy",
      "name": "Verdant Font",
      "description": "A moss-ringed stone basin fed by an alchemical trickle that coaxes Vital Ichor from the slow generosity of growing things. The water at its center is always slightly warm, as though something living is deciding whether to wake.",
      "unlock_requires": "vital_t1_1",
      "base_output": 0.5,
      "output_resource": "vital_ichor",
      "base_cost": { "mana": 25 },
      "upgrade_cost": { "mana": 100, "vital_ichor": 30 },
      "max_level": 10
    },
    {
      "id": "vital_gen_t2",
      "discipline": "vital_alchemy",
      "name": "Life Well",
      "description": "A deep copper vessel etched with growth-runes that draws the animating principle upward from the study's foundations, pooling Vital Ichor in quantities that make the candles burn a little brighter. The well makes a sound like breathing if you listen at midnight.",
      "unlock_requires": "vital_t2_1",
      "base_output": 1.5,
      "output_resource": "vital_ichor",
      "base_cost": { "mana": 500, "vital_ichor": 100 },
      "upgrade_cost": { "mana": 1000, "vital_ichor": 250 },
      "max_level": 10
    },
    {
      "id": "vital_gen_t3",
      "discipline": "vital_alchemy",
      "name": "Vital Crucible",
      "description": "A furnace-hearted alchemical crucible that renders the essence of life itself down to its most potent distillate, producing Vital Ichor in a steady, luminous flow. Nothing placed inside it remains merely dead for long.",
      "unlock_requires": "vital_t3_1",
      "base_output": 4.0,
      "output_resource": "vital_ichor",
      "base_cost": { "mana": 2000, "vital_ichor": 500 },
      "upgrade_cost": { "mana": 4000, "vital_ichor": 1000 },
      "max_level": 10
    },
    {
      "id": "shadow_gen_t1",
      "discipline": "shadow_binding",
      "name": "Shadow Trap",
      "description": "A lacquered box lined with mirror-glass and dark silk, designed to catch a shadow and hold it until it grows stale and crumbles into Umbral Dust. The lid should be kept shut; old shadows sometimes press against it from within.",
      "unlock_requires": "shadow_t1_1",
      "base_output": 0.5,
      "output_resource": "umbral_dust",
      "base_cost": { "mana": 25 },
      "upgrade_cost": { "mana": 100, "umbral_dust": 30 },
      "max_level": 10
    },
    {
      "id": "shadow_gen_t2",
      "discipline": "shadow_binding",
      "name": "Umbral Vortex",
      "description": "A self-sustaining spiral of bound darkness that draws in ambient shadow and compresses it into Umbral Dust at the vortex's eye. The study grows measurably darker when this apparatus is active, regardless of the candles.",
      "unlock_requires": "shadow_t2_1",
      "base_output": 1.5,
      "output_resource": "umbral_dust",
      "base_cost": { "mana": 500, "umbral_dust": 100 },
      "upgrade_cost": { "mana": 1000, "umbral_dust": 250 },
      "max_level": 10
    },
    {
      "id": "shadow_gen_t3",
      "discipline": "shadow_binding",
      "name": "Void Siphon",
      "description": "An obsidian column bored through with a channel that reaches past the study's walls into somewhere without light at all, drawing Umbral Dust up in cold handfuls from the absolute dark. The cold that surrounds it never entirely fades.",
      "unlock_requires": "shadow_t3_1",
      "base_output": 4.0,
      "output_resource": "umbral_dust",
      "base_cost": { "mana": 2000, "umbral_dust": 500 },
      "upgrade_cost": { "mana": 4000, "umbral_dust": 1000 },
      "max_level": 10
    },
    {
      "id": "chaos_gen_t1",
      "discipline": "chaos_channeling",
      "name": "Spark Catcher",
      "description": "A wire-and-glass contraption of precarious design that snares errant Flux Sparks from the ambient chaos of an arcanist's working environment. It crackles unpredictably and should not be placed near anything irreplaceable.",
      "unlock_requires": "chaos_t1_1",
      "base_output": 0.5,
      "output_resource": "flux_sparks",
      "base_cost": { "mana": 25 },
      "upgrade_cost": { "mana": 100, "flux_sparks": 30 },
      "max_level": 10
    },
    {
      "id": "chaos_gen_t2",
      "discipline": "chaos_channeling",
      "name": "Flux Turbine",
      "description": "A spinning armature of mismatched materials that agitates local probability into generating Flux Sparks through sheer, deliberate unpredictability. It is theoretically safe, though no two scholars agree on the theory.",
      "unlock_requires": "chaos_t2_1",
      "base_output": 1.5,
      "output_resource": "flux_sparks",
      "base_cost": { "mana": 500, "flux_sparks": 100 },
      "upgrade_cost": { "mana": 1000, "flux_sparks": 250 },
      "max_level": 10
    },
    {
      "id": "chaos_gen_t3",
      "discipline": "chaos_channeling",
      "name": "Entropy Core",
      "description": "A contained singularity of pure disorder that generates Flux Sparks by accelerating the universe's slow unraveling within a carefully inscribed boundary. The sigils must be redrawn weekly; the entropy has opinions about geometry.",
      "unlock_requires": "chaos_t3_1",
      "base_output": 4.0,
      "output_resource": "flux_sparks",
      "base_cost": { "mana": 2000, "flux_sparks": 500 },
      "upgrade_cost": { "mana": 4000, "flux_sparks": 1000 },
      "max_level": 10
    },
    {
      "id": "order_gen_t1",
      "discipline": "order_forging",
      "name": "Axiom Mill",
      "description": "A small grinding wheel of petrified law-stone that pulverizes raw principle into Axiom Crystals, imposing structure on the formless with each slow revolution. The sound it makes is less a grinding and more a quiet, insistent certainty.",
      "unlock_requires": "order_t1_1",
      "base_output": 0.5,
      "output_resource": "axiom_crystals",
      "base_cost": { "mana": 25 },
      "upgrade_cost": { "mana": 100, "axiom_crystals": 30 },
      "max_level": 10
    },
    {
      "id": "order_gen_t2",
      "discipline": "order_forging",
      "name": "Law Forge",
      "description": "A furnace that burns not with fire but with the exothermic energy of contradiction being resolved, smelting paradox and ambiguity into refined Axiom Crystals of brutal clarity. The forge does not tolerate indecision in its operator.",
      "unlock_requires": "order_t2_1",
      "base_output": 1.5,
      "output_resource": "axiom_crystals",
      "base_cost": { "mana": 500, "axiom_crystals": 100 },
      "upgrade_cost": { "mana": 1000, "axiom_crystals": 250 },
      "max_level": 10
    },
    {
      "id": "order_gen_t3",
      "discipline": "order_forging",
      "name": "Order Matrix",
      "description": "A towering lattice of interlocked Axiom Crystals that self-reinforces as it grows, imposing such a density of structured law on its surroundings that new crystals precipitate from the air itself. Near it, chance becomes a fading memory.",
      "unlock_requires": "order_t3_1",
      "base_output": 4.0,
      "output_resource": "axiom_crystals",
      "base_cost": { "mana": 2000, "axiom_crystals": 500 },
      "upgrade_cost": { "mana": 4000, "axiom_crystals": 1000 },
      "max_level": 10
    }
  ]
}
;

var disciplinesData = 
{
  "disciplines": [
    { "id": "temporal_arcana", "name": "Temporal Arcana", "domain": "Time", "resource": "chronos_essence", "icon": "⏳", "description": "The study of time's hidden architecture — its currents, eddies, and the spaces between moments." },
    { "id": "spatial_weaving", "name": "Spatial Weaving", "domain": "Space", "resource": "aether_threads", "icon": "🌀", "description": "The art of folding, stretching, and rewriting the geometry of existence itself." },
    { "id": "mind_sculpting", "name": "Mind Sculpting", "domain": "Mind", "resource": "psyche_fragments", "icon": "🧠", "description": "The discipline of thought made tangible — reshaping consciousness like clay on a wheel." },
    { "id": "vital_alchemy", "name": "Vital Alchemy", "domain": "Life", "resource": "vital_ichor", "icon": "🌿", "description": "The transmutation of life force — coaxing growth from stillness and strength from decay." },
    { "id": "shadow_binding", "name": "Shadow Binding", "domain": "Death", "resource": "umbral_dust", "icon": "🌑", "description": "Mastery over darkness and entropy — the power found in what light refuses to touch." },
    { "id": "chaos_channeling", "name": "Chaos Channeling", "domain": "Chaos", "resource": "flux_sparks", "icon": "⚡", "description": "The art of riding the storm — drawing power from the universe's raw, unformed potential." },
    { "id": "order_forging", "name": "Order Forging", "domain": "Order", "resource": "axiom_crystals", "icon": "🔷", "description": "The science of absolute structure — imposing perfect law upon the formless void." }
  ],
  "nodes": [

    

    
    {
      "id": "temporal_t1_1",
      "discipline": "temporal_arcana",
      "tier": 1,
      "name": "Temporal Basics",
      "description": "An introduction to the perception of chronal currents — learning to feel time's passage as a river rather than a road. Unlocks the Ritual Hourglass, a device that steadily gathers Chronos Essence.",
      "discovery": "You realize that every moment leaves a faint residue, like dust settling after a door closes.",
      "cost": { "mana": 10 },
      "duration": 30,
      "requires": [],
      "effects": [{ "type": "unlock_generator", "generator": "temporal_gen_t1" }]
    },
    {
      "id": "temporal_t1_2",
      "discipline": "temporal_arcana",
      "tier": 1,
      "name": "Temporal Flow",
      "description": "Study of the natural rhythms within time — the tides that pull seconds faster or slower depending on forces unseen. Increases Chronos Essence generation by 1.2x.",
      "discovery": "Time does not flow uniformly; it pools in some places and rushes through others, like water over stones.",
      "cost": { "mana": 100, "chronos_essence": 25 },
      "duration": 45,
      "requires": ["temporal_t1_1"],
      "effects": [{ "type": "resource_multiplier", "resource": "chronos_essence", "value": 1.2 }]
    },
    {
      "id": "temporal_t1_3",
      "discipline": "temporal_arcana",
      "tier": 1,
      "name": "Temporal Sensitivity",
      "description": "Training the inner eye to detect minute distortions in the chronal field — the whisper of seconds yet to arrive. Increases Chronos Essence generation by 1.2x.",
      "discovery": "The present is not a single point but a shimmering membrane, and you have learned to feel its trembling.",
      "cost": { "mana": 200, "chronos_essence": 50 },
      "duration": 60,
      "requires": ["temporal_t1_1"],
      "effects": [{ "type": "resource_multiplier", "resource": "chronos_essence", "value": 1.2 }]
    },

    
    {
      "id": "temporal_t2_1",
      "discipline": "temporal_arcana",
      "tier": 2,
      "name": "Temporal Strike",
      "description": "The art of condensing stolen seconds into a single devastating blow — time itself becomes the weapon. Unlocks the Temporal Strike spell.",
      "discovery": "A moment compressed carries the weight of an age. Even eternity flinches when struck with its own substance.",
      "cost": { "mana": 500, "chronos_essence": 100 },
      "duration": 120,
      "requires": ["temporal_t1_1", "temporal_t1_2"],
      "effects": [{ "type": "unlock_spell", "spell": "temporal_strike" }]
    },
    {
      "id": "temporal_t2_2",
      "discipline": "temporal_arcana",
      "tier": 2,
      "name": "Temporal Shield",
      "description": "Weaving a barrier from looped instants — attacks slip into yesterday before they ever land. Unlocks the Temporal Shield spell.",
      "discovery": "The best defense is not to endure the blow, but to ensure it happened in a moment that no longer exists.",
      "cost": { "mana": 700, "chronos_essence": 140 },
      "duration": 180,
      "requires": ["temporal_t1_1", "temporal_t1_3"],
      "effects": [{ "type": "unlock_spell", "spell": "temporal_shield" }]
    },
    {
      "id": "temporal_t2_3",
      "discipline": "temporal_arcana",
      "tier": 2,
      "name": "Temporal Amplification",
      "description": "Techniques for stretching a single chronal thread into a resonating harmonic, multiplying its essence manifold. Increases Chronos Essence generation by 1.4x.",
      "discovery": "One second, properly plucked, rings like a bell — and each echo carries the same power as the original.",
      "cost": { "mana": 800, "chronos_essence": 160 },
      "duration": 240,
      "requires": ["temporal_t1_2", "temporal_t1_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "chronos_essence", "value": 1.4 }]
    },
    {
      "id": "temporal_t2_4",
      "discipline": "temporal_arcana",
      "tier": 2,
      "name": "Temporal Engine",
      "description": "Construction of a self-sustaining chronal apparatus — a clockwork of pure time that generates essence without end. Unlocks the Temporal Rift Lens, a device that generates Chronos Essence.",
      "discovery": "The engine turns not with gears but with paradox: it runs because it has always been running.",
      "cost": { "mana": 900, "chronos_essence": 180 },
      "duration": 270,
      "requires": ["temporal_t1_1", "temporal_t1_2"],
      "effects": [{ "type": "unlock_generator", "generator": "temporal_gen_t2" }]
    },
    {
      "id": "temporal_t2_5",
      "discipline": "temporal_arcana",
      "tier": 2,
      "name": "Temporal Resonance",
      "description": "Attuning to the deep harmonic frequency at which all moments vibrate, drawing power from time's fundamental tone. Increases Chronos Essence generation by 1.5x.",
      "discovery": "Beneath the chaos of passing seconds lies a single, perfect note — the hum of duration itself.",
      "cost": { "mana": 1000, "chronos_essence": 200 },
      "duration": 300,
      "requires": ["temporal_t1_2", "temporal_t1_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "chronos_essence", "value": 1.5 }]
    },

    
    {
      "id": "temporal_t3_1",
      "discipline": "temporal_arcana",
      "tier": 3,
      "name": "Temporal Cascade",
      "description": "Unleashing a torrent of unbound moments that crash through reality like a breaking dam of accumulated ages. Increases Chronos Essence generation by 1.5x.",
      "discovery": "When enough stolen seconds are released at once, they do not merely flow — they shatter the present like glass.",
      "cost": { "mana": 2000, "chronos_essence": 500 },
      "duration": 600,
      "insightCost": 1,
      "requires": ["temporal_t2_1", "temporal_t2_2"],
      "effects": [{ "type": "resource_multiplier", "resource": "chronos_essence", "value": 1.5 }]
    },
    {
      "id": "temporal_t3_2",
      "discipline": "temporal_arcana",
      "tier": 3,
      "name": "Temporal Mastery",
      "description": "Complete command over local timestreams — the ability to age stone to dust or restore ash to flame at will. Increases Chronos Essence generation by 1.7x.",
      "discovery": "You no longer swim in time's river. You have become the current, and the river bends to your passage.",
      "cost": { "mana": 3000, "chronos_essence": 700 },
      "duration": 720,
      "insightCost": 2,
      "requires": ["temporal_t2_2", "temporal_t2_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "chronos_essence", "value": 1.7 }]
    },
    {
      "id": "temporal_t3_3",
      "discipline": "temporal_arcana",
      "tier": 3,
      "name": "Temporal Nexus",
      "description": "Establishing a fixed point where all timelines converge — a junction from which past, present, and future may be observed simultaneously. Unlocks the Chronal Engine, a device that generates Chronos Essence.",
      "discovery": "At the nexus, you see every version of now overlaid like pages of an infinite book, each equally real.",
      "cost": { "mana": 4000, "chronos_essence": 800 },
      "duration": 840,
      "insightCost": 2,
      "requires": ["temporal_t2_3", "temporal_t2_4"],
      "effects": [{ "type": "unlock_generator", "generator": "temporal_gen_t3" }]
    },
    {
      "id": "temporal_t3_4",
      "discipline": "temporal_arcana",
      "tier": 3,
      "name": "Temporal Dominion",
      "description": "Claiming sovereign authority over an entire region of time — nothing ages, heals, or changes without the arcanist's consent. Increases Chronos Essence generation by 2.0x.",
      "discovery": "Within your dominion, entropy itself awaits your permission. The clock ticks only when you allow it.",
      "cost": { "mana": 5000, "chronos_essence": 1000 },
      "duration": 900,
      "insightCost": 2,
      "requires": ["temporal_t2_4", "temporal_t2_5"],
      "effects": [{ "type": "resource_multiplier", "resource": "chronos_essence", "value": 2.0 }]
    },

    
    {
      "id": "temporal_t4_1",
      "discipline": "temporal_arcana",
      "tier": 4,
      "name": "Temporal Ascendancy",
      "description": "Transcending mortal perception of sequence — existing across multiple moments simultaneously, unbound by causality. Increases Chronos Essence generation by 2.5x.",
      "discovery": "Cause and effect are merely suggestions. You have learned to answer questions before they are asked.",
      "cost": { "mana": 10000, "chronos_essence": 2000 },
      "duration": 1200,
      "insightCost": 3,
      "requires": ["temporal_t3_1", "temporal_t3_2", "temporal_t3_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "chronos_essence", "value": 2.5 }]
    },
    {
      "id": "temporal_t4_2",
      "discipline": "temporal_arcana",
      "tier": 4,
      "name": "Temporal Apotheosis",
      "description": "Becoming one with the chronostream itself — the arcanist dissolves into eternity and reconstitutes at will, a living paradox. Increases Chronos Essence generation by 3.0x.",
      "discovery": "Time is not a force to be mastered. It is a name for what you are. You were always the clock, ticking.",
      "cost": { "mana": 20000, "chronos_essence": 5000 },
      "duration": 1800,
      "insightCost": 4,
      "requires": ["temporal_t3_2", "temporal_t3_3", "temporal_t3_4"],
      "effects": [{ "type": "resource_multiplier", "resource": "chronos_essence", "value": 3.0 }]
    },

    

    
    {
      "id": "spatial_t1_1",
      "discipline": "spatial_weaving",
      "tier": 1,
      "name": "Spatial Basics",
      "description": "First lessons in perceiving the invisible lattice that undergirds all distance and dimension. Unlocks the Aether Spindle, a device that steadily gathers Aether Threads.",
      "discovery": "The space between two points is not empty — it is woven from threads finer than light.",
      "cost": { "mana": 10 },
      "duration": 30,
      "requires": [],
      "effects": [{ "type": "unlock_generator", "generator": "spatial_gen_t1" }]
    },
    {
      "id": "spatial_t1_2",
      "discipline": "spatial_weaving",
      "tier": 1,
      "name": "Spatial Flow",
      "description": "Understanding how aether threads drift and coil through the geometry of the world, carrying dimension like a current. Increases Aether Threads generation by 1.2x.",
      "discovery": "Space is not static — it breathes, expands, and contracts in patterns that mirror the arcanist's own heartbeat.",
      "cost": { "mana": 100, "aether_threads": 25 },
      "duration": 45,
      "requires": ["spatial_t1_1"],
      "effects": [{ "type": "resource_multiplier", "resource": "aether_threads", "value": 1.2 }]
    },
    {
      "id": "spatial_t1_3",
      "discipline": "spatial_weaving",
      "tier": 1,
      "name": "Spatial Sensitivity",
      "description": "Developing an acute awareness of spatial distortions — the subtle wrongness where geometry has been bent or torn. Increases Aether Threads generation by 1.2x.",
      "discovery": "You can now feel the faint ache of folded space, like a crease in parchment that refuses to lie flat.",
      "cost": { "mana": 200, "aether_threads": 50 },
      "duration": 60,
      "requires": ["spatial_t1_1"],
      "effects": [{ "type": "resource_multiplier", "resource": "aether_threads", "value": 1.2 }]
    },

    
    {
      "id": "spatial_t2_1",
      "discipline": "spatial_weaving",
      "tier": 2,
      "name": "Spatial Rift",
      "description": "Tearing a precise wound in the fabric of space — a controlled rupture that displaces matter across impossible distances. Unlocks the Spatial Rend spell.",
      "discovery": "To open a rift is to teach two distant points that they are, in truth, the same point wearing different masks.",
      "cost": { "mana": 500, "aether_threads": 100 },
      "duration": 120,
      "requires": ["spatial_t1_1", "spatial_t1_2"],
      "effects": [{ "type": "unlock_spell", "spell": "spatial_rift" }]
    },
    {
      "id": "spatial_t2_2",
      "discipline": "spatial_weaving",
      "tier": 2,
      "name": "Spatial Barrier",
      "description": "Hardening the aether threads into an impenetrable geometric wall — a shield made of compressed distance. Unlocks the Spatial Dodge spell.",
      "discovery": "The barrier does not block the attack. It simply ensures that the space between you and harm becomes infinite.",
      "cost": { "mana": 700, "aether_threads": 140 },
      "duration": 180,
      "requires": ["spatial_t1_1", "spatial_t1_3"],
      "effects": [{ "type": "unlock_spell", "spell": "spatial_barrier" }]
    },
    {
      "id": "spatial_t2_3",
      "discipline": "spatial_weaving",
      "tier": 2,
      "name": "Spatial Amplification",
      "description": "Multiplying aether threads by folding space back upon itself, creating recursive geometries that generate their own substance. Increases Aether Threads generation by 1.4x.",
      "discovery": "A single thread folded seven times contains the blueprint of an entire dimension.",
      "cost": { "mana": 800, "aether_threads": 160 },
      "duration": 240,
      "requires": ["spatial_t1_2", "spatial_t1_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "aether_threads", "value": 1.4 }]
    },
    {
      "id": "spatial_t2_4",
      "discipline": "spatial_weaving",
      "tier": 2,
      "name": "Spatial Loom",
      "description": "A conjured apparatus that weaves raw aether into structured spatial fabric — an engine of geometric creation. Unlocks the Dimensional Loom, a device that generates Aether Threads.",
      "discovery": "The loom does not create space from nothing. It unravels the excess from places where reality is too thick.",
      "cost": { "mana": 900, "aether_threads": 180 },
      "duration": 270,
      "requires": ["spatial_t1_1", "spatial_t1_2"],
      "effects": [{ "type": "unlock_generator", "generator": "spatial_gen_t2" }]
    },
    {
      "id": "spatial_t2_5",
      "discipline": "spatial_weaving",
      "tier": 2,
      "name": "Spatial Resonance",
      "description": "Attuning to the deep vibration of dimensional boundaries — the hum where one plane of existence grazes another. Increases Aether Threads generation by 1.5x.",
      "discovery": "Every wall between worlds vibrates at a frequency. Learn that frequency, and the wall becomes a door.",
      "cost": { "mana": 1000, "aether_threads": 200 },
      "duration": 300,
      "requires": ["spatial_t1_2", "spatial_t1_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "aether_threads", "value": 1.5 }]
    },

    
    {
      "id": "spatial_t3_1",
      "discipline": "spatial_weaving",
      "tier": 3,
      "name": "Spatial Cascade",
      "description": "A chain reaction of collapsing dimensions — each fold triggers the next, rewriting the geometry of an entire region. Increases Aether Threads generation by 1.5x.",
      "discovery": "One carefully placed fold can unravel a thousand miles of stable space. Precision is more dangerous than force.",
      "cost": { "mana": 2000, "aether_threads": 500 },
      "duration": 600,
      "insightCost": 1,
      "requires": ["spatial_t2_1", "spatial_t2_2"],
      "effects": [{ "type": "resource_multiplier", "resource": "aether_threads", "value": 1.5 }]
    },
    {
      "id": "spatial_t3_2",
      "discipline": "spatial_weaving",
      "tier": 3,
      "name": "Spatial Mastery",
      "description": "Total fluency in the language of dimension — the arcanist reshapes rooms, corridors, and vaults with a thought. Increases Aether Threads generation by 1.7x.",
      "discovery": "Geometry is not a property of the world. It is an opinion, and yours now carries the weight of law.",
      "cost": { "mana": 3000, "aether_threads": 700 },
      "duration": 720,
      "insightCost": 2,
      "requires": ["spatial_t2_2", "spatial_t2_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "aether_threads", "value": 1.7 }]
    },
    {
      "id": "spatial_t3_3",
      "discipline": "spatial_weaving",
      "tier": 3,
      "name": "Spatial Nexus",
      "description": "Creating a hub point where all spatial coordinates converge — a room that is simultaneously everywhere and nowhere. Unlocks the Void Conduit, a device that generates Aether Threads.",
      "discovery": "The nexus has no location because it contains all locations. To step inside is to stand at the center of everything.",
      "cost": { "mana": 4000, "aether_threads": 800 },
      "duration": 840,
      "insightCost": 2,
      "requires": ["spatial_t2_3", "spatial_t2_4"],
      "effects": [{ "type": "unlock_generator", "generator": "spatial_gen_t3" }]
    },
    {
      "id": "spatial_t3_4",
      "discipline": "spatial_weaving",
      "tier": 3,
      "name": "Spatial Dominion",
      "description": "Absolute authority over the dimensions within your territory — distance, direction, and orientation obey your will alone. Increases Aether Threads generation by 2.0x.",
      "discovery": "In your domain, north is wherever you declare it. Walls have as many sides as you require.",
      "cost": { "mana": 5000, "aether_threads": 1000 },
      "duration": 900,
      "insightCost": 2,
      "requires": ["spatial_t2_4", "spatial_t2_5"],
      "effects": [{ "type": "resource_multiplier", "resource": "aether_threads", "value": 2.0 }]
    },

    
    {
      "id": "spatial_t4_1",
      "discipline": "spatial_weaving",
      "tier": 4,
      "name": "Spatial Ascendancy",
      "description": "Perceiving and manipulating dimensions beyond the mortal three — touching the hidden axes along which reality is truly built. Increases Aether Threads generation by 2.5x.",
      "discovery": "The world you knew was a shadow cast by a shape with far more edges. You can see them all now.",
      "cost": { "mana": 10000, "aether_threads": 2000 },
      "duration": 1200,
      "insightCost": 3,
      "requires": ["spatial_t3_1", "spatial_t3_2", "spatial_t3_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "aether_threads", "value": 2.5 }]
    },
    {
      "id": "spatial_t4_2",
      "discipline": "spatial_weaving",
      "tier": 4,
      "name": "Spatial Apotheosis",
      "description": "Becoming the geometry itself — the arcanist exists as a living theorem, a self-proving equation woven into the fabric of space. Increases Aether Threads generation by 3.0x.",
      "discovery": "You are no longer within space. Space is within you, and every point in existence is a thought you are thinking.",
      "cost": { "mana": 20000, "aether_threads": 5000 },
      "duration": 1800,
      "insightCost": 4,
      "requires": ["spatial_t3_2", "spatial_t3_3", "spatial_t3_4"],
      "effects": [{ "type": "resource_multiplier", "resource": "aether_threads", "value": 3.0 }]
    },

    

    
    {
      "id": "mind_t1_1",
      "discipline": "mind_sculpting",
      "tier": 1,
      "name": "Mind Basics",
      "description": "The first tentative reach inward — learning to observe one's own thoughts as objects that can be held, turned, and examined. Unlocks the Thought Well, a device that steadily gathers Psyche Fragments.",
      "discovery": "Your thoughts are not you. They are things that live inside you, and they can be rearranged.",
      "cost": { "mana": 10 },
      "duration": 30,
      "requires": [],
      "effects": [{ "type": "unlock_generator", "generator": "mind_gen_t1" }]
    },
    {
      "id": "mind_t1_2",
      "discipline": "mind_sculpting",
      "tier": 1,
      "name": "Mind Flow",
      "description": "Tracing the currents of consciousness — the streams of intention and memory that circulate through every thinking being. Increases Psyche Fragments generation by 1.2x.",
      "discovery": "Consciousness flows like water through channels worn by habit. Redirect the channel, and the mind follows.",
      "cost": { "mana": 100, "psyche_fragments": 25 },
      "duration": 45,
      "requires": ["mind_t1_1"],
      "effects": [{ "type": "resource_multiplier", "resource": "psyche_fragments", "value": 1.2 }]
    },
    {
      "id": "mind_t1_3",
      "discipline": "mind_sculpting",
      "tier": 1,
      "name": "Mind Sensitivity",
      "description": "Developing the unsettling ability to sense nearby thoughts — a faint pressure behind the eyes when other minds draw close. Increases Psyche Fragments generation by 1.2x.",
      "discovery": "Other minds press against yours like bodies in a crowd. You cannot yet read them, but you feel their weight.",
      "cost": { "mana": 200, "psyche_fragments": 50 },
      "duration": 60,
      "requires": ["mind_t1_1"],
      "effects": [{ "type": "resource_multiplier", "resource": "psyche_fragments", "value": 1.2 }]
    },

    
    {
      "id": "mind_t2_1",
      "discipline": "mind_sculpting",
      "tier": 2,
      "name": "Mind Strike",
      "description": "Projecting a concentrated lance of psychic force — a thought sharpened to a killing edge and hurled at another consciousness. Unlocks the Mind Blast spell.",
      "discovery": "The mind is soft and unarmored from within. A single well-aimed thought can shatter what no blade could scratch.",
      "cost": { "mana": 500, "psyche_fragments": 100 },
      "duration": 120,
      "requires": ["mind_t1_1", "mind_t1_2"],
      "effects": [{ "type": "unlock_spell", "spell": "mind_strike" }]
    },
    {
      "id": "mind_t2_2",
      "discipline": "mind_sculpting",
      "tier": 2,
      "name": "Mind Shield",
      "description": "Constructing layered walls of false thought and misdirection around the core self — a labyrinth with no center. Unlocks the Mind Drain spell.",
      "discovery": "The strongest mental defense is not a wall but a maze. Let intruders wander until they forget what they sought.",
      "cost": { "mana": 700, "psyche_fragments": 140 },
      "duration": 180,
      "requires": ["mind_t1_1", "mind_t1_3"],
      "effects": [{ "type": "unlock_spell", "spell": "mind_shield" }]
    },
    {
      "id": "mind_t2_3",
      "discipline": "mind_sculpting",
      "tier": 2,
      "name": "Mind Amplification",
      "description": "Techniques for fracturing a single thought into echoing multiples, each fragment carrying the full weight of the original. Increases Psyche Fragments generation by 1.4x.",
      "discovery": "A mind thinking one thought is limited. A mind thinking the same thought a hundred times simultaneously is a hurricane.",
      "cost": { "mana": 800, "psyche_fragments": 160 },
      "duration": 240,
      "requires": ["mind_t1_2", "mind_t1_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "psyche_fragments", "value": 1.4 }]
    },
    {
      "id": "mind_t2_4",
      "discipline": "mind_sculpting",
      "tier": 2,
      "name": "Mind Engine",
      "description": "A self-perpetuating loop of cognition — a thought that thinks itself, generating psyche fragments from pure recursive awareness. Unlocks the Psychic Resonator, a device that generates Psyche Fragments.",
      "discovery": "The engine is a question that answers itself, and each answer poses the question anew, forever.",
      "cost": { "mana": 900, "psyche_fragments": 180 },
      "duration": 270,
      "requires": ["mind_t1_1", "mind_t1_2"],
      "effects": [{ "type": "unlock_generator", "generator": "mind_gen_t2" }]
    },
    {
      "id": "mind_t2_5",
      "discipline": "mind_sculpting",
      "tier": 2,
      "name": "Mind Resonance",
      "description": "Synchronizing one's thought patterns with the ambient psychic field — drawing power from the collective unconscious hum of all thinkers. Increases Psyche Fragments generation by 1.5x.",
      "discovery": "Every conscious being contributes to a vast, silent chorus. You have learned to hear it and draw sustenance from its song.",
      "cost": { "mana": 1000, "psyche_fragments": 200 },
      "duration": 300,
      "requires": ["mind_t1_2", "mind_t1_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "psyche_fragments", "value": 1.5 }]
    },

    
    {
      "id": "mind_t3_1",
      "discipline": "mind_sculpting",
      "tier": 3,
      "name": "Mind Cascade",
      "description": "A psychic avalanche — one sculpted thought triggering a chain of mental detonations across every consciousness in range. Increases Psyche Fragments generation by 1.5x.",
      "discovery": "A single idea, perfectly formed, can leap from mind to mind and grow stronger with each host it claims.",
      "cost": { "mana": 2000, "psyche_fragments": 500 },
      "duration": 600,
      "insightCost": 1,
      "requires": ["mind_t2_1", "mind_t2_2"],
      "effects": [{ "type": "resource_multiplier", "resource": "psyche_fragments", "value": 1.5 }]
    },
    {
      "id": "mind_t3_2",
      "discipline": "mind_sculpting",
      "tier": 3,
      "name": "Mind Mastery",
      "description": "The ability to rewrite the architecture of a consciousness entirely — erasing, implanting, or restructuring memories and desires. Increases Psyche Fragments generation by 1.7x.",
      "discovery": "Identity is merely a story the mind tells itself. You now hold the pen.",
      "cost": { "mana": 3000, "psyche_fragments": 700 },
      "duration": 720,
      "insightCost": 2,
      "requires": ["mind_t2_2", "mind_t2_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "psyche_fragments", "value": 1.7 }]
    },
    {
      "id": "mind_t3_3",
      "discipline": "mind_sculpting",
      "tier": 3,
      "name": "Mind Nexus",
      "description": "Establishing a central node of collective consciousness — a meeting point where dozens of minds merge into a single, vast intellect. Unlocks the Mind Engine, a device that generates Psyche Fragments.",
      "discovery": "In the nexus, the boundary between self and other dissolves. You think with a thousand voices and they all agree.",
      "cost": { "mana": 4000, "psyche_fragments": 800 },
      "duration": 840,
      "insightCost": 2,
      "requires": ["mind_t2_3", "mind_t2_4"],
      "effects": [{ "type": "unlock_generator", "generator": "mind_gen_t3" }]
    },
    {
      "id": "mind_t3_4",
      "discipline": "mind_sculpting",
      "tier": 3,
      "name": "Mind Dominion",
      "description": "Sovereign control over all thought within your reach — no secret survives, no will resists, no dream goes unobserved. Increases Psyche Fragments generation by 2.0x.",
      "discovery": "Within your dominion, every thought is a tributary feeding into the river of your awareness.",
      "cost": { "mana": 5000, "psyche_fragments": 1000 },
      "duration": 900,
      "insightCost": 2,
      "requires": ["mind_t2_4", "mind_t2_5"],
      "effects": [{ "type": "resource_multiplier", "resource": "psyche_fragments", "value": 2.0 }]
    },

    
    {
      "id": "mind_t4_1",
      "discipline": "mind_sculpting",
      "tier": 4,
      "name": "Mind Ascendancy",
      "description": "Transcending individual consciousness — the arcanist's awareness expands until it touches the dreaming substrate beneath all thought. Increases Psyche Fragments generation by 2.5x.",
      "discovery": "Beneath every mind lies the same dark ocean. You have learned to swim in it, and the ocean knows your name.",
      "cost": { "mana": 10000, "psyche_fragments": 2000 },
      "duration": 1200,
      "insightCost": 3,
      "requires": ["mind_t3_1", "mind_t3_2", "mind_t3_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "psyche_fragments", "value": 2.5 }]
    },
    {
      "id": "mind_t4_2",
      "discipline": "mind_sculpting",
      "tier": 4,
      "name": "Mind Apotheosis",
      "description": "Becoming pure thought unmoored from flesh — an idea so potent it sustains its own existence, needing no brain to house it. Increases Psyche Fragments generation by 3.0x.",
      "discovery": "You are no longer a person who thinks. You are a thought that remembers being a person.",
      "cost": { "mana": 20000, "psyche_fragments": 5000 },
      "duration": 1800,
      "insightCost": 4,
      "requires": ["mind_t3_2", "mind_t3_3", "mind_t3_4"],
      "effects": [{ "type": "resource_multiplier", "resource": "psyche_fragments", "value": 3.0 }]
    },

    

    
    {
      "id": "vital_t1_1",
      "discipline": "vital_alchemy",
      "tier": 1,
      "name": "Vital Basics",
      "description": "Learning to sense the pulse of life force in all things — the warm hum in roots, the fading ember in fallen leaves. Unlocks the Verdant Font, a device that steadily gathers Vital Ichor.",
      "discovery": "Life is not a state but a current, and even stone carries a faint, ancient trickle of it.",
      "cost": { "mana": 10 },
      "duration": 30,
      "requires": [],
      "effects": [{ "type": "unlock_generator", "generator": "vital_gen_t1" }]
    },
    {
      "id": "vital_t1_2",
      "discipline": "vital_alchemy",
      "tier": 1,
      "name": "Vital Flow",
      "description": "Tracing the circulatory pathways of life energy — the invisible veins through which ichor moves from the living to the dying. Increases Vital Ichor generation by 1.2x.",
      "discovery": "Life flows downhill, from abundance to absence. The alchemist need only learn to dig the proper channels.",
      "cost": { "mana": 100, "vital_ichor": 25 },
      "duration": 45,
      "requires": ["vital_t1_1"],
      "effects": [{ "type": "resource_multiplier", "resource": "vital_ichor", "value": 1.2 }]
    },
    {
      "id": "vital_t1_3",
      "discipline": "vital_alchemy",
      "tier": 1,
      "name": "Vital Sensitivity",
      "description": "Heightening awareness of biological processes — feeling the slow turn of cells dividing, the quiet labor of growth. Increases Vital Ichor generation by 1.2x.",
      "discovery": "Your own heartbeat becomes a drumbeat marking the rhythm by which all living things conduct their silent work.",
      "cost": { "mana": 200, "vital_ichor": 50 },
      "duration": 60,
      "requires": ["vital_t1_1"],
      "effects": [{ "type": "resource_multiplier", "resource": "vital_ichor", "value": 1.2 }]
    },

    
    {
      "id": "vital_t2_1",
      "discipline": "vital_alchemy",
      "tier": 2,
      "name": "Vital Brew",
      "description": "Distilling raw life force into potent elixirs — each drop thick with the concentrated essence of growth and renewal. Unlocks the Vital Bolt spell.",
      "discovery": "The brew does not grant life. It reminds the body of what living felt like before weariness set in.",
      "cost": { "mana": 500, "vital_ichor": 100 },
      "duration": 120,
      "requires": ["vital_t1_1", "vital_t1_2"],
      "effects": [{ "type": "unlock_spell", "spell": "vital_brew" }]
    },
    {
      "id": "vital_t2_2",
      "discipline": "vital_alchemy",
      "tier": 2,
      "name": "Vital Shield",
      "description": "Weaving a protective membrane of living energy — a barrier that heals itself as fast as it is damaged. Unlocks the Vital Heal spell.",
      "discovery": "The shield grows like skin over a wound. Harm it, and it only becomes thicker, tougher, more alive.",
      "cost": { "mana": 700, "vital_ichor": 140 },
      "duration": 180,
      "requires": ["vital_t1_1", "vital_t1_3"],
      "effects": [{ "type": "unlock_spell", "spell": "vital_shield" }]
    },
    {
      "id": "vital_t2_3",
      "discipline": "vital_alchemy",
      "tier": 2,
      "name": "Vital Amplification",
      "description": "Accelerating the natural processes of growth and regeneration — a seedling becomes a tree in the span of a breath. Increases Vital Ichor generation by 1.4x.",
      "discovery": "Life wants to multiply. You have merely learned to remove the constraints that held it to a cautious pace.",
      "cost": { "mana": 800, "vital_ichor": 160 },
      "duration": 240,
      "requires": ["vital_t1_2", "vital_t1_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "vital_ichor", "value": 1.4 }]
    },
    {
      "id": "vital_t2_4",
      "discipline": "vital_alchemy",
      "tier": 2,
      "name": "Vital Still",
      "description": "An alchemical apparatus that extracts and refines ichor from ambient life force — a furnace fueled by the breath of growing things. Unlocks the Life Well, a device that generates Vital Ichor.",
      "discovery": "The still hums with a warmth that is almost maternal. It does not create life — it midwifes it into purer form.",
      "cost": { "mana": 900, "vital_ichor": 180 },
      "duration": 270,
      "requires": ["vital_t1_1", "vital_t1_2"],
      "effects": [{ "type": "unlock_generator", "generator": "vital_gen_t2" }]
    },
    {
      "id": "vital_t2_5",
      "discipline": "vital_alchemy",
      "tier": 2,
      "name": "Vital Resonance",
      "description": "Harmonizing with the primal pulse that drives all biological systems — the ancient rhythm older than any heartbeat. Increases Vital Ichor generation by 1.5x.",
      "discovery": "There is a frequency at which all living cells vibrate in unison. To match it is to command the chorus of life.",
      "cost": { "mana": 1000, "vital_ichor": 200 },
      "duration": 300,
      "requires": ["vital_t1_2", "vital_t1_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "vital_ichor", "value": 1.5 }]
    },
    {
      "id": "vital_t2_6",
      "discipline": "vital_alchemy",
      "tier": 2,
      "name": "Vital-Shadow Bridge",
      "description": "Exploring the forbidden threshold where life force and entropy meet — the twilight membrane between growth and decay. Increases Vital Ichor generation by 1.3x through synergy with Shadow Binding.",
      "discovery": "Death is not life's opposite but its shadow. Where one falls, the other rises, and between them lies terrible power.",
      "cost": { "mana": 800, "vital_ichor": 150, "umbral_dust": 150 },
      "duration": 240,
      "requires": ["vital_t1_1", "shadow_t1_1"],
      "effects": [{ "type": "resource_multiplier", "resource": "vital_ichor", "value": 1.3 }]
    },
    {
      "id": "vital_t2_7",
      "discipline": "vital_alchemy",
      "tier": 2,
      "name": "Vital-Mind Bridge",
      "description": "Studying the bond between living flesh and waking thought — how the body's ichor nourishes the mind's fire. Increases Vital Ichor generation by 1.3x through synergy with Mind Sculpting.",
      "discovery": "Consciousness is not housed in the brain alone. It blooms wherever vital energy pools with sufficient density.",
      "cost": { "mana": 800, "vital_ichor": 150, "psyche_fragments": 150 },
      "duration": 240,
      "requires": ["vital_t1_1", "mind_t1_1"],
      "effects": [{ "type": "resource_multiplier", "resource": "vital_ichor", "value": 1.3 }]
    },

    
    {
      "id": "vital_t3_1",
      "discipline": "vital_alchemy",
      "tier": 3,
      "name": "Vital Cascade",
      "description": "Triggering a runaway chain of biological transformation — one healed wound spawning waves of regeneration through an entire organism. Increases Vital Ichor generation by 1.5x.",
      "discovery": "Life, once given permission to flourish, does not stop at sufficiency. It surges until every cell sings with excess.",
      "cost": { "mana": 2000, "vital_ichor": 500 },
      "duration": 600,
      "insightCost": 1,
      "requires": ["vital_t2_1", "vital_t2_2"],
      "effects": [{ "type": "resource_multiplier", "resource": "vital_ichor", "value": 1.5 }]
    },
    {
      "id": "vital_t3_2",
      "discipline": "vital_alchemy",
      "tier": 3,
      "name": "Vital Mastery",
      "description": "Complete sovereignty over biological processes — commanding flesh to knit, bones to fuse, and blood to flow at the alchemist's word. Increases Vital Ichor generation by 1.7x.",
      "discovery": "The body is merely a garden. You have become its gardener, and nothing grows or withers without your consent.",
      "cost": { "mana": 3000, "vital_ichor": 700 },
      "duration": 720,
      "insightCost": 2,
      "requires": ["vital_t2_2", "vital_t2_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "vital_ichor", "value": 1.7 }]
    },
    {
      "id": "vital_t3_3",
      "discipline": "vital_alchemy",
      "tier": 3,
      "name": "Vital Nexus",
      "description": "Creating a wellspring of concentrated life energy — a pulsing heart of ichor that sustains an entire ecosystem of alchemical works. Unlocks the Vital Crucible, a device that generates Vital Ichor.",
      "discovery": "The nexus beats with a rhythm older than any creature. It is the first heartbeat, echoing still.",
      "cost": { "mana": 4000, "vital_ichor": 800 },
      "duration": 840,
      "insightCost": 2,
      "requires": ["vital_t2_3", "vital_t2_4"],
      "effects": [{ "type": "unlock_generator", "generator": "vital_gen_t3" }]
    },
    {
      "id": "vital_t3_4",
      "discipline": "vital_alchemy",
      "tier": 3,
      "name": "Vital Dominion",
      "description": "Absolute command over life and growth within your territory — blighting or blessing at will, the land itself an extension of your body. Increases Vital Ichor generation by 2.0x.",
      "discovery": "Every root, every bud, every crawling thing within your reach is a finger on your hand. You feel them all.",
      "cost": { "mana": 5000, "vital_ichor": 1000 },
      "duration": 900,
      "insightCost": 2,
      "requires": ["vital_t2_4", "vital_t2_5"],
      "effects": [{ "type": "resource_multiplier", "resource": "vital_ichor", "value": 2.0 }]
    },

    
    {
      "id": "vital_t4_1",
      "discipline": "vital_alchemy",
      "tier": 4,
      "name": "Vital Ascendancy",
      "description": "Transcending the boundary between organic and inorganic — breathing life into stone, metal, and the very air. Increases Vital Ichor generation by 2.5x.",
      "discovery": "Life was never limited to flesh. It was merely sleeping in all other matter, waiting for someone to whisper it awake.",
      "cost": { "mana": 10000, "vital_ichor": 2000 },
      "duration": 1200,
      "insightCost": 3,
      "requires": ["vital_t3_1", "vital_t3_2", "vital_t3_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "vital_ichor", "value": 2.5 }]
    },
    {
      "id": "vital_t4_2",
      "discipline": "vital_alchemy",
      "tier": 4,
      "name": "Vital Apotheosis",
      "description": "Becoming the wellspring itself — the arcanist's body transmutes into a font of inexhaustible life, a living philosopher's stone. Increases Vital Ichor generation by 3.0x.",
      "discovery": "You do not sustain life. You are life, in its most distilled and undeniable form. To be near you is to heal.",
      "cost": { "mana": 20000, "vital_ichor": 5000 },
      "duration": 1800,
      "insightCost": 4,
      "requires": ["vital_t3_2", "vital_t3_3", "vital_t3_4"],
      "effects": [{ "type": "resource_multiplier", "resource": "vital_ichor", "value": 3.0 }]
    },

    

    
    {
      "id": "shadow_t1_1",
      "discipline": "shadow_binding",
      "tier": 1,
      "name": "Shadow Basics",
      "description": "Learning to perceive the substance within darkness — not the absence of light, but a cold, patient presence with its own will. Unlocks the Shadow Trap, a device that steadily gathers Umbral Dust.",
      "discovery": "Shadows are not cast by objects. They are drawn to them, like moths to a flame in reverse.",
      "cost": { "mana": 10 },
      "duration": 30,
      "requires": [],
      "effects": [{ "type": "unlock_generator", "generator": "shadow_gen_t1" }]
    },
    {
      "id": "shadow_t1_2",
      "discipline": "shadow_binding",
      "tier": 1,
      "name": "Shadow Flow",
      "description": "Observing how umbral dust drifts through the spaces between things — the quiet rivers of entropy that erode all structure. Increases Umbral Dust generation by 1.2x.",
      "discovery": "Darkness flows like water, always seeking the lowest point. And the lowest point is always where something once stood.",
      "cost": { "mana": 100, "umbral_dust": 25 },
      "duration": 45,
      "requires": ["shadow_t1_1"],
      "effects": [{ "type": "resource_multiplier", "resource": "umbral_dust", "value": 1.2 }]
    },
    {
      "id": "shadow_t1_3",
      "discipline": "shadow_binding",
      "tier": 1,
      "name": "Shadow Sensitivity",
      "description": "Training the senses to navigate by absence — feeling the shape of things by the darkness they displace. Increases Umbral Dust generation by 1.2x.",
      "discovery": "Close your eyes and the world does not vanish. It merely reveals its truer, darker face.",
      "cost": { "mana": 200, "umbral_dust": 50 },
      "duration": 60,
      "requires": ["shadow_t1_1"],
      "effects": [{ "type": "resource_multiplier", "resource": "umbral_dust", "value": 1.2 }]
    },

    
    {
      "id": "shadow_t2_1",
      "discipline": "shadow_binding",
      "tier": 2,
      "name": "Shadow Strike",
      "description": "Condensing darkness into a weapon of pure negation — a blade that does not cut flesh but erases it from existence. Unlocks the Shadow Bolt spell.",
      "discovery": "The shadow does not wound. It simply decides that part of you was never there.",
      "cost": { "mana": 500, "umbral_dust": 100 },
      "duration": 120,
      "requires": ["shadow_t1_1", "shadow_t1_2"],
      "effects": [{ "type": "unlock_spell", "spell": "shadow_strike" }]
    },
    {
      "id": "shadow_t2_2",
      "discipline": "shadow_binding",
      "tier": 2,
      "name": "Shadow Shroud",
      "description": "Wrapping oneself in layers of living darkness — a cloak that drinks light and muffles sound, rendering the wearer a void. Unlocks the Shadow Weaken spell.",
      "discovery": "Under the shroud, you do not become invisible. You become a place where nothing is, and eyes slide past nothing.",
      "cost": { "mana": 700, "umbral_dust": 140 },
      "duration": 180,
      "requires": ["shadow_t1_1", "shadow_t1_3"],
      "effects": [{ "type": "unlock_spell", "spell": "shadow_shroud" }]
    },
    {
      "id": "shadow_t2_3",
      "discipline": "shadow_binding",
      "tier": 2,
      "name": "Shadow Amplification",
      "description": "Feeding darkness upon itself — each shadow consumed makes the next one deeper, colder, and more ravenous. Increases Umbral Dust generation by 1.4x.",
      "discovery": "Entropy is self-reinforcing. The more that decays, the faster everything else follows.",
      "cost": { "mana": 800, "umbral_dust": 160 },
      "duration": 240,
      "requires": ["shadow_t1_2", "shadow_t1_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "umbral_dust", "value": 1.4 }]
    },
    {
      "id": "shadow_t2_4",
      "discipline": "shadow_binding",
      "tier": 2,
      "name": "Shadow Engine",
      "description": "A mechanism of bound darkness that harvests umbral dust from the slow decay of the world — fueled by the inevitable. Unlocks the Umbral Vortex, a device that generates Umbral Dust.",
      "discovery": "The engine needs no power source. Everything is already dying; it merely collects what falls.",
      "cost": { "mana": 900, "umbral_dust": 180 },
      "duration": 270,
      "requires": ["shadow_t1_1", "shadow_t1_2"],
      "effects": [{ "type": "unlock_generator", "generator": "shadow_gen_t2" }]
    },
    {
      "id": "shadow_t2_5",
      "discipline": "shadow_binding",
      "tier": 2,
      "name": "Shadow Resonance",
      "description": "Attuning to the deep, subsonic vibration of entropy — the frequency at which all things acknowledge their eventual end. Increases Umbral Dust generation by 1.5x.",
      "discovery": "Every object hums with the note of its own destruction. You have learned to listen, and it is almost beautiful.",
      "cost": { "mana": 1000, "umbral_dust": 200 },
      "duration": 300,
      "requires": ["shadow_t1_2", "shadow_t1_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "umbral_dust", "value": 1.5 }]
    },

    
    {
      "id": "shadow_t3_1",
      "discipline": "shadow_binding",
      "tier": 3,
      "name": "Shadow Cascade",
      "description": "Releasing a wave of unbound entropy that strips light, warmth, and order from everything it touches in an expanding tide. Increases Umbral Dust generation by 1.5x.",
      "discovery": "The cascade does not destroy. It accelerates the truth that all things already know: nothing lasts.",
      "cost": { "mana": 2000, "umbral_dust": 500 },
      "duration": 600,
      "insightCost": 1,
      "requires": ["shadow_t2_1", "shadow_t2_2"],
      "effects": [{ "type": "resource_multiplier", "resource": "umbral_dust", "value": 1.5 }]
    },
    {
      "id": "shadow_t3_2",
      "discipline": "shadow_binding",
      "tier": 3,
      "name": "Shadow Mastery",
      "description": "Complete command over darkness as a physical force — shaping it into constructs, servants, and prisons of absolute cold. Increases Umbral Dust generation by 1.7x.",
      "discovery": "Darkness is not empty. It is full — full of everything that light has forgotten, discarded, or refused to illuminate.",
      "cost": { "mana": 3000, "umbral_dust": 700 },
      "duration": 720,
      "insightCost": 2,
      "requires": ["shadow_t2_2", "shadow_t2_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "umbral_dust", "value": 1.7 }]
    },
    {
      "id": "shadow_t3_3",
      "discipline": "shadow_binding",
      "tier": 3,
      "name": "Shadow Nexus",
      "description": "Opening a gateway to the Umbral Deep — the vast reservoir of darkness that exists beneath all planes of reality. Unlocks the Void Siphon, a device that generates Umbral Dust.",
      "discovery": "The Deep has no bottom. It is where all shadows go when the light returns, and it remembers every one.",
      "cost": { "mana": 4000, "umbral_dust": 800 },
      "duration": 840,
      "insightCost": 2,
      "requires": ["shadow_t2_3", "shadow_t2_4"],
      "effects": [{ "type": "unlock_generator", "generator": "shadow_gen_t3" }]
    },
    {
      "id": "shadow_t3_4",
      "discipline": "shadow_binding",
      "tier": 3,
      "name": "Shadow Dominion",
      "description": "Sovereign rule over a territory of perpetual twilight — where light dims to a memory and warmth becomes a rumor. Increases Umbral Dust generation by 2.0x.",
      "discovery": "In your dominion, candles forget how to burn. The sun's rays arrive exhausted and surrender at the border.",
      "cost": { "mana": 5000, "umbral_dust": 1000 },
      "duration": 900,
      "insightCost": 2,
      "requires": ["shadow_t2_4", "shadow_t2_5"],
      "effects": [{ "type": "resource_multiplier", "resource": "umbral_dust", "value": 2.0 }]
    },

    
    {
      "id": "shadow_t4_1",
      "discipline": "shadow_binding",
      "tier": 4,
      "name": "Shadow Ascendancy",
      "description": "Becoming one with the concept of ending — the arcanist embodies the final page of every story, the last breath of every flame. Increases Umbral Dust generation by 2.5x.",
      "discovery": "You stand at the end of all things, and from that vantage, you see that endings are merely the universe exhaling.",
      "cost": { "mana": 10000, "umbral_dust": 2000 },
      "duration": 1200,
      "insightCost": 3,
      "requires": ["shadow_t3_1", "shadow_t3_2", "shadow_t3_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "umbral_dust", "value": 2.5 }]
    },
    {
      "id": "shadow_t4_2",
      "discipline": "shadow_binding",
      "tier": 4,
      "name": "Shadow Apotheosis",
      "description": "Transcending into the Void Absolute — becoming the darkness that existed before the first light and will remain after the last. Increases Umbral Dust generation by 3.0x.",
      "discovery": "You are what was here before everything, and what will be here after. The darkness does not serve you — you are the darkness, remembering.",
      "cost": { "mana": 20000, "umbral_dust": 5000 },
      "duration": 1800,
      "insightCost": 4,
      "requires": ["shadow_t3_2", "shadow_t3_3", "shadow_t3_4"],
      "effects": [{ "type": "resource_multiplier", "resource": "umbral_dust", "value": 3.0 }]
    },

    

    
    {
      "id": "chaos_t1_1",
      "discipline": "chaos_channeling",
      "tier": 1,
      "name": "Chaos Basics",
      "description": "First contact with the roiling, unformed energy that churns beneath reality's orderly surface — wild, hot, and hungry. Unlocks the Spark Catcher, a device that steadily gathers Flux Sparks.",
      "discovery": "Chaos is not disorder. It is every possible order, all existing at once, screaming to be chosen.",
      "cost": { "mana": 10 },
      "duration": 30,
      "requires": [],
      "effects": [{ "type": "unlock_generator", "generator": "chaos_gen_t1" }]
    },
    {
      "id": "chaos_t1_2",
      "discipline": "chaos_channeling",
      "tier": 1,
      "name": "Chaos Flow",
      "description": "Learning to ride the surging currents of raw potential without being torn apart — like surfing a wave made of lightning. Increases Flux Sparks generation by 1.2x.",
      "discovery": "The flow does not care where it goes. It only cares that it moves, and it will carry you or crush you.",
      "cost": { "mana": 100, "flux_sparks": 25 },
      "duration": 45,
      "requires": ["chaos_t1_1"],
      "effects": [{ "type": "resource_multiplier", "resource": "flux_sparks", "value": 1.2 }]
    },
    {
      "id": "chaos_t1_3",
      "discipline": "chaos_channeling",
      "tier": 1,
      "name": "Chaos Sensitivity",
      "description": "Developing an instinct for the unpredictable — sensing where reality is thinnest and flux sparks crackle closest to the surface. Increases Flux Sparks generation by 1.2x.",
      "discovery": "The world has seams, and through those seams leaks a light that shifts color with every heartbeat.",
      "cost": { "mana": 200, "flux_sparks": 50 },
      "duration": 60,
      "requires": ["chaos_t1_1"],
      "effects": [{ "type": "resource_multiplier", "resource": "flux_sparks", "value": 1.2 }]
    },

    
    {
      "id": "chaos_t2_1",
      "discipline": "chaos_channeling",
      "tier": 2,
      "name": "Chaos Bolt",
      "description": "Hurling a concentrated shard of unformed reality — a bolt that rewrites whatever it strikes into something random and terrible. Unlocks the Chaos Surge spell.",
      "discovery": "The bolt does not damage its target. It simply gives it new possibilities, all of them unfortunate.",
      "cost": { "mana": 500, "flux_sparks": 100 },
      "duration": 120,
      "requires": ["chaos_t1_1", "chaos_t1_2"],
      "effects": [{ "type": "unlock_spell", "spell": "chaos_bolt" }]
    },
    {
      "id": "chaos_t2_2",
      "discipline": "chaos_channeling",
      "tier": 2,
      "name": "Chaos Ward",
      "description": "A shimmering, unstable barrier of probability — attacks that pass through it emerge as something else entirely, usually harmless. Unlocks the Chaos Wildcard spell.",
      "discovery": "The ward does not block. It scrambles. A sword becomes a flower; a spell becomes a song. Chaos protects through confusion.",
      "cost": { "mana": 700, "flux_sparks": 140 },
      "duration": 180,
      "requires": ["chaos_t1_1", "chaos_t1_3"],
      "effects": [{ "type": "unlock_spell", "spell": "chaos_ward" }]
    },
    {
      "id": "chaos_t2_3",
      "discipline": "chaos_channeling",
      "tier": 2,
      "name": "Chaos Amplification",
      "description": "Feeding flux sparks back into themselves, creating a feedback loop of escalating randomness that generates ever more raw potential. Increases Flux Sparks generation by 1.4x.",
      "discovery": "Chaos breeds chaos. One spark becomes two, two become a storm, and the storm dreams of being a wildfire.",
      "cost": { "mana": 800, "flux_sparks": 160 },
      "duration": 240,
      "requires": ["chaos_t1_2", "chaos_t1_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "flux_sparks", "value": 1.4 }]
    },
    {
      "id": "chaos_t2_4",
      "discipline": "chaos_channeling",
      "tier": 2,
      "name": "Chaos Engine",
      "description": "A barely-contained vortex of pure randomness that spins flux sparks from the fraying edges of probability itself. Unlocks the Flux Turbine, a device that generates Flux Sparks.",
      "discovery": "The engine has no design. It assembled itself from accident and runs on the principle that anything can happen.",
      "cost": { "mana": 900, "flux_sparks": 180 },
      "duration": 270,
      "requires": ["chaos_t1_1", "chaos_t1_2"],
      "effects": [{ "type": "unlock_generator", "generator": "chaos_gen_t2" }]
    },
    {
      "id": "chaos_t2_5",
      "discipline": "chaos_channeling",
      "tier": 2,
      "name": "Chaos Resonance",
      "description": "Attuning to the cacophonic harmony of pure chance — finding the pattern in patternlessness, the rhythm in static. Increases Flux Sparks generation by 1.5x.",
      "discovery": "There is a music in randomness, if you listen long enough. It never repeats, but it always resolves.",
      "cost": { "mana": 1000, "flux_sparks": 200 },
      "duration": 300,
      "requires": ["chaos_t1_2", "chaos_t1_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "flux_sparks", "value": 1.5 }]
    },

    
    {
      "id": "chaos_t3_1",
      "discipline": "chaos_channeling",
      "tier": 3,
      "name": "Chaos Cascade",
      "description": "Unleashing a catastrophic chain reaction of improbabilities — each random event triggering three more, reality buckling under the strain. Increases Flux Sparks generation by 1.5x.",
      "discovery": "A single coin flip can topple an empire, if the cascade carries it far enough.",
      "cost": { "mana": 2000, "flux_sparks": 500 },
      "duration": 600,
      "insightCost": 1,
      "requires": ["chaos_t2_1", "chaos_t2_2"],
      "effects": [{ "type": "resource_multiplier", "resource": "flux_sparks", "value": 1.5 }]
    },
    {
      "id": "chaos_t3_2",
      "discipline": "chaos_channeling",
      "tier": 3,
      "name": "Chaos Mastery",
      "description": "The paradoxical discipline of commanding the uncontrollable — bending probability without breaking it, guiding the storm without taming it. Increases Flux Sparks generation by 1.7x.",
      "discovery": "You cannot master chaos. But you can become so attuned to it that chaos mistakes you for one of its own.",
      "cost": { "mana": 3000, "flux_sparks": 700 },
      "duration": 720,
      "insightCost": 2,
      "requires": ["chaos_t2_2", "chaos_t2_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "flux_sparks", "value": 1.7 }]
    },
    {
      "id": "chaos_t3_3",
      "discipline": "chaos_channeling",
      "tier": 3,
      "name": "Chaos Nexus",
      "description": "Tearing open a permanent wound in probability — a screaming rift from which raw, unformed potential pours endlessly into the world. Unlocks the Entropy Core, a device that generates Flux Sparks.",
      "discovery": "The nexus is a mouth that speaks every word simultaneously. To stand near it is to hear every possibility at once.",
      "cost": { "mana": 4000, "flux_sparks": 800 },
      "duration": 840,
      "insightCost": 2,
      "requires": ["chaos_t2_3", "chaos_t2_4"],
      "effects": [{ "type": "unlock_generator", "generator": "chaos_gen_t3" }]
    },
    {
      "id": "chaos_t3_4",
      "discipline": "chaos_channeling",
      "tier": 3,
      "name": "Chaos Dominion",
      "description": "Claiming a territory where the laws of nature are merely suggestions — gravity shifts, elements transmute, and cause precedes effect only sometimes. Increases Flux Sparks generation by 2.0x.",
      "discovery": "In your dominion, the dice are always rolling. Nothing is certain, and that uncertainty is your greatest weapon.",
      "cost": { "mana": 5000, "flux_sparks": 1000 },
      "duration": 900,
      "insightCost": 2,
      "requires": ["chaos_t2_4", "chaos_t2_5"],
      "effects": [{ "type": "resource_multiplier", "resource": "flux_sparks", "value": 2.0 }]
    },

    
    {
      "id": "chaos_t4_1",
      "discipline": "chaos_channeling",
      "tier": 4,
      "name": "Chaos Ascendancy",
      "description": "Merging with the primordial entropy that existed before the universe chose its shape — touching the infinite potential of the unborn cosmos. Increases Flux Sparks generation by 2.5x.",
      "discovery": "Before creation, there was only chaos. And chaos was not empty — it was everything, waiting to happen.",
      "cost": { "mana": 10000, "flux_sparks": 2000 },
      "duration": 1200,
      "insightCost": 3,
      "requires": ["chaos_t3_1", "chaos_t3_2", "chaos_t3_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "flux_sparks", "value": 2.5 }]
    },
    {
      "id": "chaos_t4_2",
      "discipline": "chaos_channeling",
      "tier": 4,
      "name": "Chaos Apotheosis",
      "description": "Becoming the living embodiment of pure possibility — a being of infinite potential who exists in every state simultaneously until observed. Increases Flux Sparks generation by 3.0x.",
      "discovery": "You are the question the universe asks itself. Every answer is true, every outcome is yours, and nothing is decided until you choose.",
      "cost": { "mana": 20000, "flux_sparks": 5000 },
      "duration": 1800,
      "insightCost": 4,
      "requires": ["chaos_t3_2", "chaos_t3_3", "chaos_t3_4"],
      "effects": [{ "type": "resource_multiplier", "resource": "flux_sparks", "value": 3.0 }]
    },

    

    
    {
      "id": "order_t1_1",
      "discipline": "order_forging",
      "tier": 1,
      "name": "Order Basics",
      "description": "The first exercises in perceiving the crystalline lattice of natural law — the invisible scaffolding upon which reality is built. Unlocks the Axiom Mill, a device that steadily gathers Axiom Crystals.",
      "discovery": "Beneath the apparent chaos of the world lies a grid of perfect, silent logic. You have glimpsed its first lines.",
      "cost": { "mana": 10 },
      "duration": 30,
      "requires": [],
      "effects": [{ "type": "unlock_generator", "generator": "order_gen_t1" }]
    },
    {
      "id": "order_t1_2",
      "discipline": "order_forging",
      "tier": 1,
      "name": "Order Flow",
      "description": "Studying how axiom crystals propagate through systems — the way one enforced rule cascades into a thousand consequences. Increases Axiom Crystals generation by 1.2x.",
      "discovery": "Order does not need to be imposed everywhere. Set one law firmly enough, and the rest of reality will comply.",
      "cost": { "mana": 100, "axiom_crystals": 25 },
      "duration": 45,
      "requires": ["order_t1_1"],
      "effects": [{ "type": "resource_multiplier", "resource": "axiom_crystals", "value": 1.2 }]
    },
    {
      "id": "order_t1_3",
      "discipline": "order_forging",
      "tier": 1,
      "name": "Order Sensitivity",
      "description": "Developing a keen awareness of imperfection — sensing where natural law has been violated, bent, or allowed to fray. Increases Axiom Crystals generation by 1.2x.",
      "discovery": "Disorder is not invisible. It grates against the senses like a wrong note in a familiar melody.",
      "cost": { "mana": 200, "axiom_crystals": 50 },
      "duration": 60,
      "requires": ["order_t1_1"],
      "effects": [{ "type": "resource_multiplier", "resource": "axiom_crystals", "value": 1.2 }]
    },

    
    {
      "id": "order_t2_1",
      "discipline": "order_forging",
      "tier": 2,
      "name": "Order Smite",
      "description": "Striking with the weight of absolute law — a blow that enforces a single, devastating axiom: that the target must break. Unlocks the Order Smite spell.",
      "discovery": "When law itself decrees destruction, no shield holds. The smite is not violence — it is inevitability.",
      "cost": { "mana": 500, "axiom_crystals": 100 },
      "duration": 120,
      "requires": ["order_t1_1", "order_t1_2"],
      "effects": [{ "type": "unlock_spell", "spell": "order_smite" }]
    },
    {
      "id": "order_t2_2",
      "discipline": "order_forging",
      "tier": 2,
      "name": "Order Bastion",
      "description": "Erecting a fortress of codified reality — within its walls, only permitted actions can occur, and all others simply fail. Unlocks the Order Ward spell.",
      "discovery": "The bastion does not resist attacks. It defines a local reality where the concept of attack does not exist.",
      "cost": { "mana": 700, "axiom_crystals": 140 },
      "duration": 180,
      "requires": ["order_t1_1", "order_t1_3"],
      "effects": [{ "type": "unlock_spell", "spell": "order_bastion" }]
    },
    {
      "id": "order_t2_3",
      "discipline": "order_forging",
      "tier": 2,
      "name": "Order Amplification",
      "description": "Compounding the generative power of axiom crystals through precise geometric arrangements — each crystal reinforcing the next. Increases Axiom Crystals generation by 1.4x.",
      "discovery": "One crystal is a rule. Two crystals aligned are a system. Three are the foundation of an unbreakable world.",
      "cost": { "mana": 800, "axiom_crystals": 160 },
      "duration": 240,
      "requires": ["order_t1_2", "order_t1_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "axiom_crystals", "value": 1.4 }]
    },
    {
      "id": "order_t2_4",
      "discipline": "order_forging",
      "tier": 2,
      "name": "Order Forge",
      "description": "A crucible where raw mana is hammered into perfect axiom crystals — structure imposed upon formless energy through sheer precision. Unlocks the Law Forge, a device that generates Axiom Crystals.",
      "discovery": "The forge burns with a cold, white flame. What enters as chaos emerges as law, faceted and absolute.",
      "cost": { "mana": 900, "axiom_crystals": 180 },
      "duration": 270,
      "requires": ["order_t1_1", "order_t1_2"],
      "effects": [{ "type": "unlock_generator", "generator": "order_gen_t2" }]
    },
    {
      "id": "order_t2_5",
      "discipline": "order_forging",
      "tier": 2,
      "name": "Order Resonance",
      "description": "Attuning to the deep harmonic of universal law — the frequency at which axioms vibrate and reinforce one another. Increases Axiom Crystals generation by 1.5x.",
      "discovery": "The laws of reality hum in concert, each one a string in an instrument of cosmic precision. You have found the tuning fork.",
      "cost": { "mana": 1000, "axiom_crystals": 200 },
      "duration": 300,
      "requires": ["order_t1_2", "order_t1_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "axiom_crystals", "value": 1.5 }]
    },

    
    {
      "id": "order_t3_1",
      "discipline": "order_forging",
      "tier": 3,
      "name": "Order Cascade",
      "description": "Propagating a single axiom through an entire system — one enforced law rewriting everything it touches into perfect compliance. Increases Axiom Crystals generation by 1.5x.",
      "discovery": "A single truth, spoken with enough authority, can reorganize the world. The cascade is that truth, echoing.",
      "cost": { "mana": 2000, "axiom_crystals": 500 },
      "duration": 600,
      "insightCost": 1,
      "requires": ["order_t2_1", "order_t2_2"],
      "effects": [{ "type": "resource_multiplier", "resource": "axiom_crystals", "value": 1.5 }]
    },
    {
      "id": "order_t3_2",
      "discipline": "order_forging",
      "tier": 3,
      "name": "Order Mastery",
      "description": "The ability to define, rewrite, and revoke natural laws — declaring new physics as easily as amending a contract. Increases Axiom Crystals generation by 1.7x.",
      "discovery": "Reality is not fixed. It is a set of agreements, and you have learned to renegotiate the terms.",
      "cost": { "mana": 3000, "axiom_crystals": 700 },
      "duration": 720,
      "insightCost": 2,
      "requires": ["order_t2_2", "order_t2_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "axiom_crystals", "value": 1.7 }]
    },
    {
      "id": "order_t3_3",
      "discipline": "order_forging",
      "tier": 3,
      "name": "Order Nexus",
      "description": "Constructing a node of absolute crystalline perfection — a point from which the arcanist's laws radiate outward like light from a star. Unlocks the Order Matrix, a device that generates Axiom Crystals.",
      "discovery": "The nexus is flawless. To gaze upon it is to understand what the universe would look like if nothing had ever gone wrong.",
      "cost": { "mana": 4000, "axiom_crystals": 800 },
      "duration": 840,
      "insightCost": 2,
      "requires": ["order_t2_3", "order_t2_4"],
      "effects": [{ "type": "unlock_generator", "generator": "order_gen_t3" }]
    },
    {
      "id": "order_t3_4",
      "discipline": "order_forging",
      "tier": 3,
      "name": "Order Dominion",
      "description": "Establishing a territory of perfect law — within its boundaries, only what the arcanist permits can exist, and all else is annulled. Increases Axiom Crystals generation by 2.0x.",
      "discovery": "Your dominion is a theorem made real. Within it, contradiction is impossible and every effect has exactly one permitted cause.",
      "cost": { "mana": 5000, "axiom_crystals": 1000 },
      "duration": 900,
      "insightCost": 2,
      "requires": ["order_t2_4", "order_t2_5"],
      "effects": [{ "type": "resource_multiplier", "resource": "axiom_crystals", "value": 2.0 }]
    },

    
    {
      "id": "order_t4_1",
      "discipline": "order_forging",
      "tier": 4,
      "name": "Order Ascendancy",
      "description": "Perceiving the Axiom Absolute — the single, foundational law from which all other laws descend, the first rule that made existence possible. Increases Axiom Crystals generation by 2.5x.",
      "discovery": "There is one law older than all others, and it says simply: something, rather than nothing. All else follows from that decree.",
      "cost": { "mana": 10000, "axiom_crystals": 2000 },
      "duration": 1200,
      "insightCost": 3,
      "requires": ["order_t3_1", "order_t3_2", "order_t3_3"],
      "effects": [{ "type": "resource_multiplier", "resource": "axiom_crystals", "value": 2.5 }]
    },
    {
      "id": "order_t4_2",
      "discipline": "order_forging",
      "tier": 4,
      "name": "Order Apotheosis",
      "description": "Becoming a living axiom — the arcanist's very existence is a law of nature, as fundamental and undeniable as gravity itself. Increases Axiom Crystals generation by 3.0x.",
      "discovery": "You are no longer bound by the laws of reality. You are one of them, and the universe obeys you as it obeys itself.",
      "cost": { "mana": 20000, "axiom_crystals": 5000 },
      "duration": 1800,
      "insightCost": 4,
      "requires": ["order_t3_2", "order_t3_3", "order_t3_4"],
      "effects": [{ "type": "resource_multiplier", "resource": "axiom_crystals", "value": 3.0 }]
    },

    

    {
      "id": "continuum_1",
      "discipline": "synergy_continuum",
      "tier": 2,
      "name": "Continuum Node 1",
      "description": "A tentative fusion of temporal and spatial principles — learning that time and space are merely two faces of the same underlying fabric. Increases Chronos Essence and Aether Threads generation by 1.3x.",
      "discovery": "When you fold space, time wrinkles with it. The two cannot be separated without tearing both.",
      "cost": { "mana": 800, "chronos_essence": 150, "aether_threads": 150 },
      "duration": 240,
      "requires": ["temporal_t2_1", "spatial_t2_1"],
      "hidden": true,
      "synergy_pair": ["temporal_arcana", "spatial_weaving"],
      "effects": [
        { "type": "resource_multiplier", "resource": "chronos_essence", "value": 1.3 },
        { "type": "resource_multiplier", "resource": "aether_threads", "value": 1.3 }
      ]
    },
    {
      "id": "continuum_2",
      "discipline": "synergy_continuum",
      "tier": 3,
      "name": "Continuum Node 2",
      "description": "Weaving chronal threads through spatial lattices to create self-sustaining loops of spacetime — pockets where distance and duration are interchangeable. Increases Chronos Essence and Aether Threads generation by 1.6x.",
      "discovery": "A mile can be traded for a minute, and vice versa. In the continuum, the exchange rate is always favorable.",
      "cost": { "mana": 3000, "chronos_essence": 500, "aether_threads": 500 },
      "duration": 720,
      "insightCost": 2,
      "requires": ["continuum_1", "temporal_t3_1", "spatial_t3_1"],
      "hidden": true,
      "synergy_pair": ["temporal_arcana", "spatial_weaving"],
      "effects": [
        { "type": "resource_multiplier", "resource": "chronos_essence", "value": 1.6 },
        { "type": "resource_multiplier", "resource": "aether_threads", "value": 1.6 }
      ]
    },
    {
      "id": "continuum_3",
      "discipline": "synergy_continuum",
      "tier": 4,
      "name": "Continuum Node 3",
      "description": "Mastery of the unified spacetime continuum — the arcanist perceives all locations across all moments as a single, navigable manifold. Increases Chronos Essence and Aether Threads generation by 2.5x.",
      "discovery": "There is no 'here' or 'now.' There is only the continuum, and you stand at its center, which is everywhere and always.",
      "cost": { "mana": 10000, "chronos_essence": 2000, "aether_threads": 2000 },
      "duration": 1500,
      "insightCost": 5,
      "requires": ["continuum_2"],
      "hidden": true,
      "synergy_pair": ["temporal_arcana", "spatial_weaving"],
      "effects": [
        { "type": "resource_multiplier", "resource": "chronos_essence", "value": 2.5 },
        { "type": "resource_multiplier", "resource": "aether_threads", "value": 2.5 }
      ]
    },

    

    {
      "id": "cycle_1",
      "discipline": "synergy_cycle",
      "tier": 2,
      "name": "Cycle Node 1",
      "description": "First glimpses of the eternal cycle — understanding that life and death are not endpoints but phases in an endless wheel of transformation. Increases Vital Ichor and Umbral Dust generation by 1.3x.",
      "discovery": "What dies feeds what grows. What grows will one day die. The cycle is not cruel — it is patient.",
      "cost": { "mana": 800, "vital_ichor": 150, "umbral_dust": 150 },
      "duration": 240,
      "requires": ["vital_t2_1", "shadow_t2_1"],
      "hidden": true,
      "synergy_pair": ["vital_alchemy", "shadow_binding"],
      "effects": [
        { "type": "resource_multiplier", "resource": "vital_ichor", "value": 1.3 },
        { "type": "resource_multiplier", "resource": "umbral_dust", "value": 1.3 }
      ]
    },
    {
      "id": "cycle_2",
      "discipline": "synergy_cycle",
      "tier": 3,
      "name": "Cycle Node 2",
      "description": "Harnessing the momentum of the life-death cycle — drawing immense power from the turning point where ichor transmutes into dust and back again. Increases Vital Ichor and Umbral Dust generation by 1.6x.",
      "discovery": "The moment of transformation — the instant between alive and dead — contains more energy than either state alone.",
      "cost": { "mana": 3000, "vital_ichor": 500, "umbral_dust": 500 },
      "duration": 720,
      "insightCost": 2,
      "requires": ["cycle_1", "vital_t3_1", "shadow_t3_1"],
      "hidden": true,
      "synergy_pair": ["vital_alchemy", "shadow_binding"],
      "effects": [
        { "type": "resource_multiplier", "resource": "vital_ichor", "value": 1.6 },
        { "type": "resource_multiplier", "resource": "umbral_dust", "value": 1.6 }
      ]
    },
    {
      "id": "cycle_3",
      "discipline": "synergy_cycle",
      "tier": 4,
      "name": "Cycle Node 3",
      "description": "Becoming the axis around which life and death revolve — the still point at the center of the eternal wheel, commanding both growth and dissolution. Increases Vital Ichor and Umbral Dust generation by 2.5x.",
      "discovery": "You are the threshold itself. Life and death pass through you as through a door, and you decide which way it swings.",
      "cost": { "mana": 10000, "vital_ichor": 2000, "umbral_dust": 2000 },
      "duration": 1500,
      "insightCost": 5,
      "requires": ["cycle_2"],
      "hidden": true,
      "synergy_pair": ["vital_alchemy", "shadow_binding"],
      "effects": [
        { "type": "resource_multiplier", "resource": "vital_ichor", "value": 2.5 },
        { "type": "resource_multiplier", "resource": "umbral_dust", "value": 2.5 }
      ]
    },

    

    {
      "id": "balance_1",
      "discipline": "synergy_balance",
      "tier": 2,
      "name": "Balance Node 1",
      "description": "Discovering the razor's edge where chaos and order meet — the fertile border where raw potential crystallizes into structure. Increases Flux Sparks and Axiom Crystals generation by 1.3x.",
      "discovery": "Chaos without order is a storm that builds nothing. Order without chaos is a prison that changes nothing. Together, they create.",
      "cost": { "mana": 800, "flux_sparks": 150, "axiom_crystals": 150 },
      "duration": 240,
      "requires": ["chaos_t2_1", "order_t2_1"],
      "hidden": true,
      "synergy_pair": ["chaos_channeling", "order_forging"],
      "effects": [
        { "type": "resource_multiplier", "resource": "flux_sparks", "value": 1.3 },
        { "type": "resource_multiplier", "resource": "axiom_crystals", "value": 1.3 }
      ]
    },
    {
      "id": "balance_2",
      "discipline": "synergy_balance",
      "tier": 3,
      "name": "Balance Node 2",
      "description": "Wielding chaos and order as twin instruments — shattering with one hand and rebuilding with the other in a single fluid motion. Increases Flux Sparks and Axiom Crystals generation by 1.6x.",
      "discovery": "The universe was forged in exactly this way: an explosion of chaos, immediately shaped by the first emerging laws.",
      "cost": { "mana": 3000, "flux_sparks": 500, "axiom_crystals": 500 },
      "duration": 720,
      "insightCost": 2,
      "requires": ["balance_1", "chaos_t3_1", "order_t3_1"],
      "hidden": true,
      "synergy_pair": ["chaos_channeling", "order_forging"],
      "effects": [
        { "type": "resource_multiplier", "resource": "flux_sparks", "value": 1.6 },
        { "type": "resource_multiplier", "resource": "axiom_crystals", "value": 1.6 }
      ]
    },
    {
      "id": "balance_3",
      "discipline": "synergy_balance",
      "tier": 4,
      "name": "Balance Node 3",
      "description": "Embodying the primordial equilibrium — the arcanist becomes the fulcrum between creation and destruction, the point where all forces cancel and all things begin. Increases Flux Sparks and Axiom Crystals generation by 2.5x.",
      "discovery": "You are the silence between thunder and echo, the stillness between heartbeats. From perfect balance, infinite power flows.",
      "cost": { "mana": 10000, "flux_sparks": 2000, "axiom_crystals": 2000 },
      "duration": 1500,
      "insightCost": 5,
      "requires": ["balance_2"],
      "hidden": true,
      "synergy_pair": ["chaos_channeling", "order_forging"],
      "effects": [
        { "type": "resource_multiplier", "resource": "flux_sparks", "value": 2.5 },
        { "type": "resource_multiplier", "resource": "axiom_crystals", "value": 2.5 }
      ]
    },

    

    {
      "id": "awakening_1",
      "discipline": "synergy_awakening",
      "tier": 2,
      "name": "Awakening Node 1",
      "description": "Exploring the bridge between living flesh and conscious thought — how the body's vitality kindles the mind's spark and vice versa. Increases Psyche Fragments and Vital Ichor generation by 1.3x.",
      "discovery": "The mind does not merely inhabit the body. It grows from it, like a flower from soil, and each nourishes the other.",
      "cost": { "mana": 800, "psyche_fragments": 150, "vital_ichor": 150 },
      "duration": 240,
      "requires": ["mind_t2_1", "vital_t2_1"],
      "hidden": true,
      "synergy_pair": ["mind_sculpting", "vital_alchemy"],
      "effects": [
        { "type": "resource_multiplier", "resource": "psyche_fragments", "value": 1.3 },
        { "type": "resource_multiplier", "resource": "vital_ichor", "value": 1.3 }
      ]
    },
    {
      "id": "awakening_2",
      "discipline": "synergy_awakening",
      "tier": 3,
      "name": "Awakening Node 2",
      "description": "Fusing psychic architecture with biological processes — creating living thoughts and thinking flesh, blurring the line between mind and body. Increases Psyche Fragments and Vital Ichor generation by 1.6x.",
      "discovery": "A thought can heal a wound. A wound can birth a revelation. The awakened arcanist knows these are the same event.",
      "cost": { "mana": 3000, "psyche_fragments": 500, "vital_ichor": 500 },
      "duration": 720,
      "insightCost": 2,
      "requires": ["awakening_1", "mind_t3_1", "vital_t3_1"],
      "hidden": true,
      "synergy_pair": ["mind_sculpting", "vital_alchemy"],
      "effects": [
        { "type": "resource_multiplier", "resource": "psyche_fragments", "value": 1.6 },
        { "type": "resource_multiplier", "resource": "vital_ichor", "value": 1.6 }
      ]
    },
    {
      "id": "awakening_3",
      "discipline": "synergy_awakening",
      "tier": 4,
      "name": "Awakening Node 3",
      "description": "Achieving the true Awakening — consciousness and life force merge into a single, transcendent substance that is both thought and flesh, dream and breath. Increases Psyche Fragments and Vital Ichor generation by 2.5x.",
      "discovery": "You have awakened to what the ancients always knew: mind and body are one word, spoken in two languages. Now you speak both.",
      "cost": { "mana": 10000, "psyche_fragments": 2000, "vital_ichor": 2000 },
      "duration": 1500,
      "insightCost": 5,
      "requires": ["awakening_2"],
      "hidden": true,
      "synergy_pair": ["mind_sculpting", "vital_alchemy"],
      "effects": [
        { "type": "resource_multiplier", "resource": "psyche_fragments", "value": 2.5 },
        { "type": "resource_multiplier", "resource": "vital_ichor", "value": 2.5 }
      ]
    }

  ]
}
;

var itemsData =
{
  "materials": [
    { "id": "tallow", "tier": 1, "name": "Tallow", "color": "#f5e6a3", "iLvlRange": [1, 5], "gate": null },
    { "id": "copperscript", "tier": 2, "name": "Copperscript", "color": "#c87533", "iLvlRange": [6, 10], "gate": "any_t1" },
    { "id": "grimsteel", "tier": 3, "name": "Grimsteel", "color": "#5a5a6e", "iLvlRange": [11, 15], "gate": "any_t2" },
    { "id": "voidglass", "tier": 4, "name": "Voidglass", "color": "#7b2d8b", "iLvlRange": [16, 20], "gate": "any_t3" },
    { "id": "astralweave", "tier": 5, "name": "Astralweave", "color": "#a8d8ea", "iLvlRange": [21, 25], "gate": "any_t4" },
    { "id": "convergence", "tier": 6, "name": "Convergence", "color": "#d4a017", "iLvlRange": [26, 30], "gate": "post_convergence" }
  ],
  "slots": {
    "head": { "name": "Head", "baseTypes": ["circlet", "hood", "crown", "mask"] },
    "amulet": { "name": "Amulet", "baseTypes": ["pendant", "talisman", "choker"] },
    "weapon": { "name": "Weapon", "baseTypes": ["staff", "wand", "tome", "orb"] },
    "body": { "name": "Body", "baseTypes": ["robe", "vestment", "mantle"] },
    "hands": { "name": "Hands", "baseTypes": ["gloves", "wraps", "bracers"] },
    "feet": { "name": "Feet", "baseTypes": ["boots", "sandals", "greaves"] },
    "ring1": { "name": "Ring", "baseTypes": ["band", "signet", "loop", "seal"] },
    "ring2": { "name": "Ring", "baseTypes": ["band", "signet", "loop", "seal"] }
  },
  "baseTypes": {
    "staff": { "slot": "weapon", "name": "Staff", "weights": { "arcane_power": 5, "spell_crit_damage": 3, "spell_crit_chance": 1, "instability": 1, "mana_efficiency": 1 }, "icon": null },
    "wand": { "slot": "weapon", "name": "Wand", "weights": { "spell_crit_chance": 5, "speed": 3, "arcane_power": 1, "mana_efficiency": 1 }, "icon": null },
    "tome": { "slot": "weapon", "name": "Tome", "weights": { "mana_efficiency": 5, "cdr": 3, "arcane_power": 1, "spell_crit_chance": 1 }, "icon": null },
    "orb": { "slot": "weapon", "name": "Orb", "weights": { "instability": 5, "arcane_power": 3, "spell_crit_damage": 1, "spell_crit_chance": 1 }, "icon": null },
    "circlet": { "slot": "head", "name": "Circlet", "weights": { "arcane_power": 5, "spell_crit_chance": 3, "mana_efficiency": 1 }, "icon": null },
    "hood": { "slot": "head", "name": "Hood", "weights": { "evasion": 5, "speed": 3, "resilience": 1 }, "icon": null },
    "crown": { "slot": "head", "name": "Crown", "weights": { "max_hp": 5, "cdr": 3, "resilience": 1 }, "icon": null },
    "mask": { "slot": "head", "name": "Mask", "weights": { "instability": 5, "mana_efficiency": 3, "arcane_power": 1 }, "icon": null },
    "robe": { "slot": "body", "name": "Robe", "weights": { "mana_efficiency": 5, "max_hp": 3, "resilience": 1 }, "icon": null },
    "vestment": { "slot": "body", "name": "Vestment", "weights": { "resilience": 5, "hp_regen": 3, "max_hp": 1 }, "icon": null },
    "mantle": { "slot": "body", "name": "Mantle", "weights": { "arcane_power": 5, "spell_crit_damage": 3, "resilience": 1 }, "icon": null },
    "gloves": { "slot": "hands", "name": "Gloves", "weights": { "speed": 5, "spell_crit_chance": 3, "evasion": 1 }, "icon": null },
    "wraps": { "slot": "hands", "name": "Wraps", "weights": { "resilience": 5, "hp_regen": 3, "max_hp": 1 }, "icon": null },
    "bracers": { "slot": "hands", "name": "Bracers", "weights": { "cdr": 5, "arcane_power": 3, "speed": 1 }, "icon": null },
    "boots": { "slot": "feet", "name": "Boots", "weights": { "speed": 5, "evasion": 3, "resilience": 1 }, "icon": null },
    "sandals": { "slot": "feet", "name": "Sandals", "weights": { "mana_efficiency": 5, "resource_rate": 3, "speed": 1 }, "icon": null },
    "greaves": { "slot": "feet", "name": "Greaves", "weights": { "resilience": 5, "max_hp": 3, "evasion": 1 }, "icon": null },
    "pendant": { "slot": "amulet", "name": "Pendant", "weights": { "resource_rate": 5, "mana_efficiency": 3, "loot_bonus": 1 }, "icon": null },
    "talisman": { "slot": "amulet", "name": "Talisman", "weights": { "max_hp": 5, "hp_regen": 3, "resilience": 1 }, "icon": null },
    "choker": { "slot": "amulet", "name": "Choker", "weights": { "spell_crit_chance": 5, "spell_crit_damage": 3, "arcane_power": 1 }, "icon": null },
    "band": { "slot": "ring", "name": "Band", "weights": { "arcane_power": 2, "resilience": 2, "speed": 2, "max_hp": 2, "spell_crit_chance": 2 }, "icon": null },
    "signet": { "slot": "ring", "name": "Signet", "weights": { "resource_rate": 5, "loot_bonus": 3, "mana_efficiency": 1 }, "icon": null },
    "loop": { "slot": "ring", "name": "Loop", "weights": { "evasion": 5, "speed": 3, "cdr": 1 }, "icon": null },
    "seal": { "slot": "ring", "name": "Seal", "weights": { "arcane_power": 5, "spell_crit_damage": 3, "spell_crit_chance": 1 }, "icon": null }
  },
  "affixes": [
    { "id": "arcane_power", "name": "Arcane Power", "type": "flat", "tiers": { "1": [1,3], "2": [4,8], "3": [9,15], "4": [16,24], "5": [25,38], "6": [39,55] } },
    { "id": "spell_crit_chance", "name": "Spell Crit Chance", "type": "percent", "tiers": { "1": [0.5,1.5], "2": [2,3.5], "3": [4,6], "4": [6.5,9], "5": [9.5,13], "6": [13.5,18] } },
    { "id": "spell_crit_damage", "name": "Spell Crit Damage", "type": "multiplier", "tiers": { "1": [0.02,0.05], "2": [0.06,0.12], "3": [0.13,0.2], "4": [0.21,0.3], "5": [0.31,0.42], "6": [0.43,0.6] } },
    { "id": "resilience", "name": "Resilience", "type": "flat", "tiers": { "1": [1,3], "2": [4,7], "3": [8,13], "4": [14,21], "5": [22,33], "6": [34,48] } },
    { "id": "max_hp", "name": "Max HP", "type": "flat", "tiers": { "1": [5,12], "2": [13,28], "3": [29,50], "4": [51,80], "5": [81,120], "6": [121,175] } },
    { "id": "hp_regen", "name": "HP Regen", "type": "flat", "tiers": { "1": [1,2], "2": [3,4], "3": [5,7], "4": [8,11], "5": [12,16], "6": [17,23] } },
    { "id": "speed", "name": "Speed", "type": "percent", "tiers": { "1": [0.5,1.5], "2": [2,3], "3": [3.5,5], "4": [5.5,7.5], "5": [8,10.5], "6": [11,14] } },
    { "id": "cdr", "name": "Cooldown Reduction", "type": "flat", "tiers": { "1": [0.5,0.5], "2": [0.5,1], "3": [1,1], "4": [1,1.5], "5": [1.5,2], "6": [2,2.5] } },
    { "id": "instability", "name": "Instability", "type": "flat", "tiers": { "1": [0.01,0.03], "2": [0.04,0.07], "3": [0.08,0.12], "4": [0.13,0.18], "5": [0.19,0.25], "6": [0.26,0.35] } },
    { "id": "evasion", "name": "Evasion", "type": "percent", "tiers": { "1": [0.5,1.5], "2": [2,3.5], "3": [4,5.5], "4": [6,8], "5": [8.5,11], "6": [11.5,15] } },
    { "id": "mana_efficiency", "name": "Mana Efficiency", "type": "percent", "tiers": { "1": [1,3], "2": [4,7], "3": [8,12], "4": [13,18], "5": [19,26], "6": [27,35] } },
    { "id": "resource_rate", "name": "Resource Rate", "type": "percent", "tiers": { "1": [1,2], "2": [3,5], "3": [6,9], "4": [10,14], "5": [15,21], "6": [22,30] } },
    { "id": "loot_bonus", "name": "Loot Bonus", "type": "percent", "tiers": { "1": [2,5], "2": [6,10], "3": [11,17], "4": [18,26], "5": [27,38], "6": [39,55] } }
  ],
  "rarities": [
    { "id": "common", "name": "Common", "color": "#cccccc", "affixCount": 1, "dropWeight": 45, "dustYield": [1,2] },
    { "id": "uncommon", "name": "Uncommon", "color": "#4dbd4d", "affixCount": 2, "dropWeight": 28, "dustYield": [3,5] },
    { "id": "rare", "name": "Rare", "color": "#4d8bbd", "affixCount": 3, "dropWeight": 16, "dustYield": [8,12] },
    { "id": "epic", "name": "Epic", "color": "#a64dbd", "affixCount": 4, "dropWeight": 7, "dustYield": [18,25] },
    { "id": "legendary", "name": "Legendary", "color": "#d4881e", "affixCount": [3,4], "dropWeight": 3, "dustYield": [40,55] },
    { "id": "set", "name": "Set", "color": "#d4a017", "affixCount": [2,3], "dropWeight": 1, "dustYield": [50,65] }
  ],
  "salvageRecipes": {
    "reroll_affixes": { "dustPerTier": 15, "description": "Reroll all random affixes" },
    "upgrade_rarity": { "dustPerTier": 30, "description": "Upgrade rarity by one tier (max Epic)", "maxRarity": "epic" },
    "reforge_base": { "dustPerTier": 20, "description": "Change base type within same slot, rerolls affixes" },
    "craft_base": { "dustPerTier": 10, "description": "Create a Common item of chosen slot + base + material" },
    "enchant_one": { "dustPerTier": 10, "description": "Reroll a single chosen affix" },
    "lock_affix": { "dustPerTier": 25, "description": "Lock one affix from rerolls (max 1 per item)", "maxLocks": 1 }
  },
  "dropSources": {
    "combat": { "baseChance": 0.35, "bossChance": 1.0, "bossLegendaryBonus": 0.10 },
    "event": { "baseChance": 0.15 },
    "convergence": { "count": 1, "minRarity": "rare" }
  },
  "pity": { "doubleAt": 30, "tripleAt": 50, "guaranteeAt": 75 },
  "flavorText": [
    "It hums when you're not looking.",
    "The previous owner didn't die wearing this. Probably.",
    "Smells of ozone and regret.",
    "The enchantment is slightly crooked. Adds character.",
    "Found wedged between two pages of a grimoire that doesn't exist.",
    "It's warm. It shouldn't be warm.",
    "The runes spell out a name you almost remember.",
    "Technically this violates three laws of thaumaturgy.",
    "One of the runes is upside down. Nobody has noticed.",
    "Radiates faint disappointment when unequipped.",
    "The previous enchanter left a note: 'Good luck.'",
    "Glows faintly in the presence of cheese. No one knows why.",
    "Was once used to prop open a very important door.",
    "The binding spell has a slight accent.",
    "Contains exactly one imprisoned thought.",
    "Older than the Study itself, if such a thing is possible.",
    "The craftsmanship is exquisite. The smell, less so.",
    "Whispers the names of its former owners at midnight.",
    "There's a scratch on it shaped like a question mark.",
    "The warranty expired three centuries ago.",
    "Slightly warm to the touch. Getting warmer.",
    "The enchantment occasionally hiccups.",
    "Was definitely not stolen from a museum.",
    "Hums a tune you almost recognize.",
    "The runes rearrange themselves when you blink.",
    "Emits a sound only cats can hear.",
    "There are tiny teeth marks on the clasp.",
    "The magic feels... opinionated.",
    "Someone carved 'MINE' on the inside.",
    "It arrived in your inventory before you found it."
  ],
  "legendaries": [
    { "id": "wick_eternal_burning", "name": "Wick of Eternal Burning", "slot": "head", "material": "grimsteel", "iLvl": 15, "affixCount": [3,4], "uniqueEffect": { "id": "mana_refund_on_kill", "description": "Spells that kill an enemy refund 50% of their mana cost (max 100 mana)", "type": "on_kill", "value": 0.5, "cap": 100 }, "flavorText": "The wick never shortens. The flame never dims. Someone paid dearly for that.", "icon": null, "vfx": null },
    { "id": "the_unblinking_eye", "name": "The Unblinking Eye", "slot": "amulet", "material": "voidglass", "iLvl": 20, "affixCount": [3,4], "uniqueEffect": { "id": "generator_crit_bonus", "description": "+2% Spell Crit Chance for each active generator", "type": "passive", "value": 2 }, "flavorText": "It does not blink. It does not sleep. It sees what you refuse to.", "icon": null, "vfx": null },
    { "id": "paradox_staff", "name": "Paradox Staff", "slot": "weapon", "material": "astralweave", "iLvl": 25, "affixCount": [3,4], "uniqueEffect": { "id": "paradox_triple", "description": "Every 3rd spell cast in combat deals double damage", "type": "on_cast", "value": 3 }, "flavorText": "It exists in three timelines at once. Only one of them is yours.", "icon": null, "vfx": null },
    { "id": "robes_first_arcanist", "name": "Robes of the First Arcanist", "slot": "body", "material": "voidglass", "iLvl": 20, "affixCount": [3,4], "uniqueEffect": { "id": "regen_boost_low_hp", "description": "HP Regen triples when below 30% health", "type": "on_low_hp", "value": 3 }, "flavorText": "Worn by the first. Survived by the last. The stains never came out.", "icon": null, "vfx": null },
    { "id": "quicksilver_wraps", "name": "Quicksilver Wraps", "slot": "hands", "material": "grimsteel", "iLvl": 15, "affixCount": [3,4], "uniqueEffect": { "id": "cdr_on_crit", "description": "Cooldowns tick down 1 extra round when you crit", "type": "on_crit", "value": 1 }, "flavorText": "The mercury inside hasn't stopped moving in centuries.", "icon": null, "vfx": null },
    { "id": "wanderers_paradox", "name": "Wanderer's Paradox", "slot": "feet", "material": "astralweave", "iLvl": 25, "affixCount": [3,4], "uniqueEffect": { "id": "evasion_after_spatial", "description": "Evasion chance doubles for 2 rounds after casting a Spatial discipline spell", "type": "on_cast", "value": 2 }, "flavorText": "Every step lands somewhere unexpected. Even the boots seem surprised.", "icon": null, "vfx": null },
    { "id": "ouroboros_band", "name": "Ouroboros Band", "slot": "ring", "material": "voidglass", "iLvl": 20, "affixCount": [3,4], "uniqueEffect": { "id": "lifesteal", "description": "10% of damage dealt is returned as HP", "type": "on_hit", "value": 0.1 }, "flavorText": "The snake eats its tail. You eat its power. Everyone's happy.", "icon": null, "vfx": null },
    { "id": "convergence_shard", "name": "Convergence Shard", "slot": "ring", "material": "convergence", "iLvl": 30, "affixCount": [3,4], "uniqueEffect": { "id": "double_insights", "description": "Arcane Insights drop rate doubled", "type": "passive", "value": 2 }, "flavorText": "A fragment of every cycle that came before. It remembers what you chose to forget.", "icon": null, "vfx": null }
  ],
  "sets": [
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
      "icon": null, "vfx": null
    },
    {
      "id": "voidwalker_regalia",
      "name": "Voidwalker's Regalia",
      "flavor": "Those who gaze into the void find it gazes back — approvingly.",
      "pieces": [
        { "id": "voidwalker_body", "slot": "body", "material": "voidglass", "iLvl": 20, "affixCount": [2,3] },
        { "id": "voidwalker_amulet", "slot": "amulet", "material": "voidglass", "iLvl": 20, "affixCount": [2,3] },
        { "id": "voidwalker_ring", "slot": "ring", "material": "voidglass", "iLvl": 20, "affixCount": [2,3] }
      ],
      "bonuses": {
        "2": { "stats": { "evasion": 15 } },
        "3": { "special": { "id": "void_step", "description": "After dodging an attack, your next spell costs no mana", "type": "on_dodge" } }
      },
      "icon": null, "vfx": null
    },
    {
      "id": "convergence_echoes",
      "name": "Convergence Echoes",
      "flavor": "Fragments of every past cycle, resonating together.",
      "pieces": [
        { "id": "convergence_echoes_head", "slot": "head", "material": "convergence", "iLvl": 30, "affixCount": [2,3] },
        { "id": "convergence_echoes_body", "slot": "body", "material": "convergence", "iLvl": 30, "affixCount": [2,3] },
        { "id": "convergence_echoes_weapon", "slot": "weapon", "material": "convergence", "iLvl": 30, "affixCount": [2,3] },
        { "id": "convergence_echoes_amulet", "slot": "amulet", "material": "convergence", "iLvl": 30, "affixCount": [2,3] }
      ],
      "bonuses": {
        "2": { "stats": { "resource_rate": 20 } },
        "3": { "stats": { "loot_bonus": 15 } },
        "4": { "special": { "id": "echoing_power", "description": "All equipped items behave as if they were 5 iLvls higher for affix calculations", "type": "passive" } }
      },
      "icon": null, "vfx": null
    }
  ]
}
;

var eventsData =
{
  "events": [
    {
      "id": "wandering_scholar",
      "category": "opportunity",
      "weight": 10,
      "requires": { "discipline_unlocked": "shadow_binding" },
      "title": "The Stranger at the Gate",
      "text": "A knock echoes through your tower at an hour when no sane traveler would be abroad. At the gate stands a figure swathed in a cloak the color of a moonless sky, their face lost in shadow that does not quite move the way shadows should. Clutched beneath one arm is a bundle of texts bound in leather so dark it seems to swallow the torchlight. They say nothing — only tilt their head, as if they already know your answer.",
      "choices": [
        {
          "label": "Welcome them in",
          "outcomes": [
            { "type": "resource", "resource": "umbral_dust", "amount": 300 },
            { "type": "narrative", "text": "You step aside and let the darkness in. The stranger moves through your study without touching anything, yet when they depart before dawn the forbidden texts remain on your reading table, open to pages you do not remember turning. Fine umbral dust coats your fingertips — the residue of knowledge that prefers the dark." }
          ]
        },
        {
          "label": "Turn them away",
          "outcomes": [
            { "type": "resource", "resource": "mana", "amount": 500 },
            { "type": "narrative", "text": "You speak the word of warding and close the gate. The figure retreats without protest, dissolving into the night like ink into water. For a long moment your tower's protective sigils blaze with amber light, drinking the hostile potential that had gathered at your threshold. The wards fed well tonight." }
          ]
        }
      ]
    },
    {
      "id": "temporal_opportunity",
      "category": "opportunity",
      "weight": 10,
      "requires": { "discipline_unlocked": "temporal_arcana" },
      "title": "A Whisper Through Time",
      "text": "The candles gutter despite the stillness of the air, and for a brief, vertiginous moment the room smells of old parchment and something older still. Then a voice — unmistakably your own, yet carrying a weight yours has not yet earned — speaks from somewhere behind the seconds. It offers a sliver of chronal knowledge, a lesson learned on a night that has not happened yet. The choice, it murmurs, is yours.",
      "choices": [
        {
          "label": "Accept the gift",
          "outcomes": [
            { "type": "resource", "resource": "chronos_essence", "amount": 250 },
            { "type": "narrative", "text": "You open your hand and feel time coil into your palm like a living thing — dense, cold, impossibly patient. The future-self falls silent, satisfied or perhaps simply gone. You are left with a crystalline residue of chronos essence and the unsettling certainty that somewhere ahead, another version of you is receiving a gift from further along still." }
          ]
        },
        {
          "label": "Decline politely",
          "outcomes": [
            { "type": "resource", "resource": "mana", "amount": 400 },
            { "type": "narrative", "text": "You thank yourself — an odd courtesy — and refuse. The future must not be borrowed against too freely. The rejected temporal energy has nowhere to go; it unravels back into raw mana, flooding the study with a brief, bracing warmth before the candles steady themselves and the silence returns." }
          ]
        }
      ]
    },
    {
      "id": "chaos_rift",
      "category": "dilemma",
      "weight": 8,
      "requires": { "discipline_unlocked": "chaos_channeling" },
      "title": "A Rift in Reality",
      "text": "With a sound like a mirror breaking in reverse, reality splits open in the center of your laboratory. The tear hangs in the air — a jagged seam of impossible color, crackling at its edges with energy that does not belong to this world. Through it you glimpse the churning heart of entropy itself: beautiful, furious, and utterly without reason. Your instruments are going mad. Every instinct you possess is shouting a different command.",
      "choices": [
        {
          "label": "Reach into the rift",
          "outcome_sets": [
            {
              "weight": 70,
              "outcomes": [
                { "type": "resource", "resource": "flux_sparks", "amount": 500 },
                { "type": "narrative", "text": "The chaos bites — and then relents. Your arm plunges through the seam and returns trailing arcs of wild energy, flux sparks scattering across every surface like luminous hail. You are breathing hard, one sleeve scorched to the elbow, grinning despite yourself. Chaos rewarded the bold tonight." }
              ]
            },
            {
              "weight": 30,
              "outcomes": [
                { "type": "resource", "resource": "mana", "amount": -200 },
                { "type": "narrative", "text": "The rift takes before it gives. Something on the other side closes around your hand — not teeth, not claws, but pure unmaking — and when you pull free the mana reserves have been bled thin, siphoned through the contact like water through a cracked vessel. The tear seals itself, indifferent to your loss." }
              ]
            }
          ]
        },
        {
          "label": "Seal it safely",
          "outcomes": [
            { "type": "resource", "resource": "axiom_crystals", "amount": 200 },
            { "type": "narrative", "text": "You speak the theorems of closure, slow and deliberate, pressing ordered intention against the ragged edge of the impossible. The rift resists — chaos always does — but law is patient. The seam draws shut with a sound like a book being firmly closed. In the stillness that follows, axiom crystals have precipitated along the seal line: the residue of order imposed on oblivion." }
          ]
        }
      ]
    },
    {
      "id": "spatial_gateway",
      "category": "dilemma",
      "weight": 8,
      "requires": { "discipline_unlocked": "spatial_weaving" },
      "title": "The Unstable Gateway",
      "text": "Between one heartbeat and the next, a portal blooms in the corner of your study — a shimmering oval of folded space, its edges trembling as if uncertain of their own geometry. Through it, some other place breathes: you cannot say whether it is a distant library, a buried ruin, or something that has no name in any catalog you own. The portal flickers. It will not remain stable for long, and it did not ask permission to appear.",
      "choices": [
        {
          "label": "Step through",
          "outcomes": [
            { "type": "resource", "resource": "mana", "amount": 300 },
            { "type": "narrative", "text": "You step through without hesitation, and the other side catches you like a wave. Whatever dimension this is, it is saturated with raw magical potential — it presses against your skin, your thoughts, the very marrow of your craft. You return in the same heartbeat, somehow, carrying that surplus mana like salt on your tongue after a sea crossing." }
          ]
        },
        {
          "label": "Investigate carefully",
          "hidden": true,
          "outcomes": [
            { "type": "resource", "resource": "arcane_knowledge", "amount": 5 },
            { "type": "narrative", "text": "Instead of walking through, you study the threshold itself — the fold lines, the anchor points, the small grammatical errors in the spell that conjured it. A portal this unstable is practically an open book on spatial theory. By the time it collapses, you have filled three pages of notes with insights no classroom could teach. The destination was never the point." }
          ]
        }
      ]
    },
    {
      "id": "mana_parasite",
      "category": "crisis",
      "weight": 6,
      "requires": {},
      "title": "Arcane Parasite",
      "text": "Something is feeding on your tower. You notice it first as a wrongness in the rhythm of the ley lines — a subtle arrhythmia, like a pulse with an extra beat. Then you find it: a magical leech, translucent and pulsing, latched onto the primary conduit with dozens of hooked filaments. It has been here for some time. The mana is flowing out of your reserves like blood from a quiet wound, and the creature shows no sign of satiety. You must act before there is nothing left to defend.",
      "timeout": 120,
      "timeout_penalty": [{ "type": "resource", "resource": "mana", "amount": -500 }],
      "choices": [
        {
          "label": "Purge with vital magic",
          "requires_choice": { "discipline_unlocked": "vital_alchemy" },
          "outcomes": [
            { "type": "resource", "resource": "vital_ichor", "amount": -50 },
            { "type": "resource", "resource": "mana", "amount": 200 },
            { "type": "narrative", "text": "You suffuse the conduit with vital ichor, and the parasite reacts as all living things do to something more alive than themselves — with revulsion and retreat. It detaches with a wet, unpleasant sound and dissolves before it reaches the floor. The ley lines sing cleaner now, and the mana it stole rushes back like a tide returning." }
          ]
        },
        {
          "label": "Trap with order magic",
          "requires_choice": { "discipline_unlocked": "order_forging" },
          "outcomes": [
            { "type": "resource", "resource": "axiom_crystals", "amount": -30 },
            { "type": "resource", "resource": "arcane_knowledge", "amount": 2 },
            { "type": "narrative", "text": "You bind it in place with geometric precision — a crystalline cage of axiom-forged law that the creature cannot gnaw through. Trapped, it becomes a specimen. You spend an hour studying its feeding mechanism before finally unmaking it. The cost in axiom crystals was worth it; no parasite of this kind will surprise you twice." }
          ]
        },
        {
          "label": "Endure the drain",
          "outcomes": [
            { "type": "resource", "resource": "mana", "amount": -300 },
            { "type": "narrative", "text": "You wait it out, jaw set, watching the mana gauge fall. Eventually the creature gorges itself into a torpor and drops from the conduit, sated. The damage is done — the reserves are badly depleted — but the tower still stands. You make a note to ward the ley line junction more carefully next time, and try to mean it." }
          ]
        }
      ]
    },
    {
      "id": "generator_overload",
      "category": "crisis",
      "weight": 6,
      "requires": {},
      "title": "Generator Overload",
      "text": "An alarm you installed and promptly forgot about begins to shriek. In the sub-chamber below, one of your generators has crossed the threshold from vigorous into dangerous: the containment housing is glowing a shade of red that does not appear on any safety diagram you wrote. Arcs of surplus energy are kissing the stone walls and leaving scorch marks. The device is not broken — it is simply producing far more than it was ever designed to hold, and it has nowhere left to put it.",
      "timeout": 90,
      "timeout_penalty": [
        { "type": "resource", "resource": "mana", "amount": -300 },
        { "type": "generator", "generator": "primary_generator", "damage": 10 }
      ],
      "choices": [
        {
          "label": "Manually stabilize",
          "outcomes": [
            { "type": "resource", "resource": "mana", "amount": -100 },
            { "type": "narrative", "text": "You reach into the surge with your own reserves, using raw mana as a dampener — pressing your will against the excess like a hand over a wound. The heat is considerable and the feedback leaves your fingers numb for an hour. But the housing dims to amber, then to nothing, and the generator settles back into its ordinary rhythm. Crisis averted, at personal cost." }
          ]
        },
        {
          "label": "Shut down temporarily",
          "outcomes": [
            { "type": "resource", "resource": "mana", "amount": -50 },
            { "type": "narrative", "text": "You pull the shutdown sequence: a measured bleed of mana to coast the generator down through the power curve without letting it spike. The whine descends through octaves and the glow fades. The silence is almost peaceful. It will take time to restart at full efficiency, but the alternative was considerably louder and more permanent." }
          ]
        },
        {
          "label": "Let it resolve",
          "outcomes": [
            { "type": "generator", "generator": "primary_generator", "damage": 20 },
            { "type": "narrative", "text": "Against all better judgment, you step back and let the generator find its own equilibrium. It does — eventually — after venting its excess through the housing in a cascade of sparks and a sound like a thunderclap inside a closet. The surge passes. The generator still works, technically. The scorch marks on the ceiling are a new feature. You tell yourself it builds character." }
          ]
        }
      ]
    }
  ],
  "discoveries": [
    {
      "id": "the_hoarder",
      "name": "The Hoarder's Revelation",
      "description": "Accumulate 10,000 flux sparks without ever spending a single one.",
      "discovery_text": "You did not plan this. You simply kept collecting, kept generating, kept deferring the expenditure — and one morning you found that the flux sparks had begun to change. Left undisturbed long enough, chaos energy does not dissipate; it remembers itself. It coheres. What began as wild, spitting randomness has crystallized into something with edges, with structure, with the quiet authority of a thing that has chosen its own form. Chaos, it turns out, is only disorder until it has time to think.",
      "condition": { "type": "threshold", "resource": "flux_sparks", "value": 10000, "constraint": { "type": "never_spent", "resource": "flux_sparks" } },
      "reward": { "arcane_knowledge": 10 }
    },
    {
      "id": "the_persistent",
      "name": "Stubborn Resilience",
      "description": "Lose three consecutive combats without surrendering the study.",
      "discovery_text": "Three times the floor rushed up to meet you. Three times you catalogued the precise manner of your failure — the overextended ward, the misread feint, the hubris of the second engagement. Victory teaches you that your methods work. Defeat teaches you exactly where they do not, and why, and what the margin was, and what you will do differently when the fourth fight comes. It will come. You are already looking forward to it.",
      "condition": { "type": "counter", "event": "combat_loss", "count": 3, "constraint": { "type": "consecutive" } },
      "reward": { "arcane_knowledge": 5 }
    },
    {
      "id": "dual_mastery",
      "name": "Dual Mastery",
      "description": "Advance both Temporal Arcana and Spatial Weaving to their second tier.",
      "discovery_text": "The moment the second discipline clicked into place, something shifted in your perception — a conceptual double-exposure, two transparencies laid atop one another until their hidden geometry aligned. Time is not separate from space. They are the same fabric, viewed from different angles: one measures how far, the other measures how long, and both are asking the same question about the distance between here and elsewhere. You have not mastered two arts. You have found the single art beneath them both.",
      "condition": { "type": "combination", "nodes": ["temporal_t2_1", "spatial_t2_1"] },
      "reward": { "arcane_knowledge": 8 }
    },
    {
      "id": "the_scholar",
      "name": "The True Scholar",
      "description": "Hold 5,000 mana in reserve while completing at least 10 research projects.",
      "discovery_text": "Lesser practitioners accumulate power as an end in itself — the mana hoarded, the resources tallied, the tower grown tall for the sake of its own shadow. But somewhere between the tenth research completion and this quiet moment of reflection, the distinction dissolved. The mana is not the point. The knowledge is not entirely the point either. The point is the motion itself: the reaching, the testing, the revision, the asking of the next question before the last one has fully cooled. The pursuit is not the path to power. The pursuit is the power.",
      "condition": {
        "type": "all_of",
        "conditions": [
          { "type": "threshold", "resource": "mana", "value": 5000 },
          { "type": "counter", "event": "research_complete", "count": 10 }
        ]
      },
      "reward": { "arcane_knowledge": 15 }
    }
  ],
  "challenges": [
    {
      "id": "mana_burst",
      "name": "Mana Surge",
      "description": "The study hungers — flood your reserves with 500 mana before the hourglass empties.",
      "objective": { "type": "generate", "resource": "mana", "amount": 500 },
      "duration": 300,
      "reward": { "arcane_knowledge": 3 }
    },
    {
      "id": "combat_streak",
      "name": "Combat Streak",
      "description": "Prove that the first victory was no accident — defeat three challengers in succession.",
      "objective": { "type": "counter", "event": "combat_win", "count": 3 },
      "duration": 600,
      "reward": { "arcane_knowledge": 5 }
    },
    {
      "id": "speed_research",
      "name": "Speed Research",
      "description": "The answers are already in the texts — find two of them before the candle burns down.",
      "objective": { "type": "counter", "event": "research_complete", "count": 2 },
      "duration": 600,
      "reward": { "arcane_knowledge": 4 }
    }
  ]
}
;

var prestigeData = 
[
  {
    "id": "mana_attunement",
    "name": "Mana Attunement",
    "description": "Each Grand Convergence deepens your attunement to the raw, unseen currents that thread between worlds, coaxing mana to flow ever more freely into your study. What once trickled now surges, as though the ley lines themselves have learned your name.",
    "max_level": 10,
    "cost_base": 5,
    "cost_scaling": 1.8,
    "effect": { "type": "resource_rate_multiplier", "resource": "mana", "value_per_level": 0.25 }
  },
  {
    "id": "quickened_mind",
    "name": "Quickened Mind",
    "description": "After each convergence, your mind ascends to a higher plane of cognition where mortal time moves sluggishly below you. Theorems that once demanded weeks of deliberation now crystallize in moments, as if the answers were always waiting just beneath the surface.",
    "max_level": 10,
    "cost_base": 8,
    "cost_scaling": 1.8,
    "effect": { "type": "research_speed_multiplier", "value_per_level": 0.1 }
  },
  {
    "id": "resonant_generators",
    "name": "Resonant Generators",
    "description": "Your arcane constructs are not merely rebuilt — they are remembered, their optimal configurations etched into the fabric of each new reality you inhabit. They wake already humming, as if they never truly stopped.",
    "max_level": 1,
    "cost_base": 15,
    "cost_scaling": 1,
    "effect": { "type": "generator_start_level", "value": 2 }
  },
  {
    "id": "deep_memory",
    "name": "Deep Memory",
    "description": "Faint echoes of your past convergences linger like marginalia in an ancient tome, guiding your hands back to conclusions already hard-won in another life. The earliest paths of research need no retracing — they are simply known.",
    "max_level": 1,
    "cost_base": 20,
    "cost_scaling": 1,
    "effect": { "type": "pre_complete_tier", "tier": 1, "choice": "player_selected" }
  },
  {
    "id": "arcane_magnetism",
    "name": "Arcane Magnetism",
    "description": "Your tower has become a wound in the ordinary world, a point of such dense arcane significance that strange phenomena are inexorably drawn toward it. The universe, it seems, cannot help but take notice.",
    "max_level": 5,
    "cost_base": 10,
    "cost_scaling": 1.5,
    "effect": { "type": "event_frequency_multiplier", "value_per_level": 0.15 }
  },
  {
    "id": "battle_instinct",
    "name": "Battle Instinct",
    "description": "Lifetimes of struggle have carved reflexes into you that no single incarnation could earn alone — your body moves through combat with the accumulated grace of a dozen past lives. Enemies that once surprised you now seem to telegraph their every intention.",
    "max_level": 3,
    "cost_base": 12,
    "cost_scaling": 2.0,
    "effect": { "type": "combat_ai_level", "value_per_level": 1 }
  },
  {
    "id": "offline_mastery",
    "name": "Offline Mastery",
    "description": "The enchantments woven into your tower grow ever more self-sufficient, sustaining their slow accumulation of power even in your absence, as though the study itself has absorbed your intent. The work continues whether you are present to witness it or not.",
    "max_level": 4,
    "cost_base": 10,
    "cost_scaling": 1.6,
    "effect": { "type": "offline_efficiency", "base_value": 0.5, "value_per_level": 0.1, "cap": 0.9 }
  },
  {
    "id": "convergence_echo",
    "name": "Convergence Echo",
    "description": "In the trembling moment after reality is rewritten, residual energy from the Grand Convergence bleeds into your new world like light through a closing door. For a brief, luminous interval, everything in your study accelerates, as though the universe itself is still recoiling.",
    "max_level": 1,
    "cost_base": 25,
    "cost_scaling": 1,
    "effect": { "type": "convergence_speed", "multiplier": 3, "duration_ticks": 600 }
  },
  {
    "id": "lingering_insights",
    "name": "Lingering Insights",
    "description": "The clarity earned in battle does not vanish entirely when reality is rewritten. Faint impressions of your combative wisdom persist through each Grand Convergence, allowing you to retain a quarter of your Arcane Insights — echoes of victories that transcend the cycle.",
    "max_level": 1,
    "cost_base": 50,
    "cost_scaling": 1,
    "effect": { "type": "insight_retention", "value": 0.25 }
  }
]
;

var spellsData = 
{
  "spells": [
    {
      "id": "temporal_strike",
      "discipline": "temporal_arcana",
      "name": "Temporal Strike",
      "description": "A razor-thin blade of frozen time lashes out at the target, suspending their flesh in a single agonizing moment before the spell releases its hold. Those struck report the unsettling sensation of having lost a heartbeat they can never recover.",
      "type": "damage",
      "base_damage": 40,
      "mana_cost": 30,
      "cooldown": 2,
      "effects": [],
      "synergy": { "requires_discipline": "spatial_weaving", "bonus_damage": 15 },
      "auto_priority": 2,
      "tags": ["offensive", "single_target"]
    },
    {
      "id": "temporal_shield",
      "discipline": "temporal_arcana",
      "name": "Temporal Shield",
      "description": "The arcanist wraps a looping sliver of time around themselves, causing any harm that strikes the barrier to replay endlessly within its own closed moment, dissipating before it can reach the caster. The world beyond the shield blurs faintly, as though seen through rippling water.",
      "type": "shield",
      "base_damage": 0,
      "shield_amount": 40,
      "mana_cost": 40,
      "cooldown": 4,
      "effects": [],
      "synergy": { "requires_discipline": "spatial_weaving", "bonus_damage": 0 },
      "auto_priority": 1,
      "tags": ["defensive", "self"]
    },
    {
      "id": "spatial_rend",
      "discipline": "spatial_weaving",
      "name": "Spatial Rend",
      "description": "With a sharp gesture the arcanist tears a jagged rift in the fabric of space itself, its edges dragging across the target like the teeth of something that should not exist. The wound closes instantly, but the geometry of the space it occupied is never quite the same again.",
      "type": "damage",
      "base_damage": 45,
      "mana_cost": 35,
      "cooldown": 2,
      "effects": [],
      "synergy": { "requires_discipline": "temporal_arcana", "bonus_damage": 15 },
      "auto_priority": 2,
      "tags": ["offensive", "single_target"]
    },
    {
      "id": "spatial_dodge",
      "discipline": "spatial_weaving",
      "name": "Spatial Dodge",
      "description": "The arcanist briefly phases their body through the interstitial folds of space, becoming untethered from their precise location and allowing attacks to pass through where they almost are. The disorientation fades quickly, leaving behind a sharpened sense of arcane potential.",
      "type": "buff",
      "base_damage": 0,
      "mana_cost": 30,
      "cooldown": 3,
      "effects": [
        { "type": "buff", "target": "player", "stat": "arcane_power", "value": 20, "duration": 3 }
      ],
      "synergy": { "requires_discipline": "temporal_arcana", "bonus_damage": 0 },
      "auto_priority": 1,
      "tags": ["defensive", "self"]
    },
    {
      "id": "mind_blast",
      "discipline": "mind_sculpting",
      "name": "Mind Blast",
      "description": "A concentrated lance of psychic force is driven through the target's consciousness like a needle through wet parchment, scattering thought and sensation into white noise. Whatever the creature was contemplating in that instant is erased utterly and forever.",
      "type": "damage",
      "base_damage": 50,
      "mana_cost": 40,
      "cooldown": 2,
      "effects": [],
      "synergy": { "requires_discipline": "vital_alchemy", "bonus_damage": 15 },
      "auto_priority": 2,
      "tags": ["offensive", "single_target"]
    },
    {
      "id": "mind_drain",
      "discipline": "mind_sculpting",
      "name": "Mind Drain",
      "description": "Tendrils of projected thought sink into the target's mind and draw out its instincts and reflexes like pulling thread from a loom, leaving the creature slower and more vulnerable. The extracted mental essence evaporates harmlessly — it is the unraveling, not the harvest, that matters.",
      "type": "debuff",
      "base_damage": 0,
      "mana_cost": 35,
      "cooldown": 3,
      "effects": [
        { "type": "debuff", "target": "enemy", "stat": "defense", "value": -10, "duration": 2 }
      ],
      "synergy": { "requires_discipline": "vital_alchemy", "bonus_damage": 0 },
      "auto_priority": 1,
      "tags": ["utility", "single_target"]
    },
    {
      "id": "vital_bolt",
      "discipline": "vital_alchemy",
      "name": "Vital Bolt",
      "description": "A compressed sphere of raw life-force is hurled at the target, its energy violently incompatible with whatever biology or essence the creature possesses. It does not merely wound — it disrupts the fundamental processes that keep a living thing coherent.",
      "type": "damage",
      "base_damage": 35,
      "mana_cost": 25,
      "cooldown": 2,
      "effects": [],
      "synergy": { "requires_discipline": "mind_sculpting", "bonus_damage": 15 },
      "auto_priority": 2,
      "tags": ["offensive", "single_target"]
    },
    {
      "id": "vital_heal",
      "discipline": "vital_alchemy",
      "name": "Vital Heal",
      "description": "The arcanist reaches inward and coaxes the body's own essence into a state of accelerated restoration, knitting tissue and replenishing vitality through sheer alchemical will. It is a borrowed vitality — the body remembers the debt, even if the mind does not.",
      "type": "heal",
      "base_damage": 0,
      "heal_amount": 60,
      "mana_cost": 45,
      "cooldown": 3,
      "effects": [],
      "synergy": { "requires_discipline": "mind_sculpting", "bonus_damage": 0 },
      "auto_priority": 1,
      "tags": ["healing", "self"]
    },
    {
      "id": "shadow_bolt",
      "discipline": "shadow_binding",
      "name": "Shadow Bolt",
      "description": "Darkness is drawn from the spaces between things and compressed into a projectile of pure, weaponized absence, striking the target with a cold that has nothing to do with temperature. Where it lands, light seems reluctant to return.",
      "type": "damage",
      "base_damage": 45,
      "mana_cost": 30,
      "cooldown": 2,
      "effects": [],
      "synergy": { "requires_discipline": "chaos_channeling", "bonus_damage": 15 },
      "auto_priority": 2,
      "tags": ["offensive", "single_target"]
    },
    {
      "id": "shadow_weaken",
      "discipline": "shadow_binding",
      "name": "Shadow Weaken",
      "description": "A binding curse of shadow is laced through the target's defenses, whispering doubt and entropy into the very substance that protects them. The afflicted find their resolve crumbling as though some unseen hand has been slowly, patiently unwriting their strength.",
      "type": "debuff",
      "base_damage": 0,
      "mana_cost": 35,
      "cooldown": 4,
      "effects": [
        { "type": "debuff", "target": "enemy", "stat": "defense", "value": -10, "duration": 2 }
      ],
      "synergy": { "requires_discipline": "chaos_channeling", "bonus_damage": 0 },
      "auto_priority": 1,
      "tags": ["utility", "single_target"]
    },
    {
      "id": "chaos_surge",
      "discipline": "chaos_channeling",
      "name": "Chaos Surge",
      "description": "The arcanist tears open a conduit to pure entropic force and directs the screaming torrent at a single target, the energy too unstable to be controlled for more than a heartbeat. The resulting impact is different every time — the only constant is that something will be thoroughly unmade.",
      "type": "damage",
      "base_damage": 60,
      "mana_cost": 50,
      "cooldown": 3,
      "effects": [],
      "synergy": { "requires_discipline": "shadow_binding", "bonus_damage": 15 },
      "auto_priority": 2,
      "tags": ["offensive", "single_target", "high_variance"]
    },
    {
      "id": "chaos_wildcard",
      "discipline": "chaos_channeling",
      "name": "Chaos Wildcard",
      "description": "An invocation with no fixed form, the Wildcard releases a burst of wild entropy that damages the target while simultaneously flooding the caster with chaotic arcane energy. No two castings are alike, and the unpredictability is not a flaw — it is the entire point.",
      "type": "damage",
      "base_damage": 30,
      "mana_cost": 40,
      "cooldown": 5,
      "effects": [
        { "type": "buff", "target": "player", "stat": "arcane_power", "value": 20, "duration": 3 }
      ],
      "synergy": { "requires_discipline": "shadow_binding", "bonus_damage": 15 },
      "auto_priority": 1,
      "tags": ["offensive", "high_variance", "utility"]
    },
    {
      "id": "order_smite",
      "discipline": "order_forging",
      "name": "Order Smite",
      "description": "A precisely calculated geometric strike — planes of crystalline force intersecting at mathematically perfect angles — is delivered against the target with the cold certainty of a theorem being proven. Chaos and irregularity are its natural prey.",
      "type": "damage",
      "base_damage": 40,
      "mana_cost": 30,
      "cooldown": 2,
      "effects": [],
      "synergy": { "requires_discipline": "vital_alchemy", "bonus_damage": 15 },
      "auto_priority": 2,
      "tags": ["offensive", "single_target"]
    },
    {
      "id": "order_ward",
      "discipline": "order_forging",
      "name": "Order Ward",
      "description": "A protective sigil of pure law is inscribed upon the air around the caster, its interlocking geometric patterns enforcing the rule that harm shall not pass this boundary. The ward does not bend or yield — it simply holds, impassive and absolute, until the law it embodies is spent.",
      "type": "shield",
      "base_damage": 0,
      "shield_amount": 40,
      "mana_cost": 50,
      "cooldown": 4,
      "effects": [],
      "synergy": { "requires_discipline": "vital_alchemy", "bonus_damage": 0 },
      "auto_priority": 1,
      "tags": ["defensive", "self"]
    }
  ],
  "consumables": [
    {
      "id": "healing_salve",
      "name": "Healing Salve",
      "description": "A thick unguent distilled from vital ichor and applied to wound or weariness alike, its alchemical warmth coaxing the body's own life-force into swift and vigorous repair. The scent is faintly sweet, like something biological that has been made just slightly too perfect.",
      "craft_cost": { "vital_ichor": 50 },
      "requires_research": "vital_t1_2",
      "effect": { "type": "heal", "value": 80 },
      "max_stack": 5
    },
    {
      "id": "vitality_boost",
      "name": "Vitality Boost",
      "description": "A concentrated draught of transmuted vital essence that temporarily fortifies the body beyond its natural limits, weaving additional resilience into sinew and spirit alike. The effect is bracingly powerful — and when it fades, the body takes a moment to remember what it was before.",
      "craft_cost": { "vital_ichor": 100 },
      "requires_research": "vital_t2_1",
      "effect": { "type": "buff", "stat": "resilience", "value": 20, "duration": 5 },
      "max_stack": 3
    },
    {
      "id": "wild_surge_potion",
      "name": "Wild Surge Potion",
      "description": "Bottled entropy in a fragile vial — the flux sparks within are barely contained, and drinking it floods the arcanist's channels with unstable, crackling power that amplifies every spell cast in its wake. It is not recommended to hold it for long; the glass occasionally begins to hum.",
      "craft_cost": { "flux_sparks": 50 },
      "requires_research": "chaos_t1_2",
      "effect": { "type": "buff", "stat": "arcane_power", "value": 30, "duration": 3 },
      "max_stack": 5
    },
    {
      "id": "chaos_bomb",
      "name": "Chaos Bomb",
      "description": "A sphere of compressed flux sparks wound to critical instability, hurled at the enemy and released in an eruption of raw, unfiltered chaos that obeys no consistent physical law. The damage it inflicts is massive and entirely uninterested in being precisely described.",
      "craft_cost": { "flux_sparks": 100 },
      "requires_research": "chaos_t2_1",
      "effect": { "type": "damage", "value": 150 },
      "max_stack": 3
    }
  ]
}
;

var encountersData = 
[
  {
    "id": "arcane_wisp",
    "name": "Arcane Wisp",
    "tier": 1,
    "insightReward": 1,
    "description": "A drifting mote of unbound magic, pulsing with cold light as it searches hungrily for a mind to latch onto. Raw and purposeless, it is no less dangerous for its lack of intent.",
    "health": 120,
    "attack": 12,
    "defense": 3,
    "pattern": ["strike", "strike", "dodge"],
    "actions": {},
    "weakness": "order_forging",
    "resistance": "chaos_channeling",
    "loot": [
      { "resource": "mana", "amount": 50 },
      { "resource": "arcane_knowledge", "amount": 1 }
    ]
  },
  {
    "id": "hollow_shade",
    "name": "Hollow Shade",
    "tier": 1,
    "insightReward": 1,
    "description": "All that remains of a wizard whose soul was consumed — a tattered silhouette that moves with eerie remembrance of life. It reaches not out of malice, but because emptiness always yearns to be filled.",
    "health": 160,
    "attack": 18,
    "defense": 5,
    "pattern": ["strike", "dodge", "strike"],
    "actions": {},
    "weakness": "temporal_arcana",
    "resistance": "shadow_binding",
    "loot": [
      { "resource": "shadow_essence", "amount": 15 },
      { "resource": "arcane_knowledge", "amount": 2 }
    ]
  },
  {
    "id": "flux_hound",
    "name": "Flux Hound",
    "tier": 2,
    "insightReward": 2,
    "description": "A slavering beast woven from wild, unstable energies, its form shimmering between states as it prowls. Where it treads, reality buckles, and its teeth carry the unpredictable savagery of pure chaos.",
    "health": 350,
    "attack": 30,
    "defense": 10,
    "pattern": ["strike", "strike", "special:chaotic_bite", "dodge"],
    "actions": {
      "chaotic_bite": {
        "type": "special",
        "damage_multiplier": 1.8,
        "effects": [
          { "type": "debuff", "target": "player", "stat": "defense", "value": -5, "duration": 2 }
        ],
        "description": "The hound's jaws distort mid-bite, delivering a wound that writhes with chaotic energy and saps the defender's guard."
      }
    },
    "weakness": "order_forging",
    "resistance": "chaos_channeling",
    "loot": [
      { "resource": "flux_sparks", "amount": 30 },
      { "resource": "arcane_knowledge", "amount": 3 }
    ]
  },
  {
    "id": "stone_sentinel",
    "name": "Stone Sentinel",
    "tier": 2,
    "insightReward": 2,
    "description": "An ancient guardian carved from enchanted granite, its hollow eye-sockets burning with the dying memory of a long-dead mage's command. It does not feel, does not tire, and does not yield.",
    "health": 480,
    "attack": 38,
    "defense": 12,
    "pattern": ["strike", "strike", "dodge", "special:stone_slam"],
    "actions": {
      "stone_slam": {
        "type": "special",
        "damage_multiplier": 2.2,
        "effects": [
          { "type": "debuff", "target": "player", "stat": "speed", "value": -0.3, "duration": 2 }
        ],
        "description": "A fist of ancient stone crashes down with geological finality, the shockwave rattling bones and rooting the victim in stunned slowness."
      }
    },
    "weakness": "spatial_weaving",
    "resistance": "order_forging",
    "loot": [
      { "resource": "mana", "amount": 120 },
      { "resource": "arcane_knowledge", "amount": 5 }
    ]
  },
  {
    "id": "mindwraith",
    "name": "Mindwraith",
    "tier": 3,
    "boss": true,
    "insightReward": 3,
    "description": "A horror that exists only in the space between thoughts, slipping through the fissures of a scholar's focused mind to feast on the arcane knowledge within. Its presence feels like forgetting something vital.",
    "health": 800,
    "attack": 60,
    "defense": 18,
    "pattern": ["strike", "special:psychic_lance", "buff_self", "strike", "debuff_player"],
    "actions": {
      "psychic_lance": {
        "type": "special",
        "damage_multiplier": 2.5,
        "effects": [
          { "type": "debuff", "target": "player", "stat": "arcane_power", "value": -15, "duration": 3 }
        ],
        "description": "A needle of pure psychic force is driven into the target's mind, scattering spells mid-cast and leaving arcane concentration in tatters."
      },
      "mind_veil": {
        "type": "special",
        "damage_multiplier": 1.0,
        "effects": [
          { "type": "buff", "target": "self", "stat": "defense", "value": 10, "duration": 2 }
        ],
        "description": "The mindwraith shrouds itself in stolen memories, weaving a psychic barrier that deflects both spells and the will to strike."
      }
    },
    "weakness": "vital_alchemy",
    "resistance": "mind_sculpting",
    "loot": [
      { "resource": "thought_fragments", "amount": 20 },
      { "resource": "arcane_knowledge", "amount": 10 }
    ]
  },
  {
    "id": "void_stalker",
    "name": "Void Stalker",
    "tier": 3,
    "boss": true,
    "insightReward": 3,
    "description": "A predator that slips between the folds of space itself, existing in the breathless silence where dimensions do not quite meet. It hunts without sound, and strikes from angles that should not exist.",
    "health": 950,
    "attack": 68,
    "defense": 22,
    "pattern": ["strike", "debuff_player", "special:void_rift", "buff_self", "strike"],
    "actions": {
      "void_rift": {
        "type": "special",
        "damage_multiplier": 2.8,
        "effects": [
          { "type": "debuff", "target": "player", "stat": "defense", "value": -12, "duration": 3 }
        ],
        "description": "The stalker tears a jagged wound in the fabric of space, and the screaming vacuum beyond shreds through armor and ward alike."
      },
      "spatial_distort": {
        "type": "special",
        "damage_multiplier": 1.5,
        "effects": [
          { "type": "debuff", "target": "player", "stat": "speed", "value": -0.4, "duration": 2 }
        ],
        "description": "The void stalker warps the space around its prey, folding distance so that every step taken leads nowhere, leaving the victim stumbling through a fractured corridor of misdirection."
      }
    },
    "weakness": "temporal_arcana",
    "resistance": "spatial_weaving",
    "loot": [
      { "resource": "shadow_essence", "amount": 40 },
      { "resource": "arcane_knowledge", "amount": 12 }
    ]
  },
  {
    "id": "chaos_titan",
    "name": "Chaos Titan",
    "tier": 4,
    "boss": true,
    "insightReward": 3,
    "description": "A towering catastrophe given form — entropy made flesh, its very existence an affront to order and reason. Scholars debate whether it was summoned or simply coalesced wherever enough rules had been broken.",
    "health": 1700,
    "attack": 100,
    "defense": 35,
    "pattern": ["strike", "heavy_strike", "special:entropic_wave", "buff_self", "debuff_player", "special:chaos_nova"],
    "actions": {
      "entropic_wave": {
        "type": "special",
        "damage_multiplier": 3.0,
        "effects": [
          { "type": "debuff", "target": "player", "stat": "arcane_power", "value": -20, "duration": 3 },
          { "type": "debuff", "target": "player", "stat": "defense", "value": -10, "duration": 2 }
        ],
        "description": "A rolling tide of pure dissolution crashes outward, unraveling enchantments, eroding wards, and leaving the arcane will of its victim frayed and spent."
      },
      "chaos_nova": {
        "type": "special",
        "damage_multiplier": 2.5,
        "effects": [
          { "type": "debuff", "target": "player", "stat": "speed", "value": -0.5, "duration": 2 }
        ],
        "description": "The titan erupts in a blinding detonation of anarchic force, flinging shards of raw unreality in every direction and leaving survivors too dazed to flee."
      },
      "titan_fortify": {
        "type": "special",
        "damage_multiplier": 1.0,
        "effects": [
          { "type": "buff", "target": "self", "stat": "defense", "value": 20, "duration": 3 }
        ],
        "description": "Chaos folds inward as the titan draws entropy back upon itself, hardening into a paradoxical shell of absolute disorder that resists all attempts to impose form or damage upon it."
      }
    },
    "weakness": "order_forging",
    "resistance": "chaos_channeling",
    "loot": [
      { "resource": "flux_sparks", "amount": 80 },
      { "resource": "arcane_knowledge", "amount": 20 }
    ]
  },
  {
    "id": "shadow_archon",
    "name": "Shadow Archon",
    "tier": 4,
    "boss": true,
    "insightReward": 3,
    "description": "A sovereign of absolute darkness, ancient beyond reckoning and contemptuous of the light that lesser beings require to see, to think, to hope. Where it walks, shadows do not merely fall — they obey.",
    "health": 1950,
    "attack": 115,
    "defense": 38,
    "pattern": ["heavy_strike", "special:dark_dominion", "buff_self", "strike", "debuff_player", "special:umbral_crush"],
    "actions": {
      "dark_dominion": {
        "type": "special",
        "damage_multiplier": 3.5,
        "effects": [
          { "type": "debuff", "target": "player", "stat": "arcane_power", "value": -25, "duration": 4 }
        ],
        "description": "The archon extends its will across the battlefield like a smothering cloak, strangling the flow of arcane power and reminding the victim that in true darkness, magic is merely a candle."
      },
      "umbral_crush": {
        "type": "special",
        "damage_multiplier": 2.8,
        "effects": [
          { "type": "debuff", "target": "player", "stat": "defense", "value": -15, "duration": 3 },
          { "type": "debuff", "target": "player", "stat": "speed", "value": -0.4, "duration": 2 }
        ],
        "description": "Solid darkness condenses around the target and constricts with terrible weight, splintering defenses and crushing the will to move beneath a pressure that no light can penetrate."
      },
      "shadow_veil": {
        "type": "special",
        "damage_multiplier": 1.0,
        "effects": [
          { "type": "buff", "target": "self", "stat": "defense", "value": 25, "duration": 3 }
        ],
        "description": "The archon draws absolute darkness around itself like a mantle, becoming a silhouette that absorbs light, magic, and the very concept of harm directed against it."
      }
    },
    "weakness": "vital_alchemy",
    "resistance": "shadow_binding",
    "loot": [
      { "resource": "shadow_essence", "amount": 80 },
      { "resource": "arcane_knowledge", "amount": 22 }
    ]
  }
]
;

// ============================================================
// UTILITIES
// ============================================================

/**
 * Format a number for display with appropriate unit suffixes
 * @param {number} n - The number to format
 * @returns {string} Formatted number (e.g., "1.5K", "42.3", "999.9")
 */
function formatNumber(n) {
  // Guard against NaN / Infinity
  if (!isFinite(n)) return "---";
  // Handle 0 and negative numbers
  if (n === 0) return "0";
  if (n < 0) return "-" + formatNumber(-n);

  // Under 1000: show with up to 1 decimal
  if (n < 1000) {
    // Remove trailing zeros and decimal point if not needed
    return parseFloat(n.toFixed(1)).toString();
  }

  // Define unit thresholds
  const units = [
    { threshold: 1e12, suffix: "T" },
    { threshold: 1e9, suffix: "B" },
    { threshold: 1e6, suffix: "M" },
    { threshold: 1e3, suffix: "K" },
  ];

  for (const unit of units) {
    if (n >= unit.threshold) {
      const scaled = n / unit.threshold;
      // Format to 1 decimal place, remove trailing zeros
      return parseFloat(scaled.toFixed(1)) + unit.suffix;
    }
  }

  return n.toString();
}

/**
 * Format seconds into a human-readable time string
 * @param {number} seconds - Number of seconds
 * @returns {string} Formatted time (e.g., "1h 1m 1s", "2m", "0s")
 */
function formatTime(seconds) {
  if (seconds === 0) return "0s";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts = [];
  if (hours > 0) parts.push(hours + "h");
  if (minutes > 0) parts.push(minutes + "m");
  if (secs > 0) parts.push(secs + "s");

  return parts.join(" ");
}

/**
 * Select a random item from an array based on weights
 * @param {Array<{weight: number, ...}>} items - Array of items with weight property
 * @returns {*} One item selected based on weight distribution
 */
function weightedRandom(items) {
  if (!items || items.length === 0) return null;

  // Sum all weights
  const totalWeight = items.reduce((sum, item) => sum + (item.weight || 0), 0);

  if (totalWeight <= 0) return null;

  // Pick a random point in the weight range
  let randomPoint = Math.random() * totalWeight;

  // Iterate through items to find the selected one
  for (const item of items) {
    randomPoint -= item.weight;
    if (randomPoint <= 0) {
      return item;
    }
  }

  // Fallback (should not reach here with valid weights)
  return items[items.length - 1];
}

/**
 * Generate a random float within a range
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (exclusive)
 * @returns {number} Random float in range [min, max)
 */
function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

/**
 * Evaluate a probability and return true/false
 * @param {number} probability - Probability between 0 and 1
 * @returns {boolean} True with probability%, false otherwise
 */
function chance(probability) {
  return Math.random() < probability;
}

// util/save.js
// Save system: localStorage persistence, Base64 export/import, and auto-save.

const SAVE_KEY = 'arcanist_save';

/**
 * Serializes state to JSON and stores it in localStorage.
 * Updates state.settings.lastSave to the current timestamp.
 * Returns true on success, false if an error occurs (e.g. storage quota exceeded).
 */
function saveGame(state) {
  try {
    state.settings.lastSave = Date.now();
    const serialized = JSON.stringify(state);
    localStorage.setItem(SAVE_KEY, serialized);
    return true;
  } catch {
    return false;
  }
}

/**
 * Reads the save from localStorage and parses it.
 * Returns the state object on success, or null if no save exists or parsing fails.
 */
function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw === null) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Serializes state to JSON, encodes as Base64, and copies to the clipboard.
 * Returns the encoded string (callers may display it as a fallback).
 */
function exportSave(state) {
  const json = JSON.stringify(state);
  const encoded = btoa(unescape(encodeURIComponent(json)));
  // Clipboard API requires secure context; fallback for file://
  try {
    navigator.clipboard.writeText(encoded);
  } catch (e) {
    // Fallback: show a prompt with the encoded save for manual copy
    prompt('Copy this save string (Ctrl+A, Ctrl+C):', encoded);
  }
  return encoded;
}

/**
 * Decodes a Base64 save string and parses the JSON.
 * Validates that the result contains a settings.version field.
 * Returns the parsed state object, or throws an Error with a descriptive message.
 */
function importSave(encoded) {
  let json;
  try {
    json = decodeURIComponent(escape(atob(encoded)));
  } catch {
    throw new Error('Invalid save data: Base64 decoding failed.');
  }

  let parsed;
  try {
    parsed = JSON.parse(json);
  } catch {
    throw new Error('Invalid save data: JSON parsing failed.');
  }

  if (!parsed || !parsed.settings || parsed.settings.version === undefined) {
    throw new Error('Invalid save data: missing settings.version field.');
  }

  return parsed;
}

/**
 * Removes the save entry from localStorage.
 */
function deleteSave() {
  localStorage.removeItem(SAVE_KEY);
}

/**
 * Saves the game if at least 60 seconds have passed since the last save.
 * Returns true if a save was performed, false otherwise.
 */
function autoSave(state) {
  if (Date.now() - state.settings.lastSave >= 60000) {
    return saveGame(state);
  }
  return false;
}


// ============================================================
// EQUIPMENT: ITEM GENERATION
// ============================================================

var _itemIdCounter = 0;

/**
 * Generate a unique item ID string.
 * @returns {string} Unique ID like "item_1678000000000_1"
 */
function generateItemId() {
  _itemIdCounter++;
  return 'item_' + Date.now() + '_' + _itemIdCounter;
}

/**
 * Find the material that corresponds to a given item level.
 * Reverse-iterates so higher-tier materials are checked first.
 * @param {number} iLvl - The item level
 * @param {object} data - The itemsData object
 * @returns {object|null} The matching material object, or null
 */
function getMaterialForILvl(iLvl, data) {
  var materials = data.items.materials;
  for (var i = materials.length - 1; i >= 0; i--) {
    var mat = materials[i];
    if (iLvl >= mat.iLvlRange[0] && iLvl <= mat.iLvlRange[1]) {
      return mat;
    }
  }
  // Fallback: return lowest tier
  return materials[0];
}

/**
 * Check if a material is unlocked based on its gate string.
 * Gate strings map to research.completed entries.
 * @param {object} material - Material object with gate property
 * @param {object} state - Game state
 * @returns {boolean} True if the material is available
 */
function isMaterialUnlocked(material, state) {
  if (!material.gate) return true;

  var gate = material.gate;

  // "any_tN" means at least one tier-N research is completed
  if (gate.indexOf('any_t') === 0) {
    var tierNum = gate.replace('any_t', '');
    var pattern = '_t' + tierNum + '_';
    for (var i = 0; i < state.research.completed.length; i++) {
      if (state.research.completed[i].indexOf(pattern) !== -1) return true;
    }
    return false;
  }

  // "post_convergence" means at least one convergence has happened
  if (gate === 'post_convergence') {
    return (state.prestige && state.prestige.count > 0);
  }

  // Direct research ID check
  return state.research.completed.indexOf(gate) !== -1;
}

/**
 * Roll a rarity for a new item, applying loot bonuses and pity timer.
 * @param {object} state - Game state (for pity counter and loot_bonus)
 * @param {object} data - Full game data (with data.items.rarities and data.items.pity)
 * @param {object} [options] - Optional overrides
 * @param {string} [options.minRarity] - Minimum rarity ID
 * @param {number} [options.bossBonus] - Boss legendary bonus multiplier
 * @returns {object} The selected rarity object
 */
function rollRarity(state, data, options) {
  options = options || {};
  var rarities = data.items.rarities;
  var pity = data.items.pity;
  var pityCounter = state.equipment.pityCounter;

  // Rarity multipliers for loot_bonus scaling
  var rarityMultipliers = {
    uncommon: 1,
    rare: 1.5,
    epic: 2,
    legendary: 3,
    set: 3
  };

  // Calculate loot bonus from equipment (simple sum from equipped items)
  var lootBonus = 0;
  var eqKeys = Object.keys(state.equipment.equipped);
  for (var e = 0; e < eqKeys.length; e++) {
    var eqItem = state.equipment.equipped[eqKeys[e]];
    if (eqItem && eqItem.affixes) {
      for (var a = 0; a < eqItem.affixes.length; a++) {
        if (eqItem.affixes[a].id === 'loot_bonus') {
          lootBonus += eqItem.affixes[a].value;
        }
      }
    }
  }

  // Pity timer: guarantee legendary/set at 75
  if (pityCounter >= pity.guaranteeAt) {
    // Pick legendary or set based on their relative weights
    for (var g = 0; g < rarities.length; g++) {
      if (rarities[g].id === 'legendary') return rarities[g];
    }
  }

  // Pity multiplier
  var pityMult = 1;
  if (pityCounter >= pity.tripleAt) {
    pityMult = 3;
  } else if (pityCounter >= pity.doubleAt) {
    pityMult = 2;
  }

  // Build weighted pool
  var minRarityIndex = 0;
  if (options.minRarity) {
    for (var m = 0; m < rarities.length; m++) {
      if (rarities[m].id === options.minRarity) {
        minRarityIndex = m;
        break;
      }
    }
  }

  var pool = [];
  for (var r = 0; r < rarities.length; r++) {
    if (r < minRarityIndex) continue;
    var rar = rarities[r];
    var w = rar.dropWeight;

    // Apply loot bonus multiplier for uncommon+
    if (rarityMultipliers[rar.id] && lootBonus > 0) {
      w *= (1 + (lootBonus / 100) * rarityMultipliers[rar.id]);
    }

    // Apply pity multiplier to legendary and set
    if (rar.id === 'legendary' || rar.id === 'set') {
      w *= pityMult;
      // Apply boss bonus
      if (options.bossBonus && rar.id === 'legendary') {
        w *= (1 + options.bossBonus);
      }
    }

    pool.push({ weight: w, rarity: rar });
  }

  var picked = weightedRandom(pool);
  return picked ? picked.rarity : rarities[0];
}

/**
 * Roll affixes for an item based on base type weights and material tier.
 * @param {object} baseType - Base type object with weights
 * @param {object} rarity - Rarity object with affixCount
 * @param {object} material - Material object with tier
 * @param {object} data - itemsData object
 * @returns {Array} Array of affix objects {id, name, value}
 */
function rollAffixes(baseType, rarity, material, data) {
  var affixCount = rarity.affixCount;
  if (Array.isArray(affixCount)) {
    affixCount = affixCount[0] + Math.floor(Math.random() * (affixCount[1] - affixCount[0] + 1));
  }

  var tier = String(material.tier);
  var allAffixes = data.items.affixes;
  var flatStats = { arcane_power: true, resilience: true, max_hp: true, hp_regen: true };

  // Build weighted pool from base type weights
  var baseWeights = baseType.weights || {};
  var weightedPool = [];
  var globalPool = [];

  var baseWeightKeys = Object.keys(baseWeights);
  for (var i = 0; i < allAffixes.length; i++) {
    var affix = allAffixes[i];
    if (!affix.tiers[tier]) continue;

    var isInBase = false;
    for (var bw = 0; bw < baseWeightKeys.length; bw++) {
      if (baseWeightKeys[bw] === affix.id) {
        weightedPool.push({ weight: baseWeights[affix.id], affix: affix });
        isInBase = true;
        break;
      }
    }
    if (!isInBase) {
      globalPool.push({ weight: 1, affix: affix });
    }
  }

  var chosen = [];
  var chosenIds = {};

  for (var c = 0; c < affixCount; c++) {
    // Filter out already-chosen affixes
    var available = [];
    for (var w = 0; w < weightedPool.length; w++) {
      if (!chosenIds[weightedPool[w].affix.id]) {
        available.push(weightedPool[w]);
      }
    }

    // Fallback to global pool if weighted pool is exhausted
    if (available.length === 0) {
      for (var g = 0; g < globalPool.length; g++) {
        if (!chosenIds[globalPool[g].affix.id]) {
          available.push(globalPool[g]);
        }
      }
    }

    if (available.length === 0) break;

    var pick = weightedRandom(available);
    if (!pick) break;

    var aff = pick.affix;
    var range = aff.tiers[tier];
    var val = range[0] + Math.random() * (range[1] - range[0]);

    // Round integers for flat stats, 1 decimal for others
    if (flatStats[aff.id]) {
      val = Math.round(val);
    } else {
      val = Math.round(val * 10) / 10;
    }

    chosen.push({ id: aff.id, name: aff.name, value: val });
    chosenIds[aff.id] = true;
  }

  return chosen;
}

/**
 * Generate a complete item.
 * 11-step pipeline: iLvl → material → rarity → legendary/set check → slot → base → affixes → flavor → build object.
 * @param {object} state - Game state
 * @param {object} data - Full game data (data.items = itemsData)
 * @param {object} [options] - Generation options
 * @param {number} [options.iLvlMin] - Minimum item level
 * @param {number} [options.iLvlMax] - Maximum item level
 * @param {string} [options.forcedMaterial] - Force a specific material ID
 * @param {string} [options.forcedRarity] - Force a specific rarity ID
 * @param {string} [options.forcedSlot] - Force a specific slot
 * @param {string} [options.minRarity] - Minimum rarity for roll
 * @param {number} [options.bossBonus] - Boss legendary bonus
 * @returns {object} The generated item
 */
function generateItem(state, data, options) {
  options = options || {};
  var itemsD = data.items;

  // Steps 1-2: Roll iLvl
  var iLvlMin = options.iLvlMin || 1;
  var iLvlMax = options.iLvlMax || 30;
  var iLvl = iLvlMin + Math.floor(Math.random() * (iLvlMax - iLvlMin + 1));

  // Step 3: Get material
  var material;
  if (options.forcedMaterial) {
    for (var fm = 0; fm < itemsD.materials.length; fm++) {
      if (itemsD.materials[fm].id === options.forcedMaterial) {
        material = itemsD.materials[fm];
        break;
      }
    }
  }
  if (!material) {
    material = getMaterialForILvl(iLvl, data);
  }

  // Step 4: Roll rarity
  var rarity;
  if (options.forcedRarity) {
    for (var fr = 0; fr < itemsD.rarities.length; fr++) {
      if (itemsD.rarities[fr].id === options.forcedRarity) {
        rarity = itemsD.rarities[fr];
        break;
      }
    }
  }
  if (!rarity) {
    rarity = rollRarity(state, data, { minRarity: options.minRarity, bossBonus: options.bossBonus });
  }

  // Step 5: Legendary check
  if (rarity.id === 'legendary') {
    // Find eligible legendaries by material
    var eligibleLegendaries = [];
    for (var el = 0; el < itemsD.legendaries.length; el++) {
      var leg = itemsD.legendaries[el];
      if (leg.material === material.id) {
        eligibleLegendaries.push(leg);
      }
    }

    if (eligibleLegendaries.length > 0) {
      var chosenLeg = eligibleLegendaries[Math.floor(Math.random() * eligibleLegendaries.length)];

      // Determine affix count
      var legAffixCount = chosenLeg.affixCount;
      if (Array.isArray(legAffixCount)) {
        legAffixCount = legAffixCount[0] + Math.floor(Math.random() * (legAffixCount[1] - legAffixCount[0] + 1));
      }

      // Find base type for the slot
      var legSlotData = itemsD.slots[chosenLeg.slot];
      var legBaseTypeId = legSlotData.baseTypes[Math.floor(Math.random() * legSlotData.baseTypes.length)];
      var legBaseType = itemsD.baseTypes[legBaseTypeId];

      // Roll affixes using a temporary rarity with the correct count
      var legRarityTemp = { affixCount: legAffixCount };
      var legAffixes = rollAffixes(legBaseType, legRarityTemp, material, data);

      // Update codex
      if (state.equipment.codex.indexOf(chosenLeg.id) === -1) {
        state.equipment.codex.push(chosenLeg.id);
      }

      // Reset pity
      state.equipment.pityCounter = 0;

      return {
        id: generateItemId(),
        legendaryId: chosenLeg.id,
        name: chosenLeg.name,
        slot: chosenLeg.slot,
        baseType: legBaseTypeId,
        material: material.id,
        materialName: material.name,
        materialColor: material.color,
        rarity: 'legendary',
        rarityColor: rarity.color,
        iLvl: chosenLeg.iLvl,
        affixes: legAffixes,
        uniqueEffect: chosenLeg.uniqueEffect,
        flavorText: chosenLeg.flavorText,
        identified: false,
        locked: false
      };
    }
    // No eligible legendary found — fall through to normal generation but keep rarity
  }

  // Step 5b: Set check
  if (rarity.id === 'set') {
    var eligibleSets = [];
    for (var es = 0; es < itemsD.sets.length; es++) {
      var setDef = itemsD.sets[es];
      for (var sp = 0; sp < setDef.pieces.length; sp++) {
        var piece = setDef.pieces[sp];
        if (piece.material === material.id) {
          eligibleSets.push({ set: setDef, piece: piece });
        }
      }
    }

    if (eligibleSets.length > 0) {
      // Smart loot: 3x weight for missing pieces
      var setPool = [];
      for (var sw = 0; sw < eligibleSets.length; sw++) {
        var entry = eligibleSets[sw];
        var hasPiece = false;

        // Check inventory
        for (var inv = 0; inv < state.equipment.inventory.length; inv++) {
          if (state.equipment.inventory[inv].setPieceId === entry.piece.id) {
            hasPiece = true;
            break;
          }
        }

        // Check equipped
        if (!hasPiece) {
          var eqSlotKeys = Object.keys(state.equipment.equipped);
          for (var ek = 0; ek < eqSlotKeys.length; ek++) {
            var eq = state.equipment.equipped[eqSlotKeys[ek]];
            if (eq && eq.setPieceId === entry.piece.id) {
              hasPiece = true;
              break;
            }
          }
        }

        setPool.push({ weight: hasPiece ? 1 : 3, entry: entry });
      }

      var setPick = weightedRandom(setPool);
      if (setPick) {
        var chosenSet = setPick.entry.set;
        var chosenPiece = setPick.entry.piece;

        // Determine affix count
        var setAffixCount = chosenPiece.affixCount;
        if (Array.isArray(setAffixCount)) {
          setAffixCount = setAffixCount[0] + Math.floor(Math.random() * (setAffixCount[1] - setAffixCount[0] + 1));
        }

        // Find base type for the slot
        var setSlotKey = chosenPiece.slot;
        // Handle ring slots
        if (setSlotKey === 'ring') setSlotKey = 'ring1';
        var setSlotData = itemsD.slots[setSlotKey];
        var setBaseTypeId = setSlotData.baseTypes[Math.floor(Math.random() * setSlotData.baseTypes.length)];
        var setBaseType = itemsD.baseTypes[setBaseTypeId];

        // Roll affixes
        var setRarityTemp = { affixCount: setAffixCount };
        var setAffixes = rollAffixes(setBaseType, setRarityTemp, material, data);

        // Reset pity
        state.equipment.pityCounter = 0;

        return {
          id: generateItemId(),
          setId: chosenSet.id,
          setName: chosenSet.name,
          setPieceId: chosenPiece.id,
          name: chosenSet.name + ' ' + itemsD.baseTypes[setBaseTypeId].name,
          slot: chosenPiece.slot,
          baseType: setBaseTypeId,
          material: material.id,
          materialName: material.name,
          materialColor: material.color,
          rarity: 'set',
          rarityColor: rarity.color,
          iLvl: chosenPiece.iLvl,
          affixes: setAffixes,
          uniqueEffect: null,
          flavorText: chosenSet.flavor,
          identified: false,
          locked: false
        };
      }
    }
    // No eligible set pieces — fall through to epic
    for (var fe = 0; fe < itemsD.rarities.length; fe++) {
      if (itemsD.rarities[fe].id === 'epic') {
        rarity = itemsD.rarities[fe];
        break;
      }
    }
  }

  // Step 6: Roll random slot
  var slotKeys = Object.keys(itemsD.slots);
  var slot = options.forcedSlot || slotKeys[Math.floor(Math.random() * slotKeys.length)];

  // Step 7: Roll base type from slot
  var slotData = itemsD.slots[slot];
  var baseTypeId = slotData.baseTypes[Math.floor(Math.random() * slotData.baseTypes.length)];
  var baseType = itemsD.baseTypes[baseTypeId];

  // Steps 8-9: Roll affixes
  var affixes = rollAffixes(baseType, rarity, material, data);

  // Step 10: Flavor text for Uncommon+
  var flavorText = null;
  var rarityOrder = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'set'];
  var rarityIdx = rarityOrder.indexOf(rarity.id);
  if (rarityIdx >= 1) {
    var flavorPool = itemsD.flavorText;
    flavorText = flavorPool[Math.floor(Math.random() * flavorPool.length)];
  }

  // Step 11: Build item object
  var itemName = material.name + ' ' + baseType.name;
  var identified = (rarityIdx < 2); // common and uncommon are auto-identified

  // Increment pity counter for non-legendary/set
  state.equipment.pityCounter++;

  return {
    id: generateItemId(),
    legendaryId: null,
    setId: null,
    setPieceId: null,
    setName: null,
    name: itemName,
    slot: slot,
    baseType: baseTypeId,
    material: material.id,
    materialName: material.name,
    materialColor: material.color,
    rarity: rarity.id,
    rarityColor: rarity.color,
    iLvl: iLvl,
    affixes: affixes,
    uniqueEffect: null,
    flavorText: flavorText,
    identified: identified,
    locked: false
  };
}


// ── Equipment Bonus Cache ──
var _equipBonusCache = null;
var _equipBonusDirty = true;

/**
 * Mark the equipment bonus cache as dirty (call when equipment changes).
 */
function invalidateEquipCache() {
  _equipBonusDirty = true;
}

/**
 * Calculate total stat bonuses from all equipped items, including set bonuses.
 * Results are cached until invalidateEquipCache() is called.
 * @param {object} state - Game state
 * @param {object} data - Full game data (data.items = itemsData)
 * @returns {object} Bonuses object with all stat fields, set_bonuses, unique_effects
 */
function calculateEquipmentBonuses(state, data) {
  if (!_equipBonusDirty && _equipBonusCache) return _equipBonusCache;

  var bonuses = {
    arcane_power: 0,
    spell_crit_chance: 0,
    spell_crit_damage: 0,
    resilience: 0,
    max_hp: 0,
    hp_regen: 0,
    speed: 0,
    cdr: 0,
    instability: 0,
    evasion: 0,
    mana_efficiency: 0,
    resource_rate: 0,
    loot_bonus: 0,
    set_bonuses: [],
    unique_effects: []
  };

  var setCounts = {};
  var slotKeys = Object.keys(state.equipment.equipped);

  // Iterate all equipped items
  for (var s = 0; s < slotKeys.length; s++) {
    var item = state.equipment.equipped[slotKeys[s]];
    if (!item) continue;

    // Sum affix values
    if (item.affixes) {
      for (var a = 0; a < item.affixes.length; a++) {
        var aff = item.affixes[a];
        if (bonuses[aff.id] !== undefined) {
          bonuses[aff.id] += aff.value;
        }
      }
    }

    // Track unique effects from legendaries
    if (item.uniqueEffect) {
      bonuses.unique_effects.push(item.uniqueEffect);
    }

    // Count set pieces per set ID
    if (item.setId) {
      if (!setCounts[item.setId]) setCounts[item.setId] = 0;
      setCounts[item.setId]++;
    }
  }

  // Evaluate set bonuses
  var itemSets = data.items.sets;
  for (var si = 0; si < itemSets.length; si++) {
    var setDef = itemSets[si];
    var count = setCounts[setDef.id] || 0;
    if (count < 2) continue;

    var thresholdKeys = Object.keys(setDef.bonuses);
    for (var t = 0; t < thresholdKeys.length; t++) {
      var threshold = parseInt(thresholdKeys[t], 10);
      if (count >= threshold) {
        var bonus = setDef.bonuses[thresholdKeys[t]];

        // Add stats from set bonus
        if (bonus.stats) {
          var statKeys = Object.keys(bonus.stats);
          for (var sk = 0; sk < statKeys.length; sk++) {
            var statKey = statKeys[sk];
            if (bonuses[statKey] !== undefined) {
              bonuses[statKey] += bonus.stats[statKey];
            }
          }
        }

        // Add special set bonuses
        if (bonus.special) {
          bonuses.set_bonuses.push({
            setId: setDef.id,
            setName: setDef.name,
            threshold: threshold,
            special: bonus.special
          });
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

/**
 * Determine the quality tier of an affix roll relative to its possible range.
 * @param {object} affix - The affix object {id, name, value}
 * @param {object} material - The material object (for tier)
 * @param {object} data - itemsData object
 * @returns {string|null} 'perfect', 'exceptional', 'great', 'good', or null (below 50%)
 */
function getAffixQuality(affix, material, data) {
  // Find the affix definition
  var affixDef = null;
  var allAffixes = data.items.affixes;
  for (var i = 0; i < allAffixes.length; i++) {
    if (allAffixes[i].id === affix.id) {
      affixDef = allAffixes[i];
      break;
    }
  }
  if (!affixDef) return null;

  var tier = String(material.tier);
  var range = affixDef.tiers[tier];
  if (!range) return null;

  var min = range[0];
  var max = range[1];

  // Avoid division by zero
  if (max === min) {
    return affix.value >= max ? 'perfect' : null;
  }

  var percentile = (affix.value - min) / (max - min) * 100;

  if (percentile >= 100) return 'perfect';
  if (percentile >= 90) return 'exceptional';
  if (percentile >= 75) return 'great';
  if (percentile >= 50) return 'good';
  return null;
}


// ============================================================
// UI: NOTIFICATIONS
// ============================================================

// ui/notifications.js
// Journal entry management and toast notifications for the game's narrative log.

const MAX_JOURNAL_ENTRIES = 100;
const MAX_VISIBLE_ENTRIES = 50;
var _journalChangeCounter = 0;

/**
 * Pushes a new entry to state.journal.
 * Trims the oldest entry if the log exceeds MAX_JOURNAL_ENTRIES.
 *
 * @param {object} state - Live game state.
 * @param {string} text  - The message to log.
 * @param {string} type  - Entry type: 'info' | 'discovery' | 'combat' | 'event'
 */
function addJournalEntry(state, text, type = 'info') {
  state.journal.push({ text, type, timestamp: Date.now() });
  if (state.journal.length > MAX_JOURNAL_ENTRIES) {
    state.journal.shift();
  }
  _journalChangeCounter++;
}

// ---------------------------------------------------------------------------
// Tutorial: Milestone Narration
// ---------------------------------------------------------------------------

var _milestoneQueue = [];
var _lastMilestoneDelivery = 0;

function _countT1Completed(state) {
  var count = 0;
  for (var i = 0; i < state.research.completed.length; i++) {
    if (state.research.completed[i].includes('_t1_')) count++;
  }
  return count;
}

var MILESTONES = [
  { id: 'game_start', text: 'The dust settles. The candles remember how to burn. After all these ages, someone has found the Study.', check: function(s) { return true; } },
  { id: 'first_10_mana', text: 'You feel it gathering \u2014 raw mana, drawn from the walls themselves. The Study is feeding you. It wants something in return: knowledge.', check: function(s) { return s.resources.mana && s.resources.mana.amount >= 10; } },
  { id: 'first_research_started', text: 'The grimoire opens to your touch. The page drinks your mana like parched earth drinks rain. Now you wait \u2014 the knowledge must steep.', check: function(s) { return s.research.inProgress !== null; } },
  { id: 'first_research_complete', text: 'The Study shudders with approval. You can feel something new \u2014 a device, waiting to be built. The Generators page calls to you.', check: function(s) { return s.research.completed.length >= 1; } },
  { id: 'first_generator', text: 'The apparatus hums. Chronos Essence drips like honey from a wound in time. The Study grows warmer.', check: function(s) { for (var k in s.generators) { if (s.generators[k].count > 0) return true; } return false; } },
  { id: 'wave1_spatial', text: 'A new section of the grimoire reveals itself. The Study has more to teach \u2014 it always did. You simply weren\u2019t ready before.', check: function(s) { return s.research.completed.includes('temporal_t1_1'); } },
  { id: 'wave2_mind_vital', text: 'More pages reveal themselves. The grimoire unfolds like a flower \u2014 Mind and Life, intertwined and waiting.', check: function(s) { return _countT1Completed(s) >= 2; } },
  { id: 'wave3_remaining', text: 'The final chapters lay bare. Shadow, Chaos, Order \u2014 the deepest arts, the most dangerous. The Study trusts you now.', check: function(s) { return _countT1Completed(s) >= 4; } },
  { id: 'combat_available', text: 'Something stirs in the deeper halls. The Study\u2019s wards have weakened with your meddling. Prepare yourself \u2014 combat lies ahead.', check: function(s) { return s.research.completed.length >= 3; } },
  { id: 'first_combat_started', text: 'The shadows coalesce. This was always the price of knowledge \u2014 something notices, and something comes.', check: function(s) { return (s.discoveries.counters.combat_win || 0) > 0 || (s.discoveries.counters.combat_loss || 0) > 0; } },
  { id: 'first_combat_win', text: 'The entity dissolves. The Study absorbs what remains, and you feel\u2026 stronger. This is the cycle: study, build, fight, grow.', check: function(s) { return (s.discoveries.counters.combat_win || 0) > 0; } },
  { id: 'first_combat_loss', text: 'Pain, then darkness, then candlelight again. The Study does not let its arcanists die \u2014 not permanently. Learn from this.', check: function(s) { return (s.discoveries.counters.combat_loss || 0) > 0; } },
  { id: 'discipline_mastered', text: 'You have mastered the fundamentals of a discipline. Deeper mysteries await \u2014 but they demand more.', check: function(s) { var byDisc = {}; for (var i = 0; i < s.research.completed.length; i++) { var id = s.research.completed[i]; if (id.includes('_t1_')) { var disc = id.replace(/_t1_.*$/, ''); byDisc[disc] = (byDisc[disc] || 0) + 1; } } for (var d in byDisc) { if (byDisc[d] >= 3) return true; } return false; } },
  { id: 'first_t2', text: 'Deeper currents now. The knowledge grows heavier, richer. You begin to see how the disciplines connect.', check: function(s) { return s.research.completed.some(function(id) { return id.includes('_t2_'); }); } },
  { id: 'first_discovery', text: 'A secret, hidden between the lines. The Study rewards those who look carefully.', check: function(s) { return s.discoveries.found && s.discoveries.found.length > 0; } },
  { id: 'five_generators', text: 'The apparatus choir swells. Resources flow like rivers now. The Study remembers when it was this alive.', check: function(s) { var t = 0; for (var k in s.generators) { t += (s.generators[k].count || 0); } return t >= 5; } },
  { id: 'first_t3', text: 'You tread where few have dared. The convergence point draws closer \u2014 you can almost taste it.', check: function(s) { return s.research.completed.some(function(id) { return id.includes('_t3_'); }); } },
  { id: 'first_t4', text: 'The final tier. Beyond this lies only the Grand Convergence \u2014 the unmaking and remaking of all you\u2019ve built.', check: function(s) { return s.research.completed.some(function(id) { return id.includes('_t4_'); }); } },
  { id: 'prestige_available', text: 'The Study whispers of the Grand Convergence. Destroy everything. Rebuild from enlightenment. It is the only way forward.', check: function(s) { return s.research.completed.some(function(id) { return id.includes('_t4_'); }); } },
  { id: 'first_convergence', text: 'Everything dissolves. Everything begins again. But you remember now. You carry the light of what came before.', check: function(s) { return (s.prestige && s.prestige.convergenceCount) > 0; } }
];

function checkMilestones(state) {
  if (state.tutorial.completed) return;
  for (var i = 0; i < MILESTONES.length; i++) {
    var m = MILESTONES[i];
    if (state.tutorial.seenMilestones.indexOf(m.id) !== -1) continue;
    try {
      if (m.check(state)) {
        state.tutorial.seenMilestones.push(m.id);
        // Deliver game_start immediately (no delay)
        if (m.id === 'game_start') {
          addJournalEntry(state, m.text, 'narrator');
          continue;
        }
        _milestoneQueue.push(m);
      }
    } catch(e) { /* skip broken check */ }
  }
}

function deliverMilestones(state) {
  if (_milestoneQueue.length === 0) return;
  var now = Date.now();
  if (now - _lastMilestoneDelivery < 5000) return;
  var m = _milestoneQueue.shift();
  addJournalEntry(state, m.text, 'narrator');
  _lastMilestoneDelivery = now;
}

// ---------------------------------------------------------------------------
// Tutorial: Lore Snippets
// ---------------------------------------------------------------------------

var _loreRotationIndex = 0;
var _lastLoreRotation = Date.now();
var GENERIC_LORE = [
  'The symbols rearrange themselves as you watch\u2026',
  'You feel the knowledge settling into your mind like sediment in still water\u2026',
  'The grimoire page grows warm beneath your fingers\u2026',
  'Faint whispers in a language older than words\u2026',
  'The ink shimmers, rearranging into patterns you almost recognize\u2026',
  'A distant bell tolls once, then silence\u2026',
  'The candle flames lean toward the grimoire, as if curious\u2026',
  'Something clicks into place in the back of your mind\u2026',
  'The air thickens with the scent of old parchment and lightning\u2026',
  'Time moves differently near the grimoire. You\u2019re not sure how long you\u2019ve been reading\u2026'
];

function getLoreSnippet(state, data) {
  var now = Date.now();
  if (now - _lastLoreRotation >= 10000) {
    _loreRotationIndex++;
    _lastLoreRotation = now;
  }
  var ip = state.research.inProgress;
  if (ip) {
    var node = findNode(data, ip.nodeId);
    if (node && node.discovery) {
      var lines = [node.discovery].concat(GENERIC_LORE);
      return lines[_loreRotationIndex % lines.length];
    }
  }
  return GENERIC_LORE[_loreRotationIndex % GENERIC_LORE.length];
}

// ---------------------------------------------------------------------------
// Tutorial: Objectives Tracker ("Current Pursuit")
// ---------------------------------------------------------------------------

var OBJECTIVES = [
  { text: 'Gather 10 mana', check: function(s) { return s.resources.mana && s.resources.mana.amount >= 10; }, progress: function(s) { var amt = (s.resources.mana && s.resources.mana.amount) || 0; return Math.min(Math.floor(amt), 10) + ' / 10'; }, reward: 0 },
  { text: 'Research Temporal Basics', check: function(s) { return s.research.completed.includes('temporal_t1_1'); }, progress: null, reward: 0 },
  { text: 'Purchase a Ritual Hourglass', check: function(s) { return s.generators.temporal_gen_t1 && s.generators.temporal_gen_t1.count >= 1; }, progress: null, reward: 5 },
  { text: 'Accumulate 25 Chronos Essence', check: function(s) { return s.resources.chronos_essence && s.resources.chronos_essence.amount >= 25; }, progress: function(s) { var amt = (s.resources.chronos_essence && s.resources.chronos_essence.amount) || 0; return Math.floor(Math.min(amt, 25)) + ' / 25'; }, reward: 0 },
  { text: 'Research another discipline\u2019s basics', check: function(s) { return s.research.completed.some(function(id) { return id !== 'temporal_t1_1' && id.includes('_t1_'); }); }, progress: null, reward: 10 },
  { text: 'Own 3 generators', check: function(s) { var t = 0; for (var k in s.generators) { t += (s.generators[k].count || 0); } return t >= 3; }, progress: function(s) { var t = 0; for (var k in s.generators) { t += (s.generators[k].count || 0); } return Math.min(t, 3) + ' / 3'; }, reward: 0 },
  { text: 'Complete 3 research nodes', check: function(s) { return s.research.completed.length >= 3; }, progress: function(s) { return Math.min(s.research.completed.length, 3) + ' / 3'; }, reward: 0 },
  { text: 'Complete a Tier 2 research node', check: function(s) { return s.research.completed.some(function(id) { return id.includes('_t2_'); }); }, progress: null, reward: 0 },
  { text: 'Defeat your first encounter', check: function(s) { return (s.discoveries.counters.combat_win || 0) >= 1; }, progress: null, reward: 25 },
  { text: 'Find a Discovery', check: function(s) { return s.discoveries.found && s.discoveries.found.length >= 1; }, progress: null, reward: 50 },
  { text: 'Master a discipline\u2019s basics', check: function(s) { var byDisc = {}; for (var i = 0; i < s.research.completed.length; i++) { var id = s.research.completed[i]; if (id.includes('_t1_')) { var disc = id.replace(/_t1_.*$/, ''); byDisc[disc] = (byDisc[disc] || 0) + 1; } } for (var d in byDisc) { if (byDisc[d] >= 3) return true; } return false; }, progress: null, reward: 0 },
  { text: 'Perform the Grand Convergence', check: function(s) { return (s.prestige && s.prestige.convergenceCount) >= 1; }, progress: null, reward: 0 }
];

function checkObjective(state) {
  if (state.tutorial.completed) return;
  var idx = state.tutorial.currentObjective;
  if (idx >= OBJECTIVES.length) { state.tutorial.completed = true; return; }
  var obj = OBJECTIVES[idx];
  try {
    if (obj.check(state)) {
      if (obj.reward > 0 && state.resources.mana) {
        state.resources.mana.amount += obj.reward;
        addJournalEntry(state, 'Pursuit complete! +' + obj.reward + ' mana', 'info');
      } else if (idx === OBJECTIVES.length - 1) {
        addJournalEntry(state, 'All pursuits complete. The Study has nothing left to teach you about beginnings.', 'narrator');
      }
      state.tutorial.currentObjective = idx + 1;
      if (state.tutorial.currentObjective >= OBJECTIVES.length) {
        state.tutorial.completed = true;
      }
    }
  } catch(e) { /* skip broken check */ }
}

// ---------------------------------------------------------------------------
// Tutorial: Ambient Journal Entries
// ---------------------------------------------------------------------------

var _lastActionTime = Date.now();
var _lastAmbientTime = 0;
var _ambientCount = 0;
var MAX_AMBIENT_PER_SESSION = 10;

var AMBIENT_LINES = [
  'The candles flicker. Something shifts in the deeper halls.',
  'A faint hum rises from your generators. The Study seems pleased.',
  'Dust motes drift through a beam of light that has no source.',
  'The grimoire\u2019s pages turn on their own, then stop.',
  'A distant sound \u2014 like a door closing in a room that doesn\u2019t exist.',
  'The shadows are longer than they should be at this hour.',
  'You catch the scent of old libraries and distant storms.',
  'One of the candles gutters and relights itself in a different color.',
  'The walls breathe. You\u2019re almost certain of it now.',
  'A symbol you don\u2019t recognize glows briefly on the floor, then fades.'
];

function checkAmbient(state) {
  if (_ambientCount >= MAX_AMBIENT_PER_SESSION) return;
  if (state.combat.active) return;
  var now = Date.now();
  if (now - _lastActionTime < 60000) return;
  if (now - _lastAmbientTime < 60000) return;
  _lastAmbientTime = now;
  _ambientCount++;
  var line = AMBIENT_LINES[Math.floor(Math.random() * AMBIENT_LINES.length)];
  addJournalEntry(state, line, 'ambient');
}

/**
 * Returns the last `count` entries from state.journal, newest first.
 *
 * @param {object} state - Live game state.
 * @param {number} count - Number of entries to return.
 * @returns {Array} Slice of journal entries in reverse chronological order.
 */
function getJournalEntries(state, count) {
  return state.journal.slice(-count).reverse();
}

/**
 * Formats a timestamp as a human-readable relative time string.
 *
 * @param {number} timestamp - Unix timestamp in ms.
 * @returns {string} e.g. "just now", "1m ago", "5m ago"
 */
function _relativeTime(timestamp) {
  const diffMs = Date.now() - timestamp;
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 30) return 'just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 1) return 'just now';
  return `${diffMin}m ago`;
}

/** Escapes HTML special characters to prevent XSS in journal entries. */
function _escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Renders journal entries into the #journal-entries element.
 * Shows entries newest first, up to MAX_VISIBLE_ENTRIES.
 * Each entry is styled by type and includes a relative timestamp.
 *
 * @param {Element} container - The container element (unused; always targets #journal-entries).
 * @param {object}  state     - Live game state with state.journal array.
 */
var _prevJournalCounter = -1;

function renderJournal(container, state) {
  const el = (container && container.id === 'journal-entries')
    ? container
    : document.getElementById('journal-entries');
  if (!el) return;

  // Only re-render when a new entry has been added
  if (_journalChangeCounter === _prevJournalCounter) return;
  _prevJournalCounter = _journalChangeCounter;

  const entries = getJournalEntries(state, MAX_VISIBLE_ENTRIES);
  if (entries.length === 0) return;

  let html = '';
  for (const entry of entries) {
    const typeClass = entry.type ? `journal-${entry.type}` : 'journal-info';
    const safeText  = _escapeHtml(entry.text);
    const timeStr   = entry.timestamp ? _relativeTime(entry.timestamp) : '';
    html += `<p class="journal-entry ${typeClass}">${safeText}<span class="journal-time">${timeStr}</span></p>`;
  }
  el.innerHTML = html;
}

/**
 * Shows a brief toast notification at the top-center of the viewport.
 * Multiple toasts stack vertically. Auto-removes after 3 seconds.
 *
 * @param {string} message - The message to display.
 * @param {string} type    - 'info' (default) | 'discovery' | 'combat' | 'event'
 */
function showToast(message, type = 'info') {
  // Find or create the shared toast container.
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast' + (type !== 'info' ? ` toast-${type}` : '');
  toast.textContent = message;
  container.appendChild(toast);

  // Auto-remove after 3 seconds (matches the CSS toastFadeOut animation at 2.7s).
  setTimeout(() => {
    toast.remove();
    // Clean up container when empty.
    if (container.children.length === 0) {
      container.remove();
    }
  }, 3000);
}


// ============================================================
// ENGINE: RESOURCES
// ============================================================

// engine/resources.js
// Handles passive resource generation, generator purchases/upgrades, and spending.

/**
 * Returns the current multiplier for a given resource.
 * Falls back to 1 if no multiplier is recorded.
 */
function getMultiplier(state, resourceId) {
  return state.multipliers[resourceId] || 1;
}

/**
 * Ensures a resource slot exists in state.resources.
 */
function ensureResource(state, id) {
  if (!state.resources[id]) {
    state.resources[id] = { amount: 0, totalEarned: 0, totalSpent: 0 };
  }
}

/**
 * Ensures a generator slot exists in state.generators.
 */
function ensureGenerator(state, id) {
  if (!state.generators[id]) {
    state.generators[id] = { count: 0, level: 1 };
  }
}

/**
 * Called once per game tick (may be called multiple times per wall-clock second
 * during convergence burst).
 *
 * 1. Applies base_rate * multiplier for every resource definition.
 * 2. Applies generator output for every generator the player owns.
 * 3. Updates totalEarned for resources that increased.
 */
function resourcesTick(state, data) {
  // data.resources is the parsed resources.json: { resources: [...], generators: [...] }
  const resourceDefs = (data.resources && data.resources.resources) || [];
  const generatorDefs = (data.resources && data.resources.generators) || [];

  // --- 1. Base passive income ---
  for (const def of resourceDefs) {
    const { id, base_rate } = def;
    if (!base_rate) continue; // skip zero-rate resources
    ensureResource(state, id);
    const gain = base_rate * getMultiplier(state, id);
    state.resources[id].amount += gain;
    state.resources[id].totalEarned += gain;
  }

  // --- 2. Generator output ---
  for (const def of generatorDefs) {
    const { id, base_output, output_resource } = def;
    const genState = state.generators[id];
    if (!genState || genState.count <= 0) continue;

    ensureResource(state, output_resource);

    const levelMultiplier = 1 + 0.5 * (genState.level - 1);
    const gain =
      base_output * levelMultiplier * genState.count * getMultiplier(state, output_resource);

    state.resources[output_resource].amount += gain;
    state.resources[output_resource].totalEarned += gain;
  }
}

/**
 * Returns the current per-second generation rate for a resource:
 * base_rate * multiplier  +  sum of all generator contributions.
 */
function getGenerationRate(state, data, resourceId) {
  const resourceDefs = (data.resources && data.resources.resources) || [];
  const generatorDefs = (data.resources && data.resources.generators) || [];

  // Base rate
  const def = resourceDefs.find((r) => r.id === resourceId);
  const baseRate = def ? (def.base_rate || 0) * getMultiplier(state, resourceId) : 0;

  // Generator contributions
  const genRate = generatorDefs
    .filter((g) => g.output_resource === resourceId)
    .reduce((sum, g) => {
      const genState = state.generators[g.id];
      if (!genState || genState.count <= 0) return sum;
      const levelMultiplier = 1 + 0.5 * (genState.level - 1);
      return (
        sum + g.base_output * levelMultiplier * genState.count * getMultiplier(state, resourceId)
      );
    }, 0);

  return baseRate + genRate;
}

/**
 * Returns true if the player can afford all costs in the cost object.
 * cost: { resourceId: amount, ... }
 */
function canAfford(state, cost) {
  for (const [resourceId, amount] of Object.entries(cost)) {
    const owned = state.resources[resourceId] ? state.resources[resourceId].amount : 0;
    if (owned < amount) return false;
  }
  return true;
}

/**
 * Deducts each resource in cost from state and updates totalSpent.
 * Caller must verify affordability before calling this.
 */
function spend(state, cost) {
  for (const [resourceId, amount] of Object.entries(cost)) {
    ensureResource(state, resourceId);
    state.resources[resourceId].amount -= amount;
    state.resources[resourceId].totalSpent += amount;
  }
}

/**
 * Attempts to buy one unit of a generator.
 * Cost = each value in base_cost * 1.15^(currentCount).
 * Returns true on success, false if not affordable or definition missing.
 */
function buyGenerator(state, data, generatorId) {
  const generatorDefs = (data.resources && data.resources.generators) || [];
  const def = generatorDefs.find((g) => g.id === generatorId);
  if (!def) return false;

  ensureGenerator(state, generatorId);
  const currentCount = state.generators[generatorId].count;

  // Scale each cost component by 1.15^count
  const scaleFactor = Math.pow(1.15, currentCount);
  const cost = {};
  for (const [resourceId, baseAmount] of Object.entries(def.base_cost)) {
    cost[resourceId] = baseAmount * scaleFactor;
  }

  if (!canAfford(state, cost)) return false;

  spend(state, cost);
  state.generators[generatorId].count += 1;
  return true;
}

/**
 * Attempts to upgrade a generator by one level.
 * Cost = each value in upgrade_cost * 2^(currentLevel - 1).
 * Returns true on success, false if max level reached, not affordable, or definition missing.
 */
function upgradeGenerator(state, data, generatorId) {
  const generatorDefs = (data.resources && data.resources.generators) || [];
  const def = generatorDefs.find((g) => g.id === generatorId);
  if (!def) return false;

  ensureGenerator(state, generatorId);
  const genState = state.generators[generatorId];

  if (genState.level >= def.max_level) return false;

  // Scale each upgrade cost component by 2^(level - 1)
  const scaleFactor = Math.pow(2, genState.level - 1);
  const cost = {};
  for (const [resourceId, baseAmount] of Object.entries(def.upgrade_cost)) {
    cost[resourceId] = baseAmount * scaleFactor;
  }

  if (!canAfford(state, cost)) return false;

  spend(state, cost);
  genState.level += 1;
  return true;
}


// ============================================================
// ENGINE: RESEARCH
// ============================================================

// engine/research.js
// Handles research tree progression, node unlocking, and effect application.


// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Returns the speed multiplier for research based on prestige upgrades.
 * Each level of quickened_mind is 10% faster, so the duration multiplier is
 * 1 / (1 + level * 0.1).
 */
function getResearchSpeedMultiplier(state) {
  const upgrades = (state.prestige && state.prestige.upgrades) || {};
  const level = upgrades.quickened_mind ? upgrades.quickened_mind : 0;
  return 1 / (1 + level * 0.1);
}

/**
 * Finds a node by id from data.disciplines.nodes.
 * Returns undefined if not found.
 */
function findNode(data, nodeId) {
  if (data._nodeMap) return data._nodeMap[nodeId];
  const nodes = (data.disciplines && data.disciplines.nodes) || [];
  return nodes.find((n) => n.id === nodeId);
}

/**
 * Returns true if a discipline has at least one Tier-2 node in completed.
 */
function hasTier2InDiscipline(state, data, disciplineId) {
  const nodes = (data.disciplines && data.disciplines.nodes) || [];
  return nodes.some(
    (n) =>
      n.discipline === disciplineId &&
      n.tier === 2 &&
      state.research.completed.includes(n.id)
  );
}

/**
 * Returns true if the hidden-node synergy prerequisite is satisfied:
 * both disciplines named in synergy_pair each have at least one T2 node completed.
 */
function synergyPrereqMet(state, data, node) {
  if (!node.hidden || !Array.isArray(node.synergy_pair)) return true;
  return node.synergy_pair.every((disciplineId) =>
    hasTier2InDiscipline(state, data, disciplineId)
  );
}

// ---------------------------------------------------------------------------
// Exported functions
// ---------------------------------------------------------------------------

/**
 * Called once per game tick.
 * Checks whether the in-progress research node has completed.
 */
function researchTick(state, data) {
  const inProgress = state.research.inProgress;
  if (!inProgress) return;

  const { nodeId, startTime, duration } = inProgress;
  const effectiveDuration = duration * getResearchSpeedMultiplier(state);

  if (Date.now() >= startTime + effectiveDuration * 1000) {
    // Mark as complete
    state.research.completed.push(nodeId);

    // Apply node effects
    const node = findNode(data, nodeId);
    if (node && Array.isArray(node.effects)) {
      applyEffects(state, data, node.effects);
    }

    // Clear in-progress slot
    state.research.inProgress = null;

    // Journal notification
    const nodeName = node ? node.name : nodeId;
    addJournalEntry(state, `Research complete: ${nodeName}`, 'info');
  }
}

/**
 * Applies an array of effect objects to the game state.
 *
 * Supported effect types:
 *   resource_multiplier  — multiplies state.multipliers[resource] by value
 *   unlock_spell         — no-op (spell system comes later)
 *   unlock_generator     — no-op (generators check research.completed directly)
 */
function applyEffects(state, data, effects) {
  for (const effect of effects) {
    if (effect.type === 'resource_multiplier') {
      const current = state.multipliers[effect.resource] || 1;
      state.multipliers[effect.resource] = current * effect.value;
    }
    // unlock_spell and unlock_generator are intentional no-ops here
  }
}

/**
 * Returns true if the player can start researching the given node.
 * Checks: not completed, not in-progress, prerequisites met, synergy (if hidden),
 * and resource affordability.
 */
function canResearch(state, data, nodeId) {
  const node = findNode(data, nodeId);
  if (!node) return false;

  // Not already completed
  if (state.research.completed.includes(nodeId)) return false;

  // Not currently in progress
  if (state.research.inProgress && state.research.inProgress.nodeId === nodeId) return false;

  // All prerequisite nodes must be completed
  const requires = node.requires || [];
  if (!requires.every((reqId) => state.research.completed.includes(reqId))) return false;

  // Hidden nodes: synergy prerequisites must be met
  if (node.hidden && !synergyPrereqMet(state, data, node)) return false;

  // Must be able to afford the cost
  if (!canAfford(state, node.cost || {})) return false;

  // Arcane Insights gate for T3/T4 nodes
  if (node.insightCost && (state.combat.insights || 0) < node.insightCost) return false;

  return true;
}

/**
 * Starts researching a node after validating via canResearch.
 * Spends resources and sets state.research.inProgress.
 * Returns true on success, false if not eligible.
 */
function startResearch(state, data, nodeId) {
  if (!canResearch(state, data, nodeId)) return false;

  const node = findNode(data, nodeId);
  spend(state, node.cost || {});
  if (node.insightCost) state.combat.insights -= node.insightCost;

  state.research.inProgress = {
    nodeId,
    startTime: Date.now(),
    duration: node.duration,
  };

  return true;
}

/**
 * Returns progress information for the current in-progress research, or null.
 * progress: 0–1 (clamped), remaining: seconds left.
 */
function getResearchProgress(state) {
  const inProgress = state.research.inProgress;
  if (!inProgress) return null;

  const { nodeId, startTime, duration } = inProgress;
  // Note: speed multiplier isn't applied here because startTime already pins
  // the wall-clock start; the tick() handler uses the same formula to detect
  // completion.  We re-derive effective duration for display purposes.
  const speedMultiplier = getResearchSpeedMultiplier(state);
  const effectiveDuration = duration * speedMultiplier;
  const elapsed = (Date.now() - startTime) / 1000;
  const progress = Math.min(1, elapsed / effectiveDuration);
  const remaining = Math.max(0, effectiveDuration - elapsed);

  return { nodeId, progress, remaining };
}

/**
 * Returns all nodes that are visible and have their prerequisites met for a
 * given discipline (including synergy nodes whose synergy_pair includes it).
 * Excludes already-completed nodes.
 */
function getAvailableNodes(state, data, disciplineId) {
  const nodes = (data.disciplines && data.disciplines.nodes) || [];

  return nodes.filter((node) => {
    // Must belong to the requested discipline, or be a synergy node that
    // lists disciplineId in its synergy_pair.
    const inDiscipline =
      node.discipline === disciplineId ||
      (Array.isArray(node.synergy_pair) && node.synergy_pair.includes(disciplineId));
    if (!inDiscipline) return false;

    // Exclude completed nodes
    if (state.research.completed.includes(node.id)) return false;

    // Hidden nodes must have their synergy prerequisites met to be visible
    if (node.hidden && !synergyPrereqMet(state, data, node)) return false;

    // All requires must be completed (prerequisites met)
    const requires = node.requires || [];
    if (!requires.every((reqId) => state.research.completed.includes(reqId))) return false;

    return true;
  });
}

/**
 * Returns all hidden synergy nodes whose requires prerequisites are all
 * completed (i.e. ready to research, regardless of resource cost).
 */
function getVisibleSynergyNodes(state, data) {
  const nodes = (data.disciplines && data.disciplines.nodes) || [];

  return nodes.filter((node) => {
    if (!node.hidden) return false;

    // All required nodes must be in completed
    const requires = node.requires || [];
    return requires.every((reqId) => state.research.completed.includes(reqId));
  });
}

/**
 * Rebuilds state.multipliers from scratch based on completed research nodes
 * and active prestige upgrades.
 */
function recalculateMultipliers(state, data) {
  const nodes = (data.disciplines && data.disciplines.nodes) || [];
  const accum = {};

  // Accumulate resource_multiplier effects from all completed nodes
  for (const nodeId of state.research.completed) {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node || !Array.isArray(node.effects)) continue;

    for (const effect of node.effects) {
      if (effect.type === 'resource_multiplier') {
        accum[effect.resource] = (accum[effect.resource] || 1) * effect.value;
      }
    }
  }

  // Apply prestige bonus: mana_attunement adds +25% per level to mana multiplier
  const upgrades = (state.prestige && state.prestige.upgrades) || {};
  const manaAttunement = upgrades.mana_attunement || 0;
  if (manaAttunement > 0) {
    accum['mana'] = (accum['mana'] || 1) * (1 + manaAttunement * 0.25);
  }

  state.multipliers = accum;
}


// ============================================================
// ENGINE: COMBAT
// ============================================================

// engine/combat.js
// Combat engine: auto-combat AI, damage formulas, spells, consumables.


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

function victory(state, data) {
  const active = state.combat.active;
  if (!active) return;
  awardLoot(state, active.encounter, 1.0);
  var insightGain = (active.encounter && active.encounter.insightReward) || 1;
  state.combat.insights = (state.combat.insights || 0) + insightGain;
  addJournalEntry(state, 'You gained ' + insightGain + ' Arcane Insight' + (insightGain > 1 ? 's' : '') + '.', 'info');
  addJournalEntry(state, `Victory: defeated ${active.encounter.name}`, 'combat');
  addCombatLog(state, `You defeated ${active.encounter.name}!`);

  // Loot drop
  const encounter = active.encounter;
  const isBoss = encounter.boss || false;
  let dropChance = isBoss ? 1.0 : 0.35;
  const isFirstWin = (state.discoveries.counters.combat_win || 0) <= 1;
  if (isFirstWin) dropChance = 1.0; // Guaranteed first drop

  if (Math.random() < dropChance) {
    const tier = encounter.tier || 1;
    const iLvlRanges = { 1: [1,5], 2: [6,12], 3: [13,20], 4: [16,25] };
    // Post-convergence T4 extends to 30
    if (tier === 4 && state.prestige.convergenceCount > 0) iLvlRanges[4] = [16, 30];
    const range = iLvlRanges[tier] || [1, 5];

    const eqBonus = calculateEquipmentBonuses(state, data);
    const item = generateItem(state, data, {
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
      const rarityDef = data.items.rarities.find(r => r.id === item.rarity);
      const color = rarityDef ? rarityDef.color : '#ccc';
      addJournalEntry(state, `Loot: <span style="color:${color}">${item.name}</span> (${item.rarity})`, 'info');

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

  state.combat._lastResult = 'win';
  clearCombat(state);
}

function defeat(state) {
  const active = state.combat.active;
  if (!active) return;
  const tier = active.encounter.tier || 1;
  state.combat.recovery = 30 * tier;
  addJournalEntry(state, `Defeated by ${active.encounter.name}. Recovery: ${state.combat.recovery}s`, 'combat');
  addCombatLog(state, `You were defeated by ${active.encounter.name}.`);
  state.combat._lastResult = 'loss';
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
  const eqBonusAction = calculateEquipmentBonuses(state, data);

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
    let damage = Math.max(1, Math.floor(rawDamage));

    // Spell Crit check
    const critChance = (eqBonusAction.spell_crit_chance || 0) / 100;
    if (Math.random() < critChance) {
      const critMult = 1.5 + (eqBonusAction.spell_crit_damage || 0);
      damage = Math.round(damage * critMult);
      addCombatLog(state, 'CRITICAL HIT!');
    }

    // Apply spell effects (heals, buffs, debuffs, shields)
    applySpellEffects(state, spellDef, stats);

    // Spend mana
    let manaCost = spellDef.mana_cost || 0;
    const manaEff = (eqBonusAction.mana_efficiency || 0);
    if (manaEff > 0) manaCost = Math.ceil(manaCost * (1 - manaEff / 100));
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
    let damage = Math.max(1, Math.floor(rawDamage));
    // Spell Crit check
    const basicCritChance = (eqBonusAction.spell_crit_chance || 0) / 100;
    if (Math.random() < basicCritChance) {
      const basicCritMult = 1.5 + (eqBonusAction.spell_crit_damage || 0);
      damage = Math.round(damage * basicCritMult);
      addCombatLog(state, 'CRITICAL HIT!');
    }
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
function calculateStats(state, data) {
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

  // Equipment bonuses
  const eqBonus = calculateEquipmentBonuses(state, data);
  return {
    arcanePower: arcanePower + (eqBonus.arcane_power || 0),
    resilience: resilience + (eqBonus.resilience || 0),
    speed: Math.min(0.5, speed + (eqBonus.speed || 0) / 100),
    instability: instability + (eqBonus.instability || 0),
  };
}

// ---------------------------------------------------------------------------
// Exported: startCombat
// ---------------------------------------------------------------------------

function startCombat(state, data, encounterId) {
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

  const equipBonuses = calculateEquipmentBonuses(state, data);
  state.combat.health = 100 + stats.resilience * 5 + (equipBonuses.max_hp || 0);
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

function castSpell(state, data, spellId) {
  state.combat.manualSpell = spellId;
}

// ---------------------------------------------------------------------------
// Exported: setStance
// ---------------------------------------------------------------------------

function setStance(state, stance) {
  const valid = ['aggressive', 'balanced', 'defensive'];
  if (!valid.includes(stance)) return;
  state.combat.stance = stance;
}

// ---------------------------------------------------------------------------
// Exported: retreat
// ---------------------------------------------------------------------------

function retreat(state) {
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

function useConsumable(state, data, consumableId) {
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

function craftConsumable(state, data, consumableId) {
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

function combatTick(state, data) {
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
  const eqBonus = calculateEquipmentBonuses(state, data);

  // --- 3a. Player turn ---
  // HP Regen from equipment
  const regenBase = eqBonus.hp_regen || 0;
  let regenVal = regenBase;
  // Robes of the First Arcanist: triple regen below 30% HP
  if (regenVal > 0 && eqBonus.unique_effects.some(e => e.id === 'regen_boost_low_hp')) {
    if (state.combat.health < state.combat.maxHealth * 0.3) regenVal *= 3;
  }
  if (regenVal > 0 && state.combat.health < state.combat.maxHealth) {
    const regenAmt = Math.min(regenVal, state.combat.maxHealth - state.combat.health);
    state.combat.health += regenAmt;
    if (regenAmt >= 1) {
      addCombatLog(state, `You regenerate ${Math.round(regenAmt)} HP.`);
    }
  }

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
    victory(state, data);
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

      // Evasion check (shared by strike, heavy_strike, special)
      const evasionChance = (eqBonus.evasion || 0) / 100;

      switch (actionType) {
        case 'strike': {
          const damage = Math.max(1, enemyAttack - playerResilience);
          const effectiveEvasionStrike = evasionChance;
          if (Math.random() < effectiveEvasionStrike) {
            addCombatLog(state, 'You dodged the attack!');
          } else {
            applyDamageToPlayer(state, damage);
            addCombatLog(state, `${encounter.name} strikes for ${damage} damage.`);
          }
          break;
        }
        case 'heavy_strike': {
          const damage = Math.max(1, enemyAttack * 2 - playerResilience);
          const effectiveEvasionHeavy = evasionChance;
          if (Math.random() < effectiveEvasionHeavy) {
            addCombatLog(state, 'You dodged the attack!');
          } else {
            applyDamageToPlayer(state, damage);
            addCombatLog(state, `${encounter.name} heavy strikes for ${damage} damage!`);
          }
          active.skipNext = true;
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
            const effectiveEvasionSpecial = evasionChance * 0.5;
            if (specialAction.damage_multiplier > 0 && Math.random() < effectiveEvasionSpecial) {
              addCombatLog(state, 'You dodged the attack!');
            } else {
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
  const cdrBonus = Math.floor(eqBonus.cdr || 0);
  for (const spellId of Object.keys(cooldowns)) {
    if (cooldowns[spellId] > 0) {
      cooldowns[spellId] -= (1 + cdrBonus);
      if (cooldowns[spellId] < 0) cooldowns[spellId] = 0;
    }
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


// ============================================================
// ENGINE: EVENTS
// ============================================================

// engine/events.js
// Events engine: random events, discoveries, challenges, and condition evaluation.


// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Returns true if the given discipline has at least one node in
 * state.research.completed.
 */
function isDisciplineUnlocked(state, data, disciplineId) {
  const nodes = (data.disciplines && data.disciplines.nodes) || [];
  return nodes.some(
    (n) => n.discipline === disciplineId && state.research.completed.includes(n.id)
  );
}

/**
 * Returns true if all `requires` conditions for an event definition are met.
 * Currently supports: { discipline_unlocked: "disciplineId" }.
 */
function requiresMet(state, data, requires) {
  if (!requires || Object.keys(requires).length === 0) return true;
  if (requires.discipline_unlocked) {
    return isDisciplineUnlocked(state, data, requires.discipline_unlocked);
  }
  return true;
}

/**
 * Ensures a resource slot exists in state.resources.
 */
function eventsEnsureResource(state, id) {
  if (!state.resources[id]) {
    state.resources[id] = { amount: 0, totalEarned: 0, totalSpent: 0 };
  }
}

/**
 * Applies a single outcome object to state.
 * Supported outcome types: 'resource', 'narrative'.
 */
function applyOutcome(state, outcome) {
  if (outcome.type === 'resource') {
    eventsEnsureResource(state, outcome.resource);
    const delta = outcome.amount || 0;
    state.resources[outcome.resource].amount += delta;
    if (delta > 0) {
      state.resources[outcome.resource].totalEarned += delta;
    } else if (delta < 0) {
      state.resources[outcome.resource].totalSpent += Math.abs(delta);
    }
  } else if (outcome.type === 'narrative') {
    addJournalEntry(state, outcome.text || '', 'event');
  }
}

/**
 * Applies an array of outcomes to state.
 */
function applyOutcomes(state, outcomes) {
  if (!Array.isArray(outcomes)) return;
  for (const outcome of outcomes) {
    applyOutcome(state, outcome);
  }
}

/**
 * Applies a discovery reward object { arcane_knowledge: N, ... } to state.resources.
 */
function applyReward(state, reward) {
  if (!reward) return;
  for (const [resourceId, amount] of Object.entries(reward)) {
    eventsEnsureResource(state, resourceId);
    state.resources[resourceId].amount += amount;
    if (amount > 0) {
      state.resources[resourceId].totalEarned += amount;
    }
  }
}

/**
 * Returns a random integer in [min, max] (inclusive).
 */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ---------------------------------------------------------------------------
// evaluateCondition
// ---------------------------------------------------------------------------

/**
 * Recursively evaluates a condition object against the current state.
 *
 * Supported condition types:
 *   threshold   — resource amount >= value. Optional constraint: never_spent.
 *   counter     — counter[event] >= count. Optional constraint: consecutive.
 *   combination — every node ID in condition.nodes exists in research.completed.
 *   all_of      — every sub-condition passes.
 *   any_of      — at least one sub-condition passes.
 *
 * @param {object} state
 * @param {object} condition
 * @returns {boolean}
 */
function evaluateCondition(state, condition) {
  if (!condition) return false;

  switch (condition.type) {
    case 'threshold': {
      const res = state.resources[condition.resource];
      const amount = res ? res.amount : 0;
      if (amount < condition.value) return false;
      if (condition.constraint && condition.constraint.type === 'never_spent') {
        const totalSpent = res ? res.totalSpent : 0;
        if (totalSpent !== 0) return false;
      }
      return true;
    }

    case 'counter': {
      const counters = state.discoveries.counters || {};
      if (condition.constraint && condition.constraint.type === 'consecutive') {
        const consecutiveKey = condition.event + '_consecutive';
        const consecutiveCount = counters[consecutiveKey] || 0;
        return consecutiveCount >= condition.count;
      }
      const count = counters[condition.event] || 0;
      return count >= condition.count;
    }

    case 'combination': {
      const completed = state.research.completed || [];
      return condition.nodes.every((nodeId) => completed.includes(nodeId));
    }

    case 'all_of': {
      return condition.conditions.every((sub) => evaluateCondition(state, sub));
    }

    case 'any_of': {
      return condition.conditions.some((sub) => evaluateCondition(state, sub));
    }

    default:
      return false;
  }
}

// ---------------------------------------------------------------------------
// trackEvent / resetConsecutive
// ---------------------------------------------------------------------------

/**
 * Increments the counter for the given event type and its consecutive variant.
 * Called by other engines (e.g. combat engine on win/loss, research engine on complete).
 *
 * @param {object} state
 * @param {string} eventType
 */
function trackEvent(state, eventType) {
  const counters = state.discoveries.counters;
  counters[eventType] = (counters[eventType] || 0) + 1;
  counters[eventType + '_consecutive'] = (counters[eventType + '_consecutive'] || 0) + 1;
}

/**
 * Resets the consecutive counter for the given event type to 0.
 * E.g. called on combat_win to reset combat_loss_consecutive.
 *
 * @param {object} state
 * @param {string} eventType
 */
function resetConsecutive(state, eventType) {
  state.discoveries.counters[eventType + '_consecutive'] = 0;
}

// ---------------------------------------------------------------------------
// getChallengeProgress
// ---------------------------------------------------------------------------

/**
 * Returns the current challenge progress, or null if no challenge is active.
 *
 * @param {object} state
 * @returns {{ name: string, progress: number, remaining: number } | null}
 */
function getChallengeProgress(state) {
  const active = state.challenges.active;
  if (!active) return null;

  const { challengeDef, remaining, progress } = active;
  const total = challengeDef.duration || 1;
  const progressFraction = Math.min(1, progress);

  return {
    name: challengeDef.name || challengeDef.id,
    progress: progressFraction,
    remaining,
  };
}

// ---------------------------------------------------------------------------
// makeChoice
// ---------------------------------------------------------------------------

/**
 * Resolves the player's choice for the currently active event.
 * Applies outcomes, records hidden choice discovery, clears active event,
 * and pushes the event to history.
 *
 * @param {object} state
 * @param {object} data
 * @param {number} choiceIndex
 */
function makeChoice(state, data, choiceIndex) {
  const activeEvent = state.events.active;
  if (!activeEvent) return;

  const { eventDef } = activeEvent;
  const choices = eventDef.choices || [];
  const choice = choices[choiceIndex];
  if (!choice) return;

  // Apply outcomes: weighted outcome_sets or direct outcomes
  if (Array.isArray(choice.outcome_sets) && choice.outcome_sets.length > 0) {
    const selectedSet = weightedRandom(choice.outcome_sets);
    if (selectedSet) {
      applyOutcomes(state, selectedSet.outcomes);
    }
  } else if (Array.isArray(choice.outcomes)) {
    applyOutcomes(state, choice.outcomes);
  }

  // Record hidden choice discovery
  if (choice.hidden && !state.events.discoveredHidden.includes(choice.label)) {
    state.events.discoveredHidden.push(choice.label);
  }

  // Clear active event and push to history
  state.events.history.push(eventDef.id);
  state.events.active = null;
}

// ---------------------------------------------------------------------------
// tick
// ---------------------------------------------------------------------------

/**
 * Called once per game tick. Handles:
 *  1. Early-out if an event is awaiting player choice.
 *  2. Active challenge progress update and expiry/completion.
 *  3. Discovery condition checks.
 *  4. Event timer: fire a random eligible event.
 *  5. Challenge timer: start a new random challenge.
 *
 * @param {object} state
 * @param {object} data
 */
function eventsTick(state, data) {
  // -------------------------------------------------------------------------
  // 1. If an event is awaiting player choice, check for timeout then skip.
  // -------------------------------------------------------------------------
  if (state.events.active) {
    const activeEvt = state.events.active;
    const evtTimeout = activeEvt.eventDef && activeEvt.eventDef.timeout;
    if (evtTimeout && activeEvt.timestamp) {
      if (Date.now() - activeEvt.timestamp > evtTimeout * 1000) {
        addJournalEntry(state, `Event expired: ${activeEvt.eventDef.name || 'Unknown'}`, 'info');
        state.events.history.push({ id: activeEvt.eventDef.id, timestamp: activeEvt.timestamp, expired: true });
        state.events.active = null;
      }
    }
    if (state.events.active) return;
  }

  // -------------------------------------------------------------------------
  // 2. Active challenge: update progress, decrement timer, check expiry/completion.
  // -------------------------------------------------------------------------
  if (state.challenges.active) {
    const active = state.challenges.active;
    const objective = active.challengeDef.objective;

    // Update progress based on objective type
    if (objective.type === 'generate') {
      const resourceId = objective.resource;
      const currentAmount = state.resources[resourceId]
        ? state.resources[resourceId].amount
        : 0;
      const baseline = active.baseline[resourceId] !== undefined
        ? active.baseline[resourceId]
        : 0;
      const generated = Math.max(0, currentAmount - baseline);
      // progress is a 0-1 fraction
      active.progress = Math.min(1, generated / (objective.amount || 1));
    } else if (objective.type === 'counter') {
      const currentCount = state.discoveries.counters[objective.event] || 0;
      const baselineCount = active.baseline[objective.event] !== undefined
        ? active.baseline[objective.event]
        : 0;
      const achieved = Math.max(0, currentCount - baselineCount);
      active.progress = Math.min(1, achieved / (objective.count || 1));
    }

    // Decrement timer (pause when tab is hidden)
    if (!state.challenges._paused) {
      active.remaining -= 1;
    }

    // Check objective met (before expiry check — reward on time is valid)
    if (active.progress >= 1) {
      // Apply reward
      const reward = active.challengeDef.reward || {};
      applyReward(state, reward);
      state.challenges.completed += 1;
      addJournalEntry(
        state,
        `Challenge complete: ${active.challengeDef.name || active.challengeDef.id}`,
        'info'
      );
      state.challenges.active = null;
    } else if (active.remaining <= 0) {
      // Challenge expired without completion
      addJournalEntry(
        state,
        `Challenge failed: ${active.challengeDef.name || active.challengeDef.id}`,
        'info'
      );
      state.challenges.active = null;
    }
  }

  // -------------------------------------------------------------------------
  // 3. Check discoveries: evaluate conditions for any not-yet-found discovery.
  // -------------------------------------------------------------------------
  const discoveries = (data.events && data.events.discoveries) || [];
  for (const discovery of discoveries) {
    if (state.discoveries.found.includes(discovery.id)) continue;
    if (evaluateCondition(state, discovery.condition)) {
      state.discoveries.found.push(discovery.id);
      applyReward(state, discovery.reward);
      addJournalEntry(
        state,
        `Discovery: ${discovery.name} — ${discovery.discovery_text || discovery.description}`,
        'discovery'
      );
    }
  }

  // -------------------------------------------------------------------------
  // 4. Event timer: fire a weighted random event at a random interval 300–900 ticks.
  // -------------------------------------------------------------------------
  state.events.lastEventTick = (state.events.lastEventTick || 0) + 1;

  // Initialise the per-run threshold if it hasn't been set yet
  if (!state.events._nextEventThreshold) {
    state.events._nextEventThreshold = randInt(300, 900);
  }

  if (state.events.lastEventTick >= state.events._nextEventThreshold) {
    const eventDefs = (data.events && data.events.events) || [];
    const eligible = eventDefs.filter((e) => requiresMet(state, data, e.requires));
    if (eligible.length > 0) {
      const chosen = weightedRandom(eligible);
      if (chosen) {
        state.events.active = { eventDef: chosen, timestamp: Date.now() };
      }
    }
    // Reset timer and pick a new random threshold
    state.events.lastEventTick = 0;
    state.events._nextEventThreshold = randInt(300, 900);
  }

  // -------------------------------------------------------------------------
  // 5. Challenge timer: start a new challenge at a random interval 1800–3600 ticks.
  // -------------------------------------------------------------------------
  if (!state.challenges.active) {
    state.challenges.lastChallengeTick = (state.challenges.lastChallengeTick || 0) + 1;

    if (!state.challenges._nextChallengeThreshold) {
      state.challenges._nextChallengeThreshold = randInt(1800, 3600);
    }

    if (state.challenges.lastChallengeTick >= state.challenges._nextChallengeThreshold) {
      const challengeDefs = (data.events && data.events.challenges) || [];
      if (challengeDefs.length > 0) {
        const chosen = weightedRandom(
          challengeDefs.map((c) => ({ ...c, weight: c.weight || 1 }))
        );
        if (chosen) {
          const baseline = {};

          // For 'generate' type: record current resource amount as baseline
          if (chosen.objective && chosen.objective.type === 'generate') {
            const resourceId = chosen.objective.resource;
            baseline[resourceId] = state.resources[resourceId]
              ? state.resources[resourceId].amount
              : 0;
          }

          // For 'counter' type: record current counter value as baseline
          if (chosen.objective && chosen.objective.type === 'counter') {
            const eventType = chosen.objective.event;
            baseline[eventType] = state.discoveries.counters[eventType] || 0;
          }

          state.challenges.active = {
            challengeDef: chosen,
            remaining: chosen.duration,
            baseline,
            progress: 0,
          };

          addJournalEntry(
            state,
            `New challenge: ${chosen.name} — ${chosen.description}`,
            'info'
          );
        }
      }
      // Reset timer and pick a new random threshold
      state.challenges.lastChallengeTick = 0;
      state.challenges._nextChallengeThreshold = randInt(1800, 3600);
    }
  }
}


// ============================================================
// ENGINE: PRESTIGE
// ============================================================

// engine/prestige.js
// Handles Grand Convergence (prestige), Enlightenment Points, and prestige upgrades.


// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Looks up an upgrade definition by id from data.prestige (the array).
 * Returns undefined if not found.
 */
function findUpgrade(data, upgradeId) {
  const upgrades = Array.isArray(data.prestige) ? data.prestige : [];
  return upgrades.find((u) => u.id === upgradeId);
}

/**
 * Returns the number of completed research nodes that have the given tier.
 */
function countCompletedByTier(state, data, tier) {
  const nodes = (data.disciplines && data.disciplines.nodes) || [];
  return state.research.completed.filter((nodeId) => {
    const node = nodes.find((n) => n.id === nodeId);
    return node && node.tier === tier;
  }).length;
}

// ---------------------------------------------------------------------------
// Exported functions
// ---------------------------------------------------------------------------

/**
 * Returns true if the player is eligible for Grand Convergence:
 * at least one Tier-4 research node must be completed.
 *
 * @param {object} state
 * @param {object} data
 * @returns {boolean}
 */
function canConverge(state, data) {
  const nodes = (data.disciplines && data.disciplines.nodes) || [];
  return state.research.completed.some((nodeId) => {
    const node = nodes.find((n) => n.id === nodeId);
    return node && node.tier === 4;
  });
}

/**
 * Calculates the Enlightenment Points earned for the current run.
 *
 * Formula:
 *   (completed nodes * 2) + (found discoveries * 5) + (challenges completed * 3)
 *   + (tier-4 completed nodes * 10)
 *
 * @param {object} state
 * @param {object} data
 * @returns {number}
 */
function calculateEP(state, data) {
  const tier4Count = countCompletedByTier(state, data, 4);

  return (
    (state.research.completed.length * 2) +
    (state.discoveries.found.length * 5) +
    (state.challenges.completed * 3) +
    (tier4Count * 10)
  );
}

/**
 * Performs the Grand Convergence (prestige reset).
 *
 * Steps:
 *  1.  Add EP to state.prestige.enlightenmentPoints.
 *  2.  Copy discovery texts into state.prestige.wizardMemory (no duplicates).
 *  3.  Reset resources (amounts, totals).
 *  4.  Reset generators (counts; levels reset to 1, or 2 if resonant_generators purchased).
 *  5.  Reset research (completed list and in-progress slot).
 *  6.  Reset combat state.
 *  7.  Reset events (keep discoveredHidden).
 *  8.  Reset discoveries counters (keep found array).
 *  9.  Reset challenges.
 * 10.  Reset multipliers.
 * 11.  Increment convergenceCount.
 * 12.  If convergence_echo purchased, set convergenceTickCounter = 600.
 * 13.  If deep_memory purchased, set pendingDeepMemory flag.
 * 14.  Recalculate multipliers from prestige effects.
 * 15.  Add journal entry.
 *
 * @param {object} state
 * @param {object} data
 */
function converge(state, data) {
  // 1. Calculate and award EP
  const ep = calculateEP(state, data);
  state.prestige.enlightenmentPoints += ep;

  // 2. Copy discovery texts to wizardMemory (no duplicates)
  const discoveries = (data.events && data.events.discoveries) || [];
  for (const foundId of state.discoveries.found) {
    const disc = discoveries.find((d) => d.id === foundId);
    if (disc && disc.discovery_text) {
      if (!state.prestige.wizardMemory.includes(disc.discovery_text)) {
        state.prestige.wizardMemory.push(disc.discovery_text);
      }
    }
  }

  // 3. Reset resources
  for (const key of Object.keys(state.resources)) {
    state.resources[key].amount = 0;
    state.resources[key].totalEarned = 0;
    state.resources[key].totalSpent = 0;
  }

  // 4. Reset generators
  const startLevel =
    (state.prestige.upgrades && state.prestige.upgrades.resonant_generators)
      ? 2
      : 1;
  for (const key of Object.keys(state.generators)) {
    state.generators[key].count = 0;
    state.generators[key].level = startLevel;
  }

  // 5. Reset research
  state.research.completed = [];
  state.research.inProgress = null;

  // 6. Reset combat
  state.combat.active = null;
  state.combat.health = 100;
  state.combat.cooldowns = {};
  state.combat.stance = 'balanced';
  state.combat.recovery = 0;
  state.combat.inventory = {};
  state.combat.log = [];

  // Reset insights (with possible retention from prestige)
  var preInsights = state.combat.insights || 0;
  state.combat.insights = 0;
  if (state.prestige.upgrades && state.prestige.upgrades.lingering_insights && preInsights > 0) {
    state.combat.insights = Math.ceil(preInsights * 0.25);
  }

  // 7. Reset events (keep discoveredHidden)
  state.events.active = null;
  state.events.history = [];
  state.events.lastEventTick = 0;

  // 8. Reset discoveries counters (keep found array)
  state.discoveries.counters = {};

  // 9. Reset challenges
  state.challenges.active = null;
  state.challenges.completed = 0;
  state.challenges.lastChallengeTick = 0;

  // 10. Reset multipliers
  state.multipliers = {};

  // 11. Increment convergence count
  state.prestige.convergenceCount += 1;

  // 12. convergence_echo: start burst counter
  if (state.prestige.upgrades && state.prestige.upgrades.convergence_echo) {
    state.prestige.convergenceTickCounter = 600;
  }

  // 13. deep_memory: flag for UI to handle discipline selection
  if (state.prestige.upgrades && state.prestige.upgrades.deep_memory) {
    state.prestige.pendingDeepMemory = true;
  }

  // 14. Rebuild multipliers from prestige effects
  recalculateMultipliers(state, data);

  // 15. Journal entry
  addJournalEntry(
    state,
    `The Grand Convergence complete. ${ep} Enlightenment Points earned.`,
    'info'
  );
}

/**
 * Attempts to purchase one level of a prestige upgrade.
 * Deducts EP and increments the upgrade level on success.
 *
 * @param {object} state
 * @param {object} data
 * @param {string} upgradeId
 * @returns {boolean} true if purchase succeeded, false otherwise.
 */
function buyUpgrade(state, data, upgradeId) {
  const upgrade = findUpgrade(data, upgradeId);
  if (!upgrade) return false;

  const currentLevel = state.prestige.upgrades[upgradeId] || 0;

  // Cannot exceed max level
  if (currentLevel >= upgrade.max_level) return false;

  const cost = getUpgradeCost(data, upgradeId, currentLevel);

  // Must have enough EP
  if (state.prestige.enlightenmentPoints < cost) return false;

  state.prestige.enlightenmentPoints -= cost;
  state.prestige.upgrades[upgradeId] = currentLevel + 1;

  return true;
}

/**
 * Returns the EP cost for the next level of an upgrade.
 *
 * Formula: cost_base * cost_scaling ^ currentLevel
 *
 * @param {object} data
 * @param {string} upgradeId
 * @param {number} currentLevel - The player's current level (0 = not yet purchased).
 * @returns {number}
 */
function getUpgradeCost(data, upgradeId, currentLevel) {
  const upgrade = findUpgrade(data, upgradeId);
  if (!upgrade) return Infinity;
  return upgrade.cost_base * Math.pow(upgrade.cost_scaling, currentLevel);
}

/**
 * Returns an array of active prestige effect objects with computed values,
 * suitable for use in multiplier recalculation.
 *
 * Each returned object contains the full effect definition plus a
 * `computed_value` field representing the total bonus at the purchased level.
 *
 * @param {object} state
 * @param {object} data
 * @returns {Array<object>}
 */
function getPrestigeEffects(state, data) {
  const upgradeDefs = Array.isArray(data.prestige) ? data.prestige : [];
  const purchased = (state.prestige && state.prestige.upgrades) || {};
  const effects = [];

  for (const def of upgradeDefs) {
    const level = purchased[def.id] || 0;
    if (level === 0) continue;

    const effect = { ...def.effect, upgrade_id: def.id, level };

    // Attach a computed_value for effects that scale per level
    if (def.effect.value_per_level !== undefined) {
      effect.computed_value = def.effect.value_per_level * level;
    } else if (def.effect.value !== undefined) {
      effect.computed_value = def.effect.value;
    } else if (def.effect.multiplier !== undefined) {
      effect.computed_value = def.effect.multiplier;
    }

    effects.push(effect);
  }

  return effects;
}


// ============================================================
// ENGINE: OFFLINE
// ============================================================

// engine/offline.js
// Calculates resource gains accumulated while the player was offline.


const MAX_OFFLINE_SECONDS = 28800; // 8 hours
const MIN_OFFLINE_SECONDS = 60;    // 1 minute — below this we skip the calculation

/**
 * Grants resources for time spent offline and returns a summary of the gains.
 *
 * @param {object} state - Live game state (mutated in place).
 * @param {object} data  - Static game data (data.resources.resources / generators).
 * @returns {object|null} Summary { elapsed, efficiency, gains } or null if elapsed < 60 s.
 */
function calculateOfflineProgress(state, data) {
  // 1. Calculate elapsed seconds since last online timestamp.
  let elapsed = (Date.now() - state.settings.lastOnline) / 1000;

  // 2. Cap at 8 hours.
  elapsed = Math.min(elapsed, MAX_OFFLINE_SECONDS);

  // 3. Skip if less than a minute has passed.
  if (elapsed < MIN_OFFLINE_SECONDS) {
    return null;
  }

  // 4. Determine offline efficiency from prestige upgrade offline_mastery.
  const offlineMasteryLevel =
    (state.prestige.upgrades && state.prestige.upgrades['offline_mastery']) || 0;
  const efficiency = Math.min(0.5 + offlineMasteryLevel * 0.1, 0.9);

  // 5. Calculate gains for every resource and apply them to state.
  const resourceDefs = (data.resources && data.resources.resources) || [];
  const gains = {};

  for (const def of resourceDefs) {
    const { id } = def;

    // Use getGenerationRate which already incorporates base_rate, generator counts,
    // levels, and current multipliers — mirroring the tick logic without a full tick.
    const rate = getGenerationRate(state, data, id);
    if (rate <= 0) continue;

    const gain = rate * elapsed * efficiency;

    // Ensure the resource slot exists before adding to it.
    if (!state.resources[id]) {
      state.resources[id] = { amount: 0, totalEarned: 0, totalSpent: 0 };
    }

    state.resources[id].amount += gain;
    state.resources[id].totalEarned += gain;

    gains[id] = gain;
  }

  // 6. Mark when the player came back online.
  state.settings.lastOnline = Date.now();

  // 7. Return the summary (only resources that actually gained something).
  return { elapsed, efficiency, gains };
}


// ============================================================
// ENGINE: GAME (core loop + state factory)
// ============================================================

// engine/game.js
// Central coordinator: state factory, data loader, and game loop.


function createInitialState() {
  return {
    resources: {},   // resourceId -> { amount, totalEarned, totalSpent }
    generators: {},  // generatorId -> { count, level }
    research: {
      completed: [],
      inProgress: null, // { nodeId, startTime, duration }
    },
    combat: {
      active: null,
      health: 100,
      maxHealth: 100,
      cooldowns: {},
      stance: 'balanced',
      recovery: 0,
      inventory: {},
      log: [],
      insights: 0,
    },
    events: {
      active: null,
      history: [],
      discoveredHidden: [],
      lastEventTick: 0,
    },
    discoveries: {
      found: [],
      counters: {},
    },
    challenges: {
      active: null,
      completed: 0,
      lastChallengeTick: 0,
    },
    prestige: {
      enlightenmentPoints: 0,
      upgrades: {},
      convergenceCount: 0,
      wizardMemory: [],
      convergenceTickCounter: 0,
    },
    settings: {
      lastSave: 0,
      lastOnline: Date.now(),
      version: 1,
    },
    multipliers: {},
    journal: [],
    tutorial: {
      seenMilestones: [],
      currentObjective: 0,
      completed: false,
    },
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
    tick: 0,
  };
}

/**
 * Returns all game data from the imported JS data modules.
 * Previously used fetch() which silently fails on file:// protocol.
 * Now uses ES module imports which work everywhere.
 */
function loadData() {
  var gameData = {
    resources: resourcesData,
    disciplines: disciplinesData,
    spells: spellsData,
    encounters: encountersData,
    events: eventsData,
    prestige: prestigeData,
    items: itemsData,
  };

  // Build O(1) node lookup map
  var nodeMap = {};
  var nodes = (gameData.disciplines && gameData.disciplines.nodes) || [];
  for (var i = 0; i < nodes.length; i++) {
    nodeMap[nodes[i].id] = nodes[i];
  }
  gameData._nodeMap = nodeMap;

  return gameData;
}

/**
 * Starts the 1 Hz game loop.
 *
 * @param {object} state   - Live game state (mutated in place each tick).
 * @param {object} data    - Static data loaded by loadData().
 * @param {object} engines - { resources, research, combat, events } — each exposes tick(state, data).
 * @param {Function} renderFn - Called after every tick with (state, data).
 * @returns {number} Interval ID (pass to clearInterval to stop the loop).
 */
function startGameLoop(state, data, engines, renderFn) {
  const intervalId = setInterval(() => {
    state.tick += 1;

    // Determine speed multiplier (convergence burst mode).
    let speedMultiplier;
    if (state.prestige.convergenceTickCounter > 0) {
      speedMultiplier = 3;
      state.prestige.convergenceTickCounter -= 1;
    } else {
      speedMultiplier = 1;
    }

    // Run each engine speedMultiplier times per wall-clock tick.
    for (let i = 0; i < speedMultiplier; i++) {
      engines.resources.tick(state, data);
      engines.research.tick(state, data);
      engines.combat.tick(state, data);
      engines.events.tick(state, data);
    }

    // Tutorial systems run once per wall-clock tick (not accelerated by burst mode)
    checkMilestones(state);
    deliverMilestones(state);
    checkObjective(state);
    checkAmbient(state);

    renderFn(state, data);
  }, 1000);

  return intervalId;
}


// ============================================================
// UI: PANELS
// ============================================================

// ui/panels.js
// Panel rendering functions for the Research Tree and Generators views.


// ---------------------------------------------------------------------------
// Dashboard Panel
// ---------------------------------------------------------------------------

/**
 * Discipline resource definitions for the dashboard.
 * Maps resource IDs to display metadata.
 */
const DASHBOARD_DISCIPLINE_RESOURCES = [
  { id: 'chronos_essence', name: 'Chronos',  icon: '⚗', cssVar: '--bar-chronos', discipline: 'Temporal'  },
  { id: 'aether_threads',  name: 'Aether',   icon: '✦', cssVar: '--bar-aether',  discipline: 'Spatial'   },
  { id: 'psyche_fragments',name: 'Psyche',   icon: 'ψ', cssVar: '--bar-psyche',  discipline: 'Mind'      },
  { id: 'vital_ichor',     name: 'Ichor',    icon: '♥', cssVar: '--bar-ichor',   discipline: 'Vital'     },
  { id: 'umbral_dust',     name: 'Umbral',   icon: '◘', cssVar: '--bar-umbral',  discipline: 'Shadow'    },
  { id: 'flux_sparks',     name: 'Flux',     icon: '~', cssVar: '--bar-flux',    discipline: 'Chaos'     },
  { id: 'axiom_crystals',  name: 'Axiom',    icon: '□', cssVar: '--bar-axiom',   discipline: 'Order'     },
];

/**
 * Renders the dashboard overview panel.
 *
 * @param {HTMLElement} container - The #view-dashboard element.
 * @param {object}      state     - Live game state.
 * @param {object}      data      - Static game data.
 * @param {object}      engines   - Engine modules.
 */
/**
 * Returns a contextual hint string (may contain HTML) for brand-new players,
 * or null once the player is past the early-game stages.
 *
 * @param {object} state - Live game state.
 * @returns {string|null}
 */
function getDashboardHint(state, data) {
  // Priority 1: No research running and can afford a node
  if (!state.research.inProgress) {
    var nodes = (data && data.disciplines && data.disciplines.nodes) || [];
    var cheapest = null;
    var cheapestUnaffordable = null;
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (state.research.completed.includes(n.id)) continue;
      if (n.hidden) continue;
      var requires = n.requires || [];
      if (!requires.every(function(r) { return state.research.completed.includes(r); })) continue;
      if (canAfford(state, n.cost || {})) {
        if (!n.insightCost || (state.combat.insights || 0) >= n.insightCost) {
          if (!cheapest) cheapest = n;
        }
      } else {
        if (!cheapestUnaffordable) cheapestUnaffordable = n;
      }
    }
    if (cheapest) {
      return 'You have enough resources to research <strong>' + _escapeHtml(cheapest.name) + '</strong>.';
    }
    if (cheapestUnaffordable) {
      var cost = cheapestUnaffordable.cost || {};
      var biggest = '';
      var biggestDiff = 0;
      for (var resId in cost) {
        var have = (state.resources[resId] && state.resources[resId].amount) || 0;
        var diff = cost[resId] - have;
        if (diff > biggestDiff) { biggestDiff = diff; biggest = resId; }
      }
      if (biggest) {
        return 'You need <strong>' + formatNumber(Math.ceil(biggestDiff)) + '</strong> more ' + _toDisplayName(biggest) + ' to research <strong>' + _escapeHtml(cheapestUnaffordable.name) + '</strong>.';
      }
    }
  }

  // Priority 2: Research running, can buy a generator
  if (state.research.inProgress) {
    var genDefs = (data && data.resources && data.resources.generators) || [];
    for (var g = 0; g < genDefs.length; g++) {
      var gen = genDefs[g];
      if (!state.research.completed.includes(gen.unlock_requires)) continue;
      var gs = state.generators[gen.id];
      var count = gs ? gs.count : 0;
      var genCost = {};
      for (var ck in gen.cost) { genCost[ck] = gen.cost[ck] * Math.pow(1.15, count); }
      if (canAfford(state, genCost)) {
        return 'While you wait \u2014 you can afford another <strong>' + _escapeHtml(gen.name) + '</strong>.';
      }
    }
  }

  // Priority 3: Need insights
  if (state.research.completed.length >= 3) {
    var needsInsight = false;
    var nodes2 = (data && data.disciplines && data.disciplines.nodes) || [];
    for (var j = 0; j < nodes2.length; j++) {
      if (nodes2[j].insightCost && !state.research.completed.includes(nodes2[j].id)) {
        var reqs = nodes2[j].requires || [];
        if (reqs.every(function(r) { return state.research.completed.includes(r); })) {
          if ((state.combat.insights || 0) < nodes2[j].insightCost) { needsInsight = true; break; }
        }
      }
    }
    if (needsInsight) {
      return 'You need <strong>Arcane Insights</strong> to continue deeper research. Visit <strong>Combat</strong>.';
    }
  }

  // Priority 4: Fallback
  return 'Your generators hum. Resources accumulate. Patience is its own discipline.';
}

function _dashBuildSkeleton(container, data) {
  var resGrid = '';
  for (var i = 0; i < DASHBOARD_DISCIPLINE_RESOURCES.length; i++) {
    var res = DASHBOARD_DISCIPLINE_RESOURCES[i];
    resGrid += '<div class="resource-bar-item" id="dash-res-' + res.id + '">' +
      '<div class="resource-bar-header"><span id="dash-res-name-' + res.id + '">' + res.icon + ' ???</span>' +
      '<span id="dash-res-amt-' + res.id + '">—</span></div>' +
      '<div class="resource-bar-container"><div class="resource-bar-fill" id="dash-res-bar-' + res.id + '" style="width:0%;background:var(' + res.cssVar + ')"></div></div>' +
      '<div class="resource-bar-rate" id="dash-res-rate-' + res.id + '">locked</div></div>';
  }

  var allNodes = (data.disciplines && data.disciplines.nodes) || [];
  var totalNodes = allNodes.filter(function(n) { return !n.hidden; }).length;
  var allDisc = (data.events && data.events.discoveries) || [];

  container.innerHTML = '<div class="dashboard">' +
    '<div class="dashboard-hint" id="dash-hint" style="display:none"></div>' +
    '<div class="current-pursuit" id="dash-pursuit" style="display:none">' +
      '<h4>Current Pursuit</h4>' +
      '<div class="pursuit-objective" id="dash-pursuit-text"></div>' +
      '<div class="pursuit-progress" id="dash-pursuit-progress"></div>' +
    '</div>' +
    '<div class="dashboard-section"><h3>Mana</h3>' +
      '<div class="mana-bar-container"><div class="mana-bar-fill" id="dash-mana-bar" style="width:0%"></div>' +
      '<span class="mana-bar-text" id="dash-mana-text">0</span></div></div>' +
    '<div class="dashboard-section"><h3>Discipline Resources</h3><div class="resource-bars-grid">' + resGrid + '</div></div>' +
    '<div class="dashboard-section"><h3>Status</h3><div class="dashboard-status">' +
      '<div class="status-card"><h4>Active Research</h4><div id="dash-research-name" class="status-value" style="color:var(--text-muted);font-style:italic">None</div>' +
        '<div class="resource-bar-container" id="dash-research-bar-wrap" style="margin-top:0.35rem;display:none"><div class="resource-bar-fill" id="dash-research-bar" style="width:0%;background:var(--bar-fill)"></div></div>' +
        '<div class="resource-bar-rate" id="dash-research-pct" style="display:none"></div></div>' +
      '<div class="status-card"><h4>Combat</h4><div id="dash-combat-body"></div></div>' +
    '</div></div>' +
    '<div class="dashboard-section" id="dash-challenge-section" style="display:none"><h3>Active Challenge</h3>' +
      '<div class="status-card" style="border-color:var(--accent-gold)"><div class="resource-bar-header">' +
        '<span id="dash-challenge-name"></span><span id="dash-challenge-time"></span></div>' +
        '<div class="resource-bar-container"><div class="resource-bar-fill" id="dash-challenge-bar" style="width:0%;background:var(--bar-fill)"></div></div></div></div>' +
    '<div class="dashboard-section"><h3>Arcane Knowledge</h3><div class="dashboard-status">' +
      '<div class="status-card"><h4>Knowledge</h4><div class="status-value" id="dash-ak">0 AK</div></div>' +
      '<div class="status-card"><h4>Convergence</h4><div class="status-value" id="dash-convergence">0 completed</div></div>' +
    '</div></div>' +
    '<div class="dashboard-section"><h3>Quick Stats</h3><div class="quick-stats">' +
      '<div class="quick-stat"><div class="quick-stat-value" id="dash-stat-research">0 / ' + totalNodes + '</div><div class="quick-stat-label">Research Nodes</div></div>' +
      '<div class="quick-stat"><div class="quick-stat-value" id="dash-stat-discoveries">0 / ' + allDisc.length + '</div><div class="quick-stat-label">Discoveries</div></div>' +
      '<div class="quick-stat"><div class="quick-stat-value" id="dash-stat-generators">0</div><div class="quick-stat-label">Generators Owned</div></div>' +
      '<div class="quick-stat"><div class="quick-stat-value" id="dash-stat-convergences">0</div><div class="quick-stat-label">Convergences</div></div>' +
      '<div class="quick-stat"><div class="quick-stat-value insights-counter"><span class="insight-icon">\u2726</span> <span id="dash-stat-insights">0</span></div><div class="quick-stat-label">Arcane Insights</div></div>' +
    '</div></div></div>';
  container._dashInit = true;
}

function renderDashboardPanel(container, state, data, engines) {
  if (!container._dashInit) _dashBuildSkeleton(container, data);

  // Helper to set text only when changed
  function _t(id, val) { var el = document.getElementById(id); if (el && el.textContent !== val) el.textContent = val; }
  function _h(id, val) { var el = document.getElementById(id); if (el && el.innerHTML !== val) el.innerHTML = val; }
  function _s(id, prop, val) { var el = document.getElementById(id); if (el && el.style[prop] !== val) el.style[prop] = val; }
  function _d(id, show) { var el = document.getElementById(id); if (el) el.style.display = show ? '' : 'none'; }

  // Hint
  var hint = getDashboardHint(state, data);
  _d('dash-hint', !!hint);
  if (hint) _h('dash-hint', hint);

  // Current Pursuit
  if (state.tutorial && !state.tutorial.completed && state.tutorial.currentObjective < OBJECTIVES.length) {
    var obj = OBJECTIVES[state.tutorial.currentObjective];
    _d('dash-pursuit', true);
    _t('dash-pursuit-text', obj.text);
    if (obj.progress) {
      _d('dash-pursuit-progress', true);
      _t('dash-pursuit-progress', obj.progress(state));
    } else {
      _d('dash-pursuit-progress', false);
    }
  } else {
    _d('dash-pursuit', false);
  }

  // Mana
  var mana = (state.resources.mana && state.resources.mana.amount) || 0;
  var manaRate = getGenerationRate(state, data, 'mana');
  var manaCap = Math.max(1000, mana * 1.5);
  var manaPct = Math.min(100, (mana / manaCap) * 100).toFixed(2) + '%';
  _s('dash-mana-bar', 'width', manaPct);
  _h('dash-mana-text', formatNumber(mana) + ' &nbsp;(+' + formatNumber(manaRate) + '/s)');

  // Discipline resources
  for (var i = 0; i < DASHBOARD_DISCIPLINE_RESOURCES.length; i++) {
    var res = DASHBOARD_DISCIPLINE_RESOURCES[i];
    var amount = (state.resources[res.id] && state.resources[res.id].amount) || 0;
    var rate = getGenerationRate(state, data, res.id);
    var unlocked = amount > 0 || rate > 0;
    var item = document.getElementById('dash-res-' + res.id);
    if (item) {
      if (unlocked) {
        item.className = 'resource-bar-item';
        _t('dash-res-name-' + res.id, res.icon + ' ' + res.name);
        _t('dash-res-amt-' + res.id, formatNumber(amount));
        var cap = Math.max(1000, amount * 1.5);
        _s('dash-res-bar-' + res.id, 'width', Math.min(100, (amount / cap) * 100).toFixed(2) + '%');
        _t('dash-res-rate-' + res.id, '+' + formatNumber(rate) + '/s');
      } else {
        item.className = 'resource-bar-item locked';
        _t('dash-res-name-' + res.id, res.icon + ' ???');
        _t('dash-res-amt-' + res.id, '\u2014');
        _s('dash-res-bar-' + res.id, 'width', '0%');
        _t('dash-res-rate-' + res.id, 'locked');
      }
    }
  }

  // Research status
  var progress = engines.research.getResearchProgress(state);
  if (progress) {
    var allNodes = (data.disciplines && data.disciplines.nodes) || [];
    var node = allNodes.find(function(n) { return n.id === progress.nodeId; });
    var nodeName = node ? node.name : progress.nodeId;
    var pct = Math.floor(progress.progress * 100);
    var remaining = formatTime(Math.ceil(progress.remaining));
    var rEl = document.getElementById('dash-research-name');
    if (rEl) { rEl.style.color = ''; rEl.style.fontStyle = ''; }
    _t('dash-research-name', nodeName);
    _d('dash-research-bar-wrap', true);
    _s('dash-research-bar', 'width', pct + '%');
    _d('dash-research-pct', true);
    _t('dash-research-pct', pct + '% \u2014 ' + remaining + ' remaining');
    // Lore snippet
    var loreEl = document.getElementById('dash-research-lore');
    if (!loreEl) {
      var pctEl = document.getElementById('dash-research-pct');
      if (pctEl) {
        loreEl = document.createElement('div');
        loreEl.id = 'dash-research-lore';
        loreEl.className = 'research-lore-snippet';
        pctEl.parentNode.insertBefore(loreEl, pctEl.nextSibling);
      }
    }
    if (loreEl) loreEl.textContent = getLoreSnippet(state, data);
  } else {
    var rEl2 = document.getElementById('dash-research-name');
    if (rEl2) { rEl2.style.color = 'var(--text-muted)'; rEl2.style.fontStyle = 'italic'; }
    _t('dash-research-name', 'None');
    _d('dash-research-bar-wrap', false);
    _d('dash-research-pct', false);
    var loreEl2 = document.getElementById('dash-research-lore');
    if (loreEl2) loreEl2.remove();
  }

  // Combat status
  var combat = state.combat;
  var combatHtml = '';
  if (combat && combat.active) {
    var enc = combat.active.encounter;
    var enemyPct = Math.max(0, Math.min(100, Math.round((combat.active.enemyHealth / combat.active.enemyMaxHealth) * 100)));
    var playerPct = Math.max(0, Math.min(100, Math.round((combat.health / (combat.maxHealth || 100)) * 100)));
    combatHtml = '<div style="font-size:0.8rem;margin-bottom:0.2rem">' + _escapeHtml(enc.name) + '</div>' +
      '<div class="resource-bar-rate">Enemy</div><div class="resource-bar-container"><div class="resource-bar-fill" style="width:' + enemyPct + '%;background:var(--bar-flux)"></div></div>' +
      '<div class="resource-bar-rate">Player</div><div class="resource-bar-container"><div class="resource-bar-fill" style="width:' + playerPct + '%;background:var(--bar-ichor)"></div></div>';
  } else if (combat && (combat.recovery || 0) > 0) {
    combatHtml = '<div class="status-value" style="color:var(--text-muted);font-style:italic">Recovering... ' + combat.recovery + 's</div>';
  } else {
    combatHtml = '<div class="status-value" style="color:var(--text-muted);font-style:italic">No active threat</div>';
  }
  _h('dash-combat-body', combatHtml);

  // Challenge
  var activeChallenge = state.challenges && state.challenges.active;
  _d('dash-challenge-section', !!activeChallenge);
  if (activeChallenge) {
    _t('dash-challenge-name', activeChallenge.challengeDef.name || 'Challenge');
    _t('dash-challenge-time', Math.max(0, activeChallenge.remaining || 0) + 's remaining');
    _s('dash-challenge-bar', 'width', Math.round(Math.min(1, activeChallenge.progress || 0) * 100) + '%');
  }

  // AK + Convergence
  var ak = (state.resources.arcane_knowledge && state.resources.arcane_knowledge.amount) || 0;
  var convergenceCount = (state.prestige && state.prestige.convergenceCount) || 0;
  _t('dash-ak', formatNumber(ak) + ' AK');
  var canConv = engines.prestige.canConverge(state, data);
  _h('dash-convergence', canConv ? '<span class="convergence-available">\u2726 Convergence Available</span>' : convergenceCount + ' completed');

  // Quick stats
  var completedNodes = (state.research && state.research.completed) ? state.research.completed.length : 0;
  var allN = (data.disciplines && data.disciplines.nodes) || [];
  var totalN = allN.filter(function(n) { return !n.hidden; }).length;
  var foundDisc = (state.discoveries && state.discoveries.found) ? state.discoveries.found.length : 0;
  var totalDisc = ((data.events && data.events.discoveries) || []).length;
  var genDefs = (data.resources && data.resources.generators) || [];
  var totalGens = 0;
  for (var g = 0; g < genDefs.length; g++) { var gs = state.generators[genDefs[g].id]; if (gs) totalGens += gs.count; }

  _t('dash-stat-research', completedNodes + ' / ' + totalN);
  _t('dash-stat-discoveries', foundDisc + ' / ' + totalDisc);
  _t('dash-stat-generators', String(totalGens));
  _t('dash-stat-convergences', String(convergenceCount));
  _t('dash-stat-insights', String(state.combat.insights || 0));
}

// ---------------------------------------------------------------------------
// Module-level state for tab selection (persists across renders)
// ---------------------------------------------------------------------------

// The currently selected discipline tab in the research panel.
// "synergies" is a special value for the Synergies tab.
let activeDisciplineTab = 'temporal_arcana';

function setActiveDisciplineTab(disciplineId) {
  activeDisciplineTab = disciplineId;
}

// ---------------------------------------------------------------------------
// Research Panel
// ---------------------------------------------------------------------------

/**
 * Renders the research panel for all disciplines plus a Synergies tab.
 *
 * @param {HTMLElement} container   - The view-panel element to render into.
 * @param {object}      state       - Live game state.
 * @param {object}      data        - Static game data.
 * @param {object}      engines     - Engine modules (must expose engines.research).
 */
function renderResearchPanel(container, state, data, engines) {
  const disciplines = (data.disciplines && data.disciplines.disciplines) || [];

  // --- Discipline tab bar ---
  let html = '<div class="research-tabs">';
  for (const disc of disciplines) {
    const isActive = activeDisciplineTab === disc.id;
    html += `<button class="research-tab${isActive ? ' active' : ''}" data-discipline="${disc.id}">${disc.name}</button>`;
  }
  const synergiesActive = activeDisciplineTab === 'synergies';
  html += `<button class="research-tab research-tab--synergies${synergiesActive ? ' active' : ''}" data-discipline="synergies">Synergies</button>`;
  html += '</div>';

  // --- In-progress research banner (always shown if research is active) ---
  const progress = engines.research.getResearchProgress(state);
  if (progress) {
    const inProgressNode = _findNode(data, progress.nodeId);
    const inProgressName = inProgressNode ? inProgressNode.name : progress.nodeId;
    const pct = Math.floor(progress.progress * 100);
    const remaining = formatTime(Math.ceil(progress.remaining));
    html += `
      <div class="research-in-progress-banner">
        <span class="research-in-progress-label">Researching: <strong>${inProgressName}</strong></span>
        <div class="research-progress-track">
          <div class="research-progress-bar" style="width: ${pct}%"></div>
        </div>
        <span class="research-progress-text">${pct}% — ${remaining} remaining</span>
      </div>`;
  }

  // --- Tab content ---
  if (activeDisciplineTab === 'synergies') {
    html += _renderSynergiesTab(state, data, engines);
  } else {
    html += _renderDisciplineTab(state, data, engines, activeDisciplineTab, progress);
  }

  if (container._prevHtml !== html) { container._prevHtml = html; container.innerHTML = html; }

  // Wire tab click events after innerHTML is set.
  const tabButtons = container.querySelectorAll('.research-tab[data-discipline]');
  for (const btn of tabButtons) {
    btn.addEventListener('click', () => {
      setActiveDisciplineTab(btn.dataset.discipline);
      renderResearchPanel(container, state, data, engines);
    });
  }

  // Wire research buttons.
  container.querySelectorAll('.research-btn[data-node-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const nodeId = btn.dataset.nodeId;
      if (nodeId) {
        engines.research.startResearch(state, data, nodeId);
        renderResearchPanel(container, state, data, engines);
      }
    });
  });
}

// ---------------------------------------------------------------------------
// Private: discipline tab content
// ---------------------------------------------------------------------------

function _renderDisciplineTab(state, data, engines, disciplineId, progress) {
  const allNodes = (data.disciplines && data.disciplines.nodes) || [];

  // Gather all nodes for this discipline (exclude hidden/synergy nodes).
  const disciplineNodes = allNodes.filter(
    (n) => n.discipline === disciplineId && !n.hidden
  );

  if (disciplineNodes.length === 0) {
    return '<p class="research-empty">No research nodes found for this discipline.</p>';
  }

  // Determine status sets.
  const completed = new Set(state.research.completed);
  const inProgressId = state.research.inProgress ? state.research.inProgress.nodeId : null;
  const availableNodes = new Set(
    engines.research.getAvailableNodes(state, data, disciplineId).map((n) => n.id)
  );

  // When no research has been done yet, highlight the very first available node
  // to guide the player toward clicking "Research".
  const noResearchDone = state.research.completed.length === 0;
  let firstAvailableHighlighted = false;

  // Group by tier.
  const byTier = new Map();
  for (const node of disciplineNodes) {
    if (!byTier.has(node.tier)) byTier.set(node.tier, []);
    byTier.get(node.tier).push(node);
  }

  const TIER_LABELS = {
    1: 'Tier 1 — Fundamentals',
    2: 'Tier 2 — Applications',
    3: 'Tier 3 — Mastery',
    4: 'Tier 4 — Ascendancy',
  };

  let html = '<div class="research-node-list">';

  for (const [tier, nodes] of [...byTier.entries()].sort(([a], [b]) => a - b)) {
    const tierLabel = TIER_LABELS[tier] || `Tier ${tier}`;
    html += `<h3 class="research-tier-heading">${tierLabel}</h3>`;

    for (const node of nodes) {
      // Apply pulsing highlight only to the very first available node when
      // the player has not yet completed any research.
      let highlight = false;
      if (noResearchDone && !firstAvailableHighlighted && availableNodes.has(node.id)) {
        highlight = true;
        firstAvailableHighlighted = true;
      }
      html += _renderNode(node, state, data, completed, inProgressId, availableNodes, progress, highlight);
    }
  }

  html += '</div>';
  return html;
}

// ---------------------------------------------------------------------------
// Private: synergies tab content
// ---------------------------------------------------------------------------

function _renderSynergiesTab(state, data, engines) {
  const synergyNodes = engines.research.getVisibleSynergyNodes(state, data);

  if (synergyNodes.length === 0) {
    return '<p class="research-empty">No synergy nodes are currently visible. Complete Tier 2 nodes in multiple disciplines to reveal synergies.</p>';
  }

  const completed = new Set(state.research.completed);
  const inProgressId = state.research.inProgress ? state.research.inProgress.nodeId : null;
  const availableNodes = new Set(
    synergyNodes
      .filter((n) => canAfford(state, n.cost || {}) && !completed.has(n.id) && inProgressId !== n.id)
      .map((n) => n.id)
  );
  const progress = null; // progress banner already shown above

  let html = '<div class="research-node-list research-node-list--synergies">';
  for (const node of synergyNodes) {
    html += _renderNode(node, state, data, completed, inProgressId, availableNodes, progress);
  }
  html += '</div>';
  return html;
}

// ---------------------------------------------------------------------------
// Private: individual node rendering
// ---------------------------------------------------------------------------

function _renderNode(node, state, data, completed, inProgressId, availableNodes, progress, highlight = false) {
  const isCompleted = completed.has(node.id);
  const isInProgress = inProgressId === node.id;
  const isAvailable = availableNodes.has(node.id);

  let statusClass;
  if (isCompleted) {
    statusClass = 'node-completed';
  } else if (isInProgress) {
    statusClass = 'node-in-progress';
  } else if (isAvailable) {
    statusClass = 'node-available';
  } else {
    statusClass = 'node-locked';
  }

  const costStr = _formatCost(node.cost || {});
  var insightStr = '';
  if (node.insightCost) {
    var hasEnough = (state.combat.insights || 0) >= node.insightCost;
    insightStr = ' + <span class="node-insight-cost' + (hasEnough ? '' : ' insufficient') + '">' +
      '\u2726 ' + node.insightCost + ' Arcane Insight' + (node.insightCost > 1 ? 's' : '') + '</span>';
  }
  const durationStr = formatTime(node.duration || 0);

  let statusHtml = '';
  if (isCompleted) {
    statusHtml = '<span class="node-status-icon">&#10003;</span>';
  } else if (isInProgress && progress && progress.nodeId === node.id) {
    const pct = Math.floor(progress.progress * 100);
    const remaining = formatTime(Math.ceil(progress.remaining));
    statusHtml = `
      <div class="node-progress-track">
        <div class="node-progress-bar" style="width: ${pct}%"></div>
      </div>
      <span class="node-progress-text">${remaining} remaining</span>`;
  } else if (isAvailable) {
    const alreadyResearching = !!state.research.inProgress;
    statusHtml = `<button class="research-btn" data-node-id="${node.id}"${alreadyResearching ? ' disabled title="Research already in progress"' : ''}>Research</button>`;
  } else {
    // Locked: show requires list
    const requires = node.requires || [];
    if (requires.length > 0) {
      const reqNames = requires.map((reqId) => {
        const reqNode = _findNode(data, reqId);
        return reqNode ? reqNode.name : reqId;
      });
      statusHtml = `<span class="node-requires">Requires: ${reqNames.join(', ')}</span>`;
    } else {
      statusHtml = '<span class="node-requires">Prerequisites not met</span>';
    }
  }

  const highlightClass = highlight ? ' node-highlight' : '';

  return `
    <div class="research-node ${statusClass}${highlightClass}">
      <div class="node-header">
        <span class="node-name">${node.name}</span>
        <span class="node-duration">${durationStr}</span>
      </div>
      <p class="node-description">${node.description}</p>
      <div class="node-cost">${costStr}${insightStr}</div>
      <div class="node-status">${statusHtml}</div>
    </div>`;
}

// ---------------------------------------------------------------------------
// Generator Panel
// ---------------------------------------------------------------------------

/**
 * Renders the generators view into the given container element.
 *
 * @param {HTMLElement} container - The #view-generators element.
 * @param {object}      state     - Live game state.
 * @param {object}      data      - Static data from loadData().
 * @param {object}      engines   - Engine modules.
 */
function renderGeneratorPanel(container, state, data, engines) {
  const generatorDefs = (data.resources && data.resources.generators) || [];

  // Human-readable names for discipline keys.
  const DISCIPLINE_LABELS = {
    temporal_arcana:  'Temporal Arcana',
    spatial_weaving:  'Spatial Weaving',
    mind_sculpting:   'Mind Sculpting',
    vital_alchemy:    'Vital Alchemy',
    shadow_binding:   'Shadow Binding',
    chaos_channeling: 'Chaos Channeling',
    order_forging:    'Order Forging',
  };

  // Group generators by discipline, preserving insertion order.
  const byDiscipline = new Map();
  for (const def of generatorDefs) {
    if (!byDiscipline.has(def.discipline)) {
      byDiscipline.set(def.discipline, []);
    }
    byDiscipline.get(def.discipline).push(def);
  }

  let html = '';

  for (const [discipline, gens] of byDiscipline) {
    // Only show generators whose unlock_requires node is in state.research.completed.
    const unlockedGens = gens.filter(
      (g) => state.research.completed.includes(g.unlock_requires)
    );
    if (unlockedGens.length === 0) continue;

    const disciplineLabel = DISCIPLINE_LABELS[discipline] || discipline;
    html += `<div class="gen-discipline-group">`;
    html += `<h3 class="gen-discipline-heading">${disciplineLabel}</h3>`;

    for (const def of unlockedGens) {
      const genState = state.generators[def.id] || { count: 0, level: 1 };
      const { count, level } = genState;

      // Output per second at current level and count.
      const levelMult = 1 + 0.5 * (level - 1);
      const outputPerSec = def.base_output * levelMult * count;

      // Buy cost: base_cost * 1.15^count
      const buyScaleFactor = Math.pow(1.15, count);
      const buyCost = {};
      for (const [resId, baseAmt] of Object.entries(def.base_cost)) {
        buyCost[resId] = baseAmt * buyScaleFactor;
      }
      const canBuy = canAfford(state, buyCost);
      const buyCostStr = _formatCost(buyCost);

      // Upgrade cost: upgrade_cost * 2^(level-1), disabled at max level.
      const atMaxLevel = level >= def.max_level;
      const upgradeScaleFactor = Math.pow(2, level - 1);
      const upgradeCost = {};
      for (const [resId, baseAmt] of Object.entries(def.upgrade_cost)) {
        upgradeCost[resId] = baseAmt * upgradeScaleFactor;
      }
      const canUpgrade = !atMaxLevel && canAfford(state, upgradeCost);
      const upgradeCostStr = atMaxLevel ? 'MAX' : _formatCost(upgradeCost);

      html += `
        <div class="gen-row" data-gen-id="${def.id}">
          <div class="gen-info">
            <span class="gen-name">${def.name}</span>
            <span class="gen-stats">x${count} &nbsp;|&nbsp; Lv.${level}</span>
            <span class="gen-output">${formatNumber(outputPerSec)}/sec</span>
          </div>
          <div class="gen-actions">
            <button
              class="gen-buy-btn"
              data-gen-id="${def.id}"
              ${canBuy ? '' : 'disabled'}
            >Buy (${buyCostStr})</button>
            <button
              class="gen-upgrade-btn"
              data-gen-id="${def.id}"
              ${canUpgrade ? '' : 'disabled'}
            >${atMaxLevel ? 'Upgrade (MAX)' : `Upgrade to Lv.${level + 1} (${upgradeCostStr})`}</button>
          </div>
        </div>`;
    }

    html += `</div>`;
  }

  if (html === '') {
    html = '<p class="gen-empty">No generators unlocked yet. Research disciplines to unlock generators.</p>';
  }

  if (container._prevHtml !== html) { container._prevHtml = html; container.innerHTML = html; }
}

// ---------------------------------------------------------------------------
// Combat Panel
// ---------------------------------------------------------------------------

/**
 * Renders the combat panel.
 *
 * @param {HTMLElement} container - The view-panel element to render into.
 * @param {object}      state     - Live game state.
 * @param {object}      data      - Static game data.
 * @param {object}      engines   - Engine modules (must expose engines.combat).
 */
function renderCombatPanel(container, state, data, engines) {
  const combat = state.combat;

  // --- Idle / recovery states ---
  if (!combat.active && (combat.recovery || 0) <= 0) {
    container.innerHTML = '<p class="combat-idle">No threats detected. Visit the Sanctum to seek challenges.</p>';
    return;
  }

  if (!combat.active && (combat.recovery || 0) > 0) {
    container.innerHTML = `<p class="combat-recovery">Recovering... ${combat.recovery}s remaining</p>`;
    return;
  }

  // --- Active combat ---
  const active = combat.active;
  const encounter = active.encounter;

  // Determine current enemy action text from pattern
  const pattern = encounter.pattern || [];
  let currentActionText = '';
  if (pattern.length > 0) {
    const actionRaw = pattern[active.patternIndex % pattern.length];
    if (actionRaw.startsWith('special:')) {
      const key = actionRaw.slice('special:'.length);
      const actionDef = encounter.actions && encounter.actions[key];
      currentActionText = actionDef ? actionDef.description || key : key;
    } else {
      currentActionText = actionRaw.replace(/_/g, ' ');
    }
  }

  // Enemy health bar
  const enemyPct = Math.max(0, Math.min(100, Math.round((active.enemyHealth / active.enemyMaxHealth) * 100)));

  // Player health bar
  const playerPct = Math.max(0, Math.min(100, Math.round((combat.health / (combat.maxHealth || 100)) * 100)));

  // Active player buffs and debuffs
  const buffs = active.buffs || [];
  const debuffs = active.debuffs || [];

  // Combat log: last 5 entries
  const logEntries = (combat.log || []).slice(-5);

  // Spells available to the player
  const allSpells = (data.spells && data.spells.spells) || [];
  const allNodes = (data.disciplines && data.disciplines.nodes) || [];
  const availableSpells = allSpells.filter((spell) =>
    state.research.completed.some((nodeId) => {
      const node = allNodes.find((n) => n.id === nodeId);
      return node && node.discipline === spell.discipline;
    })
  );

  const cooldowns = combat.cooldowns || {};
  const mana = (state.resources.mana && state.resources.mana.amount) || 0;

  // Consumables in inventory with count > 0
  const allConsumables = (data.spells && data.spells.consumables) || [];
  const inventory = combat.inventory || {};
  const heldConsumables = allConsumables.filter((c) => (inventory[c.id] || 0) > 0);

  // Stance
  const stance = combat.stance || 'balanced';

  // --- Build HTML ---
  let html = '';

  // Enemy section
  html += `
    <div class="combat-enemy-section">
      <div class="combat-section-heading">Enemy</div>
      <div class="combat-enemy-name">${encounter.name}</div>
      <div class="combat-health-bar-wrap">
        <div class="combat-health-bar" style="width: ${enemyPct}%"></div>
      </div>
      <div class="combat-health-text">${active.enemyHealth} / ${active.enemyMaxHealth} HP</div>
      <p class="combat-enemy-description">${encounter.description || ''}</p>
      ${currentActionText ? `<div class="combat-enemy-action">Next action: ${currentActionText}</div>` : ''}
    </div>`;

  // Player section
  html += `
    <div class="combat-player-section">
      <div class="combat-section-heading">Player</div>
      <div class="combat-health-bar-wrap">
        <div class="combat-health-bar combat-health-bar--player" style="width: ${playerPct}%"></div>
      </div>
      <div class="combat-health-text">${combat.health} / ${combat.maxHealth} HP</div>`;

  if (buffs.length > 0 || debuffs.length > 0) {
    html += '<div class="combat-status-effects">';
    for (const buff of buffs) {
      const sign = buff.value >= 0 ? '+' : '';
      html += `<span class="combat-buff">${_toDisplayName(buff.stat)} ${sign}${buff.value} (${buff.duration}r)</span>`;
    }
    for (const debuff of debuffs) {
      html += `<span class="combat-debuff">${_toDisplayName(debuff.stat)} ${debuff.value} (${debuff.duration}r)</span>`;
    }
    html += '</div>';
  }

  html += '</div>'; // end player section

  // Combat log
  html += '<div class="combat-log">';
  html += '<div class="combat-section-heading">Combat Log</div>';
  for (const entry of logEntries) {
    html += `<div class="combat-log-entry">${_escapeHtml(entry)}</div>`;
  }
  html += '</div>';

  // Spell buttons
  if (availableSpells.length > 0) {
    html += '<div class="combat-spells">';
    html += '<div class="combat-section-heading">Spells</div>';
    for (const spell of availableSpells) {
      const cd = cooldowns[spell.id] || 0;
      const onCooldown = cd > 0;
      const canAffordMana = mana >= (spell.mana_cost || 0);
      const disabled = onCooldown || !canAffordMana;
      const cdText = onCooldown ? ` (${cd}r)` : '';
      html += `
        <button class="combat-spell-btn${disabled ? ' disabled' : ''}" data-spell-id="${spell.id}"${disabled ? ' disabled' : ''}>
          ${spell.name} — ${spell.mana_cost || 0} mana${cdText}
        </button>`;
    }
    html += '</div>';
  }

  // Consumable buttons
  if (heldConsumables.length > 0) {
    html += '<div class="combat-consumables">';
    html += '<div class="combat-section-heading">Consumables</div>';
    for (const cons of heldConsumables) {
      const count = inventory[cons.id] || 0;
      html += `
        <button class="combat-consumable-btn" data-consumable-id="${cons.id}">
          ${cons.name} (${count})
        </button>`;
    }
    html += '</div>';
  }

  // Stance selector
  html += `
    <div class="combat-stance">
      <div class="combat-section-heading">Stance</div>
      <button class="combat-stance-btn${stance === 'aggressive' ? ' active' : ''}" data-stance="aggressive">Aggressive</button>
      <button class="combat-stance-btn${stance === 'balanced' ? ' active' : ''}" data-stance="balanced">Balanced</button>
      <button class="combat-stance-btn${stance === 'defensive' ? ' active' : ''}" data-stance="defensive">Defensive</button>
    </div>`;

  // Retreat button
  html += '<div class="combat-actions"><button class="combat-retreat-btn">Retreat</button></div>';

  if (container._prevHtml !== html) { container._prevHtml = html; container.innerHTML = html; }

  // Wire spell buttons
  container.querySelectorAll('.combat-spell-btn[data-spell-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const spellId = btn.dataset.spellId;
      if (spellId) engines.combat.castSpell(state, data, spellId);
    });
  });

  // Wire consumable buttons
  container.querySelectorAll('.combat-consumable-btn[data-consumable-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const consumableId = btn.dataset.consumableId;
      if (consumableId) engines.combat.useConsumable(state, data, consumableId);
    });
  });

  // Wire stance buttons
  container.querySelectorAll('.combat-stance-btn[data-stance]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const newStance = btn.dataset.stance;
      if (newStance) engines.combat.setStance(state, newStance);
    });
  });

  // Wire retreat button
  const retreatBtn = container.querySelector('.combat-retreat-btn');
  if (retreatBtn) {
    retreatBtn.addEventListener('click', () => {
      engines.combat.retreat(state);
    });
  }
}

// ---------------------------------------------------------------------------
// Sanctum Panel
// ---------------------------------------------------------------------------

/**
 * Renders the sanctum panel.
 *
 * @param {HTMLElement} container - The view-panel element to render into.
 * @param {object}      state     - Live game state.
 * @param {object}      data      - Static game data.
 * @param {object}      engines   - Engine modules (must expose engines.combat).
 */
function renderSanctumPanel(container, state, data, engines) {
  const stats = engines.combat.calculateStats(state, data);

  // --- Stats summary ---
  let html = `
    <div class="sanctum-stats">
      <div class="sanctum-section-heading">Combat Stats</div>
      <div class="sanctum-stat-row"><span class="sanctum-stat-label">Arcane Power</span><span class="sanctum-stat-value">${stats.arcanePower}</span></div>
      <div class="sanctum-stat-row"><span class="sanctum-stat-label">Resilience</span><span class="sanctum-stat-value">${stats.resilience}</span></div>
      <div class="sanctum-stat-row"><span class="sanctum-stat-label">Speed</span><span class="sanctum-stat-value">${(stats.speed * 100).toFixed(0)}%</span></div>
      <div class="sanctum-stat-row"><span class="sanctum-stat-label">Instability</span><span class="sanctum-stat-value">${(stats.instability * 100).toFixed(0)}%</span></div>
    </div>`;

  // --- Challenge encounters ---
  const encounters = data.encounters || [];
  const highestTier = _getHighestCompletedTier(state, data);

  html += '<div class="sanctum-encounters">';
  html += '<div class="sanctum-section-heading">Challenge Encounters</div>';

  if (encounters.length === 0) {
    html += '<p class="sanctum-empty">No encounters available.</p>';
  } else {
    for (const enc of encounters) {
      const unlocked = highestTier >= enc.tier;
      html += `
        <div class="sanctum-encounter${unlocked ? '' : ' sanctum-encounter--locked'}">
          <div class="sanctum-encounter-header">
            <span class="sanctum-encounter-name">${enc.name}</span>
            <span class="sanctum-encounter-tier">Tier ${enc.tier}</span>
          </div>
          <p class="sanctum-encounter-description">${enc.description || ''}</p>
          <button class="sanctum-challenge-btn" data-encounter-id="${enc.id}"${unlocked ? '' : ' disabled'}>
            Challenge
          </button>
        </div>`;
    }
  }

  html += '</div>';

  // --- Crafting section ---
  const allConsumables = (data.spells && data.spells.consumables) || [];
  const inventory = state.combat.inventory || {};

  html += '<div class="sanctum-crafting">';
  html += '<div class="sanctum-section-heading">Consumable Crafting</div>';

  const unlockedConsumables = allConsumables.filter(
    (c) => !c.requires_research || state.research.completed.includes(c.requires_research)
  );

  if (unlockedConsumables.length === 0) {
    html += '<p class="sanctum-empty">No consumables unlocked yet. Research to unlock crafting recipes.</p>';
  } else {
    for (const cons of unlockedConsumables) {
      const currentStock = inventory[cons.id] || 0;
      const maxStack = cons.max_stack || 0;
      const craftCostStr = _formatCost(cons.craft_cost || {});
      const atMax = currentStock >= maxStack;
      const canAffordIt = _canAffordCost(state, cons.craft_cost || {});
      const craftDisabled = atMax || !canAffordIt;

      html += `
        <div class="sanctum-consumable">
          <div class="sanctum-consumable-header">
            <span class="sanctum-consumable-name">${cons.name}</span>
            <span class="sanctum-consumable-stock">${currentStock} / ${maxStack}</span>
          </div>
          <p class="sanctum-consumable-description">${cons.description || ''}</p>
          <div class="sanctum-consumable-cost">Cost: ${craftCostStr}</div>
          <button class="sanctum-craft-btn" data-consumable-id="${cons.id}"${craftDisabled ? ' disabled' : ''}>
            ${atMax ? 'At Max' : 'Craft'}
          </button>
        </div>`;
    }
  }

  html += '</div>';

  if (container._prevHtml !== html) { container._prevHtml = html; container.innerHTML = html; }

  // Wire challenge buttons
  container.querySelectorAll('.sanctum-challenge-btn[data-encounter-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const encounterId = btn.dataset.encounterId;
      if (encounterId) engines.combat.startCombat(state, data, encounterId);
    });
  });

  // Wire craft buttons
  container.querySelectorAll('.sanctum-craft-btn[data-consumable-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const consumableId = btn.dataset.consumableId;
      if (consumableId) {
        engines.combat.craftConsumable(state, data, consumableId);
        renderSanctumPanel(container, state, data, engines);
      }
    });
  });
}

// ---------------------------------------------------------------------------
// Event Panel
// ---------------------------------------------------------------------------

/**
 * Renders the event panel — or an overlay card when an event is active.
 * This is called by renderer.js to populate the event-overlay card content.
 *
 * @param {HTMLElement} container - The element to render into.
 * @param {object}      state     - Live game state.
 * @param {object}      data      - Static game data.
 * @param {object}      engines   - Engine modules (must expose engines.events).
 */
function renderEventPanel(container, state, data, engines) {
  const active = state.events && state.events.active;

  if (!active) {
    container.innerHTML = '<p class="event-idle">No events at this time.</p>';
    return;
  }

  const { eventDef, timestamp } = active;
  const choices = eventDef.choices || [];
  const discoveredHidden = (state.events && state.events.discoveredHidden) || [];

  let html = `<div class="event-card">`;
  html += `<h3 class="event-title">${_escapeHtml(eventDef.title || eventDef.name || 'Event')}</h3>`;
  html += `<p class="event-text">${_escapeHtml(eventDef.text || '')}</p>`;

  // Timeout countdown
  if (eventDef.timeout) {
    const elapsed = Math.floor((Date.now() - timestamp) / 1000);
    const remaining = Math.max(0, eventDef.timeout - elapsed);
    html += `<div class="event-countdown">Time remaining: ${remaining}s</div>`;
  }

  // Choice buttons
  html += `<div class="event-choices">`;
  for (let i = 0; i < choices.length; i++) {
    const choice = choices[i];
    const isHidden = choice.hidden === true;
    const isDiscovered = discoveredHidden.includes(choice.label);

    let label;
    let disabled = false;

    if (isHidden && !isDiscovered) {
      label = '???';
    } else {
      label = _escapeHtml(choice.label || `Choice ${i + 1}`);
    }

    // Check requires_choice condition (e.g. discipline_unlocked)
    if (choice.requires_choice) {
      const req = choice.requires_choice;
      if (req.discipline_unlocked) {
        const nodes = (data.disciplines && data.disciplines.nodes) || [];
        const met = nodes.some(
          (n) =>
            n.discipline === req.discipline_unlocked &&
            (state.research.completed || []).includes(n.id)
        );
        if (!met) disabled = true;
      }
    }

    html += `<button
      class="event-choice-btn${disabled ? ' disabled' : ''}"
      data-choice-index="${i}"
      ${disabled ? 'disabled' : ''}
    >${label}</button>`;
  }
  html += `</div>`; // .event-choices
  html += `</div>`; // .event-card

  if (container._prevHtml !== html) { container._prevHtml = html; container.innerHTML = html; }

  // Wire choice buttons
  container.querySelectorAll('.event-choice-btn[data-choice-index]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.choiceIndex, 10);
      if (!isNaN(idx)) {
        engines.events.makeChoice(state, data, idx);
      }
    });
  });
}

// ---------------------------------------------------------------------------
// Discovery Panel
// ---------------------------------------------------------------------------

/**
 * Renders the discoveries panel.
 *
 * @param {HTMLElement} container - The view-panel element to render into.
 * @param {object}      state     - Live game state.
 * @param {object}      data      - Static game data.
 * @param {object}      engines   - Engine modules.
 */
function renderDiscoveryPanel(container, state, data, engines) {
  const allDiscoveries = (data.events && data.events.discoveries) || [];
  const found = (state.discoveries && state.discoveries.found) || [];

  const foundCount = found.length;
  const totalCount = allDiscoveries.length;

  let html = `<div class="discovery-header">`;
  html += `<h2>Discoveries</h2>`;
  html += `<span class="discovery-count">${foundCount} / ${totalCount}</span>`;
  html += `</div>`;

  if (totalCount === 0) {
    html += '<p class="discovery-empty">No discoveries defined.</p>';
    if (container._prevHtml !== html) { container._prevHtml = html; container.innerHTML = html; }
    return;
  }

  html += `<div class="discovery-grid">`;
  for (const disc of allDiscoveries) {
    const isFound = found.includes(disc.id);
    if (isFound) {
      html += `
        <div class="discovery-card found">
          <div class="discovery-name">${_escapeHtml(disc.name || disc.id)}</div>
          <p class="discovery-text">${_escapeHtml(disc.discovery_text || disc.description || '')}</p>
        </div>`;
    } else {
      html += `
        <div class="discovery-card unknown">
          <div class="discovery-name">???</div>
          <p class="discovery-text">???</p>
        </div>`;
    }
  }
  html += `</div>`; // .discovery-grid

  if (container._prevHtml !== html) { container._prevHtml = html; container.innerHTML = html; }
}

// ---------------------------------------------------------------------------
// Challenge Display (indicator overlay — returns HTML string)
// ---------------------------------------------------------------------------

/**
 * Returns an HTML string for the challenge indicator in the top bar.
 * Returns an empty string if no challenge is active.
 *
 * @param {object} state - Live game state.
 * @returns {string}
 */
function renderChallengeDisplay(state) {
  const active = state.challenges && state.challenges.active;
  if (!active) return '';

  const { challengeDef, remaining, progress } = active;
  const name = _escapeHtml(challengeDef.name || challengeDef.id || 'Challenge');
  const pct = Math.round(Math.min(1, progress || 0) * 100);
  const timeLeft = Math.max(0, remaining || 0);

  return `
    <div class="challenge-indicator">
      <span class="challenge-name">${name}</span>
      <div class="challenge-progress-track">
        <div class="challenge-progress-bar" style="width: ${pct}%"></div>
      </div>
      <span class="challenge-time">${timeLeft}s</span>
    </div>`;
}

// ---------------------------------------------------------------------------
// Prestige Panel
// ---------------------------------------------------------------------------

/**
 * Renders the prestige panel: EP total, convergence controls, upgrade list,
 * and (if applicable) the deep memory discipline selection UI.
 *
 * @param {HTMLElement} container - The #view-prestige element.
 * @param {object}      state     - Live game state.
 * @param {object}      data      - Static game data.
 * @param {object}      engines   - Engine modules (must expose engines.prestige).
 */
function renderPrestigePanel(container, state, data, engines) {
  const prestige = state.prestige;
  const upgradeDefs = Array.isArray(data.prestige) ? data.prestige : [];

  const ep = prestige.enlightenmentPoints || 0;
  const convergenceCount = prestige.convergenceCount || 0;

  let html = `<div class="prestige-ep-total">Enlightenment Points: <strong>${formatNumber(ep)}</strong></div>`;

  // --- Convergence section ---
  const canConverge = engines.prestige.canConverge(state, data);
  const epPreview = engines.prestige.calculateEP(state, data);

  html += `<div class="prestige-convergence-section">`;
  html += `<h3 class="prestige-section-heading">Grand Convergence</h3>`;
  html += `<button class="prestige-converge-btn"${canConverge ? '' : ' disabled'}>Invoke Grand Convergence</button>`;
  html += `<p class="prestige-ep-preview">You will earn ~${formatNumber(epPreview)} Enlightenment Points</p>`;
  html += `<p class="prestige-convergence-count">Convergences completed: ${convergenceCount}</p>`;
  html += `</div>`;

  // --- Prestige upgrades list ---
  html += `<div class="prestige-upgrades-section">`;
  html += `<h3 class="prestige-section-heading">Prestige Upgrades</h3>`;

  for (const def of upgradeDefs) {
    const currentLevel = (prestige.upgrades && prestige.upgrades[def.id]) || 0;
    const atMax = currentLevel >= def.max_level;
    const nextCost = atMax ? null : engines.prestige.getUpgradeCost(data, def.id, currentLevel);
    const canAffordUpgrade = !atMax && ep >= nextCost;
    const costLabel = atMax ? 'MAX' : `${formatNumber(nextCost)} EP`;

    html += `
      <div class="prestige-upgrade">
        <div class="prestige-upgrade-header">
          <span class="prestige-upgrade-name">${def.name}</span>
          <span class="prestige-upgrade-level">${currentLevel} / ${def.max_level}</span>
        </div>
        <p class="prestige-upgrade-description">${def.description}</p>
        <div class="prestige-upgrade-footer">
          <span class="prestige-upgrade-cost">Cost: ${costLabel}</span>
          <button class="prestige-buy-btn" data-upgrade-id="${def.id}"${canAffordUpgrade ? '' : ' disabled'}>
            ${atMax ? 'Maxed' : 'Buy'}
          </button>
        </div>
      </div>`;
  }

  html += `</div>`;

  // --- Deep Memory discipline selection ---
  if (prestige.pendingDeepMemory) {
    const DISCIPLINES = [
      { id: 'temporal_arcana',  name: 'Temporal Arcana'  },
      { id: 'spatial_weaving',  name: 'Spatial Weaving'  },
      { id: 'mind_sculpting',   name: 'Mind Sculpting'   },
      { id: 'vital_alchemy',    name: 'Vital Alchemy'    },
      { id: 'shadow_binding',   name: 'Shadow Binding'   },
      { id: 'chaos_channeling', name: 'Chaos Channeling' },
      { id: 'order_forging',    name: 'Order Forging'    },
    ];

    html += `<div class="prestige-deep-memory">`;
    html += `<h3 class="prestige-section-heading">Deep Memory</h3>`;
    html += `<p class="prestige-deep-memory-prompt">Choose a discipline to pre-complete Tier 1:</p>`;
    html += `<div class="prestige-deep-memory-choices">`;
    for (const disc of DISCIPLINES) {
      html += `<button class="prestige-deep-memory-btn" data-discipline-id="${disc.id}">${disc.name}</button>`;
    }
    html += `</div></div>`;
  }

  if (container._prevHtml !== html) { container._prevHtml = html; container.innerHTML = html; }

  // Wire converge button
  const convergeBtn = container.querySelector('.prestige-converge-btn');
  if (convergeBtn) {
    convergeBtn.addEventListener('click', () => {
      if (engines.prestige.canConverge(state, data)) {
        engines.prestige.converge(state, data);
        renderPrestigePanel(container, state, data, engines);
      }
    });
  }

  // Wire upgrade buy buttons
  container.querySelectorAll('.prestige-buy-btn[data-upgrade-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const upgradeId = btn.dataset.upgradeId;
      if (upgradeId) {
        engines.prestige.buyUpgrade(state, data, upgradeId);
        renderPrestigePanel(container, state, data, engines);
      }
    });
  });

  // Wire deep memory discipline selection buttons
  container.querySelectorAll('.prestige-deep-memory-btn[data-discipline-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const disciplineId = btn.dataset.disciplineId;
      if (!disciplineId) return;

      // Auto-complete all Tier 1 nodes for the chosen discipline
      const allNodes = (data.disciplines && data.disciplines.nodes) || [];
      const tier1Nodes = allNodes.filter(
        (n) => n.discipline === disciplineId && n.tier === 1
      );
      for (const node of tier1Nodes) {
        if (!state.research.completed.includes(node.id)) {
          state.research.completed.push(node.id);
        }
      }

      // Apply effects from the auto-completed nodes
      recalculateMultipliers(state, data);

      // Clear the pending flag
      state.prestige.pendingDeepMemory = false;

      renderPrestigePanel(container, state, data, engines);
    });
  });
}

// ---------------------------------------------------------------------------
// Private helpers
// ---------------------------------------------------------------------------

/**
 * Formats a cost object into a human-readable string.
 * e.g. { mana: 500, chronos_essence: 120 } -> "Mana: 500, Chronos Essence: 120"
 */
function _formatCost(cost) {
  if (!cost || Object.keys(cost).length === 0) return 'Free';
  return Object.entries(cost)
    .map(([resId, amount]) => `${_toDisplayName(resId)}: ${formatNumber(amount)}`)
    .join(', ');
}

/**
 * Converts a snake_case resource ID to a Title Case display name.
 * e.g. "chronos_essence" -> "Chronos Essence"
 */
function _toDisplayName(id) {
  return id
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Finds a node definition by id.
 */
function _findNode(data, nodeId) {
  return findNode(data, nodeId);
}

/**
 * Returns the highest tier among all completed research nodes.
 */
function _getHighestCompletedTier(state, data) {
  const nodes = (data.disciplines && data.disciplines.nodes) || [];
  let highest = 0;
  for (const nodeId of (state.research.completed || [])) {
    const node = nodes.find((n) => n.id === nodeId);
    if (node && node.tier > highest) highest = node.tier;
  }
  return highest;
}

/**
 * Returns true if the player can afford the given cost object.
 */
function _canAffordCost(state, cost) {
  if (!cost || Object.keys(cost).length === 0) return true;
  for (const [resId, amount] of Object.entries(cost)) {
    const current = (state.resources[resId] && state.resources[resId].amount) || 0;
    if (current < amount) return false;
  }
  return true;
}


// ============================================================
// UI: RENDERER
// ============================================================

// ui/renderer.js
// Main UI coordinator: event setup and per-tick rendering.


// Maps the seven discipline resource IDs to their bottom-bar value element IDs.
const DISCIPLINE_RESOURCE_IDS = [
  { resource: 'chronos_essence', elementId: 'chronos-value', barId: 'chronos-bar' },
  { resource: 'aether_threads',  elementId: 'aether-value',  barId: 'aether-bar'  },
  { resource: 'psyche_fragments',elementId: 'psyche-value',  barId: 'psyche-bar'  },
  { resource: 'vital_ichor',     elementId: 'ichor-value',   barId: 'ichor-bar'   },
  { resource: 'umbral_dust',     elementId: 'umbral-value',  barId: 'umbral-bar'  },
  { resource: 'flux_sparks',     elementId: 'flux-value',    barId: 'flux-bar'    },
  { resource: 'axiom_crystals',  elementId: 'axiom-value',   barId: 'axiom-bar'   },
];

// Module-level engines reference so render() can pass it to panel functions.
let _engines = null;

// Tracks previous state snapshots for detecting changes between renders.
let _prevCombatActive = false;
let _prevResearchCompleted = null; // Set of completed research IDs
let _prevDiscoveries = null;       // Set of found discovery IDs

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Sets up all persistent UI event listeners.
 * Call once after the DOM is ready.
 *
 * @param {object} state   - Live game state.
 * @param {object} data    - Static data from loadData().
 * @param {object} engines - Engine modules (must expose engines.resources).
 */
function initUI(state, data, engines) {
  _engines = engines;
  _initGrimoireNav();
  _initGeneratorButtons(state, data, engines);
  _initVisibilityPause(state);
  _initSaveControls(state);
  _maybeShowIntroOverlay(state);
  window.addEventListener('beforeunload', () => {
    if (!window.__saveDeleted) saveGame(state);
  });
}

/**
 * Called every tick by the game loop. Updates all dynamic display elements.
 *
 * @param {object} state - Live game state.
 * @param {object} data  - Static data from loadData().
 */
function render(state, data) {
  _renderTopBar(state);
  _renderBottomBar(state);
  _autoSwitchToCombat(state);
  _renderActivePanel(state, data, _engines);
  renderJournal(null, state);
  _renderEventOverlay(state, data, _engines);
  _renderChallengeIndicator(state);
  _checkAndFireToasts(state);
  _updateGrimoireVisibility(state, data);
  autoSave(state);
}

// ---------------------------------------------------------------------------
// Private helpers
// ---------------------------------------------------------------------------

// Maps grimoire nav data-panel values for discipline buttons to research discipline IDs.
const PANEL_TO_DISCIPLINE = {
  temporal: 'temporal_arcana',
  spatial:  'spatial_weaving',
  mind:     'mind_sculpting',
  vital:    'vital_alchemy',
  shadow:   'shadow_binding',
  chaos:    'chaos_channeling',
  order:    'order_forging',
};

/**
 * Wires up the Grimoire nav buttons to switch the active view panel.
 * For discipline buttons, also sets the active discipline tab in the research panel.
 */
function _initGrimoireNav() {
  const navButtons = document.querySelectorAll('.nav-btn[data-panel]');
  const viewPanels = document.querySelectorAll('.view-panel');

  for (const btn of navButtons) {
    btn.addEventListener('click', () => {
      const targetPanel = btn.dataset.panel;

      // If this is a discipline button, set the active tab in the research panel.
      const disciplineId = PANEL_TO_DISCIPLINE[targetPanel];
      if (disciplineId) {
        setActiveDisciplineTab(disciplineId);
      }

      // Deactivate all panels.
      for (const panel of viewPanels) {
        panel.classList.remove('active');
      }

      // Activate the target panel.
      const targetEl = document.getElementById(`view-${targetPanel}`);
      if (targetEl) {
        targetEl.classList.add('active');
      }

      // Update active state on nav buttons.
      for (const b of navButtons) {
        b.classList.remove('active');
      }
      btn.classList.add('active');
    });
  }
}

/**
 * Attaches delegated click handlers on #view-generators for buy/upgrade buttons.
 */
function _initGeneratorButtons(state, data, engines) {
  const genView = document.getElementById('view-generators');
  if (!genView) return;

  genView.addEventListener('click', (e) => {
    const buyBtn = e.target.closest('.gen-buy-btn');
    if (buyBtn) {
      const genId = buyBtn.dataset.genId;
      if (genId) engines.resources.buyGenerator(state, data, genId);
      return;
    }

    const upgradeBtn = e.target.closest('.gen-upgrade-btn');
    if (upgradeBtn) {
      const genId = upgradeBtn.dataset.genId;
      if (genId) engines.resources.upgradeGenerator(state, data, genId);
    }
  });
}

/**
 * Updates the top-bar resource counters.
 */
function _renderTopBar(state) {
  _setText('mana-value',        formatNumber((state.resources.mana && state.resources.mana.amount) || 0));
  _setText('knowledge-value',   formatNumber((state.resources.arcane_knowledge && state.resources.arcane_knowledge.amount) || 0));
  _setText('convergence-value', String(state.prestige.convergenceCount || 0));
}

/**
 * Updates the bottom-bar discipline resource values.
 */
function _renderBottomBar(state) {
  for (const { resource, elementId, barId } of DISCIPLINE_RESOURCE_IDS) {
    const amount = (state.resources[resource] && state.resources[resource].amount) || 0;
    _setText(elementId, formatNumber(amount));

    // Animate the bottom-bar progress bar (fill towards a soft cap for visual effect)
    const barEl = document.getElementById(barId);
    if (barEl) {
      // Visual: logarithmic fill that asymptotically approaches 100%
      const pct = amount <= 0 ? 0 : Math.min(100, Math.round(100 * (1 - 1 / (1 + amount / 50))));
      barEl.style.width = pct + '%';
    }
  }
}

/**
 * If combat becomes active, automatically switches the visible panel to view-combat
 * and updates the grimoire nav highlighting accordingly.
 */
function _autoSwitchToCombat(state) {
  if (!state.combat || !state.combat.active) return;

  const combatPanel = document.getElementById('view-combat');
  if (!combatPanel) return;

  // Already showing combat — nothing to do.
  if (combatPanel.classList.contains('active')) return;

  // Deactivate all panels.
  const viewPanels = document.querySelectorAll('.view-panel');
  for (const panel of viewPanels) {
    panel.classList.remove('active');
  }
  combatPanel.classList.add('active');

  // Update nav button highlighting.
  const navButtons = document.querySelectorAll('.nav-btn[data-panel]');
  for (const btn of navButtons) {
    btn.classList.remove('active');
    if (btn.dataset.panel === 'combat') {
      btn.classList.add('active');
    }
  }
}

/**
 * Calls the appropriate render function for whichever view-panel is currently active.
 */
function _renderActivePanel(state, data, engines) {
  const activePanel = document.querySelector('.view-panel.active');
  if (!activePanel) return;

  // The seven discipline research views share the same renderResearchPanel logic.
  const DISCIPLINE_VIEW_TO_DATA = {
    'view-temporal': 'temporal_arcana',
    'view-spatial':  'spatial_weaving',
    'view-mind':     'mind_sculpting',
    'view-vital':    'vital_alchemy',
    'view-shadow':   'shadow_binding',
    'view-chaos':    'chaos_channeling',
    'view-order':    'order_forging',
  };

  if (activePanel.id === 'view-dashboard') {
    renderDashboardPanel(activePanel, state, data, engines);
    return;
  }

  const dataDisciplineId = DISCIPLINE_VIEW_TO_DATA[activePanel.id];
  if (dataDisciplineId && engines) {
    // renderResearchPanel manages its own discipline tab state internally.
    renderResearchPanel(activePanel, state, data, engines);
    return;
  }

  if (activePanel.id === 'view-generators') {
    renderGeneratorPanel(activePanel, state, data, engines);
    return;
  }

  if (activePanel.id === 'view-combat') {
    renderCombatPanel(activePanel, state, data, engines);
    return;
  }

  if (activePanel.id === 'view-sanctum') {
    renderSanctumPanel(activePanel, state, data, engines);
    return;
  }

  if (activePanel.id === 'view-discoveries') {
    renderDiscoveryPanel(activePanel, state, data, engines);
    return;
  }

  if (activePanel.id === 'view-prestige') {
    renderPrestigePanel(activePanel, state, data, engines);
    return;
  }
}

/**
 * Renders or removes the event overlay on top of the viewport.
 * The overlay shows regardless of which panel is active.
 */
function _renderEventOverlay(state, data, engines) {
  const viewport = document.getElementById('viewport');
  if (!viewport) return;

  const active = state.events && state.events.active;

  let overlay = viewport.querySelector('.event-overlay');

  if (!active) {
    // Remove overlay if it exists but there is no active event.
    if (overlay) overlay.remove();
    return;
  }

  // Create overlay if it doesn't exist yet.
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'event-overlay';
    viewport.appendChild(overlay);
  }

  // Render event content into the overlay.
  renderEventPanel(overlay, state, data, engines);
}

/**
 * Creates or updates the challenge indicator element in the top bar.
 */
function _renderChallengeIndicator(state) {
  const topBar = document.getElementById('top-bar');
  if (!topBar) return;

  const html = renderChallengeDisplay(state);

  let indicator = document.getElementById('challenge-indicator');

  if (!html) {
    // Hide or remove indicator if no active challenge.
    if (indicator) indicator.style.display = 'none';
    return;
  }

  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = 'challenge-indicator';
    topBar.appendChild(indicator);
  }

  indicator.style.display = '';
  indicator.innerHTML = html;
}

/**
 * Detects state changes between renders and fires appropriate toast notifications:
 * - Research completion
 * - Combat start / end
 * - New discovery found
 */
function _checkAndFireToasts(state) {
  // --- Research completions ---
  if (state.research && Array.isArray(state.research.completed)) {
    const currentCompleted = new Set(state.research.completed);

    if (_prevResearchCompleted !== null) {
      for (const id of currentCompleted) {
        if (!_prevResearchCompleted.has(id)) {
          showToast(`Research complete: ${_formatResearchId(id)}`, 'info');
        }
      }
    }
    _prevResearchCompleted = currentCompleted;
  }

  // --- Combat start / end ---
  const combatActive = !!(state.combat && state.combat.active);
  if (combatActive && !_prevCombatActive) {
    showToast('Combat engaged!', 'combat');
  } else if (!combatActive && _prevCombatActive) {
    showToast('Combat ended.', 'combat');
  }
  _prevCombatActive = combatActive;

  // --- New discoveries ---
  if (state.discoveries && Array.isArray(state.discoveries.found)) {
    const currentDiscoveries = new Set(state.discoveries.found);

    if (_prevDiscoveries !== null) {
      for (const id of currentDiscoveries) {
        if (!_prevDiscoveries.has(id)) {
          showToast(`Discovery: ${_formatResearchId(id)}`, 'discovery');
        }
      }
    }
    _prevDiscoveries = currentDiscoveries;
  }
}

/**
 * Converts a snake_case ID to Title Case for display in toasts.
 * e.g. "fire_mastery" -> "Fire Mastery"
 */
function _formatResearchId(id) {
  return id.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Appends save/import/export/delete controls to the grimoire nav, below the
 * existing nav sections.
 */
function _initSaveControls(state) {
  const grimoire = document.getElementById('grimoire');
  if (!grimoire) return;

  const section = document.createElement('div');
  section.className = 'grimoire-section grimoire-section--settings';
  section.innerHTML = `
    <h2 class="grimoire-heading">Settings</h2>
    <div class="settings-controls">
      <button class="settings-btn" id="save-game-btn">Save Game</button>
      <button class="settings-btn" id="export-save-btn">Export Save</button>
      <div class="import-save-wrap">
        <button class="settings-btn" id="import-save-btn">Import Save</button>
        <div class="import-save-input-wrap" id="import-save-input-wrap" style="display:none;">
          <textarea class="import-save-textarea" id="import-save-text" placeholder="Paste save data here..."></textarea>
          <button class="settings-btn settings-btn--confirm" id="import-save-confirm-btn">Confirm Import</button>
        </div>
      </div>
      <button class="settings-btn settings-btn--danger" id="delete-save-btn">Delete Save</button>
    </div>`;

  grimoire.appendChild(section);

  document.getElementById('save-game-btn').addEventListener('click', () => {
    saveGame(state);
    showToast('Game saved!');
  });

  document.getElementById('export-save-btn').addEventListener('click', () => {
    exportSave(state);
    showToast('Save copied to clipboard!');
  });

  document.getElementById('import-save-btn').addEventListener('click', () => {
    const wrap = document.getElementById('import-save-input-wrap');
    if (wrap) wrap.style.display = wrap.style.display === 'none' ? '' : 'none';
  });

  document.getElementById('import-save-confirm-btn').addEventListener('click', () => {
    const text = (document.getElementById('import-save-text') || {}).value || '';
    if (!text.trim()) return;
    try {
      // importSave validates and returns the parsed state object
      const parsed = importSave(text.trim());
      localStorage.setItem('arcanist_save', JSON.stringify(parsed));
      location.reload();
    } catch (err) {
      showToast(`Import failed: ${err.message}`);
    }
  });

  document.getElementById('delete-save-btn').addEventListener('click', () => {
    if (confirm('Delete your save? This cannot be undone.')) {
      window.__saveDeleted = true;
      deleteSave();
      location.reload();
    }
  });
}

/**
 * Shows a modal overlay reporting offline resource gains.
 * offlineResult is the object returned by calculateOfflineProgress.
 * data is the static game data (used to look up resource display names/icons).
 */
function showOfflineModal(offlineResult, data) {
  if (!offlineResult) return;

  const { elapsed, gains } = offlineResult;
  const elapsedStr = formatTime(Math.round(elapsed));

  // Build the resource gains list
  const resourceDefs = (data.resources && data.resources.resources) || [];
  const gainEntries = Object.entries(gains);

  let gainsHtml = '';
  for (const [resId, amount] of gainEntries) {
    const def = resourceDefs.find((r) => r.id === resId);
    const name = def ? def.name : resId;
    const icon = def && def.icon ? def.icon : '';
    gainsHtml += `<li class="offline-gain-item">${icon ? `<span class="offline-gain-icon">${icon}</span>` : ''}<span class="offline-gain-label">${name}:</span> <span class="offline-gain-amount">+${formatNumber(amount)}</span></li>`;
  }

  if (!gainsHtml) {
    gainsHtml = '<li class="offline-gain-item">No resources generated.</li>';
  }

  const overlay = document.createElement('div');
  overlay.id = 'offline-modal-overlay';
  overlay.className = 'offline-modal-overlay';
  overlay.innerHTML = `
    <div class="offline-modal">
      <h2 class="offline-modal-title">Welcome back!</h2>
      <p class="offline-modal-subtitle">While you were away (${elapsedStr}):</p>
      <ul class="offline-gains-list">${gainsHtml}</ul>
      <button class="offline-modal-continue-btn" id="offline-modal-continue">Continue</button>
    </div>`;

  document.body.appendChild(overlay);

  document.getElementById('offline-modal-continue').addEventListener('click', () => {
    overlay.remove();
  });
}

/**
 * Registers a visibilitychange listener that sets state.challenges._paused
 * to true when the page is hidden, false when visible.
 */
function _initVisibilityPause(state) {
  document.addEventListener('visibilitychange', () => {
    if (!state.challenges) return;
    state.challenges._paused = document.hidden;
  });
}

/**
 * Shows the full-screen intro overlay for brand-new players (first-ever game,
 * no research done, fewer than 5 ticks elapsed, intro not yet dismissed).
 * Dismissing saves state.settings.introSeen = true.
 *
 * @param {object} state - Live game state.
 */
function _maybeShowIntroOverlay(state) {
  // Ensure settings sub-object exists.
  if (!state.settings) state.settings = {};

  // Only show for brand-new games where the player hasn't seen the intro yet.
  const isNewGame =
    !state.settings.introSeen &&
    (state.prestige.convergenceCount || 0) === 0 &&
    (state.research.completed || []).length === 0 &&
    (state.tick || 0) < 5;

  if (!isNewGame) return;

  const overlay = document.createElement('div');
  overlay.className = 'intro-overlay';
  overlay.id = 'intro-overlay';
  overlay.innerHTML = `
    <div class="intro-card">
      <div class="intro-title">THE ARCANIST'S STUDY</div>
      <div class="intro-text">
        <p>You have inherited a tower.</p>
        <p>Within its walls, seven paths of magic await your study. The air hums with dormant power.</p>
        <p>Your mana reserves begin to fill.<br>The first step is yours to choose.</p>
      </div>
      <button class="intro-btn" id="intro-begin-btn">Begin Your Studies</button>
    </div>`;

  document.body.appendChild(overlay);

  document.getElementById('intro-begin-btn').addEventListener('click', () => {
    state.settings.introSeen = true;
    overlay.remove();
  });
}

/**
 * Determines whether a grimoire nav item should be visible given the current
 * game state.
 *
 * @param {string} panel - The data-panel value of the nav button.
 * @param {object} state - Live game state.
 * @param {object} data  - Static game data.
 * @returns {boolean}
 */
function _isNavUnlocked(panel, state, data) {
  // Always visible
  if (panel === 'dashboard') return true;
  if (panel === 'temporal')  return true;

  // Discipline gating: staggered waves (first playthrough only)
  if (state.tutorial && state.tutorial.completed) {
    // Post-tutorial: all disciplines always visible
    if (['spatial', 'mind', 'vital', 'shadow', 'chaos', 'order'].includes(panel))
      return true;
  } else {
    // Wave 1: Spatial unlocks after Temporal Basics
    if (panel === 'spatial')
      return state.research.completed.includes('temporal_t1_1');
    // Wave 2: Mind + Vital after 2 T1 nodes
    if (panel === 'mind' || panel === 'vital')
      return _countT1Completed(state) >= 2;
    // Wave 3: Shadow, Chaos, Order after 4 T1 nodes
    if (panel === 'shadow' || panel === 'chaos' || panel === 'order')
      return _countT1Completed(state) >= 4;
  }

  // Generators: visible once the player has unlocked any generator via research
  if (panel === 'generators') {
    var genDefs = (data.resources && data.resources.generators) || [];
    return genDefs.some(function(g) {
      return state.research.completed.includes(g.unlock_requires);
    });
  }

  // Combat: visible after completing any 3 research nodes (early mid-game)
  if (panel === 'combat')
    return state.research.completed.length >= 3;

  // Sanctum: visible after completing a Tier 2 node or winning combat
  if (panel === 'sanctum')
    return (state.discoveries.counters.combat_win || 0) > 0
        || state.research.completed.some((id) => id.includes('_t2_'));

  // Discoveries: visible after completing any 2 research nodes
  if (panel === 'discoveries')
    return state.research.completed.length >= 2;

  // Prestige: visible after completing a Tier 3 node
  if (panel === 'prestige')
    return state.research.completed.some((id) => id.includes('_t3_'));

  // Anything else (e.g. future panels) defaults to visible
  return true;
}

/**
 * Called each render tick. Shows or hides grimoire nav buttons based on
 * progressive unlock conditions so new players aren't overwhelmed.
 * The Settings section is always visible (it is injected as a plain div, not
 * a nav-btn, so it is unaffected by this function).
 *
 * @param {object} state - Live game state.
 * @param {object} data  - Static game data.
 */
function _updateGrimoireVisibility(state, data) {
  const navButtons = document.querySelectorAll('.nav-btn[data-panel]');
  for (const btn of navButtons) {
    const panel = btn.dataset.panel;
    btn.style.display = _isNavUnlocked(panel, state, data) ? '' : 'none';
  }

  // Also hide the "Disciplines" section heading when all discipline buttons
  // other than Temporal are still locked, to avoid a lonely heading.
  const disciplinesHeading = document.querySelector('.grimoire-section:nth-of-type(2) .grimoire-heading');
  if (disciplinesHeading) {
    const otherDisciplinesVisible = state.research.completed.includes('temporal_t1_1') || (state.tutorial && state.tutorial.completed);
    disciplinesHeading.style.display = otherDisciplinesVisible ? '' : 'none';
  }

  // Hide the "Study" section heading when nothing under it is unlocked.
  const studySection = document.querySelector('.grimoire-section:nth-of-type(3)');
  if (studySection) {
    const studyPanels = ['generators', 'combat', 'sanctum', 'prestige', 'discoveries'];
    const anyStudyVisible = studyPanels.some(function(p) { return _isNavUnlocked(p, state, data); });
    studySection.style.display = anyStudyVisible ? '' : 'none';
  }
}

/** Sets the textContent of an element by ID; silently skips if not found. */
function _setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}



// ============================================================
// INITIALIZATION
// ============================================================

// Theme toggle — apply saved theme immediately to avoid flash
(function() {
  var saved = localStorage.getItem('arcanist_theme');
  if (saved === 'night') document.documentElement.setAttribute('data-theme', 'night');
})();

document.addEventListener('DOMContentLoaded', function() {
  try {
    var data = loadData();

    // Theme toggle setup
    var themeBtn = document.getElementById('theme-toggle');
    var themeIcon = document.getElementById('theme-icon');
    if (themeBtn && themeIcon) {
      function updateThemeButton() {
        var isNight = document.documentElement.getAttribute('data-theme') === 'night';
        themeIcon.textContent = isNight ? '\u2600' : '\uD83C\uDF19';
        var textNode = themeBtn.childNodes[themeBtn.childNodes.length - 1];
        if (textNode) textNode.textContent = isNight ? ' Day' : ' Night';
      }
      updateThemeButton();
      themeBtn.addEventListener('click', function() {
        var isNight = document.documentElement.getAttribute('data-theme') === 'night';
        if (isNight) {
          document.documentElement.removeAttribute('data-theme');
          localStorage.setItem('arcanist_theme', 'day');
        } else {
          document.documentElement.setAttribute('data-theme', 'night');
          localStorage.setItem('arcanist_theme', 'night');
        }
        updateThemeButton();
      });
    }

    // Load saved state, or start fresh — delete corrupt saves
    var saved = null;
    try { saved = loadGame(); } catch(e) { localStorage.removeItem('arcanist_save'); }
    var state = saved || createInitialState();

    // --- State migration: ensure all sub-objects exist on old saves ---
    if (!state.research) state.research = { completed: [], inProgress: null };
    if (!state.research.completed) state.research.completed = [];
    if (!state.combat) state.combat = {};
    if (state.combat.active === undefined) state.combat.active = null;
    if (!state.combat.health) state.combat.health = 100;
    if (!state.combat.maxHealth) state.combat.maxHealth = 100;
    if (!state.combat.cooldowns) state.combat.cooldowns = {};
    if (!state.combat.stance) state.combat.stance = 'balanced';
    if (!state.combat.recovery) state.combat.recovery = 0;
    if (!state.combat.inventory) state.combat.inventory = {};
    if (!state.combat.log) state.combat.log = [];
    if (!state.events) state.events = { active: null, history: [], discoveredHidden: [], lastEventTick: 0 };
    if (!state.events.history) state.events.history = [];
    if (!state.events.discoveredHidden) state.events.discoveredHidden = [];
    if (!state.discoveries) state.discoveries = { found: [], counters: {} };
    if (!state.discoveries.found) state.discoveries.found = [];
    if (!state.discoveries.counters) state.discoveries.counters = {};
    if (!state.challenges) state.challenges = { active: null, completed: 0, lastChallengeTick: 0 };
    if (!state.prestige) state.prestige = { enlightenmentPoints: 0, upgrades: {}, convergenceCount: 0, wizardMemory: [], convergenceTickCounter: 0 };
    if (!state.prestige.upgrades) state.prestige.upgrades = {};
    if (!state.prestige.wizardMemory) state.prestige.wizardMemory = [];
    if (!state.multipliers) state.multipliers = {};
    if (!state.journal) state.journal = [];
    if (!state.settings) state.settings = {};
    // Tutorial migration
    if (!state.tutorial) {
      state.tutorial = { seenMilestones: [], currentObjective: 0, completed: false };
      // Auto-advance returning players past already-completed objectives
      if ((state.prestige && state.prestige.convergenceCount) > 0) {
        state.tutorial.completed = true;
        state.tutorial.currentObjective = 12;
      } else {
        var objConditions = [
          function() { return (state.resources.mana && state.resources.mana.amount >= 10) || state.research.completed.length > 0; },
          function() { return state.research.completed.includes('temporal_t1_1'); },
          function() { return state.generators.temporal_gen_t1 && state.generators.temporal_gen_t1.count >= 1; },
          function() { return state.resources.chronos_essence && state.resources.chronos_essence.amount >= 25; },
          function() { return state.research.completed.some(function(id) { return id !== 'temporal_t1_1' && id.includes('_t1_'); }); },
          function() { var total = 0; for (var k in state.generators) { total += (state.generators[k].count || 0); } return total >= 3; },
          function() { return state.research.completed.length >= 3; },
          function() { return state.research.completed.some(function(id) { return id.includes('_t2_'); }); },
          function() { return (state.discoveries.counters.combat_win || 0) >= 1; },
          function() { return state.discoveries.found && state.discoveries.found.length >= 1; },
          function() { var byDisc = {}; for (var i = 0; i < state.research.completed.length; i++) { var id = state.research.completed[i]; if (id.includes('_t1_')) { var disc = id.replace(/_t1_.*$/, ''); byDisc[disc] = (byDisc[disc] || 0) + 1; } } for (var d in byDisc) { if (byDisc[d] >= 3) return true; } return false; },
          function() { return (state.prestige && state.prestige.convergenceCount) >= 1; }
        ];
        var highest = 0;
        for (var oi = 0; oi < objConditions.length; oi++) {
          try { if (objConditions[oi]()) highest = oi + 1; else break; } catch(e) { break; }
        }
        state.tutorial.currentObjective = highest;
      }
      // Pre-mark all milestones that already happened
      var milestoneChecks = {
        'game_start': true,
        'first_10_mana': (state.resources.mana && state.resources.mana.totalEarned >= 10) || state.research.completed.length > 0,
        'first_research_started': state.research.completed.length > 0,
        'first_research_complete': state.research.completed.length > 0,
        'first_generator': (function() { for (var k in state.generators) { if (state.generators[k].count > 0) return true; } return false; })(),
        'wave1_spatial': state.research.completed.includes('temporal_t1_1'),
        'wave2_mind_vital': (function() { var c = 0; for (var i = 0; i < state.research.completed.length; i++) { if (state.research.completed[i].includes('_t1_')) c++; } return c >= 2; })(),
        'wave3_remaining': (function() { var c = 0; for (var i = 0; i < state.research.completed.length; i++) { if (state.research.completed[i].includes('_t1_')) c++; } return c >= 4; })(),
        'combat_available': state.research.completed.length >= 3,
        'first_combat_started': (state.discoveries.counters.combat_win || 0) > 0 || (state.discoveries.counters.combat_loss || 0) > 0,
        'first_combat_win': (state.discoveries.counters.combat_win || 0) > 0,
        'first_combat_loss': (state.discoveries.counters.combat_loss || 0) > 0,
        'discipline_mastered': (function() { var byDisc = {}; for (var i = 0; i < state.research.completed.length; i++) { var id = state.research.completed[i]; if (id.includes('_t1_')) { var disc = id.replace(/_t1_.*$/, ''); byDisc[disc] = (byDisc[disc] || 0) + 1; } } for (var d in byDisc) { if (byDisc[d] >= 3) return true; } return false; })(),
        'first_t2': state.research.completed.some(function(id) { return id.includes('_t2_'); }),
        'first_discovery': state.discoveries.found && state.discoveries.found.length > 0,
        'five_generators': (function() { var t = 0; for (var k in state.generators) { t += (state.generators[k].count || 0); } return t >= 5; })(),
        'first_t3': state.research.completed.some(function(id) { return id.includes('_t3_'); }),
        'first_t4': state.research.completed.some(function(id) { return id.includes('_t4_'); }),
        'prestige_available': state.research.completed.some(function(id) { return id.includes('_t4_'); }),
        'first_convergence': (state.prestige && state.prestige.convergenceCount) > 0
      };
      for (var mid in milestoneChecks) {
        if (milestoneChecks[mid]) state.tutorial.seenMilestones.push(mid);
      }
    }
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
    // Ensure combat.insights exists
    if (state.combat.insights === undefined) state.combat.insights = 0;

    // Initialize state.resources from data
    var resDefs = (data.resources && data.resources.resources) || [];
    for (var i = 0; i < resDefs.length; i++) {
      var resource = resDefs[i];
      if (!state.resources[resource.id]) {
        state.resources[resource.id] = { amount: 0, totalEarned: 0, totalSpent: 0 };
      }
    }

    // Initialize state.generators from data
    var genDefs = (data.resources && data.resources.generators) || [];
    for (var j = 0; j < genDefs.length; j++) {
      var generator = genDefs[j];
      if (!state.generators[generator.id]) {
        state.generators[generator.id] = { count: 0, level: 1 };
      }
    }

    // Recalculate multipliers from completed research
    recalculateMultipliers(state, data);

    // Build engines object matching what renderer/panels expect
    var engines = {
      resources: { tick: resourcesTick, canAfford: canAfford, spend: spend, buyGenerator: buyGenerator, upgradeGenerator: upgradeGenerator, getGenerationRate: getGenerationRate, getMultiplier: getMultiplier },
      research: { tick: researchTick, canResearch: canResearch, startResearch: startResearch, getResearchProgress: getResearchProgress, getAvailableNodes: getAvailableNodes, getVisibleSynergyNodes: getVisibleSynergyNodes, recalculateMultipliers: recalculateMultipliers, applyEffects: applyEffects },
      combat: { tick: combatTick, startCombat: startCombat, castSpell: castSpell, setStance: setStance, retreat: retreat, useConsumable: useConsumable, craftConsumable: craftConsumable, calculateStats: calculateStats },
      events: { tick: eventsTick, makeChoice: makeChoice, trackEvent: trackEvent, resetConsecutive: resetConsecutive, evaluateCondition: evaluateCondition, getChallengeProgress: getChallengeProgress },
      prestige: { canConverge: canConverge, calculateEP: calculateEP, converge: converge, buyUpgrade: buyUpgrade, getUpgradeCost: getUpgradeCost, getPrestigeEffects: getPrestigeEffects },
    };

    // Calculate and display offline progress
    if (saved) {
      var offlineResult = calculateOfflineProgress(state, data);
      if (offlineResult) {
        showOfflineModal(offlineResult, data);
      }
    }

    initUI(state, data, engines);

    // Wrap combat tick for cross-engine event tracking
    var _origCombatTick = engines.combat.tick;
    engines.combat.tick = function(s, d) {
      var wasActive = s.combat.active;
      _origCombatTick(s, d);
      var isActive = s.combat.active;
      if (wasActive && !isActive) {
        if (s.combat._lastResult === 'win') {
          trackEvent(s, 'combat_win');
          resetConsecutive(s, 'combat_loss');
        } else {
          trackEvent(s, 'combat_loss');
          resetConsecutive(s, 'combat_win');
        }
        s.combat._lastResult = null;
      }
    };

    // Wrap research tick for event tracking
    var _origResearchTick = engines.research.tick;
    engines.research.tick = function(s, d) {
      var completedBefore = s.research.completed.length;
      _origResearchTick(s, d);
      if (s.research.completed.length > completedBefore) {
        trackEvent(s, 'research_complete');
      }
    };

    // Track player activity for ambient journal entry timing
    document.addEventListener('click', function() { _lastActionTime = Date.now(); });

    startGameLoop(state, data, engines, function(s, d) { render(s, d); });

    window.debug = {
      state: state,
      data: data,
      engines: engines,
      addResource: function(id, amt) { state.resources[id].amount += amt; }
    };

    window.__gameLoaded = true;
    console.log('Game initialized. Tick:', state.tick, 'Mana:', JSON.stringify(state.resources.mana));

  } catch(err) {
    console.error('Game init error:', err);
    var viewport = document.getElementById('viewport');
    if (viewport) {
      viewport.innerHTML = '<div style="padding:2rem;color:red;font-family:monospace;">' +
        '<h2>Game Error</h2>' +
        '<p>' + err.message + '</p>' +
        '<pre>' + (err.stack || '') + '</pre>' +
        '<p>Try: open browser console (F12) for details, or clear save data:</p>' +
        '<button onclick="localStorage.removeItem(\'arcanist_save\');location.reload();" ' +
        'style="padding:8px 16px;cursor:pointer;margin-top:8px;">Clear Save &amp; Reload</button></div>';
    }
  }
});

})(); // end IIFE
