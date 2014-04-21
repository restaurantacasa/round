'use strict';

angular.module('round')
.service('rAnalytics', function Analytics($window,
																					$rootScope,
																					$location,
																					RoundSett	) {
	var that = this;

	initialize()

	//google analytics
	var ga = $window.ga;

	var trackers;

	//pick non-duplicates from accounts
	var accounts = _(RoundSett.analytics.GoogleAnalytics.accounts).uniq(function (account) {
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

	function initialize () {
		(function(i, s, o, g, r, a, m) {
			i['GoogleAnalyticsObject'] = r;
			i[r] = i[r] || function() {
				(i[r].q = i[r].q || []).push(arguments)
			}, i[r].l = 1 * new Date();
			a = s.createElement(o),
			m = s.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a, m)
		})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
	}


});
