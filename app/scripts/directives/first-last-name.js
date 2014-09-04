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
				var firstNameVal = val.split(' ')[0] || '';
				var lastNameVal = val.split(' ')[1] || '';
				ctrl.$modelValue[firstNameKey] = firstNameVal;
				ctrl.$modelValue[lastNameKey] = lastNameVal;
				return ctrl.$modelValue;
			});

			ctrl.$formatters.unshift(function (val) {
				return (
					(val[firstNameKey] || '') +
					' ' +
					(val[lastNameKey] || '')
				);
			});




		}
	};
});
