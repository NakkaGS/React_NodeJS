const express = require("express");
const router = express.Router();

const User = require('../models/userModel')

var bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

//////////////////////////////////////////////////
//Register a New User
router.post("/register", (req,res) => {

    User.find({email: req.body.user.email}, (err, docs) => {

        if(docs.length > 0){
            return res.status(400).send({ message : "Something went wrong" })

        } else {

            const newUser = new User({
                name: req.body.user.name,
                email: req.body.user.email
              });
            
            newUser.setPassword(req.body.user.password);

            newUser.save(err => {
                if(!err){
                    res.send('User Registration Success!')
                } else {
                    res.send("Something went wrong")
                }
            })
        }

        if(err){
            return res.status(400).send({ message : "Something went wrong" }); 
        }
    })

})

//////////////////////////////////////////////////
//Login
router.post('/login', (req, res) => { 

    // Find user with requested email 
    User.findOne({ email : req.body.user.email, password : req.body.user.password }, function(err, user) { 

        if (user === null) { 
            return res.status(400).send({ message : "User not found." }); 
        } 
        else { 
            if (user.validPassword(req.body.user.password)) { 

                return res.send(user)
            } 
            else { 
                return res.status(400).send({ message : "Wrong Password" }); 
            } 
        } 
    }); 
}); 

//////////////////////////////////////////////////
//Get User Data by ID
router.post('/getuserbyid', (req, res) => { 

    // Find user with requested email 
    User.findOne({ _id : req.body._id }, function(err, user) { 

        if(err){
            return res.status(400).send({ message : "User not found" }); 
        } else {
            return res.send(user)
        }
    }); 
}); 

//////////////////////////////////////////////////
//Get all Users
router.get('/getallusers', (req, res) => { 

    // Find user with requested email 
    User.find({ }, function(err, user) { 

        if(err){
            return res.status(400).send({ message : "No Users found" }); 
        } else {
            return res.send(user)
        }
    }); 
}); 

//////////////////////////////////////////////////
//Get User Data
router.post('/profile/', (req,res) => {
    User.findByIdAndUpdate(req.body._id ,
        { name : req.body.name, email: req.body.email }, function(err, docs) {

        if(err){
            return res.status(400).send({ message : "User not found" }); 
        } else {
            return res.send(docs)
        }
  
      })
})

//////////////////////////////////////////////////
//Update User Data
router.put('/profile/update/', (req,res) => {
    User.findByIdAndUpdate(req.body._id , 
        { name : req.body.name, email: req.body.email }, { new: true} , function(err, docs) {

        if(err){
            return res.status(400).send({ message : "Not possible to update Profile" }); 
        } else {
            return res.send(docs)
        }
  
      })
})

module.exports = router