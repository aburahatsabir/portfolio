/**
 * GDPR Consent Manager
 * Handles cookie consent for Google Analytics
 */

class GDPRConsent {
    constructor() {
        this.consentKey = 'gdpr-analytics-consent';
        this.gaId = 'G-XX8R0FKN5X';
    }

    hasConsent() {
        const consent = localStorage.getItem(this.consentKey);
        return consent === 'true' ? true : (consent === 'false' ? false : null);
    }

    grantConsent() {
        localStorage.setItem(this.consentKey, 'true');
        this.loadAnalytics();
        this.hideBanner();
    }

    denyConsent() {
        localStorage.setItem(this.consentKey, 'false');
        this.hideBanner();
    }

    loadAnalytics() {
        // Load Google Analytics script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
        document.head.appendChild(script);

        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', this.gaId, {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
        });

        console.log('[GDPR] Google Analytics loaded with consent');
    }

    showBanner() {
        const consent = this.hasConsent();
        if (consent !== null) return; // Already decided

        const banner = document.createElement('div');
        banner.className = 'gdpr-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Cookie consent');
        banner.innerHTML = `
      <div class="gdpr-content">
        <p>We use cookies to analyze site traffic and improve your experience. <a href="#privacy" class="gdpr-link">Learn more</a></p>
        <div class="gdpr-actions">
          <button id="gdpr-accept" class="gdpr-btn gdpr-accept" aria-label="Accept cookies">Accept</button>
          <button id="gdpr-decline" class="gdpr-btn gdpr-decline" aria-label="Decline cookies">Decline</button>
        </div>
      </div>
    `;
        document.body.appendChild(banner);

        // Add event listeners
        document.getElementById('gdpr-accept').addEventListener('click', () => this.grantConsent());
        document.getElementById('gdpr-decline').addEventListener('click', () => this.denyConsent());
    }

    hideBanner() {
        const banner = document.querySelector('.gdpr-banner');
        if (banner) {
            banner.style.opacity = '0';
            setTimeout(() => banner.remove(), 300);
        }
    }

    init() {
        const consent = this.hasConsent();

        if (consent === true) {
            // User has consented - load analytics
            this.loadAnalytics();
        } else if (consent === null) {
            // No decision yet - show banner
            this.showBanner();
        }
        // If consent === false, do nothing (user declined)
    }
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new GDPRConsent().init();
    });
} else {
    new GDPRConsent().init();
}

// Export for potential manual use
window.GDPRConsent = GDPRConsent;
