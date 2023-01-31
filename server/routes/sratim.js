var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "final_project_DB"
});

router.get(`/favorite_genre_movies`, function (req, res) {
    let sql = `SELECT m.title, m.photo_src, m.video_src, m.publish_Date, m.likes, m.rate,  m.genre FROM media m JOIN user u WHERE m.genre = u.favorite_genre AND u.user_id = ${req.query.user_id} AND m.movie_or_TVShow="movie" AND m.deleted=0`;
    con.query(sql, function (err, result) {
        if (err) { res.send(err.sqlMessage); return; };
        res.send(JSON.stringify(result));
    });
})
//
router.get(`/unwatched_movies`, function (req, res) {
    let sql = `SELECT DISTINCT m.title, m.photo_src, m.video_src, m.publish_Date, m.likes, m.rate, m.genre FROM media m LEFT JOIN user_watched uw ON m.media_id = uw.media_id AND uw.user_id = ${req.query.user_id} WHERE m.movie_or_TVShow = "movie" AND m.deleted = 0 AND uw.media_id IS NULL`;
    con.query(sql, function (err, result) {
        if (err) { res.send(err.sqlMessage); return; };
        res.send(JSON.stringify(result));
    });
})

router.get(`/watched_movies`, function (req, res) {
    let sql = `SELECT DISTINCT m.title, m.photo_src, m.video_src, m.publish_Date, m.likes, m.rate, m.genre FROM media m JOIN user_watched uw ON m.media_id = uw.media_id AND uw.user_id = ${req.query.user_id} WHERE m.movie_or_TVShow="movie" AND m.deleted=0`;
    con.query(sql, function (err, result) {
        if (err) { res.send(err.sqlMessage); return; };
        res.send(JSON.stringify(result));
    });
})

router.get('/photo', (req, res) => {
    res.sendFile(req.query.photo_src, { root: './Media/Movies-Photos' })
});

router.get('/toVideo', (req, res) => {
    res.sendFile('About Fate.webm', { root: './Media/Movies' })
});

module.exports = router;

// router.get('/', (req , res )=> {
//     let sql = `select * from user where name = '${req.query.name}'`
//     con.query(sql, (err, result) => {
//       if (err) { console.log(err); return; }
//       console.log(sql);
//       console.log(result);
//       res.send(result)
//     })
//   })