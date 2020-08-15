import Modifier from 'ember-modifier';
import getNumber from '../utils/get-number';

export default class TrackClickModifier extends Modifier {
  flip = (flipped) => {
    let {
      flipDuration,
      vertical
    } = this.args.named;
    let x, y;
    let front = this.element.querySelector('[data-ember-flipper-front]');
    let back = this.element.querySelector('[data-ember-flipper-back]');

    let transitionDuration = `${getNumber(flipDuration, 600) / 1000}s`;
    front.style.transitionDuration = transitionDuration;
    back.style.transitionDuration = transitionDuration;
    if (flipped) {
      x = vertical ? '180deg' : '0deg';
      y = vertical ? '0deg' : '180deg';
      front.style.transform = `rotateX(${x}) rotateY(${y})`;
      back.style.transform = 'rotateX(0deg) rotateY(0deg)';
    } else {
      x = vertical ? '-180deg' : '0deg';
      y = vertical ? '0deg' : '-180deg';
      front.style.transform = 'none';
      back.style.transform = `rotateX(${x}) rotateY(${y})`;
    }
  }

  flipHandler = () => {
    this.flipped = !this.flipped;
    this.flip(this.flipped);
  }

  removeEventListeners() {
    this.element.removeEventListener('click', this.flipHandler);
    this.element.removeEventListener('mouseenter', this.flipHandler);
    this.element.removeEventListener('mouseleave', this.flipHandler);
  }

  didReceiveArguments() {
    let [
      flipOn = 'none'
    ] = this.args.positional;

    this.removeEventListeners();

    let front = this.element.querySelector('[data-ember-flipper-front]');
    let back = this.element.querySelector('[data-ember-flipper-back]');

    if (!front || !back) {
      return;
    }

    this.element.dataset.emberFlipper = '';

    if (flipOn && flipOn !== 'none') {
      if (flipOn === 'click') {
        this.element.addEventListener('click', this.flipHandler);
      }
      if (flipOn === 'hover') {
        this.element.addEventListener('mouseenter', this.flipHandler);
        this.element.addEventListener('mouseleave', this.flipHandler);
      }
    }
    this.flipped = this.args.named.flipped || false;
    this.flip(this.flipped);
  }

  willRemove() {
    this.removeEventListeners();
  }
}
