const express = require('express');
const router = express.Router();
const axios = require('axios');

// POST /api/translate - Proxy to LibreTranslate API
router.post('/', async (req, res) => {
  try {
    const { q, source, target } = req.body;

    // Validate input
    if (!q || !source || !target) {
      return res.status(400).json({ 
        error: 'Please provide q (text), source (language code), and target (language code)' 
      });
    }

    // Prepare request to LibreTranslate
    const translateRequest = {
      q,
      source,
      target,
      format: 'text'
    };

    // Add API key if provided in environment
    if (process.env.TRANSLATE_API) {
      translateRequest.api_key = process.env.TRANSLATE_API;
    }

    // Make request to LibreTranslate
    const response = await axios.post(
      'https://libretranslate.de/translate',
      translateRequest,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({
      translatedText: response.data.translatedText,
      source,
      target
    });
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({ 
        error: error.response.data.error || 'Translation service error' 
      });
    } else {
      res.status(500).json({ error: 'Failed to connect to translation service' });
    }
  }
});

module.exports = router;
