import React from 'react';
import { motion } from 'framer-motion';

export interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    subtitle?: string;
    badge?: string;
    variant?: 'default' | 'compact' | 'feature';
    showPattern?: boolean;
    animationDelay?: number;
    hoverEffect?: 'shadow' | 'border' | 'lift';
}

/**
 * BentoCard - Shared card component for consistent styling across the application
 * 
 * @param children - Card content
 * @param className - Additional CSS classes
 * @param title - Optional card title
 * @param subtitle - Optional subtitle/label above title
 * @param badge - Optional badge text
 * @param variant - Styling variant (default, compact, feature)
 * @param showPattern - Show background dot pattern (default: true)
 * @param animationDelay - Framer Motion animation delay in seconds
 * @param hoverEffect - Type of hover effect to apply
 */
const BentoCard: React.FC<BentoCardProps> = ({
    children,
    className = '',
    title,
    subtitle,
    badge,
    variant = 'default',
    showPattern = true,
    animationDelay = 0,
    hoverEffect = 'shadow'
}) => {
    // Variant-specific padding
    const paddingClasses = {
        default: 'p-10',
        compact: 'p-8 md:p-10',
        feature: 'p-10 md:p-12'
    };

    // Hover effect classes
    const hoverClasses = {
        shadow: 'hover:shadow-xl',
        border: 'hover:border-blue-600/30 hover:shadow-2xl hover:shadow-blue-900/5',
        lift: 'hover:shadow-[0_30px_60px_-15px_rgba(15,23,42,0.05)] hover:-translate-y-1'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.8,
                delay: animationDelay,
                ease: [0.16, 1, 0.3, 1]
            }}
            className={`
        bg-white border border-slate-100 rounded-[2.5rem] 
        ${paddingClasses[variant]}
        shadow-sm ${hoverClasses[hoverEffect]}
        transition-all duration-500 
        group relative overflow-hidden flex flex-col
        ${className}
      `}
        >
            {/* Background Pattern */}
            {showPattern && (
                <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
            )}

            {/* Content Container */}
            <div className="relative z-10">
                {/* Badge */}
                {badge && (
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[8px] font-black uppercase tracking-widest mb-6 border border-blue-100">
                        {badge}
                    </span>
                )}

                {/* Title Section */}
                {title && (
                    <div className="mb-8">
                        {subtitle && (
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">
                                {subtitle}
                            </p>
                        )}
                        <h4 className="text-2xl font-black text-slate-900 tracking-tight">
                            {title}
                        </h4>
                    </div>
                )}

                {/* Children Content */}
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </motion.div>
    );
};

export default BentoCard;
