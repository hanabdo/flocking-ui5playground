sap.ui.require([
  'sap/ui/test/opaQunit',
], function () {
  'use strict';

  QUnit.module('Navigation');
  opaTest('Should load example', function (Given, When, Then) {
    Given.iStartMyAppInAFrame(
        jQuery.sap.getResourcePath('fplay', '/index.html')
    );
    When.onTheAppPage.iSpendSomeTime().and
                     .iStoreEditorValue().and
                     .iPressExamplesListItem();
    Then.onTheAppPage.iShouldSeeEditorChange().and
                     .iTeardownMyAppFrame();
  });
});
