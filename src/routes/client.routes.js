const express = require('express')
const router = express.Router()

const ClientController = require('../controllers/client.controller')

router.get('/', ClientController.getClients)
router.get('/:id', ClientController.getClientById)
router.patch('/:id', ClientController.editClientById)
router.post('/', ClientController.createClient)

module.exports = router