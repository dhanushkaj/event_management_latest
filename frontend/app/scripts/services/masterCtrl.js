/**
 * Created by udeshikaperera on 30/06/2015.
 */

(function(){
    "use strict";
    angular.module('eventMangerApp')
        .controller('MasterCtrl', ['$scope', '$cookieStore','$auth', MasterCtrl]);

    function MasterCtrl($scope, $cookieStore, $auth) {
        /**
         * Sidebar Toggle & Cookie Control
         */
        var mobileView = 992;
        $scope.isAuthenticated = $auth.isAuthenticated;
        if($auth.getPayload())
          $scope.userRole = $auth.getPayload().userRole;
        $scope.getWidth = function () {
            return window.innerWidth;
        };

        $scope.$watch($scope.getWidth, function (newValue, oldValue) {
            if (newValue >= mobileView) {
                if (angular.isDefined($cookieStore.get('toggle'))) {
                    $scope.toggle = !$cookieStore.get('toggle') ? false : true;
                } else {
                    $scope.toggle = true;
                }
            } else {
                $scope.toggle = false;
            }

        });

        $scope.toggleSidebar = function () {
            $scope.toggle = !$scope.toggle;
            $cookieStore.put('toggle', $scope.toggle);
        };

        window.onresize = function () {
            $scope.$apply();
        };
    }
})();
