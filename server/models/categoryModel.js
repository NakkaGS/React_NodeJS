const { default: mongoose } = require("mongoose")
const moogose = require("mongoose")

const categorySchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
})

const Category = mongoose.model('categories' , categorySchema)

module.exports = Category