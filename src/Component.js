/*!
 * This file is part of Flocking UI5 Playground
 * Copyright (C) 2016 Aleksey Krasnobaev <alekseykrasnobaev@gmail.com>
 *
 * You should have received a copy of the GNU General Public License
 * version 3 along with this program.
 * If not, see <http://www.gnu.org/licenses/>.
 */
sap.ui.define([
  'sap/ui/core/UIComponent',
  'fplay/lib/Router',
], function (UIComponent) {
  'use strict';

  var Component = UIComponent.extend('fplay.Component', {
    metadata: {
      manifest: 'json',
      properties: {
        app: {
          type: 'sap.m.App',
          bindable: false,
        },
      },
    },

    /**
     *
     */
    init: function () {
      UIComponent.prototype.init.apply(this, arguments);

      this.getRouter().initialize();
    },

    /* mutators */

    /**
     * assuming that routing parent target control clued to sap.m.App
     * @return {sap.m.App}
     */
    getApp: function () {
      if (!this.getProperty('app')) { // prepare cache
        var sAppViewId = this.getRouter()._oConfig.targetParent;
        var sAppId = this.getRouter()._oConfig.controlId;
        this.setProperty('app', sap.ui.getCore().byId(sAppViewId).byId(sAppId));
      }

      return this.getProperty('app'); // return cache
    },

  });

  return Component;

});
