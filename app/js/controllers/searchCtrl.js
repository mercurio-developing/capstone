(function() {
  'use strict';     
                    
    angular
        .module('app')
        .controller('SearchCtrl', SearchCtrl);  

function SearchCtrl($scope,dataService,$localStorage,$http,$state) {

    $scope.username = $localStorage.user
    
    $scope.searchTravel = function () {    
        dataService.getTravels(function (response) {
        console.log(response.data)
        $scope.travels = response.data
        }); 
      }
 
    }

})();