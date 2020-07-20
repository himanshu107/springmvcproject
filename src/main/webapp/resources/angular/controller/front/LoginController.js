'use strict';

/**
 * @author Logic Heart 
 */

var LoginController = function($scope, $rootScope, $http, $location, $timeout, $window,$compile,$route ,$routeParams, LoginService,HomeService,vcRecaptchaService) {

	$rootScope.pageTitle = $route.current.title;
	$scope.message = "";
	$scope.dumCourseId = $routeParams.dumCourseId;
	$scope.optionId = $routeParams.optionId;
	$scope.dumSudentCourseId = $routeParams.dumSudentCourseId;
	$scope.guestId = $routeParams.guestId;
	$scope.totalCourseFees = $routeParams.fee;
	$scope.contentShow=false;
	$scope.userId = $routeParams.userId;

    $scope.vm = this;
    $scope.vm.publicKey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
    
	$scope.user={};
	
	$scope.frontloginsubmit= function(user,loginForm){
		
		if (vcRecaptchaService.getResponse() === "") { 
   			alert("Please resolve the captcha and submit!")
   		}
		
		loginForm.$submitted = true;
        $(".angular-validate-error").show();
      
        if(loginForm.$valid){
            $("#formErrorMSg").html(' ');
         //   LoginService.getUserByEmail(user.email).then(function(response){
            	
            //	 $scope.userData = response.data;
            //        if(response.data!="" && response.data!=null && response.data!=undefined){
        
            if (vcRecaptchaService.getResponse() === "") { 
       			alert("Please resolve the captcha and submit!")
       		} else {
       			vcRecaptchaService.getResponse()
       			//alert(vcRecaptchaService.getResponse());
       		
            LoginService.userLogin($scope.user).then(function(redirect){
                                    	  if(redirect!=null){
                                            if(redirect=="failure"){
                                                $scope.failuremessage = "Please enter valid email address and password.";
                                            }else if(redirect=="accessdenied"){
                                                $scope.failuremessage = "Access denied.";
                                            }else{
                                         		   window.location.href=redirect;
                                             
                                            }
                                        }
                                        },
                                          function(errResponse){
                                        	$scope.failuremessage = "Please enter valid email address and password.";
                                          });
                               
       		}
                       
                        
//                    }else{
//                        $scope.failuremessage = "Entered Email is not registered in our database! Please Signup";
//                    }
                    
              //  }); 
             
       }
    }; 
    
    
    $scope.showForgotPassword = function(){
    	$scope.contentShow=true;	
    }
    
       $scope.emailCheck=false;
    	$scope.userfp={};
       $scope.forgetPassword = function(email){
    	   HomeService.checkEmail(email.toLowerCase()).then(function(response){
    		if(response.data=="exist"){
    			$scope.failuremessage = "";
    			$scope.emailCheck=true;
    		}else{
    			$scope.emailCheck=false;
    			$scope.failuremessage = "Email address not registered.";
    		  }
    		
    	     if($scope.emailCheck){
    	    	 HomeService.forgetPassword(email).then(function(response){
    	    		  $scope.successmessage = "Your password reset email has been sent.";
    	    	      $scope.result=response.data;
    	    	  });
    	    	  $timeout(function(){
    	    		  $scope.successmessage ="";
    	    		  $scope.closeForgetPassword();
    	    	  },4000)
    	      }
    	});
    	
    }
       
       $scope.signUp = function(){
       		window.location.href="#!/enter-website";
       }
 
   	//If the recaptcha value is empty alert error else alert the recaptcha resonse
       $scope.resetPassword= function(user,resetForm) {
   		if (vcRecaptchaService.getResponse() === "") { 
   			alert("Please resolve the captcha and submit.")
   		} else {
   			//alert(vcRecaptchaService.getResponse());
   			if(user.password == user.cnfpassword){
   				HomeService.updatePassword($scope.userId,user.password).then(function(response){
   	   				$scope.successmessage = "Password updated successfully.";
   	   			});
   				$timeout(function(){
  	    		  $scope.successmessage ="";
  	    		 window.location.href="./#!/login";
  	    	  },4000)
   				
   			}else{
   				$scope.failuremessage = "Password doesn't match.";
   			}
   			
   			
   		}
   	}
}