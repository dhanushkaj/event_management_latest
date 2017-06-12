/**
 * Created by udeshikaperera on 27/09/2015.
 */
(function(){
  angular.module('holcim.locations').factory('areaResource',[
    'SERVER_URL',
    '$resource',
    areaResource
  ]);

  function areaResource(SERVER_URL, $resource){
    return $resource(SERVER_URL+ 'api/locations/areas/:areaId',{areaId:'@areaId'},
      {
        'update': { method:'PUT' },
        'add':{method:'POST'},
        'delete':{method:'DELETE'},
        'byRegion':{
          method:'GET',
          url:SERVER_URL+ 'api/locations/areas/byRegion/:regionId',
          params:{},
          isArray: true
        },
        'byAso':{
          method:'GET',
          url:SERVER_URL+ 'api/locations/areas/byASO/:asoId',
          params:{asoId:'@asoId'}
        },
        'locationsByArea':{
          method:'GET',
          url:SERVER_URL+ 'api/locations/areas/locations/byArea/:areaId',
          params:{areaId:'@areaId'},
          isArray: true
        }
      });
  }
})();
