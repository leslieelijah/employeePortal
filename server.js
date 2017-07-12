'use strict';

//Start the express
var express = require('express');
var app = express();
var cons = require('consolidate');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var port = process.env.PORT || 4000;

app.use('/assets', express.static(__dirname + '/public'));
app.use('/models', express.static(__dirname + '/models'));

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

connection.connect();

var sqlQuery = "INSERT INTO details(firstName, surname, age, gender, race, province, department, cellNumber, emailAddress, residentialAddress) VALUES ?";
var result = req.body;
var values = req.body.firstName + "" + req.body.surname + "" + req.body.age + "" + req.body.gender + "" + req.body.race + "" + req.body.province + "" + req.body.department + "" + req.body.cellNumber + "" + req.body.emailAddress + "" + req.body.residentialAddress;

app.post('/', (req,res) => {
  
    connection.query(sqlQuery, [result], (err, result) => {
        return new Promise((resolve, reject) => {
            if (err){
                reject(res.send(err));
            }else{
                resolve(res.sendStatus(200));
            }
                
        })
    });
});


app.listen(port);
console.log("The server is running...");
