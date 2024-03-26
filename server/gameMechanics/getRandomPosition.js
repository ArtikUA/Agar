const { gameSpace: defaultGameSpace } = require('../../config/gameSettings');

/**
 * Generates a random position within the game space.
 * @returns {{x: number, y: number}} Position object.
 */
function getRandomPosition() {
  const gameSpace = global.gameSpace || defaultGameSpace; // Use global.gameSpace if defined, otherwise fallback to default from gameSettings

  try {
    const position = {
      x: Math.floor(Math.random() * gameSpace.width),
      y: Math.floor(Math.random() * gameSpace.height),
    };
    console.log(`Generated random position: x=${position.x}, y=${position.y}`);
    return position;
  } catch (error) {
    console.error('Error generating random position:', error.message, error.stack);
    throw error; // Rethrow the error after logging
  }
}

module.exports = { getRandomPosition };