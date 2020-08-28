const express = require('express')
const app = express();
const appUserRoute = require('./routes/appuserRoute')
const employeeRoute = require('./routes/employeeRoute')
const dotenv = require('dotenv').config({ path: '/config/config.env' })
const morgan = require('morgan')
const colors = require('colors')
require('./db/mongoose')
app.use(express.json())
// const logger = require('./middleware/logger');
// const Employee = require('./Models/employee')


//env variables
const PORT = process.env.PORT  || 3000


// middleware:- you can create middleware like this.
// app.use(logger)


//Dev logging middleware
if(process.env.NODE_ENV!=="production"){
    app.use(morgan('dev'))
}

app.use('/appusers',appUserRoute)
app.use('/appusers/employees',employeeRoute)




//start server
app.listen(PORT,
    console.log(`Server running in ${process.env.NODE_ENV } mode on port ${PORT}`.green)
)