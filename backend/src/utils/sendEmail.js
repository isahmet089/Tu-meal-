const nodemailer = require("nodemailer");

require("dotenv").config();
// Brevo SMTP ayarları

const BREVO_EPOSTA = process.env.BREVO_EPOSTA;
const BREVO_SIFRE = process.env.BREVO_SIFRE;

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587, // TLS için 587, SSL için 465
    secure: false,
    auth: {
        user: BREVO_EPOSTA, // Brevo e-posta adresin
        pass: BREVO_SIFRE // Brevo API anahtarın (SMTP şifren)
    }
});

// E-posta gönderme fonksiyonu
const sendEmail = async (to, subject, htmlContent) => {
    try {
        const mailOptions = {
            from: '"Benim Uygulamam" <tumeal@outlook.com.tr>',
            to,
            subject,
            html: htmlContent
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("E-posta başarıyla gönderildi:", info.response);
        return info;
    } catch (error) {
        console.error("E-posta gönderme hatası:", error);
        throw error;
    }
};

module.exports = sendEmail;