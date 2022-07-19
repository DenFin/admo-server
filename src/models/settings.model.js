const mongoose = require('mongoose')

const GeneralInformationSchema = new mongoose.Schema({
    logoUrl: {
        type: String,
        required: false
    },
    companyName: {
        type: String,
        required: false
    },
    companyStreet: {
        type: String,
        required: false
    },
    companyCity: {
        type: String,
        required: false
    },
    companyZip: {
        type: String,
        required: false
    },
    taxNumber: {
        type: String,
        required: false
    },
    taxId: {
        type: String,
        required: false
    },
})

const settingsSchema = new mongoose.Schema({
    generalInformation: {
        type: GeneralInformationSchema
    },
    userId: {
        type: String,
        required: true
    }
})




module.exports = mongoose.model('Settings', settingsSchema);