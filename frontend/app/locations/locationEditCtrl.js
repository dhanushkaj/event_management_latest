/**
 * Created by udeshikaperera on 18/07/2015.
 */
(function(){
    angular.module('holcim.locations').controller('LocationEditCtrl',[
        'location','locationResource','memberResource','toastr',
        LocationEditCtrl
    ]);

    function LocationEditCtrl(location,locationResource,memberResource,toastr){
        var vm = this;
        vm.asos = memberResource.asos;
        vm.asoRegion = memberResource.asoRegion;
        vm.location = location;
  		vm.submit = function(){
 
       	  if(vm.location._id!=null){
       		 var _id =vm.location._id; 
       		locationResource.update({ locationId:_id }, vm.location).$promise.
       		     then(function(res)  {
      		    	 toastr.success(res.message, 'Success',
                             {closeButton: true});
      		     
       		     })
       		    .catch(function(req) {toastr.error('Something wrong!', 'Opps!', {closeButton: true});})
       		    .finally(function()  { vm.location=null; });;
       	   }else{
 
       		locationResource.add({locationId:0},vm.location).$promise.
		       then(function(res)  {toastr.success(res.message, 'Success',
                       {closeButton: true});})
		      .catch(function(req) {toastr.error('Something wrong!', 'Opps!', {closeButton: true}); });
       	  }
       	    
           
       };
 
       vm.getRegionForAso = function () {
           memberResource.getRegionForAso(vm.location.asocode);
           vm.asoRegion = memberResource.asoRegion;
       };

    }
})();