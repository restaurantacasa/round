'use strict';

angular.module('roundApp')
.config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('baseState', {
			url: '/',
			templateUrl: 'views/main.html'
		});
});
