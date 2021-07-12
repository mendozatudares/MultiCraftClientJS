var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var materials = ['acacia_door', 'acacia_fence', 'acacia_fence_gate', 'acacia_stairs', 'activator_rail', 'air', 'anvil', 'apple', 'armor_stand', 'arrow', 'baked_potato', 'banner', 'barrier', 'beacon', 'bed', 'bedrock', 'beetroot', 'beetroot_seeds', 'beetroot_soup', 'birch_door', 'birch_fence', 'birch_fence_gate', 'birch_wood_stairs', 'blaze_powder', 'blaze_rod', 'boat', 'acacia_boat', 'birch_boat', 'dark_oak_boat', 'jungle_boat', 'spruce_boat', 'bone', 'book', 'book_and_quill', 'bookshelf', 'bow', 'bowl', 'bread', 'brewing_stand', 'brick', 'brick_stairs', 'brown_mushroom', 'bucket', 'cactus', 'cake', 'carpet', 'carrot', 'carrot_stick', 'cauldron', 'chainmail_boots', 'chainmail_chestplate', 'chainmail_helmet', 'chainmail_leggings', 'chest', 'chorus_flower', 'chorus_fruit', 'chorus_fruit_popped', 'chorus_plant', 'clay', 'coal', 'coal_block', 'coal_ore', 'cobblestone_wall', 'cobblestone', 'cobblestone_stairs', 'command_block', 'chain_command_block', 'repeating_command_block', 'compass', 'cooked_beef', 'cooked_chicken', 'cooked_fish', 'cooked_mutton', 'cooked_rabbit', 'cookie', 'dark_oak_door', 'dark_oak_fence', 'dark_oak_fence_gate', 'dark_oak_stairs', 'daylight_sensor', 'dead_bush', 'detector_rail', 'diamond', 'diamond_axe', 'diamond_block', 'diamond_boots', 'diamond_chestplate', 'diamond_helmet', 'diamond_hoe', 'diamond_leggings', 'diamond_ore', 'diamond_pickaxe', 'diamond_shovel', 'diamond_sword', 'dirt', 'dispenser', 'dragon_egg', 'dropper', 'egg', 'elytra', 'emerald', 'emerald_block', 'emerald_ore', 'empty_map', 'enchanted_book', 'enchantment_table', 'end_bricks', 'end_crystal', 'end_rod', 'ender_chest', 'ender_pearl', 'ender_portal_frame', 'end_stone', 'eye_of_ender', 'feather', 'fence', 'fence_gate', 'fermented_spider_eye', 'fireball', 'firework', 'firework_charge', 'fishing_rod', 'flint', 'flint_and_steel', 'flower_pot', 'furnace', 'ghast_tear', 'glass', 'glass_bottle', 'glowstone', 'glowstone_dust', 'gold_axe', 'gold', 'gold_block', 'gold_boots', 'gold_chestplate', 'gold_helmet', 'gold_hoe', 'gold_ingot', 'gold_leggings', 'gold_nugget', 'gold_ore', 'gold_pickaxe', 'gold_pressure_plate', 'gold_shovel', 'gold_sword', 'golden_apple', 'golden_carrot', 'grass', 'grass_path', 'gravel', 'cooked_pork', 'cooked_pork_chop', 'terracottaa', 'hay_block', 'hopper', 'hopper_minecart', 'ice', 'iron_axe', 'iron_bars', 'iron', 'iron_block', 'iron_boots', 'iron_chestplate', 'iron_door', 'iron_fence', 'iron_helmet', 'iron_hoe', 'iron_ingot', 'iron_leggings', 'iron_ore', 'iron_pickaxe', 'iron_pressure_plate', 'iron_shovel', 'iron_sword', 'iron_trapdoor', 'item_frame', 'jack_o_lantern', 'jukebox', 'jungle_door', 'jungle_fence', 'jungle_fence_gate', 'jungle_wood_stairs', 'ladder', 'lapis_block', 'lapis_ore', 'lava', 'lava_bucket', 'leash', 'lead', 'leather', 'leather_boots', 'leather_chestplate', 'leather_helmet', 'leather_leggings', 'leaves', 'lever', 'log', 'tall_grass', 'magma_cream', 'map', 'melon', 'melon_block', 'melon_seeds', 'milk_bucket', 'minecart', 'mob_spawner', 'mossy_cobblestone', 'mushroom_soup', 'mushroom_stew', 'mutton', 'mycelium', 'name_tag', 'nether_brick', 'nether_brick_stairs', 'nether_fence', 'nether_star', 'nether_warts', 'netherrack', 'note_block', 'obsidian', 'packed_ice', 'painting', 'paper', 'poisonous_potato', 'raw_pork', 'raw_porkchop', 'potato', 'powered_rail', 'prismarine', 'prismarine_crystals', 'prismarine_shard', 'pumpkin', 'pumpkin_pie', 'pumpkin_seeds', 'purpur_block', 'purpur_pillar', 'purpur_slab', 'purpur_stairs', 'quartz', 'quartz_block', 'quartz_ore', 'quartz_stairs', 'rabbit', 'rabbit_foot', 'rabbit_hide', 'rabbit_stew', 'rails', 'raw_beef', 'raw_chicken', 'raw_fish', 'red_mushroom', 'red_flower', 'red_sandstone', 'red_sandstone_stairs', 'redstone', 'redstone_block', 'redstone_comparator', 'redstone_lamp', 'redstone_ore', 'redstone_torch', 'rotten_flesh', 'saddle', 'sand', 'sandstone', 'sandstone_stairs', 'sapling', 'sea_lantern', 'seeds', 'shears', 'shield', 'sign', 'skull', 'slime_ball', 'slime_block', 'snow', 'snowball', 'snow_block', 'soul_sand', 'glistering_melon', 'spectral_arrow', 'spider_eye', 'sponge', 'spruce_door', 'spruce_fence', 'spruce_fence_gate', 'spruce_wood_stairs', 'stained_clay', 'stained_glass', 'stained_glass_pane', 'stick', 'stone', 'stone_axe', 'stone_button', 'stone_hoe', 'stone_pickaxe', 'stone_pressure_plate', 'stone_slab', 'stone_shovel', 'stone_sword', 'string', 'structure_block', 'sugar', 'sugar_cane', 'glass_pane', 'tipped_arrow', 'tnt', 'torch', 'trapdoor', 'trapped_chest', 'tripwire_hook', 'vine', 'clock', 'water', 'water_bucket', 'water_lily', 'lilypad', 'web', 'cobweb', 'wheat', 'wood', 'wood_axe', 'wood_button', 'wood_door', 'wood_hoe', 'wood_pickaxe', 'wood_pressure_plate', 'wood_shovel', 'wood_stairs', 'wood_slab', 'wood_sword', 'wooden_door', 'wool', 'crafting_table', 'written_book', 'yellow_flower']

var grammar = '#JSGF V1.0; grammar materials; public <material> = ' + materials.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.getElementById('speech-output');

recognition.start();

recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object
  var result = event.results[0][0].transcript;
  diagnostic.textContent = 'Result received: ' + result;
}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
  console.log(event);
}

window.onload = function() {
  window.onkeydown = function(key) {
    if (key.keyCode === 188 /* comma */ ) {
      recognition.start();
    }
  }
}