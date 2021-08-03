// Dictionaries of commands, directions and materials supported by the system
const COMMANDS = { "build": true, "place": true, "move": true, "track": true, "turn": true, "tilt": true, "undo": true, "redo": true, "store": true, "clone": true, "give": true };
const DIRECTIONS = { "up": "up", "down": "down", "left": "left", "right": "right", "forward": "forward", "back": "back", "astir": "up", "improving": "up", "upward": "up", "upwards": "up", "upwardly": "up", "down feather": "down", "Down": "down", "John L. H. Down": "down", "pile": "down", "toss off": "down", "pop": "down", "bolt down": "down", "belt down": "down", "pour down": "down", "drink down": "down", "kill": "down", "devour": "down", "consume": "down", "go through": "down", "shoot down": "down", "land": "down", "knock down": "down", "cut down": "down", "push down": "down", "pull down": "down", "polish": "down", "refine": "down", "fine-tune": "down", "downward": "down", "down pat": "down", "mastered": "down", "depressed": "down", "gloomy": "down", "grim": "down", "blue": "down", "dispirited": "down", "downcast": "down", "downhearted": "down", "down in the mouth": "down", "low": "down", "low-spirited": "down", "downwards": "down", "downwardly": "down", "left wing": "left", "left hand": "left", "left field": "left", "leftfield": "left", "leave": "left", "go forth": "left", "go away": "left", "leave alone": "left", "leave behind": "left", "exit": "left", "go out": "left", "get out": "left", "allow for": "left", "allow": "left", "provide": "left", "result": "left", "lead": "left", "depart": "left", "pull up stakes": "left", "entrust": "left", "bequeath": "left", "will": "left", "impart": "left", "give": "left", "pass on": "left", "forget": "left", "leftover": "left", "left over": "left", "odd": "left", "remaining": "left", "unexpended": "left", "left-hand": "left", "right field": "right", "rightfield": "right", "right wing": "right", "right hand": "right", "rightfulness": "right", "compensate": "right", "redress": "right", "correct": "right", "rectify": "right", "proper": "right", "right-hand": "right", "good": "right", "ripe": "right", "veracious": "right", "flop": "right", "properly": "right", "decently": "right", "decent": "right", "in good order": "right", "the right way": "right", "right on": "right", "mighty": "right", "mightily": "right", "powerful": "right", "justly": "right", "correctly": "right", "aright": "right", "send on": "forward", "advancing": "forward", "forward-moving": "forward", "forwards": "forward", "frontward": "forward", "frontwards": "forward", "forrad": "forward", "forrard": "forward", "forth": "forward", "onward": "forward", "ahead": "forward", "onwards": "forward", "forrader": "forward", "fore": "forward", "dorsum": "back", "rear": "back", "spinal column": "back", "vertebral column": "back", "spine": "back", "backbone": "back", "rachis": "back", "binding": "back", "book binding": "back", "cover": "back", "backrest": "back", "endorse": "back", "indorse": "back", "plump for": "back", "plunk for": "back", "support": "back", "second": "back", "bet on": "back", "gage": "back", "stake": "back", "game": "back", "punt": "back", "back up": "back", "hind": "back", "hinder": "back", "backward": "back", "backwards": "back", "rearward": "back", "rearwards": "back" }; // taken from wordnet
const MATERIALS = ["acacia boat", "acacia button", "acacia door", "acacia fence", "acacia fence gate", "acacia leaves", "acacia log", "acacia planks", "acacia pressure plate", "acacia sapling", "acacia sign", "acacia slab", "acacia stairs", "acacia trapdoor", "acacia wall sign", "acacia wood", "activator rail", "air", "allium", "andesite", "andesite slab", "andesite stairs", "andesite wall", "anvil", "apple", "armor stand", "arrow", "attached melon stem", "attached pumpkin stem", "azure bluet", "baked potato", "bamboo", "bamboo sapling", "barrel", "barrier", "bat spawn egg", "beacon", "bedrock", "beef", "beetroot", "beetroot seeds", "beetroot soup", "beetroots", "bell", "birch boat", "birch button", "birch door", "birch fence", "birch fence gate", "birch leaves", "birch log", "birch planks", "birch pressure plate", "birch sapling", "birch sign", "birch slab", "birch stairs", "birch trapdoor", "birch wall sign", "birch wood", "black banner", "black bed", "black carpet", "black concrete", "black concrete powder", "black dye", "black glazed terracotta", "black shulker box", "black stained glass", "black stained glass pane", "black terracotta", "black wall banner", "black wool", "blast furnace", "blaze powder", "blaze rod", "blaze spawn egg", "blue banner", "blue bed", "blue carpet", "blue concrete", "blue concrete powder", "blue dye", "blue glazed terracotta", "blue ice", "blue orchid", "blue shulker box", "blue stained glass", "blue stained glass pane", "blue terracotta", "blue wall banner", "blue wool", "bone", "bone block", "bone meal", "book", "bookshelf", "bow", "bowl", "brain coral", "brain coral block", "brain coral fan", "brain coral wall fan", "bread", "brewing stand", "brick", "brick slab", "brick stairs", "brick wall", "bricks", "brown banner", "brown bed", "brown carpet", "brown concrete", "brown concrete powder", "brown dye", "brown glazed terracotta", "brown mushroom", "brown mushroom block", "brown shulker box", "brown stained glass", "brown stained glass pane", "brown terracotta", "brown wall banner", "brown wool", "bubble column", "bubble coral", "bubble coral block", "bubble coral fan", "bubble coral wall fan", "bucket", "cactus", "cake", "campfire", "carrot", "carrot on a stick", "carrots", "cartography table", "carved pumpkin", "cat spawn egg", "cauldron", "cave air", "cave spider spawn egg", "chain command block", "chainmail boots", "chainmail chestplate", "chainmail helmet", "chainmail leggings", "charcoal", "chest", "chest minecart", "chicken", "chicken spawn egg", "chipped anvil", "chiseled quartz block", "chiseled red sandstone", "chiseled sandstone", "chiseled stone bricks", "chorus flower", "chorus fruit", "chorus plant", "clay", "clay ball", "clock", "coal", "coal block", "coal ore", "coarse dirt", "cobblestone", "cobblestone slab", "cobblestone stairs", "cobblestone wall", "cobweb", "cocoa", "cocoa beans", "cod", "cod bucket", "cod spawn egg", "command block", "command block minecart", "comparator", "compass", "composter", "conduit", "cooked beef", "cooked chicken", "cooked cod", "cooked mutton", "cooked porkchop", "cooked rabbit", "cooked salmon", "cookie", "cornflower", "cow spawn egg", "cracked stone bricks", "crafting table", "creeper banner pattern", "creeper head", "creeper spawn egg", "creeper wall head", "crossbow", "cut red sandstone", "cut red sandstone slab", "cut sandstone", "cut sandstone slab", "cyan banner", "cyan bed", "cyan carpet", "cyan concrete", "cyan concrete powder", "cyan dye", "cyan glazed terracotta", "cyan shulker box", "cyan stained glass", "cyan stained glass pane", "cyan terracotta", "cyan wall banner", "cyan wool", "damaged anvil", "dandelion", "dark oak boat", "dark oak button", "dark oak door", "dark oak fence", "dark oak fence gate", "dark oak leaves", "dark oak log", "dark oak planks", "dark oak pressure plate", "dark oak sapling", "dark oak sign", "dark oak slab", "dark oak stairs", "dark oak trapdoor", "dark oak wall sign", "dark oak wood", "dark prismarine", "dark prismarine slab", "dark prismarine stairs", "daylight detector", "dead brain coral", "dead brain coral block", "dead brain coral fan", "dead brain coral wall fan", "dead bubble coral", "dead bubble coral block", "dead bubble coral fan", "dead bubble coral wall fan", "dead bush", "dead fire coral", "dead fire coral block", "dead fire coral fan", "dead fire coral wall fan", "dead horn coral", "dead horn coral block", "dead horn coral fan", "dead horn coral wall fan", "dead tube coral", "dead tube coral block", "dead tube coral fan", "dead tube coral wall fan", "debug stick", "detector rail", "diamond", "diamond axe", "diamond block", "diamond boots", "diamond chestplate", "diamond helmet", "diamond hoe", "diamond horse armor", "diamond leggings", "diamond ore", "diamond pickaxe", "diamond shovel", "diamond sword", "diorite", "diorite slab", "diorite stairs", "diorite wall", "dirt", "dispenser", "dolphin spawn egg", "donkey spawn egg", "dragon breath", "dragon egg", "dragon head", "dragon wall head", "dried kelp", "dried kelp block", "dropper", "drowned spawn egg", "egg", "elder guardian spawn egg", "elytra", "emerald", "emerald block", "emerald ore", "enchanted book", "enchanted golden apple", "enchanting table", "end crystal", "end gateway", "end portal", "end portal frame", "end rod", "end stone", "end stone brick slab", "end stone brick stairs", "end stone brick wall", "end stone bricks", "ender chest", "ender eye", "ender pearl", "enderman spawn egg", "endermite spawn egg", "evoker spawn egg", "experience bottle", "farmland", "feather", "fermented spider eye", "fern", "filled map", "fire", "fire charge", "fire coral", "fire coral block", "fire coral fan", "fire coral wall fan", "firework rocket", "firework star", "fishing rod", "fletching table", "flint", "flint and steel", "flower banner pattern", "flower pot", "fox spawn egg", "frosted ice", "furnace", "furnace minecart", "ghast spawn egg", "ghast tear", "glass", "glass bottle", "glass pane", "glistering melon slice", "globe banner pattern", "glowstone", "glowstone dust", "gold block", "gold ingot", "gold nugget", "gold ore", "golden apple", "golden axe", "golden boots", "golden carrot", "golden chestplate", "golden helmet", "golden hoe", "golden horse armor", "golden leggings", "golden pickaxe", "golden shovel", "golden sword", "granite", "granite slab", "granite stairs", "granite wall", "grass", "grass block", "grass path", "gravel", "gray banner", "gray bed", "gray carpet", "gray concrete", "gray concrete powder", "gray dye", "gray glazed terracotta", "gray shulker box", "gray stained glass", "gray stained glass pane", "gray terracotta", "gray wall banner", "gray wool", "green banner", "green bed", "green carpet", "green concrete", "green concrete powder", "green dye", "green glazed terracotta", "green shulker box", "green stained glass", "green stained glass pane", "green terracotta", "green wall banner", "green wool", "grindstone", "guardian spawn egg", "gunpowder", "hay block", "heart of the sea", "heavy weighted pressure plate", "hopper", "hopper minecart", "horn coral", "horn coral block", "horn coral fan", "horn coral wall fan", "horse spawn egg", "husk spawn egg", "ice", "infested chiseled stone bricks", "infested cobblestone", "infested cracked stone bricks", "infested mossy stone bricks", "infested stone", "infested stone bricks", "ink sac", "iron axe", "iron bars", "iron block", "iron boots", "iron chestplate", "iron door", "iron helmet", "iron hoe", "iron horse armor", "iron ingot", "iron leggings", "iron nugget", "iron ore", "iron pickaxe", "iron shovel", "iron sword", "iron trapdoor", "item frame", "jack o lantern", "jigsaw", "jukebox", "jungle boat", "jungle button", "jungle door", "jungle fence", "jungle fence gate", "jungle leaves", "jungle log", "jungle planks", "jungle pressure plate", "jungle sapling", "jungle sign", "jungle slab", "jungle stairs", "jungle trapdoor", "jungle wall sign", "jungle wood", "kelp", "kelp plant", "knowledge book", "ladder", "lantern", "lapis block", "lapis lazuli", "lapis ore", "large fern", "lava", "lava bucket", "lead", "leather", "leather boots", "leather chestplate", "leather helmet", "leather horse armor", "leather leggings", "lectern", "lever", "light blue banner", "light blue bed", "light blue carpet", "light blue concrete", "light blue concrete powder", "light blue dye", "light blue glazed terracotta", "light blue shulker box", "light blue stained glass", "light blue stained glass pane", "light blue terracotta", "light blue wall banner", "light blue wool", "light gray banner", "light gray bed", "light gray carpet", "light gray concrete", "light gray concrete powder", "light gray dye", "light gray glazed terracotta", "light gray shulker box", "light gray stained glass", "light gray stained glass pane", "light gray terracotta", "light gray wall banner", "light gray wool", "light weighted pressure plate", "lilac", "lily of the valley", "lily pad", "lime banner", "lime bed", "lime carpet", "lime concrete", "lime concrete powder", "lime dye", "lime glazed terracotta", "lime shulker box", "lime stained glass", "lime stained glass pane", "lime terracotta", "lime wall banner", "lime wool", "lingering potion", "llama spawn egg", "loom", "magenta banner", "magenta bed", "magenta carpet", "magenta concrete", "magenta concrete powder", "magenta dye", "magenta glazed terracotta", "magenta shulker box", "magenta stained glass", "magenta stained glass pane", "magenta terracotta", "magenta wall banner", "magenta wool", "magma block", "magma cream", "magma cube spawn egg", "map", "melon", "melon seeds", "melon slice", "melon stem", "milk bucket", "minecart", "mojang banner pattern", "mooshroom spawn egg", "mossy cobblestone", "mossy cobblestone slab", "mossy cobblestone stairs", "mossy cobblestone wall", "mossy stone brick slab", "mossy stone brick stairs", "mossy stone brick wall", "mossy stone bricks", "moving piston", "mule spawn egg", "mushroom stem", "mushroom stew", "music disc 11", "music disc 13", "music disc blocks", "music disc cat", "music disc chirp", "music disc far", "music disc mall", "music disc mellohi", "music disc stal", "music disc strad", "music disc wait", "music disc ward", "mutton", "mycelium", "name tag", "nautilus shell", "nether brick", "nether brick fence", "nether brick slab", "nether brick stairs", "nether brick wall", "nether bricks", "nether portal", "nether quartz ore", "nether star", "nether wart", "nether wart block", "netherrack", "note block", "oak boat", "oak button", "oak door", "oak fence", "oak fence gate", "oak leaves", "oak log", "oak planks", "oak pressure plate", "oak sapling", "oak sign", "oak slab", "oak stairs", "oak trapdoor", "oak wall sign", "oak wood", "observer", "obsidian", "ocelot spawn egg", "orange banner", "orange bed", "orange carpet", "orange concrete", "orange concrete powder", "orange dye", "orange glazed terracotta", "orange shulker box", "orange stained glass", "orange stained glass pane", "orange terracotta", "orange tulip", "orange wall banner", "orange wool", "oxeye daisy", "packed ice", "painting", "panda spawn egg", "paper", "parrot spawn egg", "peony", "petrified oak slab", "phantom membrane", "phantom spawn egg", "pig spawn egg", "pillager spawn egg", "pink banner", "pink bed", "pink carpet", "pink concrete", "pink concrete powder", "pink dye", "pink glazed terracotta", "pink shulker box", "pink stained glass", "pink stained glass pane", "pink terracotta", "pink tulip", "pink wall banner", "pink wool", "piston", "piston head", "player head", "player wall head", "podzol", "poisonous potato", "polar bear spawn egg", "polished andesite", "polished andesite slab", "polished andesite stairs", "polished diorite", "polished diorite slab", "polished diorite stairs", "polished granite", "polished granite slab", "polished granite stairs", "popped chorus fruit", "poppy", "porkchop", "potato", "potatoes", "potion", "potted acacia sapling", "potted allium", "potted azure bluet", "potted bamboo", "potted birch sapling", "potted blue orchid", "potted brown mushroom", "potted cactus", "potted cornflower", "potted dandelion", "potted dark oak sapling", "potted dead bush", "potted fern", "potted jungle sapling", "potted lily of the valley", "potted oak sapling", "potted orange tulip", "potted oxeye daisy", "potted pink tulip", "potted poppy", "potted red mushroom", "potted red tulip", "potted spruce sapling", "potted white tulip", "potted wither rose", "powered rail", "prismarine", "prismarine brick slab", "prismarine brick stairs", "prismarine bricks", "prismarine crystals", "prismarine shard", "prismarine slab", "prismarine stairs", "prismarine wall", "pufferfish", "pufferfish bucket", "pufferfish spawn egg", "pumpkin", "pumpkin pie", "pumpkin seeds", "pumpkin stem", "purple banner", "purple bed", "purple carpet", "purple concrete", "purple concrete powder", "purple dye", "purple glazed terracotta", "purple shulker box", "purple stained glass", "purple stained glass pane", "purple terracotta", "purple wall banner", "purple wool", "purpur block", "purpur pillar", "purpur slab", "purpur stairs", "quartz", "quartz block", "quartz pillar", "quartz slab", "quartz stairs", "rabbit", "rabbit foot", "rabbit hide", "rabbit spawn egg", "rabbit stew", "rail", "ravager spawn egg", "red banner", "red bed", "red carpet", "red concrete", "red concrete powder", "red dye", "red glazed terracotta", "red mushroom", "red mushroom block", "red nether brick slab", "red nether brick stairs", "red nether brick wall", "red nether bricks", "red sand", "red sandstone", "red sandstone slab", "red sandstone stairs", "red sandstone wall", "red shulker box", "red stained glass", "red stained glass pane", "red terracotta", "red tulip", "red wall banner", "red wool", "redstone", "redstone block", "redstone lamp", "redstone ore", "redstone torch", "redstone wall torch", "redstone wire", "repeater", "repeating command block", "rose bush", "rotten flesh", "saddle", "salmon", "salmon bucket", "salmon spawn egg", "sand", "sandstone", "sandstone slab", "sandstone stairs", "sandstone wall", "scaffolding", "scute", "sea lantern", "sea pickle", "seagrass", "shears", "sheep spawn egg", "shield", "shulker box", "shulker shell", "shulker spawn egg", "silverfish spawn egg", "skeleton horse spawn egg", "skeleton skull", "skeleton spawn egg", "skeleton wall skull", "skull banner pattern", "slime ball", "slime block", "slime spawn egg", "smithing table", "smoker", "smooth quartz", "smooth quartz slab", "smooth quartz stairs", "smooth red sandstone", "smooth red sandstone slab", "smooth red sandstone stairs", "smooth sandstone", "smooth sandstone slab", "smooth sandstone stairs", "smooth stone", "smooth stone slab", "snow", "snow block", "snowball", "soul sand", "spawner", "spectral arrow", "spider eye", "spider spawn egg", "splash potion", "sponge", "spruce boat", "spruce button", "spruce door", "spruce fence", "spruce fence gate", "spruce leaves", "spruce log", "spruce planks", "spruce pressure plate", "spruce sapling", "spruce sign", "spruce slab", "spruce stairs", "spruce trapdoor", "spruce wall sign", "spruce wood", "squid spawn egg", "stick", "sticky piston", "stone", "stone axe", "stone brick slab", "stone brick stairs", "stone brick wall", "stone bricks", "stone button", "stone hoe", "stone pickaxe", "stone pressure plate", "stone shovel", "stone slab", "stone stairs", "stone sword", "stonecutter", "stray spawn egg", "string", "stripped acacia log", "stripped acacia wood", "stripped birch log", "stripped birch wood", "stripped dark oak log", "stripped dark oak wood", "stripped jungle log", "stripped jungle wood", "stripped oak log", "stripped oak wood", "stripped spruce log", "stripped spruce wood", "structure block", "structure void", "sugar", "sugar cane", "sunflower", "suspicious stew", "sweet berries", "sweet berry bush", "tall grass", "tall seagrass", "terracotta", "tipped arrow", "tnt", "tnt minecart", "torch", "totem of undying", "trader llama spawn egg", "trapped chest", "trident", "tripwire", "tripwire hook", "tropical fish", "tropical fish bucket", "tropical fish spawn egg", "tube coral", "tube coral block", "tube coral fan", "tube coral wall fan", "turtle egg", "turtle helmet", "turtle spawn egg", "vex spawn egg", "villager spawn egg", "vindicator spawn egg", "vine", "void air", "wall torch", "wandering trader spawn egg", "water", "water bucket", "wet sponge", "wheat", "wheat seeds", "white banner", "white bed", "white carpet", "white concrete", "white concrete powder", "white dye", "white glazed terracotta", "white shulker box", "white stained glass", "white stained glass pane", "white terracotta", "white tulip", "white wall banner", "white wool", "witch spawn egg", "wither rose", "wither skeleton skull", "wither skeleton spawn egg", "wither skeleton wall skull", "wolf spawn egg", "wooden axe", "wooden hoe", "wooden pickaxe", "wooden shovel", "wooden sword", "writable book", "written book", "yellow banner", "yellow bed", "yellow carpet", "yellow concrete", "yellow concrete powder", "yellow dye", "yellow glazed terracotta", "yellow shulker box", "yellow stained glass", "yellow stained glass pane", "yellow terracotta", "yellow wall banner", "yellow wool", "zombie head", "zombie horse spawn egg", "zombie pigman spawn egg", "zombie spawn egg", "zombie villager spawn egg", "zombie wall head"];
const MATERIALS_REVERSED = MATERIALS.reverse();

