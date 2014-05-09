(function () {
    
    var menu = angular.module('bom.menu', ['bom.util']);

    menu.directive('mainMenu', function() {
        return {
            restrict: "EA",
            replace: true,
            templateUrl: 'views/menu/menu.html',
            controller: function($scope,$state, Session) {

                $scope.loggedUser = Session.user;
                Session.onChangeUser(function(user) {
                    $scope.loggedUser = Session.user;
                });

                $scope.isCollapsed = true;

                $scope.states = [{
                    name: 'home'
                },{
                    name: 'recipe'
                },{
                    name: 'water'
                },{
                    name: 'equipement'
                }];

                $scope.i18n = {
                    home: 'menu.main.home',
                    'recipe.list': 'menu.main.recipes',
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
                    if ( $state.current.name.indexOf(".") != -1 ) {
                        return $state.current.name.substr(0,$state.current.name.indexOf("."));    
                    } else {
                        return $state.current.name;
                    }
                };

            }
        };
    });
})();