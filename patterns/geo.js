window.PATTERNS = window.PATTERNS || {};
window.PATTERNS.geo = {
  id:             'geo',
  label:          'Geo',
  scope:          'both',
  defaultOpacity: 0.22,
  render: function(colour, W, H, opts) {
    var sc     = (opts && opts.scale) || 1;
    var sp     = 42 * sc;
    var half   = sp / 2;
    var sw     = 2 * sc;
    var margin = 800;
    var s = '';
    for (var gy = -margin; gy < H + margin; gy += sp)
      for (var gx = -margin; gx < W + margin; gx += sp)
        s += '<path d="M' + (gx + half) + ',' + gy
           + ' L' + (gx + sp) + ',' + (gy + half)
           + ' L' + (gx + half) + ',' + (gy + sp)
           + ' L' + gx + ',' + (gy + half)
           + ' Z" fill="none" stroke="' + colour + '" stroke-width="' + sw + '"/>';
    return s;
  }
};
