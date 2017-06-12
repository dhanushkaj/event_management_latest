/**
 * Created by udeshikaperera on 11/07/2015.
 */
(function () {
    "use strict";
    angular.module('holcim.events').controller('EventEditCtrl', [
      'holcimEvent', 'initialData', 'memberResource','eventTypeResource',
      'eventResource','areaResource','$state','toastr',
      EventEditCtrl
    ]);

    function EventEditCtrl(holcimEvent, initialData, memberResource,eventTypeResource,
                           eventResource,areaResource,$state,toastr) {
        var vm = this;
        vm.event = holcimEvent;
        vm.influencerTypes = initialData.influencerTypes;
        vm.asos = memberResource.asos;
        vm.eventTypes = initialData.eventTypes;
        vm.areaList = initialData.areaList;
        vm.area = initialData.area;
        vm.locationList = initialData.locationList;

        vm.getEventTypesInfluencerCode = function(){
          eventTypeResource.byInfuencerType({infuencerType:vm.event.influencerCode}).
            $promise.then(function(result){
              vm.eventTypes = result;
          })
        };
        vm.getAreaForAso = function(){
          areaResource.byAso({asoId:vm.event.asoId}).$promise.then(function(result){
            vm.area = result;
            vm.event.areaId = result.id;
            areaResource.locationsByArea({areaId:result.id}).$promise.then(function(result){
              vm.locationList = result;
            });
          });
        };

        vm.getLocationByArea = function(){
          vm.locationList = areaResource.locationsByArea({areaId:vm.event.areaId})
        };


        vm.getLocationByAsoAndRegion = function () {
            memberResource.getLocationByAsoAndRegion(vm.event.owner, vm.event.region);
            vm.locationByAsoAndReg = memberResource.locationByAsoAndReg;
        };

        vm.submit = function () {

            for (var i = 0; i < vm.eventTypes.length; i++) {
                if (vm.eventTypes[i].code == vm.event.code) {
                    vm.event.title = vm.eventTypes[i].name;
                }
            }

            if (vm.event.influencerCode == 'Engineer') {
                vm.event.owner = 'Chanaka';
                vm.event.title = 'Engineer Meet';
                vm.event.code = 'ENG';
            }else{

                for (var i = 0; i < vm.asos.length; i++) {
                    if (vm.asos[i].id == vm.event.asoId) {
                        vm.event.owner = vm.asos[i].asoName;
                    }
                }
            }
            vm.event.budget=parseFloat(vm.event.budget);

           vm.event.budget=parseFloat(vm.event.budget);

            if (vm.event._id != null) {
                var _id = vm.event._id;
                eventResource.update({eventId: _id}, vm.event).$promise.
                    then(function (res) {
                        toastr.success('Event Updated successfully!', 'Success',
                            {closeButton: true});
                    })
                    .catch(function (req) {
                        toastr.error('Something wrong!', 'Opps!', {closeButton: true});
                    })
                    .finally(function () {
                        vm.event = null;
                    });
                ;
            } else {
                vm.event.$save().
                    then(function (res) {
                        toastr.success('Event Updated successfully!', 'Success',
                            {closeButton: true});
                    $state.go('eventCalendar');
                    })
                    .catch(function (req) {
                        toastr.error('Something wrong!', 'Opps!', {closeButton: true});
                    })
                    .finally(function () {
                        vm.event = null;
                    });
                ;
            }


        };

        vm.cancel = function () {
             $state.go('eventList');
        };

 
        vm.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.opend = !vm.opend;
        };

        vm.checkVal = function () {
            if (vm.event._id != null) {
                return true;
            }
            return false;
        }

    }
})();
