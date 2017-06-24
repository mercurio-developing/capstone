(function() {
  'use strict';   
          
  angular
    .module('app')
    .controller('RegistrationCtrl', RegistrationCtrl);  

function RegistrationCtrl ($scope) {

  $scope.login = function() {
    Authentication.login($scope.user);
  };

  $scope.logout = function() {
    Authentication.logout();
  };

  $scope.register = function() {
    Authentication.register($scope.user);
  }; //register

}; //Controller

})();