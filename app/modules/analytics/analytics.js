'use strict';

angular.module('round').service('rAnalytics', ['$window', 'RoundSett', function ($window, RoundSett) {
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

  this.sendException = function(description, isFatal) {
    gtag('event','exception', {
      event_category: 'Exception',
      event_action: 'Exception Caught',
      event_label: description,
      non_interaction: true,
      fatal: isFatal ? isFatal : false,
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

    var args = Array.prototype.slice.call(argsObj);
    sett.accounts.forEach(function(account) {
      var localArgs = args.slice();
      localArgs.unshift(
        account.name ?
        account.name + '.' + command :
        command
      );
      gtag.apply(that, localArgs);
    });
  }

  function gtag() {
    $window.dataLayer.push(arguments);
  }

  function initialize() {
    var gaMeasurementId = sett.accounts[0].id;

    $window.dataLayer = [];
    $window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', gaMeasurementId);

    var script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaMeasurementId;
    script.async = true;

    document.head.appendChild(script);
  }
}]);