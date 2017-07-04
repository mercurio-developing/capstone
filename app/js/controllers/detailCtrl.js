(function() {
  'use strict';		

	angular
		.module('app')
		.controller('DetailCtrl', DetailCtrl);	

function DetailCtrl($scope,dataService,$location) {
	$scope.show = false;
    $scope.showHotels = false;

    var id = $location.url().split('/')[2];
        dataService.getTravelId(id,function (response) {
        $scope.travel = response.data
        $scope.longitud = response.data.longitud
        $scope.latitud = response.data.latitud
        console.log(response.data)
        }); 
     
    
    $scope.searchWeather = function(data,weather){
 	var weather = new Array({
            longitud : $scope.longitud,
            latitud: $scope.latitud
    })
    $scope.show = true;
 	dataService.getWeather(weather, function(response){
            $scope.temperatures = response.data.daily.data
            $scope.today = response.data.daily.data[0]
        })
 	}

    $scope.searchHotel = function(data,location){
    var location = new Array({
            longitud : $scope.longitud,
            latitud: $scope.latitud
    })
    $scope.showHotels = true;
    dataService.getHotels(location, function(response){
        console.log(response)
        $scope.businesses = response.data.businesses
        

        })
    }

 };
})();