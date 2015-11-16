/**
 * Defines states, constants for application
 */
define([
  './app'
], function (app) {
  'use strict';
  app.config(
    [ '$stateProvider',
    '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {
        var allStates = [
          // Public pages
          {
            name:'main-wrapper',
            abstract: true,
            templateUrl: '_main-wrapper/main-wrapper.html',
            resolve: {
              loadDependencies: ["$q", function($q) {
                var deferred = $q.defer();
                require(['_main-wrapper/main-wrapper-Ctrl'], function() { deferred.resolve(); });
                return deferred.promise;
              }]
            //   authorize: ['authorization',
            //     function (authorization) {
            //       return authorization.authorize();
            //     }
            //   ]
            },
            controller : 'main-wrapper-Ctrl'
          },
          {
            name:'sample-state-1',
            parent: 'main-wrapper',
            url: '/sample-state-1',
            templateUrl: 'sample-state-1/view.html',
            ncyBreadcrumb: {
              label: "breadcrumb 1"
            },
            resolve: {
              loadDependencies: ["$q", function($q) {
                var deferred = $q.defer();
                require(['sample-state-1/controller'], function() { deferred.resolve(); });
                return deferred.promise;
              }]
            },
            controller : 'sample-state-1-Ctrl'
          },
          {
            name:'sample-state-2',
            parent: 'main-wrapper',
            url: '/sample-state-2',
            templateUrl: 'sample-state-2/view.html',
            ncyBreadcrumb: {
              label: "breadcrumb 2"
            },
            resolve: {
              loadDependencies: ["$q", function($q) {
                var deferred = $q.defer();
                require(['sample-state-2/controller'], function() { deferred.resolve(); });
                return deferred.promise;
              }]
            },
            controller : 'sample-state-2-Ctrl'

          }
        ]

        //UI ROUTES
        for (var i = 0; i < allStates.length; i++) {
          app.$stateProvider.state(allStates[i]);
        }

        $urlRouterProvider.otherwise('/sample-state-1');
      }
    ]
  )
})
