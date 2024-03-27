import { balls, squares } from './gameClient.js';
import { updateGameStateFromMessage } from './gameState/updateGameState.js';
import { drawGame } from './gameElements/drawGame.js';

let clientId = null; // Store the clientId of the current connection at the top to ensure it's initialized before use
let scaleFactor = 1; // Store the scale factor for the game

document.addEventListener('DOMContentLoaded', function() {
    const gameCanvas = document.getElementById('gameCanvas');
    if (!gameCanvas) {
        console.error('Game canvas element not found.');
        return;
    }
    const ctx = gameCanvas.getContext('2d');
    if (!ctx) {
        console.error('Unable to get canvas context.');
        return;
    }

    // Dynamically adjust canvas size to fit the window
    function resizeCanvas() {
        gameCanvas.width = window.innerWidth;
        gameCanvas.height = window.innerHeight;
        if (clientId && balls[clientId]) { // Ensure clientId is initialized and the player's ball exists before drawing
            drawGame(ctx, gameCanvas, balls, squares, balls[clientId], scaleFactor); // Pass the player's ball and scaleFactor as the last parameters
        }
    }
    resizeCanvas(); // Call resizeCanvas to set initial size
    window.addEventListener('resize', resizeCanvas); // Adjust canvas size on window resize

    let targetPosition = { x: 0, y: 0 }; // Store the target position for the ball
    let positionUpdateInterval = null; // Store the interval ID for position updates

    const nameInputForm = document.getElementById('nameInputForm');
    const nameInputModal = document.getElementById('nameInputModal');
    const playerNameInput = document.getElementById('playerName');
    const submitButton = nameInputForm.querySelector('button[type="submit"]');

    // Ensure the modal is visible initially
    nameInputModal.style.display = 'flex'; // Assuming 'flex' is the correct display style based on the modal's CSS definition

    nameInputForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from causing a page reload
        const playerName = playerNameInput.value.trim();
        if (playerName) {
            submitButton.style.backgroundColor = 'green';
            submitButton.textContent = '✔ Submitted';

            setTimeout(() => {
                submitButton.style.backgroundColor = ''; // Reset button background color
                submitButton.textContent = 'Start Game'; // Reset button text
            }, 500); // Short delay to show the button feedback before proceeding

            nameInputModal.style.display = 'none'; // Hide the modal

            const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
            const wsURL = `${wsProtocol}//${window.location.host}`;
            const ws = new WebSocket(wsURL);

            ws.onopen = function() {
                console.log('WebSocket connection established.');
                ws.send(JSON.stringify({ type: 'initialize', name: playerName, width: window.innerWidth, height: window.innerHeight }));
                console.log(`Sent initialization message with name: ${playerName} and viewport dimensions.`);
                positionUpdateInterval = setInterval(() => {
                    if (clientId) {
                        ws.send(JSON.stringify({ type: 'move', x: targetPosition.x, y: targetPosition.y }));
                    }
                }, 10);
            };

            ws.onerror = function(error) {
                console.error('WebSocket error:', error);
            };

            ws.onmessage = function(event) {
                const data = JSON.parse(event.data);
                if (data.type === 'initialize') {
                    console.log('Ball initialized with color:', data.color);
                    clientId = data.clientId; // Set the clientId for the current connection
                    balls[clientId] = {x: data.position.x, y: data.position.y, color: data.color, radius: data.radius, name: playerName}; // Include name in the ball object
                    targetPosition = { x: data.position.x, y: data.position.y }; // Initialize target position
                } else if (data.type === 'update') {
                    // Update the game state including player names
                    updateGameStateFromMessage(data, balls, squares);
                    // Ensure names are updated for each ball
                    Object.keys(data.positions).forEach(clientId => {
                        if (balls[clientId]) {
                            balls[clientId].name = data.positions[clientId].name;
                        }
                    });
                    // Update the scale factor from the server
                    if (data.scale) {
                        scaleFactor = data.scale;
                    }
                }
                if (balls[clientId]) { // Ensure the player's ball exists before drawing
                    drawGame(ctx, gameCanvas, balls, squares, balls[clientId], scaleFactor); // Pass the player's ball and scaleFactor as the last parameters
                }
            };

            ws.onclose = function() {
                console.log('WebSocket connection closed.');
                if (positionUpdateInterval !== null) {
                    clearInterval(positionUpdateInterval);
                }
            };
        } else {
            console.error('Player name is required.');
        }
    });

    document.addEventListener('mousemove', function(event) {
        const rect = gameCanvas.getBoundingClientRect();
        const scaleX = gameCanvas.width / rect.width;    // relationship bitmap vs. element for X
        const scaleY = gameCanvas.height / rect.height;  // relationship bitmap vs. element for Y

        // Adjust target position calculation to account for the current scale and translation applied to the canvas
        const playerBall = balls[clientId];
        if (playerBall) {
            const baseRadius = 15; // Base player radius for scale calculation, should match the one used in drawGame.js
            const scale = baseRadius / playerBall.radius;
            const offsetX = (event.clientX - rect.left) * scaleX - window.innerWidth / 2;
            const offsetY = (event.clientY - rect.top) * scaleY - window.innerHeight / 2;
            targetPosition.x = playerBall.x + offsetX / scale;
            targetPosition.y = playerBall.y + offsetY / scale;
        }
    });
});