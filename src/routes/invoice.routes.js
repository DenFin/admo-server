const express = require('express')
const router = express.Router()

const InvoiceController = require('../controllers/invoice.controller')

router.get('/', InvoiceController.getInvoices)
router.get('/:id', InvoiceController.getInvoiceById)
router.post('/', InvoiceController.createInvoice)
router.post('/pdf', InvoiceController.createInvoicePdfAndUpload)
router.post('/:id/pdf', InvoiceController.createInvoicePdf)


module.exports = router