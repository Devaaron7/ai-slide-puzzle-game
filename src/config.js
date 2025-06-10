// Safe access to process.env to avoid browser errors
const getEnv = (key, defaultValue = '') => {
  try {
    return (typeof process !== 'undefined' && process.env && process.env[key]) || defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

// Determine if we're in development or production
const isDevelopment = getEnv('NODE_ENV') !== 'production';

// Set the base URL for API requests
// First check for explicit API_URL in environment, then fall back to environment detection
const API_BASE_URL = getEnv('REACT_APP_API_URL', 
  // If no explicit API_URL is set, determine based on environment
  getEnv('NODE_ENV') !== 'production' 
    ? 'http://localhost:5000' 
    : 'https://ai-slide-puzzle-game-production.up.railway.app'
);

// Export API endpoints
export const API_ENDPOINTS = {
  GENERATE_IMAGE: `${API_BASE_URL}/api/generate-image`,
  SEND_EMAIL: `${API_BASE_URL}/api/send-email`
};

export default {
  API_BASE_URL,
  ...API_ENDPOINTS,
};
