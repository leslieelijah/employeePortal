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


//var router = express.Router();
//router = require('./models/routes');

//var salaryApp = require('./models/salaryApp');

//if a port is defined && if not 3000 can be used
var port = process.env.PORT || 4000;

//var app = exports = module.exports = {};

//app.use(bodyParser.json({limit: '50mb'}));
//app.use(express.static('public'));
//app.use(express.static('models'));

app.use('/assets', express.static(__dirname + '/public'));
app.use('/models', express.static(__dirname + '/models'));
//app.use('/controllers', express.static(__dirname + '/controllers'));

//set .html as the default extension 
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
 //app.use('/', router);
//Routes
app.get('/', function (req, res, next) {
    res.render('index.html');  
    let abc = ""; 
});

/*
app.get('#/details', function (req, res) {
    res.render('details.html');    
});

.get('/details', function (req, res, next) {
    res.render('details.html');
    next();
})
.get('/salaries', function (req, res, next) {
    res.render('salaries.html');
    next();
})
.get('/print', function (req, res, next) {
    res.render('print.html');
});
*/

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

	//Connection URL. This is where your mongodb server is running.
var url = 'mongodb://employeeportal:!3mpl0y33@ds051585.mlab.com:51585/employee-portal';

	//Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    //Get the documents collection
    var collection = db.collection('details'),
    collection = db.collection('contacts'),
    collection = db.collection('salaries');
     
    var contacts = {employeeNumber:'002',cellNumber:0793099489,emailAddress:'leslie@kolobje.com',address:'123 Commisioner Street, Johannesburg, 2001'};
    //var details  = {employeeNumber:employee.employeeNumber,firstName:employee.firstName,surname:employee.surname,age:employee.age,gender:employee.gender,race:employee.race,province:employee.province,department:employee.department};
    //var contacts = {employeeNumber:employee.employeeNumber,cellNumber:employee.cellNumber,emailAddress:employee.emailAddress,address:employee.address};
    //var salaries = {employeeNumber:employee.employeeNumber,hoursWorked:employee.hoursWorked,days:employee.days,hourlyRate:employee.hourlyRate,grossIncome:employee.grossIncome};
      
    //console.log(collection);
    // console.log(employee);
      
    //Insert some users
    collection.insert([contacts/*details,contacts,salaries*/], function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length) {
        console.log('Found:', result);
      } else {
        console.log('The record is added!');
      }
      //Close connection
      db.close();
    });
    
      
  }
});

app.listen(port);
console.log("The server is running...");
