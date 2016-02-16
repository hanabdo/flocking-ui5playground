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
  'sap/m/routing/Router',
  'sap/ui/core/routing/History',
], function (jQuery, Router, History) {
  'use strict';

  var MyRouter = Router.extend('fplay.lib.Router', {

    /* routes */

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
     */
    navToMaster: function () {
      var oView = this.getView('fplay.view.Master', 'XML');
      this._oOwner.getApp().toMaster(oView.getId(), 'show');
    },

    /**
     * a nav to method that does not write hashes but load the views properly
     */
    navToMain: function () {
      var oView = this.getView('fplay.view.Main', 'XML');
      this._oOwner.getApp().toMaster(oView.getId(), 'show');
    },

  });

  return MyRouter;

}, /* bExport= */ true);
