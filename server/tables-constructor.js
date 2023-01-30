var mysql = require('mysql');
let fs = require('fs');
let dir = fs.readdirSync('./tables-data')

// create the database "final_project_DB"
// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "z10mz10m"
//   });
//   con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.query("CREATE DATABASE final_project_DB", function (err, result) {
//       if (err) throw err;
//       console.log("Database created");
//     });
//   });

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "final_project_DB"
});

// function that delete all tables:
// let deleteTables = (dir) => {
// }
// con.connect(function(err) {
//   if (err) throw err;
//   for (let j =  dir.length; j =0; j--) {
//       let currentJson = require(`./tables-data/${dir[j]}`);
//       var sql = `DROP TABLE ${currentJson.table_name}`;
//       con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log(`Table ${currentJson.table_name} deleted`);
//       });
//   }
// });
// deleteTables(dir)

//function that create all tables:
let makeTables = (dir) => {
    con.connect(function (err) {
    for (let j = 0; j < dir.length; j++) {
        let currentJson = require(`./tables-data/${dir[j]}`);
            if (err) throw err; 
            currentJson.table_name;
            console.log("Connected!");
            let fullTable = []
            let primery = [];
            for (let i = 0; i < currentJson.columns.length; i++) {
                fullTable.push(
                    " " + (currentJson.columns[i].col_name) + " " +
                    (currentJson.columns[i].type) +
                    (currentJson.columns[i].AUTO_INCREMENT ? " AUTO_INCREMENT" : "") +
                    // (currentJson.columns[i].PRIMARY_KEY ? "" : "") +
                    (currentJson.columns[i].UNIQUE ? " UNIQUE" : "") +
                    (currentJson.columns[i].NOT_NULL ? " NOT NULL" : "") +
                    (currentJson.columns[i].FOREIGN_KEY ? ", FOREIGN KEY " + "(" + currentJson.columns[i].col_name + ")" + " REFERENCES " + currentJson.columns[i].FOREIGN_KEY + "(" + currentJson.columns[i].col_name + ")" : ""))
                    currentJson.columns[i].PRIMARY_KEY ? primery.push(currentJson.columns[i].col_name) : "";
                }
            fullTable.push(` CONSTRAINT PK_${currentJson.table_name} PRIMARY KEY (${primery})`)
            var sql = `CREATE TABLE ${currentJson.table_name} (
                ${fullTable.join()})`;
                primery = [];
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(`Table ${currentJson.table_name} created`);
            });
        }
    });
}
// makeTables(dir);


