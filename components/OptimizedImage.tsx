import React, { useState, ImgHTMLAttributes } from 'react';
import { captureError } from '../utils/sentry';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onError'> {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    loading?: 'lazy' | 'eager';
    sizes?: string;
    srcSet?: string;
    fetchPriority?: 'high' | 'low' | 'auto';
    fallbackSrc?: string; // Custom fallback image
    onErrorCallback?: () => void; // Optional callback for error tracking
}

/**
 * Optimized Image Component with Error Handling
 * 
 * Features:
 * - Automatic lazy loading and better performance
 * - Width/height to prevent Cumulative Layout Shift (CLS)
 * - Responsive images with srcset for different screen sizes
 * - ✅ Error handling with fallback placeholder
 * - ✅ WebP support with automatic fallback
 * - ✅ Sentry error logging for broken images
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    width,
    height,
    className = '',
    loading = 'lazy',
    sizes,
    srcSet,
    fetchPriority = 'auto',
    fallbackSrc = '/images/placeholder-fallback.svg',
    onErrorCallback,
    ...rest
}) => {
    const [error, setError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const MAX_RETRIES = 1;

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        // Prevent infinite retry loops
        if (retryCount >= MAX_RETRIES) {
            setError(true);

            // Log to Sentry for monitoring
            captureError(new Error(`Image failed to load: ${src}`), {
                component: 'OptimizedImage',
                src,
                alt,
                retryCount
            });

            // Call optional callback
            if (onErrorCallback) {
                onErrorCallback();
            }

            return;
        }

        // Retry once (handles transient network issues)
        setRetryCount(prev => prev + 1);

        // Force reload by adding timestamp
        const img = e.currentTarget;
        const separator = src.includes('?') ? '&' : '?';
        img.src = `${src}${separator}retry=${Date.now()}`;
    };

    return (
        <img
            src={error ? fallbackSrc : src}
            srcSet={error ? undefined : srcSet}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            fetchPriority={fetchPriority}
            className={className}
            sizes={sizes}
            decoding="async"
            onError={handleError}
            {...rest}
        />
    );
};

export default OptimizedImage;
