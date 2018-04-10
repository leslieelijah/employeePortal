'use strict';

/* Start the express */
var express = require('express');
var app = express();
var cons = require('consolidate');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var http = require('http');

var port = process.env.PORT || 4000;

app.use('/assets', express.static(__dirname + '/public'));
app.use('/models', express.static(__dirname + '/models'));

/* set .html as the default extension */
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

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