import ReactGA from 'react-ga4';

// Initialize Google Analytics
export const initGA = (measurementId = process.env.REACT_APP_GA_MEASUREMENT_ID) => {
  if (!measurementId) {
    console.warn('GA Measurement ID is missing. Set REACT_APP_GA_MEASUREMENT_ID in your .env file.');
    return;
  }

  try {
    ReactGA.initialize(measurementId, {
      gaOptions: {
        debug_mode: process.env.NODE_ENV !== 'production'
      }
    });
    console.log(`Google Analytics initialized with ID: ${measurementId.substring(0, 4)}...`);
  } catch (error) {
    console.error('Failed to initialize Google Analytics:', error);
  }
};

// Track pageview
export const pageView = (path) => {
  if (!path) {
    console.warn('No path provided for page view tracking');
    return;
  }

  try {
    ReactGA.send({ hitType: 'pageview', page: path });
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Pageview tracked: ${path}`);
    }
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
};

// Track event
export const trackEvent = (category, action, label, value) => {
  if (!category || !action) {
    console.warn('Category and action are required for event tracking');
    return;
  }

  try {
    ReactGA.event({
      category,
      action,
      label,
      value
    });
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Event tracked: ${category} - ${action}${label ? ` - ${label}` : ''}`);
    }
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}; 