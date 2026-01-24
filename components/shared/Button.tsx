import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    loading?: boolean;
    href?: string;
    className?: string;
}

/**
 * Button - Shared button component for consistent styling across the application
 * 
 * @param children - Button content
 * @param variant - Style variant (primary, secondary, accent, ghost, outline)
 * @param size - Button size (sm, md, lg)
 * @param fullWidth - Make button full width
 * @param loading - Show loading state
 * @param disabled - Disable button
 * @param href - If provided, renders as link
 * @param className - Additional CSS classes
 */
const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    disabled = false,
    href,
    className = '',
    type = 'button',
    ...props
}) => {
    // Base classes
    const baseClasses = `
    inline-flex items-center justify-center gap-3
    font-black uppercase tracking-[0.2em]
    rounded-xl transition-all
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
  `;

    // Variant classes
    const variantClasses = {
        primary: `
      bg-slate-900 text-white
      hover:bg-blue-600
      focus:ring-blue-600
      shadow-xl shadow-slate-900/10
      active:scale-95
    `,
        secondary: `
      bg-white text-slate-900
      border border-slate-200
      hover:bg-slate-50
      focus:ring-slate-300
      shadow-sm
    `,
        accent: `
      bg-blue-600 text-white
      hover:bg-blue-700
      focus:ring-blue-600
      shadow-xl shadow-blue-900/20
      active:scale-95
    `,
        ghost: `
      bg-transparent text-slate-600
      hover:bg-slate-50
      focus:ring-slate-300
    `,
        outline: `
      bg-transparent text-slate-900
      border border-slate-300
      hover:bg-slate-50
      focus:ring-slate-300
    `
    };

    // Size classes
    const sizeClasses = {
        sm: 'px-6 py-2.5 text-[9px]',
        md: 'px-8 py-4 text-[10px]',
        lg: 'px-10 py-5 text-[11px]'
    };

    const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

    // Loading spinner
    const LoadingSpinner = () => (
        <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    );

    // Render as link if href is provided
    if (href) {
        return (
            <a
                href={href}
                className={combinedClasses}
                aria-disabled={disabled || loading}
                {...(props as any)}
            >
                {loading && <LoadingSpinner />}
                {children}
            </a>
        );
    }

    // Render as button
    return (
        <button
            type={type}
            className={combinedClasses}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <LoadingSpinner />}
            {children}
        </button>
    );
};

export default Button;
