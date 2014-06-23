'use strict';

/**
 * @ngdoc directive
 * @name roundApp.directive:rPreventTouchstart
 * @description
 * # rPreventTouchstart
 */
angular.module('round')
.directive('rPreventTouchstart', function () {
	return {
		restrict: 'A',
		link: function postLink(scope, element) {
			element.on('touchstart', function (e) {
				if (e.originalEvent.srcElement === element) {
					e.preventDefault();
				}
			});
		}
	};
});
