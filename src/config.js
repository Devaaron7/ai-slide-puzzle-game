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
// In production, this will be the same domain as the frontend (empty string for relative URLs)
const API_BASE_URL = 'https://ai-slide-puzzle-game-production.up.railway.app/';

// Export API endpoints
export const API_ENDPOINTS = {
  GENERATE_IMAGE: `${API_BASE_URL}/api/generate-image`,
  SEND_EMAIL: `${API_BASE_URL}/api/send-email`,
};

export default {
  API_BASE_URL,
  ...API_ENDPOINTS,
};
