/**
 * Created by udeshikaperera on 11/10/2015.
 */
(function(){
  angular.module('eventMangerApp').directive('holConfirmDelete', function () {
    return {
      replace: true,
      templateUrl: 'templates/deleteConfirmation.html',
      scope: { onConfirm: '&' },
      controller: function ($scope) {
        $scope.isDeleting = false;
        $scope.startDelete = function () {
          return $scope.isDeleting = true;
        };
        $scope.cancel = function () {
          return $scope.isDeleting = false;
        };
        return $scope.confirm = function () {
          return $scope.onConfirm();
        };
      }
    };
  })
})();
