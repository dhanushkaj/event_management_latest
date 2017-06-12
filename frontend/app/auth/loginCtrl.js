/**
 * Created by udeshikaperera on 25/06/2015.
 */
(function(){
    "use strict";
    angular.module('eventMangerApp').controller('LoginCtrl',
        ['$scope','moment','$auth','toastr','$location','memberResource', LoginCtrl]);

    function LoginCtrl($scope, moment, $auth, toastr,$location,memberResource){
        $scope.currentTime = new moment().format('MMMM Do YYYY, h:mm a');
        $scope.submit = function(){
            $auth.login({email: $scope.email,password: $scope.password})
                .then(function(res){
                  if('ITAdmin' === $auth.getPayload().userRole){
                    $location.path('/userManagement');
                  }
                  memberResource.getBirthDays();
                  toastr.success('Thank you for coming back! ',res.data.user.email );
                })
                .catch(handleError);
        };
        function handleError(err){
            toastr.error('Your Login failed! ',err.data)
        }
    }
})();
