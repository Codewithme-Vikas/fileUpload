const mongoose = require('mongoose');
const sendMail = require('../middleware/nodeMailer');


const fileSchema = new mongoose.Schema({
    name : { type : String , required : true },
    URL : { type : String , required : true },
    tags : String,
    email : { type : String }
});

fileSchema.post('save' , function( doc ){
    try {
        const senderEmail = 'Authentication on file upload <vikash@gmail.com>'
        const receiversEmails = doc.email  // it can be a list -> but as string sepreated by comma
        const subject = "Your file is uploaded!"
        const text = "Your file is"
        const html = `<h1>Your file is successfully uploaded on the cloudinary</h1><a href="${doc.URL}">Your file link is :- ${doc.URL}</a><br/><p>The tags of file are - <strong>${doc.tags}</strong></p><img src="${doc.URL}" alt="file" style="width:600px;height:500px;"/>`

        sendMail( senderEmail , receiversEmails , subject , text , html );
        
    } catch (error) {
        console.log( error , "post on file schema");
    }
})

module.exports = mongoose.model('File', fileSchema);