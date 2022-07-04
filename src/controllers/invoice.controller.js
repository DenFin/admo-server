const Invoice = require('../models/invoice.model')
const PdfService = require('../services/pdf/pdf.service')

const { createClient } = require('@supabase/supabase-js')

const STORAGE_URL = process.env.SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_API_KEY

exports.getInvoices = async (req, res) => {
    const invoices = await Invoice.find()
    res.status(200).json(invoices)
}

exports.getInvoiceById = async (req, res) => {
    let invoice;
    console.log(req.params)
    try {
        invoice = await Invoice.findById(req.params.id)
    } catch(error){
        console.log(error)
    }
    res.status(200).json(invoice)
}
exports.getInvoicePdfById = async (req, res) => {
    const supabase = createClient(STORAGE_URL, SERVICE_KEY)
    const result = await supabase
        .storage
        .from('invoices')
        .list()
    res.status(200).json(result)
}


exports.createInvoice = async (req, res) => {
    const invoice = new Invoice({
        nr: req.body.nr,
        client: req.body.client,
        title: req.body.title,
        date: req.body.date,
        dateRangeStart: req.body.dateRangeStart,
        dateRangeEnd: req.body.dateRangeEnd,
        status: req.body.status,
        items: req.body.items,
        billingTotal: req.body.billingTotal,
        billingTaxes: req.body.billingTaxes,
        billingTotalWithTaxes: req.body.billingTotalWithTaxes
    })
    try {
        const result = await invoice.save()
        res.status(201).json(result)
    } catch (error) {
        console.log(error.message)
    }
}

exports.createInvoicePdf = async (req, res) => {
    const invoiceId = req.params.id
    let invoice;
    try {
        invoice = await Invoice.findById(req.params.id)
        await PdfService.createPdfAndUpload()
    } catch(error){
        console.log(error)
    }

    console.log(invoiceId)
    res.status(201).json({invoiceId, invoice})
}

exports.createInvoicePdfAndUpload = async (req, res) => {
    const result = await PdfService.createPdfAndUpload()
    if(!result.error) {
        console.log(`${result.data.key} was succesfully uploaded`)
    }
    if(result?.error?.statusCode === '23505') {
        console.log('File already exists')
    }
    res.json("WORKS")
}