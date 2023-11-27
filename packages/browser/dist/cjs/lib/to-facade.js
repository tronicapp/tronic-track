"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFacade = void 0;
var facade_1 = require("@segment/facade");
function toFacade(evt, options) {
    var fcd = new facade_1.Facade(evt, options);
    if (evt.type === 'track') {
        fcd = new facade_1.Track(evt, options);
    }
    if (evt.type === 'identify') {
        fcd = new facade_1.Identify(evt, options);
    }
    /*
    if (evt.type === 'page') {
      fcd = new Page(evt, options)
    }
  
    if (evt.type === 'alias') {
      fcd = new Alias(evt, options)
    }
  
    if (evt.type === 'group') {
      fcd = new Group(evt, options)
    }
  
    if (evt.type === 'screen') {
      fcd = new Screen(evt, options)
    }
     */
    Object.defineProperty(fcd, 'obj', {
        value: evt,
        writable: true,
    });
    return fcd;
}
exports.toFacade = toFacade;
//# sourceMappingURL=to-facade.js.map