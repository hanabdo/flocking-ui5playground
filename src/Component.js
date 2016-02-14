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
], function (UIComponent) {
  'use strict';

  var Component = UIComponent.extend('fplay.Component', {
    metadata: {
      name: 'flocking-ui5playground',
      version: '0.0.1',
      includes: ['css/style.css'],
      dependencies: {
        libs: ['sap.m', 'zlib'],
      },
      rootView: 'fplay.view.App',
    },

  });

  return Component;

});
