const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config(); // Load environment variables

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL, // Your Gmail
        pass: process.env.PASSWORD, // Your Gmail App Password
    },
});

// Handle contact form submission
app.post("/send", async (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: email,
        to: process.env.EMAIL, // Your email to receive messages
        subject: subject || `New Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        console.error("❌ Email not sent:", error);
        res.status(500).json({ success: false, message: "Failed to send message." });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});


