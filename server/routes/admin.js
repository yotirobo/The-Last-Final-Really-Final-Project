var express = require('express');
var router = express.Router();
var mysql = require('mysql');
let fromMysqlInsert = require('../routes/mySQL_DB_first_Insert');
let con = require('../tables-constructor');




//function that inserts into media table:
router.post('/media', function (req, res, next) {
    fromMysqlInsert.insertIntoTable('media', 'title, video_src, photo_src, deleted, publish_Date, likes, genre, rate, movie_or_TVShow', req , res)
});

router.post('/media/addMovie', function (req, res, next) {
    console.log('me:', req.body.movie_or_TVShow === 'movie');
    const sql = `INSERT INTO media ( title , video_src, photo_src, deleted, publish_Date, likes, genre, rate, movie_or_TVShow) VALUES ?`;
    let values = [req.body.title, req.body.movie_or_TVShow === 'movie'? './Media/Movies/comind-soon2.webm' : './Media/TV-Shows/coming-soon.webm' , req.body.movie_or_TVShow === 'movie'? './Media/Movies-Photos/coming-soon.png' : './Media/TV-Shows-photos/coming-soon2.png', req.body.deleted, req.body.publish_Date, req.body.likes, req.body.genre, req.body.rate ,req.body.movie_or_TVShow];
    console.log("sql: ", sql);
    con.query(sql, [[values]], function (err, result) {
        if (err) {console.log(err); res.send(err); return; };
        res.send(JSON.stringify(result));
    })
});

router.get(`/allMedia`, function (req, res) {
    let sql = `SELECT title from media`;
    con.query(sql, function (err, result) {
        if (err) { res.send(err.sqlMessage); return; };
        res.send(JSON.stringify(result));
    });
})

//traking:
router.get(`/traking`, function (req, res) {
    let sql = `SELECT a.action_type, a.description, a.time, u.name FROM action a JOIN user u ON (a.user_id=u.user_id)`;
    con.query(sql, function (err, result) {
        if (err) { res.send(err.sqlMessage); return; };
        res.send(JSON.stringify(result));
    });
})

router.post('/media/deleteMovie', function (req, res, next) {
    console.log('server')
    const sql = `UPDATE media SET deleted = 1 WHERE title ='${req.query.movieName}'`;
    con.query(sql, function (err, result) {
        if (err) {console.log(err); res.send(err); return; };
        res.send(JSON.stringify(result));
    })
});

module.exports = router;
