//Express
const express = require("express")
const app = express()

//Cors - Cross-Origin Resource Sharing 
var cors = require('cors')

//Call the db.js and start the server
var dbconnection = require('./db')

//Routes
var productsRoute = require('./routes/productRoute')
var userRoute = require('./routes/userRoute')
var orderRoute = require('./routes/orderRoute')
var categoryRoute = require('./routes/categoryRoute')
var newsRoute = require('./routes/newsRoute')
var weatherRoute = require('./routes/weatherRoute')
var germanVerbRoute = require('./routes/germanVerbRoute')

const path = require('path');

app.use(express.json());
app.use(cors())

// Define the allowed website
const allowedWebsite = 'https://nakkags.github.io/MyDashboard/';

// Middleware to check the origin header
const allowOnlyFromAllowedWebsite = (req, res, next) => {
  const origin = req.get('Origin');
  if (origin === allowedWebsite) {
    // If the request comes from the allowed website, set appropriate headers
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next(); // Continue with the request
  } else {
    // If the request is not from the allowed website, return an error
    res.status(403).json({ error: 'Access denied' });
  }
};

// Middleware to enable CORS for specific routes
const enableCORS = (req, res, next) => {
    // Set CORS headers to allow requests from any origin
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next(); // Continue with the request
  };

//Create Route
app.use('/api/products/' , productsRoute, enableCORS)
app.use('/api/users/', userRoute, enableCORS)
app.use('/api/orders/', orderRoute, enableCORS)
app.use('/api/categories/', categoryRoute, enableCORS)
app.use('/api/news/', newsRoute, allowOnlyFromAllowedWebsite)
app.use('/api/weather/', weatherRoute, allowOnlyFromAllowedWebsite)
app.use('/api/germanverb/', germanVerbRoute, allowOnlyFromAllowedWebsite)

//This is for the production part
if(process.env.NODE_ENV === 'production')
{
    app.use('/' , express.static('frontend/build'))
    app.get('*' , (req,res)=>{
        res.sendFile(path.resolve(__dirname , 'frontend/build/index.html'))
    })
}

//if it not in production
const port = process.env.PORT || 8000;

app.listen(8000, function () {
    console.log('Node JS Server Started on Port 8000!');
   });

module.exports = app
