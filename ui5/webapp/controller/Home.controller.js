sap.ui.define([
    "rest/ui5/com/ui5/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (BaseController, JSONModel, MessageToast) {
    'use strict';
    var that = this;

    return BaseController.extend("rest.ui5.com.ui5.controller.Home", {
        onInit: function () {
            that = this;
            this.oTableModel = new JSONModel();
            this.TableId = this.getView().byId("idTable");
            var oHomeModel = new JSONModel();
            this.getView().setModel(oHomeModel, "HomeView");
            this.getRouter().getRoute("home").attachPatternMatched(this._onPatternMatched.bind(this));
        },


        /**/
        onCreate: function () {
            var oCatModel = {
                ID: 3,
                Name: "CAR"
            };
            var aRequestJson = JSON.stringify(oCatModel);
            $.ajax({
                type: "POST",
                url: this.sUrl,
                headers: {
                    "Content-Type": "application/json"
                },
                data: aRequestJson,
                success: function (oData) {
                    that._getData();
                }, error: function (oError) {
                    debugger;
                }
            });
        },


        _getData: function () {
            this.sUrl = "/V2/(S(nv0pkvzrgnfmwfo0guc5ujso))/OData/OData.svc/Categories";
            $.ajax({
                type: "GET",
                url: this.sUrl,
                content: "application/json",
                dataType: "json",
                success: function (oData) {
                    var aResult = oData.d;
                    that.oTableModel.setData({
                        "results": aResult
                    });
                    that.TableId = that.setModel(that.oTableModel);
                },
                error: function (oError) {
                    MessageToast.show("Get the data failed");
                }
            });
        },


        /* */
        onDelete: function () {
            var fnSelect = this.getView().byId("idTable").getSelectedItems(),
                iCount = fnSelect.length;
            if (iCount === 0) {
                MessageToast.show("Please select the single record");
            } else {
                var oBinding = fnSelect[0].getBindingContext();
                var oDelModel = {
                    ID: oBinding.getProperty("ID"),
                    Name: "BMW"
                };
                var aRequestJson = JSON.stringify(oDelModel);
                $.ajax({
                    type: "PUT",
                    url: this.sUrl,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: aRequestJson,
                    success: function (oData) {
                        debugger;
                        that._getData();
                    }, error: function (oError) {
                        debugger;
                    }
                });
            }
        },


        _onPatternMatched: function () {
            this._getData();
        }

    });
});