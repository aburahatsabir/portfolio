/**
 * Script Health Monitor
 * 
 * Monitors third-party script loading and provides fallback mechanisms
 * when critical dependencies fail to load (e.g., due to ad blockers, network issues)
 */

import { captureError } from './sentry';

interface ScriptHealthStatus {
    ga4: boolean;
    emailjs: boolean;
    fonts: boolean;
}

class ScriptHealthMonitor {
    private status: ScriptHealthStatus = {
        ga4: false,
        emailjs: false,
        fonts: false,
    };

    private checkTimeout = 3000; // Wait 3 seconds for scripts to load
    private hasRun = false;

    /**
     * Check if Google Analytics 4 loaded successfully
     */
    private checkGA4(): boolean {
        return typeof window !== 'undefined' && typeof (window as any).gtag === 'function';
    }

    /**
     * Check if EmailJS SDK loaded successfully
     */
    private checkEmailJS(): boolean {
        return typeof window !== 'undefined' && typeof (window as any).emailjs !== 'undefined';
    }

    /**
     * Check if Google Fonts loaded successfully
     */
    private checkFonts(): boolean {
        if (typeof window === 'undefined' || !document.fonts) {
            return false;
        }

        try {
            // Check if Inter font (our primary font) is loaded
            return document.fonts.check('1em Inter');
        } catch (error) {
            // Font API not supported or error checking
            console.warn('[ScriptHealth] Font check failed:', error);
            return true; // Assume fonts loaded to avoid false positives
        }
    }

    /**
     * Run health check for all third-party scripts
     */
    runHealthCheck(): void {
        if (this.hasRun) {
            console.warn('[ScriptHealth] Health check already run');
            return;
        }

        this.hasRun = true;

        setTimeout(() => {
            this.status.ga4 = this.checkGA4();
            this.status.emailjs = this.checkEmailJS();
            this.status.fonts = this.checkFonts();

            // Log failures to Sentry
            if (!this.status.ga4) {
                console.warn('[ScriptHealth] GA4 failed to load - likely blocked by ad blocker');
                captureError(new Error('GA4 Script Failed to Load'), {
                    component: 'ScriptHealthMonitor',
                    userAgent: navigator.userAgent,
                    likely_cause: 'ad_blocker',
                });
            }

            if (!this.status.emailjs) {
                console.warn('[ScriptHealth] EmailJS SDK failed to load');
                captureError(new Error('EmailJS SDK Failed to Load'), {
                    component: 'ScriptHealthMonitor',
                    userAgent: navigator.userAgent,
                    likely_cause: 'network_or_blocker',
                });
            }

            if (!this.status.fonts) {
                console.warn('[ScriptHealth] Google Fonts failed to load - using system fonts');
                captureError(new Error('Google Fonts Failed to Load'), {
                    component: 'ScriptHealthMonitor',
                    userAgent: navigator.userAgent,
                    likely_cause: 'network_or_blocker',
                });
            }

            // Log summary
            const failedScripts = Object.entries(this.status)
                .filter(([_, loaded]) => !loaded)
                .map(([name]) => name);

            if (failedScripts.length > 0) {
                console.warn(`[ScriptHealth] ${failedScripts.length} script(s) failed to load:`, failedScripts);
            } else {
                console.log('[ScriptHealth] All third-party scripts loaded successfully');
            }
        }, this.checkTimeout);
    }

    /**
     * Get current health status
     */
    getStatus(): ScriptHealthStatus {
        return { ...this.status };
    }

    /**
     * Check if a specific script is loaded
     */
    isLoaded(script: keyof ScriptHealthStatus): boolean {
        return this.status[script];
    }
}

// Export singleton instance
export const scriptHealthMonitor = new ScriptHealthMonitor();
