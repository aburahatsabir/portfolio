import React, { lazy, Suspense, ComponentType } from 'react';

/**
 * Loading fallback component
 * Provides a smooth loading experience while lazy components load
 */
export const LoadingFallback: React.FC<{ minHeight?: string }> = ({ minHeight = '400px' }) => (
    <div
        className="flex items-center justify-center"
        style={{ minHeight }}
    >
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-slate-400 animate-pulse">Loading...</p>
        </div>
    </div>
);

/**
 * Minimal loading fallback for quick transitions
 */
export const MinimalLoadingFallback: React.FC = () => (
    <div className="flex items-center justify-center min-h-[200px]">
        <div className="w-8 h-8 border-3 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
);

/**
 * Page loading fallback with full height
 */
export const PageLoadingFallback: React.FC = () => (
    <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-base font-semibold text-slate-500 animate-pulse">Loading page...</p>
        </div>
    </div>
);

/**
 * Lazy load a component with Suspense wrapper
 * 
 * @param importFunc - Dynamic import function
 * @param fallback - Optional custom fallback component
 * @returns Component wrapped with Suspense
 * 
 * @example
 * const MyComponent = lazyLoad(() => import('./MyComponent'));
 */
export function lazyLoad<T extends ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>,
    fallback: React.ReactNode = <LoadingFallback />
) {
    const LazyComponent = lazy(importFunc);

    return (props: React.ComponentProps<T>) => (
        <Suspense fallback={fallback}>
            <LazyComponent {...props} />
        </Suspense>
    );
}

/**
 * Lazy load with minimal fallback (for quick transitions)
 */
export function lazyLoadMinimal<T extends ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>
) {
    return lazyLoad(importFunc, <MinimalLoadingFallback />);
}

/**
 * Lazy load with page fallback (for full page routes)
 */
export function lazyLoadPage<T extends ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>
) {
    return lazyLoad(importFunc, <PageLoadingFallback />);
}

/**
 * Preload a lazy component
 * Useful for prefetching on hover or scroll proximity
 * 
 * @example
 * const MyComponent = lazy(() => import('./MyComponent'));
 * preloadComponent(() => import('./MyComponent'));
 */
export function preloadComponent(importFunc: () => Promise<any>) {
    importFunc();
}
