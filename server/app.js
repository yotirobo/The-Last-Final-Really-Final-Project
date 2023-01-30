var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors = require('cors');

// let mysql = require('mysql');
// let con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "z10mz10m",
//     database: "final_project_DB"
// });

//routers:
let usersRouter = require('./routes/users');
let profileRouter = require('./routes/profile');
let sdarotRouter = require('./routes/sdarot');
let sratimRouter = require('./routes/sratim');
let videoPlayerRouter = require('./routes/videoPlayer');
let trackingRouter = require('./routes/tracking');
let firstInsertRouter = require('./routes/mySQL_DB_first_Insert.js');

let app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
});

// use routers:
app.use('/users', usersRouter);
app.use('/profile', profileRouter);
// app.use('/movies', sratimRouter);
// app.use('/TVshows', sdarotRouter);
// app.use('/videoPlayer', videoPlayerRouter);
// app.use('/tracking', trackingRouter);
app.use('/firstInsert', firstInsertRouter); //mySQL

module.exports = app;
