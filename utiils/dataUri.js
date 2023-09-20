const DatauriParser = require("datauri/parser")
const path = require("path")

const getDataUri = ( file  )=>{

    const parser = new DatauriParser();
    const extenstion = path.extname( file.originalname )
    
    return parser.format( extenstion , file.buffer);

}

module.exports =  getDataUri;