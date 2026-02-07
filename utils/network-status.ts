/**
 * Network Status Utility
 * Monitors online/offline status and provides callbacks
 */

import { captureError } from './sentry';
import { trackCustomEvent } from './analytics';

/**
 * Check if browser is currently online
 */
export const isOnline = (): boolean => {
    return typeof navigator !== 'undefined' && navigator.onLine;
};

/**
 * Add network status event listeners
 * @param onOnline - Callback when connection is restored
 * @param onOffline - Callback when connection is lost
 * @returns Cleanup function to remove listeners
 */
export const addNetworkListeners = (
    onOnline: () => void,
    onOffline: () => void
): (() => void) => {
    const handleOnline = () => {
        console.log('[Network] Connection restored');

        // Track in analytics
        trackCustomEvent('network_online', {
            event_category: 'Network',
            timestamp: Date.now(),
        });

        onOnline();
    };

    const handleOffline = () => {
        console.warn('[Network] Connection lost');

        // Log to Sentry for production monitoring
        captureError(new Error('User went offline'), {
            context: 'network_status',
            online: false,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
        });

        // Track in analytics
        trackCustomEvent('network_offline', {
            event_category: 'Network',
            timestamp: Date.now(),
        });

        onOffline();
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Return cleanup function
    return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
    };
};
