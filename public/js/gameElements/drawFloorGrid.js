// public/js/gameElements/drawFloorGrid.js
import { squareSize, gameScaleFactor, gridLineColor, gridLineThickness } from '../config/gameSettings.js'; // Import necessary settings

export function drawFloorGrid(ctx, gameCanvas, gameWidth, gameHeight) {
    // Error handling for undefined or incorrect imports from gameSettings.js
    if (typeof gameScaleFactor !== 'number' || typeof gridLineColor !== 'string' || typeof gridLineThickness !== 'number') {
        console.error('Error: Invalid or undefined game settings. Please check gameScaleFactor, gridLineColor, and gridLineThickness in gameSettings.js.');
        return; // Prevent further execution of drawFloorGrid
    }

    if (!ctx || !gameCanvas || typeof gameWidth !== 'number' || typeof gameHeight !== 'number') {
        console.error('Invalid parameters passed to drawFloorGrid:', {
            ctx,
            gameCanvas,
            gameWidth,
            gameHeight
        });
        return;
    }

    ctx.strokeStyle = gridLineColor; // Use the gridLineColor from gameSettings.js
    ctx.lineWidth = gridLineThickness; // Use the gridLineThickness from gameSettings.js
    const gridSize = squareSize * 2.5 * gameScaleFactor; // Calculate grid size based on square size and game scale factor

    // Draw vertical lines with check against gameCanvas.width
    for (let x = 0; x <= gameWidth && x <= gameCanvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, Math.min(gameHeight, gameCanvas.height));
        ctx.stroke();
        console.log(`Drawing vertical grid line at x=${x}`);
    }

    // Draw horizontal lines with check against gameCanvas.height
    for (let y = 0; y <= gameHeight && y <= gameCanvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(Math.min(gameWidth, gameCanvas.width), y);
        ctx.stroke();
        console.log(`Drawing horizontal grid line at y=${y}`);
    }
}