(function() {
  'use strict';		

	angular
		.module('app')
		.controller('userDetailCtrl', userDetailCtrl);	

function userDetailCtrl($state,$scope,dataService,$location,$localStorage,$window) {

    $scope.showReview = false;
    $scope.showTravel = false;

    $scope.showReviews = function(){
     if ($scope.showReview === false){
        $scope.showReview = true;
        $scope.showTravel = false;    

    } else {
            $scope.showReview = false;    
         }
        } 

    $scope.showTravels = function(){
     if ($scope.showTravel === false){
        $scope.showReview = false;    
        $scope.showTravel = true;
    } else {
            $scope.showTravel = false;    
         }
        } 

    var id = $location.url().split('/')[2];
        dataService.getUserId(id,function(response){    
          $scope.user = response.data[0]
          $scope.travels = response.data[1]
          $scope.travelsPass = response.data[2]
          $scope.reviews = response.data[3]
      });
        
		$scope.newReview = function(review){
		var review = new Array({
            creator: $localStorage.id,
            description : $scope.reviews.description,
            rating : $scope.reviews.rating
       })
    
    var id = $scope.user._id
		dataService.postReview(id,review, function(response){
          $window.location.reload()
    	 })
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

   	 function errorHandler(reason) { //error handler function create one scope array for errors
            $scope.errors = [];
            for (let err in reason.data.errors) { //when one errorhandler is success this push the reason error inside of the array
                $scope.errors.push(reason.data.errors[err][0].userMessage);//for give the data necessary to the user
            }
          }
        }   

})();