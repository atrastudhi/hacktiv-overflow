const mongoose = require('mongoose')
const Schema = mongoose.Schema
const helper = require('../helpers/helper')

const userSchema = new Schema ({
  email: {
    type: String,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    required: [true, 'email field cannot be empty'],
    validate: {
      validator: function (value) {
        return User.findOne({
          email: value
        })
        .then(user => {
          if(user) return false
        })
        .catch(err => {
          console.log(err)
        })
      },
      message: props => 'email must be unique'
    }
  },
  password: {
    type: String,
    required: [true, 'password field cannot be empty'],
    validate: {
      validator: function (value) {
        let password = value.trim()
        if(password.length < 1) return false
      },
      message: props => 'password cannot be empty'
    }
  },
  loginMethod: {
    type: String
  }
})

userSchema.pre('save', function (next) {
  this.password = helper.hash(this.password)
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User

