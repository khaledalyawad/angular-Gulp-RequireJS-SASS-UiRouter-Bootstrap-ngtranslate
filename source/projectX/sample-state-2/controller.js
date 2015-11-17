'use strict';

define(['projectX/app'
], function(app) {
  return app.$controllerProvider.register('sample-state-2-Ctrl', [
    '$scope',
    '$translate',
    '$state',
    'apiCall',
    function($scope, $translate,$state,apiCall) {
      $scope.state1 = "you are in state 2";
      $scope.goToState = function(){
        $state.go("sample-state-1");
      };
      var options = {"URL":"http://104.236.101.136:80/rest/db/user_posts"}
      apiCall.call(options).then(
        function(data){
          console.log(data);
        },
        function(data){
          console.log(data);
        }
      )
    }
  ]);
});
