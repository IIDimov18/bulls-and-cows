var nodemailer = require('nodemailer');

export default class Mailer{

    static transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS 
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    static sendMail(reciever: string, subject: string, text:string){
        
        let result=true;
        const mailOptions = {
            from: process.env.EMAIL,
            to: reciever,
            subject: subject,
            text: text
          };
        
        this.transporter.sendMail(mailOptions, function(error,info){
            if(error){
                result = error;
            }
        });
        return result
    }
}