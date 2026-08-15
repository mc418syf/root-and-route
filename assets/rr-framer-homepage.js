(() => {
  const root = document.querySelector('[data-rr-framer]');
  const items = document.querySelectorAll('.rrf-reveal, .rr-reveal');
  const menu = document.querySelector('[data-rrf-menu]');
  const openButton = document.querySelector('[data-rrf-menu-open]');
  const closeButton = document.querySelector('[data-rrf-menu-close]');
  const menuLinks = document.querySelectorAll('[data-rrf-menu-link]');

  const setMenu = (isOpen) => {
    if (!menu || !openButton) return;
    menu.classList.toggle('is-open', isOpen);
    menu.setAttribute('aria-hidden', String(!isOpen));
    openButton.setAttribute('aria-expanded', String(isOpen));
    document.documentElement.classList.toggle('rrf-menu-lock', isOpen);
  };

  openButton?.addEventListener('click', () => setMenu(true));
  closeButton?.addEventListener('click', () => setMenu(false));
  menu?.addEventListener('click', (event) => {
    if (event.target === menu) setMenu(false);
  });
  menuLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  document.addEventListener('shopify:section:load', (event) => {
    event.target.querySelectorAll('.rrf-reveal, .rr-reveal').forEach((item) => {
      item.classList.add('is-visible');
    });
  });

  if (!items.length) return;

  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    rootMargin: '0px 0px -12% 0px',
    threshold: 0.16
  });

  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 55, 330)}ms`;
    observer.observe(item);
  });
})();
