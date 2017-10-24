'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'firebase',
  'myApp.login',
  'myApp.signup',
  'myApp.views.home',
  'myApp.views.products',
  //'productComponent'
  'myApp.views.products.product',
  'myApp.views.products.editProduct',
  //'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
