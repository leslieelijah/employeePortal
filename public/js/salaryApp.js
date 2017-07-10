"use strict";

(function (angular) {

    //var mongoose = require('mongooose');
    //var Schema = mongoose.Schema;
    //var promise = mongoose.Promise = require('bluebird');

    //var url = "mongodb://kolobje:!3mpl0y33@ds051585.mlab.com:51585/employee-portal";

    //mongoose.connect(url);


    var salaryApp = angular.module('employeeApp', ['ngRoute'])

        .controller('employeeCntlr', ['$scope', function ($scope) {

            $scope.currentYear = new Date();

        }])

        .controller('detailsCntlr', ['$scope','$http', function ($scope,$http){

                $scope.data = {};

                /* Provinces */
                $scope.provinces = [
                    { name: "Gauteng" },
                    { name: "Limpopo" },
                    { name: "Northern Cape" },
                    { name: "Eastern Cape"},
                    { name: "Mpumalanga"},
                    { name: "Western Cape"},
                    { name: "North West"},
                    { name: "Free State"}
                ];

                /* Department */
                $scope.departments = [
                    {name:"Human Resources"},
                    {name: "Administration"},
                    {name: "Finance"},
                    {name: "Business and Strategy"},
                    {name: "Software Development"},
                    {name: "Packages"},
                    {name: "Security Services"}
                ];

                /* Races */
                $scope.races = [
                    {name: "African"},
                    {name: "Indian"},
                    {name: "American"},
                    {name: "Coloured"},
                    {name: "Asian"},
                    {name: "Other"}
                ];

                /* Gender */
                $scope.genders = [
                    { name: "Female" },
                    { name: "Male" }
                ];

                $scope.employeeDetails = {
                    firstName: "John",
                    surname: "Doe",
                    age: 23,
                    gender : "default",
                    race: "default",
                    email: "default",
                    department: "default",
                    province: "default",
                    mobile: "default",
                    address: "default"
            };
            
            $scope.employee = function () {

                $http({
                    url: 'http://localhost:1337/#/details.html',
                    method:'POST',
                     data: $scope.data
                }).then((httpResponse) => {                   
                    console.log('response:' + httpResponse);
                });
            }
    }])

    .controller("salariesCntlr", ["$scope", function ($scope) {

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

    .config(function ($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl: "main.html",
            title: "Employee Portal"
        })
        .when("/details", {
            templateUrl: "details.html",
            title: "Employee Portal: Details"
        })
        .when("/salaries", {
            templateUrl: "salaries.html",
            title: "Employee Portal: Salary"
        })
        .when("/list", {
            templateUrl: "list.html",
            title: "Employee Portal: Employee List"
        })    
            .otherwise({ redirectTo: "/" });
    });

})(window.angular);
    







