// Express
const express = require('express')
const router = express.Router()

//Models
const Category = require('../models/categoryModel')

var bodyParser = require('body-parser')
const Product = require('../models/productModel')

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

module.exports = router