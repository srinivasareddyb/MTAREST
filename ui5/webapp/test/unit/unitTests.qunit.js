/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"restui5.com./ui5/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
