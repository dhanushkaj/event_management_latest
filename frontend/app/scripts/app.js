/**
 * @ngdoc overview
 * @name eventMangerApp
 * @description
 * # eventMangerApp
 *
 * Main module of the application.
 */
(function(){
  'use strict';
  angular
    .module('eventMangerApp', [
          'ui.router',
          'ui.bootstrap',
          'ngDialog',
          'angularModalService',
          'ngCookies',
          'dashboard',
          'ngAnimate',
          'anim-in-out',
          'angularMoment',
          'satellizer',
          'holcim.events',
          'holcim.locations',
          'holcim.members',
          'ngMessages',
          'toastr',
          'holcim.rsmAndAso',
          'angularUtils.directives.dirPagination',
          'ngFileUpload',
          'permission',
          'ngCsv',
          'ngSanitize'
      ]);
})();
