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
], function (Controller) {
  'use strict';

  var hisynth = flock.synth({
    synthDef: {
      ugen: 'flock.ugen.sinOsc',
      freq: 440,
      mul: 0.25,
    },
  });

  return Controller.extend('fplay.controller.Main', {

    /* events */

    /**
     * @param {sap.ui.base.Event} oControlEvent
     * @param {sap.ui.base.EventProvider} oControlEvent.getSource
     * @param {object} oControlEvent.getParameters
     */
    onInit: function (oControlEvent) {
      hisynth.pause();
    },

    /**
     * @param {sap.ui.base.Event} oControlEvent
     * @param {sap.ui.base.EventProvider} oControlEvent.getSource
     * @param {object} oControlEvent.getParameters
     */
    onNavBack: function (oControlEvent) {
      if (sap.ui.Device.system.phone) {
        this.getOwnerComponent().getRouter().navToMaster();
      } else {
        this.getOwnerComponent().getApp().showMaster();
      }
    },

    /**
     * play predefined simple synth
     *
     * @param {sap.ui.base.Event} oControlEvent
     * @param {sap.ui.base.EventProvider} oControlEvent.getSource
     * @param {object} oControlEvent.getParameters
     */
    handleSayHelloWorld: function (oControlEvent) {
      if (oControlEvent.getParameter('pressed')) {
        hisynth.play();
      } else {
        hisynth.pause();
      }
    },

    /**
     * play definition of editor
     *
     * @param {sap.ui.base.Event} oControlEvent
     * @param {sap.ui.base.EventProvider} oControlEvent.getSource
     * @param {object} oControlEvent.getParameters
     */
    handleStopPlay: function (oControlEvent) {
      var isStopped = !flock.enviro.shared.model.isPlaying;

      oControlEvent.getSource().setPressed(isStopped);

      if (isStopped) {
        oControlEvent.getSource().setIcon('sap-icon://stop');

        $('<script>')
          .attr('id', 'codemirrorcontent')
          .attr('type', 'text/javascript')
          .text('(function () {"use strict";' +
                   this.byId('jseditor').getValue() +
                '})();'
          )
          .appendTo('head');

        flock.enviro.shared.play();
      } else {
        oControlEvent.getSource().setIcon('sap-icon://play');

        flock.enviro.shared.reset();
        $('#codemirrorcontent').remove();
      }
    },

    /* private */

    /**
     * [formatLoadedExample description]
     * @param {string[]} aLines
     * @return {[type]} [description]
     */
    formatLoadedExample: function (aLines) {
      if (typeof aLines === 'undefined' || aLines === null) {
        return undefined;
      } else if (Array.isArray(aLines)) {
        return aLines.join('\n');
      } else if (aLines === 'string') {
        return aLines;
      } else {
        return undefined;
      }
    },

  });

});
