const { generateRandomSquare } = require('./generateRandomSquare');
const { squareSize, squareGain, initialBallSize } = require('../../config/gameSettings');
const { getRandomPosition } = require('./getRandomPosition');

/**
 * Checks and handles collisions between balls and squares, and between balls themselves.
 * @param {Object} clients - The clients object.
 * @param {Array} squares - Array of square objects.
 */
function checkCollisions(clients, squares) {
  Object.keys(clients).forEach(clientId => {
    const client = clients[clientId];
    squares.forEach((square, index) => {
      const ballEdgeX = client.position.x + client.radius;
      const ballEdgeY = client.position.y + client.radius;
      const squareEdgeX = square.x + squareSize;
      const squareEdgeY = square.y + squareSize;

      if (client.position.x - client.radius < squareEdgeX &&
          ballEdgeX > square.x &&
          client.position.y - client.radius < squareEdgeY &&
          ballEdgeY > square.y) {
        client.radius += squareGain; // Adjusted to use squareGain for the increase
        squares[index] = generateRandomSquare(squares); 
      }
    });

    Object.keys(clients).forEach(otherClientId => {
      if (clientId !== otherClientId) {
        const otherClient = clients[otherClientId];
        const distance = Math.sqrt(Math.pow(client.position.x - otherClient.position.x, 2) + Math.pow(client.position.y - otherClient.position.y, 2));
        if (distance < client.radius + otherClient.radius && client.radius >= otherClient.radius * 1.1) {
          otherClient.position = getRandomPosition();
          otherClient.radius = initialBallSize; // Resetting radius to the initial size defined in gameSettings.js

          const updateMessage = JSON.stringify({
            type: 'update',
            positions: {
              [otherClientId]: {
                position: otherClient.position,
                radius: otherClient.radius,
                color: otherClient.color,
                name: otherClient.name,
              },
            },
          });

          // Broadcast the update to all clients
          Object.values(clients).forEach(client => {
            try {
              client.ws.send(updateMessage);
              console.log(`Sent update message for client ${otherClientId}`);
            } catch (error) {
              console.error(`Error sending update message for client ${otherClientId}:`, error.message, error.stack);
            }
          });
        }
      }
    });
  });
}

module.exports = { checkCollisions };