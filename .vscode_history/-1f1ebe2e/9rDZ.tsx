
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Failed to render app:', error);
  rootElement.innerHTML = `<div style="color: red; font-size: 16px; padding: 20px; font-family: monospace;">
    <h2>Application Error</h2>
    <p>Failed to initialize application. Error details have been logged to the console.</p>
    <pre style="background: #f0f0f0; padding: 10px; overflow: auto; font-size: 12px;">
${error instanceof Error ? error.message + '\n' + error.stack : String(error)}
    </pre>
    <button onclick="location.reload()" style="padding: 10px 20px; cursor: pointer;">Reload Page</button>
  </div>`;
}

