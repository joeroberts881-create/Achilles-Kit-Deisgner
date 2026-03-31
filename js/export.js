/* export.js — PNG / JPG / SVG export */

function exportKit() {
  var fmt = S.fmt;
  var T   = window.SHIRTS[S.shirt + '_' + S.view];
  var fn  = 'achilles-kit-' + S.view + '.' + (fmt === 'jpg' ? 'jpg' : fmt);

  if (fmt === 'svg') {
    dlBlob(new Blob([document.getElementById('colourSvg').outerHTML], {type: 'image/svg+xml'}), fn);
    return;
  }

  var img = document.getElementById('shirtImg');
  var cv  = document.createElement('canvas');
  cv.width = T.w; cv.height = T.h;
  var ctx = cv.getContext('2d');
  if (fmt === 'jpg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, T.w, T.h); }
  ctx.drawImage(img, 0, 0, T.w, T.h);
  ctx.globalCompositeOperation = 'multiply';

  var cStr = new XMLSerializer().serializeToString(document.getElementById('colourSvg'));
  var cUrl = URL.createObjectURL(new Blob([cStr], {type: 'image/svg+xml;charset=utf-8'}));
  var cImg = new Image();
  cImg.onload = function() {
    ctx.drawImage(cImg, 0, 0, T.w, T.h);
    URL.revokeObjectURL(cUrl);
    ctx.globalCompositeOperation = 'source-over';
    var lStr = new XMLSerializer().serializeToString(document.getElementById('logosSvg'));
    var lUrl = URL.createObjectURL(new Blob([lStr], {type: 'image/svg+xml;charset=utf-8'}));
    var lImg = new Image();
    lImg.onload = function() {
      ctx.drawImage(lImg, 0, 0, T.w, T.h);
      URL.revokeObjectURL(lUrl);
      cv.toBlob(function(b) { dlBlob(b, fn); }, fmt === 'jpg' ? 'image/jpeg' : 'image/png', 0.95);
    };
    lImg.src = lUrl;
  };
  cImg.src = cUrl;
}

function dlBlob(blob, name) {
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  setTimeout(function() { URL.revokeObjectURL(a.href); }, 2000);
}
