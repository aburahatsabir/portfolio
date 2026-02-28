import React from 'react';
import { motion } from 'framer-motion';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  asMotion?: boolean;
  borderColor?: 'slate' | 'blue';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  shadow?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  hoverShadow?: 'md' | 'lg' | 'xl' | '2xl';
  hover3d?: boolean;
  onClick?: () => void;
}

/**
 * BentoCard: Shared container pattern for cards across the portfolio
 * 
 * Encapsulates the repeated pattern:
 * - White background with slate border
 * - Rounded corners (2.5rem default)
 * - Padding (10 default)
 * - Shadow with hover elevation
 * - Smooth transitions
 * 
 * Usage:
 * <BentoCard>
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </BentoCard>
 */
const BentoCard = ({
  children,
  className = '',
  asMotion = false,
  borderColor = 'slate',
  padding = 'lg',
  rounded = '2xl',
  shadow = 'sm',
  hoverShadow = 'xl',
  hover3d = true,
  onClick,
}: BentoCardProps) => {
  const paddingMap = {
    sm: 'p-3',
    md: 'p-6 md:p-8',
    lg: 'p-10 md:p-12',
    xl: 'p-14 md:p-16',
  };

  const roundedMap = {
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-[2.5rem]',
    '3xl': 'rounded-[3rem]',
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
    md: 'hover:shadow-md',
    lg: 'hover:shadow-lg',
    xl: 'hover:shadow-xl',
    '2xl': 'hover:shadow-2xl',
  };

  const borderColorClass = borderColor === 'blue' 
    ? 'border-blue-600/30' 
    : 'border-slate-100';

  const hoverBorderClass = borderColor === 'blue'
    ? 'hover:border-blue-600/50'
    : 'hover:border-blue-600/30';

  const baseClasses = `
    bg-white border ${borderColorClass} ${roundedMap[rounded]}
    ${paddingMap[padding]} ${shadowMap[shadow]}
    ${hoverBorderClass} ${hoverShadowMap[hoverShadow]}
    transition-all duration-700 overflow-hidden
    ${hover3d ? 'hover:scale-105' : ''}
    ${className}
  `.trim();

  const Component = asMotion ? motion.div : 'div';

  return (
    <Component
      className={`group relative flex flex-col h-full ${baseClasses}`}
      onClick={onClick}
      whileHover={asMotion && hover3d ? { scale: 1.05 } : undefined}
    >
      {children}
    </Component>
  );
};

export default BentoCard;
