const Contact = require('../models/contact.model')

exports.getContacts = async function(req, res) {
    const contacts = await Contact.find()
    res.status(200).json(contacts)
}

exports.createContact = async function(req, res) {
    const contact = new Contact({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        dob: req.body.dob,
    })
    try {
        const result = await contact.save()
        res.send(result)
    } catch (error) {
        console.log(error.message)
    }
}