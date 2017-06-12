/**
 * Created by udeshikaperera on 26/09/2015.
 */
(function(){
  angular.module('holcim.rsmAndAso').controller('RsmCtrl',[
    'rsm','regionList','rsmResource','$state','toastr',
    RsmCtrl
  ]);

  function RsmCtrl(rsm,regionList,rsmResource,$state,toastr){
    var vm = this;
    vm.rsm = rsm;
    vm.regionList = regionList;
    vm.submit = function(){
      vm.rsm.$save().then(function (result) {
        toastr.success(result.rsmName + ' Saved!!', 'Saved');
        $state.go('rsm');
      })
    };

    vm.cancel = function(){
      $state.go('rsm');
    }
  }
})();
