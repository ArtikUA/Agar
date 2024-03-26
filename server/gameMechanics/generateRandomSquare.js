const { getRandomColor } = require('../../utils/colorUtils');
const { gameSpace, squareSize } = require('../../config/gameSettings');

/**
 * Generates a square with random position and color that does not overlap with existing squares.
 * @param {Array} squares - Array of current squares to check for overlap.
 * @returns {{x: number, y: number, color: string}} New square object.
 */
function generateRandomSquare(squares = []) {
  let newPosition;
  let doesOverlap;
  do {
    newPosition = {
      x: Math.floor(Math.random() * (gameSpace.width - squareSize)),
      y: Math.floor(Math.random() * (gameSpace.height - squareSize)),
      color: getRandomColor()
    };
    doesOverlap = squares.some(square => {
      return newPosition.x < square.x + squareSize &&
             newPosition.x + squareSize > square.x &&
             newPosition.y < square.y + squareSize &&
             newPosition.y + squareSize > square.y;
    });
  } while (doesOverlap); 

  console.log(`Generated new square at position (${newPosition.x}, ${newPosition.y}) with color ${newPosition.color}.`);

  return newPosition;
}

module.exports = { generateRandomSquare };