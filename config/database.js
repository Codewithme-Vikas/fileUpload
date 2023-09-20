const mongoose = require('mongoose')
require('dotenv').config()

exports.databaseConnection = ()=>{
    mongoose.connect( process.env.MONGO_URL)
            .then( res => console.log('successfully connected to mongoose'))
            .catch( err =>{
                console.log('data base is not connected')
                console.log( err )
                process.exit(1)
            })
};