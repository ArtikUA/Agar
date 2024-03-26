/**
 * Calculates the grid scale based on the square size and the current player zoom level.
 * This function ensures the grid scales appropriately with the game's zoom level,
 * keeping the grid and squares visually consistent in size relative to each other.
 * 
 * @param {number} squareSize - The size of the squares in the game.
 * @param {number} zoomLevel - The current zoom level of the player's view.
 * @returns {number} The calculated scale value for the grid.
 */
export function calculateGridScale(squareSize, zoomLevel) {
    // Assume squareSize does not change with zoom. The grid scale is inversely proportional to the zoom level.
    // This simple calculation ensures the grid appears to scale with the squares correctly.
    const gridScale = 1 / zoomLevel;

    console.log(`Calculated grid scale: ${gridScale} based on square size: ${squareSize} and zoom level: ${zoomLevel}`);

    return gridScale;
}