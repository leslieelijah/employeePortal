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

var port = process.env.PORT || 4000;

app.use('/assets', express.static(__dirname + '/public'));
app.use('/models', express.static(__dirname + '/models'));

//set .html as the default extension 
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
 //app.use('/', router);
//Routes
app.get('/', function (req, res, next) {
    res.render('index.html');   
});



// Connect to MongoDB
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://kolobje:!3mpl0y33@ds051585.mlab.com:51585/employee-portal";

MongoClient.connect(url, function (err, db) {
    if (err) {
        throw err
        console.log("Connected correctly to server" + db);
    }
    db.collection('contacts').find().toArray(function (err, result) {
        if (err) throw err

        Console.log(result);
    }
    
});


app.listen(port);
console.log("The server is running...");
