

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import BentoCard from './shared/BentoCard';
import SectionLabel from './shared/SectionLabel';
import OptimizedImage from './OptimizedImage';
import { Testimonial } from '../types';

const LinkedInIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const EndorsementCard: React.FC<{ testimonial: Testimonial, index: number }> = ({ testimonial, index }) => {
  return (
    <BentoCard
      variant="compact"
      hoverEffect="lift"
      animationDelay={index * 0.1}
      showPattern={false}
      className="flex-none w-full md:w-[400px] snap-start h-full bg-white border border-slate-200/60 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:border-slate-300/80 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-visible"
    >
      <div className="flex flex-col h-full relative p-6">
        {/* Floating Quote Icon - More subtle and premium */}
        <div className="absolute -top-4 -right-1 text-blue-600/5 pointer-events-none group-hover:text-blue-600/8 transition-colors duration-700">
          <svg className="w-20 h-20 rotate-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.89543 14.9124 3 16.017 3H19.017C21.2261 3 23.017 4.79086 23.017 7V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM1.017 21L1.017 18C1.017 16.8954 1.91243 16 3.017 16H6.017C6.56928 16 7.017 15.5523 7.017 15V9C7.017 8.44772 6.56928 8 6.017 8H3.017C1.91243 8 1.017 7.10457 1.017 6V5C1.017 3.89543 1.91243 3 3.017 3H6.017C8.22614 3 10.017 4.79086 10.017 7V15C10.017 18.3137 7.33071 21 4.017 21H1.017Z" />
          </svg>
        </div>

        {/* Quote Content */}
        <div className="flex-1 mb-8">
          <p className="text-lg font-medium text-slate-900 leading-relaxed tracking-tight relative z-10 antialiased">
            <span className="text-blue-600/20 mr-1.5 font-serif text-2xl italic">"</span>
            {testimonial.content}
            <span className="text-blue-600/20 ml-1.5 font-serif text-2xl italic">"</span>
          </p>
        </div>

        {/* Footer */}
        <footer className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative group/avatar">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200/50 bg-slate-50 relative z-10 shadow-sm ring-2 ring-white group-hover/avatar:ring-blue-50 transition-all duration-300">
                <OptimizedImage
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover grayscale-[0.3] group-hover/avatar:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-slate-900 rounded-md flex items-center justify-center text-white z-20 shadow-sm ring-2 ring-white group-hover/avatar:bg-blue-600 transition-colors duration-300">
                <LinkedInIcon />
              </div>
            </div>

            {/* Name and Position */}
            <div className="flex flex-col gap-1">
              {testimonial.linkedInProfile ? (
                <a
                  href={testimonial.linkedInProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors leading-tight"
                >
                  {testimonial.name}
                </a>
              ) : (
                <h4 className="text-sm font-bold text-slate-900 leading-tight">{testimonial.name}</h4>
              )}

              {testimonial.companyLinkedIn ? (
                <a
                  href={testimonial.companyLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider hover:text-blue-600 transition-colors"
                >
                  {testimonial.position}
                </a>
              ) : (
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{testimonial.position}</p>
              )}
            </div>
          </div>
        </footer>
      </div>
    </BentoCard>
  );
};

const BrandLogo: React.FC<{ name: string; logo: string }> = ({ name, logo }) => (
  <div className="flex items-center justify-center px-10 shrink-0 group/logo cursor-default">
    <div className="h-10 md:h-12 flex items-center justify-center opacity-20 group-hover/logo:opacity-100 transition-all duration-700 grayscale group-hover/logo:grayscale-0 scale-90 group-hover/logo:scale-100">
      <OptimizedImage
        src={logo}
        alt={name}
        width={160}
        height={48}
        className="h-full w-auto object-contain max-w-[160px] filter drop-shadow-sm"
        loading="lazy"
      />
    </div>
  </div>
);

const Endorsements: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const displayedTestimonials = showAll ? TESTIMONIALS : TESTIMONIALS.slice(0, 3);

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
      const cardWidth = 400; // Consistent card width
      const gap = 24; // gap-6 = 24px
      const scrollAmount = cardWidth + gap;
      const { scrollLeft } = scrollRef.current;

      const scrollTo = direction === 'left'
        ? scrollLeft - scrollAmount
        : scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  }, []);

  const brands = [
    { name: 'Prominent Tec', logo: './images/logos/logo-prominent-tec.webp' },
    { name: 'Texicon BD', logo: './images/logos/logo-texicon-bd.webp' },
    { name: 'Greenotex', logo: './images/logos/logo-greenotex.webp' },
    { name: 'Greenosoft', logo: './images/logos/logo-greenosoft.webp' },
  ];

  const marqueeBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section id="endorsements" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <div className="max-w-3xl space-y-10">
            <div className="flex items-center gap-4">
              <SectionLabel>Executive Endorsements</SectionLabel>
              <div className="h-px bg-slate-100 flex-1"></div>
            </div>

            <div className="space-y-8">
              <h2 className="text-5xl md:text-8xl font-[900] tracking-tighter leading-[0.92] text-slate-900">
                Executive <br />
                <span className="text-slate-400">Validation.</span>
              </h2>

              <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-2xl">
                Strategic impact and operational excellence validated by <br className="hidden md:block" />
                C-suite leaders across the enterprise ecosystems.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pb-2">
            <button
              type="button"
              onClick={() => { scroll('left'); setIsPaused(true); }}
              disabled={!canScrollLeft}
              className={`group relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${canScrollLeft
                ? 'bg-white border border-slate-200 text-slate-700 shadow-sm hover:border-slate-300 hover:shadow-md hover:scale-105 active:scale-95'
                : 'bg-slate-50 border border-slate-100 text-slate-300 cursor-not-allowed'
                }`}
              aria-label="Scroll left"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              type="button"
              onClick={() => { scroll('right'); setIsPaused(true); }}
              disabled={!canScrollRight}
              className={`group relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${canScrollRight
                ? 'bg-white border border-slate-200 text-slate-700 shadow-sm hover:border-slate-300 hover:shadow-md hover:scale-105 active:scale-95'
                : 'bg-slate-50 border border-slate-100 text-slate-300 cursor-not-allowed'
                }`}
              aria-label="Scroll right"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </header>

        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto pb-12 hide-scrollbar snap-x snap-mandatory scroll-smooth -mx-6 px-6"
        >
          {displayedTestimonials.map((testimonial, idx) => (
            <EndorsementCard key={idx} testimonial={testimonial} index={idx} />
          ))}
        </div>

        {/* Show More/Less Button */}
        {TESTIMONIALS.length > 3 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group relative px-10 py-5 bg-white border border-slate-200 rounded-2xl text-slate-900 font-bold text-sm shadow-sm hover:border-slate-300 hover:shadow-md hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center gap-3 tracking-tight"
            >
              <span>{showAll ? 'Collapse' : `View All ${TESTIMONIALS.length} Endorsements`}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 group-hover:text-blue-600 ${showAll ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="3"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {/* Minimal Brand Credits */}
        <div className="mt-24 pt-16 border-t border-slate-50 -mx-6 relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="overflow-hidden">
            <motion.div
              className="flex items-center gap-16 px-6"
              animate={{ x: [0, -1920] }}
              transition={{
                duration: 60,
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
