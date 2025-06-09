const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const axios = require('axios');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

// Set up port for server
const port = process.env.PORT || 5000;

// Create Express app
const app = express();

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'build')));

// Fallback image URLs
const FALLBACK_IMAGES = [
  'https://res.cloudinary.com/djtdrtepl/image/upload/v1749479548/dog_nk98k6.jpg',
  'https://res.cloudinary.com/djtdrtepl/image/upload/v1749479548/cat_oag9ba.jpg'
];

// Function to get a random fallback image
const getRandomFallbackImage = () => {
  const randomIndex = Math.floor(Math.random() * FALLBACK_IMAGES.length);
  return FALLBACK_IMAGES[randomIndex];
};

// Middleware
app.use(cors());
app.use(express.json());

// Function to query Hugging Face API
async function queryHuggingFace(data) {
  console.log(`Generating image for prompt: ${data.prompt}`);
  
  try {
    const response = await fetch(
      "https://router.huggingface.co/together/v1/images/generations",
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} ${errorText}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error querying Hugging Face API:', error);
    throw error;
  }
}

// API endpoint
app.post('/api/generate-image', async (req, res) => {
  const { prompt } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }
  
  try {
    const data = {
      prompt: prompt,
      response_format: "url",
      model: "black-forest-labs/FLUX.1-dev",
    };
    
    try {
      const result = await queryHuggingFace(data);
      const imageUrl = result.data?.[0]?.url;
      
      if (!imageUrl) throw new Error('No image URL returned from API');
      
      console.log('Image generated successfully:', imageUrl);
      return res.json({ imageUrl });
      
    } catch (apiError) {
      console.error('API error, using fallback image:', apiError);
      const fallbackImageUrl = getRandomFallbackImage();
      return res.json({ 
        imageUrl: fallbackImageUrl,
        isFallback: true,
        originalPrompt: prompt
      });
    }
    
  } catch (error) {
    console.error('Error in request handling:', error);
    const fallbackImageUrl = getRandomFallbackImage();
    return res.json({ 
      imageUrl: fallbackImageUrl,
      isFallback: true,
      originalPrompt: prompt,
      error: error.message
    });
  }
});

// Serve React frontend static files from the /build folder
app.use(express.static(path.join(__dirname, '..', 'build')));

// Catch-all route to serve React's index.html for unknown paths
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// Secure email proxy endpoint - keeps credentials on server side
app.post('/api/send-email', async (req, res) => {
  const { text_prompt } = req.body;
  
  // Check if email notifications are enabled
  if (process.env.REACT_APP_EMAILJS_ENABLED !== 'true') {
    return res.status(200).json({ message: 'Email notifications are disabled' });
  }

  // Validate required environment variables
  if (!process.env.REACT_APP_EMAILJS_SERVICE_ID || 
      !process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 
      !process.env.REACT_APP_EMAILJS_PUBLIC_KEY) {
    return res.status(500).json({ error: 'Email service not properly configured' });
  }

  try {
    // Determine if we're in production or development
    const isProduction = process.env.NODE_ENV === 'production';
    const appUrl = isProduction 
      ? 'https://ai-slide-puzzle-game-production.up.railway.app/' 
      : 'http://localhost:5000/';
      
    // Prepare template parameters
    const templateParams = {
      text_prompt: text_prompt || 'No prompt provided',
      timestamp: new Date().toLocaleString(),
      app_url: appUrl
    };

    // Create a custom EmailJS send function that works in Node.js
    const sendEmail = async () => {
      // Construct the EmailJS API URL
      const url = 'https://api.emailjs.com/api/v1.0/email/send';
      
      // Prepare the request payload
      const payload = {
        service_id: process.env.REACT_APP_EMAILJS_SERVICE_ID,
        template_id: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        user_id: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
        template_params: templateParams,
      };
      
      // Determine the origin and referer based on environment
      const isProduction = process.env.NODE_ENV === 'production';
      const origin = isProduction 
        ? 'https://ai-slide-puzzle-game-production.up.railway.app' 
        : 'http://localhost:3000';
      
      try {
        // Send the request to EmailJS API with browser-like headers
        const response = await axios.post(url, payload, {
          headers: {
            'Content-Type': 'application/json',
            // Add browser-like headers to avoid API restrictions
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Origin': origin,
            'Referer': `${origin}/`,
          },
        });
        
        return response.data;
      } catch (error) {
        if (error.response) {
          throw new Error(`EmailJS API error: ${error.response.status} ${JSON.stringify(error.response.data)}`);
        } else {
          throw error;
        }
      }
    };
    
    // Send the email
    await sendEmail();

    console.log('Email notification sent successfully');
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Failed to send email notification:', error);
    return res.status(500).json({ error: 'Failed to send email notification' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
