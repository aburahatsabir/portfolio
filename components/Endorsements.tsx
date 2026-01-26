
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import BentoCard from './shared/BentoCard';
import SectionLabel from './shared/SectionLabel';

const EndorsementCard: React.FC<{ testimonial: any, index: number }> = ({ testimonial, index }) => {
  return (
    <BentoCard
      variant="compact"
      hoverEffect="border"
      animationDelay={index * 0.05}
      showPattern={false}
      className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)] snap-start h-full"
    >
      <div className="flex-1 mb-12">
        <div className="text-blue-600/20 mb-6 group-hover:text-blue-600/40 transition-colors">
          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.89543 14.9124 3 16.017 3H19.017C21.2261 3 23.017 4.79086 23.017 7V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM1.017 21L1.017 18C1.017 16.8954 1.91243 16 3.017 16H6.017C6.56928 16 7.017 15.5523 7.017 15V9C7.017 8.44772 6.56928 8 6.017 8H3.017C1.91243 8 1.017 7.10457 1.017 6V5C1.017 3.89543 1.91243 3 3.017 3H6.017C8.22614 3 10.017 4.79086 10.017 7V15C10.017 18.3137 7.33071 21 4.017 21H1.017Z" /></svg>
        </div>
        <p className="text-xl md:text-2xl font-medium text-slate-900 leading-relaxed italic tracking-tight">
          "{testimonial.content}"
        </p>
      </div>

      <footer className="flex items-center gap-5 pt-10 border-t border-slate-50">
        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 grayscale group-hover:grayscale-0 transition-all duration-700 shadow-sm shrink-0">
          <img src={testimonial.avatar} alt={testimonial.name} width={64} height={64} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="text-lg font-black text-slate-900 tracking-tight leading-none mb-1.5">{testimonial.name}</h4>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none">{testimonial.position}</p>
        </div>
      </footer>
    </BentoCard>
  );
};

const BrandLogo: React.FC<{ name: string; icon: React.ReactNode }> = ({ name, icon }) => (
  <div className="flex items-center gap-4 px-12 shrink-0 group/logo cursor-default">
    <div className="w-8 h-8 flex items-center justify-center text-slate-900 group-hover/logo:text-blue-600 transition-colors duration-500">
      {icon}
    </div>
    <span className="text-lg md:text-xl font-[900] tracking-[0.3em] text-slate-950 uppercase whitespace-nowrap">
      {name}
    </span>
  </div>
);

const Endorsements: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, [checkScroll]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      let scrollTo;

      if (direction === 'left') {
        scrollTo = scrollLeft - clientWidth;
        if (scrollTo < 0) scrollTo = scrollWidth - clientWidth;
      } else {
        scrollTo = scrollLeft + clientWidth;
        if (scrollTo >= scrollWidth - 10) scrollTo = 0;
      }

      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => scroll('right'), 6000);
    return () => clearInterval(interval);
  }, [isPaused, scroll]);

  const brands = [
    { name: 'Prominent Tec', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg> },
    { name: 'Greenotex Ltd', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg> },
    { name: 'Modern Accessories', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M15 3v18M3 9h18M3 15h18" /></svg> },
    { name: 'Texicon BD', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><path d="M12 22v-10M12 12L3.5 7M12 12l8.5-5" /></svg> },
  ];

  // Double the brands array for a seamless loop
  const marqueeBrands = [...brands, ...brands, ...brands];

  return (
    <section id="endorsements" className="py-40 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-4">
              <SectionLabel className="tracking-[0.5em]">Institutional Proof</SectionLabel>
              <div className="h-px bg-slate-100 flex-1"></div>
            </div>

            <h2 className="text-6xl md:text-8xl font-[900] tracking-tighter leading-[0.9] text-slate-950">
              Executive <br />
              <span className="text-slate-400">Validation.</span>
            </h2>

            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
              Professional endorsements from leadership stakeholders regarding system reliability and administrative sovereignty.
            </p>
          </div>

          <div className="flex items-center gap-3 pb-2">
            <button
              type="button"
              onClick={() => { scroll('left'); setIsPaused(true); }}
              className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all active:scale-90 ${canScrollLeft ? 'border-slate-200 text-slate-900 hover:bg-slate-50' : 'border-slate-100 text-slate-200 cursor-not-allowed'
                }`}
              aria-label="Scroll left"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              type="button"
              onClick={() => { scroll('right'); setIsPaused(true); }}
              className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all active:scale-90 ${canScrollRight ? 'border-slate-200 text-slate-900 hover:bg-slate-50' : 'border-slate-100 text-slate-200 cursor-not-allowed'
                }`}
              aria-label="Scroll right"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </header>

        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-6 lg:gap-8 overflow-x-auto pb-12 hide-scrollbar snap-x snap-mandatory scroll-smooth -mx-6 px-6"
        >
          {TESTIMONIALS.map((testimonial, idx) => (
            <EndorsementCard key={idx} testimonial={testimonial} index={idx} />
          ))}
        </div>

        {/* Improved Dynamic Association Bar with Infinite Motion */}
        <div className="mt-32 pt-20 border-t border-slate-50 relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="overflow-hidden flex">
            <motion.div
              className="flex items-center py-4 opacity-25 grayscale hover:opacity-100 transition-all duration-1000"
              animate={{ x: [0, -1920] }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {marqueeBrands.map((brand, idx) => (
                <BrandLogo key={idx} {...brand} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Endorsements;
