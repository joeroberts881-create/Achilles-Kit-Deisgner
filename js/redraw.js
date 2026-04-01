/* redraw.js — re-renders colour overlay and logos SVG */

function luma(h) {
  var r = parseInt(h.slice(1,3), 16);
  var g = parseInt(h.slice(3,5), 16);
  var b = parseInt(h.slice(5,7), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function redraw() {
  var T = window.SHIRTS[S.shirt + '_' + S.view];
  if (!T) return;

  var colSvg = document.getElementById('colourSvg');
  var logSvg = document.getElementById('logosSvg');
  var z = T.zones, W = T.w, H = T.h;
  var pA = S.colA, pB = S.colB, pC = S.colC, pD = S.colD, pE = S.colE;
  var tCol   = luma(pA) > 145 ? 'rgba(0,0,0,0.78)'   : 'rgba(255,255,255,0.9)';
  var tFaint = luma(pA) > 145 ? 'rgba(0,0,0,0.12)'   : 'rgba(255,255,255,0.18)';

  // Get active pattern
  var pat = '';
  var activePattern = window.PATTERNS && window.PATTERNS[S.style];
  if (activePattern) {
    // Use pattern's own rules, or fall back to zone patternZones
    var rules = activePattern.rules || z.patternZones || ['body'];
    var patSvg = activePattern.render(pE, W, H);
    rules.forEach(function(zk) {
      if (z[zk]) pat += '<g clip-path="url(#z_' + zk + ')">' + patSvg + '</g>';
    });
  }

  // Build clipPath defs
  var defs = '';
  ['body','sleeveL','sleeveR','cuffL','cuffR','collar'].forEach(function(k) {
    if (z[k]) defs += '<clipPath id="z_' + k + '"><path d="' + z[k] + '"/></clipPath>';
  });

  // Colour rects per zone
  var zr = '';
  if (z.body)    zr += '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="' + pA + '" clip-path="url(#z_body)"/>';
  if (z.sleeveL) zr += '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="' + pB + '" clip-path="url(#z_sleeveL)"/>';
  if (z.sleeveR) zr += '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="' + pB + '" clip-path="url(#z_sleeveR)"/>';
  if (z.cuffL)   zr += '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="' + pC + '" clip-path="url(#z_cuffL)"/>';
  if (z.cuffR)   zr += '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="' + pC + '" clip-path="url(#z_cuffR)"/>';
  if (z.collar)  zr += '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="' + pD + '" clip-path="url(#z_collar)"/>';

  colSvg.innerHTML = '<defs>' + defs + '</defs>' + zr + pat;

  // Logos layer
  if (S.view === 'front') {
    var sponTxt = (document.getElementById('sponsorTxt').value || '').toUpperCase();
    var lc = '';
    if (z.badgeL) {
      var r = z.badgeL.r;
      lc += '<g transform="translate(' + z.badgeL.cx + ',' + z.badgeL.cy + ')" opacity="0.65">'
          + '<polygon points="0,-'+(r*.7)+' '+(r*.6)+',-'+(r*.35)+' '+(r*.6)+','+(r*.35)+' 0,'+(r*.7)+' -'+(r*.6)+','+(r*.35)+' -'+(r*.6)+',-'+(r*.35)+'" fill="none" stroke="'+tCol+'" stroke-width="4"/>'
          + '<text x="0" y="'+(r*.14)+'" text-anchor="middle" font-family="Barlow Condensed,sans-serif" font-size="'+(r*.36)+'" font-weight="900" fill="'+tCol+'">AS</text>'
          + '</g>';
    }
    if (z.badgeR) {
      var r2 = z.badgeR.r;
      if (S.badgeUrl) {
        lc += '<defs><clipPath id="bcR"><circle cx="'+z.badgeR.cx+'" cy="'+z.badgeR.cy+'" r="'+r2+'"/></clipPath></defs>'
            + '<image href="'+S.badgeUrl+'" x="'+(z.badgeR.cx-r2)+'" y="'+(z.badgeR.cy-r2)+'" width="'+(r2*2)+'" height="'+(r2*2)+'" clip-path="url(#bcR)"/>';
      } else {
        lc += '<g transform="translate('+z.badgeR.cx+','+z.badgeR.cy+')" opacity="0.55">'
            + '<polygon points="0,-'+(r2*.7)+' '+(r2*.6)+',-'+(r2*.35)+' '+(r2*.6)+','+(r2*.35)+' 0,'+(r2*.7)+' -'+(r2*.6)+','+(r2*.35)+' -'+(r2*.6)+',-'+(r2*.35)+'" fill="none" stroke="'+tCol+'" stroke-width="4"/>'
            + '<text x="0" y="'+(r2*.14)+'" text-anchor="middle" font-family="Barlow Condensed,sans-serif" font-size="'+(r2*.36)+'" font-weight="900" fill="'+tCol+'">CREST</text>'
            + '</g>';
      }
    }
    if (z.sponsor) {
      var sZ = z.sponsor, cx2 = Math.round(sZ.x + sZ.w/2), cy2 = Math.round(sZ.y + sZ.h * .65);
      if (S.sponsorUrl) {
        lc += '<image href="'+S.sponsorUrl+'" x="'+sZ.x+'" y="'+sZ.y+'" width="'+sZ.w+'" height="'+sZ.h+'" preserveAspectRatio="xMidYMid meet"/>';
      } else if (sponTxt) {
        var ew = sponTxt.length * 44;
        var fs = ew > sZ.w ? Math.max(36, Math.floor(80 * (sZ.w / ew))) : 80;
        lc += '<text x="'+cx2+'" y="'+cy2+'" text-anchor="middle" font-family="Barlow Condensed,sans-serif" font-size="'+fs+'" font-weight="900" letter-spacing="4" fill="'+tCol+'">'+sponTxt+'</text>';
      } else {
        lc += '<text x="'+cx2+'" y="'+cy2+'" text-anchor="middle" font-family="Barlow Condensed,sans-serif" font-size="56" font-weight="900" fill="'+tFaint+'">CLUB SPONSOR</text>';
      }
    }
    logSvg.innerHTML = lc;
  } else {
    var pName = (document.getElementById('pName').value || '').toUpperCase();
    var pNum  = document.getElementById('pNum').value || '';
    var font  = document.getElementById('numFont').value;
    var nfs   = pName.length > 10 ? Math.max(60, Math.floor(z.numberSize * 0.2 * (10 / pName.length))) : Math.floor(z.numberSize * 0.2);
    var cx3   = Math.round(W / 2);
    logSvg.innerHTML =
      (pName
        ? '<text x="'+cx3+'" y="'+z.nameY+'" text-anchor="middle" font-family="'+font+'" font-size="'+nfs+'" font-weight="900" letter-spacing="12" fill="'+tCol+'">'+pName+'</text>'
        : '<text x="'+cx3+'" y="'+z.nameY+'" text-anchor="middle" font-family="Barlow Condensed,sans-serif" font-size="'+Math.floor(nfs*.65)+'" font-weight="700" fill="'+tFaint+'">PLAYER NAME</text>')
      + (pNum
        ? '<text x="'+cx3+'" y="'+z.numberY+'" text-anchor="middle" font-family="'+font+'" font-size="'+z.numberSize+'" font-weight="900" fill="'+tCol+'">'+pNum+'</text>'
        : '<text x="'+cx3+'" y="'+z.numberY+'" text-anchor="middle" font-family="Barlow Condensed,sans-serif" font-size="'+Math.round(z.numberSize*.7)+'" font-weight="900" fill="'+tFaint+'">0</text>');
  }
}