// //insert into tables
let media = [['Strange World','./Media/Movies/Strange World.webm', false, '2022-11-24', 52, 'Animated', 7, 'movie'],
             ['The Super Mario Bros. Movie', './Media/Movies/The Super Mario Bros. Movie.webm', false, '2023-04-7', 255, 'Animated', 6.7, 'movie'],
             ['Luck', './Media/Movies/Luck.webm', false, '2022-08-02', 88, 'Animated', 9, 'movie'],
             ['The Sea Beast', './Media/Movies/The Sea Beast.webm', false, '2022-06-25', 100, 'Animated', 2.5, 'movie'],
             ['HOPE', './Media/Movies/HOPE.webm', false, '2020-06-03', 32, 'Animated', 8.3, 'movie'],
             ['THE WEDDING YEAR','./Media/Movies/THE WEDDING YEAR.webm', false, '2019-09-19', 23, 'Comedy', 8, 'movie'],
             ['HOUSE PARTY','./Media/Movies/HOUSE PARTY.webm', false, '2023-01-13', 55, 'Comedy', 4, 'movie'],
             ['SENIOR YEAR','./Media/Movies/SENIOR YEAR.webm', false, '2022-05-13', 64, 'Comedy', 3.6, 'movie'],
             ['You People','./Media/Movies/You People.webm', false, '2023-01-20', 29, 'Comedy', 7.7, 'movie'],
             ['ME TIME','./Media/Movies/ME TIME.webm', false, '2022-08-26', 110, 'Comedy', 9.2, 'movie'],
             ['Day Shift', './Media/Movies/Day Shift.webm', false, '2022-08-12', 67, 'Action', 9.2, 'movie'],
             ['John Wick: Chapter 4', './Media/Movies/John Wick: Chapter 4.webm', false, '2023-03-24', 52, 'Action', 9.2, 'movie'],
             ['Black Adam', './Media/Movies/Black Adam.webm', false, '2022-10-20', 74, 'Action', 7.5, 'movie'],
             ['Teen Wolf: The Movie', './Media/Movies/Teen Wolf: The Movie.webm', false, '2023-01-26', 33, 'Action', 3.3, 'movie'],
             ['GUILLERMO DEL TORO`S PINOCCHIO', './Media/Movies/GUILLERMO DEL TORO`S PINOCCHIO.webm', false, '2022-11-24', 65, 'Action', 4.5, 'movie'],
             ['ALL MY LIFE', './Media/Movies/ALL MY LIFE.webm', false, '2022-12-04', 77, 'Romance', 6, 'movie'],
             ['ME AND MR. RIGHT', './Media/Movies/ME AND MR. RIGHT.webm', false, '2014-12-12', 84, 'Romance', 9.8, 'movie'],
             ['Purple Hearts', './Media/Movies/Purple Hearts.webm', false, '2022-07-29', 25, 'Romance', 3.1, 'movie'],
             ['About Fate', './Media/Movies/About Fate.webm', false, '2022-09-09', 63, 'Romance', 2.2, 'movie'],
             ['THE INVITATION', './Media/Movies/THE INVITATION.webm', false, '2022-08-29', 118, 'Romance', 7.3, 'movie'],
             ['ALICE DARLING ', './Media/Movies/ALICE DARLING .webm', false, '2022-12-30', 64, 'Drama', 4.6, 'movie'],
             ['Irreplaceable You', './Media/Movies/Irreplaceable You.webm', false, '2018-02-16', 93, 'Drama', 6.2, 'movie'],
             ['The Good Nurse', './Media/Movies/The Good Nurse.webm', false, '2022-09-11', 62, 'Drama', 7, 'movie'],
             ['The Wonder', './Media/Movies/The Wonder.webm', false, '2022-11-04', 97, 'Drama', 2.6, 'movie'],
             ['DEAR ZOE', './Media/Movies/DEAR ZOE.webm', false, '2022-11-04', 37, 'Drama', 1.7, 'movie'],            
             ['Thief', './Media/TV-Shows/Thief.webm', false, '2022-04-28', 91, 'Animated', 3.3, 'TVShow'],
             ['Morning!', './Media/TV-Shows/Morning!.webm', false, '2022-04-28', 91, 'Animated', 3.3, 'TVShow'],
             ['This is it?', './Media/TV-Shows/This is it?.webm', false, '2017-02-07', 72, 'Animated', 1.6, 'TVShow'],
             ['Stop motion,', './Media/TV-Shows/Stop motion.webm', false, '2017-07-19', 39, 'Animated', 7.8, 'TVShow'],
             ['Funny', './Media/TV-Shows/Funny.webm', false, '2016-04-30', 95, 'Animated', 8.1, 'TVShow'],
             ['Toast', './Media/TV-Shows/Toast.webm', false, '2017-12-31', 82, 'Comedy', 7.8, 'TVShow'],
             ['The Elevator', './Media/TV-Shows/The Elevator.webm', false, '2014-03-22', 13, 'Comedy', 1.4, 'TVShow'],
             ['The Loop', './Media/TV-Shows/The Loop.webm', false, '2013-05-02', 53, 'Comedy', 3.2, 'TVShow'],
             ['My Wilson', './Media/TV-Shows/My Wilson.webm', false, '2018-08-13', 94, 'Comedy', 1.2, 'TVShow'],
             ['Stone', './Media/TV-Shows/Stone.webm', false, '2023-10-18', 17, 'Comedy', 6.7, 'TVShow'],             
             ['WARLIKE', './Media/TV-Shows/WARLIKE.webm', false, '2022-11-04', 37, 'Action', 4.7, 'TVShow'],
             ['Exile', './Media/TV-Shows/Exile.webm', false, '2022-12-05', 56, 'Action', 6.6, 'TVShow'],
             ['CRIMINAL', './Media/TV-Shows/CRIMINAL.webm', false, '2018-04-24', 86, 'Action', 2.8, 'TVShow'],
             ['The Wait', './Media/TV-Shows/The Wait.webm', false, '2022-01-05', 24, 'Action', 1.2, 'TVShow'],
             ['Incognito', './Media/TV-Shows/Incognito.webm', false, '2023-04-17', 64, 'Action', 6.7, 'TVShow'],
             ['Love in Reverse', './Media/TV-Shows/Love in Reverse.webm', false, '2013-12-30', 62, 'Romance', 1.8, 'TVShow'],
             ['Breathe', './Media/TV-Shows/Breathe.webm', false, '2009-09-04', 17, 'Romance', 7.4, 'TVShow'],
             ['A Story', './Media/TV-Shows/A Story.webm', false, '2017-02-17', 45, 'Romance', 1.2, 'TVShow'],
             ['Life', './Media/TV-Shows/Life.webm', false, '2019-05-08', 93, 'Romance', 9.8, 'TVShow'],
             ['Trapped', './Media/TV-Shows/Trapped.webm', false, '2020-12-22', 74, 'Romance', 2.4, 'TVShow'],
             ['Tear', './Media/TV-Shows/Tear.webm', false, '2021-11-03', 42, 'Drama', 7.8, 'TVShow'],
             ['Lockdown', './Media/TV-Shows/Lockdown.webm', false, '2023-05-09', 37, 'Drama', 7.3, 'TVShow'],
             ['Script', './Media/TV-Shows/Script.webm', false, '2027-02-11', 63, 'Drama', 4.2, 'TVShow'],
             ['NOISES', './Media/TV-Shows/NOISES.webm', false, '2023-08-18', 11, 'Drama', 2.7, 'TVShow'],
             ['Perfection', './Media/TV-Shows/Perfection.webm', false, '2016-10-25', 42, 'Drama', 6.5, 'TVShow']];

