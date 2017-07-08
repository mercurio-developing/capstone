(function() {
  'use strict';		
					
	angular
		.module('app')
		.controller('MainCtrl', MainCtrl);	

function MainCtrl($state,$scope,$timeout,$location,$localStorage,dataService,$interval) {     
    
    
    $scope.logout = function($scope, viewUser) {
          $localStorage.$reset()
          $location.path("/login")
        };	
    
     $interval(function() {
        $scope.username = $localStorage.user
        $scope.email = $localStorage.email
        $scope.user_id = $localStorage.id       
    }, 100);

    $scope.profile = function() {
      var id = $localStorage.id
      dataService.getUserId(id,function(response){    
    
        $scope.user = response.data[0]
        $scope.travels = response.data[1]
        $scope.travelsPass = response.data[2]
        $scope.reviews = response.data[3]

       });
    }

    $scope.isLoggedIn = function() {
      return ($localStorage.token) ? true : false;
      }; 
    }

})();
