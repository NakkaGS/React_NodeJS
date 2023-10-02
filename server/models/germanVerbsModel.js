const mongoose = require("mongoose")

const germanVerbSchema = mongoose.Schema({

    Infinitive: {
        type: String,
        required: true,
        unique: true
    },

    Präsens_ich: {
        type: String,
        required: true,
    },

    Präsens_er_sie_es: {
        type: String,
        required: true,
    },

    Präteritum_ich: {
        type: String,
        required: true,
    },

    Partizip_II: {
        type: String,
        required: true,
    },

    Konjunktiv_II_ich: {
        type: String,
        required: true,
    },

    Imperativ_Singular: {
        type: String,
        required: true,
    },

    Imperativ_Plural: {
        type: String,
        required: true,
    },

    Hilfsverb: {
        type: String,
        required: true,
    },
    

})

const GermanVerb = mongoose.model('germanverbs' , germanVerbSchema)

module.exports = GermanVerb