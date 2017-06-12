/**
 * Created by udeshikaperera on 26/09/2015.
 */
(function(){
  angular.module('holcim.locations').controller('RegionsCtrl',
    ['regionResource','toastr',
    RegionsCtrl
  ]);

  function RegionsCtrl(regionResource,toastr){
    var vm = this;
    regionResource.query(function(data){
      vm.regions = data;
    }).$promise;

    vm.deleteRegion = function(region,index){
      regionResource.delete({regionId:region.id}).$promise.then(function(result){
        vm.regions.splice(index,1);
        toastr.success(region.regionName + ' Deleted!!', 'Deleted');
      })
    }
  }
})();
