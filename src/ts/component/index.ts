/*
 * Author: Daisuke Takayama
 */
const APView  = require('@atomic-package/common').View;

import Trigger from './Trigger';
import Target from './Target';
import BackDrop from './BackDrop';

/**
 * ModalWindow View Class
 * @public
 * @param option
 **/
export class View {
  /**
   * Static Function
   **/
  static fetchElements(callback) {
    document.addEventListener("DOMContentLoaded", () => {
      let triggerList = APView.createFromTriggerElement(['[data-ap-modal]', '[data-ap-modal-close]'], Trigger);

      callback({
        triggerList: triggerList,
        targetList: APView.createTargetView(triggerList, Target),
        backDrop: this.createBackDropView()
      });
    });
  }

  public static createBackDropView() {
    return BackDrop.fromData({});
  }
}

export default View;
