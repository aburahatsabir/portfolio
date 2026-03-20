import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';
import { trackCustomEvent } from './utils/analytics';
import { HelmetProvider } from 'react-helmet-async';
import { initSentry, captureError } from './utils/sentry';
import { scriptHealthMonitor } from './utils/script-health-monitor';

// Initialize Sentry for production error tracking
initSentry();

// Initialize script health monitoring
// Checks if GA4, EmailJS, and Google Fonts loaded successfully
scriptHealthMonitor.runHealthCheck();

// Global unhandled promise rejection handler
// Catches async errors that ErrorBoundary can't handle
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);

  // Capture in Sentry
  captureError(event.reason, {
    type: 'unhandledRejection',
    promise: true,
  });

  // Prevent default browser error logging (we've handled it)
  event.preventDefault();
});

/**
 * Report Web Vitals to Google Analytics and Console
 * 
 * Core Web Vitals Thresholds:
 * - LCP (Largest Contentful Paint): Good ≤ 2.5s, Needs Improvement ≤ 4s, Poor > 4s
 * - FID (First Input Delay): Good ≤ 100ms, Needs Improvement ≤ 300ms, Poor > 300ms
 * - CLS (Cumulative Layout Shift): Good ≤ 0.1, Needs Improvement ≤ 0.25, Poor > 0.25
 * - FCP (First Contentful Paint): Good ≤ 1.8s, Needs Improvement ≤ 3s, Poor > 3s
 * - TTFB (Time to First Byte): Good ≤ 800ms, Needs Improvement ≤ 1800ms, Poor > 1800ms
 * - INP (Interaction to Next Paint): Good ≤ 200ms, Needs Improvement ≤ 500ms, Poor > 500ms
 */
const reportWebVitals = (metric: any) => {
  const { name, delta, id, value, rating } = metric;

  // Send to Google Analytics
  trackCustomEvent(name, {
    event_category: 'Web Vitals',
    event_label: id,
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    metric_delta: delta,
    metric_id: id,
    metric_value: value,
    metric_rating: rating, // 'good', 'needs-improvement', or 'poor'
    non_interaction: true,
  });

  // Console logging for development and debugging
  const isDev = import.meta.env.DEV;

  if (isDev || rating === 'poor') {
    // Get performance grade emoji
    const gradeEmoji = rating === 'good' ? '✅' : rating === 'needs-improvement' ? '⚠️' : '❌';

    // Format value based on metric type
    const formattedValue = name === 'CLS'
      ? value.toFixed(3)
      : `${Math.round(value)}ms`;

    // Log to console with color coding
    const style = rating === 'good'
      ? 'color: #10b981; font-weight: bold'
      : rating === 'needs-improvement'
        ? 'color: #f59e0b; font-weight: bold'
        : 'color: #ef4444; font-weight: bold';

    console.log(
      `%c${gradeEmoji} ${name}: ${formattedValue} (${rating})`,
      style,
      { id, delta, value, rating }
    );
  }

  // Store metrics in sessionStorage for performance dashboard
  try {
    const metrics = JSON.parse(sessionStorage.getItem('web-vitals') || '{}');
    metrics[name] = {
      value,
      rating,
      timestamp: Date.now(),
    };
    sessionStorage.setItem('web-vitals', JSON.stringify(metrics));
  } catch (error) {
    // Silently fail if sessionStorage is not available
  }
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
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
