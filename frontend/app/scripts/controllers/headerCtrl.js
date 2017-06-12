/**
 * Created by udeshikaperera on 29/08/2015.
 */
(function(){
    "use strict";
    angular.module('eventMangerApp').controller('HeaderCtrl',[
        '$scope','$auth','memberResource',HeaderCtrl
    ]);

    function HeaderCtrl($scope, $auth,memberResource){
     var vm = this;	
     $scope.logout = function(){
       $auth.logout('/');
     }
     memberResource.getBirthDays();
     $scope.birthDaysList = memberResource.memberBirthDays;
     $scope.birthDayArr=memberResource.exportMemberBirthDay;
  
     $scope.open = function ($event) {
      	$event.preventDefault();
      	$event.stopPropagation();
        var value = $event.target.getAttribute('data');
        if('openedGivenDatePicker' == value){
        	$scope.openedGivenDatePicker = !$scope.openedGivenDatePicker;
        }
      }
     
 
     $scope.search = function(){
    	 
    	 memberResource.getBirthDaysForSelectedMonth($scope.birthDay);
         $scope.birthDaysList = memberResource.memberBirthDays;
         $scope.birthDayArr=memberResource.exportMemberBirthDay;
  
     }
      
    }
})();