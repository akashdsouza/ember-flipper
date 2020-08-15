import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  click,
  triggerEvent
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Modifier | ember-flip', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      <div {{ember-flip flipped=this.flipped}}>
        <div data-ember-flipper-front></div>
        <div data-ember-flipper-back></div>
      </div>
    `);

    let front = document.querySelector(('[data-ember-flipper-front]'));
    let back = document.querySelector(('[data-ember-flipper-back]'));

    assert.dom('[data-ember-flipper-front]').hasStyle({
      transitionDuration: '0.6s' // Default is 600s
    });
    /**
     * We are not using assert.dom(...).hasStyle method here because it returns a matrix3d CSS
     * function which returns a 3D transformation as a 4x4 homogeneous matrix
     *
     * matrix3D MDN doc: https: //developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix3d
     *  */
    assert.equal(front.style.transform, 'none');

    assert.dom('[data-ember-flipper-back]').hasStyle({
      transitionDuration: '0.6s'
    });
    assert.equal(back.style.transform, 'rotateX(0deg) rotateY(-180deg)');

    // Flip it
    this.set('flipped', true);
    assert.equal(front.style.transform, 'rotateX(0deg) rotateY(180deg)');
    assert.equal(back.style.transform, 'rotateX(0deg) rotateY(0deg)');
  });

  test('vertical flip', async function(assert) {
    await render(hbs`
      <div {{ember-flip flipped=this.flipped vertical=true}}>
        <div data-ember-flipper-front></div>
        <div data-ember-flipper-back></div>
      </div>
    `);
    let front = document.querySelector(('[data-ember-flipper-front]'));
    let back = document.querySelector(('[data-ember-flipper-back]'));
    assert.equal(front.style.transform, 'none');
    assert.equal(back.style.transform, 'rotateX(-180deg) rotateY(0deg)');
    // Flip it
    this.set('flipped', true);
    assert.equal(front.style.transform, 'rotateX(180deg) rotateY(0deg)');
    assert.equal(back.style.transform, 'rotateX(0deg) rotateY(0deg)');
  })

  test('flips on click', async function(assert) {
    await render(hbs`
      <div {{ember-flip "click"}}>
        <div data-ember-flipper-front></div>
        <div data-ember-flipper-back></div>
      </div>
    `);

    let front = document.querySelector(('[data-ember-flipper-front]'));
    let back = document.querySelector(('[data-ember-flipper-back]'));

    assert.equal(front.style.transform, 'none');
    assert.equal(back.style.transform, 'rotateX(0deg) rotateY(-180deg)');

    //Flip it
    await click('[data-ember-flipper-front]');
    assert.equal(front.style.transform, 'rotateX(0deg) rotateY(180deg)');
    assert.equal(back.style.transform, 'rotateX(0deg) rotateY(0deg)');
  });

  test('flips on hover', async function(assert) {
    await render(hbs`
      <div {{ember-flip "hover"}}>
        <div data-ember-flipper-front></div>
        <div data-ember-flipper-back></div>
      </div>
    `);

    let front = document.querySelector(('[data-ember-flipper-front]'));
    let back = document.querySelector(('[data-ember-flipper-back]'));

    assert.equal(front.style.transform, 'none');
    assert.equal(back.style.transform, 'rotateX(0deg) rotateY(-180deg)');

    await triggerEvent('[data-ember-flipper-front]', 'mouseenter');
    assert.equal(front.style.transform, 'rotateX(0deg) rotateY(180deg)');
    assert.equal(back.style.transform, 'rotateX(0deg) rotateY(0deg)');

    await triggerEvent('[data-ember-flipper-front]', 'mouseleave');
    assert.equal(front.style.transform, 'none');
    assert.equal(back.style.transform, 'rotateX(0deg) rotateY(-180deg)');
  });
});
