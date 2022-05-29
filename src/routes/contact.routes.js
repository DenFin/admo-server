const express = require('express')
const router = express.Router()

const ContactController = require('../controllers/contact.controller')

router.get('/', ContactController.getContacts)


module.exports = router