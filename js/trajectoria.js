// Línia de llum que recorre la trajectòria a mesura que es baixa.
(function () {
  var quiet = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (quiet) return;

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
