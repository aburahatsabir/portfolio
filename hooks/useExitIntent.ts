import { useEffect } from 'react';
import { trackCustomEvent } from '../utils/analytics';

/**
 * Hook to detect when user is about to leave the page (exit intent)
 * Tracks mouse movement toward browser close button
 */
export const useExitIntent = (enabled: boolean = true) => {
    useEffect(() => {
        if (!enabled) return;

        let exitIntentFired = false;

        const handleMouseLeave = (e: MouseEvent) => {
            // Only fire once per session
            if (exitIntentFired) return;

            // Check if mouse is leaving from the top of the viewport
            // (indicating user might be going to close tab or navigate away)
            if (e.clientY <= 0) {
                exitIntentFired = true;

                trackCustomEvent('exit_intent', {
                    event_category: 'User Behavior',
                    page: window.location.hash || '#/',
                    time_on_page: Math.round((Date.now() - performance.timing.navigationStart) / 1000)
                });

                console.log('📊 Analytics: Exit Intent Detected');
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [enabled]);
};
