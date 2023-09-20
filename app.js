const express = require("express")

const { databaseConnection } = require("./config/database")
const { cloudinaryConnection } = require("./config/cloudinary")

const app = express()

// port 
require('dotenv').config()
const PORT = process.env.PORT


// middelware
app.use( '/static' , express.static(  __dirname + '/public') );



// database connection
databaseConnection();

// connect to cloudinary
cloudinaryConnection();

// API routes - mount the routes
const fileUpload = require("./routes/fileUpload");

app.use('/api/v1/uploads/' , fileUpload );



// activate server
app.listen( PORT , ()=>{
    console.log(`server is running on the port http://localhost:${PORT}`);
});