/**
 * Created by udeshikaperera on 05/07/2015.
 */
(function (){
    angular.module('holcim.events').factory('eventTypeResource',[
        '$resource','SERVER_URL',eventTypeResource]);

    function eventTypeResource($resource, SERVER_URL){
        return $resource(SERVER_URL+"api/events/types",{},
          {
            //'update': { method:'PUT' },
            'byInfuencerType':{
              method:'GET',
              url:SERVER_URL+ 'api/events/types/byInfulencer/:infuencerType',
              params:{infuencerType:'@infuencerType'},
              isArray: true
            }
          });
    }
})();
