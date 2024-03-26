import { drawBalls } from './drawBalls.js';
import { drawSquares } from './drawSquares.js';

// Function to draw the grid background
function drawGrid(ctx, width, height) {
    const gridSize = 30; // Configurable grid size
    ctx.strokeStyle = '#e0e0e0'; // Subtle color for the grid lines
    ctx.beginPath();
    // Draw vertical lines
    for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
    }
    // Draw horizontal lines
    for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
    }
    ctx.stroke();
}

/**
 * Clears the canvas and invokes functions to draw balls and squares.
 * Adjusts the view based on the player's ball size and position to simulate a "camera" following the player.
 * Additionally, draws a grid pattern on the canvas to give a notebook-like appearance.
 * The grid is now static and does not move with the ball to indicate movement.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {HTMLCanvasElement} gameCanvas - The canvas element where the game is rendered.
 * @param {Object} balls - An object containing the properties of all balls.
 * @param {Array} squares - An array containing the properties of all squares.
 * @param {Object} player - The player's ball object containing its current position and radius.
 * @param {number} scaleFactor - The scale factor for zooming in the game view.
 */
export function drawGame(ctx, gameCanvas, balls, squares, player, scaleFactor) {
    try {
        // Clear the canvas
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

        // Call drawGrid to draw the grid background
        drawGrid(ctx, gameCanvas.width, gameCanvas.height);

        if (!player) {
            console.error('Player object is undefined, skipping drawing.');
            return;
        }

        // Calculate scale based on player's ball radius and the provided scaleFactor.
        const baseRadius = 15 * scaleFactor; // Adjusted base player radius for scale calculation
        const scale = baseRadius / player.radius;
        ctx.save();
        ctx.translate(gameCanvas.width / 2, gameCanvas.height / 2); // Center the "camera" on the canvas
        ctx.scale(scale, scale); // Apply scaling to "zoom out" as the player's ball grows
        ctx.translate(-player.x, -player.y); // Adjust the "camera" to follow the player's ball

        drawSquares(ctx, squares, player);
        drawBalls(ctx, balls);

        ctx.restore();
    } catch (error) {
        console.error('Error drawing the game:', error.message, error.stack);
    }
}