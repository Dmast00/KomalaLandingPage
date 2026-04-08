(() => {
  'use strict';

  // ===== Navbar scroll effect =====
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ===== Mobile menu toggle =====
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('is-open');
    navLinks.classList.toggle('is-open');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('is-open');
      navLinks.classList.remove('is-open');
    });
  });

  // ===== Scroll animations =====
  const animateElements = () => {
    const selectors = [
      '.feature-card',
      '.report-card',
      '.metric-card',
      '.chart-card',
      '.realtime-card',
      '.pricing-card',
      '.tech-badge',
      '.role-card',
      '.module-card',
      '.faq-item'
    ];

    document.querySelectorAll(selectors.join(',')).forEach(el => {
      el.classList.add('animate-on-scroll');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  };

  // ===== Counter animation =====
  const animateCounters = () => {
    const counters = document.querySelectorAll('[data-counter]');
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.counter, 10);
            const isCurrency = el.textContent.startsWith('$');
            const duration = 2000;
            const start = performance.now();

            const tick = (now) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              // easeOutQuart
              const ease = 1 - Math.pow(1 - progress, 4);
              const value = Math.round(target * ease);

              if (isCurrency) {
                el.textContent = '$' + value.toLocaleString('es-MX');
              } else {
                el.textContent = value.toLocaleString('es-MX');
              }

              if (progress < 1) {
                requestAnimationFrame(tick);
              }
            };

            requestAnimationFrame(tick);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(c => counterObserver.observe(c));
  };

  // ===== Active nav link highlight =====
  const highlightActiveNav = () => {
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = navLinks.querySelectorAll('a[href^="#"]');

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navAnchors.forEach(a => {
              a.style.color = '';
              if (a.getAttribute('href') === '#' + id) {
                a.style.color = 'var(--purple-500)';
              }
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
    );

    sections.forEach(s => sectionObserver.observe(s));
  };

  // ===== Stagger animation delay for grids =====
  const addStagger = () => {
    const grids = document.querySelectorAll(
      '.features__grid, .reports__grid, .realtime__grid, .tech__grid, .roles__grid, .modules__grid'
    );
    grids.forEach(grid => {
      grid.querySelectorAll('.animate-on-scroll').forEach((child, i) => {
        child.style.transitionDelay = `${i * 60}ms`;
      });
    });
  };

  // ===== Init =====
  animateElements();
  addStagger();
  animateCounters();
  highlightActiveNav();
})();
