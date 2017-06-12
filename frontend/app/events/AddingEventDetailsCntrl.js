
(function(){
	  "use strict";
	  angular.module('holcim.events').controller('AddingHolcimEventDetailsCtrl',
	    ['$scope','memberResource',AddingHolcimEventDetailsCtrl]);

	  function AddingHolcimEventDetailsCtrl($scope, memberResource){
		  $scope.asos = memberResource.asos;
		  $scope.district;
		  
		  $scope.getDistricForAso= function(){
 
			  $scope.district = memberResource.getDsitrictForAso($scope.asocode);
		  }
  	  }
	})();

