const Contact = require('../models/contact.model')
const paginate = require('jw-paginate')
const { validationResult } = require('express-validator');

exports.getContacts = async function(req, res) {
    console.log(req.query)
    const contacts = await Contact.find()
    const page = parseInt(req.query.page) || 1;
    const pageSize = 5;
    const pager = paginate(contacts.length, page, pageSize);

    const items = contacts.slice(pager.startIndex, pager.endIndex + 1);

    res.status(200).json({ pager,items })
}

exports.getContactById = async (req, res) => {
    let contact;
    console.log(req.params)
    try {
        contact = await Contact.findById(req.params.id)
    } catch(error){
        console.log(error)
    }
    res.status(200).json(contact)
}

exports.getContactNameById = async (req, res) => {
    let contact;
    console.log(req.params)
    try {
        contact = await Contact.findById(req.params.id)
    } catch(error){
        console.log(error)
    }
    res.status(200).json({ firstname: contact.firstname, lastname: contact.lastname })
}

exports.createContact = async function(req, res, next) {

    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        const contact = new Contact({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            dob: req.body.dob,
            street: req.body.street,
            city: req.body.city,
            zip: req.body.zip
        })
        const result = await contact.save()
        res.status(201).json(result)
    } catch (error) {
        console.log(error.message)
        return next(error)
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
    console.log('contactsCount', contactsCount)
    res.status(200).json(contactsCount)
}