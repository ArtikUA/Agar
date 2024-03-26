const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');
const { setupWebSocketConnection } = require('./wsHandlers/connectionHandler');
const { generateRandomSquare, broadcastPositions, checkCollisions } = require('./server/gameLogic');
const { gameSpace, squareSize } = require('./config/gameSettings');
const app = express();
const port = 3000;

app.use(express.static('public'));

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

global.clients = {};
global.squares = [];
global.gameSpace = gameSpace;

for (let i = 0; i < 50; i++) {
  global.squares.push(generateRandomSquare(global.squares)); // Pass the current squares array as an argument
}

setInterval(() => {
  try {
    broadcastPositions(global.clients, global.squares);
  } catch (error) {
    console.error('Error broadcasting positions:', error);
  }
}, 1000 / 60);
setInterval(() => {
  try {
    checkCollisions(global.clients, global.squares);
  } catch (error) {
    console.error('Error checking collisions:', error);
  }
}, 1000 / 60);

setupWebSocketConnection(wss);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html', (err) => {
    if (err) {
      console.error('Failed to send index.html:', err);
      res.status(500).send('Server error');
    }
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Error handling for the HTTP server
server.on('error', (error) => {
  console.error('Server error:', error);
});