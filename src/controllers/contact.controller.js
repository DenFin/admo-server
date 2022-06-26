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
        res.status(201).json(result)
    } catch (error) {
        console.log(error.message)
    }
}

exports.deleteContactById = async (req, res) => {
    try {
        const result = await Contact.deleteOne({ _id: req.params.id })
        res.status(204).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getContactsCount = async function(req, res) {
    const contactsCount = await Contact.countDocuments()
    res.status(200).json(contactsCount)
}