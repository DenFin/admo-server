const Settings = require('../models/settings.model')

exports.getGeneralInformation = async (req, res) => {
    const generalInformation = await Settings.find()
    res.status(200).json(generalInformation)
}

exports.createGeneralInformation = async (req, res) => {
    const generalInformation = new Settings({
        generalInformation: req.body.businessName,
    })
    try {
        const result = await generalInformation.save()
        res.status(201).json(result)
    } catch (error) {
        console.log(error.message)
    }
}

exports.updateGeneralInformationById = async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const options = { "upsert": true };
        const updatedGeneralInformation = {
            $set: {
                generalInformation: req.body.generalInformation,
            }
        }
        console.log( req.body )
        const result = Settings.updateOne(query, updatedGeneralInformation, options)
        console.log("PATCH")
        res.status(200).json("SUCCESS")

    } catch(error) {
        console.log(error)
    }
}

