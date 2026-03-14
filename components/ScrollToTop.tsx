
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollYProgress } = useScroll();
    
    // Smooth spring for the progress path
    const pathLength = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 40 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="fixed bottom-10 right-10 z-[300]"
                >
                    <button
                        onClick={scrollToTop}
                        aria-label="Scroll to top"
                        className="relative group flex items-center justify-center p-0.5 rounded-full overflow-hidden transition-all duration-300 active:scale-90"
                    >
                        {/* Premium: Masked HUD Layer */}
                        <div className="relative flex items-center justify-center w-[54px] h-[54px] bg-white/10 dark:bg-white/5 backdrop-blur-3xl border border-white/30 dark:border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                            {/* Noise Texture Background */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/images/effects/noise.svg')]" />
                            
                            <ChevronUp className="relative z-10 w-5 h-5 text-slate-900 dark:text-white stroke-[2]" />

                            {/* Liquid Progress Path */}
                            <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute top-0 left-0 w-full h-full -rotate-90 pointer-events-none scale-[1.05]">
                                <motion.circle
                                    cx="50"
                                    cy="50"
                                    r="48.5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    style={{ pathLength }}
                                    strokeLinecap="round"
                                    className="text-slate-900 dark:text-white opacity-40 group-hover:opacity-100 transition-opacity"
                                />
                            </svg>
                        </div>

                        {/* Interactive Elevation Glow */}
                        <div className="absolute inset-0 bg-white/20 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl -z-10" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
