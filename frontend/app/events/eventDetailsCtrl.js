/**
 * Created by udeshikaperera on 03/07/2015.
 */
(function(){
    angular.module('holcim.events').controller('EventDetailsCtrl',
        [
            'holcimEvent','toastr','$state','locationResource',
            EventDetailsCtrl]);

    function EventDetailsCtrl(holcimEvent,toastr,$state,locationResource){
        //$scope.code = event;
        var vm = this;
        console.log(":::::::: "+ holcimEvent);
        vm.event = holcimEvent;
        locationResource.query({locationId :vm.event.location}).$promise.then(function(result){
        	if(result[0]!=null && result[0]!=undefined){
        		vm.locationName=  result[0].locationName;
        	}

        });
        //vm.panelTitle = holcimEvent.title;
        //$scope.eventTypes = eventTypes;
        //$scope.dt = new Date();
        //$scope.selectedEvent = null;
        //$scope.planed =  true;
        //$scope.planedLabel = ($scope.planed)? 'Planed': 'UnPlaned';
        //var event =

        //$scope.addNewEvent = function(){
        //    console.log("Event Added");
        //    eventResource.post()
        //}
        vm.submit = function () {
             vm.event.$save().
            then(function (res) {
                toastr.success('Event Summery Updated successfully!', 'Success',
                    {closeButton: true});
                location.reload();
            })
            .catch(function (req) {
                toastr.error('Something wrong!', 'Opps!', {closeButton: true});
            })
            .finally(function () {
                vm.event = null;
            })
        }

        vm.cancel = function () {
            $state.go('eventList');
       };

    }
})();
