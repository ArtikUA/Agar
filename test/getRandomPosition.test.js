const { getRandomPosition } = require('../server/gameMechanics/getRandomPosition');
const { gameSpace } = require('../config/gameSettings');

describe('getRandomPosition Functionality', () => {
  beforeAll(() => {
    // Setting global gameSpace to custom dimensions for testing
    global.gameSpace = { width: 1000, height: 800 };
  });

  afterAll(() => {
    // Resetting global gameSpace to ensure no side effects
    delete global.gameSpace;
  });

  test('should return a position within custom global gameSpace dimensions', () => {
    const position = getRandomPosition();
    expect(position.x).toBeGreaterThanOrEqual(0);
    expect(position.x).toBeLessThanOrEqual(global.gameSpace.width);
    expect(position.y).toBeGreaterThanOrEqual(0);
    expect(position.y).toBeLessThanOrEqual(global.gameSpace.height);
    console.log(`Position within custom global gameSpace dimensions: x=${position.x}, y=${position.y}`);
  });

  test('should return a position within default gameSpace dimensions from gameSettings when global.gameSpace is not defined', () => {
    // Temporarily removing global.gameSpace for this test
    delete global.gameSpace;
    const position = getRandomPosition();
    expect(position.x).toBeGreaterThanOrEqual(0);
    expect(position.x).toBeLessThanOrEqual(gameSpace.width);
    expect(position.y).toBeGreaterThanOrEqual(0);
    expect(position.y).toBeLessThanOrEqual(gameSpace.height);
    console.log(`Position within default gameSpace dimensions: x=${position.x}, y=${position.y}`);
  });
});