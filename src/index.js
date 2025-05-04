import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initGA } from './analytics';

// Initialize Google Analytics
initGA();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Send performance metrics to Google Analytics
// Learn more: https://bit.ly/CRA-vitals
reportWebVitals(metric => {
  // You can send the metrics to your analytics endpoint
  // Example: send to Google Analytics
  if (process.env.NODE_ENV === 'production' && 
      process.env.REACT_APP_GA_MEASUREMENT_ID) {
    // Track Core Web Vitals
    const eventName = `web-vital-${metric.name}`;
    const eventParams = {
      category: 'Web Vitals',
      action: metric.name,
      label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value), // Convert CLS to milliseconds for consistency
      nonInteraction: true, // Doesn't affect bounce rate
    };
    
    import('./analytics').then(({ trackEvent }) => {
      trackEvent(eventParams.category, eventParams.action, eventParams.label, eventParams.value);
    });
  }
});
