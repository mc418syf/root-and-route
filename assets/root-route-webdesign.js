(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function applyReduce() {
    if (!reduceMotion.matches) return;
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.style.animation = 'none';
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    document.querySelectorAll('[data-marquee]').forEach((el) => {
      el.style.animationPlayState = 'paused';
    });
  }

  function playIntro() {
    if (reduceMotion.matches) return;
    const seq = [['l1', 0], ['l2', 90], ['h1', 140], ['h2', 270], ['sub', 500]];
    const items = seq
      .map(([key, delay]) => [document.querySelector(`[data-intro="${key}"]`), delay, key])
      .filter(([el]) => el);

    items.forEach(([el, , key]) => {
      el.style.transition = 'none';
      el.style.transform = key === 'h1' || key === 'h2' ? 'translateY(105%)' : 'translateY(16px)';
      el.style.opacity = '0';
    });

    void document.body.offsetHeight;

    requestAnimationFrame(() => {
      items.forEach(([el, delay]) => {
        window.setTimeout(() => {
          el.style.transition = 'opacity 1s cubic-bezier(.16,1,.3,1),transform 1.1s cubic-bezier(.16,1,.3,1)';
          el.style.opacity = '1';
          el.style.transform = 'none';
        }, delay);
      });
    });
  }

  function updateNav() {
    const nav = document.getElementById('rr2-nav');
    if (!nav) return;
    const solid = window.scrollY > 40;
    nav.style.background = solid ? 'rgba(250,250,248,.9)' : 'transparent';
    nav.style.backdropFilter = solid ? 'blur(10px)' : 'none';
    nav.style.borderBottomColor = solid ? '#ECEBE6' : 'transparent';
  }

  function updateParallax() {
    if (reduceMotion.matches) return;
    const viewport = window.innerHeight || 1;
    document.querySelectorAll('[data-parallax]').forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - viewport / 2;
      el.style.transform = `translate3d(0,${(center * speed).toFixed(1)}px,0)`;
    });
  }

  function initCounter() {
    const num = document.getElementById('rr2-count');
    if (!num) return;
    let n = 0;
    const timer = window.setInterval(() => {
      n += Math.floor(Math.random() * 11) + 5;
      if (n >= 100) {
        n = 100;
        window.clearInterval(timer);
      }
      num.textContent = (`00${n}`).slice(-3);
    }, 95);
  }

  function init() {
    initCounter();
    applyReduce();
    playIntro();

    let ticking = false;
    const run = () => {
      updateParallax();
      updateNav();
      ticking = false;
    };
    const requestRun = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(run);
    };

    run();
    window.addEventListener('scroll', requestRun, { passive: true });
    window.addEventListener('resize', requestRun, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
