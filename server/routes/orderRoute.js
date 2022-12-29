//To read .env
require('dotenv').config();

var crypto = require('crypto'); 

//Express
const express = require("express")
const router = express.Router();

var bodyParser = require('body-parser')

const { Order } = require("../models/orderModel");

router.use(bodyParser.json())

router.use(bodyParser.urlencoded({ extended: true }))

const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY)

const storeItems = new Map([
    [1, { priceInCents: 10000, name: "Learn React Today" }],
    [2, { priceInCents: 20000, name: "Learn CSS Today" }],
  ])


//////////////////////////////////////////////////
router.post("/placeorder", async (req,res) => {
    try{
        const {cartItems, currentUser, amount} = req.body

        console.log(currentUser.name)

        const customer = await stripe.customers.create({
            name: currentUser.name,
            email: currentUser.email,
            metadata: {
              userId: currentUser._id,
              cart: JSON.stringify(cartItems),
            },
          });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            customer: customer.id,
            shipping_address_collection: {
                allowed_countries: ["DE"],
            },
            line_items: cartItems.map(item => {
              return {
                price_data: {
                  currency: "EUR",
                  product_data: {
                    name: item.name,
                    metadata: {
                        id: item._id,
                      },
                  },
                  unit_amount: item.price,
                },
                quantity: item.quantity,
              }
            }),
            success_url: `${process.env.CLIENT_URL}order/payment/success`,
            cancel_url: `${process.env.CLIENT_URL}order/payment/failed`,

          })

          res.json({ url: session.url })
          

    } catch(e) {

        console.log("Error")
        res.status(500).json({ error: e.message })
    }

})

module.exports = router