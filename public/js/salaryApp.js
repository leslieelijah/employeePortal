"use strict";

(function (angular) {

    //var mongoose = require('mongooose');
    //var Schema = mongoose.Schema;
    //var promise = mongoose.Promise = require('bluebird');

    //var url = "mongodb://kolobje:!3mpl0y33@ds051585.mlab.com:51585/employee-portal";

    //mongoose.connect(url);


    var app = angular.module("employeeApp", ['ngRoute'])

        .controller('employeeCntlr', ['$scope', function ($scope) {

            $scope.currentYear = new Date();

        }])

        .controller('detailsCntlr', ['$scope','$windows', '$http',  function($scope, $windows, $http) {

            $scope.detailsData = {};
            $scope.detailsData.provinces = [
                { "name": "Gauteng" },
                { "name": "Limpopo" },
                { "name": "Northern Cape" },
                { "name": "Eastern Cape" },
                { "name": "Mpumalanga" },
                { "name": "Western Cape" },
                { "name": "North West" },
                { "name": "Free State" }
            ];

            $scope.detailsData.departments = [
                { name: "Human Resources" },
                { name: "Administration" },
                { name: "Finance" },
                { name: "Business and Strategy" },
                { name: "Software Development" },
                { name: "Packages" },
                { name: "Security Services" }
            ];

            $scope.detailsData.races = [
                { "name": "African" },
                { "name": "Indian" },
                { "name": "American" },
                { "name": "Coloured" },
                { "name": "Asian" },
                { "name": "Other" }
            ];

            $scope.detailsData.genders = [
                { "name": "Female" },
                { "name": "Male" }
            ];

            $scope.employee = function () {               

                //Post API to NodeJS
                $http.post('/api/addEmployeeDetails', $scope.detailsData)
                    .success(function (data) {
                        $scope.detailsData = {};
                        $scope.details = data;
                        console.log(data);
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
         
            }

            console.log($scope.detailsData);
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

    .config(['$routeProvider', function($routeProvider){
        $routeProvider
        .when("/", {
            templateUrl: "main.html",
            title: "Employee Portal"
            })
         .when("/login", {
                templateUrl: "login.html",
                controller: "loginCntlr",
                title: "Employee Portal: List"
            })
        .when("/details", {
            templateUrl: "details.html",
            controller: "detailsCntlr",
            title: "Employee Portal: Details"
        })
        .when("/salaries", {
            templateUrl: "salaries.html",
            controller: "salariesCntlr",
            title: "Employee Portal: Salary"
        })
        .when("/list", {
            templateUrl: "list.html",
            controller: "listCntrl",
            title: "Employee Portal: Employee List"
        })    
        .otherwise({ redirectTo: "/" });
    }]);

})(window.angular);