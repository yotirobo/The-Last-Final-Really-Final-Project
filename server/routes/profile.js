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
  let sql = `select * from user where user_id = '${req.query.user_id}'`
  con.query(sql, (err, result) => {
    if (err) { console.log(err); return; }
    console.log(result);
    res.send(result)
  })
})

module.exports = router;