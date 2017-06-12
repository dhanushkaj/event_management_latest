/**
 * Created by udeshikaperera on 07/07/2015.
 */
(function(){
    angular.module('holcim.locations').factory('locationResource',[
        '$resource','SERVER_URL',
        locationResource
    ]);
    function locationResource($resource, SERVER_URL){
        return $resource(SERVER_URL+ 'api/districtLocations/districtLocations/:locationId',{locationId:'@locationId'},
        	    {
        	        'update': { method:'PUT' },
        	        'add':{method:'POST'},
        	        'delete':{method:'DELETE'}
        });
    }
})();