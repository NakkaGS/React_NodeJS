//Express
const express = require("express");
const router = express.Router();

//Models
const GermanVerb = require('../models/germanVerbsModel')

var bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

//////////////////////////////////////////////////
//Get Product ID by POST using Body
router.post("/germanverbbyid", (req, res) => {

    GermanVerb.find({_id : req.body.verbid}).
        exec(function (err, docs) {
            if(!err){
                return res.send(docs[0]);
            } else {
                return res.status(400).json({ message: 'Something went wrong' });
            }
        }
    )
  
});

module.exports = router