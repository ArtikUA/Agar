/**
 * Handles updating the game's state based on WebSocket messages received from the server.
 * This function updates the positions and properties of balls and squares in the game,
 * as well as handling the removal of balls when a user disconnects.
 *
 * @param {Object} data - The message object received from the WebSocket. Expected to have a type property
 * that dictates the action to be taken (e.g., 'update' or 'remove'). For 'update' messages, it should
 * contain 'positions' and 'squares' properties detailing the new state of the game. For 'remove' messages,
 * it should contain a 'clientId' property indicating which ball to remove.
 * @param {Object} balls - The balls object to be updated.
 * @param {Array} squares - The squares array to be updated.
 */
export function updateGameStateFromMessage(data, balls, squares) {
    if (data.type === 'update') {
        // Update every ball's position, radius, and name based on the server's broadcast
        Object.keys(data.positions).forEach(clientId => {
            if (!balls[clientId]) {
                balls[clientId] = {color: '#FFFFFF', radius: 25, name: ''}; // Default color, radius, and name in case data is missing
            }
            balls[clientId].x = data.positions[clientId].position.x;
            balls[clientId].y = data.positions[clientId].position.y;
            balls[clientId].radius = data.positions[clientId].radius;
            // Update color and name for each ball
            if (data.positions[clientId].color) {
                balls[clientId].color = data.positions[clientId].color;
            }
            if (data.positions[clientId].name) {
                balls[clientId].name = data.positions[clientId].name;
            }
        });
        // Update squares based on the server's broadcast
        squares.splice(0, squares.length, ...data.squares);
    } else if (data.type === 'remove') {
        // Remove the ball of the disconnected user
        delete balls[data.clientId];
    }
    console.log(`Game state updated. Type: ${data.type}`);
}