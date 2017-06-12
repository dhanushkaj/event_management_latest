/**
 * Created by udeshikaperera on 06/07/2015.
 */
(function(){
    angular.module('holcim.events').controller('EventListCtrl',[
        'eventResource','$window','toastr','$state',EventListCtrl
    ]);
    function EventListCtrl(eventResource,$window,toastr,$state){
        var vm = this;
        eventResource.query(function(data){
            vm.events = data;
        }).$promise;
        
        vm.deleteEvent =function(event,index){
        	 
        	var deleteUser = $window.confirm('Are you sure you want to delete?');
		    if (deleteUser) {
		    	eventResource.delete({eventId:event.id}).$promise.
		  		     then(function(res)  {
		  		    	 vm.events.splice(index,1);
		  		    	 toastr.success(res.message, 'Success',
                             {closeButton: true});
		  		    	    $state.go($state.current, {}, {reload: true});
		  		     
		  		        }
		  		     )
		  		    .catch(function(req) { toastr.error('Something wrong!', 'Opps!', {closeButton: true}); })
		  		    .finally(function()  { vm.member=null; });
		         
		    }

        }
        
        
        
    }
})();