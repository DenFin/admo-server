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
 * ROUTES
 */
const contactRouter = require("./src/routes/contact.routes")


app.get('/', (req, res) => {
    res.send('TEST')
})

app.use("/api/v1/contacts", contactRouter)

app.listen(process.env.PORT, console.log(`Server started on port ${process.env.PORT}`));

