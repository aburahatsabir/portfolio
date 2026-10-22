
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

type SurfaceTone = 'light' | 'dark';

const REVEAL_AFTER_SCROLL_PX = 520;

const hasMeaningfulScrollRange = () => {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const pageHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    const scrollableDistance = pageHeight - viewportHeight;

    return scrollableDistance >= REVEAL_AFTER_SCROLL_PX;
};

const getColorParts = (color: string) => {
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (!match) return null;

    return {
        r: Number(match[1]),
        g: Number(match[2]),
        b: Number(match[3]),
        a: match[4] === undefined ? 1 : Number(match[4]),
    };
};

const getRelativeLuminance = ({ r, g, b }: { r: number; g: number; b: number }) => {
    const [red, green, blue] = [r, g, b].map((channel) => {
        const normalized = channel / 255;
        return normalized <= 0.03928
            ? normalized / 12.92
            : Math.pow((normalized + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [surfaceTone, setSurfaceTone] = useState<SurfaceTone>('light');
    const buttonShellRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();
    
    // Smooth spring for the progress path
    const pathLength = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const updateSurfaceTone = useCallback(() => {
        const buttonShell = buttonShellRef.current;
        if (!buttonShell) return;

        const rect = buttonShell.getBoundingClientRect();
        const samplePoints = [
            [rect.left + rect.width / 2, rect.top + rect.height / 2],
            [rect.left + 8, rect.top + 8],
            [rect.right - 8, rect.bottom - 8],
        ];

        for (const [x, y] of samplePoints) {
            const elements = document.elementsFromPoint(x, y);

            for (const element of elements) {
                if (!(element instanceof HTMLElement) || buttonShell.contains(element)) continue;

                let current: HTMLElement | null = element;
                while (current) {
                    const background = getColorParts(window.getComputedStyle(current).backgroundColor);

                    if (background && background.a > 0.05) {
                        setSurfaceTone(getRelativeLuminance(background) < 0.42 ? 'dark' : 'light');
                        return;
                    }

                    current = current.parentElement;
                }
            }
        }

        setSurfaceTone('light');
    }, []);

    useEffect(() => {
        const toggleVisibility = () => {
            if (hasMeaningfulScrollRange() && window.scrollY > REVEAL_AFTER_SCROLL_PX) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        const resizeObserver =
            typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(toggleVisibility);

        toggleVisibility();
        resizeObserver?.observe(document.body);
        window.addEventListener('scroll', toggleVisibility, { passive: true });
        window.addEventListener('resize', toggleVisibility);
        window.addEventListener('load', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
            window.removeEventListener('resize', toggleVisibility);
            window.removeEventListener('load', toggleVisibility);
            resizeObserver?.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let animationFrame = 0;

        const scheduleSurfaceToneUpdate = () => {
            window.cancelAnimationFrame(animationFrame);
            animationFrame = window.requestAnimationFrame(updateSurfaceTone);
        };

        scheduleSurfaceToneUpdate();
        window.addEventListener('scroll', scheduleSurfaceToneUpdate, { passive: true });
        window.addEventListener('resize', scheduleSurfaceToneUpdate);

        return () => {
            window.cancelAnimationFrame(animationFrame);
            window.removeEventListener('scroll', scheduleSurfaceToneUpdate);
            window.removeEventListener('resize', scheduleSurfaceToneUpdate);
        };
    }, [isVisible, updateSurfaceTone]);

    const scrollToTop = () => {
        const lenis = window.__lenis;

        if (lenis) {
            lenis.scrollTo(0, {
                force: true,
                lock: true,
                duration: 0.9,
                onComplete: () => {
                    setIsVisible(false);
                },
            });
            return;
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    ref={buttonShellRef}
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
                        <div
                            className="relative flex items-center justify-center w-[54px] h-[54px] backdrop-blur-3xl border rounded-full overflow-hidden"
                            style={{
                                backgroundColor:
                                    surfaceTone === 'dark' ? 'rgba(255, 255, 255, 0.86)' : 'rgba(15, 23, 42, 0.92)',
                                borderColor:
                                    surfaceTone === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(15, 23, 42, 0.28)',
                                boxShadow:
                                    surfaceTone === 'dark'
                                        ? '0 20px 50px rgba(0, 0, 0, 0.45)'
                                        : '0 20px 50px rgba(15, 23, 42, 0.25)',
                            }}
                        >
                            {/* Noise Texture Background */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/images/effects/noise.svg')]" />
                            
                            <ChevronUp
                                className="relative z-10 w-5 h-5 stroke-[2]"
                                style={{ color: surfaceTone === 'dark' ? '#0f172a' : '#ffffff' }}
                            />

                            {/* Liquid Progress Path */}
                            <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute top-0 left-0 w-full h-full -rotate-90 pointer-events-none scale-[1.05]">
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="47.5"
                                    fill="none"
                                    strokeWidth="2"
                                    stroke={surfaceTone === 'dark' ? 'rgba(15, 23, 42, 0.18)' : 'rgba(255, 255, 255, 0.24)'}
                                />
                                <motion.circle
                                    cx="50"
                                    cy="50"
                                    r="47.5"
                                    fill="none"
                                    strokeWidth="2.25"
                                    style={{ pathLength }}
                                    strokeLinecap="round"
                                    stroke={surfaceTone === 'dark' ? '#0f172a' : '#ffffff'}
                                    className="opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                            </svg>
                        </div>

                        {/* Interactive Elevation Glow */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl -z-10"
                            style={{
                                backgroundColor:
                                    surfaceTone === 'dark' ? 'rgba(255, 255, 255, 0.28)' : 'rgba(15, 23, 42, 0.22)',
                            }}
                        />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
