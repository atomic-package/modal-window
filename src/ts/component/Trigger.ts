/**
 * ModalWindow Trigger Class
 * @public
 * @param option
 **/
let _created_trigger_num: number = 0;

export class Trigger {
  private openCallBackFunction: Function = () => {};
  private closeCallBackFunction: Function = () => {};

  constructor(
    public id: number,
    public node: any,
    public target: any,
    public isOpener: boolean
  ) {
    this.setTarget(this.node);
    this.setEventListener();
    this.id = this.createTriggerId();
  }

  static fromData(data: any): Trigger {
    return new Trigger(
      0,
      data ? data : null,
      null,
      true
    );
  }

  /**
   * Private Function
   **/
  private createTriggerId(): number {
    return ++_created_trigger_num;
  }

  private setTarget(node) {
    if(node.dataset.apModalClose !== undefined) {
      this.isOpener = false;

      if(node.dataset.apModalClose) {
        this.target = node.dataset.apModalClose;
      } else if((/^#./gi).test(node.hash)) {
        this.target = node.hash;
      } else {
        this.target = 'all';
      }

    } else if(node.dataset.apModal !== undefined) {
      if(node.dataset.apModal) {
        this.target = node.dataset.apModal;
      } else {
        this.target = node.hash;
      }
    }
  }

  private setEventListener(): void {
    this.node.addEventListener('click', (event) => {
      event.preventDefault();

      if(this.isOpener) {
        this.open(this.openCallBackFunction);
      } else {
        this.close(this.closeCallBackFunction);
      }
    }, false);
  }

  public open(fn, isFirst?): void {
    this.openCallBackFunction = fn;

    if(!isFirst) {
      fn(this.target);
    }
  }

  public close(fn, isFirst?): void {
    this.closeCallBackFunction = fn;

    if(!isFirst) {
      fn(this.target);
    }
  }
}

export default Trigger;