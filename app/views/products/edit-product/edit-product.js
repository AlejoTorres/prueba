'use strict';

angular.module('myApp.views.products.editProduct', ['ngRoute', 'firebase'])

// Declared route 
.config(['$routeProvider', function($routeProvider) {
$routeProvider.when('/views/products/edit-product/:id', {
       templateUrl: '/views/products/edit-product/edit-product.html',
	   controller: 'EditProductCtrl'
   });
}])

// EditProduct controller
.controller('EditProductCtrl', ['$scope', '$firebaseArray', '$firebaseObject', '$routeParams', '$location', 'loginService', function($scope, $firebaseArray, $firebaseObject, $routeParams, $location, loginService){
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

	$scope.msg3="";
	var id = $routeParams.id;
	var ref = firebase.database().ref("products/"+id);
	$scope.product = $firebaseObject(ref);

	$scope.editProduct = function(id){
		console.log(id);

		//var userId = loginService.getUserId();
		//$scope.product.created_by = userId;

		var ref = firebase.database().ref("products/"+id);
		ref.update({
			name: $scope.product.name,
			description: $scope.product.description,
			price: $scope.product.price,
			category: $scope.product.category,
		}).then(function(ref){
			$scope.product.name= "";
			$scope.product.description="";
			$scope.product.price = "";
			$scope.product.category = "";
			$scope.msg3= "Product updated successfully.";
			window.setTimeout(function(){
				$scope.$apply(function(){
					
				})
			},100);
			window.setTimeout(function(){
				$scope.$apply(function(){
					$scope.msg3 = false;
				})
			},2000)			
		},function(error){
			console.log(error);
		});
	}

}])