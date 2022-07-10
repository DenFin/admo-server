const express = require('express')
const router = express.Router()

const InvoiceController = require('../controllers/invoice.controller')


router.get('/', InvoiceController.getInvoices)
router.get('/:id', InvoiceController.getInvoiceById)
router.get('/:id/pdf', InvoiceController.getInvoicePdfById)
router.post('/', InvoiceController.createInvoice)
router.post('/pdf', InvoiceController.createInvoicePdfAndUpload)
router.post('/:id/pdf', InvoiceController.createInvoicePdf)
router.delete('/:id', InvoiceController.deleteInvoiceById)
router.get('/status/update', InvoiceController.updateInvoiceStatus)
module.exports = router