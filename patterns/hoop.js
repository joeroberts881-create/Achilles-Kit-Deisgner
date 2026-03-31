window.PATTERNS = window.PATTERNS || {};
window.PATTERNS.hoop = {
  id: 'hoop',
  label: 'Hoop',
  rules: ['body'],
  render: function(colour, W, H) {
    var s = '';
    for (var y = 0; y < H; y += 68)
      s += '<rect x="0" y="' + y + '" width="' + W + '" height="34" fill="' + colour + '" opacity="0.28"/>';
    return s;
  }
};
