/**
 * Created by udeshikaperera on 26/09/2015.
 */
(function(){
  angular.module('holcim.locations').controller('RegionCtrl',[
    'regionResource','region','toastr','$state','$scope',
    RegionCtrl
  ]);

  function RegionCtrl(regionResource,region,toastr,$state){
    var vm = this;
    vm.originalValues = angular.copy(region);
    vm.region = region;
    vm.submit = function() {
      vm.region.$save().then(function (result) {
        toastr.success(result.regionName + ' Saved!!', 'Saved');
        $state.go('regions');
      })
    };
    vm.cancel = function(){
      vm.region = angular.copy(vm.originalValues);
         $state.go('regions');
     
       }
  }
})();
