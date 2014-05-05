(function() {

'use strict';


var app = angular.module('app', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ui.bootstrap',
        'gplus'
    ]);

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
});

app.run(function($rootScope,evaluateAuthResult,$log) {
        
    $rootScope.$on('g+login', function(event, authResult) {
        evaluateAuthResult(authResult, function(err, googleUser) {
            if ( err ) {
              $rootScope.loginError = err.message;
              $rootScope.$apply();
              $log.error("ERROR", "Login Error", err.message);
            } else if ( googleUser ) {
              $rootScope.googleUser = googleUser;
              // Login.get({
              //         google_id:googleUser.id, 
              //         name:googleUser.name, 
              //         email: googleUser.email
              //     }, function(user) {
              //         $rootScope.user = User.get({_id: user._id}, function(user) {
              //             $rootScope.loginSuccess = true;
              //             // $rootScope.user = user;
              //             CellarService.loadMyCellar();
              //             RatingService.loadMyRatings();
              //         });
              // });
            } else {
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
