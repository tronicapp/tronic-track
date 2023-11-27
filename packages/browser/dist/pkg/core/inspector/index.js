var _a;
var _b;
import { getGlobal } from '../../lib/get-global';
var env = getGlobal();
// The code below assumes the inspector extension will use Object.assign
// to add the inspect interface on to this object reference (unless the
// extension code ran first and has already set up the variable)
var inspectorHost = ((_a = (_b = env)['__TRONIC_INSPECTOR__']) !== null && _a !== void 0 ? _a : (_b['__TRONIC_INSPECTOR__'] = {}));
export var attachInspector = function (receiver) { var _a; return (_a = inspectorHost.attach) === null || _a === void 0 ? void 0 : _a.call(inspectorHost, receiver); };
//# sourceMappingURL=index.js.map