'use strict';

angular.module('round')
.service('rAnalytics', function Analytics(
	$window,
	$rootScope,
	$location,
	RoundSett
) {

	var that = this;

	var accounts;

	initialize();

	this.set = function () {
		//convert args to array
		var args = Array.prototype.slice.call( arguments, 0 );

		_(accounts).each(function (account) {
			var localArgs = angular.copy(args);
			localArgs.unshift(account.name ? account.name + '.set' : 'set');
			$window.ga.apply(that, localArgs);
		});
	};

	this.send = function () {
		//convert args to array
		var args = Array.prototype.slice.call( arguments, 0 );

		_(accounts).each(function (account) {
			var localArgs = angular.copy(args);
			localArgs.unshift(account.name ? account.name + '.send' : 'send');
			$window.ga.apply(that, localArgs);
		});
	};


	this.sendException = function (msg, trace) {
		that.send('exception', {
			exDescription: msg + '\n ○ ' + trace
		});
	};



	/*==================================
	=            Shorthands            =
	==================================*/

	this.pageview = function (page) {
		that.set('page', page);
		that.send('pageview', {
			page: page
		});
	};

	/*-----  End of Shorthands  ------*/




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
		})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

		//pick non-duplicates from accounts
		accounts =
			_(RoundSett.analytics.GoogleAnalytics.accounts).uniq(function (account) {
			return account.id;
		});

		//create trackers
		_(accounts).each(function (account) {
			$window.ga('create', account.id, {
				name: account.name
			});
		});

	}


});
