const nodemailer = require("nodemailer")
require("dotenv").config()

const transporter = nodemailer.createTransport({
    host : 'smtp.gmail.com',
    port : 587,
    auth : {
        user : process.env.MAIL_ID,
        pass : process.env.MAIL_PASS_KEY,
    }
});


async function sendMail( senderEmail , receiversEmails , subject , text , html ){
    const info = transporter.sendMail({
        from : senderEmail,
        to : receiversEmails,
        subject : subject,
        text  : text,
        html : html
    });
};


module.exports = sendMail;