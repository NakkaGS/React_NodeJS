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

        console.log(req.body.user.email)
        console.log(user)
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

module.exports = router