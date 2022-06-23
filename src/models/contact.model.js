const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    dob: {
        type: Date,
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
    avatar: {
        type: String,
    },
    category: {
        type: String,
    },
    user: {
        type: String,
    }
})

module.exports = mongoose.model('Contact', contactSchema);