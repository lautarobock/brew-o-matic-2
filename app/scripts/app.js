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
        'bom.util'
    ]);

//Config Routes
app.config(function ($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/recipe");
  //
  // Now set up the states
  $stateProvider
    .state('recipe', {
      url: "/recipe",
      data: {
        i18n: 'menu.main.recipes'
      },
      templateUrl: "views/recipe/recipe.html"
    })
    .state('recipe.list', {
        url: '/list',
        template: '<span>Listado de Recetas</span>'
    })
    .state('recipe.favorites', {
        url: '/favorites',
        template: '<span>Listado de Favoritas</span>'
    })
    // .state('state1.list', {
    //   url: "/list",
    //   templateUrl: "views/state1.list.html",
    //   controller: function($scope) {
    //     $scope.items = ["A", "List", "Of", "Items"];
    //   }
    // })
    .state('water', {
      url: "/water",
      data: {
        i18n: 'menu.main.water'
      },
      templateUrl: "views/water/water.html"
    })
    .state('equipement', {
      url: "/equipement",
      data: {
        i18n: 'menu.main.equipement'
      },
      templateUrl: "views/equipement/equipement.html"
    })
    // .state('state2.list', {
    //   url: "/list",
    //     templateUrl: "views/state2.list.html",
    //     controller: function($scope) {
    //       $scope.things = ["A", "Set", "Of", "Things"];
    //     }
    //   })

});

//Config Translations
app.config(function($translateProvider,localeEs) {
    
    $translateProvider.translations('es', localeEs);
    $translateProvider.preferredLanguage('es');

});

app.run(function($rootScope, evaluateAuthResult, $log, Login, $state) {
    
    $rootScope.goState = function(state) {
        $state.go(state);
    };

    $rootScope.$on('g+login', function(event, authResult) {
        evaluateAuthResult(authResult, function(err, googleUser) {
            if ( err ) {
              $rootScope.loginError = err.message;
              $rootScope.$apply();
              $log.error("ERROR", "Login Error", err.message);
            } else if ( googleUser ) {
              $rootScope.googleUser = googleUser;
              Login.get({
                      google_id:googleUser.id, 
                      name:googleUser.name, 
                      email: googleUser.email
                  }, function(user) {
                      $rootScope.user = User.get({_id: user._id}, function(user) {
                          $rootScope.loginSuccess = true;
                          // $rootScope.user = user;
                          CellarService.loadMyCellar();
                          RatingService.loadMyRatings();
                      });
              });
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
