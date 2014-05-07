(function() {

'use strict';

//Create dummy modules
angular.module('bom.util', ['bom.util.service','bom.util.directive']);

var app = angular.module('app', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'pascalprecht.translate',
        'ui.bootstrap',
        'gplus',
        'ui.router',
        'bom.resource',
        'bom.locale',
        'bom.menu',
        'bom.util',
        'bom.recipe'
    ]);

//Config Translations
app.config(function($translateProvider,localeEs) {
    $translateProvider.translations('es', localeEs);
    $translateProvider.preferredLanguage('es');
});

app.factory("Session", function() {
    return {
        user: undefined,
        googleUser: undefined
    };
});

app.run(function($rootScope, GPlus, $log, Login, $http, User, $q, Session) {

    var deferred = $q.defer();
    
    Session.user = deferred.promise;

    $rootScope.loginSuccess = false;

    $rootScope.$on('g+login', function(event, authResult) {
        GPlus.evaluateAuthResult(authResult, function(err, googleUser) {
            if ( err ) {
              $rootScope.loginError = err.message;
              // $rootScope.$apply();
              $log.error("ERROR", "Login Error", err.message);

              // deferred.reject(null);
            } else if ( googleUser ) {
                Session.googleUser = googleUser;

                $http.defaults.headers.common['Authorization'] = googleUser.id;

                $log.info("Google User", googleUser);

                Login.get({
                        google_id:googleUser.id, 
                        name:googleUser.name, 
                        email: googleUser.email
                    }, function(user) {

                        User.get({_id: user._id}, function(user) {
                            $rootScope.loginSuccess = true;
                            deferred.resolve(user);
                        });
                });
            } else {
                // deferred.reject(null);
                $log.info("ERROR", "Silent Login Error");
            }
        });
    });

    // Session.user.then(function(user) {
    //     $rootScope.loggedUser = user;
    // });
});


app.config(function($logProvider) {
    $logProvider.debugEnabled(false);
});    

//END 
})();
