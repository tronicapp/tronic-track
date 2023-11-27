var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { v4 as uuid } from '@lukeed/uuid';
import autoBind from '../../lib/bind-all';
import { UniversalStorage, MemoryStorage, StoreType, applyCookieOptions, initializeStorages, isArrayOfStoreType, } from '../storage';
var defaults = {
    persist: true,
    cookie: {
        key: 'ajs_user_id',
        oldKey: 'ajs_user',
    },
    localStorage: {
        key: 'ajs_user_traits',
    },
};
var User = /** @class */ (function () {
    function User(options, cookieOptions) {
        var _this = this;
        if (options === void 0) { options = defaults; }
        var _a, _b, _c, _d;
        this.options = {};
        this.id = function (id) {
            if (_this.options.disable) {
                return null;
            }
            var prevId = _this.identityStore.getAndSync(_this.idKey);
            if (id !== undefined) {
                _this.identityStore.set(_this.idKey, id);
                var changingIdentity = id !== prevId && prevId !== null && id !== null;
                if (changingIdentity) {
                    _this.anonymousId(null);
                }
            }
            var retId = _this.identityStore.getAndSync(_this.idKey);
            if (retId)
                return retId;
            var retLeg = _this.legacyUserStore.get(defaults.cookie.oldKey);
            return retLeg ? (typeof retLeg === 'object' ? retLeg.id : retLeg) : null;
        };
        this.anonymousId = function (id) {
            var _a, _b;
            if (_this.options.disable) {
                return null;
            }
            if (id === undefined) {
                var val = (_a = _this.identityStore.getAndSync(_this.anonKey)) !== null && _a !== void 0 ? _a : (_b = _this.legacySIO()) === null || _b === void 0 ? void 0 : _b[0];
                if (val) {
                    return val;
                }
            }
            if (id === null) {
                _this.identityStore.set(_this.anonKey, null);
                return _this.identityStore.getAndSync(_this.anonKey);
            }
            _this.identityStore.set(_this.anonKey, id !== null && id !== void 0 ? id : uuid());
            return _this.identityStore.getAndSync(_this.anonKey);
        };
        this.traits = function (traits) {
            var _a;
            if (_this.options.disable) {
                return;
            }
            if (traits === null) {
                traits = {};
            }
            if (traits) {
                _this.traitsStore.set(_this.traitsKey, traits !== null && traits !== void 0 ? traits : {});
            }
            return (_a = _this.traitsStore.get(_this.traitsKey)) !== null && _a !== void 0 ? _a : {};
        };
        this.options = __assign(__assign({}, defaults), options);
        this.cookieOptions = cookieOptions;
        this.idKey = (_b = (_a = options.cookie) === null || _a === void 0 ? void 0 : _a.key) !== null && _b !== void 0 ? _b : defaults.cookie.key;
        this.traitsKey = (_d = (_c = options.localStorage) === null || _c === void 0 ? void 0 : _c.key) !== null && _d !== void 0 ? _d : defaults.localStorage.key;
        this.anonKey = 'ajs_anonymous_id';
        this.identityStore = this.createStorage(this.options, cookieOptions);
        // using only cookies for legacy user store
        this.legacyUserStore = this.createStorage(this.options, cookieOptions, function (s) { return s === StoreType.Cookie; });
        // using only localStorage / memory for traits store
        this.traitsStore = this.createStorage(this.options, cookieOptions, function (s) { return s !== StoreType.Cookie; });
        var legacyUser = this.legacyUserStore.get(defaults.cookie.oldKey);
        if (legacyUser && typeof legacyUser === 'object') {
            legacyUser.id && this.id(legacyUser.id);
            legacyUser.traits && this.traits(legacyUser.traits);
        }
        autoBind(this);
    }
    User.prototype.legacySIO = function () {
        var val = this.legacyUserStore.get('_sio');
        if (!val) {
            return null;
        }
        var _a = val.split('----'), anon = _a[0], user = _a[1];
        return [anon, user];
    };
    User.prototype.identify = function (id, traits) {
        if (this.options.disable) {
            return;
        }
        traits = traits !== null && traits !== void 0 ? traits : {};
        var currentId = this.id();
        if (currentId === null || currentId === id) {
            traits = __assign(__assign({}, this.traits()), traits);
        }
        if (id) {
            this.id(id);
        }
        this.traits(traits);
    };
    User.prototype.logout = function () {
        this.anonymousId(null);
        this.id(null);
        this.traits({});
    };
    User.prototype.reset = function () {
        this.logout();
        this.identityStore.clear(this.idKey);
        this.identityStore.clear(this.anonKey);
        this.traitsStore.clear(this.traitsKey);
    };
    User.prototype.load = function () {
        return new User(this.options, this.cookieOptions);
    };
    User.prototype.save = function () {
        return true;
    };
    /**
     * Creates the right storage system applying all the user options, cookie options and particular filters
     * @param options UserOptions
     * @param cookieOpts CookieOptions
     * @param filterStores filter function to apply to any StoreTypes (skipped if options specify using a custom storage)
     * @returns a Storage object
     */
    User.prototype.createStorage = function (options, cookieOpts, filterStores) {
        var stores = [
            StoreType.LocalStorage,
            StoreType.Cookie,
            StoreType.Memory,
        ];
        // If disabled we won't have any storage functionality
        if (options.disable) {
            return new UniversalStorage([]);
        }
        // If persistance is disabled we will always fallback to Memory Storage
        if (!options.persist) {
            return new UniversalStorage([new MemoryStorage()]);
        }
        if (options.storage !== undefined && options.storage !== null) {
            if (isArrayOfStoreType(options.storage)) {
                // If the user only specified order of stores we will still apply filters and transformations e.g. not using localStorage if localStorageFallbackDisabled
                stores = options.storage.stores;
            }
        }
        // Disable LocalStorage
        if (options.localStorageFallbackDisabled) {
            stores = stores.filter(function (s) { return s !== StoreType.LocalStorage; });
        }
        // Apply Additional filters
        if (filterStores) {
            stores = stores.filter(filterStores);
        }
        return new UniversalStorage(initializeStorages(applyCookieOptions(stores, cookieOpts)));
    };
    User.defaults = defaults;
    return User;
}());
export { User };
var groupDefaults = {
    persist: true,
    cookie: {
        key: 'ajs_group_id',
    },
    localStorage: {
        key: 'ajs_group_properties',
    },
};
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group(options, cookie) {
        if (options === void 0) { options = groupDefaults; }
        var _this = _super.call(this, __assign(__assign({}, groupDefaults), options), cookie) || this;
        _this.anonymousId = function (_id) {
            return undefined;
        };
        autoBind(_this);
        return _this;
    }
    return Group;
}(User));
export { Group };
//# sourceMappingURL=index.js.map