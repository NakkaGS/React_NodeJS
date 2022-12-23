//To read .env
require('dotenv').config();

var crypto = require('crypto'); 

const express = require("express")
const router = express.Router();

const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY)

router.post("/placeorder", async (req,res) =>{
    const {token, cartItems, currentUser, amount} = req.body
    console.log(req)

    console.log(token)

/*     const customer = await stripe.customers.create({
        email : token.email,
        source : token._id,
    }) */

/*     const payment = await stripe.charges.create({
        amount: amount,
        currency: 'EUR',
        customer: customer.id,
        receipt_email: token.email
    } , {
        idempotencyKey: createHash()
    })

    if(payment){
        res.send('Payment Successful')
    } else {
        return res.status(400).json({ message: 'Payment Failed' });
    } */
})

module.exports = router