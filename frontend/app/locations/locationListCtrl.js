/**
 * Created by udeshikaperera on 06/07/2015.
 */
(function(){
    angular.module('holcim.locations').controller('LocationListCtrl',[
        'locationList','locationResource','$window','toastr','$state',
        LocationListCtrl
    ]);

    function LocationListCtrl(locationList,locationResource,$window,toastr,$state){
        var vm = this;
        vm.locationList = locationList;
        
        
        vm.deleteLocation=function(id){
          		    var deleteUser = $window.confirm('Are you absolutely sure you want to delete?');
        		    if (deleteUser) {
        		    	locationResource.delete({ locationId:id }).$promise.
        		  		     then(function(res)  {
        		  		    	 
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
