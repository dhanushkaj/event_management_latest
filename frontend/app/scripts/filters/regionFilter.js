/**
 * Created by udeshikaperera on 27/09/2015.
 */
(function(){
  "use strict";
  angular.module('eventMangerApp').filter('region',[
    RegionFilter]);

  function RegionFilter(){
    return function (number, regionList){
      for(var i=0;i< regionList.length;i++){
        var region = regionList[i];
        if(number == region.id) return region.regionName;
      }
      return 'Not defined!'
    }
  }
})();
