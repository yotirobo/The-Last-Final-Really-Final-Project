express = require("express");
var router = express.Router();
var fs = require("fs");
const sql = require('mysql');

//connection with database todos
const con = sql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'z10mz10m',
  database: "final_project_DB"
})

/* GET users listing. */

router.get('/', (req , res )=> {
  let sql = `select * from user where user = '${req.query.username}'`
  con.query(sql, (err, result) => {
    if (err) { console.log(err); return; }
    res.send(result[0])
  })
})

router.post("/", function (req, res) {
  let sql = `SELECT username,password
  FROM user 
  JOIN Passwords 
  using(user_id)
  WHERE username = '${req.body.username}'`
  con.query(sql, (err, result) => {
    if (err) { console.log(err); return; }
    console.log(result[0]);
    if (result[0]) {
      if (result[0]?.password === req.body.password) {
        res.status(200).send(true);
      }
      else {
        res.status(200).send(false)
      }
    }
    else {
      res.status(200).send(false)
    }
  })
});

router.post("/register", function  (req, res) {
  let sql = `select name from user where name = '${req.body.name}'`
  con.query(sql, (err, result) => {
    if (err) { console.log(err); return; }
    if (req.body.name === "" || req.body.password === "" || req.body.email === "" || req.body.age === NaN || req.body.creditCard.length != 16 || req.body.genre === "" || typeof(req.body.Account_expiration_date) === Date ) {
      res.status(406).send(false)
    }
    else {
      sql = `insert into user (name, email, age ,favorite_genre, is_admin , Account_expiration_date ) values ('${req.body.name}', '${req.body.email}', ${req.body.age},'${req.body.genre}' ,${req.body.is_admin},'${req.body.Account_expiration_date}')`;
       con.query(sql, (err, result) => {
        let user_id = `SELECT user_id FROM user WHERE name = '${req.body.name}'`
        if (err) { console.log(err); res.status(406).send(false);return; }
        sql = `insert into password (user_id, password , credit_card) values ((${user_id}),'${req.body.password}' , '${req.body.creditCard}')`;
       con.query(sql,(err, result) => {
          if (err) { console.log(err); res.status(406).send(false); }
          else res.status(200).send(true);
        })
      })
      
    }
  })
});

module.exports = router;