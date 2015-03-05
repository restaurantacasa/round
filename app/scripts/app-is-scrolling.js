'use strict';

angular
.module('round').run(function ($window) {

	var windowEl = angular.element($window);
	var htmlEl = angular.element('html');
	var YES_SCROLL_CLASS = 'rIsScrolling';
	var NO_SCROLL_CLASS = 'rNotScrolling';
	var DELAY = 400;


	function setNoScroll () {
		htmlEl.addClass(NO_SCROLL_CLASS);
		htmlEl.removeClass(YES_SCROLL_CLASS);
	}
	function setYesScroll () {
		htmlEl.addClass(YES_SCROLL_CLASS);
		htmlEl.removeClass(NO_SCROLL_CLASS);
	}


	var setNoScrollDebounced = _.debounce(setNoScroll, DELAY);

	setNoScroll();

	windowEl.on('scroll', function () {
		setYesScroll();
		setNoScrollDebounced();
	});




});
