'use strict';

angular
.module('round').run(function ($window) {

	var windowEl = angular.element($window);
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


	var setNoScrollDebounced = _.debounce(setNoScroll, DELAY);

	setNoScroll(windowEl);

	windowEl.on('scroll', function () {
		setYesScroll(windowEl);
		setNoScrollDebounced(windowEl);
	});




});
