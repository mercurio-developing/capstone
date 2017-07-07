'user strict'

const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const secretKey = "ale"
var deepPopulate = require('mongoose-deep-populate')(mongoose);

const Schema = mongoose.Schema,
      ObjectId =  Schema.Types.ObjectId;
      
const UserSchema =  new Schema ({

    firstName : {
        type : String,
        required : true
        },
    lastName : {
        type : String,
        required : true
    },
    email: {
        type:String,
        required: true,
        unique:true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password:{
        type:String,
        required:true
    },
    reviews : [{
        type: ObjectId,
        ref:'Review'
        }],
    travelOfCreator : [{
        type: ObjectId,
        ref:'Travel'
        }]
})

// authenticate input against database documents
UserSchema.statics.authenticate = function (email, password, callback) {
    User.findOne({email: email})
        .exec(function (err, user) {
            if (err) {
                return callback(err);
            } else if (!user) {
                const err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    console.log(user)
                    return callback(null, user);
                } else {
                    return callback(err);
                }
            })
        });
    };

UserSchema.methods.generateJwt = function () {
    return jwt.sign({
      email: this.email
    }, secretKey ,{ expiresIn: 18000 })
};

// hash password before saving to database
UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, 10 ,function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

