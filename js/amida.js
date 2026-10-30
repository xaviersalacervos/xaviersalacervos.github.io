// Perfil a mida (dins de Què aporto): qui contracta obre el perfil d'un lloc i la web li mostra
// l'encaix, l'experiència que l'avala i una fitxa d'una pàgina per descarregar.
var PERFILS_A_MIDA = {
  formacio: {
    boto: 'Formació',
    lloc: "Formador/a o tècnic/a de formació",
    mapa: 'F',
    fitxa: 'cv/fitxa-formacio.pdf',
    resum: "Docència per a persones que es formen per accedir a una professió i per a professionals i equips en actiu, amb enfocament pràctic i habilitació docent acreditada.",
    encaix: [
      "Acreditació de la formació pedagògica i didàctica per a la docència.",
      "Formador per a col·legis professionals, la Universitat de Girona i entitats: 8 temàtiques a 6 institucions.",
      "Disseny, planificació i avaluació del pla de formació i formació de les noves incorporacions al Centre Ocupacional Tramuntana.",
      "Coneixement de primera mà dels serveis: sé què necessita un equip d'atenció directa perquè la formació arribi a la pràctica."
    ],
    experiencia: [
      ['Director Tècnic i responsable de formació', 'Centre Ocupacional Tramuntana', '2008–2026'],
      ['Formador', "COPC, Col·legi d'Infermeria, IAS, UdG, Ajuntament d'Arbúcies i Fundació Plataforma Educativa", '1998–2007']
    ],
    formacio: [
      "Forma't per formar (Generalitat, 2026): dissenys tecnopedagògics, avaluació per competències, orientació professional",
      'Llicenciatura en Psicologia (UAB) i Postgrau en Integració Laboral (UdG)',
      "Formació en IA: Diputació de Girona, COPC, Plena Inclusión i PIMEC (2025–2026)"
    ],
    ia: "La IA m'ajuda a preparar materials interactius, casos pràctics i qüestionaris adaptats a cada grup. Cap dada ni cita arriba a l'aula sense que l'hagi verificat.",
    passos: [
      "Escoltar l'equip i les persones per detectar què cal aprendre.",
      "Dissenyar un pla per competències, amb materials pràctics.",
      "Avaluar si el que s'aprèn arriba a la feina de cada dia."
    ]
  },
  assessorament: {
    boto: "Assessorament d'equips",
    lloc: "Assessor/a tècnic/a o supervisor/a d'equips",
    mapa: 'S',
    fitxa: 'cv/fitxa-assessorament.pdf',
    resum: "Acompanyament a coordinadors i equips interdisciplinaris per ordenar la feina, prendre decisions i millorar l'atenció a les persones.",
    encaix: [
      "He coordinat equips en quatre serveis: residencial, primera infància, centre ocupacional i servei d'ajustament personal i social.",
      "El darrer, amb 23 professionals d'atenció directa i 117 persones ateses.",
      "Psicòleg general sanitari i educador social habilitat: mirada clínica i socioeducativa alhora.",
      "Treballo des del model de qualitat de vida i la planificació centrada en la persona."
    ],
    experiencia: [
      ['Director Tècnic i responsable de formació', 'Centre Ocupacional Tramuntana', '2008–2026'],
      ['Director Tècnic i Psicòleg', "Servei d'Ajustament Personal i Social", '2008–2015'],
      ['Coordinador dels Serveis per a Infants', 'Ajuntament de Sant Feliu de Guíxols', '2004–2007']
    ],
    formacio: [
      'Postgrau en Patologia Dual (UdG)',
      'Lideratge, motivació i gestió de persones (Diputació de Girona); gestió d’equips (PIMEC); coaching',
      'Suport a la presa de decisions en discapacitat (2021)'
    ],
    ia: "Amb el consentiment de l'equip i sense dades identificatives, la IA ajuda a ordenar les notes de les sessions i a detectar temes recurrents. Les conclusions les treballem junts.",
    passos: [
      "Conèixer l'equip, els processos i el que ja funciona.",
      "Valorar conjuntament els processos d'atenció des de la qualitat de vida i la PCP.",
      "Acordar amb l'equip on la IA pot estalviar temps, i on no."
    ]
  },
  projectes: {
    boto: 'Disseny de projectes',
    lloc: 'Tècnic/a de projectes o programes',
    mapa: 'P',
    fitxa: 'cv/fitxa-projectes.pdf',
    resum: "Programes i estudis que neixen d'una necessitat detectada al territori i a les entitats, pensats amb qui els ha de fer possibles.",
    encaix: [
      'Disseny de projectes i programes ocupacionals i d’intervenció per a persones amb discapacitat intel·lectual.',
      "Estudis de necessitats: envelliment de persones amb discapacitat intel·lectual (2018) i senyalització universal d'equipaments municipals (2019).",
      'Programa IEPA per a adolescents en risc social (Serveis Socials de Palafrugell, 2001).',
      'Treball en xarxa amb serveis socials, entitats i administracions del territori.'
    ],
    experiencia: [
      ['Director Tècnic i responsable de formació', 'Centre Ocupacional Tramuntana', '2008–2026'],
      ['Disseny del programa IEPA', "Serveis Socials de l'Ajuntament de Palafrugell", '2001']
    ],
    formacio: [
      'Postgrau en Integració Laboral (UdG, 2012)',
      "Prospecció i intermediació laboral de persones amb discapacitat (Departament de Treball)",
      "IA aplicada a la gestió d'entitats (Plena Inclusión, 2026)"
    ],
    ia: "La IA revisa la coherència entre objectius, activitats i indicadors i m'ajuda a veure riscos. Tota xifra o norma la comprovo en fonts oficials.",
    passos: [
      'Partir d’una necessitat detectada i de dades verificades del territori.',
      'Dissenyar amb objectius, activitats i indicadors coherents.',
      'Teixir-hi aliances amb serveis, entitats i administracions.'
    ]
  }
};

