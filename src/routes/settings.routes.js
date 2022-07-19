const express = require('express')
const router = express.Router()

const SettingsController = require('../controllers/settings.controller')


router.post('/', SettingsController.createSettings)
router.post('/logo', SettingsController.saveLogoUrl)

router.get('/general-information', SettingsController.getGeneralInformation)
router.post('/general-information', SettingsController.createGeneralInformation)
router.patch('/general-information/:id', SettingsController.updateGeneralInformationById)
router.get('/:userId', SettingsController.getSettingsByUserId)

module.exports = router