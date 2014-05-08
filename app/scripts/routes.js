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
            //Recipe Detail
            .state('recipe-detail', {
                url: '/recipe/detail/:_id',
                controller: 'RecipeDetailController',
                templateUrl: 'views/recipe/recipe-detail.html'
            })
            //Recipe Lists
            .state('recipe', {
                url: "/recipe",
                templateUrl: "views/recipe/recipe.html",
                controller: 'RecipeController'
            })  .state('recipe.collaborations', {
                    url: '/collaborations',
                    template: '<span>Listado de Collaborations</span>'
                })
                .state('recipe.publics', {
                    url: '/publics',
                    template: '<span>Listado de Publicas</span>'
                })
                .state('recipe.favorites', {
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