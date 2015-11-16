'use strict';

define(['projectX/app'
], function(app) {
  return app.$controllerProvider.register('sample-state-1-Ctrl', [
    '$scope',
    '$translate',
    '$state',
    function($scope, $translate,$state) {
      $scope.state1 = "you are in state 1";
      $scope.goToState = function(){
        $state.go("sample-state-2");
      };
    }
  ]);
});
