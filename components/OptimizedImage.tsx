import React from 'react';

interface OptimizedImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    loading?: 'lazy' | 'eager';
    sizes?: string;
}

/**
 * Optimized Image Component
 * Provides automatic lazy loading and better performance
 * Includes width/height to prevent Cumulative Layout Shift (CLS)
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    width,
    height,
    className = '',
    loading = 'lazy',
    sizes
}) => {
    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            className={className}
            sizes={sizes}
            decoding="async"
        />
    );
};

export default OptimizedImage;
