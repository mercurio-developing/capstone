(function() {
  'use strict';		
					
	angular
		.module('app')
		.controller('SearchCtrl', SearchCtrl);	

function SearchCtrl($scope,dataService) {
 	     
dataService.getResult(function (response) { 			
  			$scope.artists = response.data
 			$scope.artistOrder = "name";
 			console.log(response)
 		});
};

})();