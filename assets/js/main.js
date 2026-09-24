/* Main portfolio interactions. Article pages use common.js independently. */
(() => {
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('site-menu');
  if (nav && toggle && menu) {
    toggle.hidden = false;
    nav.classList.add('menu-ready');
    const closeMenu = (restoreFocus = false) => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      if (restoreFocus) toggle.focus();
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('is-open', open);
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
    });
    document.addEventListener('click', event => { if (!nav.contains(event.target)) closeMenu(); });
    matchMedia('(min-width: 768px)').addEventListener('change', () => closeMenu());
    if ('IntersectionObserver' in window) {
      const links = [...menu.querySelectorAll('a')];
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          links.forEach(link => {
            if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
          });
        });
      }, { rootMargin: '-15% 0px -60% 0px' });
      links.forEach(link => { const section = document.querySelector(link.hash); if (section) observer.observe(section); });
    }
  }

  const grid = document.querySelector('.project-grid');
  const filters = document.querySelector('.project-filters');
  if (!grid || !filters) return;
  const cards = [...grid.querySelectorAll('.project-card')];
  const status = document.getElementById('filter-status');
  let mixer;
  if (typeof window.mixitup === 'function') {
    try {
      mixer = window.mixitup(grid, {
        selectors: { target: '.project-card' },
        controls: { enable: false },
        animation: { enable: false }
      });
    } catch { /* All cards remain usable with the native fallback. */ }
  }
  filters.hidden = false;
  filters.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      const applyFallback = () => cards.forEach(card => {
        card.style.display = '';
        card.hidden = filter !== 'all' && !card.matches(filter);
      });
      if (mixer) {
        Promise.resolve(mixer.filter(filter)).catch(() => { mixer = null; applyFallback(); });
      } else applyFallback();
      const count = cards.filter(card => filter === 'all' || card.matches(filter)).length;
      status.textContent = `${count} ${count === 1 ? 'project' : 'projects'} shown: ${button.textContent}.`;
    });
  });
})();
