var express = require('express');
var router = express.Router();
var mysql = require('mysql');
let con = require('../tables-constructor');
let moment = require('moment');

//for the video rendering
router.get('/', (req, res) => {
    let sql = `SELECT * FROM media m WHERE m.media_id=${req.query.media_id}`;
    con.query(sql, function (err, result) {
        if (err) { res.send(err.sqlMessage); return; };
        if (result[0].movie_or_TVShow === "movie") {
            res.sendFile(result[0].video_src.split('./Media/Movies/')[1], { root: './Media/Movies' })
        }
        else {
            res.sendFile(result[0].video_src.split('./Media/TV-Shows/')[1], { root: './Media/TV-Shows' })
        }
    });
});

//for the video information rendering
router.get('/videoInfo', (req, res) => {
    let sql = `SELECT * FROM media m WHERE m.media_id=${req.query.media_id}`;
    con.query(sql, function (err, result) {
        if (err) { res.send(err.sqlMessage); return; };
        res.send(JSON.stringify(result));
    });
});

//for the video posts rendering
router.get('/videoPosts', (req, res) => {
    let sql = `SELECT * FROM post p JOIN user u ON (p.user_id = u.user_id) WHERE p.media_id=${req.query.media_id} AND p.deleted=0`;
    con.query(sql, function (err, result) {
        if (err) { res.send(err.sqlMessage); return; };
        res.send(JSON.stringify(result));
    });
});

router.get('/addPost', (req, res) => {
    //insert into post table
    let lastInsertPostId;
    var sql = `INSERT INTO post (user_id, media_id, title, body, deleted) VALUES ?`;
    var values = [req.query.user_id, req.query.media_id, req.query.title, req.query.body, false];
    con.query(sql, [[values]], function (err, result) {
        lastInsertPostId = result.insertId
        console.log("🚀 ~ file: videoPlayer.js:44 ~ lastInsertPostId", lastInsertPostId)
        if (err) throw err;
    });
    //insert into action table
    setTimeout(()=>{
        sql = `INSERT INTO action (action_type, description, time, user_id) VALUES ?`;
        var values = ['added post', `added post id ` +`${lastInsertPostId}`, `${moment.utc(new Date()).format('YYYY-MM-DD HH:mm:ss')}`, req.query.user_id];
        con.query(sql, [[values]], function (err, result) {
            if (err) throw err;
        });
    }, 50);
    res.send(JSON.stringify(`insret to post worked!`.concat(Math.random() * 0.5)));
});

module.exports = router;
