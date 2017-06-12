/**
 * Created by udeshikaperera on 30/06/2015.
 */
(function(){
    "use strict";
    angular
        .module('eventMangerApp')
        .directive('rdWidgetHeader', rdWidgetTitle);

    function rdWidgetTitle() {
        var directive = {
            requires: '^rdWidget',
            scope: {
                title: '@',
                icon: '@'
            },
            transclude: true,
            template: '<div class="widget-header"><div class="row widget-header-content"><div class="pull-left" style="color: white"><i class="fa"  ng-class="icon"></i> {{title}} </div><div class="pull-right col-xs-6 col-sm-4" ng-transclude></div></div></div>',
            restrict: 'E'
        };
        return directive;
    };
})();
