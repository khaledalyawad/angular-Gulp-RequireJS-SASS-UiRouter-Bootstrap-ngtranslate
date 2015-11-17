define([
  './app',
  'api-call',
  'api-interceptor',
  'angular-breadcrumb',
  'authorization',
  'principal-service'
], function (app) {

  'use strict';

  app
  .constant('CONFIG', {
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
  })

  .config(
    [ '$stateProvider', '$controllerProvider',
      '$httpProvider', '$provide', '$compileProvider', '$filterProvider', '$breadcrumbProvider',
      '$translateProvider', 'tmhDynamicLocaleProvider', 'CONFIG',
      function (stateProvider, controllerProvider,
                httpProvider, provide, compileProvider, filterProvider, breadcrumbProvider,
                translateProvider, tmhDynamicLocaleProvider, CONFIG) {
        //LAZY LOAD
        app.$stateProvider = stateProvider;
        app.$controllerProvider = controllerProvider;
        app.$provide = provide;
        app.$compileProvider = compileProvider;
        app.$filterProvider = filterProvider;


        //BREADCRUMBS
        //breadcrumbProvider.setOptions({ name: CONFIG.breadcrumbs.prefix});

        //HTTP INTERCEPTOR
        httpProvider.defaults.headers.patch = {'Content-Type': 'application/json;charset=utf-8'};
        httpProvider.interceptors.push('apiInterceptor');

        //LOCALIZATIONS/TRANSLATIONS
        translateProvider
          .useStaticFilesLoader({ prefix: CONFIG.resources.i18n.prefix, suffix: CONFIG.resources.i18n.suffix })
          .preferredLanguage(CONFIG.resources.i18n.preferred);
        tmhDynamicLocaleProvider
          .localeLocationPattern(CONFIG.resources.locale.pattern);

      }
    ]
  );

});
