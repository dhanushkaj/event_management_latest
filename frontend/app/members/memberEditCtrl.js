/**
 * Created by udeshikaperera on 18/07/2015.
 */
(function () {
  angular.module('holcim.members').controller('MemberEditCtrl', [
    'member','$state', 'toastr','initialEditData','moment',
    'areaResource','Upload','ngDialog','SERVER_URL','influencerResource','$modal','$scope','$http',
    MemberEditCtrl
  ]);

  function MemberEditCtrl(member,$state, toastr,initialEditData,moment,areaResource,Upload,ngDialog,SERVER_URL,influencerResource,$modal,$scope,$http) {
    var vm = this;
    var currentYear = new moment().year();
    vm.openedGivenDatePicker = false;
    vm.opend = false;
    vm.member = member;
    vm.influencerTypes = initialEditData.influenceTypes;
    vm.moreInfoList = initialEditData.moreInfoList;
    vm.asos = initialEditData.asos;
    vm.area =initialEditData.area;
    vm.areaList = initialEditData.areaList;
    vm.locationList = initialEditData.locationList;
    vm.languageList = [
      {'id':'01','languageCode':'Sinhala','languageName':'Sinhala'},
      {'id':'02','languageCode':'Tamil','languageName':'Tamil'},
      {'id':'03','languageCode':'English','languageName':'English'}
    ];
    vm.subCategoryList = [{'key':'Contract','value':'Contract'},
                          {'key':'Head','value':'Head'},
                          {'key':'Mason','value':'Mason'}];
    vm.yesNo = [{'key':'Yes','value':'Yes'}, {'key':'No','value':'No'}];
    vm.recomendedList = [{'key':'ASO','value':'ASO'}, {'key':'RSM','value':'RSM'},
                            {'key':'TSE','value':'TSE'}, {'key':'OTHER','value':'OTHER'}];
    vm.influencerStatusList = [{'key':'new','value':'New'}, {'key':'inactive','value':'Inactive'},
                               {'key':'active','value':'Active'}];
    vm.genderList = [{'key':'Male','value':'Male'}, {'key':'Female','value':'Female'}];
    
    vm.masonTypeList = [{'key':'HCS','value':'HCS'},{'key':'MMM','value':'MMM'}, {'key':'PMM','value':'PMM'}, {'key':'MC','value':'MC'}];;
    
    vm.birthYears = [currentYear-1,currentYear];
    vm.getAreaForAso = function(){
        areaResource.byAso({asoId:vm.member.asoId}).$promise.then(function(result){
          vm.area = result;
          vm.member.areaId = result.id;
          vm.getLocationByArea(result.id);
        });
    };

    vm.getLocationByArea = function(areaId){
        areaResource.locationsByArea({areaId:areaId})
          .$promise.then(function(result){
            vm.locationList = result;
          })
    };
    vm.submit = function () {
    	   	
    	if(vm.member.moreInfo!=undefined){
    	 vm.member.moreInfo.inEvent=Boolean(vm.member.moreInfo.inEvent);
    	}
    	
    	if(vm.member.influencerStatus=='new'){
    		vm.member.active='new';
    	}else if(vm.member.influencerStatus=='inactive'){
    		vm.member.active='inactive';
    	}else if(vm.member.influencerStatus=='active'){
    		vm.member.active='active';
    	}
    	
    	if(vm.picFile!=undefined){
     		vm.member.photoPath=SERVER_URL + 'images/masons/'+vm.picFile.name;
    	}

    	vm.member.$save().
	     then(function(res)  {
	    	 if(vm.picFile!=undefined){
	    		 vm.upload(vm.picFile,vm.member.influncerName);
	     	}else {
	     		toastr.success('Member ' + name +' Successfully Added');
	     		$state.go('membersList');
	     	}

   		})
		.catch(function(req) {toastr.error('Something wrong!', 'Opps!', {closeButton: true});})
		.finally(function()  { vm.member=null; });
    };

    vm.showMoreInfoDialog = function(moreInfo){
       var newScope = $scope.$new();
       newScope.moreInfo = moreInfo;
        $scope.$modalInstance = $modal.open({
	          templateUrl: '/members/showMoreInfoDetails.html',
	          scope: newScope,
	          windowClass: 'app-modal-window'
	    });


    };

    vm.open = function ($event) {
    	$event.preventDefault();
    	$event.stopPropagation();
      var value = $event.target.getAttribute('data');
      if('openedGivenDatePicker' == value){
        vm.openedGivenDatePicker = !vm.openedGivenDatePicker;
      }else if('openedEventDatePicker'==value){
    	 vm.openedEventDatePicker = !vm.openedEventDatePicker;
      }else if('openedEnteredDatePicker'==value){
    	  vm.openedEnteredDatePicker = !vm.openedEnteredDatePicker;
      }else if('openedSiteVisitDate'==value){
    	  vm.openedSiteVisitDate=!vm.openedSiteVisitDate;
      } else if('giftDate' == value){
        vm.opend = !vm.opend;
      }
    };

    vm.cancel =function(){
    	 $state.go('membersList');
    };

    vm.upload = function (file,name) {

    	     Upload.upload({
            	   url: SERVER_URL+'api/members/images/',
            	   method: 'POST',
            	   fields: {fileName: name}, file:file})
              .progress(function (event) {
                   var progressPercentage = parseInt(100.0 * event.loaded / event.total);
                   console.log('progress: ' + progressPercentage + '% ' + event.config.file.name);
               }).success(function (data, status, headers, config) {
            	   toastr.success('Member ' + name +' Successfully Added');
            	   $state.go('membersList');
               });

    };

    vm.deleteMoreInfor =function (moreInfoId,index){

    	influencerResource.deleteAditionalInfo({moreInfoId:moreInfoId}).$promise.
		     then(function(res)  {
		    	 vm.moreInfoList.splice(index,1);
  		    	 toastr.success(res.message, 'Success',
                     {closeButton: true});
  		    	    $state.go($state.current, {}, {reload: true});

  		        }
  		     )
  		.catch(function(req) { toastr.error('Something wrong!', 'Opps!', {closeButton: true}); })
  		.finally(function()  { vm.member=null; });
    }
    
    vm.findMembersByNic = function(){
    	
    	if(vm.member.nic != null && vm.member.nic.length==10){
 	        $http.post(SERVER_URL+'api/members/findMembersByNic', {
 	          'nic': vm.member.nic
 	        }).success(function(res) {
 	        	 alert(res.message)
 	        	vm.member.nic = null;
 	        });
    	}    
 	        
 	};
 	   
  }
})();
