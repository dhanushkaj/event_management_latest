/**
 * Created by udeshikaperera on 19/06/2015.
 */
(function (){
    angular.module('dashboard').controller("DashBoardCtrl",[
      'initialData', DashBoardCtrl]);

    function DashBoardCtrl(initialData){
        var vm = this;
        vm.eventList = [];
        vm.eventList = initialData.eventList;
        vm.influencerList = initialData.influencerList;
        //vm.birthDayList = initialData.birthDaysList;
        vm.birthDayList = [];

        vm.logout = function() {
          console.log("#!$@#$@#%");
        };

        vm.showBirthDays = function(){
          console.log("FAFDFAFA");
        }

    }
})();
