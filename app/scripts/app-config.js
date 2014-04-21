'use strict';

angular.module('round')
.config(function (RoundSett) {
	RoundSett.analytics.GoogleAnalytics.accounts = [
		{
			name: 'RoundAnalytics',
			id: 'UA-36888310-3'
		}
	];
});
