/**
 * Created by udeshikaperera on 27/09/2015.
 */
(function(){
  angular.module('holcim.locations').controller('AreaCtrl',[
    'area','areaResource','initialData','$modal','$log',
    'locationResource','toastr','$state',
    AreaCtrl
  ]);

  function AreaCtrl(area,areaResource,initialData,$modal,$log,locationResource,toastr,$state){
    var vm = this;
    vm.area = area;
    vm.locationList = initialData.locationList;
    vm.regionList = initialData.regionList;
    vm.submit = function(){
      vm.area.$save().then(function (result) {
        toastr.success(result.areaName + ' Saved!!', 'Saved');
        $state.go('areas');
      })
    };

    vm.openLocationDialog = function(selectedLocation){
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'locations/areas/locationEditView.html',
        controller: "LocationCtrl",
        resolve: {
          area: function () {
            return vm.area;
          },
          location : function(){
            return selectedLocation;
          }
        }
      });

      modalInstance.result.then(function (location) {
        locationResource.save(location).$promise.then(function(result){
          toastr.success(result.locationName+ " Saved!",'Saved Location!')
        });
       locationResource.byArea({areaId:vm.area.id}).
          $promise.then(function(result){
            vm.locationList = result;
        });
        //vm.locationList = locationResource.byArea({areaId:vm.area.id}).$promise;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });

    };
    
    vm.cancel = function(){
        $state.go('areas');
    }
    
    
    vm.deleteLocation = function (location) {
      
         locationResource.delete({ locationId:location.id }).$promise.
         then(function(res)  {
       
     	    	 toastr.success(res.message, 'Success',
                     {closeButton: true});
     	         $state.go($state.current, {}, {reload: true});
         })
     		.catch(function(req) { toastr.error('Something wrong!', 'Opps!', {closeButton: true}); })
     	    .finally(function()  { vm.member=null; });
    };
    
    
    
    
  }
})();
