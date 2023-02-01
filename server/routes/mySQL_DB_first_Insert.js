var express = require('express');
var router = express.Router();
var mysql = require('mysql');
let con = require('../tables-constructor');

function insertIntoTable(table_name, table_columns, req, res) {
    con.connect(function (err) {
        if (err) throw err;
        var sql = `INSERT INTO ${table_name} (${table_columns}) VALUES ?`;
            var values = [req.body.data];
            con.query(sql, values, function (err, result) {
                if (err) throw err;
                console.log("Number of records inserted: " + result.affectedRows);
            });
    });
    console.log(`insret to ${table_name} worked!`);
    res.send(`insret to ${table_name} worked!`);
};

exports.insertIntoTable = insertIntoTable;

router.post('/media', function (req, res, next) {
    insertIntoTable('media', 'title, video_src, photo_src, deleted, publish_Date, likes, genre, rate, movie_or_TVShow', req , res)
});

router.post('/user', function (req, res, next) {
    insertIntoTable('user', 'name, email, age, favorite_genre, is_admin, Account_expiration_date', req , res)
});

router.post('/password', function (req, res, next) {
    insertIntoTable('password', 'user_id, password, credit_card', req , res)
});

router.post('/user_watched', function (req, res, next) {
    insertIntoTable('user_watched', 'user_id, media_id, liked, rate', req , res)
});

router.post('/post', function (req, res, next) {
    insertIntoTable('post', 'user_id, media_id, title, body, deleted', req , res)
});

router.post('/action', function (req, res, next) {
    insertIntoTable('action', 'action_type, description, time, user_id', req , res)
});

module.exports = router;
