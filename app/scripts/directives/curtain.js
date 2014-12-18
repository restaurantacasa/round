'use strict';

/**
 * @ngdoc directive
 * @name round.directive:curtain
 * @description
 * # curtain
 */
angular.module('round')
.directive('rCurtain', function ($timeout) {

	var DEFAULT_DELAY = 200;

	return {
		priority: 700, //before ngIf
		restrict: 'A',
		link: function postLink(scope, element, attrs) {

			var delay = parseInt(attrs.roundCurtain, 10) || DEFAULT_DELAY;

			scope.loaded = false;
			$timeout(function () {
				scope.loaded = true;
			}, delay);

		}
	};
});

