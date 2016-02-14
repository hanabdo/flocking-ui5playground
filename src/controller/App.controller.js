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
  'fplay/model/Examples',
], function (Controller, ExamplesModel) {
  'use strict';

  return Controller.extend('fplay.controller.App', {

    /**
     * @param {sap.ui.base.Event} oControlEvent
     * @param {sap.ui.base.EventProvider} oControlEvent.getSource
     * @param {object} oControlEvent.getParameters
     */
    onInit: function (oControlEvent) {
      this.getView().setModel(new ExamplesModel(), 'examples');
    },

  });

});
