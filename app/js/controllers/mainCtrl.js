(function() {
  'use strict';		
					
	angular
		.module('app')
		.controller('MainCtrl', MainCtrl);	

function MainCtrl($state,$scope,$timeout,$location,$localStorage) {     

    $scope.logout = function($scope, viewUser) {
          $localStorage.$reset()
          $location.path("/login")
        };	
    $scope.username = $localStorage.user
    $scope.isLoggedIn = function() {
    return ($localStorage.token) ? true : false;
    };

    $scope.changeLocation = function(path){
      $location.path('/' + path)
      }
    }
  
})();
