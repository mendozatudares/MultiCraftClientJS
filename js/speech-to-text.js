var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

// TODO: update how grammar list is constructed for improved recognition
var materials = ['acacia door', 'acacia fence', 'acacia fence gate', 'acacia stairs', 'activator rail', 'air', 'anvil', 'apple', 'armor stand', 'arrow', 'baked potato', 'banner', 'barrier', 'beacon', 'bed', 'bedrock', 'beetroot', 'beetroot seeds', 'beetroot soup', 'birch door', 'birch fence', 'birch fence gate', 'birch wood stairs', 'blaze powder', 'blaze rod', 'boat', 'acacia boat', 'birch boat', 'dark oak boat', 'jungle boat', 'spruce boat', 'bone', 'book', 'book and quill', 'bookshelf', 'bow', 'bowl', 'bread', 'brewing stand', 'brick', 'brick stairs', 'brown mushroom', 'bucket', 'cactus', 'cake', 'carpet', 'carrot', 'carrot stick', 'cauldron', 'chainmail boots', 'chainmail chestplate', 'chainmail helmet', 'chainmail leggings', 'chest', 'chorus flower', 'chorus fruit', 'chorus fruit popped', 'chorus plant', 'clay', 'coal', 'coal block', 'coal ore', 'cobblestone wall', 'cobblestone', 'cobblestone stairs', 'command block', 'chain command block', 'repeating command block', 'compass', 'cooked beef', 'cooked chicken', 'cooked fish', 'cooked mutton', 'cooked rabbit', 'cookie', 'dark oak door', 'dark oak fence', 'dark oak fence gate', 'dark oak stairs', 'daylight sensor', 'dead bush', 'detector rail', 'diamond', 'diamond axe', 'diamond block', 'diamond boots', 'diamond chestplate', 'diamond helmet', 'diamond hoe', 'diamond leggings', 'diamond ore', 'diamond pickaxe', 'diamond shovel', 'diamond sword', 'dirt', 'dispenser', 'dragon egg', 'dropper', 'egg', 'elytra', 'emerald', 'emerald block', 'emerald ore', 'empty map', 'enchanted book', 'enchantment table', 'end bricks', 'end crystal', 'end rod', 'ender chest', 'ender pearl', 'ender portal frame', 'end stone', 'eye of ender', 'feather', 'fence', 'fence gate', 'fermented spider eye', 'fireball', 'firework', 'firework charge', 'fishing rod', 'flint', 'flint and steel', 'flower pot', 'furnace', 'ghast tear', 'glass', 'glass bottle', 'glowstone', 'glowstone dust', 'gold axe', 'gold', 'gold block', 'gold boots', 'gold chestplate', 'gold helmet', 'gold hoe', 'gold ingot', 'gold leggings', 'gold nugget', 'gold ore', 'gold pickaxe', 'gold pressure plate', 'gold shovel', 'gold sword', 'golden apple', 'golden carrot', 'grass', 'grass path', 'gravel', 'cooked pork', 'cooked pork chop', 'terracottaa', 'hay block', 'hopper', 'hopper minecart', 'ice', 'iron axe', 'iron bars', 'iron', 'iron block', 'iron boots', 'iron chestplate', 'iron door', 'iron fence', 'iron helmet', 'iron hoe', 'iron ingot', 'iron leggings', 'iron ore', 'iron pickaxe', 'iron pressure plate', 'iron shovel', 'iron sword', 'iron trapdoor', 'item frame', 'jack o lantern', 'jukebox', 'jungle door', 'jungle fence', 'jungle fence gate', 'jungle wood stairs', 'ladder', 'lapis block', 'lapis ore', 'lava', 'lava bucket', 'leash', 'lead', 'leather', 'leather boots', 'leather chestplate', 'leather helmet', 'leather leggings', 'leaves', 'lever', 'log', 'tall grass', 'magma cream', 'map', 'melon', 'melon block', 'melon seeds', 'milk bucket', 'minecart', 'mob spawner', 'mossy cobblestone', 'mushroom soup', 'mushroom stew', 'mutton', 'mycelium', 'name tag', 'nether brick', 'nether brick stairs', 'nether fence', 'nether star', 'nether warts', 'netherrack', 'note block', 'obsidian', 'packed ice', 'painting', 'paper', 'poisonous potato', 'raw pork', 'raw porkchop', 'potato', 'powered rail', 'prismarine', 'prismarine crystals', 'prismarine shard', 'pumpkin', 'pumpkin pie', 'pumpkin seeds', 'purpur block', 'purpur pillar', 'purpur slab', 'purpur stairs', 'quartz', 'quartz block', 'quartz ore', 'quartz stairs', 'rabbit', 'rabbit foot', 'rabbit hide', 'rabbit stew', 'rails', 'raw beef', 'raw chicken', 'raw fish', 'red mushroom', 'red flower', 'red sandstone', 'red sandstone stairs', 'redstone', 'redstone block', 'redstone comparator', 'redstone lamp', 'redstone ore', 'redstone torch', 'rotten flesh', 'saddle', 'sand', 'sandstone', 'sandstone stairs', 'sapling', 'sea lantern', 'seeds', 'shears', 'shield', 'sign', 'skull', 'slime ball', 'slime block', 'snow', 'snowball', 'snow block', 'soul sand', 'glistering melon', 'spectral arrow', 'spider eye', 'sponge', 'spruce door', 'spruce fence', 'spruce fence gate', 'spruce wood stairs', 'stained clay', 'stained glass', 'stained glass pane', 'stick', 'stone', 'stone axe', 'stone button', 'stone hoe', 'stone pickaxe', 'stone pressure plate', 'stone slab', 'stone shovel', 'stone sword', 'string', 'structure block', 'sugar', 'sugar cane', 'glass pane', 'tipped arrow', 'tnt', 'torch', 'trapdoor', 'trapped chest', 'tripwire hook', 'vine', 'clock', 'water', 'water bucket', 'water lily', 'lilypad', 'web', 'cobweb', 'wheat', 'wood', 'wood axe', 'wood button', 'wood door', 'wood hoe', 'wood pickaxe', 'wood pressure plate', 'wood shovel', 'wood stairs', 'wood slab', 'wood sword', 'wooden door', 'wool', 'crafting table', 'written book', 'yellow flower']

var grammar = '#JSGF V1.0; grammar materials; public <material> = ' + materials.map(element => { return /\s/g.test(element) ? '"' + element + '"' : element } ).join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var speechDiagnostic = document.getElementById('speech-output');

recognition.start();

recognition.onresult = function (event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object
  var result = event.results[0][0].transcript;
  var args = processInstruction(result);
  console.log(args);
}

recognition.onspeechend = function () {
  recognition.stop();
}

recognition.onerror = function (event) {
  speechDiagnostic.textContent = 'Error occurred in recognition: ' + event.error;
  console.log(event);
}

window.onload = function () {
  window.onkeydown = function (key) {
    if (key.keyCode === 188 /* comma */) {
      recognition.start();
    }
  }
}