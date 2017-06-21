/*
 * Author: Daisuke Takayama
 */
import Model from '../model/';
import View from '../component/';

import TriggerView from '../component/Trigger';
import TargetView from '../component/Target';

/**
 * ModalWindow Controller Class
 * @public
 * @param option
 **/
export class ModalWindow {
  private static _instance: ModalWindow = null;

  private model: Model;

  private addTriggerList: TriggerView[] = [];
  private addTargetList: TargetView[] = [];

  constructor(
  ) {
      if (ModalWindow._instance) {
          return ModalWindow._instance;
      } else {
          if(!this.model) {
              View.fetchElements((data: any) => {
                  this.model = Model.fromData(data);
              });
          }

          if(this.addTriggerList.length > 0) {
              this.model.addTrigger(this.addTriggerList);
          }

          if(this.addTargetList.length > 0) {
              this.model.addTarget(this.addTargetList);
          }

          ModalWindow._instance = this;
      }
  }

  /**
   * Public Function
   **/
  public open(data: any): void {
    this.model.open(data);
  }

  public close(data: any): void {
    this.model.close(data);
  }

  public create(data: any): void {
    this.model.create(data);
  }

  public destroy(data: any): void {
    this.model.destroy(data);
  }

  public update(data: any) {
    this.model.update(data);
  }

  public getElements(data: any) {
    return this.model.getElements(data);
  }

  public addTrigger(element) {
    if(!this.model) {
      this.addTriggerList.push(TriggerView.fromData(element));
    } else {
      this.model.addTrigger([TriggerView.fromData(element)]);
    }
  }

  public addTarget(element) {
    if(!this.model) {
      this.addTargetList.push(TargetView.fromData({ node: element }));
    } else {
      this.model.addTarget([TargetView.fromData({ node: element })]);
    }
  }
}

export default ModalWindow;
