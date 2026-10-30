// Retrat d'estrelles: la foto de la portada es forma a partir d'una nebulosa de punts
// i, en passar-hi el ratolí o el dit, els punts s'aparten i tornen. Sense JS o amb
// «moviment reduït» es veu la foto normal.
(function () {
  var slot = document.querySelector('.photo-slot');
  var img = slot && slot.querySelector('img');
  if (!img || !window.requestAnimationFrame) return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var cv = document.createElement('canvas');
  cv.className = 'retrat-cel';
  cv.setAttribute('aria-hidden', 'true');
  var ctx = cv.getContext('2d');
  if (!ctx) return;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var punts = [], S = 0, M = 0, inici = 0, estat = 'forma', ratoli = null, quiet = 0;

  function prepara() {
    S = slot.offsetWidth;
    M = Math.round(S * 0.35);
    var W = S + 2 * M;
    cv.width = W * dpr; cv.height = W * dpr;
    cv.style.width = W + 'px'; cv.style.height = W + 'px';
    cv.style.left = -M + 'px'; cv.style.top = -M + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var mostra = document.createElement('canvas');
    mostra.width = S; mostra.height = S;
    var mc = mostra.getContext('2d');
    mc.drawImage(img, 0, 0, S, S);
    var dades;
    try { dades = mc.getImageData(0, 0, S, S).data; } catch (e) { return false; }

    var pas = S / 68, r = S / 2;
    punts = [];
    for (var y = pas / 2; y < S; y += pas) {
      for (var x = pas / 2; x < S; x += pas) {
        if ((x - r) * (x - r) + (y - r) * (y - r) > r * r) continue;
        var i = ((y | 0) * S + (x | 0)) * 4;
        var a = Math.random() * Math.PI * 2, d = r * (0.55 + Math.random() * 0.6);
        punts.push({
          tx: x + M, ty: y + M,
          sx: r + M + Math.cos(a) * d, sy: r + M + Math.sin(a) * d,
          x: 0, y: 0, vx: 0, vy: 0,
          c: 'rgb(' + dades[i] + ',' + dades[i + 1] + ',' + dades[i + 2] + ')',
          r: pas * (0.42 + Math.random() * 0.18),
          ret: Math.random() * 1.4
        });
      }
    }
    return true;
  }

  function suau(t) { return 1 - Math.pow(1 - t, 3); }

  function dibuixa(ara) {
    var W = S + 2 * M;
    ctx.clearRect(0, 0, W, W);
    var temps = (ara - inici) / 1000, mogut = 0;
    for (var k = 0; k < punts.length; k++) {
      var p = punts[k];
      if (estat === 'forma') {
        var t = Math.max(0, Math.min(1, (temps - p.ret) / 2.6));
        var e = suau(t);
        p.x = p.sx + (p.tx - p.sx) * e;
        p.y = p.sy + (p.ty - p.sy) * e;
        ctx.globalAlpha = 0.25 + 0.75 * e;
      } else {
        if (ratoli) {
          var dx = p.x - ratoli.x, dy = p.y - ratoli.y, d2 = dx * dx + dy * dy, R = S * 0.22;
          if (d2 < R * R) {
            var d = Math.sqrt(d2) || 1, f = (1 - d / R) * 3.2;
            p.vx += dx / d * f; p.vy += dy / d * f;
          }
        }
        p.vx += (p.tx - p.x) * 0.06; p.vy += (p.ty - p.y) * 0.06;
        p.vx *= 0.82; p.vy *= 0.82;
        p.x += p.vx; p.y += p.vy;
        mogut += Math.abs(p.vx) + Math.abs(p.vy);
        ctx.globalAlpha = 1;
      }
      ctx.fillStyle = p.c;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 6.2832);
      ctx.fill();
    }

    if (estat === 'forma' && temps > 4.2) {
      estat = 'repos';
      slot.classList.add('retrat-fet');
      setTimeout(cometes, 700);
      return;
    }
    if (estat === 'joc') {
      if (!ratoli && mogut < punts.length * 0.02) {
        if (++quiet > 20) { estat = 'repos'; slot.classList.add('retrat-fet'); return; }
      } else quiet = 0;
    }
    requestAnimationFrame(dibuixa);
  }

  // Un cop feta la cara, tres cometes surten cap a tres estrelles al costat de la foto,
  // una per àmbit, que s'encenen amb el seu nom.
  var AMBITS = ['Formació', "Supervisió d'equips", 'Disseny de projectes'];
  function cometes() {
    var W = S + 2 * M, r = S / 2, c = r + M, dist = r + Math.max(26, S * 0.15);
    var tela = document.createElement('canvas');
    tela.className = 'cometes-cel';
    tela.setAttribute('aria-hidden', 'true');
    tela.width = W * dpr; tela.height = W * dpr;
    tela.style.width = W + 'px'; tela.style.height = W + 'px';
    tela.style.left = -M + 'px'; tela.style.top = -M + 'px';
    slot.appendChild(tela);
    var c2 = tela.getContext('2d');
    c2.setTransform(dpr, 0, 0, dpr, 0, 0);
    var vols = AMBITS.map(function (nom, i) {
      var ang = (-38 + i * 38) * Math.PI / 180;
      var tx = c + Math.cos(ang) * dist, ty = c + Math.sin(ang) * dist;
      var a0 = ang - 0.9;
      var sx = c + Math.cos(a0) * r * 0.55, sy = c + Math.sin(a0) * r * 0.55;
      var est = document.createElement('span');
      est.className = 'ambit-estrella';
      est.style.left = (tx - M) + 'px'; est.style.top = (ty - M) + 'px';
      est.innerHTML = '<i></i><b>' + nom + '</b>';
      est.setAttribute('aria-hidden', 'true');
      slot.appendChild(est);
      return { sx: sx, sy: sy, tx: tx, ty: ty,
        qx: c + Math.cos(ang - 0.35) * dist * 1.15, qy: c + Math.sin(ang - 0.35) * dist * 1.15,
        ret: i * 0.45, est: est, arribat: false, cua: [] };
    });
    var t0 = performance.now(), DUR = 1.5;
    function vol(ara) {
      var temps = (ara - t0) / 1000, viu = false;
      c2.clearRect(0, 0, W, W);
      vols.forEach(function (v) {
        var t = Math.max(0, Math.min(1, (temps - v.ret) / DUR));
        if (t > 0 && t < 1) {
          var e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2, u = 1 - e;
          v.cua.push([u * u * v.sx + 2 * u * e * v.qx + e * e * v.tx, u * u * v.sy + 2 * u * e * v.qy + e * e * v.ty]);
          if (v.cua.length > 18) v.cua.shift();
        } else if (t >= 1 && v.cua.length) v.cua.shift();
        for (var k = 0; k < v.cua.length; k++) {
          var a = (k + 1) / v.cua.length;
          c2.globalAlpha = a * 0.9;
          c2.fillStyle = k === v.cua.length - 1 && t < 1 ? '#FFFFFF' : '#A4471F';
          c2.beginPath();
          c2.arc(v.cua[k][0], v.cua[k][1], 0.5 + a * 2.2, 0, 6.2832);
          c2.fill();
        }
        if (t >= 1 && !v.arribat) { v.arribat = true; v.est.classList.add('encesa'); }
        if (t < 1 || v.cua.length) viu = true;
      });
      c2.globalAlpha = 1;
      if (viu) requestAnimationFrame(vol);
      else slot.removeChild(tela);
    }
    requestAnimationFrame(vol);
  }

  function posicio(e) {
    var b = cv.getBoundingClientRect();
    return { x: e.clientX - b.left, y: e.clientY - b.top };
  }

  function juga(e) {
    if (estat === 'forma') return;
    ratoli = posicio(e);
    if (estat === 'repos') {
      estat = 'joc'; quiet = 0;
      slot.classList.remove('retrat-fet');
      requestAnimationFrame(dibuixa);
    }
  }

  function comenca() {
    if (!prepara()) return;
    slot.appendChild(cv);
    slot.classList.add('retrat-actiu');
    var hero = slot.closest ? slot.closest('.hero') : null;
    if (hero) hero.classList.add('amb-retrat');
    slot.addEventListener('pointermove', juga);
    slot.addEventListener('pointerdown', juga);
    slot.addEventListener('pointerleave', function () { ratoli = null; });
    slot.addEventListener('pointerup', function (e) { if (e.pointerType !== 'mouse') ratoli = null; });
    inici = performance.now();
    requestAnimationFrame(dibuixa);
  }

  if (img.complete && img.naturalWidth) comenca();
  else img.addEventListener('load', comenca);
})();
