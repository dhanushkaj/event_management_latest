/**
 * Created by udeshikaperera on 27/09/2015.
 */
(function(){
  angular.module('holcim.locations').controller('AreasCtrl',
    ['areaResource','regionList','toastr',
      AreasCtrl
    ]);

  function AreasCtrl(areaResource,regionList,toastr){
    var vm = this;
    vm.regionList = regionList;
    areaResource.query(function(data){
      vm.areas = data;
    }).$promise;

    vm.deleteArea = function(area,index){
      areaResource.delete({areaId:area.id}).$promise.then(function(result){
        vm.areas.splice(index,1);
        toastr.success(area.areaName + ' Deleted!!', 'Deleted');
      })
    }
  }
})();
