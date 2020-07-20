'use strict'

/**
 * @author Logic Heart
 */

 var frontApp=angular.module('frontApp',['ngRoute','ui.bootstrap','ui.select','angular-bootbox','kendo.directives','ng.ckeditor','vcRecaptcha']);
 frontApp.filter('removeSpaces',[function(){
        return function(string){
            if(!angular.isString(string)){
                return string;
            }
            return string.replace(/[\s]/g,'');
        };
 }]);
    
   
 frontApp.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    
    $routeProvider.when('/home',{
        title : 'Clicks Home',
        templateUrl : 'home',
        controller : HomeController
    });
    
    $routeProvider.when('/enter-website',{
        title : 'Clicks : Enter Website',
        templateUrl : 'static/front/enter-website.html',
        controller : HomeController
    });
    
    $routeProvider.when('/create-an-account',{
        title : 'Clicks : Create An Account',
        templateUrl : 'static/front/create-an-account.html',
        controller : HomeController
    });
    
    $routeProvider.when('/amount-click',{
        title : 'Clicks : Enter Amount of Clicks',
        templateUrl : 'static/front/amount-click.html',
        controller : HomeController
    });
    
    $routeProvider.when('/order-form',{
        title : 'Clicks : Order Form',
        templateUrl : 'static/front/order-form.html',
        controller : HomeController
    });
    
    $routeProvider.when('/create-account',{
        title : 'Clicks : Create Account',
        templateUrl : 'static/front/home.html',
        controller : LoginController
    });
    
    $routeProvider.when('/login',{
        title : 'Clicks : Login Form',
        templateUrl : 'static/front/login.html',
        controller : LoginController
    });
    
//    $routeProvider.when('/how-it-works',{
//        title : 'Clicks : Login Form',
//        templateUrl : 'static/front/how-it-works.html',
//        controller : LoginController
//    });
//    
//    $routeProvider.when('/one-billion-clicks',{
//        title : 'Clicks : Login Form',
//        templateUrl : 'static/front/one-billion-clicks.html',
//        controller : LoginController
//    });
    
    $routeProvider.when('/terms-and-conditions',{
        title : 'Clicks : Login Form',
        templateUrl : 'static/front/terms-and-conditions.html',
        controller : LoginController
    });
    
    $routeProvider.when('/contact',{
        title : 'Clicks : Login Form',
        templateUrl : 'static/front/contact.html',
        controller : LoginController
    });
    
    $routeProvider.when('/faq',{
        title : 'Clicks : Login Form',
        templateUrl : 'static/front/faq.html',
        controller : LoginController
    });
    
    
    $routeProvider.when('/video-tutorials',{
        title : 'Clicks : Login Form',
        templateUrl : 'static/front/video-tutorials.html',
        controller : LoginController
    });
    
    
    $routeProvider.when('/support',{
        title : 'Clicks : Login Form',
        templateUrl : 'static/front/support.html',
        controller : LoginController
    });
    
    $routeProvider.when('/resetPassword/:userId?',{
        title : 'Clicks : Login Form',
        templateUrl : 'static/front/reset-password.html',
        controller : LoginController
    });
    
    $routeProvider.otherwise({
    	redirectTo : '/home'
    });

 }]);
 
	frontApp.directive('activeMenu', ['$location', function($location) {
		return {
			restrict: 'A',
			link: function(scope, element, args) {
				var activeClass = args.activeMenu || 'active',
					links = element.find('li');

				scope.$on('$routeChangeStart', function() {
					var path = $location.path();
					links.removeClass(activeClass);

					for (var i = 0, len = links.length; i < len; i++) {
						var listItem = angular.element(links[i]),
						href = listItem.find('a').attr('href').replace(/!|#/g, '');
						if (href == path) {
							listItem.addClass(activeClass);
						}
					}
				});
			}
		};
	}]);