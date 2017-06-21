/*
 * Author: Daisuke Takayama
 */
const APModel = require('@atomic-package/common').Model;

import TargetView from '../component/Target';
import TriggerView from '../component/Trigger';

// store
import {
  BackDrop,
  Target,
  Trigger
} from '../store/';

/**
 * ModalWindow Model Class
 * @public
 * @param option
 **/
export class Model {
  constructor(
    public backDrop: BackDrop,
    public targetList: Target[],
    public triggerList: Trigger[]
  ) {
    this.setTriggerCallBack();
    this.setTriggerTargetId();
    this.setTargetCallBack();
    this.setBackDropCallBack();
  }

  /**
   * Static Function
   **/
  public static fromData(data: any): Model {
    return new Model(
      data.backDrop ? BackDrop.fromData(data.backDrop) : null,
      data.targetList ? APModel.createTargetModel(data.targetList, Target) : [],
      data.triggerList ? APModel.createTriggerModel(data.triggerList, Trigger) : []
    );
  }

  /**
   * Private Function
   **/
  private setTriggerCallBack(): void {
    this.triggerList.forEach((trigger: Trigger) => {
      trigger.view.open((target) => {
        trigger.open(this.targetList);
        this.backDrop.show();
      }, true);

      trigger.view.close((target) => {
        trigger.close(this.targetList);
        this.backDrop.hide();
      }, true);
    });
  }

  private setTargetCallBack(): void {
    this.targetList.forEach((target: Target) => {
      target.view.click(() => {
        target.close();

        if(!this.openCheck()) {
          this.backDrop.hide();
        }
      }, true);
    });
  }

  private setTriggerTargetId() {
    for(let i: number = 0; i < this.triggerList.length; i++) {
      this.triggerList[i].setTargetId(this.targetList);
    }
  }

  private setBackDropCallBack(): void {
    this.backDrop.view.click(() => {
      this.close('all');
    }, true);
  }

  private matchModal(searchModals: Target[]): Target[] {
    let matchModals: Target[] = [];

    this.targetList.forEach((modal: Target) => {
      searchModals.forEach((searchModal: Target) => {
        if(modal == searchModal) {
          matchModals.push(modal);
        }
      });
    });
    return matchModals;
  }

  private openCheck(): boolean {
    let isOpen = false;

    this.targetList.forEach((modal: Target) => {
      if(modal.isOpen) {
        isOpen = true;
      }
    });
    return isOpen;
  }

  /**
   * Public Function
   **/
  public open(data: any): void {
    let searchModals: Target[] = APModel.search(this.targetList, data);

    if(searchModals.length > 0) {
      let matchModals: Target[] = this.matchModal(searchModals);

      matchModals.forEach((modal: Target) => {
        modal.open();
      });
      this.backDrop.show();
    }
  }

  public close(data: any): void {
    let searchModals: Target[] = APModel.search(this.targetList, data);

    if(searchModals.length > 0) {
      let matchModals: Target[] = this.matchModal(searchModals);

      matchModals.forEach((modal: Target) => {
        modal.close();
      });
    }

    if(!this.openCheck()) {
      this.backDrop.hide();
    }
  }

  public create(data: any): void {
    if(data !== void 0) {
      this.targetList.push(Target.fromData(data));
    } else {
      this.targetList.push(Target.fromData(TargetView.create()));
    }
  }

  public destroy(data: any): void {
    let searchModals = APModel.search(this.targetList, data),
      newList: Target[] = [];

    if(searchModals.length > 0) {
      this.targetList.forEach((modal: Target) => {
        searchModals.forEach((searchModal: Target) => {
          if(modal !== searchModal) {
            newList.push(modal);
          } else {
            modal.destroy();
          }
        });
      });
      this.targetList = newList;
    }
  }

  public update(data) {

  }

  public getElements(data: any): Target[] {
    return APModel.search(this.targetList, data);
  }

  public addTrigger(triggerViewList): void {
    let addTriggerList = APModel.createTriggerModel(triggerViewList, Trigger);

    addTriggerList.forEach((trigger) => {
      this.triggerList.push(trigger);
    });
  }

  public addTarget(targetViewList): void {
    let addTargetList = APModel.createTargetModel(targetViewList, Target);

    addTargetList.forEach((target) => {
      this.targetList.push(target);
    });

    this.reBind();
  }

  private reBind() {
    this.setTriggerCallBack();
    this.setTriggerTargetId();
    this.setTargetCallBack();
    this.setBackDropCallBack();
  }
}

export default Model;

