const { generateRandomSquare } = require('./gameMechanics/generateRandomSquare');
const { generateClientId } = require('./gameMechanics/generateClientId');
const { getRandomPosition } = require('./gameMechanics/getRandomPosition');
const { broadcastPositions } = require('./gameMechanics/broadcastPositions');
const { checkCollisions } = require('./gameMechanics/checkCollisions');

module.exports = {
  generateRandomSquare,
  generateClientId,
  getRandomPosition,
  broadcastPositions,
  checkCollisions
};