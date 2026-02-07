// Google Analytics 4 Initialization
// This file is loaded as an external script to comply with strict CSP

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

// Default Consent Mode (Denied)
gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied'
});

gtag('js', new Date());
gtag('config', 'G-BGM02GLZ84', {
    'send_page_view': false
});
