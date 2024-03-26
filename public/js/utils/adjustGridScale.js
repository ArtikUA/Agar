/**
 * Calculates the new scale for the grid lines based on the player's ball size and the scaleFactor.
 * This function maintains a consistent visual relation between the grid lines and the game elements,
 * ensuring that as the player's ball grows and the game zooms out, the grid scales in a way that visually
 * indicates the player's growth relative to the static game space.
 * 
 * @param {number} playerRadius - The current radius of the player's ball.
 * @param {number} baseRadius - The base radius of the balls at the start of the game.
 * @param {number} scaleFactor - The current scale factor of the game.
 * @returns {number} The new scale value for the grid lines.
 */
export function adjustGridScale(playerRadius, baseRadius, scaleFactor) {
    // The grid scale should inversely change with the player's growth and the game's zoom out scale.
    // This means as the player's ball grows (i.e., playerRadius increases), or as the game zooms out further
    // (i.e., scaleFactor increases), the grid lines should appear closer together (i.e., scale decreases).
    
    // The formula below is a simple representation of this concept, feel free to adjust it to fit the game's feel.
    // The basic idea is to decrease the grid scale as the player's ball becomes larger or as the game zooms out more,
    // which is achieved by dividing the baseRadius by the current playerRadius and then adjusting by the scaleFactor.
    const newScale = (baseRadius / playerRadius) * scaleFactor;

    console.log(`Adjusting grid scale. Player radius: ${playerRadius}, Base radius: ${baseRadius}, Scale factor: ${scaleFactor}, New scale: ${newScale}`);

    return newScale;
}