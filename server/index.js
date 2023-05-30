// Import essential libraries 
const express = require('express'); 
const app = express(); 
const dataRouter = require("./route/route.js") 
const cors = require("cors")


app.use(express.json())
app.use(cors())

app.use('/api', dataRouter);

app.listen(process.env.port || 3000, () => {
    console.log('Running at Port 3000')
})



