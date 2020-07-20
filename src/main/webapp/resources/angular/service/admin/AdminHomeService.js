'use strict';
/**
 * 
 */

adminApp.service('AdminHomeService', [ '$http', '$q', function($http, $q) {
	var obj = {};
	obj.logoutAdmin = function(){
		return $http.post("logoutFromApp");
	}
	
	obj.getUser=function(){
		return $http.get("getUser");
	}
	
	return obj;
}]);
