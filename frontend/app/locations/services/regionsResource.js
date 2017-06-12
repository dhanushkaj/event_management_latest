/**
 * Created by udeshikaperera on 26/09/2015.
 */
(function(){
  angular.module('holcim.locations').factory('regionResource',[
    'SERVER_URL',
    '$resource',
    regionResource
  ]);

  function regionResource(SERVER_URL, $resource){
    return $resource(SERVER_URL+ 'api/locations/regions/:regionId',{regionId:'@regionId'},
      {
        'update': { method:'PUT' },
        'add':{method:'POST'},
        'delete':{method:'DELETE'}
      });
  }
})();
