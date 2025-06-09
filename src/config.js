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
// Determine environment and set appropriate API base URL
const isDev = getEnv('NODE_ENV') !== 'production';

// In development, use localhost
// In production, use the Railway URL or empty string for relative URLs
const API_BASE_URL = isDev 
  ? 'http://localhost:5000' 
  : window.location.origin; // Use the same origin in production

// Export API endpoints
export const API_ENDPOINTS = {
  GENERATE_IMAGE: `${API_BASE_URL}/api/generate-image`,
  SEND_EMAIL: `${API_BASE_URL}/api/send-email`
};

export default {
  API_BASE_URL,
  ...API_ENDPOINTS,
};
