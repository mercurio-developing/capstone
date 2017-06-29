(function() {
  'use strict';		

	angular
		.module('app')
		.controller('DetailCtrl', DetailCtrl);	

function DetailCtrl($scope,dataService,$location) {

const id = Number($location.url().split('/')[2]);

dataService.getDetail(id, function (response) { 			
 		 	 		 console.log(response)

 		 $scope.index = id;
 		 console.log(id)
 		 $scope.artist = response;
 		 console.log()

 		 $scope.nexts = function(){
 		 	var limit = response.data.length - 1
 		 	if($scope.index === limit){
 		 		$scope.next = limit;
	 		 } else{
	 		  	$scope.next = $scope.index + 1;
	 		 }
	 		}

	 	$scope.prevs = function(){
 		 	var limit = Number(response.data[0].id) - 1
 		 	console.log(limit)
 		 	if($scope.index === limit){
 		 		$scope.prev = limit;
	 		 } else{
	 		  	$scope.prev = $scope.index - 1;
	 		 }
	 		}	  
 	})
};

})();