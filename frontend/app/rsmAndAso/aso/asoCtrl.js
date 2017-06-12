/**
 * Created by udeshikaperera on 27/09/2015.
 */
(function(){
  angular.module('holcim.rsmAndAso').controller('AsoCtrl',[
    'aso','initialData','areaResource','asoResource','toastr','$state',
    AsoCtrl
  ]);

  function AsoCtrl(aso,initialData,areaResource,asoResource,toastr,$state){
    var vm = this;
    vm.aso = aso;
    vm.regionList = initialData.regionList;
    vm.areaList = initialData.areaList;
    vm.submit = function(){
      vm.aso.$save().then(function (result) {
        toastr.success(result.asoName + ' Saved!!', 'Saved');
        $state.go('aso');
      })
    };

    vm.getAreaByRegion= function(){
      vm.areaList = areaResource.byRegion({regionId:vm.aso.RegionId});
    }
    
    
    vm.cancel = function(){
         $state.go('aso');
    };
    
  }
})();
