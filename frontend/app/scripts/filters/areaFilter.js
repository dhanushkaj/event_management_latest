/**
 * Created by udeshikaperera on 27/09/2015.
 */
(function(){
  "use strict";
  angular.module('eventMangerApp').filter('area',[
    AreaFilter]);

  function AreaFilter(){
    return function (number, areaList){
      for(var i=0;i< areaList.length;i++){
        var area = areaList[i];
        if(number == area.id) return area.areaName;
      }
      return ''
    }
  }
})();
