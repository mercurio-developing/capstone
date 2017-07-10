(function() {
  'use strict';     
                    
    angular
        .module('app')
        .controller('SearchCtrl', SearchCtrl);  

function SearchCtrl($filter,$interval,$scope,dataService,$localStorage,$http,$location) {

    $scope.showTravels = false;
    $scope.showUsers = false;
    $scope.showSearch = false

    $interval(function() {
        $scope.username = $localStorage.user
        $scope.email = $localStorage.email
        $scope.user_id = $localStorage.id       
    }, 100);

    $scope.showTravel = function(){
     if ($scope.showTravels === false){
        $scope.showUsers = false;
        $scope.showTravels = true;
            $scope.showSearch = true;

    } else {
            $scope.showTravels = false;
                $scope.showSearch = false
         }
        }

    $scope.showUser = function(){
     if ($scope.showUsers === false){
        $scope.showTravels = false;
        $scope.showUsers = true;
            $scope.showSearch = true;
    } else {
            $scope.showUsers = false;
                $scope.showSearch = false
  
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
        console.log(response.data)
        // var filterId = $filter('filter')($scope.travels, {: "57029ed4795118be119cc437"})
        }); 
        
    dataService.getUsers(function(response){
        $scope.users = response.data
        $scope.lengthUser = response.data.length
        });
      }

})();