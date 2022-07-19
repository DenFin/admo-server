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

exports.getClientById = async (req, res) => {
    let client;
    console.log(req.params)
    try {
        client = await Client.findById(req.params.id)
    } catch(error){
        console.log(error)
    }
    res.status(200).json(client)
}

exports.editClientById = async (req, res) => {
    try {
        const query = { _id: req.params.id };
        console.log('query', query)
        const options = { "upsert": true };
        const updatedClient = {
            $set: {
                taxId: req.body.taxId,
            }
        }
        console.log( updatedClient )
        const result = Client.updateOne(query, updatedClient, options).then(result => {
            const { matchedCount, modifiedCount } = result;
            if (matchedCount && modifiedCount) {
                console.log(`Successfully added a new review.`)
            }
        })
            .catch(err => console.error(`Failed to add review: ${err}`))
        res.status(200).json("SUCCESS")

    } catch(error) {
        console.log(error)
    }
}