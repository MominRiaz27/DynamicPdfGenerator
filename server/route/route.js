const Router = require('express');
const { pdfFunction, uploadfunction } = require('../pdfFile/pdfFile');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.post('/createpdf', async (req, res) => {
  try {
    await pdfFunction(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/uploadpdf', upload.single('pdfFile'), uploadfunction) 


module.exports = router;