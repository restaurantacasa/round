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

			//has to change to push since ng 1.3
			//http://stackoverflow.com/a/26565487/592641
			ctrl.$formatters.push(function (val) {

				return (
					(val[firstNameKey] ? val[firstNameKey] + ' ' : '') +
					(val[lastNameKey] || '')
				);
			});




		}
	};
});
