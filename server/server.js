const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

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

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
