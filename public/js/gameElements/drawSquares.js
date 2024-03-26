/**
 * Draws all squares on the canvas without adjusting their positions based on the player's ball size for zoom effect.
 * This ensures that squares are static relative to the grid.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {Array} squares - An array containing the properties of all squares.
 * @param {Object} player - The player's ball object containing its current position and radius for scaling.
 */
export function drawSquares(ctx, squares, player) {
    if (!player) {
        console.error('Player object is undefined, skipping drawing squares.');
        return;
    }
    try {
        squares.forEach(square => {
            ctx.fillStyle = square.color;
            ctx.fillRect(square.x, square.y, square.size, square.size);
        });
        console.log(`Squares drawn without adjustment for player's ball size and position.`);
    } catch (error) {
        console.error('Error drawing squares:', error.message, error.stack);
    }
}