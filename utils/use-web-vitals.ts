import { useEffect, useState } from 'react';

interface WebVitalMetric {
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
    timestamp: number;
}

interface WebVitalsData {
    LCP?: WebVitalMetric;
    FID?: WebVitalMetric;
    CLS?: WebVitalMetric;
    FCP?: WebVitalMetric;
    TTFB?: WebVitalMetric;
    INP?: WebVitalMetric;
}

/**
 * Hook to access Core Web Vitals metrics from sessionStorage
 * 
 * Usage:
 * ```tsx
 * const vitals = useWebVitals();
 * console.log('LCP:', vitals.LCP?.value);
 * ```
 */
export function useWebVitals(): WebVitalsData {
    const [vitals, setVitals] = useState<WebVitalsData>({});

    useEffect(() => {
        // Load initial metrics
        try {
            const stored = sessionStorage.getItem('web-vitals');
            if (stored) {
                setVitals(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Failed to load web vitals:', error);
        }

        // Listen for storage changes (when new metrics are reported)
        const handleStorageChange = () => {
            try {
                const stored = sessionStorage.getItem('web-vitals');
                if (stored) {
                    setVitals(JSON.parse(stored));
                }
            } catch (error) {
                console.error('Failed to load web vitals:', error);
            }
        };

        // Poll for updates every 2 seconds
        const interval = setInterval(handleStorageChange, 2000);

        return () => clearInterval(interval);
    }, []);

    return vitals;
}

/**
 * Get current Core Web Vitals metrics synchronously
 */
export function getWebVitals(): WebVitalsData {
    try {
        const stored = sessionStorage.getItem('web-vitals');
        return stored ? JSON.parse(stored) : {};
    } catch (error) {
        return {};
    }
}

/**
 * Get performance summary with grades
 */
export function getPerformanceSummary() {
    const vitals = getWebVitals();

    const metrics = [
        { name: 'LCP', label: 'Largest Contentful Paint', unit: 'ms', data: vitals.LCP },
        { name: 'FID', label: 'First Input Delay', unit: 'ms', data: vitals.FID },
        { name: 'CLS', label: 'Cumulative Layout Shift', unit: '', data: vitals.CLS },
        { name: 'FCP', label: 'First Contentful Paint', unit: 'ms', data: vitals.FCP },
        { name: 'TTFB', label: 'Time to First Byte', unit: 'ms', data: vitals.TTFB },
        { name: 'INP', label: 'Interaction to Next Paint', unit: 'ms', data: vitals.INP },
    ];

    const goodCount = metrics.filter(m => m.data?.rating === 'good').length;
    const totalCount = metrics.filter(m => m.data).length;

    const overallGrade = totalCount === 0
        ? 'No data'
        : goodCount / totalCount >= 0.75
            ? 'Good'
            : goodCount / totalCount >= 0.5
                ? 'Needs Improvement'
                : 'Poor';

    return {
        metrics,
        overallGrade,
        goodCount,
        totalCount,
    };
}
