
'use strict'
/**
 * 
 */
var adminApp= angular.module('adminApp', ['ngRoute','ngIdle','angular-bootbox','kendo.directives','ui.select','ui.bootstrap','ng.ckeditor','angularUtils.directives.dirPagination']);

adminApp.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider) {
$locationProvider.hashPrefix('!');

$routeProvider.when('/adminDashboardHome',{
	title : 'Admin Dashboard',
	templateUrl : 'adminDashboardHome',
	controller : AdminDashboardController
});


/*$routeProvider.when('/adminclickmanagement',{
	title : 'Paymenex',
	templateUrl : 'static/admin/adminpaymenexdashboard.html',
	controller : AdminDashboardController
});
*/



$routeProvider.otherwise({
	redirectTo : '/adminDashboardHome'
});
}]);

adminApp.directive('customOnChange', function() {
	return {
		restrict : 'A',
		link : function(scope, element, attrs) {
			var onChangeHandler = scope.$eval(attrs.customOnChange);
			element.bind('change', onChangeHandler);
		}
	};
});

adminApp.filter('phonenumber', function() {
    /* 
    Format phonenumber as: c (xxx) xxx-xxxx
    	or as close as possible if phonenumber length is not 10
    	if c is not '1' (country code not USA), does not use country code
    */
    
    return function (number) {
	    /* 
	    @param {Number | String} number - Number that will be formatted as telephone number
	    Returns formatted number: (###) ###-####
	    	if number.length < 4: ###
	    	else if number.length < 7: (###) ###
	    Does not handle country codes that are not '1' (USA)
	    */
        if (!number) { return ''; }

        number = String(number);

        // Will return formattedNumber. 
        // If phonenumber isn't longer than an area code, just show number
        var formattedNumber = number;

		// if the first character is '1', strip it out and add it back
		var c = (number[0] == '1') ? '1 ' : '';
		number = number[0] == '1' ? number.slice(1) : number;

		// # (###) ###-#### as c (area) front-end
		var area = number.substring(0,3);
		var front = number.substring(3, 6);
		var end = number.substring(6, 10);

		if (front) {
			formattedNumber = (c + "(" + area + ") " + front);	
		}
		if (end) {
			formattedNumber += ("-" + end);
		}
		return formattedNumber;
    };
});

adminApp.config(['KeepaliveProvider', 'IdleProvider', function(KeepaliveProvider, IdleProvider) {
	  IdleProvider.idle(1800);
	  IdleProvider.timeout(30);
	  KeepaliveProvider.interval(600);
	  KeepaliveProvider.http('isUserAlive');
	}]); /*End of session management on front end*/


adminApp.run(function(Idle,$rootScope,$http,$timeout,$window,$location) {
	Idle.watch();
$rootScope.started = false;
$rootScope.$on('IdleTimeout', function() {
$http.get('./j_spring_security_logout').then(function(response){
	bootbox.alert('Your session has expired. Please login to continue.', function(){ $window.location.href='./adminlogin';   });
})

});
});


adminApp.run(function($http,$window) {
	 $http.get('isUserAlive').then(function(response){
			 if(response.data=='failure'){
				 $window.location.href='./'; 
			 }
	 })
})

adminApp.directive("ssnInput",function(){
    return {
        require:'ngModel',
        link: function(scop, elem, attr, ngModel){
            $(elem).mask("999-99-9999");
            var temp;
            var regxa = /^(\d{3}-?\d{2}-?\d{4})$/;
            $(elem).focusin(function(){
                //$(elem).val(temp);
            });
            $(elem).on('blur',function(){
            	console.log("Its fine")
                temp = $(elem).val();
            	console.log(temp);
                if(regxa.test($(elem).val())){
                   $(elem).val(temp.substring(0,7) + "XXXX" );
               }
            });
        }
    }
});

adminApp.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    }
}]);