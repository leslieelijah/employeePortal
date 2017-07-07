    var express = require('express');
    var cons = require('consolidate');

    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    //var router = express.Router();
    //var routes = require('./routes/index');
    //var users = require('./routes/users');

    var app = express();
    //app.set('port', process.env.PORT || 4000);
    //var port = process.env.PORT || 4000;

    // view engine setup

    app.engine('html', cons.swig);
    app.set('views', __dirname + '/views');
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'html');

    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(require('stylus').middleware(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'views')));
    //Reads all the files inside the public folder
    //app.use(express.static(__dirname + '/public'));

   // app.use('/controllers', express.static(__dirname + '/controllers'));
    //app.use('/', routes);
    //app.use('/users', users);

    app.get('/', function (req, res, next) {
        res.render('index.html');
    });
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    module.exports = app;
 