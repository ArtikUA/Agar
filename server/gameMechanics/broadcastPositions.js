/**
 * Broadcasts the positions of all balls and squares to all connected clients.
 * @param {Object} clients - The clients object.
 * @param {Array} squares - Array of square objects.
 */
const { squareSize, gameScaleFactor } = require('../../config/gameSettings');

function broadcastPositions(clients, squares) {
  const positions = {};
  Object.keys(clients).forEach(clientId => {
    positions[clientId] = { 
      position: clients[clientId].position, 
      color: clients[clientId].color, 
      radius: clients[clientId].radius,
      name: clients[clientId].name // Include the name property when broadcasting positions
    };
  });
  const message = JSON.stringify({ 
    type: 'update', 
    positions, 
    squares: squares.map(square => ({
      x: square.x,
      y: square.y,
      color: square.color,
      size: squareSize
    })),
    scale: gameScaleFactor // Include the new scale factor here
  });
  Object.values(clients).forEach(client => {
    try {
      client.ws.send(message);
      console.log(`Broadcasted positions, squares, and scale factor to client.`);
    } catch (error) {
      console.error(`Error broadcasting positions to client: ${error.message}`, error.stack);
    }
  });
}

module.exports = { broadcastPositions };