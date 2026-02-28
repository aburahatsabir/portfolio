import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
  as?: 'span' | 'h2' | 'h3' | 'h4' | 'h5' | 'p';
  tracking?: 'tight' | 'normal' | 'wide' | 'wider' | 'widest';
  color?: 'blue-600' | 'blue-500' | 'blue-400' | 'slate-400';
  className?: string;
}

/**
 * SectionLabel: Standardized label for section headers and metadata
 * 
 * Encapsulates the repeated pattern:
 * - text-[10px]
 * - font-black
 * - uppercase
 * - tracking (0.2em, 0.3em, 0.4em, 0.5em variants)
 * - text-blue-600 (default)
 * 
 * Usage:
 * <SectionLabel>Core Expertise</SectionLabel>
 * <SectionLabel as="h3" tracking="wider">The Architecture</SectionLabel>
 * <SectionLabel color="blue-400">Governance-as-Code</SectionLabel>
 */
const SectionLabel = ({
  children,
  as: Component = 'span',
  tracking = 'normal',
  color = 'blue-600',
  className = '',
}: SectionLabelProps) => {
  const trackingMap = {
    tight: 'tracking-[0.2em]',
    normal: 'tracking-[0.3em]',
    wide: 'tracking-[0.4em]',
    wider: 'tracking-[0.5em]',
    widest: 'tracking-[0.6em]',
  };

  const colorMap = {
    'blue-600': 'text-blue-600',
    'blue-500': 'text-blue-500',
    'blue-400': 'text-blue-400',
    'slate-400': 'text-slate-400',
  };

  const baseClasses = `
    text-[10px] font-black uppercase ${trackingMap[tracking]} ${colorMap[color]}
    transition-colors duration-500
    ${className}
  `.trim();

  return React.createElement(Component, { className: baseClasses }, children);
};

export default SectionLabel;
