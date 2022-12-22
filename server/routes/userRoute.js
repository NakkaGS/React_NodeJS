const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const User = require('../models/userModel')

var bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))


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

router.post('/login', (req, res) => { 

    // Find user with requested email 
    User.findOne({ email : req.body.user.email }, function(err, user) { 
        if (user === null) { 
            return res.status(400).send({ 
                message : "User not found."
            }); 
        } 
        else { 
            if (user.validPassword(req.body.user.password)) { 
                return res.status(201).send({ 
                    message : "User Logged In", 
                }) 
            } 
            else { 
                return res.status(400).send({ 
                    message : "Wrong Password"
                }); 
            } 
        } 
    }); 
}); 

module.exports = router