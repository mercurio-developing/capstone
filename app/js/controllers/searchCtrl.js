(function() {
  'use strict';		
					
	angular
		.module('app')
		.controller('SearchCtrl', SearchCtrl);	

function SearchCtrl($scope, dataService,$localStorage,$sce) {
// 		$scope.username = $localStorage.user


// $scope.search = function(){
// 			dataService.getResults(function (response) { 	
//   			$scope.artists = response.data
//  			$scope.artistOrder = "name";
//  		})
// 	};


    // $scope.nextPage = "";
    // $scope.youtubeSearchText = "";

$scope.search = function(){     
    dataService.googleSearch(function (response) {

        });
    };
 }
    // $scope.checkDataLength = function(data){
    //     return (data.length >=1);
    // };
 
    // $scope.callNextPageFn = function(nextPage){
    //     $scope.nextPage = nextPage;
    //     $scope.getYoutubeData($scope.youtubeSearchText);
    // };

})();