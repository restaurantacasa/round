'use strict';

/**
 * @ngdoc directive
 * @name round.directive:isScrolling
 * @description
 * # isScrolling
 */
angular.module('round')
.directive('rIsScrolling', function () {

	var YES_SCROLL_CLASS = 'rIsScrolling';
	var NO_SCROLL_CLASS = 'rNotScrolling';
	var DELAY = 400;


	function setNoScroll (element) {
		element.addClass(NO_SCROLL_CLASS);
		element.removeClass(YES_SCROLL_CLASS);
	}
	function setYesScroll (element) {
		element.addClass(YES_SCROLL_CLASS);
		element.removeClass(NO_SCROLL_CLASS);
	}


	return {
		restrict: 'A',
		link: function postLink(scope, element) {
			var setNoScrollDebounced = _.debounce(setNoScroll, DELAY);

			setNoScroll(element);

			element.on('scroll', function () {
				setYesScroll(element);
				setNoScrollDebounced(element);
			});
		}
	};

});
