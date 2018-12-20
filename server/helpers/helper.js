const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

module.exports = {
  hash: (password) => {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    return hash
  },
  token: (data) => {
    let token = jwt.sign({
      email: data.email
    }, process.env.SECRET)
    return token
  },
  compare: (password, input) => {
    return bcrypt.compareSync(input, password)
  },
  sentMail: (data) => {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'gamecowo12345@gmail.com',
        pass: 'gamecowo54321'
      }
    })

    let mailOption = {
      from: 'gamecowo12345@gmail.com',
      to: data.email,
      subject: data.subject,
      html: data.html
    }

    transporter.sendMail(mailOption, function (error, info) {
      if(error) console.log(error)
      else console.log(info)
    })
  }
}