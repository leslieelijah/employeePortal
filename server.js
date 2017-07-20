'use strict';

//Start the express
var http = require('http');
var express = require('express');
var app = express();
var cons = require('consolidate');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var json = require('express-json');

app.set('port', process.env.PORT || 4000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//set .html as the default extension 
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

//Re-directs all non API to the index page
app.get('/', function (req, res, next) {
    res.render('index.html');   
});


//Mysql connect
var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '13$Manyape',
            database: 'employeePortal'
});

connection.connect((err) => {
    return new Promise((resolve, reject) => {
        if (!err)
            resolve("Connected to MySQL DB!")
        elsle
            reject(err)
    })
})

//API

//Get Employees Details
app.get('/api/getEmployee', function (req, res) {
    connection.query('select * from employeeportal.details', function (err, results, fields) {
        if (err) {
            throw err;
        }else {
            res.end(JSON.stringify(results));
            console.log(results);
        }
    })

});

//Post Employees to Details
app.post('/api/addEmployee', function (req, res, next) {

    var details = {
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

    var sql = "INSERT INTO employeeportal.details(firstName,surname,age,gender,race,province,department,cellNumber,emailAddress,residentialAddress) VALUES (?)";

    connection.query(sql, [details], function (error, rows, fields) {
        if (error) {
            throw error;
        }
        else {
            res.end(JSON.stringify(rows));
        }
    });

});

//Start the express Server
http.createServer(app).listen(app.get('port'), function () {
    console.log('The server is running... ' + app.get('port'));
});

