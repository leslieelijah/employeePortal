'use strict';

/* Start the express */
<<<<<<< HEAD
var express = require('express');
var app = express();
var cons = require('consolidate');
=======
var http = require('http');
var express = require('express');
var app = express();
var cons = require('consolidate');
var fs = require('fs');
>>>>>>> 10a8e39d955d2b1bebedf170f557e5b5c876977a
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var http = require('http');

var port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(cors());

/* set .html as the default extension */
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

<<<<<<< HEAD
/* Routes */
app.get('/', function (req, res, next) {
    res.render('index.html');   
});

/* Mysql connect */
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'kd',
    password: '13$5Ngwakz',
    database: 'kd',
    port:8889
});

connection.connect((err) => {

if (!err)
    console.log("Connected to MySQL DB!")
else
    console.log(err)

})

/** API **/
app.get('/api/getEmployee',((req,res) => {
connection.query('select * from details', ((err, results, fields) => {
    if (!err){
            console.log(results);
            res.send(results);

    }
        
    else
        console.log(err);
}));
}));

/* Post Employees to Details */
app.post('/api/addEmployee', ((req, res) => {

        var data = req.body;

        var db = {
                    firstName: req.body.firstName,
                    surname: req.body.surname,
                    age: req.body.age,
                    gender: req.body.gender,
                    race: req.body.race,
                    province: req.body.province,
                    department: req.body.department,
                    cellNumber: req.body.cellNumber,
                    emailAddress: req.body.emailAddress,
                    residentialAddress: req.body.residentialAddress
                };

/* var employeeDetails = req.body; */

var sql = 'INSERT INTO details(firstName, surname, age, gender, race, province, department, cellNumber, emailAddress, residentialAddress) VALUES (?)';

connection.query(sql, db,  ((error, results, fields) => {

                if (error)
                    throw error;
                else {
                    res.status(201).send("Success");
                }

}));

}));

/* Re-directs all non API to the index page */
app.get('/', function (req, res, next) {
    res.render('index.html');
});

/* Start the express Server */
http.createServer(app).listen(app.get('port'), function () {    
    console.log('The server is running at port: ' + port + "...");
    app.listen(port);
});
/**/
=======
/* Mysql connect */
var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '222$Cod1n9',
            database: 'kolobje'
});

connection.connect((err) => {
    return new Promise((resolve, reject) => {
        if (!err)
            resolve("Connected to MySQL DB!")
        else
            reject(err)
    })
})

/***
 *API
***/

/* Get Employees Details */
app.get('/api/getEmployee', function (req, res) {
    connection.query('select * from kolobje.details', function (err, results, fields) {
        return new Promise((resolve, reject) => {
            if (err)
                reject(err)
            else {
                resolve(JSON.stringify(res.send(results)));
                console.log(results)
            }
        })
    })
});

/* Post Employees to Details */
app.post('/api/addEmployee', function (req, res) {

    var data = req.body;

    var db = {
        firstName: req.body.firstName,
        surname: req.body.surname,
        age: req.body.age,
        gender: req.body.gender,
        race: req.body.race,
        province: req.body.province,
        department: req.body.department,
        cellNumber: req.body.cellNumber,
        emailAddress: req.body.emailAddress,
        residentialAddress: req.body.residentialAddress
    };

    /* var employeeDetails = req.body; */

    var sql = 'INSERT INTO details(firstName, surname, age, gender, race, province, department, cellNumber, emailAddress, residentialAddress) VALUES (?)';

    connection.query(sql, db, function (error, results, fields) {

        if (error)
            throw error;
        else {
            res.status(201).send("Success");
        }
        
    });
});

//Re-directs all non API to the index page
app.get('/', function (req, res, next) {
    res.render('index.html');
});

//Start the express Server
http.createServer(app).listen(app.get('port'), function () {    
    console.log('The server is running... ' + app.get('port'));
});
app.listen(port);
>>>>>>> 10a8e39d955d2b1bebedf170f557e5b5c876977a
