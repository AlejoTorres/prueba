'use strict';

angular.module('myApp.login', ['ngRoute', 'firebase'])

// Declared route 
.config(['$routeProvider', function($routeProvider) {
$routeProvider.when('/login', {
       templateUrl: 'login/login.html',
       controller: 'LoginCtrl'
   });
}])

// Login controller
.controller('LoginCtrl', ['$scope', '$firebaseAuth', '$location', 'loginService', function($scope, $firebaseAuth, $location, loginService) {
    $scope.username = loginService.getUser();

    if($scope.username)
        $location.path('/views/home');

    $scope.signIn = function() { 
        event.preventDefault();
        var username = $scope.user.email;
        var password = $scope.user.password;
        var auth = $firebaseAuth();

        // Auth Logic will be here
        auth.$signInWithEmailAndPassword(username, password).then(function(user){
            console.log(user.uid);
            loginService.setUser($scope.user.email);
            loginService.setUserId(user.uid);
            $location.path('/views/home');
            $scope.errMsg = false;
        }).catch(function(err){
            console.log(err);
            $scope.errMsg = true;
            $scope.errMessage = err.message;
        }); 
    };

    var auth = $firebaseAuth();
    auth.$onAuthStateChanged(function(firebaseUser){
        if(firebaseUser)
            console.log('signed in as ' + firebaseUser.uid);
        else
            console.log('signed out ');    
    });    

}])

.service('loginService',['$location', '$firebaseAuth', function($location, $firebaseAuth){
    var user = "";
    var userId = "";
    var auth = $firebaseAuth();

    return {
        getUser: function(){
            if(user == "" || user == null)
                user = localStorage.getItem('userEmail'); 
            return user;
        },
        setUser: function(value){
            localStorage.setItem('userEmail', value);
        },
        getUserId: function(){
            if(userId == "" || userId == null)
                userId = localStorage.getItem('userId'); 
            return userId;
        },
        setUserId: function(value){
            localStorage.setItem('userId', value);
        },
        logoutUser:function(){
            auth.$signOut().then(function(){
                user = "";
                userId = "";
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userId');
                localStorage.clear();
                $location.path('/login');
                console.log('log out...');
            })
            .catch(function(err){
                console.log(err);
            });
        }
    };
    
}]);