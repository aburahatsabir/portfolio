// =========================================
// SERVICE WORKER REGISTRATION
// =========================================

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/portfolio/sw.js')
      .then((registration) => {
        console.log('[PWA] Service Worker registered:', registration.scope);

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('[PWA] New version available! Refresh to update.');
            }
          });
        });
      })
      .catch((error) => {
        console.error('[PWA] Service Worker registration failed:', error);
      });
  });
}


// =========================================
// GLOBAL UTILITIES & EVENT LISTENERS
// =========================================

// Wait for partials to load before initializing navigation
document.addEventListener('partials-loaded', () => {
  // --- MOBILE NAVIGATION (A11Y-IMPROVED) ---
  const navToggle = document.querySelector('.nav-toggle');
  const topNav = document.querySelector('.top-nav');

  if (navToggle && topNav) {
    const navLinks = Array.from(topNav.querySelectorAll('a'));

    function openMenu() {
      navToggle.setAttribute('aria-expanded', 'true');
      topNav.classList.add('is-open');
      navLinks[0]?.focus();
    }

    function closeMenu({ returnFocus = true } = {}) {
      navToggle.setAttribute('aria-expanded', 'false');
      topNav.classList.remove('is-open');
      if (returnFocus) navToggle.focus();
    }

    function isMenuOpen() {
      return navToggle.getAttribute('aria-expanded') === 'true';
    }

    navToggle.addEventListener('click', () => {
      if (isMenuOpen()) closeMenu();
      else openMenu();
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768 && isMenuOpen()) {
          closeMenu({ returnFocus: false });
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen()) closeMenu();
    });

    document.addEventListener('click', (e) => {
      if (!isMenuOpen()) return;
      const clickedInsideMenu = topNav.contains(e.target);
      const clickedToggle = navToggle.contains(e.target);
      if (!clickedInsideMenu && !clickedToggle) {
        closeMenu({ returnFocus: false });
      }
    });
  }

  // =========================================
  // ACTIVE LINK HANDLER (HOME DEFAULT + SCROLL SPY + PAGE DETECTION)
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
    if (!link) return;
    removeActiveClasses();
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }

  function normalizePath(pathname) {
    // GitHub pages often serves /portfolio/ (no index.html)
    if (pathname.endsWith('/')) return pathname;
    return pathname;
  }

  const currentPath = normalizePath(window.location.pathname);
  const isHomePage = currentPath.endsWith('/') || currentPath.includes('index.html');

  // Helper: find links
  const homeNavLink =
    document.querySelector('.top-nav a.nav-home') ||
    document.querySelector('.top-nav a[href="index.html"]');

  const workNavLink =
    document.querySelector('.top-nav a[href="work.html"]');

  if (!isHomePage) {
    // On work.html or other pages: mark that page link active
    if (currentPath.includes('work.html') && workNavLink) {
      activateLink(workNavLink);
    }
  } else {
    // HOME PAGE BEHAVIOR:
    // - Default to Home active when near top OR when no section is intersecting
    // - Otherwise activate section links

    // Make Home active initially (good for first load)
    if (homeNavLink) activateLink(homeNavLink);

    // Mark Home active again when user scrolls near the top
    function setHomeActiveIfNearTop() {
      if (window.scrollY <= 10 && homeNavLink) {
        activateLink(homeNavLink);
      }
    }

    if ('IntersectionObserver' in window && sections.length) {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
      };

      const observer = new IntersectionObserver((entries) => {
        // If near top, force Home active
        if (window.scrollY <= 10) {
          if (homeNavLink) activateLink(homeNavLink);
          return;
        }

        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const id = entry.target.getAttribute('id');

          // Your section links are like: index.html#services, index.html#about, etc.
          const matchingLink =
            document.querySelector(`.top-nav a[href="index.html#${id}"]`) ||
            document.querySelector(`.top-nav a[href="#${id}"]`);

          if (matchingLink) activateLink(matchingLink);
        });
      }, observerOptions);

      sections.forEach(section => observer.observe(section));

      window.addEventListener('scroll', setHomeActiveIfNearTop, { passive: true });

    } else {
      // Fallback: rAF scroll spy
      let ticking = false;

      function updateActiveSection() {
        ticking = false;

        // If top, Home active
        if (window.scrollY <= 10) {
          if (homeNavLink) activateLink(homeNavLink);
          return;
        }

        const scanY = window.innerHeight * 0.35;
        let currentId = null;

        sections.forEach(section => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= scanY && rect.bottom >= scanY) {
            currentId = section.id;
          }
        });

        if (currentId) {
          const matchingLink =
            document.querySelector(`.top-nav a[href="index.html#${currentId}"]`) ||
            document.querySelector(`.top-nav a[href="#${currentId}"]`);

          if (matchingLink) activateLink(matchingLink);
        }
      }

      function onScroll() {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(updateActiveSection);
        }
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      updateActiveSection();
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {

  // --- RESUME DOWNLOAD HANDLER (Replaces inline onclick) ---
  const resumeBtns = document.querySelectorAll('a[href$=".pdf"]');
  resumeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Track download with gtag if available (gracefully handle ad blockers)
      if (typeof window.gtag === 'function') {
        try {
          gtag('event', 'resume_download', {
            event_category: 'engagement',
            event_label: 'Resume PDF',
            value: 1
          });
        } catch (error) {
          // Silently fail if gtag is blocked by ad blocker
          console.debug('[Analytics] gtag blocked or failed:', error.message);
        }
      }
      // default download behavior is allowed
    });
  });

  // --- HOME LINK: Scroll to top without adding hash ---
  // Note: This uses event delegation since header may not be loaded yet
  document.addEventListener('click', (e) => {
    const homeLink = e.target.closest('.nav-home');
    if (homeLink) {
      // Only override if already on index page
      if (
        window.location.pathname.endsWith('/') ||
        window.location.pathname.endsWith('/index.html') ||
        window.location.pathname.includes('index.html')
      ) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Ensure URL is clean (no hash)
        history.replaceState(null, '', window.location.pathname);
      }
    }
  });

  // =========================================
  // 2. HOME PAGE LOGIC (Reveal & Stats)
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

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      stats.forEach(counter => {
        const target = Number(counter.getAttribute('data-target')) || 0;
        const suffix = counter.getAttribute('data-suffix') || '';

        // If user prefers reduced motion, show final value immediately
        if (prefersReducedMotion) {
          counter.innerText = target + suffix;
          return;
        }

        // Otherwise, animate the counter
        const duration = 2000;
        const startTime = performance.now();

        const updateCount = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const easeOutQuad = 1 - (1 - progress) * (1 - progress);
          counter.innerText = Math.ceil(easeOutQuad * target) + suffix;

          if (progress < 1) requestAnimationFrame(updateCount);
          else counter.innerText = target + suffix;
        };

        requestAnimationFrame(updateCount);
      });
    };

    if ('IntersectionObserver' in window) {
      const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          animateStats();
          statsObserver.unobserve(statsSection);
        }
      }, { threshold: 0.2 });

      statsObserver.observe(statsSection);
    } else {
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
  const statusEl = document.getElementById('filter-status');

  if (cards.length && (heroFilters.length || filterAnchors.length)) {

    function applyFilter(category = 'all', updateUrl = true) {
      if (grid) grid.setAttribute('aria-busy', 'true');

      let visibleCount = 0;

      heroFilters.forEach(btn => {
        const btnCategory = btn.dataset.filter || 'all';
        const isSelected = btnCategory === category;
        btn.classList.toggle('active', isSelected);
        btn.setAttribute('aria-pressed', isSelected);
      });

      cards.forEach(card => {
        card.classList.remove('fade-in');
        void card.offsetWidth;

        if (category === 'all' || card.dataset.category === category) {
          card.classList.remove('hidden');
          card.classList.add('fade-in');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      if (emptyState) {
        emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
      }

      if (statusEl) {
        statusEl.textContent =
          visibleCount === 0
            ? 'No projects found for this category.'
            : `${visibleCount} project${visibleCount > 1 ? 's' : ''} shown.`;
      }

      if (updateUrl) {
        const hash = category === 'all' ? '' : `#${encodeURIComponent(category)}`;
        history.replaceState(null, '', `${window.location.pathname}${hash}`);
      }

      if (grid) grid.setAttribute('aria-busy', 'false');
    }

    heroFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.filter || 'all';
        applyFilter(category, true);
        if (grid) grid.scrollIntoView({ behavior: 'smooth' });
      });
    });

    filterAnchors.forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetFilter = anchor.getAttribute('data-filter-target') || 'all';
        applyFilter(targetFilter, true);
        if (grid) grid.scrollIntoView({ behavior: 'smooth' });
      });
    });

    const rawHash = (window.location.hash || '').slice(1);
    const initialHash = decodeURIComponent(rawHash).trim();

    const validCategories = new Set(['all']);
    heroFilters.forEach(btn => validCategories.add((btn.dataset.filter || '').trim()));
    cards.forEach(card => validCategories.add((card.dataset.category || '').trim()));

    const initialCategory = validCategories.has(initialHash) ? initialHash : 'all';
    applyFilter(initialCategory, false);

    // Listen for hash changes to support same-page navigation (e.g., footer category links)
    window.addEventListener('hashchange', () => {
      const newHash = (window.location.hash || '').slice(1);
      const newCategory = decodeURIComponent(newHash).trim();
      const categoryToApply = validCategories.has(newCategory) ? newCategory : 'all';
      applyFilter(categoryToApply, false);
      if (grid) grid.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // =========================================
  // 4. ACTIVE LINK HANDLER (HOME DEFAULT + SCROLL SPY + PAGE DETECTION)
  // =========================================
  // Moved to partials-loaded event listener (see top of file)

  // =========================================
  // 5. CONTACT FORM HANDLER (EmailJS)
  // =========================================
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    // Initialize EmailJS with your public key
    emailjs.init('OKdOWC7hUfHp8O3Un');

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Show loading state
      submitBtn.innerHTML = '<span class="custom-submit-spinner-wrapper"><svg class="custom-submit-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...</span>';
      submitBtn.disabled = true;

      // Send email using EmailJS
      emailjs.sendForm('service_u2no92e', 'template_se304sp', contactForm)
        .then(function (response) {
          console.log('SUCCESS!', response.status, response.text);

          // Show success message
          submitBtn.innerHTML = '<span class="custom-submit-success-wrapper">✓ Message Sent Successfully!</span>';

          // Reset form after 3 seconds
          setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Reinitialize Lucide icons
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
              lucide.createIcons();
            }
          }, 3000);
        }, function (error) {
          console.error('FAILED...', error);

          // Show error message
          submitBtn.innerHTML = '<span class="custom-submit-error-wrapper">✗ Failed to send. Please try again.</span>';

          // Reset button after 3 seconds
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Reinitialize Lucide icons
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
              lucide.createIcons();
            }
          }, 3000);
        });
    });
  }

});

