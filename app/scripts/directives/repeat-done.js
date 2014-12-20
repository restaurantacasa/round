'use strict';

/**
 * @ngdoc directive
 * @name round.directive:repeatDone
 * @description
 * # repeatDone
 */
angular.module('round')
.directive('rRepeatDone', function () {
	return {
		restrict: 'A',
		link: function postLink(scope, element, attrs) {
			if (scope.$last) {
				scope.$evalAsync(attrs.rRepeatDone);
			}
		}
	};
});
