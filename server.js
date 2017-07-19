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
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var json = require('express-json');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(json());

var port = process.env.PORT || 4000;

app.use('assets', express.static(__dirname + '/public'));

//set .html as the default extension 
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

//Routes
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

//Get all Employess API
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

//Post Employees to MySQL
app.post('/api/addEmployee', function (req, res, next) {

    var input = JSON.parse(JSON.stringify(req.body));

    var xy = {
        firstName: input.firstName,
        surname: input.surname,
        age: input.age,
        gender: input.gender,
        race: input.race,
        province: input.province,
        department: input.department,
        cellNumber: input.cellNumber,
        emailAddress: input.emailAddress,
        residentialAddress: input.residentialAddress
    };

    connection.query("INSERT INTO employeeportal.details SET ? ", xy, function (error, rows) {
        if (error) {
            throw error;
        }
        else {
            res.end(JSON.stringify(rows));
        }
    });

});

var server = http.createServer(app);
server.listen(port);
console.log("The server is running...");
