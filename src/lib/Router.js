/*!
 * This file is part of Flocking UI5 Playground
 * Copyright (C) 2016 Aleksey Krasnobaev <alekseykrasnobaev@gmail.com>
 *
 * You should have received a copy of the GNU General Public License
 * version 3 along with this program.
 * If not, see <http://www.gnu.org/licenses/>.
 */
sap.ui.define([
  'jquery.sap.global',
  'sap/ui/core/routing/Router',
  'sap/ui/core/routing/History',
], function (jQuery, Router, History) {
  'use strict';

  var MyRouter = Router.extend('fplay.lib.Router', {

    /**
     * mobile nav back handling
     */
    myNavBack: function (sRoute, oData) {
      var oHistory = History.getInstance();
      var oPrevHash = oHistory.getPreviousHash();
      if (oPrevHash !== undefined) {
        window.history.go(-1);
      } else {
        var bReplace = true; // otherwise we go backwards with a forward history
        this.navTo(sRoute, oData, bReplace);
      }
    },

    /**
     * a nav to method that does not write hashes but load the views properly
     *
     * @param  {string} sViewName fplay.view.Master
     * @param  {sap.ui.core.mvc.ViewType} sViewType
     * @param  {boolean} master   States if the page should be added to the master area. If it's set to false, the page is added to detail area.
     * @param  {object} oData     This optional object can carry any payload data which should be made available to the target page.
     */
    myNavToWithoutHash: function (sViewName, sViewType, bMaster, oData) {
      var oApp = sap.ui.getCore().byId('__xmlview0--app');
      var oView = this.getView(sViewName, sViewType);
      oApp.addPage(oView, bMaster);
      oApp.toDetail(oView.getId(), 'show', oData);
    },

    /**
     * a nav to method that does not write hashes but load the views properly
     */
    navToMaster: function () {
      var oApp = sap.ui.getCore().byId('__xmlview0--app');
      var oView = this.getView('fplay.view.Master', 'XML');
      oApp.toMaster(oView.getId(), 'show');
    },

    /**
     * a nav to method that does not write hashes but load the views properly
     */
    navToMain: function () {
      var oApp = sap.ui.getCore().byId('__xmlview0--app');
      var oView = this.getView('fplay.view.Main', 'XML');
      oApp.toMaster(oView.getId(), 'show');
    },

  });

  return MyRouter;

}, /* bExport= */ true);
