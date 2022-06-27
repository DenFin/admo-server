const express = require('express')
const router = express.Router()

const ContactController = require('../controllers/contact.controller')

router.get('/', ContactController.getContacts)
router.get('/:id', ContactController.getContactById)
router.post('/', ContactController.createContact)
router.delete('/:id', ContactController.deleteContactById)

router.get('/count', ContactController.getContactsCount)

module.exports = router