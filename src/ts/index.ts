/*
 * Author: Daisuke Takayama
 */

'use strict';
let e = eval, global: NodeJS.Global = e('this');

import ModalWindow from './controller/';

declare namespace NodeJS {
  interface Global {
    document: Document;
    window: Window;
    navigator: Navigator;
    AP: {
      modal: ModalWindow
    };
  }
}

// npm & node
if (typeof module !== 'undefined') {
  module.exports = ModalWindow;
}

// browser
if (typeof (global) !== 'undefined') {
  if (typeof global.AP === 'undefined') {
    Object.assign(global, { AP: {} });
  }

  if (typeof global.AP.modal === 'undefined') {
    Object.assign(global.AP, { modal: new ModalWindow });
  }
}
