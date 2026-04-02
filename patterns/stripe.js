/* Pattern: Stripe (SVG-generated)
 * scope: 'body' | 'arms' | 'both'  — controls which zones receive this pattern.
 * defaultOpacity: natural opacity (0–1) shown when pattern is first selected.
 * render(colour, W, H, opts): opts.scale adjusts stripe width/spacing.
 */
window.PATTERNS = window.PATTERNS || {};
window.PATTERNS.stripe = {
  id:             'stripe',
  label:          'Stripe',
  scope:          'both',
  defaultOpacity: 0.25,
  render: function(colour, W, H, opts) {
    var sc      = (opts && opts.scale) || 1;
    var spacing = 56 * sc;
    var width   = 28 * sc;
    var margin  = 800;
    var s = '';
    for (var x = -margin; x < W + margin; x += spacing)
      s += '<rect x="' + x + '" y="' + (-margin) + '" width="' + width + '" height="' + (H + margin * 2) + '" fill="' + colour + '"/>';
    return s;
  }
};
