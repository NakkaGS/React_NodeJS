const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");
var crypto = require('crypto'); 

const UserSchema = mongoose.Schema({

    name: {
        type: String,
        require
    },

    email: {
        type: String,
        require
    },

    hash : String,
    salt : String
    
})

// Method to generate a hash from plain text
UserSchema.methods.setPassword = function(password) {
     
    // Creating a unique salt for a particular user
       this.salt = crypto.randomBytes(16).toString('hex');
     
       // Hashing user's salt and password with 1000 iterations,64 length and sha512 digest
       this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
   };
  
// Validating the candidate password with stored hash and hash function
UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, 
    this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.hash === hash;
};

const User = mongoose.model('users', UserSchema);

module.exports = User;