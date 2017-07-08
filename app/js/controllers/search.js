(function() {
  'use strict';     
                    
    angular
        .module('app')
        .controller('SearchCtrl', SearchCtrl);  

function SearchCtrl($interval,$scope,dataService,$localStorage,$http,$location) {

    $scope.showTravels = false;
    $scope.showUsers = false;

    $interval(function() {
        $scope.username = $localStorage.user
        $scope.email = $localStorage.email
        $scope.user_id = $localStorage.id       
    }, 100);

    $scope.showTravel = function(){
     if ($scope.showTravels === false){
        $scope.showUsers = false;
        $scope.showTravels = true
    } else {
            $scope.showTravels = false;
         }
        }

    $scope.showUser = function(){
     if ($scope.showUsers === false){
        $scope.showTravels = false;
        $scope.showUsers = true;
    } else {
            $scope.showUsers = false;  
         }
        }  

    $scope.userDetail = function() {
        var id = $location.url().split('/')[2];
        dataService.getUserId(id,function(response){    
          $scope.user = response.data[0]
          $scope.travels = response.data[1]
          $scope.travelsPass = response.data[2]
          $scope.reviews = response.data[3]
          });
        }
        
    $scope.username = $localStorage.user
        dataService.getTravels(function (response) {
        $scope.travels = response.data
        }); 
        
        dataService.getUsers(function(response){
        $scope.users = response.data
        });
      }

})();