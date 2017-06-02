var app = angular.module('salaryApp', ['ngRoute'])
     
    .controller('employeeCntlr', [ '$scope', function($scope){ 
   
   /* $scope.employee = {
        employee.firstName : "John",
        employee.surname : "Doe",
        employee.age : 32,
        employee.gender : "Male",
        employee.race : "African",
        employee.email : "joe@test.co.za",
        employee.address : "address" 
    };  
    
      $scope.save = function() {
        submit = $scope.form;
    };

    $scope.submitForm = function() {
        console.log("posting data....");
        submit = $scope.form;
        console.log(submit);
        
    };*/

    //To get thhe year for the copyright section
    $scope.currentYear = 2017;
 
}])

.controller('detailsCntrl', ['$scope', '$http', function ($scope, $http) {
     
     $scope.details = {         
         firstName : "default",
         surname : "default",
         age : "default",
         gender : "default",
         race : "default",
         cellNumber : "default",
         email: "default",
         address : "default"         
     };
     
    $scope.submitForm = function() {
        console.log("posting data....");
        $http.post('mongodb://employeeportal:!3mpl0y33@ds051585.mlab.com:51585/employee-portal', JSON.stringify(data)).success(function(){/*success callback*/});
    };

     
 }])
 .config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "views/main.html"
    })
        .when("/details", {
            controller: "detailsCntrl",
            templateUrl: "views/details.html"
    })
    .when("/salaries", {
        templateUrl: "views/salaries.html"
    })
    .when("/print", {
        templateUrl: "views/print.html"
    })    
    .otherwise({ redirectTo: "/" });
});

    







