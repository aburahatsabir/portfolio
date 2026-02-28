import React from 'react';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <div style={{ fontSize: '24px', color: 'blue', padding: '20px' }}>
          TEST - App is rendering. Navbar should be above.
        </div>
      </main>
    </div>
  );
}

export default App;
