// Hero: alto exacto del viewport visible, medido en JS (evita cualquier ambigüedad de vh/svh/dvh en mobile)
(function () {
  var hero = document.getElementById('top');
  if (!hero) return;
  function setHeroHeight() {
    hero.style.minHeight = window.innerHeight + 'px';
  }
  setHeroHeight();
  window.addEventListener('resize', setHeroHeight);
  window.addEventListener('orientationchange', setHeroHeight);
})();

// Header: transparente arriba, sólido al scrollear (también revela el isologo de la navbar)
(function () {
  var header = document.getElementById('siteHeader');
  if (!header) return;
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 40); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// Botón de WhatsApp: aparece apenas se scrollea
(function () {
  var waFloat = document.getElementById('waFloat');
  if (!waFloat) return;
  function onScroll() { waFloat.classList.toggle('visible', window.scrollY > 40); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// Menú circular: el círculo se expande desde el botón
(function () {
  var toggle = document.getElementById('menuToggle');
  var menu = document.getElementById('radialMenu');
  if (!toggle || !menu) return;

  function setOpen(open) {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  }
  toggle.addEventListener('click', function () {
    setOpen(!menu.classList.contains('open'));
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
})();

// Volver arriba: aparece después del hero; ambos flotantes se ocultan al llegar al footer
(function () {
  var topFloat = document.getElementById('topFloat');
  var waFloat = document.getElementById('waFloat');
  var hero = document.getElementById('top');
  var footer = document.getElementById('siteFooter');
  if (!topFloat) return;

  topFloat.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        topFloat.classList.toggle('visible', !entry.isIntersecting);
      });
    }, { threshold: 0 }).observe(hero);
  }

  if (footer && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (waFloat) waFloat.classList.toggle('hidden', entry.isIntersecting);
        topFloat.classList.toggle('hidden', entry.isIntersecting);
      });
    }, { threshold: 0.01 }).observe(footer);
  }
})();
