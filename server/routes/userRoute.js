const express = require("express");
const router = express.Router();

const User = require('../models/userModel')

var bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

//Register a New User
router.post("/register", (req,res) => {

    User.find({email: req.body.user.email}, (err, docs) => {

        if(docs.length > 0){
            return res.status(400).send({ 
                message : "Something went wrong"
            })

        } else {

            const newUser = new User({
                name: req.body.user.name,
                email: req.body.user.email
              });
            
            newUser.setPassword(req.body.user.password);

            newUser.save(err => {
                if(!err){
                    res.send('User Registration Success!')
                    console.log("User Registered")
                } else {
                    res.send("Something went wrong")
                }
            })
        }

        if(err){
            console.log(err)
            return res.status(400).send({ 
                message : "Something went wrong"
            }); 
        }
    })

})

//Login
router.post('/login', (req, res) => { 

    // Find user with requested email 
    User.findOne({ email : req.body.user.email, password : req.body.user.password }, function(err, user) { 

        if (user === null) { 
            console.log("Not Found")
            return res.status(400).send({ 
                message : "User not found."
            }); 
        } 
        else { 
            if (user.validPassword(req.body.user.password)) { 
                console.log("User is logged")

                return res.send(user)
            } 
            else { 
                return res.status(400).send({ 
                    message : "Wrong Password"
                }); 
            } 
        } 
    }); 
}); 

//Login
router.post('/getuserbyid', (req, res) => { 

    // Find user with requested email 
    User.findOne({ _id : req.body._id }, function(err, user) { 

        if(err){
            return res.status(400).send({ 
                message : "Wrong Password"
            }); 
        } else {
            return res.send(user)
        }
    }); 
}); 

router.post('/profile/', (req,res) => {
    console.log(req.body)
    User.findByIdAndUpdate(req.body._id ,
        { name : req.body.name, email: req.body.email}, function(err, docs) {
            console.log(docs)
        if(err){
            return res.status(400).send({ 
                message : "Wrong Password"
            }); 
        } else {
            return res.send(docs)
        }
  
      })
})

router.put('/profile/update/', (req,res) => {
    console.log(req.body)
    User.findByIdAndUpdate(req.body._id , 
        { name : req.body.name, email: req.body.email}, {new: true}, function(err, docs) {
            console.log(docs)
        if(err){
            return res.status(400).send({ 
                message : "Wrong Password"
            }); 
        } else {
            return res.send(docs)
        }
  
      })
})

module.exports = router