if (typeof define !== 'function') {
  // to be able to require file from node
  var define = require('amdefine')(module);
}

define({
  baseUrl: '',               //paths relative to `source` folder

  paths: {
    'angular'                 : 'new_project_name/_global-resources/vendor/angular/angular',
    'angular-mocks'           : 'new_project_name/_global-resources/vendor/angular-mocks/angular-mocks',
    'angular-breadcrumb'      : 'new_project_name/_global-resources/vendor/angular-breadcrumb/release/angular-breadcrumb',
    'angularjs-toaster'       : 'new_project_name/_global-resources/vendor/angularjs-toaster/toaster',
    'ngResource'              : 'new_project_name/_global-resources/vendor/angular-resource/angular-resource',
    'ui.router'               : 'new_project_name/_global-resources/vendor/angular-ui-router/release/angular-ui-router',
    'ui.bootstrap'            : 'new_project_name/_global-resources/vendor/angular-bootstrap/ui-bootstrap.min',
    'ui.bootstrap-tpls'       : 'new_project_name/_global-resources/vendor/angular-bootstrap/ui-bootstrap-tpls.min',
    'angular-animate'         : 'new_project_name/_global-resources/vendor/angular-animate/angular-animate',

    'angular-translate'       : 'new_project_name/_global-resources/vendor/angular-translate/angular-translate',
    'angular-translate-loader': 'new_project_name/_global-resources/vendor/angular-translate-loader-static-files/angular-translate-loader-static-files',
    'angular-dynamic-locale'  : 'new_project_name/_global-resources/vendor/angular-dynamic-locale/dist/tmhDynamicLocale',


    'async'                   : 'new_project_name/_global-resources/vendor/requirejs-plugins/src/async',
    'jquery'                  : 'new_project_name/_global-resources/vendor/jquery/dist/jquery',
    'jquery-ui'               : 'new_project_name/_global-resources/vendor/jquery-ui/jquery-ui.min',
    'lodash'                  : 'new_project_name/_global-resources/vendor/lodash/lodash',



    /* call Services */
    'api-call'                : 'plugin-modules/api-services/api-call.r',
    'api-interceptor'         : 'plugin-modules/api-services/api-interceptor.r',
  },

  shim: {
    'angular': {
      'deps': ['jquery'],
      'exports': 'angular'
    },
    'ngResource': ['angular'],
    'ui.router' : ['angular'],
    'angular-mocks': ['angular'],
    'angular-translate': ['angular'],
    'angular-breadcrumb': ['angular'],
    'angular-translate-loader': ['angular', 'angular-translate']
  }
});
