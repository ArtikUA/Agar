import { drawBalls } from './drawBalls.js';
import { drawSquares } from './drawSquares.js';
import { drawGameBorder } from './drawGameBorder.js'; // Re-added import for drawGameBorder

/**
 * Clears the canvas and invokes functions to draw balls and squares.
 * Adjusts the view based on the player's ball size and position to simulate a "camera" following the player.
 * The grid drawing functionality has been removed to meet the project requirements.
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

        ctx.restore(); // Ensure drawing operations are reset before drawing the border

        drawGameBorder(ctx, gameCanvas); // Draw the game border after all other elements to ensure it's on top
        console.log('Game border drawn after all elements.');
    } catch (error) {
        console.error('Error drawing the game:', error.message, error.stack);
    }
}