
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';
import { trackCustomEvent } from './utils/analytics';

/**
 * Report Web Vitals to Google Analytics
 */
const reportWebVitals = (metric: any) => {
  const { name, delta, id, value } = metric;

  trackCustomEvent(name, {
    event_category: 'Web Vitals',
    event_label: id,
    value: Math.round(name === 'CLS' ? value * 1000 : value), // Use rounded value
    metric_delta: delta,
    metric_id: id,
    metric_value: value,
    non_interaction: true,
  });
};

// Initialize web vitals monitoring
onCLS(reportWebVitals);
onINP(reportWebVitals);
onLCP(reportWebVitals);
onFCP(reportWebVitals);
onTTFB(reportWebVitals);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
