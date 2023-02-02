var express = require('express');
var router = express.Router();
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

//set video as watched in the database
router.get('/watched', (req, res) => {
    let sql = `SELECT * FROM user_watched uw WHERE uw.media_id=${req.query.media_id} AND uw.user_id=${req.query.user_id}`;
    con.query(sql, function (err, result) {
        if (result.length === 0) {
            var sql = `INSERT INTO user_watched (user_id, media_id, liked, rate) VALUES ?`;
            var values = [req.query.user_id, req.query.media_id, false, null];
            con.query(sql, [[values]], function (err, result) {
                if (err) throw err;
            });
        };
        if(result.length) res.send(JSON.stringify({rate: result[0].rate, liked: result[0].liked}));
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
        if (err) throw err;
    });
    //insert into action table
    setTimeout(() => {
        sql = `INSERT INTO action (action_type, description, time, user_id) VALUES ?`;
        var values = ['added post', `added post id ` + `${lastInsertPostId}`, `${moment.utc(new Date()).format('YYYY-MM-DD HH:mm:ss')}`, req.query.user_id];
        con.query(sql, [[values]], function (err, result) {
            if (err) throw err;
        });
    }, 90);
    res.send(JSON.stringify(`your post has been successfully added!`.concat("aaa").concat(Math.random() * 0.5)));
});

router.get('/deletePost', (req, res) => {
    //set as delete in post table
    var sql = `UPDATE post SET deleted=1 WHERE post_id = ${req.query.post_id}`;
    con.query(sql, (err, result) => {
        if (err) { console.log(err); return; }
    })
    //insert into action table
    sql = `INSERT INTO action (action_type, description, time, user_id) VALUES ?`;
    var values = ['deleted post', `deleted post id ${req.query.post_id}`, `${moment.utc(new Date()).format('YYYY-MM-DD HH:mm:ss')}`, req.query.user_id];
    con.query(sql, [[values]], function (err, result) {
        if (err) throw err;
    });
    res.send(JSON.stringify(`post #${req.query.post_id} has been successfully deleted!`.concat("aaa").concat(Math.random() * 0.5)));
});

router.get('/like', (req, res) => {
    //set as liked in user_watched table
    var sql = `UPDATE user_watched SET liked=${req.query.liked} WHERE media_id = ${req.query.media_id} AND user_id = ${req.query.user_id}`;
    con.query(sql, (err, result) => {
        if (err) { console.log(err); return; }
    })
    //insert into action table
    sql = `INSERT INTO action (action_type, description, time, user_id) VALUES ?`;
    var values = [req.query.liked === "true"?  'likes media': 'remove like', req.query.liked === "true"? `likes media id ${req.query.media_id}` : `remove like on media id ${req.query.media_id}`, `${moment.utc(new Date()).format('YYYY-MM-DD HH:mm:ss')}`, req.query.user_id];
    con.query(sql, [[values]], function (err, result) {
        if (err) throw err;
    });
});

router.get('/rate', (req, res) => {
    //set as liked in user_watched table
    var sql = `UPDATE user_watched SET rate=${req.query.rate} WHERE media_id = ${req.query.media_id} AND user_id = ${req.query.user_id}`;
    con.query(sql, (err, result) => {
        if (err) { console.log(err); return; }
    })
    //insert into action table
    sql = `INSERT INTO action (action_type, description, time, user_id) VALUES ?`;
    var values = ['rated media' , `rated media id ${req.query.media_id} with an ${req.query.rate} star rating`, `${moment.utc(new Date()).format('YYYY-MM-DD HH:mm:ss')}`, req.query.user_id];
    con.query(sql, [[values]], function (err, result) {
        if (err) throw err;
    });

    var sql = `UPDATE media m SET m.rate=LEAST((m.rate*10+${req.query.rate})/11, 10) WHERE m.media_id = ${req.query.media_id}`;
    con.query(sql, (err, result) => {
        if (err) { console.log(err); return; }
    })
    res.send(JSON.stringify(Math.random() * 0.5));
});


module.exports = router;