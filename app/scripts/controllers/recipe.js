(function() {

    var recipe = angular.module('bom.recipe', []);

    recipe.controller("RecipeController", function($scope, Recipe, user) {

        console.log("DEFERRED USER",user);

        $scope.recipes = Recipe.query();

        $scope.reload = function() {
            $scope.recipes = Recipe.query();
        };

        $scope.black = function() {
            document.getElementById('css_darkly').disabled = false;
        }

    });


})();