window.PATTERNS = window.PATTERNS || {};
window.PATTERNS.geo = {
  id: 'geo',
  label: 'Geo',
  rules: ['body'],
  render: function(colour, W, H) {
    var s = '';
    for (var gy = -28; gy < H + 28; gy += 42)
      for (var gx = -28; gx < W + 28; gx += 42)
        s += '<path d="M' + (gx+21) + ',' + gy + ' L' + (gx+42) + ',' + (gy+21) + ' L' + (gx+21) + ',' + (gy+42) + ' L' + gx + ',' + (gy+21) + ' Z" fill="none" stroke="' + colour + '" stroke-width="2" opacity="0.22"/>';
    return s;
  }
};
