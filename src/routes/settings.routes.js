const express = require('express')
const router = express.Router()

const SettingsController = require('../controllers/settings.controller')

router.get('/general-information', SettingsController.getGeneralInformation)
router.post('/general-information', SettingsController.createGeneralInformation)
router.patch('/general-information/:id', SettingsController.updateGeneralInformationById)

module.exports = router