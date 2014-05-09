(function() {

    /**
     *   Para los routes
     *   https://medium.com/opinionated-angularjs/a2fcbf874a1c
     */

    angular.module('app').config(function ($stateProvider, $urlRouterProvider) {
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/home");
        // Now set up the states
        $stateProvider
            .state('home', {
                url: '/home',
                template: 'No estas logueado!!'
            })

            //Recipes Root
            .state('recipe', {
                abstract: true,
                url: '/recipe',
                templateUrl: 'views/recipe/recipe.html'
            })
                //Recipe Detail
                .state('recipe.detail', {
                    url: '/detail/:_id',
                    controller: 'RecipeDetailController',
                    templateUrl: 'views/recipe/recipe-detail.html'
                })
                //Recipe Lists
                .state('recipe.list', {
                    url: "/list",
                    templateUrl: "views/recipe/recipe-list.html",
                    controller: 'RecipeController'
                })
                  .state('recipe.list.collaborations', {
                        url: '/collaborations',
                        template: '<span>Listado de Collaborations</span>'
                    })
                    .state('recipe.list.publics', {
                        url: '/publics',
                        template: '<span>Listado de Publicas</span>'
                    })
                    .state('recipe.list.favorites', {
                        url: '/favorites',
                        template: '<strong>Recetas Favoritas</strong>'
                    })

            //Water
            .state('water', {
                url: "/water",
                templateUrl: "views/water/water.html"
            })
            .state('equipement', {
                url: "/equipement",
                templateUrl: "views/equipement/equipement.html"
            })
    });

})();