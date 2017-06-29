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
			this.getResults = function(callback){
		    $http.get('api/artist/', {
   			headers: {'Authorization': 'Bearer ' + $localStorage.token}
		    }).then(callback)
		}    
			this.getDetail = function(id,callback){
			$http.get(`api/artist/${id}`,{
   			headers: {'Authorization': 'Bearer ' + $localStorage.token}
			}).then(callback)   
		}
		
		 	this.getUserId = function(id,callback){
		    $http.post(`/api/user/{id}`)
		    .then(callback)
	    }
	    	this.postUser = function(user,callback,errorCallback){
		    $http.post('/register', user)
		    .then(callback,errorCallback)
	    }

		this.loginUser = function(user,callback,errorCallback){
		    $http.post('/login', user)
		    .then(callback,errorCallback)
	   }
	   	this.googleSearch = function(callback){
		    $http.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                key: "AIzaSyBExANSRh5djbndw0--QxN6ulEN6DcKetQ",
                type: 'video',
                maxResults: '12',
                // pageToken: $scope.nextPage ? $scope.nextPage : '',
                part: 'id,snippet',
                fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle,nextPageToken,prevPageToken',
                q: 'judas priest'
            	}
       		}).then(callback)
		};
	}
})();