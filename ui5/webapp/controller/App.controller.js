sap.ui.define([
    "rest/ui5/com/ui5/controller/BaseController"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (BaseController) {
        "use strict";

        return BaseController.extend("rest.ui5.com.ui5.controller.App", {
            onInit: function () {
                // apply content density mode to root view
                this.getView().addStyleClass(!sap.ui.Device.support.touch ? "sapUiSizeCompact" : "sapUiSizeCozy");
            }
        });
    });

