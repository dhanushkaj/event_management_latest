/**
 * Created by udeshikaperera on 18/06/2015.
 */
(function(){
    "use strict";
    angular.module("sideMenu").directive("emSideMenu",emSideMenu);

    function emSideMenu(){
        return {
            transclude: true,
            scope:{},
            controller: 'MenuCtrl',
            templateUrl:'sideMenu/menuView.html'
        }
    }
})();