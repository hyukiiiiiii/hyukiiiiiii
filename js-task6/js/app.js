var app = angular.module('routingDemoApp',['ngRoute'])
.config(['$routeProvider', function($routeProvider){
    $routeProvider
    	.when("/",{templateUrl:"../html/login.html"})
    	.when("/login",{templateUrl:"../html/login.html"})
    	.when("/list",{templateUrl:"../html/list.html"})
    	.when("/edit",{templateUrl:"../html/edit.html"})
        .otherwise({redirectTo:"/"});
}]);