nlp.extend(compromiseNumbers);

class GameCommand {
  constructor(doc) {
    this.doc = doc;
    this.isValid = false;
    this.commandText = this.doc.text('reduced');
    this.commandToken = this.commandText.split(/\s/);
    this.command = this.commandToken.find(element => element in COMMANDS);

    if (this.command !== undefined) {
      this.args = { command: this.command };
      this.getGameCommandArgs();
    }
  }
}

GameCommand.prototype.getGameCommandArgs = function () {
  var command = this.command;
  if (command.length != 0 && command in COMMANDS) {
    if (command !== 'undo' && command !== 'redo') {
      switch (command) {
        case "build":
          this.getBuildArgs();
          break;
        case "place":
          this.getPlaceArgs();
          break;
        case "move":
          this.getMoveArgs();
          break;
        case "track":
          this.getTrackArgs();
          break;
        case "turn":
        case "tilt":
          this.getLookArgs();
          break;
        case "store":
        case "clone":
          this.getStoreArgs();
          break;
        case "give":
          this.getGiveArgs();
          break;
      }
    } else {
      this.isValid = true;
    }
  }
}

GameCommand.prototype.setMaterial = function () {
  let material = MATERIALS_REVERSED.find(element => this.doc.has(element));
  this.args.material = material !== undefined ? material.split(/\s/).join("_") : "stone";
}

