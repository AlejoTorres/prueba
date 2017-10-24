'use strict';

angular.module('myApp.views.products', [
	'ngRoute', 
	'firebase',
])

// Declared route 
.config(['$routeProvider', function($routeProvider) {
$routeProvider.when('/views/products', {
       templateUrl: '/views/products/products.html',
       controller: 'ProductsCtrl'
   });
}])

// Product controller
.controller('ProductsCtrl', ['$scope', '$firebaseArray', '$location', 'loginService', function($scope, $firebaseArray, $location, loginService){
    $scope.username = loginService.getUser();
    
    if(!$scope.username)
        $location.path('/login');

    $scope.logout = function(){
        loginService.logoutUser();
	}

	var userId = loginService.getUserId();
    $scope.msg1 = false;
	var ref = firebase.database().ref("products").orderByChild('created_by').equalTo(userId);
	$scope.products = $firebaseArray(ref);
	console.log('products');
	$scope.deleteProduct = function(info){
		$scope.products.$remove(info).then(function(ref){
			$scope.msg1 = "Product deleted successfully.";
			window.setTimeout(function(){
				$scope.$apply(function(){
					$scope.msg1 = false;
				})
			},2000)
			console.log(info);
		},function(error){
			console.log(error);
		})
    }

}]);