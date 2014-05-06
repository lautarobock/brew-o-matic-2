(function() {

    var util = angular.module('bom.util.service', []);

    util.factory("Responsive", function($window) {
        return {
            isXs: function() {
                return $window.document.width < 768;
            },
            isSm: function() {
                return $window.document.width >= 768 && $window.document.width < 992;
            },
            isMd: function() {
                return $window.document.width >= 992 && $window.document.width < 1200;
            },
            isLg: function() {
                return $window.document.width >= 1200;
            }
        };
    });

})();