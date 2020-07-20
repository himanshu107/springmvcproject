'use strict'
/**
 * 
 */
var AdminClickManagementController= function($scope, $rootScope, $http,$filter, $location, $route,$routeParams,$window,$timeout,AdminClickManagementService) {
    $rootScope.pageTitle = $route.current.title;
    $scope.itemsPerPage=10;
    $scope.currentPage=1;
    $scope.successmessage="";

    $scope.getAllClicksDetail=function(){
    	AdminClickManagementService.getAllClicks().then(function(response){
    		$scope.allClicks=response.data;
    	});
    }
    
    
    //Delete clicks
    $scope.deleteClick=function(dumId,userName){
        bootbox.confirm("Are you sure you want to delete this "+userName+" details ?" , function (result) {
            if(result==true){
                AdminClickManagementService.deleteClick(dumId).then(function(response){
                    $timeout(function() {
                        $scope.successmessage="Record deleted successfully!";
                        $scope.getAllClicksDetail();
                        window.location.href="adminDashboard#!/adminclickmanagement";
                    }, 2000);
                }); 
            }
        });
    }
    
   
    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

}