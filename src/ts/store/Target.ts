/**
 * Modal Window Target Model Class
 * @public
 * @param option
 **/
export class Target {
  constructor(
    public id: number,
    public triggerId: number,
    public className: string,
    public idName: string,
    public isOpen: boolean,
    public view: any
  ) {
  }

  static fromData(data: any): Target {
    return new Target(
      data.id ? data.id : 1,
      data.triggerId ? data.triggerId : null,
      data.className ? data.className : null,
      data.idName ? data.idName : null,
      data.isOpen ? data.isOpen : false,
      data ? data : null
    );
  }

  /**
   * Private Function
   **/
  public open() {
    if(!this.isOpen) {
      this.isOpen = true;
      this.view.open();
    }
  }

  public close() {
    this.isOpen = false;
    this.view.close();
  }

  public destroy() {
    this.view.destroy();
  }
}

export default Target;
