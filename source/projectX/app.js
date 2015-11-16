/**
 * loads sub modules and wraps them up into the main module.
 * This should be used for top-level module definitions only.
 */
define([
        'angular',
        'ui.router',
        'angularjs-toaster',
        'angular-breadcrumb',
        'ui.bootstrap',
        'ui.bootstrap-tpls',
        'angular-animate',
        'angular-translate',
        'angular-translate-loader',
        'angular-dynamic-locale'
], function (angular) {
  'use strict';

  return angular.module('app', [
      'ui.router',
      'ui.bootstrap',
      'toaster',
      'ncy-angular-breadcrumb',
      'pascalprecht.translate',
      'tmh.dynamicLocale'])
        .run([
        	'$rootScope', '$state', '$stateParams', 'tmhDynamicLocale','CONFIG',
        	function ($rootScope, $state, $stateParams, tmhDynamicLocale,CONFIG) {

            $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
              $rootScope.toState = toState;
              $rootScope.toStateParams = toStateParams;
              //Authorization could go here
            });
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            //Default language
            tmhDynamicLocale.set(CONFIG.resources.locale.preferred);

          }
        ])

});
