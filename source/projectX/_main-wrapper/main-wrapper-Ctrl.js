'use strict';

define(['projectX/app'
], function(app) {
  return app.$controllerProvider.register('main-wrapper-Ctrl', [
    '$scope',
    function($scope) {
      console.log('This is comming from the main wrapper controller');
    }
  ]);
});
