(function(){

"use strict";
				//I make request of data and changes in my database
	angular
		.module('app')
		.service('dataService', dataService)
function dataService ($http,$localStorage,$rootScope){
		
		// 	this.getAuth = function(callback){
		//     $http.get('https://ws.homeaway.com/oauth/authorize?client_id=bccb3b4f-e497-4e4c-a8ac-16c9d3537692', {
  //  			headers: {'Authorization': 'Bearer ' + $localStorage.token}
		//     }).then(callback)
		// }    
			this.getLocation = function(location,callback){
		    $http.post('/api/google/maps',location).then(callback)
		}   
			this.getWeather = function(weather,callback){
		    $http.post('/api/weather/',weather).then(callback)
		}   
			this.getHotels = function(location,callback){
		    $http.post('/api/yelp/',location).then(callback)
		}   	
			this.getResults = function(searching,callback){
		    $http.post('/api/google/search',searching).then(callback)
		}    
			this.getTravels = function(callback){
			$http.get("/api/travel").then(callback)   
		}
			this.getIncomingTravels = function(user,callback){
			$http.post("/api/travel/mytravels",user).then(callback)   
		}
			this.getTravelId = function(id,callback){
			$http.get(`/api/travel/${id}`).then(callback)   
		}
			this.updateSeat = function(id,info,callback){
			$http.post(`/api/travel/${id}`,info).then(callback)   
		}
			this.updateState = function(id,info,callback){
			$http.post(`/api/travel/${id}`,info).then(callback)   
		}
			this.newTravel = function(info,callback,errorCallback){
			$http.post("/api/travel/newtravel", info).then(callback,errorCallback)   
		}
		 	this.getUserId = function(id,callback){
		    $http.get(`/login/profile/${id}`)
		    .then(callback)
	    }
	    	this.postReview = function(id,review,callback,errorCallback){
		    $http.post(`/login/new_review/${id}`, review)
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
		    $http.post('/login', user)
		    .then(callback,errorCallback)
	   }
	}
})();