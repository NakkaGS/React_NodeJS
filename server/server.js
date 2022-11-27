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

//This is for the production part
if(process.env.NODE_ENV === 'production')
{
    app.use('/' , express.static('client/build'))
    app.get('*' , (req,res)=>{
        res.sendFile(path.resolve(__dirname , 'client/build/index.html'))
    })
}

//if it not in production
const port = process.env.PORT || 8000;

app.listen(8000, function () {
    console.log('Node JS Server Started on Port 8000!');
   });

module.exports = app