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
    console.log(result);
    res.send(result)
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


module.exports = router;