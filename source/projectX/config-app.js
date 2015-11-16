/**
 * Defines states, constants for application
 */
define([
  './app',
  'api-call',
  'api-interceptor',
  'angular-breadcrumb'
], function (app) {
  'use strict';
  app.constant('CONFIG', 'your-app-config-here');
  app.config(
    [ '$stateProvider', '$controllerProvider', '$urlRouterProvider',
      '$httpProvider', '$provide', '$compileProvider', '$filterProvider', '$breadcrumbProvider',
      '$translateProvider', 'tmhDynamicLocaleProvider',
      function (stateProvider, controllerProvider, urlRouterProvider,
                httpProvider, provide, compileProvider, filterProvider, breadcrumbProvider,
                translateProvider, tmhDynamicLocaleProvider) {
        //LAZY LOAD
        app.$stateProvider = stateProvider;
        app.$controllerProvider = controllerProvider;
        app.$provide = provide;
        app.$compileProvider = compileProvider;
        app.$filterProvider = filterProvider;


        //BREADCRUMBS
      //  breadcrumbProvider.setOptions({ prefixStateName: CONFIG.breadcrumbs.prefix, templateUrl: CONFIG.breadcrumbs.template });

        //HTTP INTERCEPTOR
        httpProvider.defaults.headers.patch = {'Content-Type': 'application/json;charset=utf-8'};
        httpProvider.interceptors.push('apiInterceptor');

        //LOCALIZATIONS/TRANSLATIONS
        // translateProvider
        //   .useStaticFilesLoader({ prefix: CONFIG.resources.i18n.prefix, suffix: CONFIG.resources.i18n.suffix })
        //   .preferredLanguage(CONFIG.resources.i18n.preferred);
        // tmhDynamicLocaleProvider.localeLocationPattern(CONFIG.resources.locale.pattern);


        var allStates = [
          // Public pages
          {
            name:'main-wrapper',
            abstract: true,
            templateUrl: '_main-wrapper/main-wrapper.html'//,
            // resolve: {
            //   loadDependencies: ["$q", function($q) {
            //     var deferred = $q.defer();
            //     require(['_main-wrapper/main-wrapper-Ctrl'], function() { deferred.resolve(); });
            //     return deferred.promise;
            //   }],
            //   authorize: ['authorization',
            //     function (authorization) {
            //       return authorization.authorize();
            //     }
            //   ]
            //}
          },
          {
            name:'sample-state',
            parent: 'main-wrapper',
            url: '/sample-state',
            templateUrl: 'sample-state/view.html'//,
            // resolve: {
            //   loadDependencies: ["$q", function($q) {
            //     var deferred = $q.defer();
            //     require(['login/login-Ctrl'], function() { deferred.resolve(); });
            //     return deferred.promise;
            //   }]
            // }
          },
          {
            name:'sample-state0',
            parent: 'main-wrapper',
            url: '/sample-state0',
            templateUrl: 'sample-state0/view.html'//,
            // resolve: {
            //   loadDependencies: ["$q", function($q) {
            //     var deferred = $q.defer();
            //     require(['login/login-Ctrl'], function() { deferred.resolve(); });
            //     return deferred.promise;
            //   }]
            // }
          }
        ]


        //UI ROUTES
        for (var i = 0; i < allStates.length; i++) {
          app.$stateProvider.state(allStates[i]);
        }

        urlRouterProvider.otherwise('/sample-state');

      }
    ]
  );

  app.run([
  	'$rootScope', '$state', '$stateParams', 'tmhDynamicLocale',
  	function ($rootScope, $state, $stateParams, tmhDynamicLocale) {

    //STATE CHANGE
    $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
      $rootScope.toState = toState;
      $rootScope.toStateParams = toStateParams;

      //AUTHORIZATION



    });
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    //LOCALE
    //translations change by angular-translate
    $rootScope.$on('$translateChangeSuccess', function(event, data) {
//      document.getElementsByTagName('html')[0].setAttribute('lang', data.language);
//      tmhDynamicLocale.set(data.language.toLowerCase().replace(/_/g, '-'));
    });
    //tmhDynamicLocale.set(CONFIG.resources.locale.preferred);

    }
  ]);

});
