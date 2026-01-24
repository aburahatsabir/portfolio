import { useEffect, useRef } from 'react';
import { trackScrollDepth } from '../utils/analytics';

/**
 * Hook to track scroll depth (25%, 50%, 75%, 100%)
 */
export const useScrollDepth = (pageName: string) => {
    const trackedDepths = useRef<Set<number>>(new Set());

    useEffect(() => {
        // Reset tracked depths when page changes
        trackedDepths.current.clear();

        const handleScroll = () => {
            const h = document.documentElement;
            const b = document.body;
            const st = 'scrollTop';
            const sh = 'scrollHeight';

            const scrollPercentage = ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;

            const depths: (25 | 50 | 75 | 100)[] = [25, 50, 75, 100];

            depths.forEach(depth => {
                if (scrollPercentage >= depth && !trackedDepths.current.has(depth)) {
                    trackedDepths.current.add(depth);
                    trackScrollDepth({
                        depth: `${depth}%` as any,
                        page: pageName
                    });
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pageName]);
};
