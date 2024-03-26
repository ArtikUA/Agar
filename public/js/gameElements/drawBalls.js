import { drawBall } from './drawBall.js';

/**
 * Draws all balls on the canvas, including player names.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {Object} balls - An object containing the properties of all balls.
 */
export function drawBalls(ctx, balls) {
    Object.keys(balls).forEach(clientId => {
        const ball = balls[clientId];
        try {
            // Retrieving the name from the balls object and using 'Unknown' as a default value if not present.
            const name = ball.name || 'Unknown';
            // Passing the name as an additional argument to the drawBall function.
            drawBall(ctx, ball.x, ball.y, ball.color, ball.radius, name);
            console.log(`Drawing ball for clientId: ${clientId} with name: ${name}`);
        } catch (error) {
            console.error("Error drawing ball for clientId:", clientId, error.message, error.stack);
        }
    });
}