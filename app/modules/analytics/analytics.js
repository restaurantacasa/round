'use strict';

angular.module('round')
.service('rAnalytics', function Analytics(
	$window,
	$rootScope,
	$location,
	RoundSett
) {

	var that = this;

	var sett = RoundSett.analytics.GoogleAnalytics;
	var accounts;

	initialize();


	this.set = function () {
		runCommand('set', arguments);
	};

	this.send = function () {
		runCommand('send', arguments);
	};

	this.ecommerce = function () {
		var args = _.toArray(arguments);
		runCommand('ecommerce:' + args.shift(), args);
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


	function runCommand (command, argsObj) {
		var args = _.toArray(argsObj);
		_(accounts).each(function (account) {
			var localArgs = angular.copy(args);
			localArgs.unshift(
				account.name ?
				account.name + '.' + command :
				command
			);
			$window.ga.apply(that, localArgs);
		});
	}



	function initialize () {
		(function(i, s, o, g, r, a, m) {
			i.GoogleAnalyticsObject = r;
			i[r] = i[r] || function() {
				(i[r].q = i[r].q || []).push(arguments);
			}, i[r].l = 1 * new Date();
			a = s.createElement(o),
			m = s.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a, m);
		})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

		//pick non-duplicates from accounts
		accounts =
			_(sett.accounts).uniq(function (account) {
			return account.id;
		});

		//create trackers
		_(accounts).each(function (account) {
			$window.ga('create', account.id, {
				name: account.name
			});
			if (account.enableEcommerce) {
				$window.ga(account.name +'.require', 'ecommerce');
			}
		});


	}


});
