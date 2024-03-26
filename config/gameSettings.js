// Game space dimensions are now dynamically set by the client, so these are placeholders
// These initial values are used as fallbacks
const gameSpace = { width: 800, height: 600 };

// Square properties
const squareSize = 10; // Size of squares in pixels

// Initial size of the balls in pixels (diameter)
const initialBallSize = 45; // Adjusted initial ball size as per task requirement to ensure it can eat squares

// Ball movement speed (fraction of normal speed, 1 is normal speed, less than 1 is slower)
const ballMoveSpeed = 0.1; //Adjust the ball movement speed as needed

// Adjusted base movement speed for ball movement calculations to accommodate for the 3x zoom
// Tripling the baseMoveSpeed to make the ball move 3 times faster as per user feedback
const baseMoveSpeed = 5.01; // Adjusted value from 1.67 to 5.01 to match the new speed requirement

// Scale factor for the game to implement the "zoom in" feature
const gameScaleFactor = 3; // This scales the game elements to appear 3 times larger

// Gain from eating a square, reduced 3 times as per user feedback
const squareGain = 1 / 3; // Each square eaten increases the ball's radius by this fraction

// Exporting game settings for use across the project
module.exports = { gameSpace, squareSize, initialBallSize, ballMoveSpeed, baseMoveSpeed, gameScaleFactor, squareGain };

// These settings centralize game configuration, making it easier to adjust parameters like game space dimensions, square size, initial ball size, ball movement speed, and base movement speed. This approach avoids the need to dig into the main logic files for adjustments and provides a clear overview of game configurations.