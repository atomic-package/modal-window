/*
 * Author: Daisuke Takayama
 */

'use strict';
var e = eval, global: NodeJS.Global = e('this');

import ModalWindow from './controller/';

declare namespace NodeJS {
  interface Global {
    document: Document;
    window: Window;
    navigator: Navigator;
    AP: {
      ui: {
        modal: ModalWindow
      }
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
  if (typeof global.AP.ui === 'undefined') {
    Object.assign(global.AP, { ui: {} });
  }
  if (typeof global.AP.ui.modal === 'undefined') {
    Object.assign(global.AP.ui, { modal: ModalWindow });
  }
}
