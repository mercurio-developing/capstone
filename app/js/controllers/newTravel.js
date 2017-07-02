(function() {
  'use strict';     
                    
    angular
        .module('app')
        .controller('NewTravelCtrl', NewTravelCtrl);  

function NewTravelCtrl(NgMap,$scope, dataService,$localStorage,$http,$state) {
    
    // $scope.searching = function (search) {    
    //     var search = $scope.search                     
    //     dataService.getResults(search,function (response) {
    //     $scope.videos = response.data.items;
    //     $scope.LocationURL=$sce.trustAsResourceUrl
    //    // ("https://www.google.com/maps/embed/v1/directions?key=AIzaSyAwnmKaPwRDQlkaZm2rEgyHkIXp6mZObgs&origin=Barcelona+Spain&destination=Telemark+Norway&avoid=tolls|highways")

    //      }); 

    //   }
    $scope.place = null;
    $scope.autocompleteOptions = {
                        componentRestrictions: { country: 'us' },
                    }

      $scope.searchLocation = function (location) {    
        var location = $scope.location   
        dataService.getLocation(location,function (response) {
            console.log(response.data.query)
        $scope.origin = response.data.query.origin
        $scope.destination = response.data.query.destination
        var origin = $scope.origin
        var destination = $scope.destination
        $scope.titleDest = destination.replace(", USA", ' ')
        $scope.titleOrig = origin.replace(", USA", ' ')

        }); 
    };  
      // }
 


        //   NgMap.getMap().then(function(map) {

        //   $scope.googleMapsUrl = 'https://maps.google.com/maps/api/js?key=AIzaSyAwnmKaPwRDQlkaZm2rEgyHkIXp6mZObgs';
        //   console.log(map.getCenter());
        //   console.log('markers', map.markers);
        //   console.log('shapes', map.shapes);
        // });  
      
        //   $scope.onClick= function(event) {
        //   $scope.geoType =  event.feature.getGeometry().getType();
        //   $scope.geoArray = event.feature.getGeometry().getArray();
        //   console.dir('geoArray', event.feature.getGeometry().getArray());
        //  };
    }

})();