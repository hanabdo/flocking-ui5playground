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
  'sap/ui/model/json/JSONModel',
], function (JSONModel) {
  'use strict';

  var oInstance;

  /**
   * singleton model with examples
   *
   * @class fplay.model.Examples
   * @extends sap.ui.model.json.JSONModel
   *
   * @property {string} mockedDataSource model know where to load mock data from
   * @property {boolean} alwaysUseMock always load default static mock
   * @property {oModel} oModel
   */
  var ExamplesModel = JSONModel.extend('fplay.model.Examples', /** @lends sap.ui.model.json.JSONModel.prototype */ {
    mockedDataSource: jQuery.sap.getModulePath('fplay.model', '/examples.json'),

    constructor: function () {
      JSONModel.prototype.constructor.call(
          this, this.mockedDataSource
      );
      if (oInstance) {
        throw 'Constructor of singleton cannot be called';
      }
      oInstance = this;
    },

  });

  /**
   * get single instance of fplay.model.Examples
   *
   * @method getInstance
   * @memberOf fplay.model.Examples
   * @return {fplay.model.Examples}
   */
  ExamplesModel.getInstance = function () {
    if (!oInstance) {
      oInstance = new ExamplesModel();
    }
    return oInstance;
  };

  return ExamplesModel;

});
