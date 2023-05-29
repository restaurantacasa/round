'use strict';

angular.module('round')
.service('rAnalytics', function Analytics( RoundSett ) {
	var sett = RoundSett.analytics.GoogleAnalytics;

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

	this.sendException = function (description, isFatal = false) {
		runCommand('event', {
			event_category: 'Exception',
			event_action: 'Exception Caught',
			event_label: description,
			non_interaction: true,
			fatal: isFatal
		});
	}

	this.pageview = function(pagePath) {
		runCommand('config', {
		  page_path: pagePath,
		});
	}

	this.runCommand = function (command, argsObj) {
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
		  [command]: argsObj
		});
	}

	this.initialize = function () {
		const gaMeasurementId = sett.accounts[0].id;
	  
		// Crea un elemento de script para cargar la biblioteca gtag.js
		const script = document.createElement('script');
		script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
		script.async = true;
	  
		// Agrega un evento de carga para configurar la función gtag
		script.addEventListener('load', () => {
		  window.dataLayer = window.dataLayer || [];
		  function gtag(){dataLayer.push(arguments);}
		  gtag('js', new Date());
	  
		  gtag('config', gaMeasurementId);
		});
	  
		// Agrega el script al final del elemento <head> en el HTML principal
		document.head.appendChild(script);
	  }
});
