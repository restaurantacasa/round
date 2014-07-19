'use strict';

/**
 * @ngdoc directive
 * @name roundApp.directive:disableTouchmove
 * @description
 * # disableTouchmove
 */
angular.module('round')
.directive('rDisableTouchmove', function () {
	return {
		restrict: 'A',
		link: function postLink(scope, element) {
			element.on('touchmove', function (e) {
				e.preventDefault();
				e.stopPropagation();
			});
		}
	};
});
