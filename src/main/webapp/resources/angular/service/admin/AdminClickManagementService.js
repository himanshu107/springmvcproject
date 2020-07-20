
'use strict';
/**
 * 
 */

adminApp.service('AdminClickManagementService', [ '$http', '$q', function($http, $q) {
	var obj = {};
	
	
	
	obj.getAllClicks=function(){
		return $http.get("getAllClicks");
	}
	
	
	//Delete Course
	obj.deleteClick = function(clickId){
		return $http.post("deleteClick?clickId="+clickId);
	}
	
	
	return obj;
}]);
