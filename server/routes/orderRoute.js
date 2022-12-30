//To read .env
require("dotenv").config();

var crypto = require("crypto");

//Express
const express = require("express");
const router = express.Router();

const enableIF = false;

const Order = require("../models/orderModel");
var bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use("/api/checkout/webhook", bodyParser.raw({ type: "*/*" }));

const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);


const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Learn CSS Today" }],
]);

//////////////////////////////////////////////////
router.post("/placeorder", async (req, res) => {
  try {
    const { cartItems, currentUser, amount } = req.body;

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
      line_items: cartItems.map((item) => {
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
        };
      }),
      success_url: `${process.env.CLIENT_URL}order/payment/success`,
      cancel_url: `${process.env.CLIENT_URL}order/payment/failed`,
    });

    res.json({ url: session.url });

  } catch (e) {
    console.log("Error");
    res.status(500).json({ error: e.message });
  }
});


// Create order function
const createOrder = async (customer, data) => {
  const Items = JSON.parse(customer.metadata.cart);

  const newOrder = new Order({

    userid : customer.metadata.userId,
    name : customer.name,
    email : data.customer_details.email ,
    orderItems : Items ,
    shippingAddress : {
        address :  data.shipping_details.address.line1 ,
        city : data.shipping_details.address.city,
        country : data.shipping_details.address.country,
        postalCode : data.shipping_details.address.postal_code
    },
    orderAmount : data.amount_total,
    transactionId : data.payment_intent,
    isDelivered : false

  });

  try {
    const savedOrder = await newOrder.save();
    console.log("Processed Order:", savedOrder);
  } catch (err) {
    console.log(err);
  }
};

//Webhook reads all the requests and response from the Stripe
router.post("/webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let data;
  let eventType;

  
  if (enableIF) {
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_KEY);
      console.log("Webhook verified")
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`)
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    data = event.data.object
    eventType = event.type

  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }

  // Handle the checkout.session.completed event
  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then(async (customer) => {
        try {
          // CREATE ORDER
          //console.log(customer)
          //console.log(data)
          createOrder(customer, data);
        } catch (err) {
          console.log(typeof createOrder);
          console.log(err);
        }
      })
      .catch((err) => console.log(err.message));
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
}
);

module.exports = router;