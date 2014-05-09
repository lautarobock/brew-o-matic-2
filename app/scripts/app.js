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
        googleUser: undefined,
        changeNotification: [],
        onChangeUser: function(fn) {
            this.changeNotification.push(fn);
        },
        removeListener: function(fn) {
            var idx = this.changeNotification.indexOf(fn);
            if ( idx != -1 ) {
                this.changeNotification.splice(idx,1);
            }
        },
        setUser: function(user) {
            this.user = user;
            angular.forEach(this.changeNotification, function(fs) {
                fs(user);
            });
        }
    };
});

app.run(function($rootScope, GPlus, $log, Login, $http, User, Session, $state) {

    $rootScope.loginSuccess = false;

    $rootScope.$on('g+login', function(event, authResult) {
        GPlus.evaluateAuthResult(authResult).then(function(googleUser) {
            $rootScope.loginError = undefined;

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
                        // deferred.resolve(user);
                        Session.setUser(user);
                        // $state.go('recipe');
                    });
            });
        },function(err) {
            if ( err ) {
                $rootScope.loginError = err.message;
                $log.error("ERROR", "Login Error", err.message);
                $rootScope.loginSuccess = true;
            } else {
                $log.info("ERROR", "Silent Login Error");
                $rootScope.loginSuccess = true;
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
