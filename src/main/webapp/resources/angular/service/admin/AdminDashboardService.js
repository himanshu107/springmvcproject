
'use strict';
/**
 * 
 */

adminApp.service('AdminDashboardService', [ '$http', '$q', function($http, $q) {
	var obj = {};

	obj.getAllTransactionForAdmin = function(){
		return $http.get("getAllTransactionForAdmin");
	}
	
	return obj;

}]);
