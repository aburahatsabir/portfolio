
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Capabilities from './components/Capabilities';
import AdministrativeRoiFramework from './components/AdministrativeRoiFramework';
import ReliabilityStandards from './components/ReliabilityStandards';
import Work from './components/Work';
import CaseStudyPage from './components/CaseStudyPage';

import PostMortems from './components/PostMortems';
import SuccessStories from './components/SuccessStories';
import BlogSeries from './components/BlogSeries';
import Contact from './components/Contact';
import Footer from './components/Footer';
import About from './components/About';
import ExperienceTimeline from './components/ExperienceTimeline';
import PrivacyPolicy from './components/PrivacyPolicy';
import CookiePolicy from './components/CookiePolicy';
import Endorsements from './components/Endorsements';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import PersonaSpecificContent from './components/PersonaSpecificContent';
import PersonaDirectory from './components/PersonaDirectory';
import PersonaCTA from './components/PersonaCTA';
import PersonaCTABanner from './components/PersonaCTABanner';
import { motion, AnimatePresence } from 'framer-motion';
import { updatePageMetadata, generateFAQSchema, injectSchema, removeSchema } from './utils/seo-utils';
import { trackPageView, trackNavigation, trackError } from './utils/analytics';
import { useScrollDepth } from './hooks/useScrollDepth';
import { useEngagementTime } from './hooks/useEngagementTime';
import AnalyticsDebugger from './components/AnalyticsDebugger';


function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');
  const [previousHash, setPreviousHash] = useState(window.location.hash || '#/');

  // Track scroll depth for the current page
  useScrollDepth(currentHash);

  // Track engagement time for the current page
  useEngagementTime(currentHash);


  useEffect(() => {
    // Update metadata on initial load and hash change
    updatePageMetadata(currentHash);

    // Track page view for current route (runs on mount + change)
    trackPageView({
      route: currentHash,
      title: document.title
    });

    // Track navigation pattern if hash changed
    if (previousHash !== currentHash) {
      trackNavigation(previousHash, currentHash);
      setPreviousHash(currentHash);
    }

    // Inject/remove FAQ schema based on route
    if (currentHash === '#/about') {
      const faqSchema = generateFAQSchema();
      injectSchema(faqSchema, 'faq-schema');
    } else {
      removeSchema('faq-schema');
    }

    const handleHashChange = () => {
      const newHash = window.location.hash || '#/';
      setCurrentHash(newHash);
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentHash]);

  const renderContent = () => {
    if (currentHash.startsWith('#/blog/')) {
      return <BlogSeries />;
    }

    if (currentHash.startsWith('#/work/')) {
      const projectId = currentHash.replace('#/work/', '');
      return <CaseStudyPage projectId={projectId} />;
    }

    if (currentHash.startsWith('#/persona/')) {
      const personaId = currentHash.replace('#/persona/', '');
      return <PersonaSpecificContent personaId={personaId} />;
    }

    switch (currentHash) {
      case '#/for':
        return <div className="pt-20"><PersonaDirectory /></div>;
      case '#/work':
        return <div className="pt-20"><Work /></div>;

      case '#/governance':
        return (
          <div className="pt-20">
            <ReliabilityStandards />
          </div>
        );
      case '#/blog':
        return <div className="pt-20"><BlogSeries /></div>;
      case '#/solutions':
        return (
          <div className="pt-20">
            <Capabilities />
            <AdministrativeRoiFramework />
            <PersonaCTABanner />
          </div>
        );
      case '#/post-mortems':
        return <div className="pt-20"><PostMortems /></div>;
      case '#/success-stories':
        return <div className="pt-20"><SuccessStories /><Endorsements /></div>;
      case '#/about':
        return (
          <div className="pt-20">
            <About showStrategicPillars={true} />
            <ExperienceTimeline />
            <PersonaCTABanner />
          </div>
        );
      case '#/contact':
        return <div className="pt-20"><Contact /></div>;
      case '#/privacy':
        return <PrivacyPolicy />;
      case '#/cookies':
        return <CookiePolicy />;
      default:
        return (
          <>
            <Hero />
            <About showStrategicPillars={false} />
            <ExperienceTimeline />
            <SuccessStories />
            <Endorsements />
            <Work />
            <Capabilities />
            <ReliabilityStandards />
            <AdministrativeRoiFramework />
            <PersonaCTA />
            <Contact />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Skip to content link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-700 focus:text-white focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Navbar />
      <ErrorBoundary>
        <main id="main-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHash}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </ErrorBoundary>
      <ScrollToTop />
      <Footer />
      <AnalyticsDebugger />
    </div>
  );
}

export default App;
