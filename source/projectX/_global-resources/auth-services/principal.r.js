'use strict';

// principal is a service that tracks the user's identity.
// calling identity() returns a promise while it does what you need it to do
// to look up the signed-in user's identity info. for example, it could make an
// HTTP request to a rest endpoint which returns the user's name, roles, etc.
// after validating an auth token in a cookie. it will only do this identity lookup
// once, when the application first runs. you can force re-request it by calling identity(true)

define(['projectX/app'], function(app) {
    // Model to store our login privledges
    app.factory('principal', ['$q', '$window', function($q, $window) {
            var _identity,
            _authenticated = false;

            return {
                isIdentityResolved: function() {
                    return angular.isDefined(_identity);
                },
                isAuthenticated: function() {
                    return _authenticated;
                },
                isInRole: function(role) {
                    if (!_authenticated || !_identity.roles)
                        return false;

                    return _identity.roles.indexOf(role) != -1;
                },
                isInAnyRole: function(roles) {
                    if (!_authenticated || !_identity.roles)
                        return false;

                    for (var i = 0; i < roles.length; i++) {
                        if (this.isInRole(roles[i]))
                            return true;
                    }

                    return false;
                },
                authenticate: function(identity) {
                    _identity = identity;
                    _authenticated = identity !== null;

                    if (identity)
                        $window.localStorage.setItem("user.identity", angular.toJson(identity));
                    else
                        $window.localStorage.removeItem("user.identity");
                },
                identity: function(force) {
                    var deferred = $q.defer();

                    if (force === true)
                        _identity = undefined;

                    // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
                    if (angular.isDefined(_identity)) {
                        deferred.resolve(_identity);

                        return deferred.promise;
                    }

                    _identity = angular.fromJson($window.localStorage.getItem("user.identity"));
                    this.authenticate(_identity);
                    deferred.resolve(_identity);

                    return deferred.promise;
                }
            };
        }
    ]);
});
