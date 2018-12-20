const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = {
  isValid: (req, res) => {
    try {
      let verify = jwt.verify(req.headers.token, process.env.SECRET)
      User
        .findOne({
          email: verify.email
        })
        .then(user => {
          if(!user) {
            res.status(400).json({
              msg: 'invalid token'
            })
          } else {
            res.status(200).json(user)
          }
        })
        .catch(err => {
          res.status(400).json(err)
        })
    } catch (err) {
      res.status(400).json(err)
    }
  }
}