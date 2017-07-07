(function() {
  'use strict';		
					
	angular
		.module('app')
		.controller('MainCtrl', MainCtrl);	

function MainCtrl($state,$scope,$timeout,$location,$localStorage,dataService) {     

    $scope.logout = function($scope, viewUser) {
          $localStorage.$reset()
          $location.path("/login")
        };	
    
    $scope.username = $localStorage.user
    $scope.email = $localStorage.email
    $scope.user_id = $localStorage.id


    $scope.profile = function() {
    var id = $localStorage.id
    dataService.getUserId(id,function(response){    
    
        $scope.user = response.data[0]
        $scope.travels = response.data[1]
        $scope.travelsPass = response.data[2]
        $scope.reviews = response.data[3]


        console.log(response)

       });
    }

    $scope.isLoggedIn = function() {
    return ($localStorage.token) ? true : false;
    };

    $scope.changeLocation = function(path){
      $location.path('/' + path)
      }
    }

})();
