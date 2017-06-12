/**
 * Created by udeshikaperera on 30/06/2015.
 */
(function(){
    'use strict';
    angular
        .module('eventMangerApp')
        .directive('rdLoading', rdLoading);

    function rdLoading() {
        var directive = {
            restrict: 'AE',
            template: '<div class="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>'
        };
        return directive;
    };
})();
