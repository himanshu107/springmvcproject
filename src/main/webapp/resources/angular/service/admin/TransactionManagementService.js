
'use strict';
/**
 * 
 */

adminApp.service('TransactionManagementService', [ '$http', '$q', function($http, $q) {
	var obj = {};
	
	obj.getPaymentCredentialDetails=function(){
		return $http.get("getPaymentCredentialDetails");
	}
	
	obj.savePaymentCredential = function(payment){
		return $http.post("savePaymentCredential",payment);
	}
	
	obj.updatePaymentCredential = function(payment){
		return $http.post("updatePaymentCredential",payment);
	}
	
	obj.getAllTransactionForAdmin=function(){
		return $http.get("getAllTransactionForAdmin");
	}
	
	obj.deleteOrderById=function(id){
		return $http.get("deleteOrderById?id="+id);
	}
	
	return obj;
}]);