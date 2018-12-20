const User = require('../models/user')
const helper = require('../helpers/helper')
const kue = require('kue')
const queue = kue.createQueue()
const fs = require('fs')

queue.process('registerEmail', function ({data}, done) {
  const email = fs.readFileSync('./email/index.html', 'utf8')
  helper.sentMail({
    email: data.email,
    subject: 'Successfully register to hacktiv overflow',
    html: email
  })
  done()
})

module.exports = {
  create: (req, res) => {
    User.create({
      email: req.body.email,
      password: req.body.password,
      loginMethod: 'register'
    })
    .then(user => {
      queue.create('registerEmail', {
        email: req.body.email
      }).save( function (err) {
        if(!err) {
          res.status(200).json({
            email: req.body.email,
          })
        }
      })
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
        if(user.loginMethod === 'google') {
          res.status(400).json({
            msg: 'you already registered via google, please login via google'
          })
        } else {
          let compare = helper.compare(user.password, req.body.password)
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