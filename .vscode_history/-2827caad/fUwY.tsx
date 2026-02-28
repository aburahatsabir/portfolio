import React from 'react';
import { motion, MotionProps } from 'framer-motion';

interface BentoCardProps extends MotionProps {
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4rem';
  shadow?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  hoverShadow?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  borderColor?: 'slate' | 'blue';
  asMotion?: boolean;
  hover3d?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * BentoCard: Reusable card container component
 * 
 * Encapsulates the common card pattern:
 * - bg-white with border
 * - configurable padding, rounded corners, shadow
 * - optional 3D hover effect
 * 
 * Usage:
 * <BentoCard padding="lg" rounded="2xl">
 *   <h3>Title</h3>
 *   <p>Content</p>
 * </BentoCard>
 */
const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
  ({
    children,
    padding = 'md',
    rounded = 'lg',
    shadow = 'md',
    hoverShadow,
    borderColor = 'slate',
    asMotion = false,
    hover3d = false,
    onClick,
    className = '',
    ...motionProps
  }, ref) => {
    const paddingMap = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-12',
    };

    const roundedMap = {
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      '2xl': 'rounded-2xl',
      '3xl': 'rounded-3xl',
      '4rem': 'rounded-[4rem]',
    };

    const shadowMap = {
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
      '2xl': 'shadow-2xl',
    };

    const hoverShadowMap = {
      sm: 'hover:shadow-sm',
      md: 'hover:shadow-md',
      lg: 'hover:shadow-lg',
      xl: 'hover:shadow-xl',
      '2xl': 'hover:shadow-2xl',
    };

    const borderColorMap = {
      slate: 'border-slate-200',
      blue: 'border-blue-200',
    };

    const baseClasses = `
      bg-white border ${borderColorMap[borderColor]}
      ${paddingMap[padding]} ${roundedMap[rounded]} ${shadowMap[shadow]}
      ${hoverShadow ? hoverShadowMap[hoverShadow] : ''}
      ${hover3d ? 'hover:shadow-2xl transition-all duration-300 hover:-translate-y-1' : ''}
      ${className}
    `.trim();

    const Component = asMotion ? motion.div : 'div';

    return (
      <Component
        ref={ref}
        className={baseClasses}
        onClick={onClick}
        {...(asMotion && {
          whileHover: hover3d ? { y: -4, transition: { duration: 0.3 } } : {},
          ...motionProps,
        })}
      >
        {children}
      </Component>
    );
  }
);

BentoCard.displayName = 'BentoCard';

export default BentoCard;
