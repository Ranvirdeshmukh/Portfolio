import ReactGA from 'react-ga4';

// Initialize Google Analytics
export const initGA = (measurementId = process.env.REACT_APP_GA_MEASUREMENT_ID) => {
  if (process.env.NODE_ENV === 'production' && measurementId) {
    ReactGA.initialize(measurementId);
    console.log('GA initialized');
  } else {
    console.log('GA not initialized: ' + (process.env.NODE_ENV !== 'production' ? 'Not in production' : 'No measurement ID provided'));
  }
};

// Track pageview
export const pageView = (path) => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.send({ hitType: 'pageview', page: path });
    console.log(`Pageview tracked: ${path}`);
  }
};

// Track event
export const trackEvent = (category, action, label, value) => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.event({
      category,
      action,
      label,
      value
    });
    console.log(`Event tracked: ${category}, ${action}`);
  }
}; 