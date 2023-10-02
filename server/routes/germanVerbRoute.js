//Express
const express = require("express");
const router = express.Router();

//Models
const GermanVerb = require('../models/germanVerbsModel')

var bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

let db;

//////////////////////////////////////////////////
//Get Product ID by POST using Body
router.get("/germanverbbyid", (req, res) => {

    GermanVerb.aggregate([{ $sample: { size: 1 } }], (err, randomItems) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    
        const randomItem = randomItems[0]; // Extract the first (and only) item from the array
    
        if (!randomItem) {
            return res.status(404).json({ message: 'No items found' });
        }
    
        res.json(randomItem);
        });

      
});

module.exports = router