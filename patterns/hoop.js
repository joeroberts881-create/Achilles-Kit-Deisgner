window.PATTERNS = window.PATTERNS || {};
window.PATTERNS.hoop = {
  id:             'hoop',
  label:          'Hoop',
  scope:          'both',
  defaultOpacity: 0.28,
  render: function(colour, W, H, opts) {
    var sc      = (opts && opts.scale) || 1;
    var spacing = 68 * sc;
    var height  = 34 * sc;
    var margin  = 800;
    var s = '';
    for (var y = -margin; y < H + margin; y += spacing)
      s += '<rect x="' + (-margin) + '" y="' + y + '" width="' + (W + margin * 2) + '" height="' + height + '" fill="' + colour + '"/>';
    return s;
  }
};
