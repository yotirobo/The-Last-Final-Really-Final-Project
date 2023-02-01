var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "final_project_DB"
});

//for the video rendering
router.get('/', (req, res) => {
    let sql = `SELECT * FROM media m WHERE m.media_id=${req.query.media_id}`;
    con.query(sql, function (err, result) {
        if (err) { res.send(err.sqlMessage); return; };
        if (result[0].movie_or_TVShow === "movie"){
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

module.exports = router;
