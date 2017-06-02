
var app = require('express').Router;
/*
routes.get( '/', function( req, res ) {
   res.render('main');
});

.get( '/details', function( req, res ) {
    res.render( 'details.html');
})

.get( '/salaries', function( req, res ) {
    res.render('salaries.html');
})

.get( '/print', function( req, res ) {
    res.render('print.html');
});
*/

exports.routes = function(req, res){
   routes.use('/', main);
};