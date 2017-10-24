'use strict';

angular.module('myApp.signup', ['ngRoute', 'firebase'])

// Declared route 
.config(['$routeProvider', function($routeProvider) {
$routeProvider.when('/signup', {
       templateUrl: 'signup/signup.html',
       controller: 'SignupCtrl'
   });
}])

// Signup controller
.controller('SignupCtrl', ['$scope', '$firebaseAuth', '$firebaseArray', '$location', 'loginService', function($scope, $firebaseAuth, $firebaseArray, $location, loginService){
    $scope.newuser = {};
    $scope.signUp = function() { 
        var username = $scope.user.email;
        var password = $scope.user.password;
        var auth = $firebaseAuth();

        // Auth Logic will be here
        auth.$createUserWithEmailAndPassword(username, password).then(function(user){
            console.log(user.uid);
            loginService.setUser($scope.user.email);
            loginService.setUserId(user.uid);
            createUser(user.uid);
            $location.path('/login');
            $scope.errMsg = false;
        }).catch(function(err){
            console.log(err);
            $scope.errMsg = true;
            $scope.errMessage = err.message;
        }); 
    };

    var roles = ["admin", "user"];
    function getRol() {
       return roles[Math.floor(Math.random() * roles.length)];
    }

    function createUser(userId){
        $scope.newuser.token_user = userId;
        $scope.newuser.email = $scope.user.email;
        $scope.newuser.rol = getRol();
        var ref = firebase.database().ref("users");
        $firebaseArray(ref).$add($scope.newuser)
        .then(function(ref){
            //$scope.newuser.token_user = "";
            //$scope.newuser.email = ""
            //$scope.newuser.rol = "";
            console.log("User added successfully.");
        },function(error){
            console.log(error);
        })
    }

}]);