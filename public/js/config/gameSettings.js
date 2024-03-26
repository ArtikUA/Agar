// Game space dimensions are now dynamically set by the client, so these are placeholders
// These initial values are used as fallbacks
export const gameSpace = { width: 800, height: 600 };

// Square properties
export const squareSize = 10; // Size of squares in pixels

// Initial size of the balls in pixels (diameter)
export const initialBallSize = 45; // Adjusted initial ball size as per task requirement to ensure it can eat squares

// Ball movement speed (fraction of normal speed, 1 is normal speed, less than 1 is slower)
export const ballMoveSpeed = 0.1; //Adjust the ball movement speed as needed

// Adjusted base movement speed for ball movement calculations to accommodate for the 3x zoom
// Tripling the baseMoveSpeed to make the ball move 3 times faster as per user feedback
export const baseMoveSpeed = 5.01; // Adjusted value from 1.67 to 5.01 to match the new speed requirement

// Scale factor for the game to implement the "zoom in" feature
export const gameScaleFactor = 3; // This scales the game elements to appear 3 times larger

// Gain from eating a square, reduced 3 times as per user feedback
export const squareGain = 1 / 3; // Each square eaten increases the ball's radius by this fraction

// Grid styling properties
export const gridLineColor = '#ADD8E6'; // Light blue hex code for the grid lines
export const gridLineThickness = 0.5; // Thin value for grid line thickness