/**
 * Created by udeshikaperera on 06/07/2015.
 */
(function(){
    angular.module('holcim.members').controller('MembersListCtrl',[
        'influencerResource','memberResource','toastr','$state','$window','initialData','asoResource',
        MembersListCtrl]);

    function MembersListCtrl(influencerResource,memberResource,toastr,$state,$window,initialData,asoResource){
        var vm = this;
        vm.influencerList  = initialData.influencerList;
        
        
        memberResource.getInfluencerTypes();
        vm.influencerTypes =memberResource.influencerTypes;
        asoResource.query(function(data){
          vm.asosList = data;
        }).$promise;
        

	    vm.getExportArr = function(){
	        vm.influencerListArr =[];
		    var parsed =[];
		    angular.copy(vm.influencerList, parsed);
		    for(var i=0;i<parsed.length;i++){
		   	vm.influencerListArr[i] =[];
		   	vm.influencerListArr[i][0]=parsed[i].influncerName;
		   	vm.influencerListArr[i][1]=parsed[i].dateOfBirth;
		   	vm.influencerListArr[i][2]=parsed[i].nic;
		   	vm.influencerListArr[i][3]=parsed[i].address;
		   	vm.influencerListArr[i][4]=parsed[i].mobileNo;
		   	vm.influencerListArr[i][5]=parsed[i].landNo;
		   }
 	    	return vm.influencerListArr;
	    } 
	      
	     
	    vm.getAllMembers=function(){
         	memberResource.getMembers(vm.influencerCode);
        	vm.influencerList=memberResource.members;
        };

        vm.getMembersForASO = function(){
          memberResource.getMembersForASO(vm.asoCode);
          vm.influencerList = memberResource.members;
        };


        vm.deleteMember=function(influencer,index){
          		    var deleteUser = $window.confirm('Are you absolutely sure you want to delete?');
        		    if (deleteUser) {
        		     	influencerResource.delete({ influencerId:influencer.id }).$promise.
        			     then(function(res)  {
        			    	 vm.influencerList.splice(index,1);
              		    	 toastr.success(res.message, 'Success',
                                     {closeButton: true});
              		         $state.go($state.current, {}, {reload: true});
            		     })
        		  		.catch(function(req) { toastr.error('Something wrong!', 'Opps!', {closeButton: true}); })
      		  		    .finally(function()  { vm.member=null; });
        		    }
        }
    }
})();
