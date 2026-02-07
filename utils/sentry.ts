/**
 * Sentry Error Tracking Integration
 * Provides real-time error monitoring for production debugging
 */

import * as Sentry from '@sentry/react';

/**
 * Initialize Sentry for error tracking
 * Only activates if VITE_SENTRY_DSN environment variable is configured
 */
export const initSentry = () => {
    const dsn = import.meta.env.VITE_SENTRY_DSN;

    // Skip initialization if DSN not configured
    if (!dsn) {
        if (import.meta.env.DEV) {
            console.warn('[Sentry] DSN not configured, error tracking disabled');
            console.warn('[Sentry] Set VITE_SENTRY_DSN environment variable to enable');
        }
        return;
    }

    try {
        Sentry.init({
            dsn,
            environment: import.meta.env.MODE, // 'development' or 'production'

            // Performance Monitoring
            tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0, // 10% in prod, 100% in dev

            // Session Replay (optional - captures user sessions for debugging)
            replaysSessionSampleRate: 0, // Disabled to save quota
            replaysOnErrorSampleRate: 0.1, // Capture 10% of sessions with errors

            // Filter out sensitive data before sending to Sentry
            beforeSend(event) {
                // Scrub PII from request data
                if (event.request?.data) {
                    const data = event.request.data as any;
                    if (data.email) data.email = '[REDACTED]';
                    if (data.from_email) data.from_email = '[REDACTED]';
                    if (data.name) data.name = '[REDACTED]';
                    if (data.from_name) data.from_name = '[REDACTED]';
                }

                // Scrub PII from extra context
                if (event.extra?.formData) {
                    const formData = event.extra.formData as any;
                    if (formData.email) formData.email = '[REDACTED]';
                    if (formData.name) formData.name = '[REDACTED]';
                }

                return event;
            },

            // Ignore certain errors that are not actionable
            ignoreErrors: [
                // Browser extensions
                'top.GLOBALS',
                'chrome-extension://',
                'moz-extension://',

                // Network errors that are expected
                'NetworkError',
                'Failed to fetch',

                // Ad blockers
                'adsbygoogle',
            ],
        });

        if (import.meta.env.DEV) {
            console.log('[Sentry] Initialized successfully');
        }
    } catch (error) {
        console.error('[Sentry] Failed to initialize:', error);
    }
};

/**
 * Capture an error and send to Sentry
 */
export const captureError = (error: Error, context?: Record<string, any>) => {
    // Always log to console in development
    if (import.meta.env.DEV) {
        console.error('[Error]', error, context);
    }

    // Send to Sentry if configured
    try {
        Sentry.captureException(error, {
            extra: context,
            level: 'error',
        });
    } catch (sentryError) {
        // Fail silently if Sentry is not configured
        if (import.meta.env.DEV) {
            console.error('[Sentry] Failed to capture error:', sentryError);
        }
    }
};

/**
 * Capture a message (non-error event)
 */
export const captureMessage = (
    message: string,
    level: 'info' | 'warning' | 'error' = 'info'
) => {
    if (import.meta.env.DEV) {
        console.log(`[${level.toUpperCase()}]`, message);
    }

    try {
        Sentry.captureMessage(message, level);
    } catch (error) {
        // Fail silently
    }
};

/**
 * Set user context for error tracking
 */
export const setUser = (user: {
    id?: string;
    email?: string;
    username?: string;
}) => {
    try {
        Sentry.setUser(user);
    } catch (error) {
        // Fail silently
    }
};

/**
 * Clear user context
 */
export const clearUser = () => {
    try {
        Sentry.setUser(null);
    } catch (error) {
        // Fail silently
    }
};

/**
 * Add breadcrumb for debugging context
 */
export const addBreadcrumb = (message: string, data?: Record<string, any>) => {
    try {
        Sentry.addBreadcrumb({
            message,
            data,
            timestamp: Date.now() / 1000,
        });
    } catch (error) {
        // Fail silently
    }
};
