(function(){

"use strict";
				//I make request of data and changes in my database
	angular
		.module('app')
		.service('dataService', dataService)

function dataService ($http){
			
			this.getResults = function(callback){
		    $http.get('/list/').then(callback)
		}    
			this.getDetail = function(callback){
			$http.get(`/list/${id}`).then(callback)   
		}
		}

})();