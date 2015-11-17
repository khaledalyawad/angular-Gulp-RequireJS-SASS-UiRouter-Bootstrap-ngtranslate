'use strict';

if (typeof define !== 'function') {
  // to be able to require file from node
  var define = require('amdefine')(module);
}

define({
  baseUrl: '',               //paths relative to `source` folder

  paths: {
    'angular'                 : 'projectX/_global-resources/vendor/angular/angular',
    'angular-mocks'           : 'projectX/_global-resources/vendor/angular-mocks/angular-mocks',
    'angular-breadcrumb'      : 'projectX/_global-resources/vendor/angular-breadcrumb/release/angular-breadcrumb',
    'angularjs-toaster'       : 'projectX/_global-resources/vendor/angularjs-toaster/toaster',
    'ui.router'               : 'projectX/_global-resources/vendor/angular-ui-router/release/angular-ui-router',
    'ui.bootstrap'            : 'projectX/_global-resources/vendor/angular-bootstrap/ui-bootstrap.min',
    'ui.bootstrap-tpls'       : 'projectX/_global-resources/vendor/angular-bootstrap/ui-bootstrap-tpls.min',
    'angular-animate'         : 'projectX/_global-resources/vendor/angular-animate/angular-animate',

    'angular-translate'       : 'projectX/_global-resources/vendor/angular-translate/angular-translate',
    'angular-translate-loader': 'projectX/_global-resources/vendor/angular-translate-loader-static-files/angular-translate-loader-static-files',
    'angular-dynamic-locale'  : 'projectX/_global-resources/vendor/angular-dynamic-locale/dist/tmhDynamicLocale',


    'async'                   : 'projectX/_global-resources/vendor/requirejs-plugins/src/async',
    'jquery'                  : 'projectX/_global-resources/vendor/jquery/dist/jquery',
    'underscore'              : 'projectX/_global-resources/vendor/underscore/underscore',



    /* call Services */
    'api-call'                : 'projectX/_global-resources/api-services/api-call.r',
    'api-interceptor'         : 'projectX/_global-resources/api-services/api-interceptor.r',
    'authorization'           : 'projectX/_global-resources/auth-services/authorization.r',
    'principal-service'       : 'projectX/_global-resources/auth-services/principal.r'
  },

  shim: {
    'angular': {
      'deps': ['jquery'],
      'exports': 'angular'
    },
    'ui.router' : ['angular'],
    'angular-mocks': ['angular'],
    'angular-translate': ['angular'],
    'angular-breadcrumb': ['angular'],
    'angular-translate-loader': ['angular', 'angular-translate']
  }
});
