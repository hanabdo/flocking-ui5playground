/*!
 * This file is part of Flocking UI5 Playground
 * Copyright (C) 2016 Aleksey Krasnobaev <alekseykrasnobaev@gmail.com>
 *
 * You should have received a copy of the GNU General Public License
 * version 3 along with this program.
 * If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * @requires sap.ui.core.mvc.Controller
 */
sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/ui/model/Filter',
  'sap/ui/model/FilterOperator',
  'sap/m/GroupHeaderListItem',
], function (Controller, Filter, FilterOperator, GroupHeaderListItem) {
  'use strict';

  return Controller.extend('fplay.controller.Master', {

    /* events */

    loadExample: function (oControlEvent) {
      var oContext = oControlEvent.getParameters().listItem
                     .getBindingContext('examples');
      var oBinding = oContext.getModel()
                     .aBindings.filter(function (oJSONListBinding) {
                       return oJSONListBinding.getPath() === 'code';
                     })[0];

      oBinding.setContext(oContext);
    },

    /**
     * @param {sap.ui.base.Event} oControlEvent
     * @param {sap.ui.base.EventProvider} oControlEvent.getSource
     * @param {object} oControlEvent.getParameters
     */
    onExampleSearch: function (oControlEvent) {
      // add filter for search
      var aFilters = [];
      var sQuery = oControlEvent.getSource().getValue();
      if (sQuery && sQuery.length > 0) {
        var filter = new Filter({
          path: 'name',
          operator: FilterOperator.Contains,
          value1: sQuery,
        });

        aFilters.push(filter);
      }

      // update list binding
      var list = this.getView().byId('idExamplesList');
      var binding = list.getBinding('items').filter(aFilters, 'Application');
    },

    /**
     * @param {sap.ui.base.Event} oControlEvent
     * @param {sap.ui.base.EventProvider} oControlEvent.getSource
     * @param {object} oControlEvent.getParameters
     */
    handleSayHelloWorld: function (oControlEvent) {},

    /**
     * @param {sap.ui.base.Event} oControlEvent
     * @param {sap.ui.base.EventProvider} oControlEvent.getSource
     * @param {object} oControlEvent.getParameters
     */
    handleStopPlay: function (oControlEvent) {},

    /* private */

    /**
     * [getGroupHeader description]
     * @param  {[type]} oGroup [description]
     * @return {[type]}        [description]
     */
    getGroupHeader: function (oGroup) {
      return new GroupHeaderListItem({
        title: oGroup.key,
        upperCase: false,
      });
    },

  });

});
