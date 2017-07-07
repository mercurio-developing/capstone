(function() {
  'use strict';		

	angular
		.module('app')
		.controller('userDetailCtrl', userDetailCtrl);	

function userDetailCtrl($scope,dataService,$location,$localStorage) {

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

          console.log(response)

             });
        
		// $scope.newReview = function(review){
		// var review = new Array({
  //           email:$localStorage.email,
  //           username: $localStorage.user,
  //           description : $scope.review.description,
  //           rating : $scope.review.rating,
   
  //            })

		// console.log("review")
		// dataService.postReview(review, function(response){
		// 	console.log(response)
		// })
	// }


    $scope.userDetail = function() {
  		var id = $location.url().split('/')[2];
  		dataService.getUserId(id,function(response){    
          $scope.user = response.data[0]
          $scope.travels = response.data[1]
          $scope.travelsPass = response.data[2]
          $scope.reviews = response.data[3]

          console.log(response)

     		 });
     	}

   	 function errorHandler(reason) { //error handler function create one scope array for errors
            $scope.errors = [];
            for (let err in reason.data.errors) { //when one errorhandler is success this push the reason error inside of the array
                $scope.errors.push(reason.data.errors[err][0].userMessage);//for give the data necessary to the user
                console.log($scope.errors)
            }
          }

        }   
})();