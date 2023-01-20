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

const path = require('path');

app.use(express.json());
app.use(cors())

//Create Route
app.use('/api/products/' , productsRoute, cors())
app.use('/api/users/', userRoute, cors())
app.use('/api/orders/', orderRoute, cors())

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