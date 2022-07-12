const Invoice = require("../../models/invoice.model");
const FORTNIGHT = 12096e5

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
}