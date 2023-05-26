const hbs = require('handlebars');
const fs = require('fs-extra');
const path = require('path');
const puppeteer = require('puppeteer');
const data = require("../data.json");

hbs.registerHelper('equal', function (a, b, options) {
  if (a === b) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});


const compile = async function (templateName, data) {
  const filePath = path.join(process.cwd(), 'templates', `${templateName}.hbs`);
  const html = await fs.readFile(filePath, 'utf8');
  return hbs.compile(html)(data);
};

const pdfFunction = async function (req, res) {
  const abc = {
    "title": " Dynamic Pdf Genrator ",
    "user": req.body
  };
  console.log("abc data is: ", abc);
  try {
    const compiledHTML = await compile('index', abc);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(compiledHTML);
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true
    });
    await browser.close();
    console.log("response is generated");
    
    // Set the PDF file name in the response headers
    const fileName = 'example.pdf'; // Replace with your desired file name
    res.setHeader('Content-Disposition', "PdfFileName");
    
    res.contentType('application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = pdfFunction;
