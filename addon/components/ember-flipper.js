import Component from '@ember/component';
import templateLayout from '../templates/components/ember-flipper';
import { layout, className, classNames } from "@ember-decorators/component";

@layout(templateLayout)
@classNames('ember-flipper-container')
export default class EmberFlipper extends Component {
  @className('ember-flipper-flipped')
  flipped

  @className('ember-flipper-vertical')
  vertical

  didInsertElement() {
    super.didInsertElement(...arguments);
    let {
      flipOn,
      flipped,
      element
    } = this;
    if (flipped === undefined && flipOn && flipOn !== 'none') {
      this.flipCard = () => {
        this.toggleProperty('flipped');
      }
      if (flipOn === 'click') {
        element.addEventListener('click', this.flipCard);
      }
      if (flipOn === 'hover') {
        element.addEventListener('mouseenter', this.flipCard);
        element.addEventListener('mouseleave', this.flipCard);
      }
    }
  }
}