/**
 * Created by udeshikaperera on 18/07/2015.
 */
(function(){
    angular.module('holcim.members').factory('influencerResource',[
        'SERVER_URL',
        '$resource',
        influencerResource
    ]);

    function influencerResource(SERVER_URL, $resource){
        return $resource(SERVER_URL+ 'api/members/influencer/:influencerId',{influencerId:'@influencerId'},
        {
            'update': { method:'PUT' },
            'add':{method:'POST'},
            'delete':{method:'DELETE'},
            'birthDays':{
                    method:'GET',
                    url:SERVER_URL+ 'api/members/influencer/birthDays',
                    isArray: true
            },
            'influencerTypes':{
                    method:'GET',
                    url:SERVER_URL + 'api/members/influencer/types',
                    isArray: true
            },
            'getAdditionalInfoList' :{
                    method:'GET',
                    url: SERVER_URL+'api/members/influencer/moreInfo/:influencerId',
                    params:{influencerId:'influencerId'},
                    isArray: true
            },'deleteAditionalInfo' :{
                method:'DELETE',
                url: SERVER_URL+'api/members/influencer/moreInfo/remove/:moreInfoId',
                params:{moreInfoId:'moreInfoId'} 
            },
            'getAdditionalInfoById' :{
                method:'GET',
                url: SERVER_URL+'api/members/influencer/moreInfoObj/:moreInfoId',
                params:{moreInfoId:'moreInfoId'},
                isArray: true
        }
        });
    }
})();
