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
          state('detailTravel', {
            url: '/search/:id',
            templateUrl: 'views/travel_created.html',
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
          controller: 'MainCtrl'
        }).
          state('newTravel', {
          url:'/new_travel',
          templateUrl: 'views/new_travel.html',
          controller: 'NewTravelCtrl'
        }).
          state('userDetail', {
          url:'/user_detail/:id',
          templateUrl: 'views/user_detail.html',
          controller: 'userDetailCtrl'
        })  
       }   

function run ($timeout,$http,$rootScope,$localStorage,$location,$transitions,$state) { 
        $rootScope.$on($transitions.onSuccess({to: 'success', from: 'login'}, function() {
         $timeout(function () {
         $location.path("/search")

        }, 1000);
        })
        )
        $rootScope.$on($transitions.onSuccess({to: 'success', from: 'register'}, function() {
        $timeout(function () {
         $location.path("/login")
        }, 1000);
        })
        )
        $transitions.onStart( { to: 'search' }, function() {
            if (!$localStorage.isToken){
                $location.path("/login");
           }
        });

       }
})();