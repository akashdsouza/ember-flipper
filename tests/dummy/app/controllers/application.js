import Controller from '@ember/controller';
import {
  action
} from '@ember/object';

export default class Application extends Controller {
  @action
  toggleProp(prop) {
    this.toggleProperty(prop);
  }
}
