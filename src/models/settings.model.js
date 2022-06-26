const mongoose = require('mongoose')

const settingsSchema = new mongoose.Schema({
    generalInformation: {
        type: Object
    }
})

module.exports = mongoose.model('Settings', settingsSchema);