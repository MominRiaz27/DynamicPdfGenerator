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

// const abc = {
//     "title":" Frequency Allocation Board ",
//     "users":[
//         {
//         "name":"Momin",
//         "age":27,
//         "country":"Pakistan"
//         }
//     ]
    
// }



// const compile = async function (templateName,data){
//     const filePath = path.join(process.cwd(),'templates',`${templateName}.hbs`)
 
//     const html = await fs.readFile(filePath,'utf8')
//     return hbs.compile(html)(data)
// };

// (async function() {
//     try{
//         const browser = await puppeteer.launch()
 
//         const page = await browser.newPage()
 
//         const content = await compile('index',abc)

//         await page.setContent(content)
 
//         await page.pdf({
//             path:'output.pdf',
//             format:'A4',
//             printBackground:true
//         })
 
//         console.log("done creating pdf")
 
//         await browser.close()
 
//         process.exit()
 
//     }catch(e){
//         console.log(e)
//     }
// })()


