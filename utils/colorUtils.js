function hexToRgb(hex) {
  let r = 0, g = 0, b = 0;
  // 3 digits
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  }
  // 6 digits
  else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return [r, g, b];
}

function calculateLuminance([r, g, b]) {
  const a = [r, g, b].map(function(v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function isColorDark(colorHex) {
  const rgb = hexToRgb(colorHex);
  const luminance = calculateLuminance(rgb);
  return luminance < 0.5;
}

function getRandomColor(avoidDark = false) {
  const excludedColors = ['#f0f0f0']; // Add other colors to avoid here

  let color = '';
  do {
    const letters = '0123456789ABCDEF';
    color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  } while (excludedColors.includes(color) || (avoidDark && isColorDark(color))); // Adjust condition to optionally avoid dark colors

  console.log(`Generated color not in excluded list: ${color}`);
  return color;
}

module.exports = { getRandomColor, isColorDark };