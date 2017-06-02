 module.exports = {
 
var routes = function(){
    routes.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "main.html",
        controller: "employeeController"
    })
    .when("/details", {
        templateUrl: "details.html"
    })
    .when("/salaries", {
        templateUrl: "salaries.html"
    })
    .when("/print", {
        templateUrl: "print.html"
    })
    
    .otherwise({ redirectTo: '/' });
}); 
     
 };
     
     
     
 
    
    
};
        