GameCommand.prototype.setDirection = function () {
  let direction = this.commandToken.find(element => element in DIRECTIONS);
  this.args.direction = DIRECTIONS[direction];
}

GameCommand.prototype.getDimensions = function () {
  return this.doc.numbers().json().map(element => {
    return element.number;
  });
}

GameCommand.prototype.getBuildArgs = function () {
  var buildShapes = ["wall", "roof", "house", "sphere"];
  var buildShapeDetected = false;

  // Parse for build shape and hollow tags
  this.commandToken.forEach(element => {
    if (!buildShapeDetected && buildShapes.indexOf(element) > -1) {
      buildShapeDetected = true;
      this.args[element] = true;
    } else if (element === 'hollow') {
      this.args.hollow = true;
    }
  });

  // Validate configurations of build shape and dimensions
  var dimensions = this.getDimensions();
  if (('wall' in this.args || 'roof' in this.args) && dimensions.length == 2) {
    dimensions.push(0);
  } else if (dimensions.length < 3 && !('sphere' in this.args && dimensions.length == 1)) {
    return;
  }

  // Set dimensions and material
  this.args.dimensions = dimensions;
  this.setMaterial();

  // If this was a track command, make it a build command with a track flag
  if (this.command === 'track') {
    this.args.command = 'build';
    this.args.track = true;
  }

  this.isValid = true;
}

