/**
 * Draws a single ball on the canvas with the player's name centered on it.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {number} x - The x-coordinate of the ball's center.
 * @param {number} y - The y-coordinate of the ball's center.
 * @param {string} color - The color of the ball.
 * @param {number} radius - The radius of the ball.
 * @param {string} name - The name of the player.
 */
export function drawBall(ctx, x, y, color, radius, name) {
    try {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, true);
        ctx.fill();

        // Adjustments for name display based on the ball's radius
        ctx.fillStyle = 'white'; // Ensuring visibility against potentially dark ball colors
        let fontSize = Math.max(radius / 3, 10); // Dynamic font size calculation based on ball radius
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Calculate the text width and adjust if it exceeds the ball's diameter
        let textWidth = ctx.measureText(name).width;
        if (textWidth > radius * 2 - 10) { // Ensure some padding
            fontSize *= (radius * 2 - 10) / textWidth;
            ctx.font = `bold ${fontSize}px Arial`; // Adjust font size to fit
        }

        ctx.fillText(name, x, y); // Draw the name centered on the ball

        console.log(`Ball drawn at (${x}, ${y}) with radius ${radius} and color ${color}. Name: ${name}`);
    } catch (error) {
        console.error('Error drawing the ball:', error.message, error.stack);
    }
}