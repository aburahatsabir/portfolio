import React from 'react';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    loading?: 'lazy' | 'eager';
    sizes?: string;
}

/**
 * Optimized Image Component
 * Provides automatic lazy loading and better performance
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    className = '',
    loading = 'lazy',
    sizes
}) => {
    return (
        <img
            src={src}
            alt={alt}
            loading={loading}
            className={className}
            sizes={sizes}
            decoding="async"
        />
    );
};

export default OptimizedImage;
