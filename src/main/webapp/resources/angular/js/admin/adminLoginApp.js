'use strict';
/**
 * 
 */
var adminLoginApp = angular.module('adminLoginApp', ['ngRoute','ngIdle']);

adminLoginApp.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider) {
$locationProvider.hashPrefix('!');

$routeProvider.when('/adminloginhome',{
	title : 'mm Admin Login',
	templateUrl : 'adminloginhome',
	controller : AdminLoginController
});
$routeProvider.otherwise({
	redirectTo : '/adminloginhome'
});
}]);