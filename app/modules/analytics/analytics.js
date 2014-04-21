'use strict';

angular.module('round')
.service('rAnalytics', function Analytics($window, $rootScope, $location, roundSett) {
	var that = this;

	//google analytics
	var ga = $window.ga;

	var trackers;

	//pick non-duplicates from accounts
	var accounts = _(roundSett.analytics.GoogleAnalytics.accounts).uniq(function (account) {
		return account.id;
	});

	//create trackers
	_(accounts).each(function (account) {
		ga('create', account.id, {
			name: account.name
		});
	});

	//cache all trackers once the analytics.js library is loaded
	ga(function () {
		trackers = ga.getAll();
	});

	$rootScope.$on('$stateChangeStart', function() {
		that.set('page', $location.url());
	});


	this.set = function () {
		//convert args to array
		var args = Array.prototype.slice.call( arguments, 0 );

		_(trackers).each(function (tracker) {
			tracker.set.apply(tracker, args);
		});
	};

	this.send = function () {
		//convert args to array
		var args = Array.prototype.slice.call( arguments, 0 );

		_(trackers).each(function (tracker) {
			tracker.send.apply(tracker, args);
		});
	};

	this.sendException = function (msg, trace) {
		that.send('exception', {
			exDescription: msg + '\n ○ ' + trace
		});
	};


});
