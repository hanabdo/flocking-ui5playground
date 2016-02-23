sap.ui.require([
  'fplay/controller/Detail.controller',
  'sap/ui/thirdparty/sinon',
  'sap/ui/thirdparty/sinon-qunit',
], function (DetailController) {
  'use strict';

  QUnit.module('Formatting functions', {
    setup: function () {},
    teardown: function () {},
  });

  QUnit.test('Should return concatenated text', function (assert) {
    // System under test
    var fnIsolatedFormatter = DetailController.prototype.formatLoadedExample;

    // Assert
    assert.strictEqual(
        fnIsolatedFormatter(['a','b','c']),
        'a\nb\nc',
        'The long text for status A is correct'
    );

    // stupid tests
    assert.strictEqual(fnIsolatedFormatter(undefined), undefined, '');
    assert.strictEqual(fnIsolatedFormatter(null), undefined, '');
    assert.strictEqual(fnIsolatedFormatter('abc'), 'abc', '');
  });

});
