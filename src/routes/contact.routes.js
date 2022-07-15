const express = require('express')
const router = express.Router()

const ContactController = require('../controllers/contact.controller')

router.get('/', ContactController.getContacts)
router.get('/count', ContactController.getContactsCount)
router.get('/:id', ContactController.getContactById)
router.get('/:id/name', ContactController.getContactNameById)
router.post('/', ContactController.createContact)
router.delete('/:id', ContactController.deleteContactById)

module.exports = router