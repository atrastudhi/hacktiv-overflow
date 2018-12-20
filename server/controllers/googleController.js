const User = require('../models/user')
const helper = require('../helpers/helper')

module.exports = {
  signin: (req, res) => {
    User.findOne({
      email: req.body.email
    })
    .then(user => {
      if(user && user.loginMethod === 'register') {
        res.status(400).json({
          msg: 'you already registered via web'
        })
      } else if(user && user.loginMethod === 'google') {
        res.status(200).json({
          msg: 'success login'
        })
      } else {
        User.create({
          email: req.body.email,
          password: 'googleSignin',
          loginMethod: 'google'
        })
        .then(data => {
          res.status(200).json({
            msg: 'success login'
          })
        })
        .catch(err => {
          res.status(400).json(err)
        })
      }
    })
    .catch(err => {
      res.status(400).json(err)
    })
  },
  login: (req, res) => {
    User.findOne({
      email: req.body.email
    })
    .then(user => {
      if(!user) {
        res.status(400).json({
          msg: 'wrong email'
        })
      } else {
        if(user.loginMethod === 'register') {
          res.status(400).json({
            msg: 'you already registered via web, please login via web'
          })
        } else {
          console.log(user)
          let compare = helper.compare(user.password, 'googleSignin')
          if(!compare) {
            res.status(400).json({
              msg: 'wrong password'
            })
          } else {
            res.status(200).json({
              email: user.email,
              token: helper.token(user)
            })
          }
        }
      }
    })
    .catch(err => {
      res.status(400).json(err)
    })
  }
}