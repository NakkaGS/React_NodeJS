//Express
const express = require("express");
const router = express.Router();

var bodyParser = require('body-parser')

//Models
const Product = require('../models/productModel')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

//Get all Products
router.get("/getallproducts", (req, res) => {

    Product.find({} , (err , docs)=>{

    if(!err)
    {
        return res.send(docs);
    }
    else{
        return res.status(400).json({ message: 'Something went wrong' });
    }

    })
  
});

//Get Product ID by POST using Body
router.post("/getproductbyid", (req, res) => {
    console.log(req)

    Product.find({_id : req.body.productid} , (err , docs)=>{

        if(!err)
        {
            res.send(docs[0])
        }
        else{
            return res.status(400).json({ message: 'something went wrong' });
        }

    })
  
});

module.exports = router