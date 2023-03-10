var express = require('express');
var router = express.Router();
let con = require('../tables-constructor');

router.get(`/favorite_genre_movies`, function (req, res) {
    let sql = `SELECT * FROM media m JOIN user u WHERE m.genre = u.favorite_genre AND u.user_id = ${req.query.user_id} AND m.movie_or_TVShow="movie" AND m.deleted=0`;
    con.query(sql, function (err, result) {
        if (err) { res.send(err.sqlMessage); return; };
        res.send(JSON.stringify(result));
    });
})

router.get(`/unwatched_movies`, function (req, res) {
    let sql = `SELECT DISTINCT m.media_id, m.title, m.video_src, m.photo_src, m.deleted, m.publish_Date, m.likes, m.genre, m.rate, m.movie_or_TVShow FROM media m LEFT JOIN user_watched uw ON m.media_id = uw.media_id AND uw.user_id = ${req.query.user_id} WHERE m.movie_or_TVShow = "movie" AND m.deleted = 0 AND uw.media_id IS NULL`;
    con.query(sql, function (err, result) {
        if (err) { res.send(err.sqlMessage); return; };
        res.send(JSON.stringify(result));
    });
})

router.get(`/watched_movies`, function (req, res) {
    let sql = `SELECT DISTINCT m.media_id, m.title, m.video_src, m.photo_src, m.deleted, m.publish_Date, m.likes, m.genre, m.rate, m.movie_or_TVShow FROM media m JOIN user_watched uw ON m.media_id = uw.media_id AND uw.user_id = ${req.query.user_id} WHERE m.movie_or_TVShow="movie" AND m.deleted=0`;
    con.query(sql, function (err, result) {
        if (err) { res.send(err.sqlMessage); return; };
        res.send(JSON.stringify(result));
    });
})

router.get('/photo', (req, res) => {
    res.sendFile(req.query.photo_src, { root: './Media/Movies-Photos' })
});

module.exports = router;