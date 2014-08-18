'use strict';

/**
 * @ngdoc directive
 * @name roundApp.directive:rPreventTouchstart
 * @description
 * # rPreventTouchstart
 */
angular.module('round')
.directive('rDisableAnimation', function ($animate) {
	return {
		restrict: 'A',
		link: function postLink(scope, element) {
			$animate.enabled(false, element);
		}
	};
});
