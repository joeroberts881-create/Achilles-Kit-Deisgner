window.PATTERNS = window.PATTERNS || {};
window.PATTERNS.halftone = {
  id:             'halftone',
  label:          'Halftone',
  scope:          'both',
  defaultOpacity: 0.22,
  render: function(colour, W, H, opts) {
    var sc      = (opts && opts.scale) || 1;
    var spacing = 21 * sc;
    var radius  = 4.5 * sc;
    var offset  = spacing / 2;
    var margin  = 800;
    var s = '';
    var row = 0;
    for (var hy = -margin; hy < H + margin; hy += spacing, row++) {
      var o = (row % 2) * offset;
      for (var hx = -margin; hx < W + margin; hx += spacing)
        s += '<circle cx="' + (hx + o) + '" cy="' + hy + '" r="' + radius + '" fill="' + colour + '"/>';
    }
    return s;
  }
};
