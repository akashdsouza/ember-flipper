import Component from '@ember/component';
import templateLayout from '../templates/components/ember-flipper-back';
import { layout, classNames, attribute } from "@ember-decorators/component";
import { computed } from '@ember/object';
import getNumber from '../utils/get-number';

@layout(templateLayout)
@classNames('ember-flipper-back')
export default class EmberFlipperBack extends Component {
  @attribute
  @computed
  get style() {
    return `transition-duration: ${getNumber(this.flipDuration, 600) / 1000}s`;
  }
}