let user = [['David Cohen', 'David1@gmail.com', 16, 'Comedy', false, '2025-04-28'],
            ['Josef Hansen', 'Josef1@gmail.com', 34, 'Action', false, '2023-02-17'],
            ['Aviva Dayan', 'AvivaDayan@gmail.com', 65, 'Romance', true, '2500-01-01']];

let password = [[1, 'Davidi123', '1919191919191919'],
                [2, 'jojo1988', '1232343454565678'],
                [3, 'avivadayan', '7667800352719406']];

let user_watched = [[1, 34, true, 3],
                    [1, 12, true, 9],
                    [1, 22, false, 1],
                    [1, 5, true, 8],
                    [1, 7, false, 3],
                    [2, 8, false, null],
                    [2, 1, true, 8],
                    [2, 12, false, 2],
                    [3, 44, false, null],
                    [3, 17, true, 7]];

let post = [[1, 12, 'Love this movie!', 'This is the best movie everr', false],
            [1, 22, 'Not so good', 'I`m disapointed', false],
            [1, 5, 'A quite good movie', 'One of my favorite movies', true],
            [2, 12, 'I like this movie too', 'The bigining is great', false],
            [2, 8, 'I wonder if someone would like to watch this movie', 'Not recommend', false],
            [3, 44, 'What a goot TV show', 'When we will be able to watch the next episode?', false],
            [3, 44, 'I think i will watch all this show again', 'Can all the TV show be like this one?', false]];

let action = [['added post', 'added post id 1', '2023-01-29 15:10:33', 1],
              ['added post', 'added post id 2', '2023-01-29 18:11:27', 1],
              ['added post', 'added post id 3', '2023-01-29 20:22:03', 1],
              ['added post', 'added post id 4', '2023-01-29 22:43:32', 2],
              ['added post', 'added post id 5', '2023-01-30 10:22:02', 2],
              ['added post', 'added post id 6', '2023-01-30 11:22:13', 3],
              ['added post', 'added post id 7', '2023-01-30 12:55:32', 3],
              ['deleted post', 'deleted post id 3', '2023-01-29 20:24:03', 1],
              ['likes media', 'likes media id 34', '2023-01-28 10:32:23', 1],
              ['likes media', 'likes media id 12', '2023-01-29 15:10:36', 1],
              ['likes media', 'likes media id 5', '2023-01-29 20:22:00', 1],
              ['likes media', 'likes media id 1', '2023-01-29 10:54:39', 2],
              ['likes media', 'likes media id 17', '2023-01-30 16:35:33', 3],
              ['remove like', 'remove like on media id 12', '2023-01-29 22:43:29', 2],
              ['remove like', 'remove like on media id 44', '2023-01-30 16:35:40', 3],
              ['rated media', 'rated media id 34 with an 3 star rating', '2023-01-28 10:32:24' ,1],
              ['rated media', 'rated media id 12 with an 9 star rating', '2023-01-29 15:10:38' ,1],
              ['rated media', 'rated media id 22 with an 1 star rating', '2023-01-29 18:11:24' ,1],
              ['rated media', 'rated media id 5 with an 8 star rating', '2023-01-29 20:22:05' ,1],
              ['rated media', 'rated media id 7 with an 3 star rating', '2023-01-29 20:22:11' ,1],
              ['rated media', 'rated media id 1 with an 8 star rating', '2023-01-29 10:54:40' ,2],
              ['rated media', 'rated media id 12 with an 2 star rating', '2023-01-29 22:43:33' ,2],
              ['rated media', 'rated media id 17 with an 7 star rating', '2023-01-30 16:35:37' ,3]];

// fetch('http://localhost:5000/firstInsert/media', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({data: media})
// })

// fetch('http://localhost:5000/firstInsert/user', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({data: user})
// })

// fetch('http://localhost:5000/firstInsert/password', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({data: password})
// })

// fetch('http://localhost:5000/firstInsert/user_watched', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({data: user_watched})
// })

// fetch('http://localhost:5000/firstInsert/post', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({data: post})
// })

fetch('http://localhost:5000/firstInsert/action', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({data: action})
})
