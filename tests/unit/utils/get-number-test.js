import getNumber from 'ember-flipper/utils/get-number';
import { module, test } from 'qunit';

module('Unit | Utility | getNumber', function() {
  test('it works', function(assert) {
    let result = getNumber(1);
    assert.equal(result, 1, 'Number should be returned correctly');
  });

  test('number from string', (assert) => {
    let result = getNumber('1');
    assert.equal(result, 1, 'Number should be returned correctly');
  });

  test('invalid string', (assert) => {
    let result = getNumber('a', 1);
    assert.equal(result, 1, 'Number should be returned correctly');
  });

  test('boolean', (assert) => {
    let result = getNumber(true, 1);
    assert.equal(result, 1, 'Number should be returned correctly');
  });

  test('empty string', (assert) => {
    let result = getNumber('');
    assert.equal(result, 0, 'Number should be returned correctly');
  });

  test('object', (assert) => {
    let result = getNumber({}, 1);
    assert.equal(result, 1, 'Number should be returned correctly');
  });
});
