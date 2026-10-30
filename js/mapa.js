// Mapa de trajectòria: una constel·lació on els serveis són les estrelles grans
// i la trajectòria i la formació que els sostenen hi queden connectades.
// Sense dependències. Sense JavaScript la secció no es mostra.
(function () {
  var cel = document.getElementById('mapa-cel');
  var info = document.getElementById('mapa-info');
  if (!cel || !info || !document.createElementNS) return;

  var SERVEIS = [
    { id: 'F', nom: 'Formació', linies: ['Formació'] },
    { id: 'S', nom: "Supervisió d'equips", linies: ['Supervisió', "d'equips"] },
    { id: 'P', nom: 'Disseny de projectes', linies: ['Disseny de', 'projectes'] }
  ];

  // s: serveis que sosté cada punt
  var TRAJECTORIA = [
    { id: 'e1', nom: 'Formador per a 6 institucions', det: "COPC, Col·legi d'Infermeria, IAS, UdG, Ajuntament d'Arbúcies i Plataforma Educativa · 1998–2007", s: ['F'] },
    { id: 'e2', nom: 'Centre Ocupacional Tramuntana', det: 'Director tècnic i responsable de formació · 23 professionals i 117 persones ateses · 2008–2026', s: ['F', 'S', 'P'] },
    { id: 'e3', nom: "Servei d'Ajustament Personal i Social", det: 'Director tècnic i psicòleg · 63 persones treballadores amb discapacitat · 2008–2015', s: ['F', 'S'] },
    { id: 'e4', nom: 'Serveis per a infants de 0 a 3 anys', det: 'Coordinador · Ajuntament de Sant Feliu de Guíxols · 2004–2007', s: ['S'] },
    { id: 'e5', nom: 'Llar-Residència Llar 2000', det: 'Director tècnic del recurs residencial · 2003–2004', s: ['S'] },
    { id: 'e6', nom: 'Educador social', det: 'Llar-2000, CRAE Sobrequés i EBASP de Tossa de Mar · 2000–2008', s: ['F', 'S'] },
    { id: 'e7', nom: 'Projecte IEPA', det: 'Programa per a adolescents en risc social · Serveis Socials de Palafrugell · 2001', s: ['P'] },
    { id: 'e8', nom: 'Estudis per al territori', det: "Envelliment i discapacitat intel·lectual (2018) · Senyalització universal d'equipaments municipals (2019)", s: ['P'] }
  ];

  var FORMACIO = [
    { id: 'f1', nom: 'Habilitació docent', det: 'Acreditació de la formació pedagògica i didàctica per a la docència', s: ['F'] },
    { id: 'f2', nom: "Forma't per formar", det: '5 cursos de la Generalitat sobre formació professional · 2026', s: ['F'] },
    { id: 'f3', nom: 'Màster en Mediació Terapèutica Corporal', det: 'Crei-Sants, Universitat de Barcelona · psicomotricitat i expressió corporal', s: ['F'] },
    { id: 'f4', nom: 'Llicenciatura en Psicologia', det: 'UAB · 1992 · psicòleg general sanitari habilitat', s: ['F', 'S', 'P'] },
    { id: 'f5', nom: 'Educador social habilitat', det: 'Habilitat el 2002', s: ['S'] },
    { id: 'f6', nom: "Lideratge i gestió d'equips", det: '10 cursos: PIMEC, Diputació de Girona, UdG, coaching, negociació i resolució de conflictes', s: ['S'] },
    { id: 'f7', nom: 'Postgrau en Patologia Dual', det: 'Universitat de Girona · 190 h · 2010–2011', s: ['S'] },
    { id: 'f8', nom: 'Postgrau en Psicoteràpia', det: 'Institut Erich Fromm · 1993', s: ['S'] },
    { id: 'f9', nom: 'Postgrau en Integració Laboral', det: 'Universitat de Girona · 200 h · 2012', s: ['F', 'P'] },
    { id: 'f11', nom: 'Formació contínua especialitzada', det: '13 cursos: discapacitat i salut mental, inserció laboral, comunicació amb la ciutadania, prevenció i primers auxilis psicològics · 2008–2021', s: ['F', 'S', 'P'] },
    { id: 'f10', nom: 'Formació en IA', det: '7 cursos des del 2025: Diputació de Girona, COPC, Plena Inclusión, BIG School i PIMEC', s: ['F', 'S', 'P'], ia: true }
  ];

  var tots = {};
  SERVEIS.forEach(function (n) { n.tipus = 'srv'; tots[n.id] = n; });
  TRAJECTORIA.forEach(function (n) { n.tipus = 'exp'; tots[n.id] = n; });
  FORMACIO.forEach(function (n) { n.tipus = 'form'; tots[n.id] = n; });

  var NS = 'http://www.w3.org/2000/svg';
  var svg, seleccionat = null, ampleAnterior = 0;
  var filtres = Array.prototype.slice.call(document.querySelectorAll('.mapa-filtre'));

  function esc(t) {
    return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Generador pseudoaleatori estable perquè el cel no canviï a cada visita
  function llavor(n) {
    return function () { n = (n * 9301 + 49297) % 233280; return n / 233280; };
  }

  function dibuixa() {
    var w = cel.clientWidth;
    if (!w) return;
    ampleAnterior = w;
    var ambEtiquetes = w >= 720;
    var h = ambEtiquetes ? 600 : 520;
    var dalt = 64, baix = 28, alt = h - dalt - baix;
    var xExp = w * (ambEtiquetes ? 0.33 : 0.14);
    var xSrv = w * 0.5;
    var xForm = w * (ambEtiquetes ? 0.67 : 0.86);

    function col(llista, x) {
      llista.forEach(function (n, i) { n.x = x; n.y = dalt + (i + 0.5) * alt / llista.length; });
    }
    col(TRAJECTORIA, xExp);
    col(FORMACIO, xForm);
    SERVEIS.forEach(function (n, i) { n.x = xSrv; n.y = dalt + alt * [0.17, 0.5, 0.83][i]; });

    var o = [];
    o.push('<defs><radialGradient id="mapa-halo"><stop offset="0" stop-color="#F3C9B4" stop-opacity=".55"/><stop offset="1" stop-color="#F3C9B4" stop-opacity="0"/></radialGradient></defs>');

    // Pols d'estrelles de fons
    var r = llavor(7), i;
    o.push('<g class="pols" aria-hidden="true">');
    for (i = 0; i < Math.round(w / 9); i++) {
      o.push('<circle cx="' + (r() * w).toFixed(1) + '" cy="' + (r() * h).toFixed(1) + '" r="' + (0.5 + r() * 0.9).toFixed(2) + '" style="animation-delay:' + (r() * 5).toFixed(2) + 's"/>');
    }
    o.push('</g>');

    // Capçaleres de columna
    o.push('<text class="mapa-col" x="' + xExp + '" y="30" text-anchor="middle">TRAJECTÒRIA</text>');
    o.push('<text class="mapa-col" x="' + xForm + '" y="30" text-anchor="middle">FORMACIÓ</text>');

    // Enllaços: de cada punt cap al servei que sosté
    o.push('<g class="enllacos" aria-hidden="true">');
    TRAJECTORIA.concat(FORMACIO).forEach(function (n) {
      n.s.forEach(function (sid) {
        var s = tots[sid], mx = (n.x + s.x) / 2;
        o.push('<path class="enllac' + (n.ia ? ' enllac-ia' : '') + '" data-a="' + n.id + '" data-b="' + sid + '" d="M' + n.x + ' ' + n.y + 'C' + mx + ' ' + n.y + ' ' + mx + ' ' + s.y + ' ' + s.x + ' ' + s.y + '"/>');
      });
    });
    o.push('</g>');

    // Serveis: estrelles grans
    SERVEIS.forEach(function (n) {
      o.push('<g class="node node-srv" data-id="' + n.id + '" tabindex="0" role="button" aria-label="' + esc(n.nom) + ': mostra d\'on surt">');
      o.push('<circle class="halo" cx="' + n.x + '" cy="' + n.y + '" r="46" fill="url(#mapa-halo)"/>');
      o.push('<circle class="punt" cx="' + n.x + '" cy="' + n.y + '" r="15"/>');
      n.linies.forEach(function (l, k) {
        o.push('<text x="' + n.x + '" y="' + (n.y + 36 + k * 18) + '" text-anchor="middle">' + esc(l) + '</text>');
      });
      o.push('</g>');
    });

    // Trajectòria i formació: estrelles petites
    var rr = llavor(3);
    TRAJECTORIA.concat(FORMACIO).forEach(function (n) {
      var esq = n.tipus === 'exp';
      o.push('<g class="node node-' + n.tipus + (n.ia ? ' node-ia' : '') + '" data-id="' + n.id + '" tabindex="0" role="button" aria-label="' + esc(n.nom) + '">');
      o.push('<circle class="toc" cx="' + n.x + '" cy="' + n.y + '" r="18"/>');
      o.push('<circle class="punt" cx="' + n.x + '" cy="' + n.y + '" r="' + (n.ia ? 7 : esq ? 6 : 5) + '" style="animation-delay:' + (rr() * 4).toFixed(2) + 's"/>');
      if (ambEtiquetes) {
        o.push('<text x="' + (n.x + (esq ? -14 : 14)) + '" y="' + (n.y + 5) + '" text-anchor="' + (esq ? 'end' : 'start') + '">' + esc(n.nom) + '</text>');
      }
      o.push('</g>');
    });

    cel.innerHTML = '<svg xmlns="' + NS + '" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" role="group" aria-label="Constel·lació de serveis, trajectòria i formació">' + o.join('') + '</svg>';
    svg = cel.firstChild;
    aplica(seleccionat);
  }

  function relacionats(id) {
    var set = {};
    if (!id) return set;
    set[id] = true;
    var n = tots[id];
    if (n.tipus === 'srv') {
      TRAJECTORIA.concat(FORMACIO).forEach(function (m) { if (m.s.indexOf(id) > -1) set[m.id] = true; });
    } else {
      n.s.forEach(function (s) { set[s] = true; });
    }
    return set;
  }

  function aplica(id) {
    if (!svg) return;
    var set = relacionats(id);
    svg.classList.toggle('te-seleccio', !!id);
    Array.prototype.forEach.call(svg.querySelectorAll('.node'), function (g) {
      var gid = g.getAttribute('data-id');
      g.classList.toggle('actiu', !!set[gid]);
      g.classList.toggle('triat', gid === id);
    });
    Array.prototype.forEach.call(svg.querySelectorAll('.enllac'), function (p) {
      p.classList.toggle('actiu', !!id && (p.getAttribute('data-a') === id || p.getAttribute('data-b') === id));
    });
  }

  function llista(arr) {
    return '<ul>' + arr.map(function (m) {
      return '<li><strong>' + esc(m.nom) + '</strong><span>' + esc(m.det) + '</span></li>';
    }).join('') + '</ul>';
  }

  function explica(id) {
    filtres.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-id') === id ? 'true' : 'false'); });
    if (!id) {
      info.innerHTML = '<p class="mapa-buit">Tria un àmbit o toca qualsevol estrella per veure com es connecta.</p>';
      return;
    }
    var n = tots[id];
    if (n.tipus === 'srv') {
      var del = function (m) { return m.s.indexOf(id) > -1; };
      info.innerHTML = '<p class="mapa-tipus">Àmbit</p><h3>' + esc(n.nom) + '</h3>' +
        '<div class="mapa-cols"><div><h4>Surt de la trajectòria</h4>' + llista(TRAJECTORIA.filter(del)) + '</div>' +
        '<div><h4>I de la formació</h4>' + llista(FORMACIO.filter(del)) + '</div></div>';
    } else {
      info.innerHTML = '<p class="mapa-tipus">' + (n.tipus === 'exp' ? 'Trajectòria' : 'Formació') + '</p><h3>' + esc(n.nom) + '</h3>' +
        '<p>' + esc(n.det) + '</p><p class="mapa-soste">Sosté: ' + n.s.map(function (s) {
          return '<button type="button" class="mapa-salt" data-id="' + s + '">' + esc(tots[s].nom) + '</button>';
        }).join(' ') + '</p>';
    }
  }

  function tria(id) {
    seleccionat = id;
    aplica(id);
    explica(id);
  }

  cel.addEventListener('click', function (e) {
    var g = e.target.closest ? e.target.closest('.node') : null;
    tria(g ? g.getAttribute('data-id') : null);
  });
  cel.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('node')) {
      e.preventDefault();
      tria(e.target.getAttribute('data-id'));
    }
  });
  cel.addEventListener('focusin', function (e) {
    if (e.target.classList && e.target.classList.contains('node')) tria(e.target.getAttribute('data-id'));
  });
  // En passar el ratolí es previsualitza; en sortir torna a la tria fixada
  cel.addEventListener('mouseover', function (e) {
    var g = e.target.closest ? e.target.closest('.node') : null;
    if (g) aplica(g.getAttribute('data-id'));
  });
  cel.addEventListener('mouseleave', function () { aplica(seleccionat); });

  filtres.forEach(function (b) {
    b.addEventListener('click', function () {
      var id = b.getAttribute('data-id');
      tria(seleccionat === id ? null : id);
    });
  });
  info.addEventListener('click', function (e) {
    if (e.target.classList.contains('mapa-salt')) tria(e.target.getAttribute('data-id'));
  });

  var espera;
  window.addEventListener('resize', function () {
    clearTimeout(espera);
    espera = setTimeout(function () { if (cel.clientWidth !== ampleAnterior) dibuixa(); }, 150);
  });

  dibuixa();
  explica(null);
})();
