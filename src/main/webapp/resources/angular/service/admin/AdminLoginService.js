'use strict';
adminLoginApp.service('AdminLoginService', [ '$http', '$q', function($http, $q) {
	var obj = {};
	
	obj.getUserByEmail = function(email){
		return $http.post("getUserByEmail?email="+email);
	}
	
	obj.checkEmail=function(email){
		return $http.post('checkEmail?email='+email);
	};
	
	obj.forgetPassword = function(email){
		   return $http.post("forgetPassword?email="+email);
	 }
	
    obj.adminLoginSubmit = function(admin,access){
    	 var field = "j_username="+admin.email+"&j_password="+admin.password+"&j_access="+access;
         return $http.post('./j_spring_security_check?'+field).then(function(response){
                     return response.data;
                 }, 
                 function(errResponse){
                     console.log(errResponse);
                     return $q.reject(errResponse);
                 }
         );
    }
    return obj;
	
} ]);