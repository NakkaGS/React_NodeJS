//To read .env
require('dotenv').config();

var crypto = require('crypto'); 

//Express
const express = require("express")
const router = express.Router();

var bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY)

router.post("/placeorder", async (req,res) => {
    const {token, cartItems, currentUser, amount} = req.body


    console.log(req.body)

    const customer = await stripe.customers.create({
        email : token.email,
        source : token._id,
    }) 

     const payment = await stripe.charges.create({
        amount: amount,
        currency: 'EUR',
        customer: customer.id,
        receipt_email: token.email
    } , {
        idempotencyKey: crypto.createHash('sha256')
    })

    if(payment){
        res.send('Payment Successful')
    } else {
        return res.status(400).json({ message: 'Payment Failed' });
    }
})

module.exports = router