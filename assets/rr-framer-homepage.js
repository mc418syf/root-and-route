(() => {
  const items = document.querySelectorAll('.rrf-reveal');

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
