const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const app = express();
const port = process.env.PORT || 5000;

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
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
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
    
    // Parse the response as JSON
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error querying Hugging Face API:', error);
    throw error;
  }
}

// Generate image from text prompt
app.post('/api/generate-image', async (req, res) => {
  const { prompt } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }
  
  try {
    // Prepare the data for Hugging Face API
    const data = {
      prompt: prompt,
      response_format: "url", // Get URL instead of base64 for easier handling
      model: "black-forest-labs/FLUX.1-dev",
    };
    
    // Query Hugging Face API
    const result = await queryHuggingFace(data);
    
    // Extract the image URL from the response based on the actual API structure
    const imageUrl = result.data?.[0]?.url;
    
    if (!imageUrl) {
      throw new Error('No image URL returned from API');
    }
    
    console.log('Response structure:', JSON.stringify(result, null, 2));
    
    console.log(`Image generated successfully: ${imageUrl}`);
    
    // Return the image URL
    return res.json({ imageUrl });
    
  } catch (error) {
    console.error('Error generating image:', error);
    return res.status(500).json({ error: 'Failed to generate image', details: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
