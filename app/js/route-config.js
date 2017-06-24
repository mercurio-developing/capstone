(function() {

'use strict';   

angular.module("app").config(config)

function config($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controllerAs: 'vm',
      controller: 'RegistrationCtrl'
    }).
    when('/register', {
      templateUrl: 'views/register.html',
      controllerAs: 'vm',
      controller: 'RegistrationCtrl'
    }).
    when('/success', {
      templateUrl: 'views/success.html',
      controllerAs: 'vm',
      controller: 'SuccessCtrl',
    }).
     when('/search', {
      templateUrl: 'views/search.html',
      controllerAs: 'vm',
      controller: 'SearchCtrl'
    }).
    when('/detail', {
      templateUrl: 'views/details.html',
      controllerAs: 'vm',
      controller: 'DetailCtrl'
    }).     
    otherwise({
      redirectTo: '/login'
    });
};
})();