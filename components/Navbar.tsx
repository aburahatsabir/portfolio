
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './shared/Button';
import SocialLinks from './shared/SocialLinks';
import { trackResumeDownload } from '../utils/analytics';


const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '#/' },
    { name: 'About', path: '#/about' },
    { name: 'Work', path: '#/work' },
    { name: 'Solutions', path: '#/solutions' },
    { name: 'Contact', path: '#/contact' },
  ];

  const resumeUrl = "/AbuRahatSabir-Resume.pdf";

  const handleResumeClick = (source: string) => {
    trackResumeDownload(source);

    // Detect if mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Mobile: Just download
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.download = 'AbuRahatSabir-Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Desktop: Open in new tab AND download
      window.open(resumeUrl, '_blank');

      // Also trigger download
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.download = 'AbuRahatSabir-Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 100);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[300] transition-all duration-500 ${isScrolled || isOpen ? 'glass-nav border-b border-slate-100 py-4 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#/" className="flex items-center gap-4 group z-[310]" onClick={handleLinkClick}>
            <div className="w-11 h-11 bg-slate-900 text-white rounded-[1.25rem] flex items-center justify-center font-black group-hover:rotate-[10deg] transition-all shadow-xl group-hover:bg-blue-600">AR</div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-slate-900 leading-none">ABU RAHAT SABIR</span>
              <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest mt-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                Executive Admin & Automation
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.path}
                className="group relative text-[11px] font-black text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-[0.25em] py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 ease-out group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleResumeClick('navbar_top');
              }}
              className="hidden sm:flex items-center gap-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] px-8 py-4 rounded-xl hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
            >

              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Resume (PDF)
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 z-[310] relative focus:outline-none"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <motion.span
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-slate-900 rounded-full block transition-transform"
              />
              <motion.span
                animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                className="w-6 h-0.5 bg-slate-900 rounded-full block transition-all"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-slate-900 rounded-full block transition-transform"
              />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            aria-hidden={!isOpen}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[250] bg-white lg:hidden overflow-y-auto"
          >
            <div className="pt-32 pb-12 px-8 flex flex-col min-h-screen">
              <div className="flex-1 space-y-8">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-8">Navigation Menu</p>

                <div className="flex flex-col gap-6">
                  {navLinks.map((link, idx) => (
                    <motion.a
                      key={link.name}
                      href={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      onClick={handleLinkClick}
                      className="group flex items-center justify-between py-2 border-b border-slate-50"
                    >
                      <div className="flex items-center gap-6">
                        <span className="text-[10px] font-black text-slate-300 group-hover:text-blue-600 transition-colors">0{idx + 1}</span>
                        <span className="text-3xl font-[900] text-slate-900 tracking-tighter group-hover:text-blue-600 transition-colors uppercase">
                          {link.name}
                        </span>
                      </div>
                      <svg className="w-6 h-6 text-slate-200 group-hover:text-blue-600 transition-all group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="mt-12 space-y-8">
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Credentials</p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick();
                      handleResumeClick('mobile_menu');
                    }}
                    className="w-full py-6 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-4 text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-900/10 active:scale-95 transition-all"
                  >

                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                    Download CV
                  </button>
                </div>

                <div className="flex justify-between items-center text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  <span>© 2025 Abu Rahat Sabir</span>
                  <SocialLinks variant="text" platforms={['linkedin', 'github']} />
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.02] text-[40vw] font-black pointer-events-none select-none">
              ARS
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
