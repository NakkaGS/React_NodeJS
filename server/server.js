const express = require("express")

const app = express()

var cors = require('cors')

var dbconnection = require('./db')
var productsRoute = require('./routes/productRoute')

app.use('/api/products/' , productsRoute, cors())

app.get("/", (req, res) => {
    res.send("This is from backend")
})

const port = 5000;

app.listen(port, () => console.log("Node JS Server Started"))

app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
   });