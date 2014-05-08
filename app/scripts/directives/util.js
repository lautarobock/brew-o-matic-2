(function() {

    var util = angular.module('bom.util.directive', []);

    util.directive('mainContent', function() {
        return {
            restrict: 'AE',
            transclude: true,
            template: '<div class=""><div class="col-md-12"><div ng-transclude></div></div></div>'
        };
    });

    util.directive('secure', function(Session) {
        return function(scope,element) {
            element.addClass('hidden');
            Session.onChangeUser(function(user) {
                if ( user ) {
                    element.removeClass('hidden');
                } else {
                    element.addClass('hidden');                    
                }
            });
        };
    });

    util.directive('logIn', function() {
        return {
            restrict: 'AE',
            replace: true,
            scope: {},
            template: '<a not-logged href="javascript:googleLogIn()">{{caption}}</a>',
            link: function(scope, element) {
                scope.caption = element.attr("caption") || "Acceder";
            }
        };
    });

    util.directive('signIn', function() {
        return {
            restrict: 'AE',
            replace: true,
            scope: {},
            template: '<a not-logged href="javascript:googleSignIn()">{{caption}}</a>',
            link: function(scope, element) {
                scope.caption = element.attr("caption") || "Registrarse";   
            }
        };
    });

    util.directive('notLogged', function(Session) {
        return function(scope,element) {
            Session.onChangeUser(function(user) {
                if ( user ) {
                    element.addClass('hidden');
                } else {
                    element.removeClass('hidden');
                }
            });
        };
    });

})();