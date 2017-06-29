(function() {
  'use strict';		
					
	angular
		.module('app')
		.controller('mainCtrl', mainCtrl);	

function mainCtrl($state,$scope,$timeout,$location,$localStorage) {     

   $scope.logout = function($scope, viewUser) {
        $localStorage.$reset()
        $location.path("/login")
      };	
  $scope.isLoggedIn = function() {
  return ($localStorage.token) ? true : false;
  };
}

})();