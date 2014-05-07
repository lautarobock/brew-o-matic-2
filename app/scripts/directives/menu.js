(function () {
    
    var menu = angular.module('bom.menu', ['bom.util']);

    menu.directive('mainMenu', function() {
        return {
            restrict: "EA",
            replace: true,
            templateUrl: 'views/menu/menu.html',
            controller: function($scope,$state) {
                
                $scope.isCollapsed = true;

                $scope.states = ['recipe','water','equipement'];

                $scope.i18n = {
                    recipe: 'menu.main.recipes',
                    water: 'menu.main.water',
                    equipement: 'menu.main.equipement'
                };

                $scope.toogleMenu = function() {
                    $scope.isCollapsed = !$scope.isCollapsed;            
                };

                $scope.hide = function(state) {
                    return $state.current.name.indexOf(state) == 0;
                };

                $scope.currentState = function() {
                    return $state.current;
                };

            }
        };
    });
})();