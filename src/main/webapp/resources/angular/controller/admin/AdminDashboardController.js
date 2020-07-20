'use strict'
/**
 * 
 * 
*/
var AdminDashboardController = function($scope, $rootScope, $http, $location, $route,$routeParams,$window,$timeout,AdminDashboardService) {
	$rootScope.pageTitle = $route.current.title;
	$scope.itemsPerPage=10;
	$scope.currentPage=1;
	
	$scope.getDashboardInfo = function(){
		$scope.totalOrderAmount = 0;
		AdminDashboardService.getAllTransactionForAdmin().then(function(response){
				$scope.totalOrders = response.data;
				 angular.forEach($scope.totalOrders, function (order, key) { 
					 $scope.totalOrderAmount += order.amount;
		            }); 
				
	});
	}
}