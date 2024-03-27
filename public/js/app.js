import { balls, squares } from './gameClient.js';
import { updateGameStateFromMessage } from './gameState/updateGameState.js';
import { drawGame } from './gameElements/drawGame.js';
import { createNameInputModal } from './utils/modalPopup.js'; // Import the createNameInputModal function

let clientId = null; // Store the clientId of the current connection at the top to ensure it's initialized before use
let scaleFactor = 1; // Store the scale factor for the game

document.addEventListener('DOMContentLoaded', function() {
    const playerName = localStorage.getItem('playerName');
    createNameInputModal(); // Call the function to create and inject the modal into the DOM

    if (!playerName) {
        showModal(); // Show the modal if the user's name isn't already stored
    }

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

    const nameInputModal = document.querySelector('.modal-overlay');
    const nameInputForm = document.getElementById('nameInputForm');
    const playerNameInput = document.getElementById('playerName');

    // Function to show the modal
    function showModal() {
        const storedName = localStorage.getItem('playerName');
        if (!storedName) {
            nameInputModal.style.display = 'flex'; // Use 'flex' to show the modal if using Flexbox for alignment
            nameInputModal.style.opacity = '0';
            requestAnimationFrame(() => {
                nameInputModal.style.transition = 'opacity 0.5s';
                nameInputModal.style.opacity = '1';
            });
        }
    }

    // Function to hide the modal smoothly
    function hideModal() {
        try {
            nameInputModal.style.opacity = '0';
            nameInputModal.addEventListener('transitionend', function transitionEnd(event) {
                if (event.propertyName === 'opacity' && nameInputModal.style.opacity === '0') {
                    // This event listener is removed after execution to prevent it firing multiple times
                    nameInputModal.removeEventListener('transitionend', transitionEnd);
                    nameInputModal.style.display = 'none'; // Hide the modal after the fade-out transition
                    console.log('Modal window successfully hidden after fade-out transition.');
                }
            });
        } catch (error) {
            console.error('Error hiding the modal window:', error.message, error.stack);
        }
    }

    nameInputForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from causing a page reload
        const playerName = playerNameInput.value.trim();
        if (playerName) {
            localStorage.setItem('playerName', playerName); // Store the player's name in local storage
            hideModal(); // Close the modal after the user submits their name

            const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
            const wsURL = `${wsProtocol}//${window.location.host}`;
            const ws = new WebSocket(wsURL);

            ws.onopen = function() {
                try {
                    console.log('WebSocket connection established.');
                    ws.send(JSON.stringify({ type: 'initialize', name: playerName, width: window.innerWidth, height: window.innerHeight }));
                    console.log(`Sent initialization message with name: ${playerName} and viewport dimensions.`);
                    positionUpdateInterval = setInterval(() => {
                        if (clientId) {
                            ws.send(JSON.stringify({ type: 'move', x: targetPosition.x, y: targetPosition.y }));
                        }
                    }, 10);
                } catch (error) {
                    console.error('WebSocket onopen error:', error);
                    alert('There was a problem initializing the game. Please try again or refresh the page.');
                }
            };

            ws.onerror = function(error) {
                console.error('WebSocket error:', error);
            };

            ws.onmessage = function(event) {
                try {
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
                    } else if (data.type === 'initSuccess') {
                        console.log(`Initialization successful for ${data.name}. Message from server: ${data.message}`);
                        hideModal(); // Call the hideModal() function to smoothly hide the modal window
                    }
                    if (balls[clientId]) { // Ensure the player's ball exists before drawing
                        drawGame(ctx, gameCanvas, balls, squares, balls[clientId], scaleFactor); // Pass the player's ball and scaleFactor as the last parameters
                    }
                } catch (error) {
                    console.error('WebSocket onmessage error:', error);
                    alert('There was a problem processing the game data. Please try submitting your name again or refresh the page.');
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