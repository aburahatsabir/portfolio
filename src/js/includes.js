// =========================================
// HTML PARTIALS INJECTION SYSTEM
// =========================================

(function () {
    'use strict';

    // Determine base path for partials based on current page location
    function getBasePath() {
        const path = window.location.pathname;
        // If in a subdirectory (e.g., case-studies/), use ../
        if (path.includes('/case-studies/') || path.includes('/partials/')) {
            return '../';
        }
        return '';
    }

    const basePath = getBasePath();

    // Fetch and inject partials
    async function loadPartials() {
        const includeElements = document.querySelectorAll('[data-include]');

        if (includeElements.length === 0) {
            // No partials to load, dispatch event immediately
            document.dispatchEvent(new CustomEvent('partials-loaded'));
            return;
        }

        const promises = Array.from(includeElements).map(async (element) => {
            const partialName = element.getAttribute('data-include');
            const partialPath = `${basePath}partials/${partialName}.html`;

            try {
                const response = await fetch(partialPath);
                if (!response.ok) {
                    throw new Error(`Failed to load ${partialPath}: ${response.status}`);
                }

                const html = await response.text();
                element.outerHTML = html;
            } catch (error) {
                console.error(`[Partials] Error loading ${partialName}:`, error);
                element.innerHTML = `<!-- Failed to load ${partialName} -->`;
            }
        });

        await Promise.all(promises);

        // Set active navigation link after partials are loaded
        setActiveNavLink();

        // Dispatch custom event to signal partials are ready
        document.dispatchEvent(new CustomEvent('partials-loaded'));
    }

    // Set active navigation link based on current page
    function setActiveNavLink() {
        const navLinks = document.querySelectorAll('.top-nav a');
        const currentPath = window.location.pathname;

        // Determine which page we're on
        const isHomePage = currentPath.endsWith('/') ||
            currentPath.endsWith('/index.html') ||
            currentPath.includes('index.html');
        const isWorkPage = currentPath.includes('work.html');

        navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');

            const href = link.getAttribute('href');

            // Set active state based on current page
            if (isWorkPage && href === 'work.html') {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else if (isHomePage && (href === 'index.html' || link.classList.contains('nav-home'))) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    // Load partials when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadPartials);
    } else {
        loadPartials();
    }
})();
