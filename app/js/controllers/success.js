(function() {
  'use strict';		
	
	angular
		.module('app')
		.controller('SuccessCtrl', SuccessCtrl);	

function SuccessCtrl($scope) {
  $scope.message = "Success!!!";
};

})();