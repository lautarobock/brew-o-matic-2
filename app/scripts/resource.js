(function() {

	'use strict';

	var resource = angular.module('bom.resource', ['ngResource']);

	// var path = 'api/'

	resource.factory('Login', function($resource) {
		return $resource('/api/login/by_google/:google_id', {}, {});
	});


})();