// Hash Route Redirect Handler
// Redirects legacy hash-based URLs (#/) to clean pathname-based URLs (/)
// This ensures SEO continuity and prevents 404 errors

(function () {
    if (window.location.hash && window.location.hash.startsWith('#/')) {
        const cleanPath = window.location.hash.slice(1); // Remove #
        const newUrl = window.location.origin + cleanPath + window.location.search;
        window.history.replaceState(null, '', newUrl);
    }
})();
