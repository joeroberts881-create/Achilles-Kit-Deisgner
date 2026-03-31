/* Pattern: Stripe (SVG-generated)
 * Uses SVG shapes so it responds to the Sleeves colour picker.
 * rules: zones this pattern applies to by default.
 * To use a PNG instead, see chevron.js for the image-based approach.
 */
window.PATTERNS = window.PATTERNS || {};
window.PATTERNS.stripe = {
  id:    'stripe',
  label: 'Stripe',
  rules: ['body'],
  render: function(colour, W, H) {
    var s = '';
    for (var x = 0; x < W; x += 56)
      s += '<rect x="' + x + '" y="0" width="28" height="' + H + '" fill="' + colour + '" opacity="0.25"/>';
    return s;
  }
};
