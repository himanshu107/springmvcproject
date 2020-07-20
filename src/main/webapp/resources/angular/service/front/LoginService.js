'use strict';

/**
 * @author Logic Heart 
 */

 frontApp.service('LoginService', ['$http', '$q', function($http, $q){
    var obj={};
    
    obj.getUserByEmail = function(email){
		return $http.post("getUserByEmail?email="+email);
	}
	
	obj.checkEmail=function(email){
		return $http.post('checkEmail?email='+email);
	};
    
		 obj.userLogin = function(user){
			  var field = "j_username="+user.email+"&j_password="+user.password;
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