var express = require('express');
var router = express.Router();
var mysql = require('mysql');
// let fromApp = require('../app');
let moment = require('moment');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "final_project_DB"
});

//
// function sendData(req, res, what, were, tableNameOp) {
//     let tableName = tableNameOp ? tableNameOp : req.path.split("/")[1].slice(0, -1);
//     let sql = `SELECT ${what} from ${tableName} ${were}`;
//     con.query(sql, function (err, result) {
//         if (err) { res.send(err.sqlMessage); return; };
//         res.send(JSON.stringify(result));
//     });
// };
// exports.sendData = sendData;

//
// router.get('/:id/todo', function (req, res) {
//   fromApp.sendData(req, res, 'tood_id, title, complited', `WHERE user_id = ${req.params.id}`, 'todo');
// })

// const response = await fetch(`http://localhost:5000/users/${userData.id}/complited-todos`);

// // get only complited todos
// router.get('/:id/complited-todos', function (req, res) { 
//   // fromApp.sendData(`SELECT tood_id, title, complited FROM todo WHERE user_id = ${req.params.id} AND complited = 1`);
//   var sql = `SELECT tood_id, title, complited FROM todo WHERE user_id = ${req.params.id} AND complited = 1`;
//   con.query(sql, function (err, result) {
//     if (err) { res.send(err.sqlMessage); return; };
//     if (!result) {
//       res.send(false);
//       return;
//     }
//     let complitedTodos = [];
//     for (let i in result) {
//       if (result[i].complited===1){
//         complitedTodos.push(result[i]);
//       }
//     }
//     res.send(JSON.stringify(complitedTodos));
//   });
// })

router.get(`/favorite_genre_movies`, function (req, res) {
    let sql = `SELECT m.title, m.photo_src, m.publish_Date, m.likes, m.rate,  m.genre from media m JOIN user u WHERE m.genre = u.favorite_genre AND u.user_id = ${req.query.user_id} AND m.movie_or_TVShow="movie" AND m.deleted=0`;
    con.query(sql, function (err, result) {
        let newDate = moment.utc(result[0].publish_Date).format('MM/DD/YY');
        console.log('converted date', newDate); // 09/23/21 
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