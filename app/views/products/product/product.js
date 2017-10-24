'use strict';

angular.module('myApp.views.products.product', ['ngRoute', 'firebase'])

// Declared route 
.config(['$routeProvider', function($routeProvider) {
$routeProvider.when('/views/products/product', {
       templateUrl: '/views/products/product/product.html',
	   controller: 'ProductCtrl'
   });
}])

// Product controller
.controller('ProductCtrl', ['$scope', '$firebaseArray', '$location', 'loginService', function($scope, $firebaseArray, $location, loginService){
    $scope.username = loginService.getUser();
    
    if(!$scope.username)
        $location.path('/login');

    $scope.logout = function(){
        loginService.logoutUser();
	}

	$scope.options = [
		{'id': 'Bolígrafo en carton', 'name': 'Bolígrafo en carton'},
		{'id': 'Bolígrafo en madera', 'name': 'Bolígrafo en madera'},
		{'id': 'Bolígrafo Plástico', 'name': 'Bolígrafo Plástico'},
		{'id': 'Bolígrafo Metálico', 'name': 'Bolígrafo Metálico'},
		{'id': 'Alcancía', 'name': 'Alcancía'},
		{'id': 'Entretenimiento', 'name': 'Entretenimiento'},
		{'id': 'Hogar', 'name': 'Hogar'},
		{'id': 'Relojes', 'name': 'Relojes'}
	];
	
	var userId = loginService.getUserId();

	$scope.addProduct = function(){
		$scope.product.created_by = userId;
		$scope.msg2="";
		var ref = firebase.database().ref("products");
		$firebaseArray(ref).$add($scope.product)
		.then(function(ref){
			$scope.product.name = "";
			$scope.product.description = "";
			$scope.product.price = "";
			$scope.product.category = "";
			$scope.msg2= "Product added successfully.";
			window.setTimeout(function(){
				$scope.$apply(function(){
					$scope.msg2 = false;
				})
			},2000)
		},function(error){
			console.log(error);
		})
	};

}])

/*.component('productComponent', {
	templateUrl: '/views/products/product/product.html',
	controller: 'ProductCtrl'
});*/