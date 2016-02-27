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
  'fplay/controller/AboutDialog',
  'zlib/Flocking',
], function (Controller, AboutDialog) {
  'use strict';

  var hisynth = flock.synth({
    synthDef: {
      ugen: 'flock.ugen.sinOsc',
      freq: 440,
      mul: 0.25,
    },
  });

  return Controller.extend('fplay.controller.Detail', {
    _oAboutDialog: null,

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
     * @param {sap.ui.base.Event} oControlEvent
     * @param {sap.ui.base.EventProvider} oControlEvent.getSource
     * @param {object} oControlEvent.getParameters
     */
    onAboutPress: function (oControlEvent) {
      this._getAboutDialog().open();
    },

    /**
     * play predefined simple synth
     *
     * @param {sap.ui.base.Event} oControlEvent
     * @param {sap.ui.base.EventProvider} oControlEvent.getSource
     * @param {object} oControlEvent.getParameters
     */
    onHelloWorldPress: function (oControlEvent) {
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
    onTogglePlayback: function (oControlEvent) {
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

    /**
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API}
     *
     * @param {sap.ui.base.Event} oControlEvent
     * @param {sap.ui.base.EventProvider} oControlEvent.getSource
     * @param {object} oControlEvent.getParameters
     */
    onGoFullscreen: function (oControlEvent) {
      if (
          // alternative standard method
          !document.fullscreenElement &&
          // current working methods
          !document.mozFullScreenElement &&
          !document.webkitFullscreenElement &&
          !document.msFullscreenElement
      ) {
        if (document.body.requestFullscreen) {
          document.body.requestFullscreen();
        } else if (document.body.msRequestFullscreen) {
          document.body.msRequestFullscreen();
        } else if (document.body.mozRequestFullScreen) {
          document.body.mozRequestFullScreen();
        } else if (document.body.webkitRequestFullscreen) {
          document.body.webkitRequestFullscreen(
              document.body.ALLOW_KEYBOARD_INPUT
          );
        }
        oControlEvent.getSource().setPressed(true);
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
        oControlEvent.getSource().setPressed(false);
      }
    },

    /* private */

    /**
     * [formatLoadedExample description]
     * @param {string[]} aLines
     * @return {[type]} [description]
     */
    formatLoadedExample: function (aLines) {
      jQuery.sap.assert(aLines === null ||
          (Array.isArray(aLines) && typeof aLines[0] === 'string'),
        'This should be array of strings'
      );

      if (typeof aLines === 'undefined' || aLines === null) {
        return undefined;
      } else if (Array.isArray(aLines)) {
        return aLines.join('\n');
      } else if (typeof aLines === 'string') {
        return aLines;
      } else {
        return undefined;
      }
    },

    /**
     * lazy create menu dialog
     */
    _getAboutDialog: function () {
      if (!this._oAboutDialog) {
        this._oAboutDialog = new AboutDialog(this.getView());
      }
      return this._oAboutDialog;
    },

  });

});
