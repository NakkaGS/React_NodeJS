//Express
const express = require("express");
const router = express.Router();

//axios
const axios = require('axios');

//Models
const GermanVerb = require('../models/germanVerbsModel')

var bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

//////////////////////////////////////////////////
//Get a random german verb
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

// Define a route to proxy the PONS API request
router.get('/pons-dictionary', async (req, res) => {
    try {

        const { germanverb } = req.body; // Get the query and language from the request body

        const response = await axios.get("https://api.pons.com/v1/dictionary", {
        params: {
            q: germanverb,
            l: "deen"
        },
        headers: {
            'X-Secret': process.env.PONS_API
        }
        });

        res.json(response.data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
  });

module.exports = router