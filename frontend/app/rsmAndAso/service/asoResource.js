/**
 * Created by udeshikaperera on 27/09/2015.
 */
(function(){
  angular.module('holcim.rsmAndAso').factory('asoResource',[
    'SERVER_URL',
    '$resource',
    asoResource
  ]);

  function asoResource(SERVER_URL, $resource){
    return $resource(SERVER_URL+ 'api/asoOrsm/asos/:asoId',{asoId:'@asoId'},
      {
        'update': { method:'PUT' },
        'add':{method:'POST'},
        'delete':{method:'DELETE'}

      });
  }
})();
