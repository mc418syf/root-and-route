(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const selectable = [
    '.rr-section',
    '.rr-brand-hero__mark',
    '.rr-collection-card',
    '.rr-service-card',
    '.rr-portfolio-card',
    '.rr-timeline__item',
    '.rr-client',
    '.rr-inquiry-form',
    '.rr-h1',
    '.rr-h2',
    '.rr-intro',
    '.rr-button'
  ].join(',');

  function prepareMotion() {
    const items = Array.from(document.querySelectorAll(selectable));

    if (reduceMotion.matches) {
      items.forEach((item) => item.classList.add('rr-is-visible'));
      return;
    }

    document.documentElement.classList.add('rr-motion-ready');

    items.forEach((item, index) => {
      const group = item.closest('.rr-section') || item.parentElement;
      const siblings = group ? Array.from(group.querySelectorAll(selectable)) : items;
      const localIndex = Math.max(0, siblings.indexOf(item));
      item.style.setProperty('--rr-delay', `${Math.min(localIndex * 70, 420)}ms`);

      if (index < 4) {
        item.classList.add('rr-is-visible');
      }
    });

    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('rr-is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('rr-is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.12
    });

    items.forEach((item) => observer.observe(item));
  }

  function preparePointerMotion() {
    const hero = document.querySelector('.rr-brand-hero');
    const mark = document.querySelector('.rr-brand-hero__mark');
    if (!hero || !mark || reduceMotion.matches) return;

    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 18;
      mark.style.setProperty('--rr-pointer-x', `${x.toFixed(2)}px`);
      mark.style.setProperty('--rr-pointer-y', `${y.toFixed(2)}px`);
    }, { passive: true });

    hero.addEventListener('pointerleave', () => {
      mark.style.setProperty('--rr-pointer-x', '0px');
      mark.style.setProperty('--rr-pointer-y', '0px');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      prepareMotion();
      preparePointerMotion();
    });
  } else {
    prepareMotion();
    preparePointerMotion();
  }
})();
