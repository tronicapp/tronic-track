"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
var parse_cdn_1 = require("../lib/parse-cdn");
var version_type_1 = require("../lib/version-type");
if (process.env.ASSET_PATH) {
    if (process.env.ASSET_PATH === '/dist/umd/') {
        // @ts-ignore
        __webpack_public_path__ = '/dist/umd/';
    }
    else {
        var cdn = (0, parse_cdn_1.getCDN)();
        (0, parse_cdn_1.setGlobalCDNUrl)(cdn); // preserving original behavior -- TODO: neccessary?
        // @ts-ignore
        __webpack_public_path__ = cdn + '/tronic-receiver/bundles/';
    }
}
(0, version_type_1.setVersionType)('web');
__exportStar(require("."), exports);
//# sourceMappingURL=browser-umd.js.map