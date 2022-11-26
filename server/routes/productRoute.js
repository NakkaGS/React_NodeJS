const express = require("express");
const router = express.Router();
const Product = require('../models/productModel')


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

router.post("/getproductbyid/", (req, res) => {
    //res.send(req.params)
    console.log(res)

    Product.find({_id : req.body.id} , (err , docs)=>{

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