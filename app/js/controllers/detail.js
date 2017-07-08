(function() {
  'use strict';		

	angular
		.module('app')
		.controller('DetailCtrl', DetailCtrl);	

function DetailCtrl($scope,dataService,$location,$localStorage) {
	$scope.show = false;
    $scope.showHotels = false;

    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyCloG6KeNWUu9OJyKFHoskqT_1hG14fgtE"

    var id = $location.url().split('/')[2];
        dataService.getTravelId(id,function (response) {
        $scope.travel = response.data
        $scope.longitud = response.data.longitud
        $scope.latitud = response.data.latitud
        $scope.creator = response.data.creator._id
        $scope.passengers = response.data.passengers
        $scope.userPassengers = response.data.userPassenger.length
        $scope.availableSeats = Number($scope.passengers) - Number($scope.userPassengers)
       
        if ($scope.availableSeats === 0){
            $scope.hideButton = true
        } else{
            $scope.hidebutton = false
        }
       
        }); 
     
    
    $scope.searchWeather = function(data,weather,show){
 	
    var weather = new Array({
            longitud : $scope.longitud,
            latitud: $scope.latitud
    })
    
    if ($scope.show === false){
            $scope.show = true;

 	dataService.getWeather(weather, function(response){
            $scope.temperatures = response.data.daily.data
            $scope.today = response.data.daily.data[0]
        })
    } else {
             $scope.show = false;
        }    
 	}

    $scope.searchHotel = function(data,location,showHotels){
    
    var location = new Array({
            longitud : $scope.longitud,
            latitud: $scope.latitud
    })

    if ($scope.showHotels === false){
        $scope.showHotels = true;
        dataService.getHotels(location, function(response){
        $scope.businesses = response.data.businesses
        })
    } else{
        $scope.showHotels = false;
        }
    }

    $scope.takeSeat = function(info){
            var info = new Array({
            creator: $scope.creator,
            email:$localStorage.email
            });
        
 
    dataService.updateSeat(id,info,function(response){    
            $location.path("/search");      
            });
        }
    }

})();