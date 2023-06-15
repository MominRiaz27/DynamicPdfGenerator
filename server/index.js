// Import essential libraries 
const express = require('express'); 
const app = express(); 
const dataRouter = require("./route/route.js") 
const cors = require("cors");
const cookieSession = require('cookie-session');
const passport = require('passport')
const passportSetup = require('./passport')

app.use(
    cookieSession({ name: "session", keys: ["momin"], maxAge: 24 * 60 * 60 * 100 })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );

app.use('/auth', dataRouter);

app.listen(process.env.port || 3000, () => {
    console.log('Running at Port 3000')
})



