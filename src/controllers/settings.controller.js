const Settings = require('../models/settings.model')

exports.getSettingsByUserId = async (req, res) => {
    const userId = req.params.userId
    const query = { userId: userId }
    try {
        const result = await Settings.findOne(query)
        console.log(result)
        res.json(result)
    } catch(error) {
        console.log(error)
    }
}

exports.createSettings = async (req, res) => {
    console.log(req.body)
    const newSettingsObj = {
        generalInformation: {
            logoUrl: req.body.logoUrl,
            companyName: req.body.companyName,
            companyStreet: req.body.companyStreet,
            companyCity: req.body.companyCity,
            companyZip: req.body.companyZip,
            taxNumber: req.body.taxNumber,
            taxId: req.body.taxId,
        },
        userId: req.body.userId
    }
    const settings = new Settings(newSettingsObj)
    try {
        const result = await settings.save()
        res.status(201).json(result)
    } catch (error) {
        console.log(error.message)
    }
}

exports.getGeneralInformation = async (req, res) => {
    const generalInformation = await Settings.find()
    res.status(200).json(generalInformation)
}

exports.createGeneralInformation = async (req, res) => {
    const newSettingsObj = {
        generalInformation: {
            logoUrl: req.body.logoUrl,
            companyName: req.body.companyName,
            companyStreet: req.body.companyStreet,
            companyCity: req.body.companyCity,
            companyZip: req.body.companyZip,
            taxNumber: req.body.taxNumber,
            taxId: req.body.taxId,
        }
    }
    const generalInformation = new Settings(newSettingsObj)
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

exports.saveLogoUrl = async (req, res) => {
    console.log(req.body.publicUrl,)
    const query = { userId: req.body.userId }
    const options = { "upsert": true };
    const updatedObj = {
        generalInformation: {
            logoUrl: req.body.publicUrl
        }
    }
    try {
        const result = await Settings.findOneAndUpdate(query, updatedObj, options)
        console.log("test", result)
        res.json('TEST')
    } catch(error) {
        console.log(error)
    }


}