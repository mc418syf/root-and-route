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
    '.rr-button',
    '.rr2-section',
    '.rr2-display',
    '.rr2-heading',
    '.rr2-hero__mark',
    '.rr2-row',
    '.rr2-media',
    '.rr2-copy',
    '.rr2-feature',
    '.rr2-eco-card',
    '.rr2-button'
  ].join(',');

  function prepareMotion() {
    const items = Array.from(document.querySelectorAll(selectable));

    if (reduceMotion.matches) {
      items.forEach((item) => {
        item.classList.add('rr-is-visible');
        item.classList.add('rr2-is-visible');
      });
      return;
    }

    document.documentElement.classList.add('rr-motion-ready');

    items.forEach((item, index) => {
      const group = item.closest('.rr-section, .rr2-section') || item.parentElement;
      const siblings = group ? Array.from(group.querySelectorAll(selectable)) : items;
      const localIndex = Math.max(0, siblings.indexOf(item));
      item.style.setProperty('--rr-delay', `${Math.min(localIndex * 70, 420)}ms`);

      if (index < 4) {
        item.classList.add('rr-is-visible');
        item.classList.add('rr2-is-visible');
      }
    });

    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => {
        item.classList.add('rr-is-visible');
        item.classList.add('rr2-is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('rr-is-visible');
          entry.target.classList.add('rr2-is-visible');
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

  function prepareParallaxMotion() {
    const items = Array.from(document.querySelectorAll('[data-rr-parallax]'));
    if (!items.length || reduceMotion.matches) return;

    let ticking = false;

    function update() {
      const viewport = window.innerHeight || 1;
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const strength = Number(item.dataset.rrParallax || 0.025);
        const offset = (rect.top + rect.height / 2 - viewport / 2) * strength;
        item.style.setProperty('--rr-parallax-y', `${offset.toFixed(2)}px`);
      });
      ticking = false;
    }

    function requestUpdate() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      prepareMotion();
      preparePointerMotion();
      prepareParallaxMotion();
    });
  } else {
    prepareMotion();
    preparePointerMotion();
    prepareParallaxMotion();
  }
})();
