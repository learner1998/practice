const express = require('express')
const app = express();
const dotenv = require('dotenv')
//env variables
dotenv.config({ path: '/config/config.env' })
const PORT = process.env.PORT  || 3000


//start server
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`)
)