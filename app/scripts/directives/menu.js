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

                $scope.toogleMenu = function() {
                    $scope.isCollapsed = !$scope.isCollapsed;            
                };

                $scope.hide = function(state) {
                    // console.log("STATE",$state);
                    return $state.current.name.indexOf(state) == 0;
                };

                $scope.getText = function(state) {
                    if ( !$state.get(state) ) return;
                    return $state.get(state).data.i18n;
                };

                $scope.currentState = function() {
                    return $state.current;
                };

            }
        };
    });
})();