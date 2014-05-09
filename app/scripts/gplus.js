(function() {

	'use strict';

	var gplus = angular.module('gplus', []);

	gplus.factory('GPlus', function($log, $q) {
        return {
            evaluateAuthResult: function(authResult) {
                var deferred = $q.defer();

                $log.debug('authResult',authResult);

                if ( authResult === null ) {
                    deferred.reject({
                        message: 'There is not token'
                    });
                    // callback({
                    //     message: 'There is not token'
                    // });
                } else if ( authResult.access_token) {
                  // Autorizado correctamente
                  // Guardo el token
                  gapi.auth.setToken(authResult);
                  
                  // Pido los datos del usuario
                  gapi.client.load('oauth2', 'v2', function() {
                    var request = gapi.client.oauth2.userinfo.get();
                    request.execute(function (googleUser){
                        $log.debug('INFO', 'googleUser', googleUser);
                        deferred.resolve(googleUser);
                        // callback(null, googleUser);
                    });
                  });
                } else if ( authResult['error'] == 'immediate_failed') {
                    // silen error, not autorized but is not register
                    // callback();
                    deferred.reject();
                } else if ( authResult['error'] ) {
                    // callback({
                    //     message: authResult['error']
                    // });
                    deferred.reject({
                        message: authResult['error']
                    });
                    $log.info('There was an error: ' + authResult['error']);
                } else {
                    // callback({
                    //     message: JSON.stringify(authResult)
                    // });
                    deferred.reject({
                        message: JSON.stringify(authResult)
                    });
                    $log.info('Error inesperado');
                }

                return deferred.promise;
            }
        };
    });

})();