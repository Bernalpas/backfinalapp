// Librerias
import nodemailer from 'nodemailer';

// Importamod dotenv
import dotenv from 'dotenv';
dotenv.config();

export const enviarMail = async(nombre, email) => {

    console.log(nombre, email); 

    try {
        // Create a transporter using SMTP
            const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });

            // configurar el email
            const mailOptions = {
                from: process.env.SMTP_USER,
                to: email,
                subject: 'Registro de Usuario',
                text: `Hola ${nombre}, tu cuenta ha sido registrada con éxito.`,
                html: `<h1>Registro de Usuario</h1><p>Hola ${nombre}, tu cuenta ha sido registrada con éxito. Gracias por confiar en nuestra aplicación.</p>`,
            };

            // enviar el email
            await transporter.sendMail(mailOptions);
            console.log('Email enviado con éxito');


    } catch (err) {
        console.log(err);
    }

}