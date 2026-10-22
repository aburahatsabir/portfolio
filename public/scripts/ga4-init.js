// Google Analytics consent defaults and explicit opt-in loader.
// This local script deliberately makes no request to Google before consent.
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

// Default Consent Mode (Denied)
window.gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied'
});

window.loadGoogleAnalytics = window.loadGoogleAnalytics || function () {
    if (document.getElementById('google-analytics-script')) return;

    window.gtag('consent', 'update', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'granted'
    });
    window.gtag('js', new Date());
    window.gtag('config', 'G-BGM02GLZ84', { 'send_page_view': false });

    var script = document.createElement('script');
    script.id = 'google-analytics-script';
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-BGM02GLZ84';
    document.head.appendChild(script);
};
