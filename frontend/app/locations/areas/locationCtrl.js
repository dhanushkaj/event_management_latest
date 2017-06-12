/**
 * Created by udeshikaperera on 27/09/2015.
 */
(function(){
  angular.module('holcim.locations').controller('LocationCtrl',[
    '$scope','$modalInstance','area','location',
    LocationCtrl ]);
  function LocationCtrl($scope,$modalInstance,area,location){
    $scope.area = area;
    $scope.location = location;

    $scope.ok = function () {
      $scope.location.areaId = $scope.area.id;
      $modalInstance.close($scope.location);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
})();
