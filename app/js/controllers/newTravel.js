(function() {
  'use strict';     
                    
    angular
        .module('app')
        .controller('NewTravelCtrl', NewTravelCtrl);  

function NewTravelCtrl(NgMap,$scope, $filter,dataService,$localStorage,$http,$state) {
        
        $scope.show = false
        $scope.textButton = "More details.."

        $scope.changeClass = function(){
           var clientWidth = document.documentElement.clientWidth;

        if ($scope.class === "col-9" ){
            if (clientWidth < 1068) {
             $scope.class = "col-12";
            } else {
               $scope.class = "col-4";
            }
          $scope.show = true;
          $scope.textButton = "Less details.."
        }else {
          $scope.class = "col-9";
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

    $scope.searchWeather = function(data,weather){
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
            email:$scope.data.email,
            origin : $scope.titleOrig,
            destination: $scope.titleDest,
            estimatedTim: $scope.duration,
            passeggers: $scope.data.passengers,
            description : $scope.data.description,
            departure: [{
                date:$scope.data.date,
                time:($scope.data.time)
                }]           
             })
        
            dataService.newTravel(info, function(response){
                console.log(response)
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