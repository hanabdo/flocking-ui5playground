sap.ui.require([
  'fplay/controller/Detail.controller',
], function (DetailController) {
  'use strict';

  QUnit.module('Formatting functions', {});

  QUnit.test('Should return concatenated text', function (assert) {
    var fnIsolatedFormatter = DetailController.prototype.formatLoadedExample;

    // main check
    assert.strictEqual(
        fnIsolatedFormatter(['a','b','c']),
        'a\nb\nc',
        'Array should be concatenated'
    );

    // sanity check
    assert.strictEqual(fnIsolatedFormatter(undefined), undefined);
    assert.strictEqual(fnIsolatedFormatter(null), undefined);
    assert.strictEqual(fnIsolatedFormatter('abc'), 'abc');
  });

});
