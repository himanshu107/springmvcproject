'use strict'
/**
 * 
 */
adminApp.controller('AdminHomeController', function($scope, $rootScope, $http, $location, $route,$routeParams,$window,$timeout,AdminHomeService){

	//$scope.removeClass("activeTab");
	
	$scope.logoutAdmin = function(){
    	AdminHomeService.logoutAdmin().then(function(response){
			if(response.data=="logout"){
				$window.location.href = "./adminlogin";
			}
		});
	}	
	
	$scope.getUser = function(){
		AdminHomeService.getUser().then(function(response){
			$scope.adminData=response.data;
		});
		
	}
	
	$scope.isActive = function (viewLocation) {
	     var active = (viewLocation === $location.path());
	     return active;
	}

});