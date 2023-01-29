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
let loginRouter = require('./routes/login');
let registerRouter = require('./routes/register');
let profileRouter = require('./routes/profile');
let sdarotRouter = require('./routes/sdarot');
let sratimRouter = require('./routes/sratim');
let videoPlayerRouter = require('./routes/videoPlayer');
let trackingRouter = require('./routes/tracking');
    //mysql routers:
    let userRouter = require('./routes/mySQL_DB/user');
    let passwordRouter = require('./routes/mySQL_DB/password');
    let mediaRouter = require('./routes/mySQL_DB/media');
    let user_watchedRouter = require('./routes/mySQL_DB/user_watched');
    let postRouter = require('./routes/mySQL_DB/post');
    let actionRouter = require('./routes/mySQL_DB/action');

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
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/profile', profileRouter);
app.use('/sdarot', sdarotRouter);
app.use('/sratim', sratimRouter);
app.use('/videoPlayer', videoPlayerRouter);
app.use('/tracking', trackingRouter);
    // use mysql routers:
    app.use('/user', userRouter);
    app.use('/password', passwordRouter);
    app.use('/media', mediaRouter);
    app.use('/user_watched', user_watchedRouter);
    app.use('/post', postRouter);
    app.use('/action', actionRouter);

module.exports = app;
