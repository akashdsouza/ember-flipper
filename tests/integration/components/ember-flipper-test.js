import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { click, triggerEvent } from '@ember/test-helpers';
import { percySnapshot } from 'ember-percy';

module('Integration | Component | ember-flipper', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<EmberFlipper />`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <EmberFlipper>
        template block text
      </EmberFlipper>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('flipped from outside', async function(assert) {
    await render(hbs`
    <EmberFlipper
      @flipped=true
    as |flipper|>
      <flipper.Front>
        Front
      </flipper.Front>
      <flipper.Back>
        Back
      </flipper.Back>
    </EmberFlipper>
    `);
    assert.dom('.ember-flipper-container').hasClass('ember-flipper-flipped', 'flipped class should have been added');
    await percySnapshot('flipped');
  });

  test('vertical class is added', async function(assert) {
    await render(hbs`
      <EmberFlipper
        @vertical=true
      as |flipper|>
        <flipper.Front>
          Front
        </flipper.Front>
        <flipper.Back>
          Back
        </flipper.Back>
      </EmberFlipper>
    `);
    assert.dom('.ember-flipper-container').hasClass('ember-flipper-vertical', 'vertical class should have been added');
    await percySnapshot('initial render');
  });

  test('flips on click', async function(assert) {
    await render(hbs`
    <EmberFlipper
      @flipOn="click"
    as |flipper|>
      <flipper.Front>
        <div class="front-container">
          Front
        </div>
      </flipper.Front>
      <flipper.Back>
        <div class="back-container">
          Back
        </div>
      </flipper.Back>
    </EmberFlipper>
    `);
    await percySnapshot('initial render');
    assert.dom('.ember-flipper-container').doesNotHaveClass('ember-flipper-flipped', 'flipped class should not be added before click');
    await click('.front-container');
    assert.dom('.ember-flipper-container').hasClass('ember-flipper-flipped', 'flipped class should be added after click');
    await percySnapshot('flipped');
    await click('.front-container');
    assert.dom('.ember-flipper-container').doesNotHaveClass('ember-flipper-flipped', 'flipped class should removed after click');
  });

  test('flips on hover', async function (assert) {
    await render(hbs`
    <EmberFlipper
      @flipOn="hover"
    as |flipper|>
      <flipper.Front>
        <div class="front-container">
          Front
        </div>
      </flipper.Front>
      <flipper.Back>
        <div class="back-container">
          Back
        </div>
      </flipper.Back>
    </EmberFlipper>
    `);
    assert.dom('.ember-flipper-container').doesNotHaveClass('ember-flipper-flipped', 'flipped class should not be added before hover');
    await triggerEvent('.front-container', 'mouseenter');
    assert.dom('.ember-flipper-container').hasClass('ember-flipper-flipped', 'flipped class should be added after hover');
    await percySnapshot('flipped');
    await triggerEvent('.front-container', 'mouseleave');
    assert.dom('.ember-flipper-container').doesNotHaveClass('ember-flipper-flipped', 'flipped class should be removed after hover');
  });
});
