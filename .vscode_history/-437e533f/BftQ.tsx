
import React from 'react';

function App() {
  return (
    <div style={{ fontSize: '32px', color: 'red', padding: '40px', fontWeight: 'bold' }}>
      TEST RENDERING - If you can read this, React is working!
    </div>
  );
}

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
      window.scrollTo(0, 0); 
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    if (currentHash.startsWith('#/blog/')) {
      return <BlogSeries />;
    }

    if (currentHash.startsWith('#/work/')) {
      const projectId = currentHash.replace('#/work/', '');
      return <CaseStudyPage projectId={projectId} />;
    }

    switch (currentHash) {
      case '#/work':
        return <div className="pt-20"><Work /></div>;
      case '#/diagnostic':
        return <div className="pt-20"><SystemsAudit /></div>;
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
            <SystemsAudit />
            <AiAssistant />
            <Contact />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
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
      <ScrollToTop />
      <Footer />
    </div>
  );
}

export default App;
