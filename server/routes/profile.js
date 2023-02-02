express = require("express");
var router = express.Router();
let con = require('../tables-constructor');
const moment = require('moment');

router.get('/', (req , res )=> {
  let sql = `select * from user where user_id = '${req.query.user_id}'`
  con.query(sql, (err, result) => {
    if (err) { console.log(err); return; }
    res.send(result)
  })
})

router.post('/edit', (req, res )=> {
  let sql = `UPDATE user SET name ='${req.body.name}' , email = '${req.body.email}', age = ${req.body.age} ,favorite_genre = '${req.body.genre}', Account_expiration_date = '${moment.utc(req.body.Account_expiration_date).format('YYYY-MM-DD')}' WHERE user_id = ${req.query.user_id};`
  con.query(sql , (err , result) =>{
    if (err) { console.log(err); return; }
    res.send(result);
  })
})

module.exports = router;