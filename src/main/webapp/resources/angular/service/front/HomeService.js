frontApp.service('HomeService', ['$http', '$q', function($http, $q){
	var obj={};


	obj.logout = function(){
		return $http.post("j_spring_security_logout");
	}
	obj.forgetPassword = function(email){
		return $http.post("forgetPassword?email="+email);

	}
	
	obj.checkEmail=function(email,access){
			return $http.post('checkEmail?email='+email);
	 };
		
	obj.userRegistration = function(user){
			return $http.post("userRegistration",user);
	}
		
	obj.processPayment = function(creditCard){
			return $http.post("processPayment",creditCard);
	}
	
	obj.authorizePaymentForUserOrder = function(amount , card){
		return $http.post("authorizePaymentForUserOrder?amount="+amount,card);
	}
	
	obj.updatePassword = function(userId,password){
		return $http.post("resetPassword?userId="+userId+"&password="+password);
	}

	return obj;
} ]);

