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
  this.args.material = material !== undefined ? material.replace(/\s+/g, "_") : "stone";
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
