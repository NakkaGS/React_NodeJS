//To read .env
require('dotenv').config();

//MongoDB URL
var mongoDBURL = process.env.MONGODBURL

//Mongoose - connect with MongoDB
const mongoose = require("mongoose");

mongoose.connect(mongoDBURL , {useUnifiedTopology:true , useNewUrlParser:true})

var dbconnect = mongoose.connection

dbconnect.on('error' , ()=>{
    console.log(`Mongo DB Connection Failed`);
})

dbconnect.on('connected' , ()=>{
    console.log(`Mongo DB Connection Successfull`);
})

module.exports = mongoose