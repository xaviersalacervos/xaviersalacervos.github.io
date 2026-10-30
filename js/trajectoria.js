// 25 anys en moviment: les xifres compten soles quan apareixen i una línia de llum
// recorre la trajectòria a mesura que es baixa. Sense JS es veuen les xifres finals.
(function () {
  if (!('IntersectionObserver' in window)) return;
  var quiet = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (quiet) return;

  var xifres = Array.prototype.slice.call(document.querySelectorAll('[data-compta]'));
  xifres.forEach(function (el) { el.textContent = '0'; });
  var obs = new IntersectionObserver(function (entrades) {
    entrades.forEach(function (e) {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      var fi = +e.target.getAttribute('data-compta'), t0 = performance.now(), dur = 1400;
      (function pas(ara) {
        var t = Math.min(1, (ara - t0) / dur);
        e.target.textContent = Math.round(fi * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(pas);
      })(t0);
    });
  }, { threshold: 0.6 });
  xifres.forEach(function (el) { obs.observe(el); });

  var linia = document.querySelector('#experiencia .timeline');
  if (!linia) return;
  linia.classList.add('en-moviment');
  var fites = Array.prototype.slice.call(linia.children);
  var pendent = false;
  function actualitza() {
    pendent = false;
    var b = linia.getBoundingClientRect(), mig = window.innerHeight * 0.6;
    var prog = Math.max(0, Math.min(1, (mig - b.top) / b.height));
    linia.style.setProperty('--prog', prog.toFixed(4));
    fites.forEach(function (li) {
      li.classList.toggle('vist', li.getBoundingClientRect().top + 8 < mig);
    });
  }
  window.addEventListener('scroll', function () {
    if (!pendent) { pendent = true; requestAnimationFrame(actualitza); }
  }, { passive: true });
  window.addEventListener('resize', actualitza);
  actualitza();
})();
