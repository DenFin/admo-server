require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const { handleError, ErrorHandler } = require('./src/services/error/errorHandler')

/**
 * DATABASE
 */
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })




/**
 * MIDDLEWARE
 */
app.use(express.json())
app.use(cors());
app.use("/uploads", express.static('uploads'));
app.use("/files", express.static('files'));
app.use((err, req, res, next) => {
    handleError(err, res);
});


/**
 * MIDDLEWARE
 */
app.use(express.json())


/**
 * ROUTES
 */
const authRouter = require("./src/routes/auth.routes")
const contactRouter = require("./src/routes/contact.routes")
const clientRouter = require("./src/routes/client.routes")
const invoiceRouter = require("./src/routes/invoice.routes")
const settingsRouter = require("./src/routes/settings.routes")

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/contacts", contactRouter)
app.use("/api/v1/clients", clientRouter)
app.use("/api/v1/invoices", invoiceRouter)
app.use("/api/v1/settings", settingsRouter)

app.listen(process.env.PORT, console.log(`Server started on port ${process.env.PORT}`));

