'use strict';

angular.module('round')
.config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('baseState', {
			url: '/',
			templateUrl: 'views/main.html'
		});
});
