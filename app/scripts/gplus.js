(function() {

	'use strict';

	var gplus = angular.module('gplus', []);

	gplus.factory('GPlus', function($log) {
        return {
            evaluateAuthResult: function(authResult, callback) {
                $log.debug('authResult',authResult);

                if ( authResult === null ) {
                    callback({
                        message: 'There is not token'
                    });
                } else if ( authResult.access_token) {
                  // Autorizado correctamente
                  // Guardo el token
                  gapi.auth.setToken(authResult);
                  
                  // Pido los datos del usuario
                  gapi.client.load('oauth2', 'v2', function() {
                    var request = gapi.client.oauth2.userinfo.get();
                    request.execute(function (googleUser){
                        $log.debug('INFO', 'googleUser', googleUser);
                        callback(null, googleUser);
                    });
                  });
                } else if ( authResult['error'] == 'immediate_failed') {
                    // silen error, not autorized but is not register
                    callback();
                } else if ( authResult['error'] ) {
                    callback({
                        message: authResult['error']
                    });
                    $log.info('There was an error: ' + authResult['error']);
                } else {
                    callback({
                        message: JSON.stringify(authResult)
                    });
                    $log.info('Error inesperado');
                }
            }
        };
    });

})();