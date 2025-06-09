// Determine if we're in development or production
const isDevelopment = process.env.NODE_ENV === 'development';

// Set the base URL for API requests
const API_BASE_URL = isDevelopment 
  ? 'http://localhost:5000' // Development URL
  : ''; // Production URL (relative URL will use the same domain)

export const API_ENDPOINTS = {
  GENERATE_IMAGE: `${API_BASE_URL}/api/generate-image`,
};

export default {
  API_BASE_URL,
  ...API_ENDPOINTS,
};
