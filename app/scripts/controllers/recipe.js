(function() {

    var recipe = angular.module('bom.recipe', []);

    recipe.controller('RecipeController', function($scope) {
        $scope.myData = [{name: "Moroni", age: 50},
                     {name: "Tiancum", age: 43},
                     {name: "Jacob", age: 27},
                     {name: "Nephi", age: 29},
                     {name: "Enos", age: 34}];
                     
        $scope.gridOptions = { data: 'myData' };
    });

    recipe.controller("RecipeListController", function($scope, Recipe, $state) {

        $scope.recipes = Recipe.query();

        
        $scope.tabs = [{
            name: 'recipe.list',
            title: 'Mias',
            class: 'glyphicon-home'
        },{
            name: 'recipe.list.collaborations',
            title: 'Colaboraciones',
            class: 'glyphicon-user'
        },{
            name: 'recipe.list.favorites',
            title: 'Favoritas',
            class: 'glyphicon-star'
        },{
            name: 'recipe.list.publics',
            title: 'Publicas',
            class: 'glyphicon-share'
        }];

        $scope.reload = function() {
            $scope.recipes = Recipe.query();
        };

        $scope.black = function() {
            document.getElementById('css_darkly').disabled = false;
        }

        $scope.isTabActive = function(tab) {
            return $state.current.name == tab.name;
        };

        $scope.select = function(tab) {
            $state.go(tab.name);
        };

    });

    recipe.controller("RecipeDetailController", function($scope,$stateParams) {
        $scope.params = $stateParams;
    });

})();