(function () {
  if (typeof document === 'undefined') return;
  var seccio = document.getElementById('expertesa');
  var panell = document.getElementById('amida-panell');
  if (!seccio || !panell) return;
  var botons = Array.prototype.slice.call(seccio.querySelectorAll('.amida-op'));

  function esc(t) {
    return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function llista(items) {
    return items.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');
  }

  function marca(id) {
    botons.forEach(function (b) {
      var on = b.getAttribute('data-perfil') === id;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      var card = b.closest ? b.closest('.card') : null;
      if (card) card.classList.toggle('amida-sel', on);
    });
  }

  function tanca() {
    marca(null);
    panell.hidden = true;
    if (window.history && history.replaceState) history.replaceState(null, '', location.pathname + location.search);
  }

  function mostra(id, desdeHash) {
    var p = PERFILS_A_MIDA[id];
    if (!p) return;
    marca(id);
    var exp = p.experiencia.map(function (e) {
      return '<li><strong>' + esc(e[0]) + '</strong><span>' + esc(e[1]) + '</span><em>' + esc(e[2]) + '</em></li>';
    }).join('');
    panell.innerHTML =
      '<div class="amida-cap"><p class="amida-per">Per a un lloc de</p><h3>' + esc(p.lloc) + '</h3><p>' + esc(p.resum) + '</p></div>' +
      '<div class="amida-cols">' +
        '<div><h4>Per què hi encaixo</h4><ul class="amida-encaix">' + llista(p.encaix) + '</ul>' +
        '<h4>Com hi començaria</h4><ol class="amida-passos">' + llista(p.passos) + '</ol></div>' +
        '<div><h4>Experiència que ho avala</h4><ul class="amida-exp">' + exp + '</ul>' +
        '<h4>Formació clau</h4><ul class="amida-form">' + llista(p.formacio) + '</ul>' +
        '<p class="amida-ia"><strong>Amb IA:</strong> ' + esc(p.ia) + '</p></div>' +
      '</div>' +
      '<div class="amida-accions">' +
        '<a class="btn btn-primary" href="' + p.fitxa + '" download>Descarrega la fitxa <span class="visually-hidden">(PDF)</span></a>' +
        '<a class="btn btn-secondary" href="#contacte">Parlem-ne</a>' +
        '<button type="button" class="link-btn" data-amida-tanca>Tanca</button>' +
        '<button type="button" class="link-btn" data-amida-mapa="' + p.mapa + '">Mira-ho al mapa</button>' +
        '<button type="button" class="link-btn" data-amida-copia>Copia l\'enllaç d\'aquest perfil</button>' +
      '</div>';
    panell.hidden = false;
    panell.classList.remove('amida-entra');
    void panell.offsetWidth;
    panell.classList.add('amida-entra');
    if (!desdeHash && window.history && history.replaceState) history.replaceState(null, '', '#perfil-' + id);
    panell.scrollIntoView({ behavior: desdeHash ? 'auto' : 'smooth', block: 'start' });
  }

  botons.forEach(function (b) {
    b.addEventListener('click', function () {
      if (b.getAttribute('aria-pressed') === 'true') tanca();
      else mostra(b.getAttribute('data-perfil'));
    });
  });

  panell.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('button') : null;
    if (!t) return;
    if (t.hasAttribute('data-amida-tanca')) {
      var obert = seccio.querySelector('.amida-op[aria-pressed="true"]');
      tanca();
      if (obert) obert.focus();
    } else if (t.hasAttribute('data-amida-mapa')) {
      var f = document.querySelector('.mapa-filtre[data-id="' + t.getAttribute('data-amida-mapa') + '"]');
      var mapa = document.getElementById('mapa');
      if (mapa) mapa.scrollIntoView({ behavior: 'smooth' });
      if (f && f.getAttribute('aria-pressed') !== 'true') f.click();
    } else if (t.hasAttribute('data-amida-copia')) {
      var url = location.href;
      var fet = function () { t.textContent = 'Enllaç copiat'; setTimeout(function () { t.textContent = "Copia l'enllaç d'aquest perfil"; }, 2500); };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(fet, function () {});
    }
  });

  var m = /^#perfil-(\w+)$/.exec(location.hash);
  if (m && PERFILS_A_MIDA[m[1]]) {
    mostra(m[1], true);
  }
})();
