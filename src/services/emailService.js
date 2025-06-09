/**
 * Email notification service for the slide puzzle game
 * Uses a secure server-side proxy to send emails via EmailJS
 * This approach keeps API credentials secure on the server
 */

import { API_ENDPOINTS } from '../config';

/**
 * Send an email notification when a user generates an image
 * @param {string} textPrompt - The prompt text used to generate the image
 * @param {string} imageUrl - URL of the generated image (optional)
 * @returns {Promise<boolean>} Success status
 */
export const sendImageGenerationNotification = async (textPrompt, imageUrl = null) => {
  // Check if email notifications are enabled in the frontend
  // This is just a UI check, the server will do the actual validation
  if (process.env.REACT_APP_EMAILJS_ENABLED !== 'true') {
    console.log('Email notifications are disabled');
    return false;
  }

  try {
    console.log(`Sending notification for image generation with prompt: ${textPrompt}`);
    
    // Call our secure server-side proxy endpoint
    // This keeps all credentials on the server side
    const response = await fetch(API_ENDPOINTS.SEND_EMAIL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text_prompt: textPrompt,
        timestamp: new Date().toISOString()
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Email API error:', data.error);
      return false;
    }
    
    console.log('Email notification sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send email notification:', error);
    return false;
  }
};

export default {
  sendImageGenerationNotification
};
