//Express
const express = require("express");
const router = express.Router();

//Models
const Product = require('../models/productModel')

var bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

//Get all Products
router.get("/getallproducts", (req, res) => {

    Product.find({} , (err , docs)=>{

        if(!err){
            return res.send(docs);
        } else {
            return res.status(400).json({ message: 'Something went wrong' });
        }

    })
  
});

//Get Product ID by POST using Body
router.post("/getproductbyid", (req, res) => {

    Product.find({_id : req.body.productid} , (err , docs)=>{

        if(!err){
            res.send(docs[0])
        } else {
            return res.status(400).json({ message: 'something went wrong' });
        }

    })
  
});

//Create a product
router.post("/create", (req, res) => {

    const {product} = req.body

    //console.log(product);

    const productModel = new Product({
        name : product.name , 
        price : product.price,
        description : product.description,
        countInStock : product.countInStock ,
        category : product.category

    })

    productModel.save(err=>{
        if(err){
            return res.status(400).json({ message: 'Something went wrong' });
        }else{
            res.send('Product Added Successfully')
        }
    })
  
});

//create a review to a product
router.post('/addreview',  async (req,res) => {
    const { review , productId , currentUser } = req.body

    const product = await Product.findById({_id : productId})

    const reviewmodel = {
        name : currentUser?.name,
        userid : currentUser?._id ,
        rating : review?.rating,
        comment : review?.comment 
    }

    product.reviews.push(reviewmodel)
    var rating = product.reviews.reduce((acc , x)=> acc + x.rating , 0) / product.reviews.length

    product.rating = rating

    product.save(err => {
        if(err){
            return res.status(400).json({ message: 'Something went wrong'})
        } else {
            res.send('Product Added Successfully')
        }
    })

})

//Delete Product
router.post("/deleteproductbyid", (req, res) => {

    Product.findByIdAndDelete({_id : req.body.productId} , (err , docs)=>{

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