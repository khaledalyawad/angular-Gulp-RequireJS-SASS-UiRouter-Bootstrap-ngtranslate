'use strict';

define(['new_project_name/app'
], function(app, _) {
  return app.$controllerProvider.register('controller', [
    '$scope',
    '$translate',
    '$state',
    function($scope, $translate,$state) {
      $scope.state1 = "you are in state 1";
      $scope.goToState = function(){
        $state.go("state2");
      };
    }
  ]);
});
