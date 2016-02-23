sap.ui.require([
  'sap/ui/test/Opa5',
], function (Opa5) {
  'use strict';

  var oldEditorValue;

  Opa5.createPageObjects({
    onTheAppPage: {
      actions: {
        iSpendSomeTime: function () {
          return this.waitFor({
            controlType: 'sap.m.SplitApp',
            success: function (oApp) {},
            errorMessage: 'Did not fint the application (sap.m.SplitApp)',
          });
        },

        iPressExamplesListItem: function () {
          return this.waitFor({
            controlType: 'sap.m.List',
            success: function (aList) {
              // select first clickable element - button, not header
              aList[0].getItems()[1].$().trigger('tap');
            },
            errorMessage: 'Did not find the examples list in master view',
          });
        },

        iStoreEditorValue: function () {
          return this.waitFor({
            controlType: 'zlib.Codemirror',
            success: function (oCodemirror) {
              oldEditorValue = oCodemirror[0].getValue();
            },
            errorMessage: 'Did not find the text editor',
          });
        },
      },

      assertions: {
        iShouldSeeEditorChange: function () {
          return this.waitFor({
            controlType: 'zlib.Codemirror',
            success: function (oCodemirror) {
              Opa5.assert.ok(
                oldEditorValue !== oCodemirror[0].getValue(),
                'The dialog is open'
              );
            },
            errorMessage: 'Did not find the dialog control',
          });
        },
      },
    },

  });

});
