/**
 * Created by udeshikaperera on 30/06/2015.
 */
(function(){
    "use strict";
    angular
        .module('eventMangerApp')
        .directive('rdWidgetFooter', rdWidgetFooter);

    function rdWidgetFooter() {
        var directive = {
            requires: '^rdWidget',
            transclude: true,
            template: '<div class="widget-footer" ng-transclude></div>',
            restrict: 'E'
        };
        return directive;
    };
})();
