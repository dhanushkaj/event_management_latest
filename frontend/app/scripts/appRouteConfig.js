/**
 * Created by udeshikaperera on 18/06/2015.
 */
(function(){
  "use strict";
  angular.module('eventMangerApp').config([
      "$stateProvider",
      "$logProvider",
      "$urlRouterProvider",
      "$authProvider",
      "$httpProvider",
      "SERVER_URL",
      EventMangerAppConfig])
      .constant('SERVER_URL', 'http://localhost:3001/')
      .constant('AUTH_EVENTS', {
          loginSuccess: 'auth-login-success',
          loginFailed: 'auth-login-failed',
          logoutSuccess: 'auth-logout-success',
          sessionTimeout: 'auth-session-timeout',
          notAuthenticated: 'auth-not-authenticated',
          notAuthorized: 'auth-not-authorized'
      })
      .run(['$auth','$state','Permission','$rootScope', CheckLogin]);

  function EventMangerAppConfig(
      $stateProvider, $logProvider,$urlRouterProvider, $authProvider, $httpProvider,SERVER_URL){
      $authProvider.baseUrl = SERVER_URL;
      $authProvider.loginUrl = '/auth/login';
      $authProvider.loginRedirect = '/calendar';
      $urlRouterProvider.otherwise(function($injector) {
        var $state = $injector.get("$state");
        $state.go('dashboard');
      });
      $logProvider.debugEnabled(true);

      $httpProvider.interceptors.push('holcimLoggerInterceptor');
        $stateProvider
            .state('welcome', {
              url: '/',
              controller: 'LoginCtrl',
              templateUrl: 'auth/loginView.html',
            })
            .state('dashboard', {
              url: '/dashboard',
              //url: '/',
              controller: 'DashBoardCtrl as vm',
              templateUrl: 'dashboard/dashBoardView.html',
              data: {
                permissions: {
                  only: ['EVENT_ADMIN','IT_ADMIN','ADMIN'],
                  redirectTo: 'welcome'
                }
              },
              resolve: {
                eventResource: "eventResource",
                influencerResource: 'influencerResource',
                initialData: ['eventResource', 'influencerResource', '$q',
                  function (eventResource, influencerResource, $q) {
                    return $q.all({
                      influencerList: influencerResource.query().$promise,
                      // birthDaysList : influencerResource.birthDays().$promise,
                      eventList: eventResource.query().$promise
                    });
                  }
                ]
              }
            })
            .state('eventCalendar', {
                url: '/calendar',
                controller: 'EventCalendarCtrl',
                templateUrl: 'events/eventCalendarView.html'
            })
            .state('eventList', {
                url: '/eventList',
                controller: 'EventListCtrl as vm',
                templateUrl: 'events/eventListView.html'
            })
            .state('eventDetails', {
                abstract:true,
                url: "/eventDetails/:eventId",
                controller: "EventDetailsCtrl as vm",
                templateUrl: "events/eventDetailsView.html",
                resolve: {
                    eventResource: "eventResource",
                    holcimEvent: function(eventResource, $stateParams){
                        var eventId = $stateParams.eventId;
                        return eventResource.get({eventId :eventId}).$promise;
                    }
                }
            })
            .state('eventDetails.info', {
                url: '/info',
                templateUrl: 'events/eventEditInfoView.html'
            }).state('eventDetails.moreInfo', {
                url: '/moreInfo',
                templateUrl: 'events/eventMoreInfoView.html'
            })
            .state('eventDetails.edit', {
                url: '/edit',
                controller: "EventEditCtrl as vm",
                templateUrl: 'events/eventEditView.html',
                resolve :{
            	    eventTypeResource:'eventTypeResource',
            	    initialData: [
                      'eventTypeResource','memberResource','areaResource','influencerResource','holcimEvent','$q',
                      function (eventTypeResource,memberResource,areaResource,influencerResource,holcimEvent, $q) {
                          return $q.all({
                              influencerTypes:influencerResource.influencerTypes(),
                              eventTypes: eventTypeResource.query().$promise,
                              asos: memberResource.getAll(),
                              area : areaResource.byAso({asoId:(holcimEvent.asoId==undefined?0:holcimEvent.asoId)}).$promise.then(function(result){
                                  return result;
                              }),
                              areaList : areaResource.query().$promise,
                              locationList: areaResource.locationsByArea({areaId:holcimEvent.areaId}).$promise.then(function(result){
                                  return result;
                              })
                            });
                      }
                  ]
                }
            })
            .state('eventDetails.editMembers', {
                url: '/members',
                templateUrl: 'events/eventEditMembersView.html',
                controller: "EventEditMemberCtrl as vm",
                resolve :{
              	  eventTypeResource:'eventTypeResource',
              	  initialMemberData: ['eventTypeResource','memberResource','holcimEvent','$q',function (eventTypeResource, memberResource,holcimEvent, $q) {
              	      return $q.all({
              	    	  			  //resetData : memberResource.resetData(),
              	                      masonsByAsoAndDis:memberResource.getMasonsByAsoAndRegionAndLoc(holcimEvent.asoId,holcimEvent.code),
              	                      eventmembers:memberResource.getMembersForEvent(holcimEvent.id)
              	       });
              	 }]

                }
            }).state('memberEdit.addMoreMembers', {
                url: '/addMore',
                //controller: 'MembersListCtrl as vm',
                templateUrl: 'event/popUpAddingMember.html'
            })

            .state('locationList', {
                url: '/locationList',
                controller: 'LocationsCtrl as vm',
                templateUrl: 'locations/locations/locationsView.html'
                //resolve: {
                //    locationResource: "locationResource",
                //    locationList: function(locationResource){
                //        return locationResource.query().$promise;
                //    }
                //}
            }).state('locationEdit', {
                abstract : true,
                url: '/location/edit/:locationId',
                templateUrl: 'locations/locationDetailView.html',
                controller: "LocationEditCtrl as vm",
                resolve :{
                	locationResource:'locationResource',
                    location: function(locationResource, $stateParams){
                        var locationId = $stateParams.locationId;
                        return locationResource.get({locationId :locationId}).$promise;
                    }
                }
            }).state('locationEdit.info', {
                url: '/info',
                templateUrl: 'locations/locationEditInfoView.html'
            }).state('locationEdit.edit', {
                url: '/edit',
                templateUrl: 'locations/locationEditView.html',
                 resolve :{
                     initialLocationEditData: ['memberResource','location','$q',
                       function (memberResource,location,$q) {
                	      return $q.all({
                          asos: memberResource.getAll(),
                          disrtcOfOwner:memberResource.getRegionForAso(location.asocode)
                	       });
                	 }]

                  }
            })
         //new Routings
          .state('membersList', {
            url: '/membersList',
            controller: 'MembersListCtrl as vm',
            templateUrl: 'members/membersListView.html',
            resolve :{
              influencerResource:'influencerResource',
              asoResource:'asoResource',
              initialData: ['influencerResource','$q',
                function (influencerResource,$q) {
                  return $q.all({
                    influencerList : influencerResource.query()
                  });
                }]

            }

          })
          .state('memberEdit', {
            abstract : true,
            url: '/member/edit/:influencerId',
            templateUrl: 'members/memberDetailView.html',
            controller: "MemberEditCtrl as vm",
            resolve :{
              influencerResource:'influencerResource',
              asoResource:'asoResource',
              areaResource:'areaResource',
              member: function(influencerResource, $stateParams){
                var influencerId = $stateParams.influencerId;
                return influencerResource.get({influencerId :influencerId}).$promise;
              },
              initialEditData: [
                'influencerResource','asoResource','areaResource','member','$q',
                function (influencerResource,asoResource,areaResource,member,$q) {
                return $q.all({
                  influenceTypes:influencerResource.influencerTypes(),
                  asos: asoResource.query(function(data){
                         return data;
                  }),
                  area : areaResource.byAso({asoId:(member.asoId==undefined?0:member.asoId)}).$promise.then(function(result){
                      return result;
                  }),
                  locationList: areaResource.locationsByArea({areaId:(member.areaId==undefined?0:member.areaId)}).$promise.then(function(result){
                      return result;
                  }),
                  areaList : areaResource.query().$promise,
                  moreInfoList : influencerResource.getAdditionalInfoList({influencerId:member.id}).$promise
                });
              }]
            }
          })
          .state('memberEdit.info', {
            url: '/info',
            templateUrl: 'members/memberEditInfoView.html'
          })
          .state('memberEdit.edit', {
            url: '/edit',
            templateUrl: 'members/memberEditEditView.html'
            //resolve :{
            //  initialEditData: ['memberResource','$q',function (memberResource,$q) {
            //    return $q.all({
            //      influenceTypes:memberResource.getInfluencerTypes()
            //      //asos: memberResource.getAll()
            //
            //    });
            //  }]

            //}
          })
          .state('memberEdit.moreInfo',{
            url: '/moreInfo',
            templateUrl: 'members/memberMoreInfoView.html'
          })
          .state('rsm', {
            url: '/rsms',
            controller: 'RsmsCtrl as vm',
            templateUrl: 'rsmAndAso/rsm/rsmsView.html',
            resolve:{
              regionList :['regionResource', function(regionResource){
                return regionResource.query().$promise;
              }]
            }
          })
          .state('rsmEdit', {
            url: '/rms/edit/:rsmId',
            controller: 'RsmCtrl as vm',
            templateUrl: 'rsmAndAso/rsm/rsmEditView.html',
            resolve: {
              rsmResource: "rsmResource",
              rsm: function(rsmResource, $stateParams){
                var rsmId = $stateParams.rsmId;
                return rsmResource.get({rsmId: rsmId}).$promise;
              },
              regionList :['regionResource', function(regionResource){
                return regionResource.query().$promise;
              }]
            }
          })
          .state('aso', {
            url: '/asos',
            controller: 'AsosCtrl as vm',
            templateUrl: 'rsmAndAso/aso/asosView.html',
            resolve: {
              areaResource:'areaResource',
              initialData:['areaResource','regionResource','$q',
                function(areaResource,regionResource,$q){
                  return $q.all({
                    regionList : regionResource.query().$promise,
                    areaList : areaResource.query().$promise
                  })
                }
              ]
            //locationResource: "locationResource",
            //locationList: function(locationResource){
            //  return locationResource.query().$promise;
            //}
            }
          })
          .state('asoEdit', {
            url: '/asoEdit/:asoId',
            controller: 'AsoCtrl as vm',
            templateUrl: 'rsmAndAso/aso/asoEditView.html',
            resolve: {
              asoResource: "asoResource",
              areaResource: "areaResource",
              regionResource: "regionResource",
              aso:function(asoResource, $stateParams){
                var asoId = $stateParams.asoId;
                return asoResource.get({asoId: asoId});
              },
              initialData:['areaResource','regionResource','$q',
                function(areaResource,regionResource,$q){
                  return $q.all({
                    regionList : regionResource.query().$promise,
                    areaList : areaResource.query().$promise
                  })
                }
              ]
              //,
              //locationList: function(locationResource){
              //  return locationResource.query().$promise;
              //}
            }
          })
          .state('regions', {
            url: '/regions',
            controller: 'RegionsCtrl as vm',
            templateUrl: 'locations/regions/regionsView.html'
          })
          .state('regionEdit', {
            url: '/region/edit/:regionId',
            controller: 'RegionCtrl as vm',
            templateUrl: 'locations/regions/regionEditView.html',
            resolve: {
              regionResource: "regionResource",
              region: function(regionResource, $stateParams){
                var regionId = $stateParams.regionId;
                return regionResource.get({regionId: regionId}).$promise;
              }
            }
          })
          .state('areas', {
            url: '/areas',
            controller: 'AreasCtrl as vm',
            templateUrl: 'locations/areas/areasView.html',
            resolve:{
              regionList :['regionResource', function(regionResource){
                return regionResource.query().$promise;
              }]
            }
          })
          .state('areaEdit', {
            url: '/area/edit/:areaId',
            controller: 'AreaCtrl as vm',
            templateUrl: 'locations/areas/areaEditView.html',
            resolve: {
              areaResource: "areaResource",
              regionResource:'regionResource',
              locationResource :"locationResource",
              area: function(areaResource, $stateParams) {
                var areaId = $stateParams.areaId;
                return areaResource.get({areaId: areaId}).$promise;
              },
              initialData:['regionResource','locationResource','$q','$stateParams',
                function(regionResource,locationResource,$q,$stateParams){
                  return $q.all({
                    regionList : regionResource.query().$promise,
                    locationList : locationResource.byArea({areaId:$stateParams.areaId}).$promise
                  })
                }
              ]
            }
          })
          //.state('areas', {
          //  url: '/areas',
          //  controller: 'AreasCtrl as vm',
          //  templateUrl: 'locations/areas/areasView.html',
          //  resolve:{
          //    regionList :['regionResource', function(regionResource){
          //      return regionResource.query().$promise;
          //    }]
          //  },
          //  data: {
          //    permissions: {
          //      only: ['ITAdmin'],
          //      redirectTo: 'welcome'
          //    }
          //  }
          //})
  };
  function CheckLogin($auth, $state,Permission,$rootScope){
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      var shouldLogin = toState.name !== 'welcome' && !$auth.isAuthenticated() ;
      if(shouldLogin) {
        event.preventDefault();
        $state.go('welcome');
        return;
      }
    });
    Permission.defineRole('IT_ADMIN', function (stateParams) {
      // If the returned value is *truthy* then the user has the role, otherwise they don't
      if ($auth.getPayload().userRole == 'ITAdmin') {
        return true;
      }
      return false;
    });
    Permission.defineRole('ADMIN', function (stateParams) {
      // If the returned value is *truthy* then the user has the role, otherwise they don't
      if ($auth.getPayload().userRole == 'Admin') {
        return true;
      }
      return false;
    });
    Permission.defineRole('EVENT_ADMIN', function (stateParams) {
      // If the returned value is *truthy* then the user has the role, otherwise they don't
      if ($auth.getPayload().userRole == 'EventAdmin') {
        return true;
      }
      return false;
    });
    //if($auth.isAuthenticated()){
    //  $state.go('dashboard');
    //  console.log('DashBoard');
    //} else{
    //  console.log("Welcome");
    //  $state.go('welcome');
    //}
  };
})();
