const Router = require('express');
const pdfFunction = require('../pdfFile/pdfFile')
//import ExpressValidator from 'express-validator';
const router = Router();

router.post('/createpdf', async (req, res) => {
    try {
      await pdfFunction(req, res);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  module.exports = router;