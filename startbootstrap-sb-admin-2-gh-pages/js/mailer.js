/* To send mail, set your service below and the user/pass in .env file.
   Default Service: gmail.
*/

const nodemailer = require('nodemailer');
const emailService = 'gmail';


function sendEmail({userName, email, subject, html}){
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: emailService,
            auth:{
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            }

        })
        const mail_config = {
            from: 'IT Ticketing System'.concat(' - ', process.env.GMAIL_USER),
            to: email,
            subject: subject.concat(' - ', userName),
            html: html,
        }

        transporter.sendMail(mail_config, function(error, info) {
            if(error){
                console.log(error)
                return reject({message:"Email encountered an error."})
            }
            return resolve({message: "Email sent successfully."})

        })
    });
}

exports.sendEmail = sendEmail;