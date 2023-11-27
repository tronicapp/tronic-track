/**
 * Data Storage using in memory object
 */
var MemoryStorage = /** @class */ (function () {
    function MemoryStorage() {
        this.cache = {};
    }
    MemoryStorage.prototype.get = function (key) {
        var _a;
        return ((_a = this.cache[key]) !== null && _a !== void 0 ? _a : null);
    };
    MemoryStorage.prototype.set = function (key, value) {
        this.cache[key] = value;
    };
    MemoryStorage.prototype.remove = function (key) {
        delete this.cache[key];
    };
    return MemoryStorage;
}());
export { MemoryStorage };
//# sourceMappingURL=memoryStorage.js.map