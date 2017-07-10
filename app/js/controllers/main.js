(function() {
  'use strict';		
					
	angular
		.module('app')
		.controller('MainCtrl', MainCtrl);	

function MainCtrl($state,$scope,$timeout,$location,$localStorage,dataService,$interval) {     
    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyCloG6KeNWUu9OJyKFHoskqT_1hG14fgtE"
    
  $scope.back = "main-back"

  $scope.changeOff = function(){
      if($scope.back === "main-back"){
        $scope.back = ""
      }
    }

      $scope.changeOn = function(){
      if($scope.back != "main-back"){
        $scope.back = "main-back"
      }
    }

     $scope.logout = function($scope, viewUser,back) {
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
