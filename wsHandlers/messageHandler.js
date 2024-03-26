/**
 * Handles incoming WebSocket messages, parsing the message and updating client positions
 * or handling other message types as needed. This modularizes message processing, making it
 * easier to maintain and update.
 * 
 * @param {WebSocket} ws - The WebSocket instance for the current connection.
 * @param {string} message - The raw message received from the WebSocket.
 */
const { ballMoveSpeed, baseMoveSpeed } = require('../config/gameSettings'); // Import ballMoveSpeed and baseMoveSpeed from gameSettings

function handleMessage(ws, message) {
  console.log(`Received message ${message}`);
  try {
    const data = JSON.parse(message);
    const clientId = ws.clientId; // Assuming clientId is attached to the WebSocket instance during connection setup
    if (data.type === 'move') {
      const client = global.clients[clientId];
      if (client) {
        const dx = data.x - client.position.x;
        const dy = data.y - client.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        // Adjusted calculation to ensure ball movement speed is consistent with game settings
        const maxDistance = baseMoveSpeed * ballMoveSpeed; // Removed pixelsPerCm conversion to simplify and correct speed calculation
        if (distance > maxDistance) {
          const ratio = maxDistance / distance;
          client.position.x += dx * ratio;
          client.position.y += dy * ratio;
        } else {
          client.position.x = data.x;
          client.position.y = data.y;
        }
        client.position.x = Math.max(0, Math.min(global.gameSpace.width, client.position.x));
        client.position.y = Math.max(0, Math.min(global.gameSpace.height, client.position.y));
        console.log(`Updated position for clientId ${clientId} to x: ${client.position.x}, y: ${client.position.y}`);
      }
    }
  } catch (error) {
    console.error(`Error processing message:`, error.message, error.stack);
  }
}

module.exports = { handleMessage };