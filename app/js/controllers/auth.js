(function() {
  
  'use strict';   
          
  angular
    .module('app')
    .controller('AuthCtrl', AuthCtrl); 

function AuthCtrl($timeout,$scope,dataService,$location, $localStorage,
    $sessionStorage) {
 
  var userData = new Array();

  $scope.newUser = function (user) {  
     var user = $scope.user                      
     dataService.postUser(user, function (response) {
       $location.path("/success");      
     }, errorHandler);            
    }  
  
  $scope.login = function(user,back) {
        user = $scope.user
        dataService.loginUser(user, function (response) {
        $localStorage.token = response.data.token 
        $localStorage.email = response.data.email
        $localStorage.id = response.data._id
        $scope.token = $localStorage.token
        $localStorage.isToken  = true;
        $localStorage.user = (response.data.firstName + "  " + response.data.lastName).toString();        
        $location.path("/success"); 
     }, errorHandler);              
   };

function errorHandler(reason) { //error handler function create one scope array for errors
            $scope.errors = [];
            for (let err in reason.data.errors) { //when one errorhandler is success this push the reason error inside of the array
                $scope.errors.push(reason.data.errors[err][0].userMessage);//for give the data necessary to the user
                console.log($scope.errors)
            }
          }
        }
})();