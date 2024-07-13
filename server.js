const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static HTML file
app.use(express.static(path.join(__dirname, 'public')));

app.post('/send-email', (req, res) => {
    const { name, place, phone, menu, time } = req.body;

    // Create a transporter object
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'akksown1@gmail.com',
            pass: 'staycorn12'
        }
    });

    const mailOptions = {
        from: 'akksown1@gmail.com',
        to: 'iwonjin32@gmail.com',
        subject: 'New Reservation',
        text: `Name: ${name}\nPlace: ${place}\nPhone Number: ${phone}\nMenu: ${menu}\nTime: ${time}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email');
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
