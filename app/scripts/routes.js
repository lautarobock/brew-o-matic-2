(function() {

    angular.module('app').config(function ($stateProvider, $urlRouterProvider) {
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/recipe");
        // Now set up the states
        $stateProvider
            //Recipes
            .state('recipe', {
                url: "/recipe",
                templateUrl: "views/recipe/recipe.html",
                controller: 'RecipeController',
                resolve: {
                    user: function($rootScope) {
                        return $rootScope.deferredUser;
                    }
                }
            })
            .state('recipe.list', {
                url: '/list',
                template: '<span>Listado de Recetas</span>'
            })
            .state('recipe.favorites', {
                url: '/favorites',
                template: '<span>Listado de Favoritas</span>'
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