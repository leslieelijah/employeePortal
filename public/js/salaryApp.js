"use strict";

(function (angular) {


    var salaryApp = angular.module('employeeApp', ['ngRoute'])

        .controller('employeeCntlr', ['$scope', function ($scope) {

            $scope.currentYear = new Date();

        }])

        .controller('detailsCntlr', ['$scope', function ($scope){
                $scope.employeeDetails = "The details are as follow";

                $scope.employee = function () {
                    firstName = "John";
                    surname = "Doe";
                    age = "default";
                    gender = "default";
                    race = "default";
                    email = "default";
                    department = "default";
                    province = "default";
                    mobile = "default";
                    address = "default";
                }
                $scope.employeeDetails = $scope.employee;

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
    







