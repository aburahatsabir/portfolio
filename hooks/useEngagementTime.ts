/**
 * Engagement Time Tracker Hook
 * Tracks how long users spend on each page
 */

import { useEffect, useRef } from 'react';
import { trackEngagementTime } from '../utils/analytics';

export const useEngagementTime = (pagePath: string) => {
    const startTimeRef = useRef<number>(Date.now());
    const reportedRef = useRef<boolean>(false);

    useEffect(() => {
        // Reset timer when page changes
        startTimeRef.current = Date.now();
        reportedRef.current = false;

        // Track engagement time when user leaves the page
        const handleBeforeUnload = () => {
            if (!reportedRef.current) {
                const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
                if (timeSpent > 5) { // Only track if spent more than 5 seconds
                    trackEngagementTime(pagePath, timeSpent);
                    reportedRef.current = true;
                }
            }
        };

        // Track engagement at intervals (every 30 seconds)
        const interval = setInterval(() => {
            const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
            if (timeSpent > 0 && timeSpent % 30 === 0) {
                trackEngagementTime(pagePath, timeSpent);
            }
        }, 30000);

        // Track when user switches tabs or minimizes window
        const handleVisibilityChange = () => {
            if (document.hidden && !reportedRef.current) {
                const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
                if (timeSpent > 5) {
                    trackEngagementTime(pagePath, timeSpent);
                    reportedRef.current = true;
                }
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            // Final tracking on unmount
            if (!reportedRef.current) {
                const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
                if (timeSpent > 5) {
                    trackEngagementTime(pagePath, timeSpent);
                }
            }

            window.removeEventListener('beforeunload', handleBeforeUnload);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            clearInterval(interval);
        };
    }, [pagePath]);
};
