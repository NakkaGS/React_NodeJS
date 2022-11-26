const mongoose = require("mongoose");

var mongoDBURL = 'mongodb+srv://gabriel:gabriel@cluster0.f7bm1im.mongodb.net/mern-ecommerce'

mongoose.connect(mongoDBURL , {useUnifiedTopology:true , useNewUrlParser:true})

var dbconnect = mongoose.connection

dbconnect.on('error' , ()=>{
    console.log(`Mongo DB Connection Failed`);
})

dbconnect.on('connected' , ()=>{
    console.log(`Mongo DB Connection Successfull`);
})

module.exports = mongoose