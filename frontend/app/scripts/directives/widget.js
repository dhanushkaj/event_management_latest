/**
 * Created by udeshikaperera on 30/06/2015.
 */
(function(){
    'use strict';
    angular
        .module('eventMangerApp')
        .directive('rdWidget', rdWidget);

    function rdWidget() {
        var directive = {
            transclude: true,
            template: '<div class="widget" ng-transclude></div>',
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            /* */
        }
    };
})();
