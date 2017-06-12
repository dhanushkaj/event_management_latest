/**
 * Created by udeshikaperera on 26/09/2015.
 */
(function(){
  angular.module('holcim.rsmAndAso').controller('RsmsCtrl',[
    'rsmResource','regionList','toastr',
    RsmsCtrl
  ]);

  function RsmsCtrl(rsmResource,regionList,toastr){
    var vm = this;
    vm.regionList = regionList;
    rsmResource.query(function(data){
      vm.rsms = data;
    }).$promise;

    vm.deleteRSM = function(rsm,index){
      rsmResource.delete({rsmId:rsm.id}).$promise.then(function(result){
        vm.rsms.splice(index,1);
        toastr.success(rsm.rsmName + " Deleted!");
      })
    }
  }
})();
