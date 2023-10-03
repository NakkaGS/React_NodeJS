const express = require('express');
const axios = require('axios');
const router = express.Router();

var bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// Define the API endpoint you want to consume
const currentWeatherUrl = `https://api.weatherapi.com/v1/current.json?key=` + process.env.REACT_APP_WEATHER_API_KEY + '&aqi=no&q=';
const forecastWeatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=` + process.env.REACT_APP_WEATHER_API_KEY + '&days=3&aqi=no&alerts=no&q=';

// Define a route to fetch and send data from the API to the frontend
router.post('/getcurrentweather', async (req, res) => {
  try {
    const currentWeatherUrlComplete = currentWeatherUrl + req.body.city;

    const response = await axios.get(currentWeatherUrlComplete);
    const apiData = response.data;

    // You can process the data here if needed
    // For example, you might filter or transform it
    //res.json(apiData);

    var city = apiData.location.name
    var country = apiData.location.country
    var actualTemperature = apiData.current.temp_c
    var iconWeather = apiData.current.condition.icon
    var textWeather = apiData.current.condition.text

    res.json({city, country, actualTemperature, iconWeather, textWeather});

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
    //res.json(apiData);

    var city = apiData.location.name
    var country = apiData.location.country
    var actualTemperature = apiData.current.temp_c
    var iconWeatherCurrent = apiData.current.condition.icon
    var textWeatherCurrent = apiData.current.condition.text

    var dateWeather_1 = apiData.forecast.forecastday[0].date
    var maxTempC_1 = apiData.forecast.forecastday[0].day.maxtemp_c
    var minTempC_1 = apiData.forecast?.forecastday[0].day.mintemp_c
    var iconWeather_1 = apiData.forecast.forecastday[0].day.condition.icon
    var textWeather_1 = apiData.forecast.forecastday[0].day.condition.text

    var dateWeather_2 = apiData.forecast.forecastday[1].date
    var maxTempC_2 = apiData.forecast.forecastday[1].day.maxtemp_c
    var minTempC_2 = apiData.forecast?.forecastday[1].day.mintemp_c
    var iconWeather_2 = apiData.forecast.forecastday[1].day.condition.icon
    var textWeather_2 = apiData.forecast.forecastday[1].day.condition.text

    var dateWeather_3 = apiData.forecast.forecastday[2].date
    var maxTempC_3 = apiData.forecast.forecastday[2].day.maxtemp_c
    var minTempC_3 = apiData.forecast?.forecastday[2].day.mintemp_c
    var iconWeather_3 = apiData.forecast.forecastday[2].day.condition.icon
    var textWeather_3 = apiData.forecast.forecastday[2].day.condition.text

    res.json({city, country, actualTemperature, iconWeatherCurrent, textWeatherCurrent, dateWeather_1, maxTempC_1, minTempC_1, iconWeather_1, textWeather_1, dateWeather_2, maxTempC_2, minTempC_2, iconWeather_2, textWeather_2, dateWeather_3, maxTempC_3, minTempC_3, iconWeather_3, textWeather_3});

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router
