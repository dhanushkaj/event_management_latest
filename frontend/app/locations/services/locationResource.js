/**
 * Created by udeshikaperera on 02/10/2015.
 */
(function(){
  angular.module('holcim.locations').factory('locationResource',[
    'SERVER_URL',
    '$resource',
    locationResource
  ]);

  function locationResource(SERVER_URL, $resource){
    return $resource(SERVER_URL+ 'api/locations/areas/locations/:locationId',{locationId:'@locationId'},
      {
        'byArea':{
          method:'GET',
          url:SERVER_URL+ 'api/locations/areas/locations/byArea/:areaId',
          params:{},
          isArray: true
        }
      });
  }
})();
