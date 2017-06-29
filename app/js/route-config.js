(function() {

'use strict';   

angular.module("app").config(config).run(run)

function config($stateProvider, $urlRouterProvider) {
       $urlRouterProvider.otherwise('/login')
       $stateProvider.
          state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'AuthCtrl'
          }).
          state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'AuthCtrl'
          }).
          state('detail', {
            url: '/detail/:id',
            templateUrl: 'views/details.html',
            controller: 'DetailCtrl'
          }).
          state('search', {
          url:'/search',
          templateUrl: 'views/search.html',
          controller: 'SearchCtrl',
        }).
          state('success', {
          url:'/success',
          templateUrl: 'views/success.html',
          controller: 'mainCtrl',

        })
       }   

function run ($timeout,$http,$rootScope,$localStorage,$location,$transitions) { 
        $rootScope.$on($transitions.onSuccess({to: 'success', from: 'login'}, function() {
         $timeout(function () {
         $location.path("/search")
        }, 2000);
        })
        )
        $rootScope.$on($transitions.onSuccess({to: 'success', from: 'register'}, function() {
        $timeout(function () {
         $location.path("/login")
        }, 2000);
        })
        )
        $transitions.onStart( { to: 'search' }, function() {
            if (!$localStorage.isToken){
                $location.path("/login");
           }
        });
   }
})();