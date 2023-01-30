//Express
const express = require("express");
const router = express.Router();

//Models
const Product = require('../models/productModel')
const Category = require('../models/categoryModel')

var bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

//////////////////////////////////////////////////
//Get all Products
router.get("/getallproducts", (req, res) => {

    Product.find({ }).
        populate('category'). // only return the Persons name
        exec(function (err, docs) {
            if(!err){
                return res.send(docs);
            } else {
                return res.status(400).json({ message: 'Something went wrong' });
            }

    })
  
});

//////////////////////////////////////////////////
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

//////////////////////////////////////////////////
//Create a product
router.post("/create", (req, res) => {

    const {product} = req.body

    Category.find({name : product.category}, (err , docs)=>{

        if(!err){
            const productModel = new Product({
                name : product.name , 
                price : product.price,
                description : product.description,
                countInStock : product.countInStock,
                category : docs[0]._id,
            })
            
            //Get the new Product ID and add into the Category
            productModel.save((err, productNew) => {
                if(err){
                    return res.status(400).json({ message: 'Something went wrong' });
                } else {
                    res.send('Product Added Successfully')
                    docs[0].products.push([productNew._id])
                    docs[0].save()
                }
            })
        } else {
            return res.status(400).json({ message: 'something went wrong' });
        }

    })
  
});

//////////////////////////////////////////////////
//Create a review to a product
router.post('/addreview',  async (req,res) => {
    const { review , productId , currentUser } = req.body

    const product = await Product.findById({ _id : productId })

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

//////////////////////////////////////////////////
//Delete Product
router.post("/delete", (req, res) => {

    Product.findByIdAndDelete({ _id : req.body.productId } , (err , docs)=>{

        if(!err)
        {
            res.send(docs[0])
        }
        else{
            return res.status(400).json({ message: 'something went wrong' });
        }

    })
  
});

router.post("/productsbycategory", (req,res) => {

    const { categoryName } = req.body

    const categoryCapitalized = categoryName.split(" ");

    for (let i = 0; i < categoryCapitalized.length; i++) {
        categoryCapitalized[i] = categoryCapitalized[i][0].toUpperCase() + categoryCapitalized[i].substr(1);
    }

    Category.find({name : String(categoryCapitalized)} , (err , docs)=>{

        if(!err && docs[0]){
            Product.find({category : docs[0]._id} , (err , docs)=>{

                if(!err){
                    res.send(docs)
                } else {
                    return res.status(400).json({ message: 'Something went wrong' });
                }
        
            })
        } else {
            return res.status(400).json({ message: 'Something went wrong' });
        }

    })
})

//////////////////////////////////////////////////
//Update User Data
router.put('/update', (req,res) => {

    Product.findByIdAndUpdate(req.body._id , 
        { name : req.body.name, price: req.body.price, description: req.body.description, countInStock: req.body.countInStock }, { new: true } , function(err, docs) {

        if(err){
            return res.status(400).send({ message : "Not possible to update Product" }); 
        } else {
            return res.send(docs)
        }
  
    })
})

module.exports = router