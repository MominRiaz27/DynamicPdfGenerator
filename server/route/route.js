const Router = require('express');
const { pdfFunction, uploadfunction } = require('../pdfFile/pdfFile');
const multer = require('multer');
const passport = require('passport')
const upload = multer({ dest: 'uploads/' });
const router = Router();

const CLIENT_URL = "http://localhost:5173/";


router.post('/createpdf', async (req, res) => {
  try {
    await pdfFunction(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/uploadpdf', upload.single('pdfFile'), uploadfunction) 

// router.get("/google", (req, res) => {
//   console.log('Received request for Google login');
//   passport.authenticate("google", { scope: ["profile"] })(req, res);
// });

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/login/success", (req, res) => {
  console.log("user is : ",req.user)
  if (req.user) {
    res.send({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout(); // Log the user out (if using Passport.js)
  req.session = null;
  res.redirect(CLIENT_URL); // Redirect to the client-side URL after logout
  
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);


module.exports = router;