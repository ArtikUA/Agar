const { getRandomColor, isColorDark } = require('../utils/colorUtils');

describe('Color Utilities', () => {
  describe('getRandomColor Function', () => {
    test('should not return excluded colors', () => {
      const excludedColors = ['#f0f0f0'];
      const tests = 1000; // Number of times to run the test to ensure reliability
      for (let i = 0; i < tests; i++) {
        const color = getRandomColor();
        expect(excludedColors).not.toContain(color);
      }
    });

    test('should not return dark colors when avoidDark is true', () => {
      const tests = 100; // Reduced number for performance, increase as needed
      for (let i = 0; i < tests; i++) {
        const color = getRandomColor(true);
        expect(isColorDark(color)).toBe(false);
      }
    });
  });

  describe('isColorDark Function', () => {
    test('should correctly identify dark colors', () => {
      expect(isColorDark('#000000')).toBe(true); // Black
      expect(isColorDark('#FFFFFF')).toBe(false); // White
      expect(isColorDark('#7743CE')).toBe(false); // A light purple
      expect(isColorDark('#084594')).toBe(true); // A dark blue
    });
  });
});