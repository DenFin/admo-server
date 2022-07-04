const { createClient } = require('@supabase/supabase-js')
const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");
const templateHtml = fs.readFileSync(`${__dirname}/invoice_pdf_template.html`, 'utf8')
const name = __dirname

const STORAGE_URL = process.env.SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_API_KEY

exports.createPdfAndUpload = async (invoice) => {
    // launch a new chrome instance
    const browser = await puppeteer.launch({
        headless: true
    })
    // create a new page
    const page = await browser.newPage()

    const data = {
        "_id": "62c185dd790a3fd989104405",
        "nr": "2022-001",
        "client": "Client name",
        "title": "Invoice title",
        "date": new Date(),
        "dateRangeStart": null,
        "dateRangeEnd": null,
        "status": "pending",
        "items": "1. Logo Desgin / 2. Webdesign",
        "billingTotal": "600",
        "billingTaxes": "20",
        "billingTotalWithTaxes": "620",
        "__v": 0
    }
    const year = data.date.getFullYear()
    const month = data.date.getMonth() + 1
    const path = `temp/${year}/${month}/${data.nr}.pdf`
    const fileName = `${data.nr}.pdf`

    // create handlebars template form HTML file
    const template = handlebars.compile(templateHtml);
    const html = template(data);
    const options = {
        width: '1230px',
        headerTemplate: "<p></p>",
        footerTemplate: "<p></p>",
        displayHeaderFooter: false,
        margin: {
            top: "10px",
            bottom: "30px"
        },
        printBackground: true,
    }
    createFolderStructure(year, month)
    await createPdfFile(page, html, year, month, data, browser)
    return await uploadPdfFile(path, year, month, fileName)
}

async function createPdfFile(page, html, year, month, data, browser) {
    const path = `temp/${year}/${month}/${data.nr}.pdf`

    await page.setContent(html, {
        waitUntil: 'domcontentloaded'
    })
    // await page.emulateMedia('screen');
    await page.focus('body');
    const session = await page.target().createCDPSession();
    await session.send('DOM.enable');
    await session.send('CSS.enable');
    session.on('CSS.fontsUpdated', event => {
        console.log(event);
        // event will be received when browser updates fonts on the page due to webfont loading.
    });

    const pdfBuffer = await page.pdf({
        format: 'A4'
    })

    await page.pdf({
        format: 'A4',
        path: path,
        printBackground: true
    })

    // close the browser
    await browser.close()
}

async function uploadPdfFile(path, year, month, fileName){
    // TODO: Should client be created once in service?
    const supabase = createClient(STORAGE_URL, SERVICE_KEY)
    const file = fs.readFileSync(path)
    const bucketPath = `${year}/${month}/${fileName}`
    const res = await supabase
        .storage
        .from('invoices')
        .upload(bucketPath, file);
    return res
}

function createFolderStructure(_year, _month) {
    const baseDir = 'temp/'
    const currentYearDir = `${baseDir}${_year}`
    const currentMonthDir = `${baseDir}${_year}/${_month}`
    createYearDirectory(currentYearDir)
    createMonthDirectory(currentMonthDir)
}

function createYearDirectory(_year) {
    if (fs.existsSync(_year)) return;

    fs.mkdirSync(_year, {
        recursive: true
    })
}

function createMonthDirectory(_month) {
    if (fs.existsSync(_month)) return;
    fs.mkdirSync(_month, {
        recursive: true
    })
}


/**
 * TEST
 */
