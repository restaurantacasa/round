'use strict';

angular.module('round').service('rAnalytics', function Analytics(RoundSett) {
  var sett = RoundSett.analytics.GoogleAnalytics;
  var that = this;

  initialize();

	this.set = function () {
		runCommand('set', arguments);
	};

	this.send = function () {
		runCommand('send', arguments);
	};

  this.ecommerce = function (transaction) {
    gtag('event', 'purchase', transaction);
  };

  this.sendException = function(description, isFatal = false) {
    gtag('event','exception', {
      event_category: 'Exception',
      event_action: 'Exception Caught',
      event_label: description,
      non_interaction: true,
      fatal: isFatal,
    });
  };

  this.pageview = function(pagePath, pageName) {
    gtag('event','current_path', {
      page_path: pagePath,
      page_name: pageName ? pageName : ''
    });
  };

  function runCommand(command, argsObj) {
    console.log('runCommand = ', command, argsObj);

    var args = Object.values(argsObj);
    sett.accounts.forEach(account => {
      var localArgs = angular.copy(args);
      localArgs.unshift(
        account.name ?
        account.name + '.' + command :
        command
      );
      gtag.apply(that, localArgs);
    });
  }

  function gtag() {
    window.dataLayer.push(arguments);
  }

  function initialize() {
    const gaMeasurementId = sett.accounts[0].id;

    window.dataLayer = [];
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', gaMeasurementId);

    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
    script.async = true;

    document.head.appendChild(script);
  }
});