// Express
const express = require('express')
const router = express.Router()

//Models
const Category = require('../models/categoryModel')
const Product = require('../models/productModel')

var bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

//////////////////////////////////////////////////
//Create a new Category
router.post('/addcategory', (req, res) => {
    const {category} = req.body

    try{
        Category.findOne({name : category.name}, async (err , docs) => {
            if (!docs) {
                const categoryModel = new Category ({
                    name: category.name
                })
        
                categoryModel.save();
                return res.json({message: 'Category added sucessfully'})
            }
            return res.status(400).json({message: 'Something went wrong'})
        })

    } catch(err) {
        return res.status(400).json({message: 'Something went wrong'})
    }

})

//////////////////////////////////////////////////
//Get all the Categories
router.get('/getallcategories' , async (req,res) => {

    Category.find({} , (err, docs) => {

        if(!err) {
            return res.send(docs)
        } else {
            return res.status(400).json({message: err.message})
        }
    })
})

//////////////////////////////////////////////////
//Get Category by ID
router.post('/getcategorybyid' , async (req,res) => {

    Category.find({_id: req.body.categoryid} , (err, docs) => {

        if(!err) {
            return res.send(docs[0])
        } else {
            return res.status(400).json({message: err.message})
        }
    })
})

//////////////////////////////////////////////////
//Update Category Data
router.put('/update', async (req,res) => {

    Category.findByIdAndUpdate(req.body._id ,
        { name : req.body.name }, function(err, docs) {

        if(err){
            return res.status(400).send({ message : "User not found" }); 
        } else {
            return res.send(docs)
        }
  
      })
})

//////////////////////////////////////////////////
//Delete Category
router.post("/delete", (req, res) => {

    Category.findByIdAndDelete({ _id : req.body.categoryId } , (err , docs)=>{

        if(!err){
            res.send(docs[0])
        } else {
            return res.status(400).json({ message: 'something went wrong' });
        }

    })
  
});

module.exports = router