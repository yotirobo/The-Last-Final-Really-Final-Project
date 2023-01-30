express = require("express");
var router = express.Router();
var fs = require("fs");
const sql = require('mysql');

const con = sql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'z10mz10m',
  database: "final_project_DB"
})

router.get('/', (req , res )=> {
  let sql = `select * from user where name = '${req.query.name}'`
  con.query(sql, (err, result) => {
    if (err) { console.log(err); return; }
    console.log(sql);
    console.log(result);
    res.send(result)
  })
})

router.post("/", function (req, res) {
  let sql = `SELECT name ,password
  FROM user 
  JOIN password 
  using(user_id)
  WHERE name = '${req.body.name}'`
  con.query(sql, (err, result) => {
    if (err) { console.log(err); return; }
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