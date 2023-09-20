const express = require('express');
const axios = require('axios');
const router = express.Router();

var bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// Define the API endpoint you want to consume
const currentWeatherUrl = `https://api.weatherapi.com/v1/current.json?key=` + process.env.REACT_APP_WEATHER_API_KEY + '&aqi=no&q=';
const forecastWeatherUrl = `https://api.weatherapi.com/v1/current.json?key=` + process.env.REACT_APP_WEATHER_API_KEY + '&days=3&aqi=no&alerts=no&q=';

// Define a route to fetch and send data from the API to the frontend
router.post('/getcurrentweather', async (req, res) => {
  try {
    const currentWeatherUrlComplete = currentWeatherUrl + req.body.city;

    const response = await axios.get(currentWeatherUrlComplete);
    const apiData = response.data;

    // You can process the data here if needed
    // For example, you might filter or transform it
    res.json(apiData);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define a route to fetch and send data from the API to the frontend
router.post('/getforecastweather', async (req, res) => {
  try {
    const forecastWeatherUrlComplete = forecastWeatherUrl + req.body.city;
    const response = await axios.get(forecastWeatherUrlComplete);
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
