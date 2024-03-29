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

  // Create an array for the leaderboard
  const leaderboard = Object.values(clients)
    .map(client => ({
      name: client.name,
      size: client.radius // Using radius to represent size
    }))
    .sort((a, b) => b.size - a.size) // Sort by size in descending order
    .slice(0, 10); // Limit to top 10 players

  const message = JSON.stringify({ 
    type: 'update', 
    positions, 
    squares: squares.map(square => ({
      x: square.x,
      y: square.y,
      color: square.color,
      size: squareSize
    })),
    scale: gameScaleFactor, // Include the new scale factor here
    leaderboard // Add the leaderboard to the message
  });

  Object.values(clients).forEach(client => {
    try {
      client.ws.send(message);
      console.log(`Broadcasted positions, squares, scale factor, and leaderboard to client.`);
    } catch (error) {
      console.error(`Error broadcasting positions to client: ${error.message}`, error.stack);
    }
  });
}

module.exports = { broadcastPositions };