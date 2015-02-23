'use strict';

/**
 * @ngdoc directive
 * @name round.directive:attr
 * @description
 * # attr
 */

(function () {


	angular.forEach(['data'], function (attrName) {

		var directiveName = 'rAttr' + attrName.charAt(0).toUpperCase() + attrName.slice(1);

		angular.module('round')
		.directive(directiveName, function () {
			return {
				priority: 99, // it needs to run after the attributes are interpolated
				restrict: 'A',
				link: function postLink(scope, element, attrs) {

					attrs.$observe(directiveName, function (val) {
						if (!val) {return;}

						attrs.$set(attrName, val);
					});
				}
			};
		});
	});


}());

