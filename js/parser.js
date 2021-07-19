// Dictionaries of commands, directions and materials supported by the system
const COMMANDS = { "build": true, "place": true, "move": true, "track": true, "turn": true, "tilt": true, "undo": true, "redo": true, "store": true, "clone": true, "give": true };
const DIRECTIONS = { "up": "up", "down": "down", "left": "left", "right": "right", "forward": "forward", "back": "back", "astir": "up", "improving": "up", "upward": "up", "upwards": "up", "upwardly": "up", "down feather": "down", "Down": "down", "John L. H. Down": "down", "pile": "down", "toss off": "down", "pop": "down", "bolt down": "down", "belt down": "down", "pour down": "down", "drink down": "down", "kill": "down", "devour": "down", "consume": "down", "go through": "down", "shoot down": "down", "land": "down", "knock down": "down", "cut down": "down", "push down": "down", "pull down": "down", "polish": "down", "refine": "down", "fine-tune": "down", "downward": "down", "down pat": "down", "mastered": "down", "depressed": "down", "gloomy": "down", "grim": "down", "blue": "down", "dispirited": "down", "downcast": "down", "downhearted": "down", "down in the mouth": "down", "low": "down", "low-spirited": "down", "downwards": "down", "downwardly": "down", "left wing": "left", "left hand": "left", "left field": "left", "leftfield": "left", "leave": "left", "go forth": "left", "go away": "left", "leave alone": "left", "leave behind": "left", "exit": "left", "go out": "left", "get out": "left", "allow for": "left", "allow": "left", "provide": "left", "result": "left", "lead": "left", "depart": "left", "pull up stakes": "left", "entrust": "left", "bequeath": "left", "will": "left", "impart": "left", "give": "left", "pass on": "left", "forget": "left", "leftover": "left", "left over": "left", "odd": "left", "remaining": "left", "unexpended": "left", "left-hand": "left", "right field": "right", "rightfield": "right", "right wing": "right", "right hand": "right", "rightfulness": "right", "compensate": "right", "redress": "right", "correct": "right", "rectify": "right", "proper": "right", "right-hand": "right", "good": "right", "ripe": "right", "veracious": "right", "flop": "right", "properly": "right", "decently": "right", "decent": "right", "in good order": "right", "the right way": "right", "right on": "right", "mighty": "right", "mightily": "right", "powerful": "right", "justly": "right", "correctly": "right", "aright": "right", "send on": "forward", "advancing": "forward", "forward-moving": "forward", "forwards": "forward", "frontward": "forward", "frontwards": "forward", "forrad": "forward", "forrard": "forward", "forth": "forward", "onward": "forward", "ahead": "forward", "onwards": "forward", "forrader": "forward", "fore": "forward", "dorsum": "back", "rear": "back", "spinal column": "back", "vertebral column": "back", "spine": "back", "backbone": "back", "rachis": "back", "binding": "back", "book binding": "back", "cover": "back", "backrest": "back", "endorse": "back", "indorse": "back", "plump for": "back", "plunk for": "back", "support": "back", "second": "back", "bet on": "back", "gage": "back", "stake": "back", "game": "back", "punt": "back", "back up": "back", "hind": "back", "hinder": "back", "backward": "back", "backwards": "back", "rearward": "back", "rearwards": "back" }; // taken from wordnet
const BLOCKS = { "acacia door": 430, "acacia fence": 192, "acacia fence gate": 187, "acacia stairs": 163, "activator rail": 157, "air": 0, "anvil": 145, "apple": 260, "armor stand": 416, "arrow": 262, "baked potato": 393, "banner": 425, "barrier": 166, "beacon": 138, "bed": 26, "bedrock": 7, "beetroot": 434, "beetroot seeds": 435, "beetroot soup": 436, "birch door": 428, "birch fence": 189, "birch fence gate": 184, "birch wood stairs": 135, "blaze powder": 377, "blaze rod": 369, "boat": 333, "acacia boat": 447, "birch boat": 445, "dark oak boat": 448, "jungle boat": 446, "spruce boat": 444, "bone": 352, "book": 340, "book and quill": 386, "bookshelf": 47, "bow": 261, "bowl": 281, "bread": 297, "brewing stand": 379, "brick": 45, "brick stairs": 108, "brown mushroom": 39, "bucket": 325, "cactus": 81, "cake": 354, "carpet": 171, "carrot": 391, "carrot stick": 398, "cauldron": 380, "chainmail boots": 305, "chainmail chestplate": 303, "chainmail helmet": 302, "chainmail leggings": 304, "chest": 54, "chorus flower": 200, "chorus fruit": 432, "chorus fruit popped": 433, "chorus plant": 199, "clay": 82, "coal": 263, "coal block": 173, "coal ore": 16, "cobblestone wall": 139, "cobblestone": 4, "cobblestone stairs": 67, "command block": 137, "chain command block": 211, "repeating command block": 210, "compass": 345, "cooked beef": 364, "cooked chicken": 366, "cooked fish": 350, "cooked mutton": 424, "cooked rabbit": 412, "cookie": 357, "dark oak door": 431, "dark oak fence": 191, "dark oak fence gate": 186, "dark oak stairs": 164, "daylight sensor": 151, "dead bush": 32, "detector rail": 28, "diamond": 264, "diamond axe": 279, "diamond block": 57, "diamond boots": 313, "diamond chestplate": 311, "diamond helmet": 310, "diamond hoe": 293, "diamond leggings": 312, "diamond ore": 56, "diamond pickaxe": 278, "diamond shovel": 277, "diamond sword": 276, "dirt": 3, "dispenser": 23, "dragon egg": 122, "dropper": 158, "egg": 344, "elytra": 443, "emerald": 388, "emerald block": 133, "emerald ore": 129, "empty map": 395, "enchanted book": 403, "enchantment table": 116, "end bricks": 206, "end crystal": 426, "end rod": 198, "ender chest": 130, "ender pearl": 368, "ender portal frame": 120, "end stone": 121, "eye of ender": 381, "feather": 288, "fence": 85, "fence gate": 107, "fermented spider eye": 376, "fireball": 385, "firework": 401, "firework charge": 402, "fishing rod": 346, "flint": 318, "flint and steel": 259, "flower pot": 390, "furnace": 61, "ghast tear": 370, "glass": 20, "glass bottle": 374, "glowstone": 89, "glowstone dust": 348, "gold axe": 286, "gold": 41, "gold block": 41, "gold boots": 317, "gold chestplate": 315, "gold helmet": 314, "gold hoe": 294, "gold ingot": 266, "gold leggings": 316, "gold nugget": 371, "gold ore": 14, "gold pickaxe": 285, "gold pressure plate": 147, "gold shovel": 284, "gold sword": 283, "golden apple": 322, "golden carrot": 396, "grass": 2, "grass path": 208, "gravel": 13, "cooked pork": 320, "cooked pork chop": 320, "terracottaa": 172, "hay block": 170, "hopper": 154, "hopper minecart": 408, "ice": 79, "iron axe": 258, "iron bars": 101, "iron": 42, "iron block": 42, "iron boots": 309, "iron chestplate": 307, "iron door": 71, "iron fence": 101, "iron helmet": 306, "iron hoe": 292, "iron ingot": 265, "iron leggings": 308, "iron ore": 15, "iron pickaxe": 257, "iron pressure plate": 148, "iron shovel": 256, "iron sword": 267, "iron trapdoor": 167, "item frame": 389, "jack o lantern": 91, "jukebox": 84, "jungle door": 429, "jungle fence": 190, "jungle fence gate": 185, "jungle wood stairs": 136, "ladder": 65, "lapis block": 22, "lapis ore": 21, "lava": 11, "lava bucket": 327, "leash": 420, "lead": 420, "leather": 334, "leather boots": 301, "leather chestplate": 299, "leather helmet": 298, "leather leggings": 300, "leaves": 18, "lever": 69, "log": 17, "tall grass": 31, "magma cream": 378, "map": 395, "melon": 360, "melon block": 103, "melon seeds": 362, "milk bucket": 335, "minecart": 328, "mob spawner": 52, "mossy cobblestone": 48, "mushroom soup": 282, "mushroom stew": 282, "mutton": 423, "mycelium": 110, "name tag": 421, "nether brick": 112, "nether brick stairs": 114, "nether fence": 113, "nether star": 399, "nether warts": 372, "netherrack": 87, "note block": 25, "obsidian": 49, "packed ice": 174, "painting": 321, "paper": 339, "poisonous potato": 394, "raw pork": 319, "raw porkchop": 319, "potato": 392, "powered rail": 27, "prismarine": 168, "prismarine crystals": 410, "prismarine shard": 409, "pumpkin": 86, "pumpkin pie": 400, "pumpkin seeds": 361, "purpur block": 201, "purpur pillar": 202, "purpur slab": 205, "purpur stairs": 203, "quartz": 406, "quartz block": 155, "quartz ore": 153, "quartz stairs": 156, "rabbit": 411, "rabbit foot": 414, "rabbit hide": 415, "rabbit stew": 413, "rails": 66, "raw beef": 363, "raw chicken": 365, "raw fish": 349, "red mushroom": 40, "red flower": 38, "red sandstone": 179, "red sandstone stairs": 180, "redstone": 331, "redstone block": 152, "redstone comparator": 149, "redstone lamp": 123, "redstone ore": 73, "redstone torch": 76, "rotten flesh": 367, "saddle": 329, "sand": 12, "sandstone": 24, "sandstone stairs": 128, "sapling": 6, "sea lantern": 169, "seeds": 295, "shears": 359, "shield": 442, "sign": 63, "skull": 397, "slime ball": 341, "slime block": 165, "snow": 78, "snowball": 332, "snow block": 80, "soul sand": 88, "glistering melon": 382, "spectral arrow": 439, "spider eye": 375, "sponge": 19, "spruce door": 427, "spruce fence": 188, "spruce fence gate": 183, "spruce wood stairs": 134, "stained clay": 159, "stained glass": 95, "stained glass pane": 160, "stick": 280, "stone": 1, "stone axe": 275, "stone button": 77, "stone hoe": 291, "stone pickaxe": 274, "stone pressure plate": 70, "stone slab": 44, "stone shovel": 273, "stone sword": 272, "string": 287, "structure block": 255, "sugar": 353, "sugar cane": 83, "glass pane": 102, "tipped arrow": 440, "tnt": 46, "torch": 50, "trapdoor": 96, "trapped chest": 146, "tripwire hook": 131, "vine": 106, "clock": 347, "water": 9, "water bucket": 326, "water lily": 111, "lilypad": 111, "web": 30, "cobweb": 30, "wheat": 296, "wood": 5, "wood axe": 271, "wood button": 143, "wood door": 324, "wood hoe": 290, "wood pickaxe": 270, "wood pressure plate": 72, "wood shovel": 269, "wood stairs": 53, "wood slab": 126, "wood sword": 268, "wooden door": 64, "wool": 35, "crafting table": 58, "written book": 387, "yellow flower": 37 }; // minecraft material codes for version 1.9

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

GameCommand.prototype.setBlock = function () {
  for (const key in BLOCKS) {
    if (this.doc.has(key)) {
      this.args.block_code = BLOCKS[key];
      return;
    }
  }

  this.args.block_code = BLOCKS.stone;
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
  this.setBlock();

  // If this was a track command, make it a build command with a track flag
  if (this.command === 'track') {
    this.args.command = 'build';
    this.args.track = true;
  }

  this.isValid = true;
}

GameCommand.prototype.getPlaceArgs = function () {
  this.setBlock();

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
  this.setBlock();
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