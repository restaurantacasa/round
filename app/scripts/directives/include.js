'use strict';

angular.module('round')
.directive('rInclude', function ($rootScope) {
	return {
		restrict: 'A',
		replace: true,
		templateUrl: function (element, attrs) {
			var prefix = $rootScope.$eval(attrs.rIncludePrefix);
			return prefix ? prefix + attrs.rInclude : attrs.rInclude;
		}
	};
});

