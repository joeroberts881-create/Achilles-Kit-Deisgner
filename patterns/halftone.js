window.PATTERNS = window.PATTERNS || {};
window.PATTERNS.halftone = {
  id: 'halftone',
  label: 'Halftone',
  rules: ['body'],
  render: function(colour, W, H) {
    var s = '';
    for (var hy = 11; hy < H; hy += 21)
      for (var hx = 11; hx < W; hx += 21) {
        var o = (Math.floor(hy / 21) % 2) * 10.5;
        s += '<circle cx="' + (hx + o) + '" cy="' + hy + '" r="4.5" fill="' + colour + '" opacity="0.22"/>';
      }
    return s;
  }
};
