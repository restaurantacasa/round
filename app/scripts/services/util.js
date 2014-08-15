'use strict';

/**
 * @ngdoc service
 * @name Round.rUtil
 * @description
 * # util
 * Service in the Round.
 */
angular.module('round')
.service('rUtil', function Util() {

	this.has = function (suspect, members) {
		if (angular.isArray(members)) {
			angular.forEach(members, function (memberName) {
				if (typeof suspect[memberName] === 'undefined') {
					throw new Error('missing argument member: ' + memberName);
				}
			});
		} else if (angular.isObject(members)) {
			angular.forEach(members, function (type, memberName) {
				if (typeof suspect[memberName] !== type) {
					throw new Error('missing or bad argument member type: ' +
						memberName +
						', type: ' +
						type);
				}
			});
		}
	};


});
