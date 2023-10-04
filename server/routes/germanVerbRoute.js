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

var Promise = require('promise');

//////////////////////////////////////////////////
//Get a random german verb
router.get("/germanverbbyid", async (req, res) => {

// Define a function to get the translation
const getTranslation = async (Infinitive) => {
    try {
      const response = await axios.get("https://api.pons.com/v1/dictionary", {
        params: {
          q: Infinitive,
          l: "deen"
        },
        headers: {
          'X-Secret': process.env.PONS_API
        }
      });
  
      const data = response.data;
      const Translation = data[0]?.hits[0]?.roms[0]?.arabs[0]?.translations[0]?.target;
  
      if (Translation !== undefined) {
        return Translation;
      } else {
        throw new Error('Translation not found');
      }
    } catch (error) {
      throw new Error('Failed to fetch translation');
    }
  };
  
  try {
    // Define a function to get random items from GermanVerb
    const getRandomGermanVerb = () => {
      return new Promise((resolve, reject) => {
        GermanVerb.aggregate([{ $sample: { size: 1 } }], (err, randomItems) => {
          if (err) {
            return reject('Internal server error');
          }
  
          const randomItem = randomItems[0];
          if (!randomItem) {
            return reject('No items found');
          }
  
          resolve(randomItem);
        });
      });
    };
  
    // Call the function to get random GermanVerb item
    const randomItem = await getRandomGermanVerb();
  
    const Infinitive = randomItem.Infinitive;
    const Prasens_ich = randomItem.Prasens_ich;
    const Prasens_du = randomItem.Prasens_du;
    const Prasens_er_sie_es = randomItem.Prasens_er_sie_es;
    const Partizip_II = randomItem.Partizip_II;
    const Hilfsverb = randomItem.Hilfsverb;
  
    const Translation = await getTranslation(Infinitive);
  
    res.json({ Infinitive, Prasens_ich, Prasens_du, Prasens_er_sie_es, Partizip_II, Hilfsverb, Translation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }

});

module.exports = router