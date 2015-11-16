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
  app.constant('CONFIG', {
    breadcrumbs: {
      template: '/_global-resources/breadcrumbs/breadcrumbs.html',
      prefix: 'root'
    },
    resources: {
      i18n: {
        prefix: '/_global-resources/i18n/locale-',
        suffix: '.json',
        preferred: 'en'
      },
      locale: {
      	pattern: '/vendor/angular-i18n/angular-locale_{{locale}}.js',
      	preferred: 'en-us'
      }
    }
  });
  app.config(
    [ '$stateProvider', '$controllerProvider', '$urlRouterProvider',
      '$httpProvider', '$provide', '$compileProvider', '$filterProvider', '$breadcrumbProvider',
      '$translateProvider', 'tmhDynamicLocaleProvider', 'CONFIG',
      function (stateProvider, controllerProvider, urlRouterProvider,
                httpProvider, provide, compileProvider, filterProvider, breadcrumbProvider,
                translateProvider, tmhDynamicLocaleProvider, CONFIG) {
        //LAZY LOAD
        app.$stateProvider = stateProvider;
        app.$controllerProvider = controllerProvider;
        app.$provide = provide;
        app.$compileProvider = compileProvider;
        app.$filterProvider = filterProvider;


        //BREADCRUMBS
        // breadcrumbProvider.setOptions({ prefixStateName: CONFIG.breadcrumbs.prefix, templateUrl: CONFIG.breadcrumbs.template });

        //HTTP INTERCEPTOR
        httpProvider.defaults.headers.patch = {'Content-Type': 'application/json;charset=utf-8'};
        httpProvider.interceptors.push('apiInterceptor');

        //LOCALIZATIONS/TRANSLATIONS
        translateProvider
          .useStaticFilesLoader({ prefix: CONFIG.resources.i18n.prefix, suffix: CONFIG.resources.i18n.suffix })
          .preferredLanguage(CONFIG.resources.i18n.preferred);
        tmhDynamicLocaleProvider.localeLocationPattern(CONFIG.resources.locale.pattern);


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
            }
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
              label: "breadcrumb 1"
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

        urlRouterProvider.otherwise('/sample-state-1');

      }
    ]
  );

  app.run([
  	'$rootScope', '$state', '$stateParams', 'tmhDynamicLocale','CONFIG',
  	function ($rootScope, $state, $stateParams, tmhDynamicLocale,CONFIG) {

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
    tmhDynamicLocale.set(CONFIG.resources.locale.preferred);

    }
  ]);

});
