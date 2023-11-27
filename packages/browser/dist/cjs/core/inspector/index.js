"use strict";
var _a;
var _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachInspector = void 0;
var get_global_1 = require("../../lib/get-global");
var env = (0, get_global_1.getGlobal)();
// The code below assumes the inspector extension will use Object.assign
// to add the inspect interface on to this object reference (unless the
// extension code ran first and has already set up the variable)
var inspectorHost = ((_a = (_b = env)['__TRONIC_INSPECTOR__']) !== null && _a !== void 0 ? _a : (_b['__TRONIC_INSPECTOR__'] = {}));
var attachInspector = function (receiver) { var _a; return (_a = inspectorHost.attach) === null || _a === void 0 ? void 0 : _a.call(inspectorHost, receiver); };
exports.attachInspector = attachInspector;
//# sourceMappingURL=index.js.map