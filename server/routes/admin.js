var express = require('express');
var router = express.Router();
var mysql = require('mysql');
let fromMysqlInsert = require('../routes/mySQL_DB_first_Insert');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "final_project_DB"
});




//function that inserts into media table:
router.post('/media', function (req, res, next) {
    fromMysqlInsert.insertIntoTable('media', 'title, video_src, photo_src, deleted, publish_Date, likes, genre, rate, movie_or_TVShow', req , res)
});


module.exports = router;