'use strict';

/**
 * @author Logic Heart
 */

var HomeController=function($scope, $sce, $rootScope, $http, $location, $route, $window, $compile, $routeParams, $timeout,HomeService,LoginService) {
    
    $rootScope.pageTitle=$route.current.title;
    $rootScope.title=$route.current.title;
    $rootScope.description=$route.current.description;
    $scope.mesage=" ";
    $rootScope.websiteURL;
    $rootScope.noOfClicks;
    $rootScope.amount;
    $rootScope.userDetails = {};
    $scope.isDisabled = false;
    $scope.isDisabledCard = false;
    $scope.user={};
    $scope.user.websiteURL = $rootScope.websiteURL;
    $scope.user.noOfClicks = $rootScope.noOfClicks;
    $scope.createAccount = function(){
    	$(".userLogin").modal("show");
    }
    
    $scope.closeLoginPopup =function(){
    	$(".userLogin").modal("hide");
    }
    
  
  $scope.continueUrlEntered = function(addWebsite,websiteUrlForm){
      websiteUrlForm.$submitted=true;
      $rootScope.websiteURL = addWebsite.websiteUrl;
      $(".angular-validate-error").show();
      if(websiteUrlForm.$valid){
          $("#formErrorMSg").html(' ');
            window.location.href="#!/amount-click";
      }
      
  
  }
  
  $scope.emailmessagedata ="";
	$scope.checkEmail = function(email){
		$scope.emailmessagedata ="";
		HomeService.checkEmail(email.toLowerCase()).then(function(response){
		if(response.data=="exist"){
			$scope.emailmessagedata = " Email is already used! Please enter another.";
			$scope.emailCheck=false;
			$scope.emailValidation[0]=$scope.emailCheck;  
		}else{
			$scope.emailCheck=true;
			$scope.emailmessagedata = "";
		  }
		});
	};
	$scope.addClickAmount={};
	$scope.addClickAmount.visitorsNumber=250;
	$scope.addClickAmount.clickAmount=250;
  $rootScope.clickAmount = {};
  $scope.continueClickAmount = function(addClickAmount,clickAmountForm){
	  clickAmountForm.$submitted=true;
      $(".angular-validate-error").show();
      
      if(clickAmountForm.$valid){
          $("#formErrorMSg").html(' ');
          addClickAmount.clickAmount = addClickAmount.visitorsNumber;
          $rootScope.clickAmount  = addClickAmount;
          $rootScope.noOfClicks = addClickAmount.visitorsNumber;
          $rootScope.amount = addClickAmount.visitorsNumber;
         
          
          $scope.websiteURL = $rootScope.websiteURL;
          $scope.noOfClicks = $rootScope.noOfClicks;
          $scope.amount = $rootScope.amount;
          window.location.href="#!/order-form";
      }
      
  }
  
  $scope.userRegistration = function(user,registrationForm){
	  registrationForm.$submitted=true;
      $(".angular-validate-error").show();
      if(registrationForm.$valid){
    	  $scope.isDisabled = true;
          $("#formErrorMSg").html(' ');
          user.websiteURL = $rootScope.websiteURL;
          user.noOfClicks = $rootScope.noOfClicks;
          user.amount = $rootScope.amount;
          HomeService.userRegistration(user).then(function(response){
  			$scope.userDetails= response.data;
  			$rootScope.userDetails = $scope.userDetails;
  			$scope.isDisabled = false;
          });
      }
      
  }
  
  $scope.processPayment = function(creditCard,creditCardForm,user,registrationForm){
	  registrationForm.$submitted=true;
	  creditCardForm.$submitted=true;
      $(".angular-validate-error").show();
      if(registrationForm.$valid && creditCardForm.$valid){
    	  $scope.isDisabledCard = true;
          $("#formErrorMSg").html(' ');
          user.websiteURL = $rootScope.websiteURL;
          user.noOfClicks = $rootScope.noOfClicks;
          user.amount = $rootScope.amount;
          HomeService.userRegistration(user).then(function(response){
  			$scope.userDetails= response.data;
  			$rootScope.userDetails = $scope.userDetails;

          creditCard.userId = $scope.userDetails.dumId;
          creditCard.dumOrderId = $scope.userDetails.dumOrderId;
          $scope.amount = $rootScope.amount;
          
            HomeService.authorizePaymentForUserOrder($scope.amount,creditCard).then(function(response){
    			$scope.paymentDetails= response.data;
    			if($scope.paymentDetails!="" && $scope.paymentDetails!=null && $scope.paymentDetails!=undefined){
    			   if($scope.userDetails!="" && $scope.userDetails!=null && $scope.userDetails!=undefined){
                   	LoginService.userLogin($scope.userDetails).then(function(redirect){
                                   	  if(redirect!=null){
                                   		  $scope.isDisabledCard = false;
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
                	   $scope.isDisabledCard = false;
                       $scope.failuremessage = "Entered Email is not registered in our database! Please Signup";
                   }
            }else{
            	$scope.isDisabledCard = false;
                $scope.failuremessage = "Your payment failed, please try again!";
            }
            });
  //  }
      });
      }
      
  }
  
}