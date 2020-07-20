
'use strict'
/**
 * 
 */
var AdminLoginController= function($scope, $rootScope, $http, $location, $route,$routeParams,$window,$timeout,AdminLoginService) {
	$rootScope.pageTitle = $route.current.title;
	$scope.currentPage=1;
	$scope.failuremessage="";
	
	$scope.user={};
	$scope.adminLoginSubmit= function(user,loginForm){
        loginForm.$submitted= true;
        if(loginForm.$valid){
            $("#formErrorMSg").html(' ');
            AdminLoginService.getUserByEmail(user.email).then(function(response){
            	 $scope.userData = response.data;
                    if(response.data!="" && response.data!=null && response.data!=undefined){
                    	AdminLoginService.adminLoginSubmit(user,$scope.userData.access).then(function(redirect){
                                    	  if(redirect!=null){
                                            if(redirect=="failure"){
                                                $scope.failuremessage = "Please Enter Valid Email & Password";
                                            }else if(redirect=="accessdenied"){
                                                $scope.failuremessage = "Access denied for this user!";
                                            }else{
                                         		   window.location.href=redirect;
                                             
                                            }
                                        }
                                        },
                                          function(errResponse){
                                        	$scope.failuremessage = "Please Enter Valid Email & Password";
                                          });
                               
                            
                       
                        
                    }else{
                        $scope.failuremessage = "Entered Email is not registered in our database! Please Signup";
                    }
                    
                }); 
             
       }
    }; 
    
    $scope.contentShow=true;
 
    
       $scope.emailCheck=false;
    	$scope.userfp={};
       $scope.forgetPassword = function(email){
    	   AdminLoginService.checkEmail(email.toLowerCase()).then(function(response){
    		if(response.data=="exist"){
    			$scope.failuremessage = "";
    			$scope.emailCheck=true;
    		}else{
    			$scope.emailCheck=false;
    			$scope.failuremessage = "We are not finding any account related to this email address. ";
    		  }
    		
    	     if($scope.emailCheck){
    	    	 AdminLoginService.forgetPassword(email).then(function(response){
    	    		  $scope.successmessage = " Email send successfully to this email address. click on link in email to reset the password";
    	    	      $scope.result=response.data;
    	    	  });
    	    	  $timeout(function(){
    	    		  $scope.successmessage ="";
    	    		  $scope.closeForgetPassword();
    	    	  },4000)
    	      }
    	});
    	
    }
    
       
       $scope.showForgetPasswordForm = function(){
    	   
    	   $scope.contentShow=false;
       }
       
       $scope.closeForgetPassword =function(){
    	   $scope.contentShow=true;
       }
}	
	
	
	
