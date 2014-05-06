(function() {

    var util = angular.module('bom.util.directive', []);

    util.directive('mainContent', function() {
        return {
            restrict: 'AE',
            transclude: true,
            template: '<div class=""><div class="col-md-12"><div ng-transclude></div></div></div>'
        };
    });

})();