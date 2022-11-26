//Express
const express = require("express")
const app = express()

//Cors - Cross-Origin Resource Sharing 
var cors = require('cors')

//Call the db.js and start the server
var dbconnection = require('./db')

//Routes
var productsRoute = require('./routes/productRoute')

//Create Route
app.use('/api/products/' , productsRoute, cors())

app.get("/", (req, res) => {
    res.send("This is from backend")
})

app.listen(8000, function () {
    console.log('Node JS Server Started on Port 8000!');
   });