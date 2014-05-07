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

//Config Routes


//Config Translations
app.config(function($translateProvider,localeEs) {
    
    $translateProvider.translations('es', localeEs);
    $translateProvider.preferredLanguage('es');

});

app.run(function($rootScope, evaluateAuthResult, $log, Login, $http, User, $q) {

    var deferred = $q.defer();
    $rootScope.deferredUser = deferred.promise;

    $rootScope.$on('g+login', function(event, authResult) {
        evaluateAuthResult(authResult, function(err, googleUser) {
            if ( err ) {
              $rootScope.loginError = err.message;
              $rootScope.$apply();
              $log.error("ERROR", "Login Error", err.message);

              deferred.reject(null);
            } else if ( googleUser ) {
                $rootScope.googleUser = googleUser;

                $http.defaults.headers.common['Authorization'] = googleUser.id;

                Login.get({
                        google_id:googleUser.id, 
                        name:googleUser.name, 
                        email: googleUser.email
                    }, function(user) {

                        $rootScope.user = User.get({_id: user._id}, function(user) {
                            $rootScope.loginSuccess = true;
                            deferred.resolve($rootScope.user);
                        });
                });
            } else {
                deferred.reject(null);
                $log.info("ERROR", "Silent Login Error");
            }
        });
    });
});


app.config(function($logProvider) {
    $logProvider.debugEnabled(false);
});    

//END 
})();
