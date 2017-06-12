/**
 * Created by udeshikaperera on 26/09/2015.
 */
(function(){
  angular.module('holcim.rsmAndAso').controller('AsosCtrl',[
    'asoResource','initialData','toastr',AsosCtrl,
  ]);

  function AsosCtrl(asoResource,initialData,toastr){
    var vm = this;

    vm.regionList = initialData.regionList;
    vm.areaList = initialData.areaList;

    asoResource.query(function(data){
      vm.asosList = data;
    }).$promise;

    vm.deleteASO = function(aso,index){
      asoResource.delete({asoId:aso.id}).$promise.then(function(result){
        vm.asosList.splice(index,1);
        toastr.success(aso.asoName + " Deleted!");
      })
    };

  }
})();
