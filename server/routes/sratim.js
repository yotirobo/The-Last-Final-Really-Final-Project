// var express = require('express');
// var router = express.Router();
// var mysql = require('mysql');
// // let fromApp = require('../app');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "z10mz10m",
//   database: "final_project_DB"
// });

// //
// // function sendData(req, res, what, were, tableNameOp) {
// //     let tableName = tableNameOp ? tableNameOp : req.path.split("/")[1].slice(0, -1);
// //     let sql = `SELECT ${what} from ${tableName} ${were}`;
// //     con.query(sql, function (err, result) {
// //         if (err) { res.send(err.sqlMessage); return; };
// //         res.send(JSON.stringify(result));
// //     });
// // };
// // exports.sendData = sendData;

// //
// // router.get('/:id/todo', function (req, res) {
// //   fromApp.sendData(req, res, 'tood_id, title, complited', `WHERE user_id = ${req.params.id}`, 'todo');
// // })

// // const response = await fetch(`http://localhost:5000/users/${userData.id}/complited-todos`);

// // // get only complited todos
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

// router.get(`/favorite_genre_movies/user?user=${userData.name}`, function(req, res) {

// })

// module.exports = router;
