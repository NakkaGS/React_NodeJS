// Express
const express = require('express')
const router = express.Router()

//Models
const Category = require('../models/categoryModel')

var bodyParser = require('body-parser')
const Product = require('../models/productModel')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

router.post('/addcategory', async (req, res) => {
    const {category} = req.body

    try{
        const categoryModel = new Category ({
            name: category.name
        })

        await categoryModel.save();
        res.json({message: 'Category added sucessfully'})


    } catch(err) {
        res.status(400).json({message: 'Something went wrong'})
    }

})

router.get('/getcategories' , async (req,res) => {
    Category.find({} , (err, docs) => {
        if(!err) {
            return res.send(docs)
        } else {
            return res.status(400).json({message: 'Something went wrong'})
        }
    })
})