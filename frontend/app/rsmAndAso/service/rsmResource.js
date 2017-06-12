/**
 * Created by udeshikaperera on 26/09/2015.
 */
(function(){
  angular.module('holcim.rsmAndAso').factory('rsmResource',[
    'SERVER_URL',
    '$resource',
    rsmResource
  ]);

  function rsmResource(SERVER_URL, $resource){
    return $resource(SERVER_URL+ 'api/asoOrsm/rsms/:rsmId',{rsmId:'@rsmId'},
      {
        'update': { method:'PUT' },
        'add':{method:'POST'},
        'delete':{method:'DELETE'}
        //'birthDays':{
        //  method:'GET',
        //  url:SERVER_URL+ 'api/members/influencer/birthDays',
        //  isArray: true
        //},
        //'influencerTypes':{
        //  method:'GET',
        //  url:SERVER_URL + 'api/members/influencer/types',
        //  isArray: true
        //}
      });
  }
})();
