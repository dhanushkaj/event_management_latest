(function(){
    "use strict";
    angular.module('holcim.events').factory('memberResource', ['$http','SERVER_URL',
		function($http,SERVER_URL){
  	  var a = {
  		    asos: [],
  		    asoRegion:[],
  		    masonsByAsoAndRegionAndLoc:[],
  		    eventMembersIds:[],
  		    influencerTypes:[],
  		    event:null,
  		    locationByAsoAndReg:[],
  		    members:[],
  		    area:[],
  		    memberEvent:null,
  		    memberBirthDays:[],
  		    exportMemberBirthDay:[]
  		  };

        a.getAll = function() {
       	   return $http.get(SERVER_URL+"api/asoOrsm/asos").success(function(data){
   	    	  angular.copy(data, a.asos);
  		   });
  		  };

 		a.getRegionForAso=function(asocode){

  		  return $http.get(SERVER_URL+"api/members/asos/"+asocode).success(function(data){
  			  angular.copy(data, a.asoRegion);
  		   })
   		};

		   a.getLocationByAsoAndRegion = function(asocode,regId){

	  	        $http.post(SERVER_URL+'api/members/getLocationByAsoAndRegion', {
	   	          'asocode': asocode,
	   	          'regId': regId
	   	        })
	   	        .success(function(data, status, headers, config) {
	   	           angular.copy(data, a.locationByAsoAndReg);
	   	        });

	       };

  		   a.getMasonsByAsoAndRegionAndLoc = function(asoId,eventType){

	  	        $http.post(SERVER_URL+'api/members/getAsoRegLocMembers', {
	   	          'asoId': asoId,
	   	          'eventType': eventType
	   	        })
	   	        .success(function(data, status, headers, config) {
	   	           angular.copy(data, a.masonsByAsoAndRegionAndLoc);
	   	        });

	       };

		   	a.addMasonToEvent=function(eventMember,method,holcimEvent){


		        $http.post(SERVER_URL+'api/members/addMasonToEvent',eventMember)
		   	        .success(function(data, status, headers, config) {
		   	         if(method=='add'){
		   	            alert('Members Added To Event succefully');
		   	         }else if(method=='remove'){
		   	        	 alert('Members removed from Event');
		   	         }

	                }).
	                error(function(data, status, headers, config) {
			   		       alert('Adding/Removing Members to Event Successfull');
			   		 });

		    };

  		    a.getMembersForEvent=function(eventId){
            if(eventId == undefined) eventId = 0;
  		       return $http.get(SERVER_URL+"api/members/getMebersForEvents/"+eventId).success(function(data){
  		    	   	if(data!=null && data.length>=1 && data[0].memberIds!=null){
  		        		a.eventMembersIds = data[0].memberIds;
  		    	  		a.memberEvent = data[0];
  		    	  	}else{
  		    	  	    a.eventMembersIds=[];
  		    	  	    a.memberEvent=null;
  		    	  	}
  	 	  	   })
   		    };

   		    a.getInfluencerTypes=function(){
   		     	return  $http.get(SERVER_URL+"api/members/influencer/types").success(function(data){
   		    		angular.copy(data, a.influencerTypes);
  	 	  	   })
   		    };

   		   a.getMembers = function(influencerCat){

	  	        $http.post(SERVER_URL+'api/members/getMembers', {
	   	          'influencerCat': influencerCat
	   	        })
	   	        .success(function(data, status, headers, config) {
	   	           angular.copy(data, a.members);
	   	        });

	       };

	      a.getMembersForASO = function(asoId){
	        $http.post(SERVER_URL+'api/members/getMembersASO', {
	          'asoId': asoId
	        })
	          .success(function(data, status, headers, config) {
	            angular.copy(data, a.members);
	          });
	      };

   		    a.setEvent=function(event){
   		    	a.event=event;
   		    };

   		    a.getEvent=function(){

   		    	return a.event;
   		    }


   		    a.getBirthDays=function(){
 		     	return  $http.get(SERVER_URL+"api/members/birthDays").success(function(data){
 		    		angular.copy(data, a.memberBirthDays);
 		    		a.setExportBirthDay(a.memberBirthDays)
	 	  	   })
 		    }
   		    
   		    
   		    a.getBirthDaysForSelectedMonth=function(birthday){
   		    	
   		     $http.post(SERVER_URL+'api/members/birthDaysForSelctedMonth', {
	   	          'birthday': birthday 
	   	        })
	   	        .success(function(data, status, headers, config) {
	   	        	angular.copy(data, a.memberBirthDays);
	   	        	a.setExportBirthDay(a.memberBirthDays);
	   	        });
  		    }
   		    
   		    a.setExportBirthDay=function(memberBirthDays){
   		    	
   		     
   		         var birthDayArr =[];
   		  
   		    	     for(var i=0;i<memberBirthDays.length;i++){
   		    	    	 birthDayArr[i] =[];
   		    	    	 birthDayArr[i][0]=memberBirthDays[i].influncerName;
   		    	    	 birthDayArr[i][1]=memberBirthDays[i].dateOfBirth;
   		    	    	 birthDayArr[i][2]=memberBirthDays[i].nic;
   		    	    	 birthDayArr[i][3]=memberBirthDays[i].address;
   		    	    	 birthDayArr[i][4]=memberBirthDays[i].mobileNo;
   		    	    	 birthDayArr[i][5]=memberBirthDays[i].landNo;
   		    	     }
    	    	   a.exportMemberBirthDay = birthDayArr;  
    		 }
   		    
   		    return a;
  	 }]);

})();


