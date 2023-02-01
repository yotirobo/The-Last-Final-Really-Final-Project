var express = require('express');
var router = express.Router();
var mysql = require('mysql');
let fromMysqlInsert = require('../routes/mySQL_DB_first_Insert');
let con = require('../tables-constructor');




//function that inserts into media table:
router.post('/media', function (req, res, next) {
    fromMysqlInsert.insertIntoTable('media', 'title, video_src, photo_src, deleted, publish_Date, likes, genre, rate, movie_or_TVShow', req , res)
});

//traking:
router.get(`/traking`, function (req, res) {
    let sql = `SELECT a.action_type, a.description, a.time, u.name FROM action a JOIN user u ON (a.user_id=u.user_id)`;
    con.query(sql, function (err, result) {
        if (err) { res.send(err.sqlMessage); return; };
        res.send(JSON.stringify(result));
    });
})

module.exports = router;
