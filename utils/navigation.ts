import React from 'react';

/**
 * Navigate to a route using History API (for clean URLs without hash)
 * @param path - The pathname to navigate to (e.g., '/about', '/work/fmcg-erp')
 */
export function navigateTo(path: string) {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
}

/**
 * Handle link clicks for client-side navigation
 * Prevents page reload and uses History API instead
 */
export function handleNavigationClick(e: React.MouseEvent<HTMLAnchorElement>, path: string) {
    e.preventDefault();
    navigateTo(path);
    window.scrollTo(0, 0);
}
