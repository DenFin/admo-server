const Client = require('../models/client.model')

exports.getClients = async function(req, res) {
    const clients = await Client.find()
    res.status(200).json(clients)
}


exports.createClient = async function(req, res) {
    const client = new Client({
        company: req.body.company,
        street: req.body.street,
        city: req.body.city,
        zip: req.body.zip
    })
    try {
        const result = await client.save()
        res.status(201).json(result)
    } catch (error) {
        console.log(error.message)
    }
}
