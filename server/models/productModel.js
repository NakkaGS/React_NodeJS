const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId
    },

    name: {
        type: String,
        require: true
    },

    comment : {
        type: String,
    },

    rating : {
        type: Number,
        require: true
    }

} , {
    timeStamps : true
})

const productSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },

    image : {
        type: String,
        required: false
    },

    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    description : {
        type: String,
         required: true
    },

    price : {
        type: Number,
        required: true
    },

    countInStock : {
        type: Number,
        required: true
    },

    rating : {
        type: Number,
        required: true,
        default: 0
    },

    reviews : [reviewSchema]

} , {
    timeStamps : true
})

const Product = mongoose.model('products', productSchema)

module.exports = Product