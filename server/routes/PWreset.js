const nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
let con = require('../tables-constructor');

async function sendEmail(to ,text) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user:"yotielh@gmail.com",
      pass: 'Yoti12345'
    }
    });
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


router.get('/', function(req, res, next) {
        let sql = `select password from user where user_id = '${req.query.user_id}'`
        con.query(sql, (err, result) => {
          if (err) { console.log(err); return; }
          console.log('get'+result);
          res.send(result)
          let email = req.query.email 
          sendEmail(email , result.password)
        })
});