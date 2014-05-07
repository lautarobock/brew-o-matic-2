(function() {

	'use strict';

	var resource = angular.module('bom.resource', ['ngResource']);

	var path = 'api/'
	resource.factory('Login', function($resource) {
		return $resource('/api/login/by_google/:google_id', {}, {});
	});


    var services = ['Recipe','User'];
    angular.forEach(services,function(s) {
        resource.factory(s,function($resource) {
            return $resource( "/" + path + s + '/:_id',{_id:"@_id"}, {});
        });
    });




})();