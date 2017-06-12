/**
 * Created by udeshikaperera on 18/06/2015.
 */
(function(){
  "use strict";
  angular.module('holcim.events').controller('EventCalendarCtrl',
    ['$scope','eventResource','$state','asoResource','uiCalendarConfig', EventCalendarCtrl]);

  function EventCalendarCtrl($scope, eventResource,$state,asoResource,uiCalendarConfig){
    $scope.eventList = [];
    $scope.asoCode = null;
    eventResource.query(function(data){
      var events = [];
      angular.forEach(data, function(value) {
        this.push(value);
      }, events)
      $scope.eventList.push(events);
    }).$promise;

    asoResource.query(function(data){
      $scope.asosList = data;
    }).$promise;


    $scope.alertOnEventClick = function(date, jsEvent, view){
      $state.go('eventDetails.info',{eventId:date.id});
    };

    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
      if(uiCalendarConfig.calendars[calendar]){
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }
    };

    $scope.getEventsForASO = function(){
      eventResource.byASO({asoId:$scope.asoCode}).
      $promise.then(function(result){
        var events = [];
        events.length = 0;
        angular.forEach(result, function(value) {
          this.push(value);
        }, events);
        $scope.eventList.length = 0;
        $scope.eventList.push(events);
      });
    };


    $scope.uiConfig = {
      calendar:{
        height: 550,
        editable: true,
        header:{
          left: 'month basicWeek basicDay agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick
        //dayClick: $scope.alertEventOnClick,
        //eventDrop: $scope.alertOnDrop,
        //eventResize: $scope.alertOnResize
      }
    };

  }
})();
