const express = require('express')
const router = express.Router()

const ClientController = require('../controllers/client.controller')

router.get('/', ClientController.getClients)
router.post('/', ClientController.createClient)

module.exports = router