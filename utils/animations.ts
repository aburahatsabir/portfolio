/**
 * Shared Framer Motion Animation Variants
 * Centralized animation definitions to ensure consistency and reduce bundle size
 * 
 * Usage:
 *   import { fadeIn, staggerContainer } from '../utils/animations';
 *   <motion.div variants={fadeIn} initial="hidden" animate="visible" />
 */

/**
 * Basic fade in animation
 */
export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

/**
 * Fade in with upward movement
 */
export const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' }
    }
};

/**
 * Fade in with slight upward movement (subtle)
 */
export const fadeInUpSubtle = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

/**
 * Fade in with downward movement
 */
export const fadeInDown = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' }
    }
};

/**
 * Fade in with left slide
 */
export const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

/**
 * Fade in with right slide
 */
export const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

/**
 * Scale in animation
 */
export const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: 'easeOut' }
    }
};

/**
 * Stagger container for animating children sequentially
 */
export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

/**
 * Stagger container with faster timing
 */
export const staggerContainerFast = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1
        }
    }
};

/**
 * Hover scale effect (for interactive elements)
 */
export const hoverScale = {
    scale: 1.05,
    transition: { duration: 0.2 }
};

/**
 * Hover lift effect (for cards)
 */
export const hoverLift = {
    y: -5,
    transition: { duration: 0.2 }
};

/**
 * Tap scale effect (for buttons)
 */
export const tapScale = {
    scale: 0.95
};
