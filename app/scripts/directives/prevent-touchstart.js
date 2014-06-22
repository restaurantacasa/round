'use strict';

/**
 * @ngdoc directive
 * @name roundApp.directive:rPreventTouchstart
 * @description
 * # rPreventTouchstart
 */
angular.module('roundApp')
.directive('rPreventTouchstart', function () {
	return {
		restrict: 'A',
		link: function postLink(scope, element) {
			element.on('touchstart', function (e) {
				e.preventDefault();
			});
		}
	};
});
