const express = require('express');
const axios = require('axios');
const router = express.Router();

var bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// Define the API endpoint you want to consume
const apiUrl = `https://newsapi.org/v2/top-headlines?category=technology&country=us&pageSize=8&apiKey=`+ process.env.REACT_APP_NEWS_API_KEY;

// Define a route to fetch and send data from the API to the frontend
router.get('/getnews', async (req, res) => {
  try {
    const response = await axios.get(apiUrl);
    const apiData = response.data;

    // You can process the data here if needed
    // For example, you might filter or transform it
    res.json(apiData);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router
