/**
 * Created by udeshikaperera on 11/07/2015.
 */
(function(){
    "use strict";
    angular.module('holcim.events').controller('EventEditMemberCtrl',[
        'holcimEvent','initialMemberData','memberResource','eventResource','$scope','$state','toastr','$modal','$window','$http','SERVER_URL',EventEditMemberCtrl
    ]).filter('selectedIds', function() {
    	//return function(tasks, tags) {
        return function(masonsByAsoAndRegionAndLoc, memberIds) {
            return masonsByAsoAndRegionAndLoc.filter(function(mason) {
               if(memberIds[0]!='' || memberIds[0]!=null){
                for (var i in memberIds) {
                    if (mason.nic==memberIds[i]) {
                        return true;
                    }
                }
                	return false;
               }else{
            	   return true;
               }
            });
        };
    });

    function EventEditMemberCtrl(holcimEvent, initialMemberData,memberResource,eventResource,$scope,$state,toastr,$modal,$window,$http,SERVER_URL){
 
    	  
        var vm = this;
        vm.event = holcimEvent;
        vm.masonsByAsoAndRegionAndLoc = memberResource.masonsByAsoAndRegionAndLoc;
        vm.memberIds=memberResource.eventMembersIds.toString().split(',');
        $scope.pageSize = 10;
        vm.selectedMasons=[];
        vm.removeIds=[];
        vm.chekcedMem=[]; 
        vm.checked=[];
        vm.memberEvent=memberResource.memberEvent;
        vm.totalMemberCountInEvent=	vm.memberIds.length;
         
        vm.addMembers=function(index,idno){
       	 
    	    var i = vm.selectedMasons.indexOf(idno);
           	if (vm.chekcedMem[index+idno]){
         		vm.selectedMasons.push(idno);
            }else{
            	vm.selectedMasons.splice(i,1);
        	} 
       };
     
        
       vm.addMebersToEvent=function(data){ 
      	if(vm.selectedMasons.length!=0){
		 		memberResource.addMasonToEvent({
		 			id : vm.memberEvent!=null?vm.memberEvent.id:null,
			     	eventId: vm.event.id,
					memberIds:vm.selectedMasons.toString(),
				 },'add',holcimEvent);
		 		$state.go($state.current, {}, {reload: true});
	       
	    	}else {
	     	   toastr.success('Please Select Members to Add the event', 'Success',
                       {closeButton: true});
	        }
       };
       
       vm.removeChange=function(idno,index){
 
	            var i = vm.removeIds.indexOf(idno);
	         	if (vm.checked[index+idno]){
	         		vm.removeIds.push(idno);
	            }else{
	            	vm.removeIds.splice(i,1);
	        	} 
	     };
	     
	      vm.removeMembers=function(){
	  
	    	  var arr= vm.memberIds.diff(vm.removeIds);
	     	  if(vm.removeIds.length>=1){
		 		memberResource.addMasonToEvent({
		 			id : vm.memberEvent!=null?vm.memberEvent.id:null,
			 		eventId: vm.event.id,
					memberIds:arr.toString(),
				 },'remove',holcimEvent);
		 		$state.go($state.current, {}, {reload: true});
	    	  }else {
		     	   toastr.error('Please Select Members to Remove from the event', 'Opps!',
	                       {closeButton: true});
		     }
 		 		
	      }
	  
	      Array.prototype.diff = function(a) {
	    	    return this.filter(function(i) {return a.indexOf(i) < 0;});
	       };
	    	
 
		$scope.showPopup = function(){
			
			memberResource.setEvent(vm.event);
	
		        // open modal whithout changing url
		    $scope.$modalInstance = $modal.open({
		          templateUrl: '/events/popUpAddingMember.html',
		          controller:'AddMoreMemberCtrl',
		          backdrop: false,
		          resolve :{
		        	   masonsByAsoAndDis:memberResource.getMasonsByAsoAndRegionAndLoc(holcimEvent.asoId,holcimEvent.code),
	              	   eventmembers:memberResource.getMembersForEvent(holcimEvent.id),
	              	   scope:$scope,
	              	   modalInstance:$scope.$modalInstance,
	                   event: function(){
	                	   return vm.event;
	                   }
	               }
		    });
	
		         
		};
	      
	  	$scope.close=function(){
	  		   $scope.$modalInstance.dismiss('cancel');
	  		   $state.go($state.current, {}, {reload: true});
	    }
	    	
	    
    }
})();