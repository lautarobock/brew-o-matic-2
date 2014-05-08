(function() {

    var recipe = angular.module('bom.recipe', []);

    recipe.controller("RecipeController", function($scope, Recipe, $state) {

        $scope.recipes = Recipe.query();

        
        $scope.tabs = [{
            name: 'recipe',
            title: 'Mias'
        },{
            name: 'recipe.collaborations',
            title: 'Colaboraciones'
        },{
            name: 'recipe.favorites',
            title: 'Favoritas'
        },{
            name: 'recipe.publics',
            title: 'Publicas'
        }];

        $scope.reload = function() {
            $scope.recipes = Recipe.query();
        };

        $scope.black = function() {
            document.getElementById('css_darkly').disabled = false;
        }

        $scope.getState = function() {
            return $state.current.name;
        };

    });

    recipe.controller("RecipeDetailController", function($scope,$stateParams) {
        $scope.params = $stateParams;
    });

})();