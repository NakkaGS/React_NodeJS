//To read .env
require("dotenv").config();

var crypto = require("crypto");

//Express
const express = require("express");
const router = express.Router();

const enableIF = false;

const Order = require("../models/orderModel");
const Product = require("../models/productModel");

var bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use("/api/checkout/webhook", bodyParser.raw({ type: "*/*" }));

const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);

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
    res.status(500).json({ error: e.message });
  }
});

//////////////////////////////////////////////////
// Update the Products CountInStock
const updateProducts = async (customer) => {

  const Items = JSON.parse(customer.metadata.cart);

  Items.map((item) => {
    Product.findByIdAndUpdate(item._id , 
      { countInStock : (item.countInStock - item.quantity) } ,
       (err)=>{

      if(err){
        console.log("Error");
      } else {
        console.log("Worked")
      }

    })
  })
}

//////////////////////////////////////////////////
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
    updateProducts(customer)
    //console.log("Processed Order:", savedOrder);
  } catch (err) {
    console.log(err);
  }
};

//////////////////////////////////////////////////
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
          createOrder(customer, data);
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => console.log(err.message));
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();

});

//////////////////////////////////////////////////
//Get all Products
router.get("/myorders", (req, res) => {

  Order.find({} , (err , docs)=>{

  if(!err){
      return res.send(docs);
  } else {
      return res.status(400).json({ message: 'Something went wrong' });
  }

  })

});

//////////////////////////////////////////////////
router.post('/myorderbyid/', (req, res) => {

  Order.find({_id : req.body.orderid}, (err, docs) => {
    if(!err){
      return res.send(docs[0]);
    } else {
      return res.status(400).json({ message: 'Something went wrong'})
    }
  })
})


module.exports = router;