GameCommand.prototype.getPlaceArgs = function () {
  this.setMaterial();

  // If this was a track command, make it a place command with a track flag
  if (this.command === 'track') {
    this.args.command = 'place';
    this.args.track = true;
  }

  this.isValid = true;
}

GameCommand.prototype.getMoveArgs = function () {
  // Get movement amount, default to 1
  var dimensions = this.getDimensions();
  this.args.dimensions = dimensions.length != 0 ? dimensions[0] : 1;

  // Set movement direction. If direction was not defined, default to 'forward'
  this.setDirection();
  if (!('direction' in this.args)) {
    this.args.direction = "forward";
  }

  this.isValid = true;
}

GameCommand.prototype.getTrackArgs = function () {
  // Search for build, place, or move keywords
  if (this.doc.has("build")) {
    this.getBuildArgs();
  } else if (this.doc.has("place")) {
    this.getPlaceArgs();
  } else if (this.doc.has("move")) {
    this.args.move = true;
    this.isValid = true;
  }
}

GameCommand.prototype.getLookArgs = function () {
  var defaultDegrees = this.command === "turn" ? 90 : 45;
  let dimensions = this.getDimensions();
  this.args.dimensions = dimensions.length != 0 ? dimensions[0] : defaultDegrees;

  this.isValid = true;
}

GameCommand.prototype.getStoreArgs = function () {
  if (this.doc.has("clone")) {
    this.args.name = this.commandToken[1];
  } else if (this.doc.has("store")) {
    this.args.name = this.commandToken[this.commandToken.length - 1];
  }

  if ('name' in this.args) {
    this.isValid = true;
  }
}

GameCommand.prototype.getGiveArgs = function () {
  this.setMaterial();
  let dimensions = this.getDimensions();
  this.args.dimensions = dimensions.length != 0 ? dimensions[0] : 1;
  this.isValid = true;
}

function processInstruction(instruction) {
  let doc = nlp(instruction.toLowerCase());
  var gameCommand = new GameCommand(doc);
  console.log(gameCommand);
  return gameCommand.isValid ? gameCommand.args : {};
}