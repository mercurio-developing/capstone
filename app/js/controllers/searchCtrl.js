(function() {
  'use strict';     
                    
    angular
        .module('app')
        .controller('SearchCtrl', SearchCtrl);  

function SearchCtrl($scope, dataService,$localStorage,$http) {
    
    $scope.searching = function (search) {    
        var search = $scope.search                     
        dataService.getResults(search,function (response) {
        $scope.videos = response.data.items;
         });    
      }
    }

})();