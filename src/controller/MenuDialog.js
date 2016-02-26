/*!
 * This file is part of Flocking UI5 Playground
 * Copyright (C) 2016 Aleksey Krasnobaev <alekseykrasnobaev@gmail.com>
 *
 * You should have received a copy of the GNU General Public License
 * version 3 along with this program.
 * If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * @requires sap.ui.base.Object
 */
sap.ui.define([
  'sap/ui/base/Object',
], function (UI5Object) {
  'use strict';

  /**
   * @class fplay.controller.MenuDialog
   */
  var MenuDialog = UI5Object.extend('fplay.controller.MenuDialog', /** @lends sap.ui.base.UI5Object.prototype */ {
    _parentView: null,

    constructor: function (oView) {
      // always init private variables before call parent
      this._parentView = oView;
      UI5Object.apply(this, arguments);
    },

    /**
     * @return {[type]} [description]
     */
    _getDialog: function () {
      // create dialog lazily
      if (!this._oDialog) {
        // create dialog via fragment factory
        this._oDialog = sap.ui.xmlfragment('fplay.view.menuDialog', this);
      }
      return this._oDialog;
    },

    /**
     */
    open: function () {
      var oDialog = this._getDialog();
      debugger;
      if (this._parentView) {
        this._parentView.addDependent(oDialog);
      }
      oDialog.open();
    },

    /**
     *
     */
    onCloseDialog: function () {
      this._getDialog().close();
    },

  });

  return MenuDialog;
});
