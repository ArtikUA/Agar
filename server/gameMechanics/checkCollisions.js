const { generateRandomSquare } = require('./generateRandomSquare');
const { squareSize, squareGain } = require('../../config/gameSettings');

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
          client.radius += squareGain; // Adjusted to use squareGain for the increase
          delete clients[otherClientId]; 

          const removeMessage = JSON.stringify({ type: 'remove', clientId: otherClientId });
          Object.values(clients).forEach(client => {
            try {
              client.ws.send(removeMessage);
              console.log(`Sent remove message for client ${otherClientId}`);
            } catch (error) {
              console.error(`Error sending remove message for client ${otherClientId}:`, error.message, error.stack);
            }
          });
        }
      }
    });
  });
}

module.exports = { checkCollisions };