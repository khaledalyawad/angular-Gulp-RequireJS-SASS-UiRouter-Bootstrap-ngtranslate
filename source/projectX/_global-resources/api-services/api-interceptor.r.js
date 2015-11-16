'use strict';

define(['projectX/app'], function ( app) {

  app.service('apiInterceptor', ['$rootScope', '$q', '$translate', 'toaster',		//, 'apiAcknowledge'
    function ($rootScope, $q, $translate, toaster) {														//, apiAcknowledge
      var self = this;

      //REQUEST
      this.request = function(request){
        ($rootScope.promiseCounter) ? ++$rootScope.promiseCounter : $rootScope.promiseCounter = 1;
        return request;
      };

      //RESPONSE
      this.response = function(response){
        ($rootScope.promiseCounter) ? --$rootScope.promiseCounter : $rootScope.promiseCounter = 0;
        return response;
      };

      //RESPONSE-ERROR
      this.responseError = function(response){
        ($rootScope.promiseCounter) ? --$rootScope.promiseCounter : $rootScope.promiseCounter = 0;

        if (response.status === 0) {
          toaster.pop(
            {
              type : "error",
              title : $translate.instant('TOASTR.CONNECT_ERROR'),
              body :  $translate.instant('TOASTR.CONNECT_API')
            }
          );
          return $q.reject(response);
        }
        else if (response.status === 404) {
          var messageArray = [];
          messageArray.push('URL : ' + response.config.url);
          if(response.data){
            toaster.pop(
              {
                type: "error",
                title: $translate.instant('TOASTR.404'),
                body:  $translate.instant('TOASTR.FILE_NOT_FOUND'),
                bodyOutputType : "trustedHtml"
              }
            );
          }
          return $q.reject(response);
        }
        else if (response.status === 503) {
          toaster.pop(
            {
              type: "error",
              title: $translate.instant('TOASTR.503'),
              body:  $translate.instant('TOASTR.SERVER_RESPOND')
            }
          );
          return $q.reject(response);
        }
        else if (response.status === 302) {
          toaster.pop(
            {
              type : "error",
              title : $translate.instant('TOASTR.302'),
              body :  $translate.instant('TOASTR.UNABLE_API')
            }
          );
          return $q.reject(response);
        }

        return response;
      };
    }
  ]);

});
