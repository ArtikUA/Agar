// gameClient.js

import { drawGame } from './gameElements/drawGame.js';
import { drawBalls } from './gameElements/drawBalls.js';
import { drawBall } from './gameElements/drawBall.js';
import { drawSquares } from './gameElements/drawSquares.js';
import { updateGameStateFromMessage } from './gameState/updateGameState.js';

export const balls = {}; // Store ball properties keyed by clientId
export let squares = []; // Store square properties