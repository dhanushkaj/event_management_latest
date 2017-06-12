/**
 * Created by udeshikaperera on 11/07/2015.
 */
(function(){
    "use strict";
    angular.module('holcim.events').controller('AddMoreMemberCtrl',[
         '$scope','$state','$modal','memberResource','$modalInstance',AddMoreMemberCtrl
    ]).filter('unSelectedIds', function() {
    	//return function(tasks, tags) {
        return function(masonsByAsoAndRegionAndLoc, memberIds) {
            return masonsByAsoAndRegionAndLoc.filter(function(mason) {
               if(memberIds[0]!='' || memberIds[0]!=null){
                for (var i in memberIds) {
                    if (mason.nic==memberIds[i]) {
                        return false;
                    }
                }
                	return true;
               }else{
            	   return false;
               }
            });
        };
    });
 

    function AddMoreMemberCtrl($scope,$state,$modal,memberResource,$modalInstance,event){ 
	
		 $scope.data = {
				 checked:[]
			    };
		 
		$scope.masonsByAsoAndRegionAndLoc = memberResource.masonsByAsoAndRegionAndLoc;
		$scope.memberIds=memberResource.eventMembersIds.toString().split(',');
		$scope.memberEvent=memberResource.memberEvent;
		$scope.pageSize = 10;
		$scope.addMoreIds=[];
	  	
	  	$scope.close=function(){
	  		   $modalInstance.dismiss('cancel');
	  		   location.reload();
	    }
    	
    	
    	$scope.addMoreMembersToEvent=function(data){
           var event = memberResource.getEvent();
           var allMembers =$scope.memberIds.concat($scope.addMoreIds);
           memberResource.addMasonToEvent({
        	   id : $scope.memberEvent!=null?$scope.memberEvent.id:null,
   			   eventId:event.id,
   			   memberIds:allMembers.toString(),
 			 },'add',event); 
           location.reload();
         };
 
         $scope.addMoreMemebrs=function(idno,index){
        	 
        	    var i = $scope.addMoreIds.indexOf(idno);
               	if ($scope.data.checked[index+idno]){
	         		$scope.addMoreIds.push(idno);
	            }else{
	            	$scope.addMoreIds.splice(i,1);
	        	} 
	     };
	     
        
    }
})();