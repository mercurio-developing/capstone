(function(){

"use strict";
				
	angular
		.module('app')
		.service('dataService', dataService)
function dataService ($http,$localStorage,$rootScope){
		
			this.getLocation = function(location,callback){
		    $http.post('/api/google/maps',location, {
   			headers: {'Authorization': 'Bearer ' + $localStorage.token}
		    }).then(callback)
		}   
			this.getWeather = function(weather,callback){
		    $http.post('/api/weather/',weather, {
   			headers: {'Authorization': 'Bearer ' + $localStorage.token}
		    }).then(callback)
		}   
			this.getHotels = function(location,callback){
		    $http.post('/api/yelp/',location, {
   			headers: {'Authorization': 'Bearer ' + $localStorage.token}
		    }).then(callback)
		}   	
			this.getResults = function(searching,callback){
		    $http.post('/api/google/search',searching,{
   			headers: {'Authorization': 'Bearer ' + $localStorage.token}
		    }).then(callback)
		}    
			this.getTravels = function(callback){
			$http.get("/api/travel",{
   			headers: {'Authorization': 'Bearer ' + $localStorage.token}
		    }).then(callback)   
		}
			this.getIncomingTravels = function(user,callback){
			$http.post("/api/travel/mytravels",user,{
   			headers: {'Authorization': 'Bearer ' + $localStorage.token}
		    }).then(callback)   
		}
			this.getTravelId = function(id,callback){
			$http.get(`/api/travel/${id}`,{
   			headers: {'Authorization': 'Bearer ' + $localStorage.token}
		    }).then(callback)   
		}
			this.updateSeat = function(id,info,callback){
			$http.post(`/api/travel/${id}`,info,{
   			headers: {'Authorization': 'Bearer ' + $localStorage.token}
		    }).then(callback)   
		}
			this.newTravel = function(info,callback,errorCallback){
			$http.post("/api/travel/newtravel", info,{
   			headers: {'Authorization': 'Bearer ' + $localStorage.token}
		    }).then(callback,errorCallback)   
		}
		 	this.getUserId = function(id,callback){
		    $http.get(`/api/profile/${id}`,{
   			headers: {'Authorization': 'Bearer ' + $localStorage.token}
		    })
		    .then(callback)
	    }
	    	this.postReview = function(id,review,callback,errorCallback){
		    $http.post(`api/profile/new_review/${id}`, review,{
   			headers: {'Authorization': 'Bearer ' + $localStorage.token}
		    })
		    .then(callback,errorCallback)
	    }
	   		this.getUsers = function(callback){
		    $http.get('/user/register')
		    .then(callback)
	    }
	    	this.postUser = function(user,callback,errorCallback){
		    $http.post('/user/register', user)
		    .then(callback,errorCallback)
	    }
			this.loginUser = function(user,callback,errorCallback){
		    $http.post('/user/login', user)
		    .then(callback,errorCallback)
	   }
	}
})();