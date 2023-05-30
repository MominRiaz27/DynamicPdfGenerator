const hbs = require('handlebars');
const path = require('path');
const puppeteer = require('puppeteer');

const fs = require('fs');



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
    
    res.setHeader('Content-Disposition', "PdfFileName");
    
    res.contentType('application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

const uploadfunction = async function (req, res) {
  console.log("hiii");
  console.log(req.file);
  if (!req.file) {
    res.send({
      status:400, 
      message:'No PDF File Provided'});
    return;
    return;
  }

  const pdfFile = req.file;
  const originalFilename = pdfFile.originalname;
  
  const uploadDirectory = path.join(path.dirname(__dirname), 'uploads');
  const uploadPath = path.join(uploadDirectory, originalFilename);

  console.log("inside ");
  console.log(uploadPath);

  // Check if the file already exists in the directory
  if (fs.existsSync(uploadPath)) {
    console.log("inside if");
    fs.unlinkSync(pdfFile.path); // Delete the uploaded file
    res.send({
      status:300, 
      message:'File already exists'});
    return;
  }

  // Create the upload directory if it doesn't exist
  if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
  }

  fs.rename(pdfFile.path, uploadPath, (error) => {
    console.log("here")
    if (error) {
      console.error(error);
      res.send({
        status:500, 
        message:'Failed To upload PDF File'
      });
    } else {
      res.send({
        status:200, 
        message:'PDF file uploaded and saved successfully'
      });
    }
    
  });
};


module.exports = {pdfFunction, uploadfunction};
