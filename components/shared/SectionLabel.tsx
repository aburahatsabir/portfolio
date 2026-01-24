import React from 'react';

export interface SectionLabelProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'success' | 'muted';
    className?: string;
    as?: 'span' | 'h2' | 'h3' | 'h4' | 'h5' | 'p';
}

/**
 * SectionLabel - Shared component for consistent section labels and headings
 * 
 * Design token for the ubiquitous "text-[10px] font-black uppercase tracking-[0.Xem]" pattern
 * 
 * @param children - Label text
 * @param variant - Color variant (primary=blue-600, secondary=slate-400, success=emerald-600, muted=slate-500)
 * @param className - Additional CSS classes
 * @param as - HTML element to render (default: span)
 */
const SectionLabel: React.FC<SectionLabelProps> = ({
    children,
    variant = 'primary',
    className = '',
    as: Component = 'span'
}) => {
    // Variant color classes
    const variantClasses = {
        primary: 'text-blue-600',
        secondary: 'text-slate-400',
        success: 'text-emerald-600',
        muted: 'text-slate-500'
    };

    return (
        <Component
            className={`
        text-[10px] font-black uppercase tracking-[0.4em]
        ${variantClasses[variant]}
        ${className}
      `}
        >
            {children}
        </Component>
    );
};

export default SectionLabel;
