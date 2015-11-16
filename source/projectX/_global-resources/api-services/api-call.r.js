'use strict';

define(['projectX/app'], function (app) {

  app.service('apiCall', ['CONFIG', '$q', '$http', function (CONFIG, $q, $http) {

    this.call = function (options) {

      var httpRequest;
      if (!options || !options.URL) {
        return;
      }
      var url = options.URL;
      var params = options.params;
      var data = options.data;
      var method = options.method || 'GET';
      var cache = options.cache || false;

      var headers = options.headers;

      httpRequest = $http({
        method: method,
        cache: cache,
        url: url,
        data: data,
        params: params,
        headers: headers
      });

      var defer = $q.defer();
      httpRequest.then(
        function (response) {
          var res = defer.resolve(response)
          return res;

        }, function (errorData) {

          var statusCode = errorData.status;
          var statusText = errorData.statusText;
          var statusMessage = statusCode + ' - ' + statusText;

          return $q.reject({$handled: false, originalError: statusMessage, data: errorData});
        }
      );
      return defer.promise;


      //if(method == 'GET') {
      //	$http.get(url, {cache: cache, params: params, headers : headers})
      //	.success( function(data, status, headers){
      //		deferred.resolve(data, status, headers);
      //	})
      //	.error( function(data, status, headers){
      //		deferred.reject(data, status, headers);
      //
      //	});
      //}
      //else if(method == 'POST') {
      //	$http.post(url, params,  headers : headers, {cache: cache})
      //	.success(function(data, status, headers){
      //		deferred.resolve(data, status, headers);
      //	})
      //	.error(function(data, status, headers){
      //		deferred.reject(data, status, headers);
      //	});
      //}
      //
      //return deferred.promise;
    };

  }]);

});
