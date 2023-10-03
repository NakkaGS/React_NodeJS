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

        var Infinitive = randomItem.Infinitive
        var Prasens_ich = randomItem.Prasens_ich
        var Prasens_du = randomItem.Prasens_du
        var Prasens_er_sie_es = randomItem.Prasens_er_sie_es
        var Partizip_II = randomItem.Partizip_II
        var Hilfsverb = randomItem.Hilfsverb
    
        res.json({Infinitive, Prasens_ich, Prasens_du, Prasens_er_sie_es, Partizip_II, Hilfsverb});
        });

});

// Define a route to proxy the PONS API request
router.post('/pons-dictionary', async (req, res) => {
    try {

        const { germanVerb } = req.body; // Get the query and language from the request body

        console.log(germanVerb)

        const response = await axios.get("https://api.pons.com/v1/dictionary", {
        params: {
            q: germanVerb,
            l: "deen"
        },
        headers: {
            'X-Secret': process.env.PONS_API
        }
        });

        var translation = response.data[0].hits[0].roms[0].arabs[0].translations[0].target

        res.json({ translation })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
  });

module.exports = router