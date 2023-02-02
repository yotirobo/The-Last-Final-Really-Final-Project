var express = require('express');
const nodemailer = require('nodemailer');
var router = express.Router();
var mysql = require('mysql');
let con = require('../tables-constructor');

async function sendEmail(text) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: yotielh@gmail.com,
      pass: 'Yoti12345'
    }
    });
  // Define the email options
  let mailOptions = {
    from: '"Yotiel tv & movies services" <your-email-address>',
    to: to,
    subject:" hello, your password for Yotiel",
    text: "your password is " + text
  };

  // Send the email
  let info = await transporter.sendMail(mailOptions);

  console.log(`Email sent: ${info.response}`);
}

// Example usage
sendEmail('receiver-email-address', 'Test Email Subject', 'This is the email text.');
Please note that in this example, the Gmail email address and password are used for authentication. You should replace the values with your own Gmail account details and make sure to allow access to less secure apps in your Google account security settings.




