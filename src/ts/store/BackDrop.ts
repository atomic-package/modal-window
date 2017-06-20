/**
 * ModalWindow BackDrop Class
 * @public
 * @param option
 **/
export class BackDrop {
  constructor(
    public isShow: boolean,
    public view: any
  ){
  }

  static fromData(data: any): BackDrop {
    return new BackDrop(
      data.isShow ? data.isShow: false,
      data ? data : null
    );
  }

  public show() {
    this.isShow = true;
    this.view.show();
  }

  public hide() {
    this.isShow = false;
    this.view.hide();
  }
}

export default BackDrop;
