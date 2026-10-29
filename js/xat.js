// Xat de preguntes preparades sobre el CV. Sense IA ni connexions externes:
// respon amb textos fixos quan el visitant tria una de les preguntes.
(function () {
  var CORREU = 'xaviersalacervos@yahoo.es';

  var RESPOSTES = [
    {
      q: 'Què pots aportar a una entitat social?',
      a: "Hi aporto més de 25 anys d'experiència amb persones amb discapacitat intel·lectual, salut mental, infància i adolescència, i amb els equips que les acompanyen.\n\nOfereixo tres línies de treball: formació (per a professionals en actiu i formació per a l'ocupació), supervisió d'equips i disseny de projectes a partir de les necessitats de l'entitat i del territori. Hi incorporo la intel·ligència artificial com a eina de treball, sempre amb criteri professional."
    },
    {
      q: 'Has dirigit o coordinat equips? De quina mida?',
      a: "Sí. He coordinat i dirigit equips en quatre serveis: residencial, primera infància (centre 0-3 anys), centre ocupacional i servei d'ajustament personal i social.\n\nAl darrer servei que vaig dirigir, el Centre Ocupacional Tramuntana (2008-2026), coordinava un equip de 23 professionals d'atenció directa en un servei amb 117 persones ateses. Al Servei d'Ajustament Personal i Social del Centre Especial de Treball vaig acompanyar 63 persones treballadores amb discapacitat."
    },
    {
      q: 'Quina experiència tens en formació?',
      a: "Entre 1998 i 2007 vaig ser formador per al Col·legi Oficial de Psicòlegs, el Col·legi d'Infermeria, l'Institut d'Assistència Sanitària, la Universitat de Girona, l'Ajuntament d'Arbúcies i la Fundació Plataforma Educativa: 8 temàtiques formatives a 6 institucions, com relaxació i gestió de l'estrès, psicopatologia, treball en equip, direcció d'equips i dinàmica de grups.\n\nAl Centre Ocupacional Tramuntana vaig ser responsable de dissenyar, planificar i avaluar el pla de formació i la formació de les noves incorporacions."
    },
    {
      q: "Tens habilitació docent per a formació per a l'ocupació?",
      a: "Sí. Tinc l'Acreditació de la formació pedagògica i didàctica per a la docència, equivalent, a efectes d'habilitació docent, al requisit de formació pedagògica del Màster de Formació del Professorat.\n\nL'he complementada el 2026 amb cinc cursos de formació professional a Forma't per formar, la plataforma de la Generalitat: dissenys tecnopedagògics, avaluació per competències professionals, formació i motivació, sectors d'activitat i nous perfils, i metodologies per a l'orientació professional."
    },
    {
      q: 'Quina formació tens en intel·ligència artificial?',
      a: "Des del 2025 he fet sis cursos d'IA aplicada a la feina (40 hores): ChatGPT per a la innovació i l'eficiència (Diputació de Girona), iniciació a la IA i als fluxos de treball amb IA (BIG School), IA aplicada a la gestió d'entitats (Plena Inclusión), IA per a la societat civil (Plena Inclusión i Founderz) i IA per a professionals de la psicologia (COPC).\n\nAra faig el curs Introducció a la intel·ligència artificial de PIMEC (25 h)."
    },
    {
      q: 'Quina formació acadèmica tens?',
      a: "Sóc llicenciat en Psicologia per la UAB (1992), amb el Postgrau en Integració Laboral (UdG, 200 h), el Postgrau en Patologia Dual (UdG, 190 h), el Màster en Mediació Terapèutica Corporal (Crei-Sants, UB) i el Postgrau en Psicoteràpia i Creixement Personal (Institut Erich Fromm).\n\nEstic habilitat com a psicòleg general sanitari i com a educador social."
    },
    {
      q: 'Com puc contactar amb tu?',
      a: "Pots escriure'm a " + CORREU + ". També pots descarregar el meu CV complet en PDF des d'aquesta mateixa web."
    }
  ];




  var obrir = document.querySelectorAll('[data-xat-obre]');
  var panell = document.getElementById('xat');
  if (!panell || !obrir.length) return;
  var fil = document.getElementById('xat-fil');
  var suggerides = document.getElementById('xat-suggerides');
  var tanca = document.getElementById('xat-tanca');
  var ultimBoto = null;
  var INICI = fil.innerHTML;
  var nova = document.getElementById('xat-nova');

  RESPOSTES.forEach(function (r) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'xat-chip';
    b.textContent = r.q;
    b.addEventListener('click', function () { pregunta(r.q, r.a); });
    suggerides.appendChild(b);
  });

  function afegeix(classe, text) {
    var d = document.createElement('div');
    d.className = 'xat-msg ' + classe;
    d.textContent = text;
    fil.appendChild(d);
    fil.scrollTop = fil.scrollHeight;
  }

  function pregunta(text, resposta) {
    text = (text || '').trim();
    if (!text) return;
    afegeix('xat-jo', text);
    afegeix('xat-ell', resposta);
  }

  function obre(ev) {
    ultimBoto = ev && ev.currentTarget;
    panell.hidden = false;
    document.documentElement.classList.add('xat-obert');
    obrir.forEach(function (b) { b.setAttribute('aria-expanded', 'true'); });
    var primer = suggerides.querySelector('button'); if (primer) primer.focus();
  }
  function tancaPanell() {
    panell.hidden = true;
    document.documentElement.classList.remove('xat-obert');
    obrir.forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    if (ultimBoto) ultimBoto.focus();
  }

  obrir.forEach(function (b) { b.addEventListener('click', obre); });
  tanca.addEventListener('click', tancaPanell);
  if (nova) nova.addEventListener('click', function () { fil.innerHTML = INICI; suggerides.scrollTop = 0; });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panell.hidden) tancaPanell(); });
})();
