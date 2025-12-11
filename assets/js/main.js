// =========================================
// 1. GLOBAL UTILITIES & EVENT LISTENERS
// =========================================

document.addEventListener('DOMContentLoaded', () => {

  // --- RESUME DOWNLOAD HANDLER (Replaces inline onclick) ---
  const resumeBtns = document.querySelectorAll('a[href$=".pdf"]');
  resumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (window.gtag) {
        gtag('event', 'resume_download', {
          event_category: 'engagement',
          event_label: 'Resume PDF',
          value: 1
        });
      }
      // default download behavior is allowed
    });
  });

  // --- MOBILE NAVIGATION ---
  const navToggle = document.querySelector('.nav-toggle');
  const topNav = document.querySelector('.top-nav');

  if (navToggle && topNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      topNav.classList.toggle('is-open', !isOpen);
    });

    document.querySelectorAll('.top-nav a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navToggle.setAttribute('aria-expanded', 'false');
          topNav.classList.remove('is-open');
        }
      });
    });
  }

  // =========================================
  // 2. HOME PAGE LOGIC (Scroll & Stats)
  // =========================================

  // Reveal-on-scroll
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    if ('IntersectionObserver' in window) {
      const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

      revealElements.forEach(el => revealOnScroll.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add('active'));
    }
  }

 // Stats numbers
const statsSection = document.querySelector('.stats-section');
const stats = document.querySelectorAll('.stat-number');

if (statsSection && stats.length) {
  let hasAnimatedStats = false;

  const animateStats = () => {
    if (hasAnimatedStats) return;
    hasAnimatedStats = true;

    stats.forEach(counter => {
      const target = Number(counter.getAttribute('data-target')) || 0;
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000;
      const startTime = performance.now();

      const updateCount = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);
        counter.innerText = Math.ceil(easeOutQuad * target) + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target + suffix;
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  // NEW: feature detection + fallback
  if ('IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateStats();
        statsObserver.unobserve(statsSection);
      }
    }, { threshold: 0.2 });

    statsObserver.observe(statsSection);
  } else {
    // Fallback for older browsers: just run the animation immediately
    animateStats();
  }
}


  // =========================================
  // 3. WORK PAGE FILTERING LOGIC
  // =========================================

  const cards = document.querySelectorAll('.project-card');
  const emptyState = document.getElementById('empty-state');
  const heroFilters = document.querySelectorAll('.hero-filter');
  const filterAnchors = document.querySelectorAll('.filter-anchor');
  const grid = document.getElementById('grid');
  const statusEl = document.getElementById('filter-status'); // NEW

  // Only run this on the Work page (where cards + filters exist)
  if (cards.length && (heroFilters.length || filterAnchors.length)) {

    // Single source of truth for filtering
    function applyFilter(category = 'all', updateUrl = true) {
      // Tell assistive tech the grid is updating
      if (grid) grid.setAttribute('aria-busy', 'true');

      let visibleCount = 0;

      // Highlight hero filters
      heroFilters.forEach(btn => {
        const btnCategory = btn.dataset.filter || 'all';
        const isSelected = btnCategory === category;

        btn.classList.toggle('active', isSelected);
        btn.setAttribute('aria-pressed', isSelected);
      });

      // Show / hide cards with your existing animation logic
      cards.forEach(card => {
        card.classList.remove('fade-in');
        void card.offsetWidth; // restart animation

        if (category === 'all' || card.dataset.category === category) {
          card.classList.remove('hidden');
          card.classList.add('fade-in');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      // Empty state
      if (emptyState) {
        emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
      }

        // NEW: update screen-reader status message
  if (statusEl) {
    statusEl.textContent =
      visibleCount === 0
        ? 'No projects found for this category.'
        : `${visibleCount} project${visibleCount > 1 ? 's' : ''} shown.`;
  }

      // URL hash (for deep links)
      if (updateUrl) {
        const hash = category === 'all' ? ' ' : `#${category}`;
        history.replaceState(null, null, hash);
      }

      // Done updating
      if (grid) grid.setAttribute('aria-busy', 'false');
    }

    // Click on hero badges
    heroFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.filter || 'all';
        applyFilter(category, true);

        if (grid) {
          grid.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Footer category links
    filterAnchors.forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetFilter = anchor.getAttribute('data-filter-target') || 'all';
        applyFilter(targetFilter, true);

        if (grid) {
          grid.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Initial state (hash support)
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash) {
      applyFilter(initialHash, false);
    } else {
      applyFilter('all', false);
    }
  }

  // =========================================
  // 4. ACTIVE LINK HANDLER (SCROLL SPY + PAGE DETECTION)
  // =========================================

  const navLinks = document.querySelectorAll('.top-nav a');
  const sections = document.querySelectorAll('section[id]');

  function removeActiveClasses() {
    navLinks.forEach(link => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    });
  }

  function activateLink(link) {
    if (link) {
      removeActiveClasses();
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  }

  const currentPath = window.location.pathname;
  const isHomePage = currentPath.endsWith('/') || currentPath.includes('index.html');

  if (!isHomePage) {
    // Separate page like work.html → mark that nav link active
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && currentPath.includes(href) && href !== 'index.html') {
        activateLink(link);
      }
    });
  } else {
    // On Home page → scroll spy
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          const matchingLink = document.querySelector(`.top-nav a[href="#${id}"]`);
          if (matchingLink) {
            activateLink(matchingLink);
          }
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

}); // 👈 single, final close for DOMContentLoaded
