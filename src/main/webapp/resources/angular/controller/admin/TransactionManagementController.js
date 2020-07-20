'use strict'
/**
 * 
 */
var TransactionManagementController= function($scope, $rootScope, $http,$filter, $location, $route,$routeParams,$window,$timeout,TransactionManagementService) {
    $rootScope.pageTitle = $route.current.title;
    $scope.itemsPerPage=10;
    $scope.currentPage=1;
    $scope.successmessage="";
    $scope.payment={};
    
    $scope.getPaymentCredentialDetails = function(){
    	TransactionManagementService.getPaymentCredentialDetails().then(function(response){
    		$scope.payment=response.data;
    	});
    }
    
    
    $scope.savePaymentCredential = function(payment,paymentCredentialForm){
    	paymentCredentialForm.$submitted=true;
    	 $(".angular-validate-error").show();
			if(paymentCredentialForm.$valid){
				 $("#formErrorMSg").html(' ');
				 TransactionManagementService.savePaymentCredential(payment).then(function(response){
					 $scope.successmessage=response.data;
					 paymentCredentialForm.$submitted=false;
			    	 $(".angular-validate-error").hide();
			    	 
			    	 $scope.getPaymentCredentialDetails();
				 });
				 $timeout(function(){
					 $scope.successmessage="";
				 },4000);
			}
        }
    
    $scope.updatePaymentCredential = function(payment,paymentCredentialForm){
    	paymentCredentialForm.$submitted=true;
    	 $(".angular-validate-error").show();
			if(paymentCredentialForm.$valid){
				 $("#formErrorMSg").html(' ');
				 TransactionManagementService.updatePaymentCredential(payment).then(function(response){
					 $scope.successmessage=response.data;
					 paymentCredentialForm.$submitted=false;
			    	 $(".angular-validate-error").hide();
			    	 
			    	 $scope.getPaymentCredentialDetails();
				 });
				 $timeout(function(){
					 $scope.successmessage="";
				 },4000);
			}
        }
    
    $scope.getAllTransaction = function(){
    	TransactionManagementService.getAllTransactionForAdmin().then(function(response){
    		$scope.allTransactions =response.data;
    	});
    	
    }
    
    
    
    $scope.deleteTransaction=function(dumId){
        bootbox.confirm("Are you sure you want to delete this transaction?" , function (result) {
            if(result==true){
            	TransactionManagementService.deleteOrderById(dumId).then(function(response){
                    $timeout(function() {
                        $scope.successmessage="Order deleted successfully!";
                        $scope.getAllTransaction();
                        window.location.href="adminDashboard#!/transaction-management";
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