/**
 * Email notification service for the slide puzzle game
 * Uses EmailJS for sending notifications when users generate images
 */

import { API_ENDPOINTS } from '../config';

/**
 * Send an email notification when a user generates an image
 * @param {string} textPrompt - The prompt text used to generate the image
 * @param {string} imageUrl - URL of the generated image (optional)
 * @returns {Promise<boolean>} Success status
 */
export const sendImageGenerationNotification = async (textPrompt, imageUrl = null) => {
  // Check if email notifications are enabled
  if (process.env.REACT_APP_EMAILJS_ENABLED !== 'true') {
    console.log('Email notifications are disabled');
    return false;
  }

  try {
    console.log(`Sending notification for image generation with prompt: ${textPrompt}`);
    
    const response = await fetch(`${API_ENDPOINTS.SEND_EMAIL}`, {
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
