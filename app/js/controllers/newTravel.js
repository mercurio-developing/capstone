(function() {
  'use strict';     
                    
    angular
        .module('app')
        .controller('NewTravelCtrl', NewTravelCtrl);  

function NewTravelCtrl(NgMap,$scope, dataService,$localStorage,$http,$state) {

    $scope.place = null;
    $scope.autocompleteOptions = {
                        componentRestrictions: { country: 'us' },
                    }

      $scope.searchLocation = function (location) {    
        var location = $scope.location   
        
        dataService.getLocation(location,function (response) {

        
        $scope.latitud = response.data.json.routes[0].legs[0].end_location.lat
        $scope.longitud = response.data.json.routes[0].legs[0].end_location.lng
        console.log($scope.longitud)
        $scope.origin = response.data.query.origin
        $scope.destination = response.data.query.destination
        var origin = $scope.origin
        var destination = $scope.destination
        $scope.titleDest = destination.replace(", USA", ' ')
        $scope.titleOrig = origin.replace(", USA", ' ')

        }); 
    };  

    $scope.searchWeather = function(weather){
        var weather = new Array({
            longitud : $scope.longitud,
            latitud: $scope.latitud
        })
        dataService.getWeather(weather, function(response){
            $scope.temperatures = response.data.daily.data
            console.log($scope.temperatures)
        })
    }

    // $scope.createTravel = function(info){
    //     var info = $scope.info
    //     dataService.newTravel(info, function(response){
    //         $scope.info = response.data
    //         console.log($scope.info)
    //     })
    // }
// function errorHandler(reason) { //error handler function create one scope array for errors
//             $scope.errors = [];
//             for (let err in reason.data.errors) { //when one errorhandler is success this push the reason error inside of the array
//                 $scope.errors.push(reason.data.errors[err][0].userMessage);//for give the data necessary to the user
//                 console.log($scope.errors)
//             }
//           }
        
    }

})();