const Invoice = require('../models/invoice.model')
const PdfService = require('../services/pdf/pdf.service')

const { createClient } = require('@supabase/supabase-js')

const STORAGE_URL = process.env.SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_API_KEY

const FORTNIGHT = 12096e5



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
        const resultInvoice = await invoice.save()
        const resPdfCreation = await PdfService.createPdfAndUpload(invoice)
        const resPdfDownloadLink = await PdfService.getPdfDownloadLinkByKey(resPdfCreation.data.Key)
        console.log('resPdfCreation', resPdfCreation)
        console.log('PDF LINK', resPdfDownloadLink)
        res.status(201).json({ invoice: resultInvoice, pdf: resPdfCreation, pdfLink: resPdfDownloadLink})
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

exports.deleteInvoiceById = async (req, res) => {
    try {
        const result = await Invoice.deleteOne({ _id: req.params.id })
        res.status(204).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateInvoiceStatus = async (req, res) => {
    const now = Date.now()
    const invoices = await Invoice.find()
    invoices.forEach(invoice => {
        const invoiceDateInMilli = new Date(invoice.date).getTime()
        const dueDate = new Date(invoiceDateInMilli + FORTNIGHT)
        if(now > dueDate) {
            const invoiceUpdated = invoice
            const query = { _id: invoice._id };
            invoice.status = 'due'
            // Update invoice
            const options = { "upsert": true };
            Invoice.updateOne(query, invoiceUpdated, options).then(result => {
                const { matchedCount, modifiedCount } = result;
                if (matchedCount && modifiedCount) {
                    console.log(`Successfully edited invoice.`)
                }
            })
                .catch(err => console.error(`Failed to add review: ${err}`))
        }
    })

    res.json("TEST")
}