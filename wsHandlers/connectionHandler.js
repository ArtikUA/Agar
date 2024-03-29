const { generateClientId, getRandomPosition } = require('../server/gameLogic');
const { getRandomColor } = require('../utils/colorUtils');
const { handleMessage } = require('./messageHandler'); // Import the handleMessage function
const { initialBallSize } = require('../config/gameSettings'); // Import the initialBallSize

function setupWebSocketConnection(wss) {
  wss.on('connection', function connection(ws) {
    console.log('WebSocket connection established.');
    const clientId = generateClientId();
    const color = getRandomColor();
    let position = { x: 0, y: 0 }; // Placeholder for dynamic position assignment

    // Placeholder for dynamic game space dimensions
    let gameSpaceWidth = 800; // Set the default game space width based on your requirements
    let gameSpaceHeight = 600; // Set the default game space height based on your requirements

    // Initial setup with default values, might be overwritten by 'initialize' message
    global.clients[clientId] = { ws, color, position, radius: initialBallSize / 2, name: '' }; // Use half of the initialBallSize for radius
    ws.clientId = clientId; // Attach clientId to the WebSocket instance

    console.log(`New connection: ${clientId} with color ${color} at position x: ${position.x}, y: ${position.y}`);

    ws.on('message', function incoming(message) {
      try {
        const data = JSON.parse(message);
        if (data.type === 'initialize' && data.name) {
          // Update client information with name received from the 'initialize' message
          global.clients[clientId].name = data.name;

          // Update game space dimensions based on client's viewport size
          if (data.width && data.height) {
            gameSpaceWidth = data.width;
            gameSpaceHeight = data.height;
            position = getRandomPosition({width: gameSpaceWidth, height: gameSpaceHeight});
            global.clients[clientId].position = position;
          }

          console.log(`Updated connection: ${clientId} with name ${data.name} and game space dimensions width: ${gameSpaceWidth}, height: ${gameSpaceHeight}`);

          ws.send(JSON.stringify({ type: 'initialize', color, position, clientId, radius: initialBallSize / 2, name: data.name })); // Confirm initialization with name
        } else if (data.type === 'restart') {
          const clientId = ws.clientId;
          if (clientId && global.clients[clientId]) {
            const newPosition = getRandomPosition();
            global.clients[clientId].position = newPosition;
            global.clients[clientId].radius = initialBallSize / 2; // Assuming the radius is half the diameter
            
            // Inform the client about the reset
            ws.send(JSON.stringify({
              type: 'reset',
              position: newPosition,
              radius: initialBallSize / 2
            }));
            console.log(`Client ${clientId} reset to new position and size.`);
          }
        } else {
          // Use the handleMessage function for processing incoming messages
          handleMessage(ws, message);
        }
      } catch (error) {
        console.error(`Error processing message from WebSocket:`, error.message, error.stack);
      }
    });

    ws.on('close', () => {
      console.log(`Connection closed: ${clientId}`);
      delete global.clients[clientId];
      const removeMessage = JSON.stringify({ type: 'remove', clientId: clientId });
      Object.values(global.clients).forEach(client => {
        try {
          client.ws.send(removeMessage);
          console.log(`Broadcasted removal of ${clientId}`);
        } catch (error) {
          console.error(`Error broadcasting removal of ${clientId}:`, error.message, error.stack);
        }
      });
    });

    ws.on('error', (error) => {
      console.error(`WebSocket error from ${clientId}:`, error.message, error.stack);
    });

    // Send initial setup information to the client
    ws.send(JSON.stringify({ type: 'initialize', color, position, clientId, radius: initialBallSize / 2 })); // Use half of the initialBallSize for radius
  });
}

module.exports = { setupWebSocketConnection };