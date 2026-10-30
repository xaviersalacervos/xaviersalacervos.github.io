// Menú mòbil i secció activa. La web funciona igual sense JavaScript.
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu');

  function closeMenu() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); toggle.focus(); }
    });
  }

  // Marca l'enllaç de la secció visible
  var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav a'));
  if ('IntersectionObserver' in window && links.length) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && byId[entry.target.id]) {
          links.forEach(function (a) { a.removeAttribute('aria-current'); });
          byId[entry.target.id].setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  var any = document.getElementById('any');
  if (any) any.textContent = new Date().getFullYear();
})();

// Interruptor Sense IA / Amb IA de la secció Què aporto
(function () {
  var sw = document.getElementById('vista-ia');
  var seccio = document.getElementById('expertesa');
  if (!sw || !seccio) return;
  function posa(on) {
    sw.setAttribute('aria-checked', on ? 'true' : 'false');
    seccio.classList.toggle('ia-on', on);
  }
  sw.addEventListener('click', function () { posa(sw.getAttribute('aria-checked') !== 'true'); });
  Array.prototype.forEach.call(seccio.querySelectorAll('.vista-op'), function (b) {
    b.addEventListener('click', function () { posa(b.getAttribute('data-vista') === 'ia'); });
  });
})();
