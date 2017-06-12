/**
 * Created by udeshikaperera on 21/06/2015.
 */
(function(){
    "use strict";
    angular.module('holcim.events').factory('eventResource',[
        '$resource','SERVER_URL',
        eventResource]);

    function eventResource($resource,SERVER_URL){
        return $resource(SERVER_URL+"api/events/:eventId", null,
        	    {
            'update': { method:'PUT' },
            'delete':{method:'DELETE'},
            'byASO':{
              method:'GET',
              url:SERVER_URL+ 'api/events/byASO/:asoId',
              params:{asoId:'asoId'},
              isArray: true
            }
        });
     }
})();
