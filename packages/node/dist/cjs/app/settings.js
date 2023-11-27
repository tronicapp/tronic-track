"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSettings = void 0;
const receiver_core_1 = require("@tronic/receiver-core");
const validateSettings = (settings) => {
    if (!settings.writeKey) {
        throw new receiver_core_1.ValidationError('writeKey', 'writeKey is missing.');
    }
};
exports.validateSettings = validateSettings;
//# sourceMappingURL=settings.js.map