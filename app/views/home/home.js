'use strict';

angular.module('myApp.views.home', ['ngRoute', 'firebase'])

// Declared route 
.config(['$routeProvider', function($routeProvider) {
$routeProvider.when('/views/home', {
       templateUrl: '/views/home/home.html',
       controller: 'HomeCtrl'
   });
}])

// Home controller
.controller('HomeCtrl', ['$scope', '$firebaseAuth', '$location', 'loginService', function($scope, $firebaseAuth, $location, loginService){
    $scope.username = loginService.getUser();
    
    if(!$scope.username)
        $location.path('/login');

    $scope.logout = function(){
        loginService.logoutUser();
    }

}]);