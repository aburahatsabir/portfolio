import React, { useEffect, useState } from 'react';

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 p-4">
        <div className="max-w-7xl mx-auto px-6">
          <a href="#/" className="text-xl font-black">Abu Rahat Sabir</a>
        </div>
      </nav>
      <main className="pt-20">
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-6xl font-black text-slate-900 mb-4">Executive Architect</h1>
            <p className="text-xl text-slate-500 mb-8">Systems Governance & Operations</p>
            <a href="#/about" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-black">Explore</a>
          </div>
        </section>
      </main>
      <footer className="bg-slate-50 py-12 text-center text-sm text-slate-500">
        <p>© 2025 Abu Rahat Sabir. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
