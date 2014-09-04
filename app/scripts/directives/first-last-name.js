'use strict';

/**
 * @ngdoc directive
 * @name roundApp.directive:firstLastName
 * @description
 * # firstLastName
 */
angular.module('round')
.directive('rFirstLastName', function (rUtil) {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function postLink(scope, element, attrs, ctrl) {
			rUtil.has(attrs, [
				'rFirstLastNameFirstNameKey',
				'rFirstLastNameLastNameKey'
			]);
			var firstNameKey = attrs.rFirstLastNameFirstNameKey;
			var lastNameKey = attrs.rFirstLastNameLastNameKey;
			ctrl.$parsers.unshift(function (val) {

			});
		}
	};
});
