/*
 * Author: Daisuke Takayama
 */
import Model from '../model/';
import View from '../component/';

/**
 * ModalWindow Controller Class
 * @public
 * @param option
 **/
export class ModalWindow {
  private model: Model;

  constructor(
  ) {
    View.fetchElements((data) => {
      this.model = Model.fromData(data);
    });
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
}

export default ModalWindow;
