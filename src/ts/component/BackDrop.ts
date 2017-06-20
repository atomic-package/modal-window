const Tween = require('@atomic-package/tween');

/**
 * ModalWindow BackDrop Class
 * @public
 * @param option
 **/
export class BackDrop {
  private _BACKDROP_ELEMENT_CLASS_NAME: string = 'modalWindowBackDrop';
  private callBackFunction: Function = () => {};
  private node: any;

  constructor(
  ) {
    this.createElement();
    this.setEventListener();
    this.defaultStyle();
  }

  /**
   * Static Function
   **/
  static fromData(data: any): BackDrop {
    return new BackDrop();
  }

  /**
   * Private Function
   **/
  private setEventListener(): void {
    this.node.addEventListener('click', (event) => {
      event.preventDefault();
      this.click(this.callBackFunction);
    }, false);
  }

  private defaultStyle(): void {
    (<HTMLElement>this.node).style.position = 'fixed';
    (<HTMLElement>this.node).style.top = '0';
    (<HTMLElement>this.node).style.display = 'none';
    (<HTMLElement>this.node).style.width = '100%';
    (<HTMLElement>this.node).style.height = '100%';
    (<HTMLElement>this.node).style.opacity = '0';
    (<HTMLElement>this.node).style.background = 'rgba(0, 0, 0, 0.6)';
  }

  private showStartStyle(): void {
    (<HTMLElement>this.node).style.display = 'block';
  }

  private showFixedStyle(): void {
    (<HTMLElement>this.node).style.opacity = '1';
  }

  private setOpenStyle() {
    this.showStartStyle();
    this.showAnimation();
  }

  private hideFixedStyle() : void {
    (<HTMLElement>this.node).style.display = 'none';
    (<HTMLElement>this.node).style.opacity = '0';
  }

  private showAnimation() {
    let tween = new Tween({
      opacity: (<HTMLElement>this.node).style.opacity
    }, {
      opacity: 1
    }, {
      duration: 200,
      easing: 'easeInOutQuad',
      step: (val) => {
        (<HTMLElement>this.node).style.opacity = val.opacity;
      },
      complete: () => {
        tween = null;
        this.showFixedStyle();
      }
    });
  }

  private closeAnimation() {
    let tween = new Tween({
      opacity: 1
    }, {
      opacity: 0
    }, {
      duration: 300,
      easing: 'easeInOutQuad',
      step: (val) => {
        (<HTMLElement>this.node).style.opacity = val.opacity;
      },
      complete: () => {
        this.hideFixedStyle();
        tween = null;
      }
    });
  }

  private setCloseStyle() {
    this.closeAnimation();
  }

  /**
   * Public Function
   **/
  public createElement(): void {
    this.node = document.createElement("div");
    this.node.classList.add(this._BACKDROP_ELEMENT_CLASS_NAME);

    document.body.appendChild(this.node);
  }

  public show(): void {
    this.setOpenStyle();
  }

  public hide(): void {
    this.setCloseStyle();
  }

  public click(fn, isFirst?): void {
    this.callBackFunction = fn;

    if(!isFirst) {
      fn();
    }
  }
}

export default BackDrop;