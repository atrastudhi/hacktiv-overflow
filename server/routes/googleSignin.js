const express = require('express')
const router = express.Router()
const googleController =require('../controllers/googleController')

router.post('/', googleController.signin)
router.post('/login', googleController.login)

module.exports = router