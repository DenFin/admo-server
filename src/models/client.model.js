const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
    },
    street: {
        type: String,
    },
    zip: {
        type: String,
    },
    city: {
        type: String,
    },
})

module.exports = mongoose.model('Client', clientSchema);