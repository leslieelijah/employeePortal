"use strict";

(function () {

    //var mongoose = require('mongooose');
    //var Schema = mongoose.Schema;
    //var promise = mongoose.Promise = require('bluebird');

    //var url = "mongodb://kolobje:!3mpl0y33@ds051585.mlab.com:51585/employee-portal";

    //mongoose.connect(url);


    var app = angular.module("employeeApp", ['ngRoute'])

        .controller('employeeCntlr', ['$scope', function ($scope) {

            $scope.currentYear = new Date();

        }])

        .controller('detailsCntlr', ['$scope', '$http',  function($scope, $http) {
            //Select boxes
            $scope.detailsData = {
                provinces: [
                    { "name": "Gauteng" },
                    { "name": "Limpopo" },
                    { "name": "Northern Cape" },
                    { "name": "Eastern Cape" },
                    { "name": "Mpumalanga" },
                    { "name": "Western Cape" },
                    { "name": "North West" },
                    { "name": "Free State" }
                ],
                departments: [
                    { "name": "Human Resources" },
                    { "name": "Administration" },
                    { "name": "Finance" },
                    { "name": "Business and Strategy" },
                    { "name": "Software Development" },
                    { "name": "Packages" },
                    { "name": "Security Services" }
                ],
                races: [
                    { "name": "African" },
                    { "name": "Indian" },
                    { "name": "American" },
                    { "name": "Coloured" },
                    { "name": "Asian" },
                    { "name": "Other" }
                ],
                genders: [
                    { "name": "Female" },
                    { "name": "Male" }
                ]
            };

            $scope.employee = function () {               

                //Post API to NodeJS
                $http.post('http://localhost:4000/api/addEmployee', $scope.detailsData, function (req,res,err) {
                    return new Promise((resolve, reject) => {
                        if (!err) {
                            //$scope.detailsData = {};
                            res.set("Content-Type", "application/json");                            
                            resolve(res.send(201, $scope.detailsData));
                        } else
                            reject(err + data);
                    })

                });         
            }
            
    }])

    .controller("salariesCntlr", ["$scope", function($scope) {

            /** Declare **/
            $scope.rate = 0.00;
            $scope.hours = 0;
            $scope.days = 0;

            $scope.salary = function () {

                /** Constants **/
                $scope.taxBracket = 18 / 100;
                $scope.uifContribution = 2 / 100;

                /** Gross Income **/
                $scope.gross = $scope.rate * $scope.hours * $scope.days;
                                              
                /** Net Income **/
                $scope.tax = $scope.gross * $scope.taxBracket;                                            
                $scope.net = $scope.gross - $scope.tax;  
                $scope.uif = $scope.net * $scope.uifContribution;

                };

            //$scope.salary.gross = $scope.salary.rate * $scope.salary.days * $scope.salary.hours;
            
            console.log($scope.salary);
    }])

    .controller("listCntrl", ["$scope","$http", function($scope,$http){


    }])

    .controller("registerCntrl", ["$scope", "$http", function ($scope, $http) {


    }])

    .config(['$routeProvider', function($routeProvider){
        $routeProvider
        .when("/", {
            templateUrl: "main.html",
            title: "Make Employee App"
            })
         .when("/login", {
                templateUrl: "login.html",
                controller: "loginCntlr",
                title: "Employee: List"
            })
        .when("/details", {
            templateUrl: "details.html",
            controller: "detailsCntlr",
            title: "Employee: Details"
        })
        .when("/salaries", {
            templateUrl: "salaries.html",
            controller: "salariesCntlr",
            title: "Employee: Salary"
        })
        .when("/list", {
            templateUrl: "list.html",
            controller: "listCntrl",
            title: "Employee: Employee List"
        })    
        .otherwise({ redirectTo: "/" });
    }]);

})(window.angular);