/**
 * Created by udeshikaperera on 18/06/2015.
 */
(function(){
    "use strict";
  angular.module("eventMangerApp").controller("WelcomeCtrl",[
    '$scope', WelcomeCtrl]);

    function WelcomeCtrl($scope){
        $scope.login = function(){
          console.log("User has login to the system");
        }
    }
})();
