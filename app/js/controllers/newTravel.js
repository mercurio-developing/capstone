(function() {
  'use strict';     
                    
    angular
        .module('app')
        .controller('NewTravelCtrl', NewTravelCtrl);  

function NewTravelCtrl(NgMap,$scope,dataService,$localStorage,$http,$state,$location) {
        
        $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyCloG6KeNWUu9OJyKFHoskqT_1hG14fgtE"

        $scope.show = false
        $scope.textButton = "More details.."

        $scope.changeClass = function(){
           var clientWidth = document.documentElement.clientWidth;

        if ($scope.class === "col-8" ){
            if (clientWidth < 1068) {
             $scope.class = "col-12";
            } else {
               $scope.class = "col-4";
            }
          $scope.show = true;
          $scope.textButton = "Less details.."
        }else {
          $scope.class = "col-8";
          $scope.show = false;
          $scope.textButton = "More details.."
         };
        }

        $scope.place = null;
        $scope.autocompleteOptions = {
                            componentRestrictions: { country: 'us' },
                        }

      $scope.searchLocation = function (location) {    
        $scope.searchWeather();
        var location = $scope.location   
        console.log(location)
        dataService.getLocation(location,function (response) {
        $scope.latitud = response.data.json.routes[0].legs[0].end_location.lat
        $scope.longitud = response.data.json.routes[0].legs[0].end_location.lng
        $scope.duration = response.data.json.routes[0].legs[0].duration.text
        $scope.origin = response.data.query.origin
        $scope.destination = response.data.query.destination
        var origin = $scope.origin
        var destination = $scope.destination
        $scope.titleDest = destination.replace(", USA", ' ')
        $scope.titleOrig = origin.replace(", USA", ' ')

        }); 
    };  

    $scope.searchWeather = function(weather){
        $scope.changeClass()
        var weather = new Array({
            longitud : $scope.longitud,
            latitud: $scope.latitud,
        })
        
        dataService.getWeather(weather, function(response){
            $scope.temperatures = response.data.daily.data
            $scope.today = response.data.daily.data[0]
        })

    }

    $scope.createTravel = function(info){
        var info = new Array({
            email:$localStorage.email,
            origin : $scope.titleOrig,
            destination: $scope.titleDest,
            estimatedTime: $scope.duration,
            passengers: $scope.data.passengers,
            description : $scope.data.description,
            departureDate:$scope.data.date,
            departureTime:$scope.data.time,
            latitud:$scope.latitud,
            longitud:$scope.longitud
      
             })
            console.log(info)
            dataService.newTravel(info, function(response){

                $location.path("/search");      
        })
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