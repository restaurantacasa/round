'use strict';

angular.module('round').service('rAnalytics', function Analytics(RoundSett) {
  var sett = RoundSett.analytics.GoogleAnalytics;

  initialize();

  this.set = function() {
    gtag('set', property, value);
  };

  this.send = function() {
    gtag('event', eventName, eventParams);
  };

  this.ecommerce = function() {
    var args = _.toArray(arguments);
    gtag('event','ecommerce:' + args.shift(), args);
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

  function initialize() {
    const gaMeasurementId = sett.accounts[0].id;

    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
    script.async = true;

    script.addEventListener('load', () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;

      gtag('js', new Date());
      gtag('config', gaMeasurementId);
    });

    document.head.appendChild(script);
  }
});