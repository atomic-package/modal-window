const APModel = require('@atomic-package/common').Model;

import Target from './Target';

/**
 * ModalWindow Trigger Class
 * @public
 * @param option
 **/
export class Trigger {
  constructor(
    public id: number,
    public className: string,
    public idName: string,
    public target: any,
    public targetId: number[],
    public isOpener: boolean,
    public view: any
  ) {
  }

  /**
   * Static Function
   **/
  static fromData(data: any): Trigger {
    return new Trigger(
      data.id ? data.id : 1,
      data.className ? data.className : null,
      data.idName ? data.idName : null,
      data.target ? data.target : null,
      data.targetId ? data.targetId : [],
      data.isOpener ? data.isOpener : false,
      data ? data : null
    );
  }

  /**
   * Public Function
   **/
  public setTargetId(targetViewList: Target[]): void  {
    let searchContents: Target[];

    if(this.target) {
      searchContents = APModel.search(targetViewList, this.target);
    } else {
      searchContents = APModel.search(targetViewList, { triggerId: this.id });
    }

    if(searchContents) {
      for(let i: number = 0; i < searchContents.length; i++) {
        this.targetId.push(searchContents[i].id);
      }
    }
  }

  public open(targetList) {
    for(let i: number = 0; i < this.targetId.length; i++) {
      for(let n: number = 0; n < targetList.length; n++) {
        if(targetList[n].id === this.targetId[i]) {
          targetList[n].open();
        }
      }
    }
  }

  public close(targetList) {
    for(let i: number = 0; i < this.targetId.length; i++) {
      for(let n: number = 0; n < targetList.length; n++) {
        if(targetList[n].id === this.targetId[i]) {
          targetList[n].close();
        }
      }
    }
  }
}

export default Trigger;
