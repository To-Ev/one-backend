const nodemailer = require('nodemailer');

const contact = (req, res) =>{
    const { name, email, subject, message } = req.body;

    if(!name || !email || !subject || !message) return res.status(400).json({ err: "Enter input"});

    try {
        const node_env = process.env.NODE_ENV

        const transporter = () =>{
            if(node_env === "PROD"){
                return nodemailer.createTransport({
                    service: "Gmail",
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    }
                });
            }else{
                return nodemailer.createTransport({
                    host: "sandbox.smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                        user: process.env.MAILTRAP_USER,
                        pass: process.env.MAILTRAP_PASS
                    }
                });
            }
        }

        const mailOptions = {
            from: `${email}`,
            to: "aremuakin@gmail.com",
            subject: `New message from ${name} via portfolio`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        }

        const transport = transporter(); 
        transport.sendMail(mailOptions, (err, info) => { 
            if (err) { console.error("Email not sent:", err); 
                return res.status(500).json({ err: "Failed to send email" }); 
            } 
            return res.status(200).json({ msg: "Email sent!" }); 
        });
    } catch (err) {
        console.error(`Email not sent:`, err);
        return res.status(500).json({ err: "Server error" });
    }
    
}
module.exports = contact