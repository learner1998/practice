const express = require('express')
const app = express();
const appUserRoute = require('./routes/appuserRoute')
const employeeRoute = require('./routes/employeeRoute')
const morgan = require('morgan')
const auth = require('./middleware/auth')
const colors = require('colors');
const AppUser = require('./Models/appuser');
require('./db/mongoose')
app.use(express.json())
const PORT = process.env.PORT  || 3000



//Dev logging middleware
if(process.env.NODE_ENV!=="production"){
    app.use(morgan('dev'))
}


// server under maintenance middleware!
// app.use((req,res,next)=>{
//         res.status(503).send('server under maintenance!')
// })

app.use('/appusers',appUserRoute)
app.use('/employees',employeeRoute)


app.listen(PORT,
    console.log(`Server running in ${process.env.NODE_ENV } mode on port ${PORT}`.green)
)