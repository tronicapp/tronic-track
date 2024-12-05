(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["TronicReceiver"] = factory();
	else
		root["TronicReceiver"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 878:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var obj_case_1 = __importDefault(__webpack_require__(325));
function trait(a, b) {
    return function () {
        var traits = this.traits();
        var props = this.properties ? this.properties() : {};
        return (obj_case_1.default(traits, "address." + a) ||
            obj_case_1.default(traits, a) ||
            (b ? obj_case_1.default(traits, "address." + b) : null) ||
            (b ? obj_case_1.default(traits, b) : null) ||
            obj_case_1.default(props, "address." + a) ||
            obj_case_1.default(props, a) ||
            (b ? obj_case_1.default(props, "address." + b) : null) ||
            (b ? obj_case_1.default(props, b) : null));
    };
}
function default_1(proto) {
    proto.zip = trait("postalCode", "zip");
    proto.country = trait("country");
    proto.street = trait("street");
    proto.state = trait("state");
    proto.city = trait("city");
    proto.region = trait("region");
}
exports["default"] = default_1;
//# sourceMappingURL=address.js.map

/***/ }),

/***/ 780:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Alias = void 0;
var inherits_1 = __importDefault(__webpack_require__(285));
var facade_1 = __webpack_require__(512);
function Alias(dictionary, opts) {
    facade_1.Facade.call(this, dictionary, opts);
}
exports.Alias = Alias;
inherits_1.default(Alias, facade_1.Facade);
Alias.prototype.action = function () {
    return "alias";
};
Alias.prototype.type = Alias.prototype.action;
Alias.prototype.previousId = function () {
    return this.field("previousId") || this.field("from");
};
Alias.prototype.from = Alias.prototype.previousId;
Alias.prototype.userId = function () {
    return this.field("userId") || this.field("to");
};
Alias.prototype.to = Alias.prototype.userId;
//# sourceMappingURL=alias.js.map

/***/ }),

/***/ 814:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.clone = void 0;
function clone(properties) {
    if (typeof properties !== 'object')
        return properties;
    if (Object.prototype.toString.call(properties) === '[object Object]') {
        var temp = {};
        for (var key in properties) {
            if (Object.prototype.hasOwnProperty.call(properties, key)) {
                temp[key] = clone(properties[key]);
            }
        }
        return temp;
    }
    else if (Array.isArray(properties)) {
        return properties.map(clone);
    }
    else {
        return properties;
    }
}
exports.clone = clone;
//# sourceMappingURL=clone.js.map

/***/ }),

/***/ 257:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Delete = void 0;
var inherits_1 = __importDefault(__webpack_require__(285));
var facade_1 = __webpack_require__(512);
function Delete(dictionary, opts) {
    facade_1.Facade.call(this, dictionary, opts);
}
exports.Delete = Delete;
inherits_1.default(Delete, facade_1.Facade);
Delete.prototype.type = function () {
    return "delete";
};
//# sourceMappingURL=delete.js.map

/***/ }),

/***/ 512:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Facade = void 0;
var address_1 = __importDefault(__webpack_require__(878));
var clone_1 = __webpack_require__(814);
var is_enabled_1 = __importDefault(__webpack_require__(272));
var new_date_1 = __importDefault(__webpack_require__(870));
var obj_case_1 = __importDefault(__webpack_require__(325));
var isodate_traverse_1 = __importDefault(__webpack_require__(279));
function Facade(obj, opts) {
    opts = opts || {};
    this.raw = clone_1.clone(obj);
    if (!("clone" in opts))
        opts.clone = true;
    if (opts.clone)
        obj = clone_1.clone(obj);
    if (!("traverse" in opts))
        opts.traverse = true;
    if (!("timestamp" in obj))
        obj.timestamp = new Date();
    else
        obj.timestamp = new_date_1.default(obj.timestamp);
    if (opts.traverse)
        isodate_traverse_1.default(obj);
    this.opts = opts;
    this.obj = obj;
}
exports.Facade = Facade;
var f = Facade.prototype;
f.proxy = function (field) {
    var fields = field.split(".");
    field = fields.shift();
    var obj = this[field] || this.obj[field];
    if (!obj)
        return obj;
    if (typeof obj === "function")
        obj = obj.call(this) || {};
    if (fields.length === 0)
        return this.opts.clone ? transform(obj) : obj;
    obj = obj_case_1.default(obj, fields.join("."));
    return this.opts.clone ? transform(obj) : obj;
};
f.field = function (field) {
    var obj = this.obj[field];
    return this.opts.clone ? transform(obj) : obj;
};
Facade.proxy = function (field) {
    return function () {
        return this.proxy(field);
    };
};
Facade.field = function (field) {
    return function () {
        return this.field(field);
    };
};
Facade.multi = function (path) {
    return function () {
        var multi = this.proxy(path + "s");
        if (Array.isArray(multi))
            return multi;
        var one = this.proxy(path);
        if (one)
            one = [this.opts.clone ? clone_1.clone(one) : one];
        return one || [];
    };
};
Facade.one = function (path) {
    return function () {
        var one = this.proxy(path);
        if (one)
            return one;
        var multi = this.proxy(path + "s");
        if (Array.isArray(multi))
            return multi[0];
    };
};
f.json = function () {
    var ret = this.opts.clone ? clone_1.clone(this.obj) : this.obj;
    if (this.type)
        ret.type = this.type();
    return ret;
};
f.rawEvent = function () {
    return this.raw;
};
f.options = function (integration) {
    var obj = this.obj.options || this.obj.context || {};
    var options = this.opts.clone ? clone_1.clone(obj) : obj;
    if (!integration)
        return options;
    if (!this.enabled(integration))
        return;
    var integrations = this.integrations();
    var value = integrations[integration] || obj_case_1.default(integrations, integration);
    if (typeof value !== "object")
        value = obj_case_1.default(this.options(), integration);
    return typeof value === "object" ? value : {};
};
f.context = f.options;
f.enabled = function (integration) {
    var allEnabled = this.proxy("options.providers.all");
    if (typeof allEnabled !== "boolean")
        allEnabled = this.proxy("options.all");
    if (typeof allEnabled !== "boolean")
        allEnabled = this.proxy("integrations.all");
    if (typeof allEnabled !== "boolean")
        allEnabled = true;
    var enabled = allEnabled && is_enabled_1.default(integration);
    var options = this.integrations();
    if (options.providers && options.providers.hasOwnProperty(integration)) {
        enabled = options.providers[integration];
    }
    if (options.hasOwnProperty(integration)) {
        var settings = options[integration];
        if (typeof settings === "boolean") {
            enabled = settings;
        }
        else {
            enabled = true;
        }
    }
    return !!enabled;
};
f.integrations = function () {
    return (this.obj.integrations || this.proxy("options.providers") || this.options());
};
f.active = function () {
    var active = this.proxy("options.active");
    if (active === null || active === undefined)
        active = true;
    return active;
};
f.anonymousId = function () {
    return this.field("anonymousId") || this.field("sessionId");
};
f.sessionId = f.anonymousId;
f.groupId = Facade.proxy("options.groupId");
f.traits = function (aliases) {
    var ret = this.proxy("options.traits") || {};
    var id = this.userId();
    aliases = aliases || {};
    if (id)
        ret.id = id;
    for (var alias in aliases) {
        if (Object.prototype.hasOwnProperty.call(aliases, alias)) {
            var value = this[alias] == null
                ? this.proxy("options.traits." + alias)
                : this[alias]();
            if (value == null)
                continue;
            ret[aliases[alias]] = value;
            delete ret[alias];
        }
    }
    return ret;
};
f.library = function () {
    var library = this.proxy("options.library");
    if (!library)
        return { name: "unknown", version: null };
    if (typeof library === "string")
        return { name: library, version: null };
    return library;
};
f.device = function () {
    var device = this.proxy("context.device");
    if (typeof device !== "object" || device === null) {
        device = {};
    }
    var library = this.library().name;
    if (device.type)
        return device;
    if (library.indexOf("ios") > -1)
        device.type = "ios";
    if (library.indexOf("android") > -1)
        device.type = "android";
    return device;
};
f.userAgent = Facade.proxy("context.userAgent");
f.timezone = Facade.proxy("context.timezone");
f.timestamp = Facade.field("timestamp");
f.channel = Facade.field("channel");
f.ip = Facade.proxy("context.ip");
f.userId = Facade.field("userId");
address_1.default(f);
function transform(obj) {
    return clone_1.clone(obj);
}
//# sourceMappingURL=facade.js.map

/***/ }),

/***/ 615:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Group = void 0;
var inherits_1 = __importDefault(__webpack_require__(285));
var is_email_1 = __importDefault(__webpack_require__(554));
var new_date_1 = __importDefault(__webpack_require__(870));
var facade_1 = __webpack_require__(512);
function Group(dictionary, opts) {
    facade_1.Facade.call(this, dictionary, opts);
}
exports.Group = Group;
inherits_1.default(Group, facade_1.Facade);
var g = Group.prototype;
g.action = function () {
    return "group";
};
g.type = g.action;
g.groupId = facade_1.Facade.field("groupId");
g.created = function () {
    var created = this.proxy("traits.createdAt") ||
        this.proxy("traits.created") ||
        this.proxy("properties.createdAt") ||
        this.proxy("properties.created");
    if (created)
        return new_date_1.default(created);
};
g.email = function () {
    var email = this.proxy("traits.email");
    if (email)
        return email;
    var groupId = this.groupId();
    if (is_email_1.default(groupId))
        return groupId;
};
g.traits = function (aliases) {
    var ret = this.properties();
    var id = this.groupId();
    aliases = aliases || {};
    if (id)
        ret.id = id;
    for (var alias in aliases) {
        if (Object.prototype.hasOwnProperty.call(aliases, alias)) {
            var value = this[alias] == null
                ? this.proxy("traits." + alias)
                : this[alias]();
            if (value == null)
                continue;
            ret[aliases[alias]] = value;
            delete ret[alias];
        }
    }
    return ret;
};
g.name = facade_1.Facade.proxy("traits.name");
g.industry = facade_1.Facade.proxy("traits.industry");
g.employees = facade_1.Facade.proxy("traits.employees");
g.properties = function () {
    return this.field("traits") || this.field("properties") || {};
};
//# sourceMappingURL=group.js.map

/***/ }),

/***/ 705:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Identify = void 0;
var facade_1 = __webpack_require__(512);
var obj_case_1 = __importDefault(__webpack_require__(325));
var inherits_1 = __importDefault(__webpack_require__(285));
var is_email_1 = __importDefault(__webpack_require__(554));
var new_date_1 = __importDefault(__webpack_require__(870));
var trim = function (str) { return str.trim(); };
function Identify(dictionary, opts) {
    facade_1.Facade.call(this, dictionary, opts);
}
exports.Identify = Identify;
inherits_1.default(Identify, facade_1.Facade);
var i = Identify.prototype;
i.action = function () {
    return "identify";
};
i.type = i.action;
i.traits = function (aliases) {
    var ret = this.field("traits") || {};
    var id = this.userId();
    aliases = aliases || {};
    if (id)
        ret.id = id;
    for (var alias in aliases) {
        var value = this[alias] == null ? this.proxy("traits." + alias) : this[alias]();
        if (value == null)
            continue;
        ret[aliases[alias]] = value;
        if (alias !== aliases[alias])
            delete ret[alias];
    }
    return ret;
};
i.email = function () {
    var email = this.proxy("traits.email");
    if (email)
        return email;
    var userId = this.userId();
    if (is_email_1.default(userId))
        return userId;
};
i.created = function () {
    var created = this.proxy("traits.created") || this.proxy("traits.createdAt");
    if (created)
        return new_date_1.default(created);
};
i.companyCreated = function () {
    var created = this.proxy("traits.company.created") ||
        this.proxy("traits.company.createdAt");
    if (created) {
        return new_date_1.default(created);
    }
};
i.companyName = function () {
    return this.proxy("traits.company.name");
};
i.name = function () {
    var name = this.proxy("traits.name");
    if (typeof name === "string") {
        return trim(name);
    }
    var firstName = this.firstName();
    var lastName = this.lastName();
    if (firstName && lastName) {
        return trim(firstName + " " + lastName);
    }
};
i.firstName = function () {
    var firstName = this.proxy("traits.firstName");
    if (typeof firstName === "string") {
        return trim(firstName);
    }
    var name = this.proxy("traits.name");
    if (typeof name === "string") {
        return trim(name).split(" ")[0];
    }
};
i.lastName = function () {
    var lastName = this.proxy("traits.lastName");
    if (typeof lastName === "string") {
        return trim(lastName);
    }
    var name = this.proxy("traits.name");
    if (typeof name !== "string") {
        return;
    }
    var space = trim(name).indexOf(" ");
    if (space === -1) {
        return;
    }
    return trim(name.substr(space + 1));
};
i.uid = function () {
    return this.userId() || this.username() || this.email();
};
i.description = function () {
    return this.proxy("traits.description") || this.proxy("traits.background");
};
i.age = function () {
    var date = this.birthday();
    var age = obj_case_1.default(this.traits(), "age");
    if (age != null)
        return age;
    if (!(date instanceof Date))
        return;
    var now = new Date();
    return now.getFullYear() - date.getFullYear();
};
i.avatar = function () {
    var traits = this.traits();
    return (obj_case_1.default(traits, "avatar") || obj_case_1.default(traits, "photoUrl") || obj_case_1.default(traits, "avatarUrl"));
};
i.position = function () {
    var traits = this.traits();
    return obj_case_1.default(traits, "position") || obj_case_1.default(traits, "jobTitle");
};
i.username = facade_1.Facade.proxy("traits.username");
i.website = facade_1.Facade.one("traits.website");
i.websites = facade_1.Facade.multi("traits.website");
i.phone = facade_1.Facade.one("traits.phone");
i.phones = facade_1.Facade.multi("traits.phone");
i.address = facade_1.Facade.proxy("traits.address");
i.gender = facade_1.Facade.proxy("traits.gender");
i.birthday = facade_1.Facade.proxy("traits.birthday");
//# sourceMappingURL=identify.js.map

/***/ }),

/***/ 122:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Delete = exports.Screen = exports.Page = exports.Track = exports.Identify = exports.Group = exports.Alias = exports.Facade = void 0;
var facade_1 = __webpack_require__(512);
Object.defineProperty(exports, "Facade", ({ enumerable: true, get: function () { return facade_1.Facade; } }));
var alias_1 = __webpack_require__(780);
Object.defineProperty(exports, "Alias", ({ enumerable: true, get: function () { return alias_1.Alias; } }));
var group_1 = __webpack_require__(615);
Object.defineProperty(exports, "Group", ({ enumerable: true, get: function () { return group_1.Group; } }));
var identify_1 = __webpack_require__(705);
Object.defineProperty(exports, "Identify", ({ enumerable: true, get: function () { return identify_1.Identify; } }));
var track_1 = __webpack_require__(480);
Object.defineProperty(exports, "Track", ({ enumerable: true, get: function () { return track_1.Track; } }));
var page_1 = __webpack_require__(926);
Object.defineProperty(exports, "Page", ({ enumerable: true, get: function () { return page_1.Page; } }));
var screen_1 = __webpack_require__(207);
Object.defineProperty(exports, "Screen", ({ enumerable: true, get: function () { return screen_1.Screen; } }));
var delete_1 = __webpack_require__(257);
Object.defineProperty(exports, "Delete", ({ enumerable: true, get: function () { return delete_1.Delete; } }));
exports["default"] = __assign(__assign({}, facade_1.Facade), { Alias: alias_1.Alias,
    Group: group_1.Group,
    Identify: identify_1.Identify,
    Track: track_1.Track,
    Page: page_1.Page,
    Screen: screen_1.Screen,
    Delete: delete_1.Delete });
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 554:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var matcher = /.+\@.+\..+/;
function isEmail(string) {
    return matcher.test(string);
}
exports["default"] = isEmail;
//# sourceMappingURL=is-email.js.map

/***/ }),

/***/ 272:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var disabled = {
    Salesforce: true,
};
function default_1(integration) {
    return !disabled[integration];
}
exports["default"] = default_1;
//# sourceMappingURL=is-enabled.js.map

/***/ }),

/***/ 926:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Page = void 0;
var inherits_1 = __importDefault(__webpack_require__(285));
var facade_1 = __webpack_require__(512);
var track_1 = __webpack_require__(480);
var is_email_1 = __importDefault(__webpack_require__(554));
function Page(dictionary, opts) {
    facade_1.Facade.call(this, dictionary, opts);
}
exports.Page = Page;
inherits_1.default(Page, facade_1.Facade);
var p = Page.prototype;
p.action = function () {
    return "page";
};
p.type = p.action;
p.category = facade_1.Facade.field("category");
p.name = facade_1.Facade.field("name");
p.title = facade_1.Facade.proxy("properties.title");
p.path = facade_1.Facade.proxy("properties.path");
p.url = facade_1.Facade.proxy("properties.url");
p.referrer = function () {
    return (this.proxy("context.referrer.url") ||
        this.proxy("context.page.referrer") ||
        this.proxy("properties.referrer"));
};
p.properties = function (aliases) {
    var props = this.field("properties") || {};
    var category = this.category();
    var name = this.name();
    aliases = aliases || {};
    if (category)
        props.category = category;
    if (name)
        props.name = name;
    for (var alias in aliases) {
        if (Object.prototype.hasOwnProperty.call(aliases, alias)) {
            var value = this[alias] == null
                ? this.proxy("properties." + alias)
                : this[alias]();
            if (value == null)
                continue;
            props[aliases[alias]] = value;
            if (alias !== aliases[alias])
                delete props[alias];
        }
    }
    return props;
};
p.email = function () {
    var email = this.proxy("context.traits.email") || this.proxy("properties.email");
    if (email)
        return email;
    var userId = this.userId();
    if (is_email_1.default(userId))
        return userId;
};
p.fullName = function () {
    var category = this.category();
    var name = this.name();
    return name && category ? category + " " + name : name;
};
p.event = function (name) {
    return name ? "Viewed " + name + " Page" : "Loaded a Page";
};
p.track = function (name) {
    var json = this.json();
    json.event = this.event(name);
    json.timestamp = this.timestamp();
    json.properties = this.properties();
    return new track_1.Track(json, this.opts);
};
//# sourceMappingURL=page.js.map

/***/ }),

/***/ 207:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Screen = void 0;
var inherits_1 = __importDefault(__webpack_require__(285));
var page_1 = __webpack_require__(926);
var track_1 = __webpack_require__(480);
function Screen(dictionary, opts) {
    page_1.Page.call(this, dictionary, opts);
}
exports.Screen = Screen;
inherits_1.default(Screen, page_1.Page);
Screen.prototype.action = function () {
    return "screen";
};
Screen.prototype.type = Screen.prototype.action;
Screen.prototype.event = function (name) {
    return name ? "Viewed " + name + " Screen" : "Loaded a Screen";
};
Screen.prototype.track = function (name) {
    var json = this.json();
    json.event = this.event(name);
    json.timestamp = this.timestamp();
    json.properties = this.properties();
    return new track_1.Track(json, this.opts);
};
//# sourceMappingURL=screen.js.map

/***/ }),

/***/ 480:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Track = void 0;
var inherits_1 = __importDefault(__webpack_require__(285));
var facade_1 = __webpack_require__(512);
var identify_1 = __webpack_require__(705);
var is_email_1 = __importDefault(__webpack_require__(554));
var obj_case_1 = __importDefault(__webpack_require__(325));
function Track(dictionary, opts) {
    facade_1.Facade.call(this, dictionary, opts);
}
exports.Track = Track;
inherits_1.default(Track, facade_1.Facade);
var t = Track.prototype;
t.action = function () {
    return "track";
};
t.type = t.action;
t.event = facade_1.Facade.field("event");
t.value = facade_1.Facade.proxy("properties.value");
t.category = facade_1.Facade.proxy("properties.category");
t.id = facade_1.Facade.proxy("properties.id");
t.productId = function () {
    return (this.proxy("properties.product_id") || this.proxy("properties.productId"));
};
t.promotionId = function () {
    return (this.proxy("properties.promotion_id") ||
        this.proxy("properties.promotionId"));
};
t.cartId = function () {
    return this.proxy("properties.cart_id") || this.proxy("properties.cartId");
};
t.checkoutId = function () {
    return (this.proxy("properties.checkout_id") || this.proxy("properties.checkoutId"));
};
t.paymentId = function () {
    return (this.proxy("properties.payment_id") || this.proxy("properties.paymentId"));
};
t.couponId = function () {
    return (this.proxy("properties.coupon_id") || this.proxy("properties.couponId"));
};
t.wishlistId = function () {
    return (this.proxy("properties.wishlist_id") || this.proxy("properties.wishlistId"));
};
t.reviewId = function () {
    return (this.proxy("properties.review_id") || this.proxy("properties.reviewId"));
};
t.orderId = function () {
    return (this.proxy("properties.id") ||
        this.proxy("properties.order_id") ||
        this.proxy("properties.orderId"));
};
t.sku = facade_1.Facade.proxy("properties.sku");
t.tax = facade_1.Facade.proxy("properties.tax");
t.name = facade_1.Facade.proxy("properties.name");
t.price = facade_1.Facade.proxy("properties.price");
t.total = facade_1.Facade.proxy("properties.total");
t.repeat = facade_1.Facade.proxy("properties.repeat");
t.coupon = facade_1.Facade.proxy("properties.coupon");
t.shipping = facade_1.Facade.proxy("properties.shipping");
t.discount = facade_1.Facade.proxy("properties.discount");
t.shippingMethod = function () {
    return (this.proxy("properties.shipping_method") ||
        this.proxy("properties.shippingMethod"));
};
t.paymentMethod = function () {
    return (this.proxy("properties.payment_method") ||
        this.proxy("properties.paymentMethod"));
};
t.description = facade_1.Facade.proxy("properties.description");
t.plan = facade_1.Facade.proxy("properties.plan");
t.subtotal = function () {
    var subtotal = obj_case_1.default(this.properties(), "subtotal");
    var total = this.total() || this.revenue();
    if (subtotal)
        return subtotal;
    if (!total)
        return 0;
    if (this.total()) {
        var n = this.tax();
        if (n)
            total -= n;
        n = this.shipping();
        if (n)
            total -= n;
        n = this.discount();
        if (n)
            total += n;
    }
    return total;
};
t.products = function () {
    var props = this.properties();
    var products = obj_case_1.default(props, "products");
    if (Array.isArray(products)) {
        return products.filter(function (item) { return item !== null; });
    }
    return [];
};
t.quantity = function () {
    var props = this.obj.properties || {};
    return props.quantity || 1;
};
t.currency = function () {
    var props = this.obj.properties || {};
    return props.currency || "USD";
};
t.referrer = function () {
    return (this.proxy("context.referrer.url") ||
        this.proxy("context.page.referrer") ||
        this.proxy("properties.referrer"));
};
t.query = facade_1.Facade.proxy("options.query");
t.properties = function (aliases) {
    var ret = this.field("properties") || {};
    aliases = aliases || {};
    for (var alias in aliases) {
        if (Object.prototype.hasOwnProperty.call(aliases, alias)) {
            var value = this[alias] == null
                ? this.proxy("properties." + alias)
                : this[alias]();
            if (value == null)
                continue;
            ret[aliases[alias]] = value;
            delete ret[alias];
        }
    }
    return ret;
};
t.username = function () {
    return (this.proxy("traits.username") ||
        this.proxy("properties.username") ||
        this.userId() ||
        this.sessionId());
};
t.email = function () {
    var email = this.proxy("traits.email") ||
        this.proxy("properties.email") ||
        this.proxy("options.traits.email");
    if (email)
        return email;
    var userId = this.userId();
    if (is_email_1.default(userId))
        return userId;
};
t.revenue = function () {
    var revenue = this.proxy("properties.revenue");
    var event = this.event();
    var orderCompletedRegExp = /^[ _]?completed[ _]?order[ _]?|^[ _]?order[ _]?completed[ _]?$/i;
    if (!revenue && event && event.match(orderCompletedRegExp)) {
        revenue = this.proxy("properties.total");
    }
    return currency(revenue);
};
t.cents = function () {
    var revenue = this.revenue();
    return typeof revenue !== "number" ? this.value() || 0 : revenue * 100;
};
t.identify = function () {
    var json = this.json();
    json.traits = this.traits();
    return new identify_1.Identify(json, this.opts);
};
function currency(val) {
    if (!val)
        return;
    if (typeof val === "number") {
        return val;
    }
    if (typeof val !== "string") {
        return;
    }
    val = val.replace(/\$/g, "");
    val = parseFloat(val);
    if (!isNaN(val)) {
        return val;
    }
}
//# sourceMappingURL=track.js.map

/***/ }),

/***/ 279:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var isodate = __webpack_require__(264);

/**
 * Expose `traverse`.
 */
module.exports = traverse;

/**
 * Recursively traverse an object or array, and convert
 * all ISO date strings parse into Date objects.
 *
 * @param {Object} input - object, array, or string to convert
 * @param {Boolean} strict - only convert strings with year, month, and date
 * @return {Object}
 */
function traverse(input, strict) {
  if (strict === undefined) strict = true;
  if (input && typeof input === 'object') {
    return traverseObject(input, strict);
  } else if (Array.isArray(input)) {
    return traverseArray(input, strict);
  } else if (isodate.is(input, strict)) {
    return isodate.parse(input);
  }
  return input;
}

/**
 * Object traverser helper function.
 *
 * @param {Object} obj - object to traverse
 * @param {Boolean} strict - only convert strings with year, month, and date
 * @return {Object}
 */
function traverseObject(obj, strict) {
  Object.keys(obj).forEach(function(key) {
    obj[key] = traverse(obj[key], strict);
  });
  return obj;
}

/**
 * Array traverser helper function
 *
 * @param {Array} arr - array to traverse
 * @param {Boolean} strict - only convert strings with year, month, and date
 * @return {Array}
 */
function traverseArray(arr, strict) {
  arr.forEach(function(value, index) {
    arr[index] = traverse(value, strict);
  });
  return arr;
}


/***/ }),

/***/ 264:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


/**
 * Matcher, slightly modified from:
 *
 * https://github.com/csnover/js-iso8601/blob/lax/iso8601.js
 */

var matcher = /^(\d{4})(?:-?(\d{2})(?:-?(\d{2}))?)?(?:([ T])(\d{2}):?(\d{2})(?::?(\d{2})(?:[,\.](\d{1,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?)?)?$/;

/**
 * Convert an ISO date string to a date. Fallback to native `Date.parse`.
 *
 * https://github.com/csnover/js-iso8601/blob/lax/iso8601.js
 *
 * @param {String} iso
 * @return {Date}
 */

exports.parse = function(iso) {
  var numericKeys = [1, 5, 6, 7, 11, 12];
  var arr = matcher.exec(iso);
  var offset = 0;

  // fallback to native parsing
  if (!arr) {
    return new Date(iso);
  }

  /* eslint-disable no-cond-assign */
  // remove undefined values
  for (var i = 0, val; val = numericKeys[i]; i++) {
    arr[val] = parseInt(arr[val], 10) || 0;
  }
  /* eslint-enable no-cond-assign */

  // allow undefined days and months
  arr[2] = parseInt(arr[2], 10) || 1;
  arr[3] = parseInt(arr[3], 10) || 1;

  // month is 0-11
  arr[2]--;

  // allow abitrary sub-second precision
  arr[8] = arr[8] ? (arr[8] + '00').substring(0, 3) : 0;

  // apply timezone if one exists
  if (arr[4] === ' ') {
    offset = new Date().getTimezoneOffset();
  } else if (arr[9] !== 'Z' && arr[10]) {
    offset = arr[11] * 60 + arr[12];
    if (arr[10] === '+') {
      offset = 0 - offset;
    }
  }

  var millis = Date.UTC(arr[1], arr[2], arr[3], arr[5], arr[6] + offset, arr[7], arr[8]);
  return new Date(millis);
};


/**
 * Checks whether a `string` is an ISO date string. `strict` mode requires that
 * the date string at least have a year, month and date.
 *
 * @param {String} string
 * @param {Boolean} strict
 * @return {Boolean}
 */

exports.is = function(string, strict) {
  if (typeof string !== 'string') {
    return false;
  }
  if (strict && (/^\d{4}-\d{2}-\d{2}/).test(string) === false) {
    return false;
  }
  return matcher.test(string);
};


/***/ }),

/***/ 285:
/***/ (function(module) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ 870:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var isodate = __webpack_require__(264);
var milliseconds = __webpack_require__(228);
var seconds = __webpack_require__(76);

var objProto = Object.prototype;
var toStr = objProto.toString;

function isDate(value) {
  return toStr.call(value) === "[object Date]";
}

function isNumber(value) {
  return toStr.call(value) === "[object Number]";
}

/**
 * Returns a new Javascript Date object, allowing a variety of extra input types
 * over the native Date constructor.
 *
 * @param {Date|string|number} val
 */
module.exports = function newDate(val) {
  if (isDate(val)) return val;
  if (isNumber(val)) return new Date(toMs(val));

  // date strings
  if (isodate.is(val)) {
    return isodate.parse(val);
  }
  if (milliseconds.is(val)) {
    return milliseconds.parse(val);
  }
  if (seconds.is(val)) {
    return seconds.parse(val);
  }

  // fallback to Date.parse
  return new Date(val);
};

/**
 * If the number passed val is seconds from the epoch, turn it into milliseconds.
 * Milliseconds would be greater than 31557600000 (December 31, 1970).
 *
 * @param {number} num
 */
function toMs(num) {
  if (num < 31557600000) return num * 1000;
  return num;
}


/***/ }),

/***/ 228:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


/**
 * Matcher.
 */

var matcher = /\d{13}/;

/**
 * Check whether a string is a millisecond date string.
 *
 * @param {string} string
 * @return {boolean}
 */
exports.is = function (string) {
  return matcher.test(string);
};

/**
 * Convert a millisecond string to a date.
 *
 * @param {string} millis
 * @return {Date}
 */
exports.parse = function (millis) {
  millis = parseInt(millis, 10);
  return new Date(millis);
};


/***/ }),

/***/ 76:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


/**
 * Matcher.
 */

var matcher = /\d{10}/;

/**
 * Check whether a string is a second date string.
 *
 * @param {string} string
 * @return {Boolean}
 */
exports.is = function (string) {
  return matcher.test(string);
};

/**
 * Convert a second string to a date.
 *
 * @param {string} seconds
 * @return {Date}
 */
exports.parse = function (seconds) {
  var millis = parseInt(seconds, 10) * 1000;
  return new Date(millis);
};


/***/ }),

/***/ 325:
/***/ (function(module) {


var identity = function(_){ return _; };


/**
 * Module exports, export
 */

module.exports = multiple(find);
module.exports.find = module.exports;


/**
 * Export the replacement function, return the modified object
 */

module.exports.replace = function (obj, key, val, options) {
  multiple(replace).call(this, obj, key, val, options);
  return obj;
};


/**
 * Export the delete function, return the modified object
 */

module.exports.del = function (obj, key, options) {
  multiple(del).call(this, obj, key, null, options);
  return obj;
};


/**
 * Compose applying the function to a nested key
 */

function multiple (fn) {
  return function (obj, path, val, options) {
    var normalize = options && isFunction(options.normalizer) ? options.normalizer : defaultNormalize;
    path = normalize(path);

    var key;
    var finished = false;

    while (!finished) loop();

    function loop() {
      for (key in obj) {
        var normalizedKey = normalize(key);
        if (0 === path.indexOf(normalizedKey)) {
          var temp = path.substr(normalizedKey.length);
          if (temp.charAt(0) === '.' || temp.length === 0) {
            path = temp.substr(1);
            var child = obj[key];

            // we're at the end and there is nothing.
            if (null == child) {
              finished = true;
              return;
            }

            // we're at the end and there is something.
            if (!path.length) {
              finished = true;
              return;
            }

            // step into child
            obj = child;

            // but we're done here
            return;
          }
        }
      }

      key = undefined;
      // if we found no matching properties
      // on the current object, there's no match.
      finished = true;
    }

    if (!key) return;
    if (null == obj) return obj;

    // the `obj` and `key` is one above the leaf object and key, so
    // start object: { a: { 'b.c': 10 } }
    // end object: { 'b.c': 10 }
    // end key: 'b.c'
    // this way, you can do `obj[key]` and get `10`.
    return fn(obj, key, val);
  };
}


/**
 * Find an object by its key
 *
 * find({ first_name : 'Calvin' }, 'firstName')
 */

function find (obj, key) {
  if (obj.hasOwnProperty(key)) return obj[key];
}


/**
 * Delete a value for a given key
 *
 * del({ a : 'b', x : 'y' }, 'X' }) -> { a : 'b' }
 */

function del (obj, key) {
  if (obj.hasOwnProperty(key)) delete obj[key];
  return obj;
}


/**
 * Replace an objects existing value with a new one
 *
 * replace({ a : 'b' }, 'a', 'c') -> { a : 'c' }
 */

function replace (obj, key, val) {
  if (obj.hasOwnProperty(key)) obj[key] = val;
  return obj;
}

/**
 * Normalize a `dot.separated.path`.
 *
 * A.HELL(!*&#(!)O_WOR   LD.bar => ahelloworldbar
 *
 * @param {String} path
 * @return {String}
 */

function defaultNormalize(path) {
  return path.replace(/[^a-zA-Z0-9\.]+/g, '').toLowerCase();
}

/**
 * Check if a value is a function.
 *
 * @param {*} val
 * @return {boolean} Returns `true` if `val` is a function, otherwise `false`.
 */

function isFunction(val) {
  return typeof val === 'function';
}


/***/ }),

/***/ 791:
/***/ (function(module) {

(function (factory) {
    if (true) {
        // Node/CommonJS
        module.exports = factory();
    } else { var glob; }
}(function (undefined) {

    'use strict';

    /*
     * Fastest md5 implementation around (JKM md5).
     * Credits: Joseph Myers
     *
     * @see http://www.myersdaily.org/joseph/javascript/md5-text.html
     * @see http://jsperf.com/md5-shootout/7
     */

    /* this function is much faster,
      so if possible we use it. Some IEs
      are the only ones I know of that
      need the idiotic second function,
      generated by an if clause.  */
    var add32 = function (a, b) {
        return (a + b) & 0xFFFFFFFF;
    },
        hex_chr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];


    function cmn(q, a, b, x, s, t) {
        a = add32(add32(a, q), add32(x, t));
        return add32((a << s) | (a >>> (32 - s)), b);
    }

    function md5cycle(x, k) {
        var a = x[0],
            b = x[1],
            c = x[2],
            d = x[3];

        a += (b & c | ~b & d) + k[0] - 680876936 | 0;
        a  = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[1] - 389564586 | 0;
        d  = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[2] + 606105819 | 0;
        c  = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[3] - 1044525330 | 0;
        b  = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[4] - 176418897 | 0;
        a  = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[5] + 1200080426 | 0;
        d  = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[6] - 1473231341 | 0;
        c  = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[7] - 45705983 | 0;
        b  = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[8] + 1770035416 | 0;
        a  = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[9] - 1958414417 | 0;
        d  = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[10] - 42063 | 0;
        c  = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[11] - 1990404162 | 0;
        b  = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[12] + 1804603682 | 0;
        a  = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[13] - 40341101 | 0;
        d  = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[14] - 1502002290 | 0;
        c  = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[15] + 1236535329 | 0;
        b  = (b << 22 | b >>> 10) + c | 0;

        a += (b & d | c & ~d) + k[1] - 165796510 | 0;
        a  = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[6] - 1069501632 | 0;
        d  = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[11] + 643717713 | 0;
        c  = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[0] - 373897302 | 0;
        b  = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[5] - 701558691 | 0;
        a  = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[10] + 38016083 | 0;
        d  = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[15] - 660478335 | 0;
        c  = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[4] - 405537848 | 0;
        b  = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[9] + 568446438 | 0;
        a  = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[14] - 1019803690 | 0;
        d  = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[3] - 187363961 | 0;
        c  = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[8] + 1163531501 | 0;
        b  = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[13] - 1444681467 | 0;
        a  = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[2] - 51403784 | 0;
        d  = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[7] + 1735328473 | 0;
        c  = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[12] - 1926607734 | 0;
        b  = (b << 20 | b >>> 12) + c | 0;

        a += (b ^ c ^ d) + k[5] - 378558 | 0;
        a  = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[8] - 2022574463 | 0;
        d  = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[11] + 1839030562 | 0;
        c  = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[14] - 35309556 | 0;
        b  = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[1] - 1530992060 | 0;
        a  = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[4] + 1272893353 | 0;
        d  = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[7] - 155497632 | 0;
        c  = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[10] - 1094730640 | 0;
        b  = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[13] + 681279174 | 0;
        a  = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[0] - 358537222 | 0;
        d  = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[3] - 722521979 | 0;
        c  = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[6] + 76029189 | 0;
        b  = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[9] - 640364487 | 0;
        a  = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[12] - 421815835 | 0;
        d  = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[15] + 530742520 | 0;
        c  = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[2] - 995338651 | 0;
        b  = (b << 23 | b >>> 9) + c | 0;

        a += (c ^ (b | ~d)) + k[0] - 198630844 | 0;
        a  = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[7] + 1126891415 | 0;
        d  = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[14] - 1416354905 | 0;
        c  = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[5] - 57434055 | 0;
        b  = (b << 21 |b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[12] + 1700485571 | 0;
        a  = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[3] - 1894986606 | 0;
        d  = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[10] - 1051523 | 0;
        c  = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[1] - 2054922799 | 0;
        b  = (b << 21 |b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[8] + 1873313359 | 0;
        a  = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[15] - 30611744 | 0;
        d  = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[6] - 1560198380 | 0;
        c  = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[13] + 1309151649 | 0;
        b  = (b << 21 |b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[4] - 145523070 | 0;
        a  = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[11] - 1120210379 | 0;
        d  = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[2] + 718787259 | 0;
        c  = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[9] - 343485551 | 0;
        b  = (b << 21 | b >>> 11) + c | 0;

        x[0] = a + x[0] | 0;
        x[1] = b + x[1] | 0;
        x[2] = c + x[2] | 0;
        x[3] = d + x[3] | 0;
    }

    function md5blk(s) {
        var md5blks = [],
            i; /* Andy King said do it this way. */

        for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
        }
        return md5blks;
    }

    function md5blk_array(a) {
        var md5blks = [],
            i; /* Andy King said do it this way. */

        for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = a[i] + (a[i + 1] << 8) + (a[i + 2] << 16) + (a[i + 3] << 24);
        }
        return md5blks;
    }

    function md51(s) {
        var n = s.length,
            state = [1732584193, -271733879, -1732584194, 271733878],
            i,
            length,
            tail,
            tmp,
            lo,
            hi;

        for (i = 64; i <= n; i += 64) {
            md5cycle(state, md5blk(s.substring(i - 64, i)));
        }
        s = s.substring(i - 64);
        length = s.length;
        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
        }
        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i += 1) {
                tail[i] = 0;
            }
        }

        // Beware that the final length might not fit in 32 bits so we take care of that
        tmp = n * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;

        tail[14] = lo;
        tail[15] = hi;

        md5cycle(state, tail);
        return state;
    }

    function md51_array(a) {
        var n = a.length,
            state = [1732584193, -271733879, -1732584194, 271733878],
            i,
            length,
            tail,
            tmp,
            lo,
            hi;

        for (i = 64; i <= n; i += 64) {
            md5cycle(state, md5blk_array(a.subarray(i - 64, i)));
        }

        // Not sure if it is a bug, however IE10 will always produce a sub array of length 1
        // containing the last element of the parent array if the sub array specified starts
        // beyond the length of the parent array - weird.
        // https://connect.microsoft.com/IE/feedback/details/771452/typed-array-subarray-issue
        a = (i - 64) < n ? a.subarray(i - 64) : new Uint8Array(0);

        length = a.length;
        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= a[i] << ((i % 4) << 3);
        }

        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i += 1) {
                tail[i] = 0;
            }
        }

        // Beware that the final length might not fit in 32 bits so we take care of that
        tmp = n * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;

        tail[14] = lo;
        tail[15] = hi;

        md5cycle(state, tail);

        return state;
    }

    function rhex(n) {
        var s = '',
            j;
        for (j = 0; j < 4; j += 1) {
            s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
        }
        return s;
    }

    function hex(x) {
        var i;
        for (i = 0; i < x.length; i += 1) {
            x[i] = rhex(x[i]);
        }
        return x.join('');
    }

    // In some cases the fast add32 function cannot be used..
    if (hex(md51('hello')) !== '5d41402abc4b2a76b9719d911017c592') {
        add32 = function (x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF),
                msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        };
    }

    // ---------------------------------------------------

    /**
     * ArrayBuffer slice polyfill.
     *
     * @see https://github.com/ttaubert/node-arraybuffer-slice
     */

    if (typeof ArrayBuffer !== 'undefined' && !ArrayBuffer.prototype.slice) {
        (function () {
            function clamp(val, length) {
                val = (val | 0) || 0;

                if (val < 0) {
                    return Math.max(val + length, 0);
                }

                return Math.min(val, length);
            }

            ArrayBuffer.prototype.slice = function (from, to) {
                var length = this.byteLength,
                    begin = clamp(from, length),
                    end = length,
                    num,
                    target,
                    targetArray,
                    sourceArray;

                if (to !== undefined) {
                    end = clamp(to, length);
                }

                if (begin > end) {
                    return new ArrayBuffer(0);
                }

                num = end - begin;
                target = new ArrayBuffer(num);
                targetArray = new Uint8Array(target);

                sourceArray = new Uint8Array(this, begin, num);
                targetArray.set(sourceArray);

                return target;
            };
        })();
    }

    // ---------------------------------------------------

    /**
     * Helpers.
     */

    function toUtf8(str) {
        if (/[\u0080-\uFFFF]/.test(str)) {
            str = unescape(encodeURIComponent(str));
        }

        return str;
    }

    function utf8Str2ArrayBuffer(str, returnUInt8Array) {
        var length = str.length,
           buff = new ArrayBuffer(length),
           arr = new Uint8Array(buff),
           i;

        for (i = 0; i < length; i += 1) {
            arr[i] = str.charCodeAt(i);
        }

        return returnUInt8Array ? arr : buff;
    }

    function arrayBuffer2Utf8Str(buff) {
        return String.fromCharCode.apply(null, new Uint8Array(buff));
    }

    function concatenateArrayBuffers(first, second, returnUInt8Array) {
        var result = new Uint8Array(first.byteLength + second.byteLength);

        result.set(new Uint8Array(first));
        result.set(new Uint8Array(second), first.byteLength);

        return returnUInt8Array ? result : result.buffer;
    }

    function hexToBinaryString(hex) {
        var bytes = [],
            length = hex.length,
            x;

        for (x = 0; x < length - 1; x += 2) {
            bytes.push(parseInt(hex.substr(x, 2), 16));
        }

        return String.fromCharCode.apply(String, bytes);
    }

    // ---------------------------------------------------

    /**
     * SparkMD5 OOP implementation.
     *
     * Use this class to perform an incremental md5, otherwise use the
     * static methods instead.
     */

    function SparkMD5() {
        // call reset to init the instance
        this.reset();
    }

    /**
     * Appends a string.
     * A conversion will be applied if an utf8 string is detected.
     *
     * @param {String} str The string to be appended
     *
     * @return {SparkMD5} The instance itself
     */
    SparkMD5.prototype.append = function (str) {
        // Converts the string to utf8 bytes if necessary
        // Then append as binary
        this.appendBinary(toUtf8(str));

        return this;
    };

    /**
     * Appends a binary string.
     *
     * @param {String} contents The binary string to be appended
     *
     * @return {SparkMD5} The instance itself
     */
    SparkMD5.prototype.appendBinary = function (contents) {
        this._buff += contents;
        this._length += contents.length;

        var length = this._buff.length,
            i;

        for (i = 64; i <= length; i += 64) {
            md5cycle(this._hash, md5blk(this._buff.substring(i - 64, i)));
        }

        this._buff = this._buff.substring(i - 64);

        return this;
    };

    /**
     * Finishes the incremental computation, reseting the internal state and
     * returning the result.
     *
     * @param {Boolean} raw True to get the raw string, false to get the hex string
     *
     * @return {String} The result
     */
    SparkMD5.prototype.end = function (raw) {
        var buff = this._buff,
            length = buff.length,
            i,
            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ret;

        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= buff.charCodeAt(i) << ((i % 4) << 3);
        }

        this._finish(tail, length);
        ret = hex(this._hash);

        if (raw) {
            ret = hexToBinaryString(ret);
        }

        this.reset();

        return ret;
    };

    /**
     * Resets the internal state of the computation.
     *
     * @return {SparkMD5} The instance itself
     */
    SparkMD5.prototype.reset = function () {
        this._buff = '';
        this._length = 0;
        this._hash = [1732584193, -271733879, -1732584194, 271733878];

        return this;
    };

    /**
     * Gets the internal state of the computation.
     *
     * @return {Object} The state
     */
    SparkMD5.prototype.getState = function () {
        return {
            buff: this._buff,
            length: this._length,
            hash: this._hash.slice()
        };
    };

    /**
     * Gets the internal state of the computation.
     *
     * @param {Object} state The state
     *
     * @return {SparkMD5} The instance itself
     */
    SparkMD5.prototype.setState = function (state) {
        this._buff = state.buff;
        this._length = state.length;
        this._hash = state.hash;

        return this;
    };

    /**
     * Releases memory used by the incremental buffer and other additional
     * resources. If you plan to use the instance again, use reset instead.
     */
    SparkMD5.prototype.destroy = function () {
        delete this._hash;
        delete this._buff;
        delete this._length;
    };

    /**
     * Finish the final calculation based on the tail.
     *
     * @param {Array}  tail   The tail (will be modified)
     * @param {Number} length The length of the remaining buffer
     */
    SparkMD5.prototype._finish = function (tail, length) {
        var i = length,
            tmp,
            lo,
            hi;

        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(this._hash, tail);
            for (i = 0; i < 16; i += 1) {
                tail[i] = 0;
            }
        }

        // Do the final computation based on the tail and length
        // Beware that the final length may not fit in 32 bits so we take care of that
        tmp = this._length * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;

        tail[14] = lo;
        tail[15] = hi;
        md5cycle(this._hash, tail);
    };

    /**
     * Performs the md5 hash on a string.
     * A conversion will be applied if utf8 string is detected.
     *
     * @param {String}  str The string
     * @param {Boolean} [raw] True to get the raw string, false to get the hex string
     *
     * @return {String} The result
     */
    SparkMD5.hash = function (str, raw) {
        // Converts the string to utf8 bytes if necessary
        // Then compute it using the binary function
        return SparkMD5.hashBinary(toUtf8(str), raw);
    };

    /**
     * Performs the md5 hash on a binary string.
     *
     * @param {String}  content The binary string
     * @param {Boolean} [raw]     True to get the raw string, false to get the hex string
     *
     * @return {String} The result
     */
    SparkMD5.hashBinary = function (content, raw) {
        var hash = md51(content),
            ret = hex(hash);

        return raw ? hexToBinaryString(ret) : ret;
    };

    // ---------------------------------------------------

    /**
     * SparkMD5 OOP implementation for array buffers.
     *
     * Use this class to perform an incremental md5 ONLY for array buffers.
     */
    SparkMD5.ArrayBuffer = function () {
        // call reset to init the instance
        this.reset();
    };

    /**
     * Appends an array buffer.
     *
     * @param {ArrayBuffer} arr The array to be appended
     *
     * @return {SparkMD5.ArrayBuffer} The instance itself
     */
    SparkMD5.ArrayBuffer.prototype.append = function (arr) {
        var buff = concatenateArrayBuffers(this._buff.buffer, arr, true),
            length = buff.length,
            i;

        this._length += arr.byteLength;

        for (i = 64; i <= length; i += 64) {
            md5cycle(this._hash, md5blk_array(buff.subarray(i - 64, i)));
        }

        this._buff = (i - 64) < length ? new Uint8Array(buff.buffer.slice(i - 64)) : new Uint8Array(0);

        return this;
    };

    /**
     * Finishes the incremental computation, reseting the internal state and
     * returning the result.
     *
     * @param {Boolean} raw True to get the raw string, false to get the hex string
     *
     * @return {String} The result
     */
    SparkMD5.ArrayBuffer.prototype.end = function (raw) {
        var buff = this._buff,
            length = buff.length,
            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            i,
            ret;

        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= buff[i] << ((i % 4) << 3);
        }

        this._finish(tail, length);
        ret = hex(this._hash);

        if (raw) {
            ret = hexToBinaryString(ret);
        }

        this.reset();

        return ret;
    };

    /**
     * Resets the internal state of the computation.
     *
     * @return {SparkMD5.ArrayBuffer} The instance itself
     */
    SparkMD5.ArrayBuffer.prototype.reset = function () {
        this._buff = new Uint8Array(0);
        this._length = 0;
        this._hash = [1732584193, -271733879, -1732584194, 271733878];

        return this;
    };

    /**
     * Gets the internal state of the computation.
     *
     * @return {Object} The state
     */
    SparkMD5.ArrayBuffer.prototype.getState = function () {
        var state = SparkMD5.prototype.getState.call(this);

        // Convert buffer to a string
        state.buff = arrayBuffer2Utf8Str(state.buff);

        return state;
    };

    /**
     * Gets the internal state of the computation.
     *
     * @param {Object} state The state
     *
     * @return {SparkMD5.ArrayBuffer} The instance itself
     */
    SparkMD5.ArrayBuffer.prototype.setState = function (state) {
        // Convert string to buffer
        state.buff = utf8Str2ArrayBuffer(state.buff, true);

        return SparkMD5.prototype.setState.call(this, state);
    };

    SparkMD5.ArrayBuffer.prototype.destroy = SparkMD5.prototype.destroy;

    SparkMD5.ArrayBuffer.prototype._finish = SparkMD5.prototype._finish;

    /**
     * Performs the md5 hash on an array buffer.
     *
     * @param {ArrayBuffer} arr The array buffer
     * @param {Boolean}     [raw] True to get the raw string, false to get the hex one
     *
     * @return {String} The result
     */
    SparkMD5.ArrayBuffer.hash = function (arr, raw) {
        var hash = md51_array(new Uint8Array(arr)),
            ret = hex(hash);

        return raw ? hexToBinaryString(ret) : ret;
    };

    return SparkMD5;
}));


/***/ }),

/***/ 863:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: function() { return /* binding */ gracefulDecodeURIComponent; }
/* harmony export */ });
/**
 * Tries to gets the unencoded version of an encoded component of a
 * Uniform Resource Identifier (URI). If input string is malformed,
 * returns it back as-is.
 *
 * Note: All occurences of the `+` character become ` ` (spaces).
 **/
function gracefulDecodeURIComponent(encodedURIComponent) {
    try {
        return decodeURIComponent(encodedURIComponent.replace(/\+/g, ' '));
    }
    catch (_a) {
        return encodedURIComponent;
    }
}


/***/ }),

/***/ 950:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: function() { return /* binding */ toFacade; }
/* harmony export */ });
/* harmony import */ var _segment_facade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(122);
/* harmony import */ var _segment_facade__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_segment_facade__WEBPACK_IMPORTED_MODULE_0__);

function toFacade(evt, options) {
    var fcd = new _segment_facade__WEBPACK_IMPORTED_MODULE_0__.Facade(evt, options);
    if (evt.type === 'track') {
        fcd = new _segment_facade__WEBPACK_IMPORTED_MODULE_0__.Track(evt, options);
    }
    if (evt.type === 'identify') {
        fcd = new _segment_facade__WEBPACK_IMPORTED_MODULE_0__.Identify(evt, options);
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


/***/ }),

/***/ 338:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyDestinationMiddleware: function() { return /* binding */ applyDestinationMiddleware; },
/* harmony export */   sourceMiddlewarePlugin: function() { return /* binding */ sourceMiddlewarePlugin; }
/* harmony export */ });
/* harmony import */ var _core_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(494);
/* harmony import */ var _lib_to_facade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(950);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


function applyDestinationMiddleware(destination, evt, middleware) {
    return __awaiter(this, void 0, Promise, function () {
        function applyMiddleware(event, fn) {
            return __awaiter(this, void 0, Promise, function () {
                var nextCalled, returnedEvent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            nextCalled = false;
                            returnedEvent = null;
                            return [4 /*yield*/, fn({
                                    payload: (0,_lib_to_facade__WEBPACK_IMPORTED_MODULE_0__/* .toFacade */ .D)(event, {
                                        clone: true,
                                        traverse: false,
                                    }),
                                    // integration: destination,
                                    next: function (evt) {
                                        nextCalled = true;
                                        if (evt === null) {
                                            returnedEvent = null;
                                        }
                                        if (evt) {
                                            returnedEvent = evt.obj;
                                        }
                                    },
                                })];
                        case 1:
                            _a.sent();
                            if (!nextCalled && returnedEvent !== null) {
                                returnedEvent = returnedEvent;
                                /*
                              returnedEvent.integrations = {
                                ...event.integrations,
                                [destination]: false,
                              }
                                 */
                            }
                            return [2 /*return*/, returnedEvent];
                    }
                });
            });
        }
        var modifiedEvent, _i, middleware_1, md, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    modifiedEvent = (0,_lib_to_facade__WEBPACK_IMPORTED_MODULE_0__/* .toFacade */ .D)(evt, {
                        clone: true,
                        traverse: false,
                    }).rawEvent();
                    _i = 0, middleware_1 = middleware;
                    _a.label = 1;
                case 1:
                    if (!(_i < middleware_1.length)) return [3 /*break*/, 4];
                    md = middleware_1[_i];
                    return [4 /*yield*/, applyMiddleware(modifiedEvent, md)];
                case 2:
                    result = _a.sent();
                    if (result === null) {
                        return [2 /*return*/, null];
                    }
                    modifiedEvent = result;
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, modifiedEvent];
            }
        });
    });
}
function sourceMiddlewarePlugin(fn) {
    function apply(ctx) {
        return __awaiter(this, void 0, Promise, function () {
            var nextCalled;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nextCalled = false;
                        return [4 /*yield*/, fn({
                                payload: (0,_lib_to_facade__WEBPACK_IMPORTED_MODULE_0__/* .toFacade */ .D)(ctx.event, {
                                    clone: true,
                                    traverse: false,
                                }),
                                // integrations: integrations ?? {},
                                next: function (evt) {
                                    nextCalled = true;
                                    if (evt) {
                                        ctx.event = evt.obj;
                                    }
                                },
                            })];
                    case 1:
                        _a.sent();
                        if (!nextCalled) {
                            throw new _core_context__WEBPACK_IMPORTED_MODULE_1__/* .ContextCancelation */ .Y({
                                retry: false,
                                type: 'middleware_cancellation',
                                reason: 'Middleware `next` function skipped',
                            });
                        }
                        return [2 /*return*/, ctx];
                }
            });
        });
    }
    return {
        name: "Source Middleware ".concat(fn.name),
        type: 'before',
        version: '0.1.0',
        isLoaded: function () { return true; },
        load: function (ctx) { return Promise.resolve(ctx); },
        track: apply,
        identify: apply,
    };
}


/***/ }),

/***/ 888:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FJ: function() { return /* binding */ pTimeout; },
/* harmony export */   UI: function() { return /* binding */ invokeCallback; }
/* harmony export */ });
/* unused harmony export sleep */
function pTimeout(promise, timeout) {
    return new Promise(function (resolve, reject) {
        var timeoutId = setTimeout(function () {
            reject(Error('Promise timed out'));
        }, timeout);
        promise
            .then(function (val) {
            clearTimeout(timeoutId);
            return resolve(val);
        })
            .catch(reject);
    });
}
function sleep(timeoutInMs) {
    return new Promise(function (resolve) { return setTimeout(resolve, timeoutInMs); });
}
/**
 * @param ctx
 * @param callback - the function to invoke
 * @param delay - aka "timeout". The amount of time in ms to wait before invoking the callback.
 */
function invokeCallback(ctx, callback, delay) {
    var cb = function () {
        try {
            return Promise.resolve(callback(ctx));
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    return (sleep(delay)
        // pTimeout ensures that the callback can't cause the context to hang
        .then(function () { return pTimeout(cb(), 1000); })
        .catch(function (err) {
        ctx === null || ctx === void 0 ? void 0 : ctx.log('warn', 'Callback Error', { error: err });
        ctx === null || ctx === void 0 ? void 0 : ctx.stats.increment('callback_error');
    })
        .then(function () { return ctx; }));
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 494:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Y: function() { return /* binding */ ContextCancelation; },
  _: function() { return /* binding */ CoreContext; }
});

// EXTERNAL MODULE: ../../node_modules/@lukeed/uuid/dist/index.mjs
var dist = __webpack_require__(831);
// EXTERNAL MODULE: ../../node_modules/dset/dist/index.mjs
var dset_dist = __webpack_require__(380);
;// CONCATENATED MODULE: ../core/dist/esm/logger/index.js
var __assign = (undefined && undefined.__assign) || function () {
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
var CoreLogger = /** @class */ (function () {
    function CoreLogger() {
        this._logs = [];
    }
    CoreLogger.prototype.log = function (level, message, extras) {
        var time = new Date();
        this._logs.push({
            level: level,
            message: message,
            time: time,
            extras: extras,
        });
    };
    Object.defineProperty(CoreLogger.prototype, "logs", {
        get: function () {
            return this._logs;
        },
        enumerable: false,
        configurable: true
    });
    CoreLogger.prototype.flush = function () {
        if (this.logs.length > 1) {
            var formatted = this._logs.reduce(function (logs, log) {
                var _a;
                var _b, _c;
                var line = __assign(__assign({}, log), { json: JSON.stringify(log.extras, null, ' '), extras: log.extras });
                delete line['time'];
                var key = (_c = (_b = log.time) === null || _b === void 0 ? void 0 : _b.toISOString()) !== null && _c !== void 0 ? _c : '';
                if (logs[key]) {
                    key = "".concat(key, "-").concat(Math.random());
                }
                return __assign(__assign({}, logs), (_a = {}, _a[key] = line, _a));
            }, {});
            // ie doesn't like console.table
            if (console.table) {
                console.table(formatted);
            }
            else {
                console.log(formatted);
            }
        }
        else {
            this.logs.forEach(function (logEntry) {
                var level = logEntry.level, message = logEntry.message, extras = logEntry.extras;
                if (level === 'info' || level === 'debug') {
                    console.log(message, extras !== null && extras !== void 0 ? extras : '');
                }
                else {
                    console[level](message, extras !== null && extras !== void 0 ? extras : '');
                }
            });
        }
        this._logs = [];
    };
    return CoreLogger;
}());

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../core/dist/esm/stats/index.js
var esm_stats = __webpack_require__(417);
;// CONCATENATED MODULE: ../core/dist/esm/context/index.js




var ContextCancelation = /** @class */ (function () {
    function ContextCancelation(options) {
        var _a, _b, _c;
        this.retry = (_a = options.retry) !== null && _a !== void 0 ? _a : true;
        this.type = (_b = options.type) !== null && _b !== void 0 ? _b : 'plugin Error';
        this.reason = (_c = options.reason) !== null && _c !== void 0 ? _c : '';
    }
    return ContextCancelation;
}());

var CoreContext = /** @class */ (function () {
    function CoreContext(event, id, stats, logger) {
        if (id === void 0) { id = (0,dist.v4)(); }
        if (stats === void 0) { stats = new esm_stats/* NullStats */.i(); }
        if (logger === void 0) { logger = new CoreLogger(); }
        this.attempts = 0;
        this.event = event;
        this._id = id;
        this.logger = logger;
        this.stats = stats;
    }
    CoreContext.system = function () {
        // This should be overridden by the subclass to return an instance of the subclass.
    };
    CoreContext.prototype.isSame = function (other) {
        return other.id === this.id;
    };
    CoreContext.prototype.cancel = function (error) {
        if (error) {
            throw error;
        }
        throw new ContextCancelation({ reason: 'Context Cancel' });
    };
    CoreContext.prototype.log = function (level, message, extras) {
        this.logger.log(level, message, extras);
    };
    Object.defineProperty(CoreContext.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    CoreContext.prototype.updateEvent = function (path, val) {
        // Don't allow integrations that are set to false to be overwritten with integration settings.
        /*
        if (path.split('.')[0] === 'integrations') {
          const integrationName = path.split('.')[1]
    
          if (this.event.integrations?.[integrationName] === false) {
            return this.event
          }
        }
          */
        (0,dset_dist/* dset */.N)(this.event, path, val);
        return this.event;
    };
    CoreContext.prototype.failedDelivery = function () {
        return this._failedDelivery;
    };
    CoreContext.prototype.setFailedDelivery = function (options) {
        this._failedDelivery = options;
    };
    CoreContext.prototype.logs = function () {
        return this.logger.logs;
    };
    CoreContext.prototype.flush = function () {
        this.logger.flush();
        this.stats.flush();
    };
    CoreContext.prototype.toJSON = function () {
        return {
            id: this._id,
            event: this.event,
            logs: this.logger.logs,
            metrics: this.stats.metrics,
        };
    };
    return CoreContext;
}());

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 417:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: function() { return /* binding */ NullStats; },
/* harmony export */   s: function() { return /* binding */ CoreStats; }
/* harmony export */ });
var __extends = (undefined && undefined.__extends) || (function () {
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
var __assign = (undefined && undefined.__assign) || function () {
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
var compactMetricType = function (type) {
    var enums = {
        gauge: 'g',
        counter: 'c',
    };
    return enums[type];
};
var CoreStats = /** @class */ (function () {
    function CoreStats() {
        this.metrics = [];
    }
    CoreStats.prototype.increment = function (metric, by, tags) {
        if (by === void 0) { by = 1; }
        this.metrics.push({
            metric: metric,
            value: by,
            tags: tags !== null && tags !== void 0 ? tags : [],
            type: 'counter',
            timestamp: Date.now(),
        });
    };
    CoreStats.prototype.gauge = function (metric, value, tags) {
        this.metrics.push({
            metric: metric,
            value: value,
            tags: tags !== null && tags !== void 0 ? tags : [],
            type: 'gauge',
            timestamp: Date.now(),
        });
    };
    CoreStats.prototype.flush = function () {
        var formatted = this.metrics.map(function (m) { return (__assign(__assign({}, m), { tags: m.tags.join(',') })); });
        // ie doesn't like console.table
        if (console.table) {
            console.table(formatted);
        }
        else {
            console.log(formatted);
        }
        this.metrics = [];
    };
    /**
     * compact keys for smaller payload
     */
    CoreStats.prototype.serialize = function () {
        return this.metrics.map(function (m) {
            return {
                m: m.metric,
                v: m.value,
                t: m.tags,
                k: compactMetricType(m.type),
                e: m.timestamp,
            };
        });
    };
    return CoreStats;
}());

var NullStats = /** @class */ (function (_super) {
    __extends(NullStats, _super);
    function NullStats() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NullStats.prototype.gauge = function () {
        var _args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _args[_i] = arguments[_i];
        }
    };
    NullStats.prototype.increment = function () {
        var _args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _args[_i] = arguments[_i];
        }
    };
    NullStats.prototype.flush = function () {
        var _args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _args[_i] = arguments[_i];
        }
    };
    NullStats.prototype.serialize = function () {
        var _args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _args[_i] = arguments[_i];
        }
        return [];
    };
    return NullStats;
}(CoreStats));

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 595:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gg: function() { return /* binding */ exists; },
/* harmony export */   HD: function() { return /* binding */ isString; },
/* harmony export */   PO: function() { return /* binding */ isPlainObject; },
/* harmony export */   hj: function() { return /* binding */ isNumber; },
/* harmony export */   mf: function() { return /* binding */ isFunction; }
/* harmony export */ });
function isString(obj) {
    return typeof obj === 'string';
}
function isNumber(obj) {
    return typeof obj === 'number';
}
function isFunction(obj) {
    return typeof obj === 'function';
}
function exists(val) {
    return val !== undefined && val !== null;
}
function isPlainObject(obj) {
    return (Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() === 'object');
}
//# sourceMappingURL=helpers.js.map

/***/ }),

/***/ 831:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   v4: function() { return /* binding */ v4; }
/* harmony export */ });
var IDX=256, HEX=[], BUFFER;
while (IDX--) HEX[IDX] = (IDX + 256).toString(16).substring(1);

function v4() {
	var i=0, num, out='';

	if (!BUFFER || ((IDX + 16) > 256)) {
		BUFFER = Array(i=256);
		while (i--) BUFFER[i] = 256 * Math.random() | 0;
		i = IDX = 0;
	}

	for (; i < 16; i++) {
		num = BUFFER[IDX + i];
		if (i==6) out += HEX[num & 15 | 64];
		else if (i==8) out += HEX[num & 63 | 128];
		else out += HEX[num];

		if (i & 1 && i > 1 && i < 11) out += '-';
	}

	IDX++;
	return out;
}


/***/ }),

/***/ 380:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: function() { return /* binding */ dset; }
/* harmony export */ });
function dset(obj, keys, val) {
	keys.split && (keys=keys.split('.'));
	var i=0, l=keys.length, t=obj, x, k;
	while (i < l) {
		k = keys[i++];
		if (k === '__proto__' || k === 'constructor' || k === 'prototype') break;
		t = t[k] = (i === l) ? val : (typeof(x=t[k])===typeof(keys)) ? x : (keys[i]*0 !== 0 || !!~(''+keys[i]).indexOf('.')) ? {} : [];
	}
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	!function() {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = function(chunkId) {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce(function(promises, key) {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return "" + {"96":"queryString","119":"auto-track"}[chunkId] + ".bundle." + {"96":"5955823f4b167ff23f4e","119":"26cb9f24f62c78e9f94a"}[chunkId] + ".js";
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	!function() {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "@tronic/receiver-browser:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = function(url, done, key, chunkId) {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = function(prev, event) {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach(function(fn) { return fn(event); });
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			826: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = function(chunkId, promises) {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise(function(resolve, reject) { installedChunkData = installedChunks[chunkId] = [resolve, reject]; });
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = function(event) {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk_tronic_receiver_browser"] = self["webpackChunk_tronic_receiver_browser"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ReceiverBrowser: function() { return /* reexport */ ReceiverBrowser; }
});

;// CONCATENATED MODULE: ./src/lib/global-receiver-helper.ts
var _globalReceiverKey = 'receiver';
function global_receiver_helper_getGlobalReceiver() {
    return window[_globalReceiverKey];
}
function setGlobalReceiverKey(key) {
    _globalReceiverKey = key;
}
function setGlobalReceiver(receiver) {
    ;
    window[_globalReceiverKey] = receiver;
}

;// CONCATENATED MODULE: ./src/lib/parse-cdn.ts


var receiverScriptRegex = /(https:\/\/.*)\/receiver\.js\/v1\/(?:.*?)\/(?:platform|receiver.*)?/;
var getCDNUrlFromScriptTag = function () {
    var cdn;
    var scripts = Array.prototype.slice.call(document.querySelectorAll('script'));
    scripts.forEach(function (s) {
        var _a;
        var src = (_a = s.getAttribute('src')) !== null && _a !== void 0 ? _a : '';
        var result = receiverScriptRegex.exec(src);
        if (result && result[1]) {
            cdn = result[1];
        }
    });
    return cdn;
};
var _globalCDN; // set globalCDN as in-memory singleton
var getGlobalCDNUrl = function () {
    var _a;
    var result = _globalCDN !== null && _globalCDN !== void 0 ? _globalCDN : (_a = global_receiver_helper_getGlobalReceiver()) === null || _a === void 0 ? void 0 : _a._cdn;
    return result;
};
var setGlobalCDNUrl = function (cdn) {
    var globalReceiver = global_receiver_helper_getGlobalReceiver();
    if (globalReceiver) {
        globalReceiver._cdn = cdn;
    }
    _globalCDN = cdn;
};
var getCDN = function () {
    var globalCdnUrl = getGlobalCDNUrl();
    if (globalCdnUrl)
        return globalCdnUrl;
    var cdnFromScriptTag = getCDNUrlFromScriptTag();
    if (cdnFromScriptTag) {
        return cdnFromScriptTag;
    }
    else {
        // it's possible that the CDN is not found in the page because:
        // - the script is loaded through a proxy
        // - the script is removed after execution
        // in this case, we fall back to the default Tronic CDN
        return "https://cdn.tronic.com";
    }
};
var getNextIntegrationsURL = function () {
    var cdn = getCDN();
    return "".concat(cdn, "/next-integrations");
};
/**
 * Replaces the CDN URL in the script tag with the one from Receiver.js 1.0
 *
 * @returns the path to Receiver JS 1.0
 **/
function getLegacyAJSPath() {
    var _a, _b, _c;
    var writeKey = (_a = embeddedWriteKey()) !== null && _a !== void 0 ? _a : (_b = getGlobalReceiver()) === null || _b === void 0 ? void 0 : _b._writeKey;
    var scripts = Array.prototype.slice.call(document.querySelectorAll('script'));
    var path = undefined;
    for (var _i = 0, scripts_1 = scripts; _i < scripts_1.length; _i++) {
        var s = scripts_1[_i];
        var src = (_c = s.getAttribute('src')) !== null && _c !== void 0 ? _c : '';
        var result = receiverScriptRegex.exec(src);
        if (result && result[1]) {
            path = src;
            break;
        }
    }
    if (path) {
        return path.replace('receiver.min.js', 'receiver.classic.js');
    }
    return "https://cdn.tronic.com/receiver.js/v1/".concat(writeKey, "/receiver.classic.js");
}

;// CONCATENATED MODULE: ./src/lib/version-type.ts
// Default value will be updated to 'web' in `bundle-umd.ts` for web build.
var _version = 'npm';
function setVersionType(version) {
    _version = version;
}
function getVersionType() {
    return _version;
}

// EXTERNAL MODULE: ../core/dist/esm/validation/helpers.js
var helpers = __webpack_require__(595);
;// CONCATENATED MODULE: ./src/core/arguments-resolver/index.ts

function resolveTrackArguments(eventOrEventName, 
// channelId?: string,
properties, options, callback) {
    var _a;
    var args = [eventOrEventName, /* channelId, */ properties, options, callback];
    var name = (0,helpers/* isPlainObject */.PO)(eventOrEventName) ? eventOrEventName.event : eventOrEventName;
    if (!name || !(0,helpers/* isString */.HD)(name)) {
        throw new Error('Event missing');
    }
    var data = (0,helpers/* isPlainObject */.PO)(eventOrEventName)
        ? (_a = eventOrEventName.properties) !== null && _a !== void 0 ? _a : {}
        : (0,helpers/* isPlainObject */.PO)(properties)
            ? properties
            : {};
    var opts = {};
    if (!(0,helpers/* isFunction */.mf)(options)) {
        opts = options !== null && options !== void 0 ? options : {};
    }
    if ((0,helpers/* isPlainObject */.PO)(eventOrEventName) && !(0,helpers/* isFunction */.mf)(properties)) {
        opts = properties !== null && properties !== void 0 ? properties : {};
    }
    var cb = args.find(helpers/* isFunction */.mf);
    return [name, /* channelId, */ data, opts, cb];
}
var resolveUserArguments = function (user) {
    return function () {
        var _a, _b, _c;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var values = {};
        // It's a stack so it's reversed so that we go through each of the expected arguments
        var orderStack = [
            'callback',
            'options',
            'traits',
            'id',
        ];
        // Read each argument and eval the possible values here
        for (var _d = 0, args_1 = args; _d < args_1.length; _d++) {
            var arg = args_1[_d];
            var current = orderStack.pop();
            if (current === 'id') {
                if ((0,helpers/* isString */.HD)(arg) || (0,helpers/* isNumber */.hj)(arg)) {
                    values.id = arg.toString();
                    continue;
                }
                if (arg === null || arg === undefined) {
                    continue;
                }
                // First argument should always be the id, if it is not a valid value we can skip it
                current = orderStack.pop();
            }
            // Traits and Options
            if ((current === 'traits' || current === 'options') &&
                (arg === null || arg === undefined || (0,helpers/* isPlainObject */.PO)(arg))) {
                values[current] = arg;
            }
            // Callback
            if ((0,helpers/* isFunction */.mf)(arg)) {
                values.callback = arg;
                break; // This is always the last argument
            }
        }
        return [
            (_a = values.id) !== null && _a !== void 0 ? _a : user.id(),
            ((_b = values.traits) !== null && _b !== void 0 ? _b : {}),
            (_c = values.options) !== null && _c !== void 0 ? _c : {},
            values.callback,
        ];
    };
};
function resolvePageArguments(category, name, properties, options, callback) {
    var _a, _b;
    var resolvedCategory = null;
    var resolvedName = null;
    var args = [category, name, properties, options, callback];
    var strings = args.filter(helpers/* isString */.HD);
    if (strings[0] !== undefined && strings[1] !== undefined) {
        resolvedCategory = strings[0];
        resolvedName = strings[1];
    }
    if (strings.length === 1) {
        resolvedCategory = null;
        resolvedName = strings[0];
    }
    var resolvedCallback = args.find(helpers/* isFunction */.mf);
    var objects = args.filter(function (obj) {
        if (resolvedName === null) {
            return (0,helpers/* isPlainObject */.PO)(obj);
        }
        return (0,helpers/* isPlainObject */.PO)(obj) || obj === null;
    });
    var resolvedProperties = ((_a = objects[0]) !== null && _a !== void 0 ? _a : {});
    var resolvedOptions = ((_b = objects[1]) !== null && _b !== void 0 ? _b : {});
    return [
        resolvedCategory,
        resolvedName,
        resolvedProperties,
        resolvedOptions,
        resolvedCallback,
    ];
}

;// CONCATENATED MODULE: ./src/core/environment/index.ts
function isBrowser() {
    return typeof window !== 'undefined';
}
function isServer() {
    return !isBrowser();
}

;// CONCATENATED MODULE: ./src/core/connection/index.ts

function isOnline() {
    if (isBrowser()) {
        return window.navigator.onLine;
    }
    return true;
}
function isOffline() {
    return !isOnline();
}

// EXTERNAL MODULE: ../core/dist/esm/context/index.js + 1 modules
var context = __webpack_require__(494);
// EXTERNAL MODULE: ../core/dist/esm/stats/index.js
var stats = __webpack_require__(417);
;// CONCATENATED MODULE: ../../node_modules/unfetch/dist/unfetch.module.js
/* harmony default export */ function unfetch_module(e,n){return n=n||{},new Promise(function(t,r){var s=new XMLHttpRequest,o=[],u=[],i={},a=function(){return{ok:2==(s.status/100|0),statusText:s.statusText,status:s.status,url:s.responseURL,text:function(){return Promise.resolve(s.responseText)},json:function(){return Promise.resolve(s.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([s.response]))},clone:a,headers:{keys:function(){return o},entries:function(){return u},get:function(e){return i[e.toLowerCase()]},has:function(e){return e.toLowerCase()in i}}}};for(var l in s.open(n.method||"get",e,!0),s.onload=function(){s.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(e,n,t){o.push(n=n.toLowerCase()),u.push([n,t]),i[n]=i[n]?i[n]+","+t:t}),t(a())},s.onerror=r,s.withCredentials="include"==n.credentials,n.headers)s.setRequestHeader(l,n.headers[l]);s.send(n.body||null)})}
//# sourceMappingURL=unfetch.module.js.map

;// CONCATENATED MODULE: ./src/lib/get-global.ts
// This an imperfect polyfill for globalThis
var getGlobal = function () {
    if (typeof globalThis !== 'undefined') {
        return globalThis;
    }
    if (typeof self !== 'undefined') {
        return self;
    }
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    return null;
};

;// CONCATENATED MODULE: ./src/lib/fetch.ts


/**
 * Wrapper around native `fetch` containing `unfetch` fallback.
 */
// @ts-ignore
var fetch = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var global = getGlobal();
    // @ts-ignore
    return ((global && global.fetch) || unfetch_module).apply(void 0, args);
};

;// CONCATENATED MODULE: ./src/generated/version.ts
// This file is generated.
var version = '0.0.1';

;// CONCATENATED MODULE: ./src/core/constants/index.ts
var TRONIC_API_HOST = 'api.tronic.app';

;// CONCATENATED MODULE: ./src/core/stats/remote-metrics.ts
var __assign = (undefined && undefined.__assign) || function () {
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
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var createRemoteMetric = function (metric, tags, versionType) {
    var formattedTags = tags.reduce(function (acc, t) {
        var _a = t.split(':'), k = _a[0], v = _a[1];
        acc[k] = v;
        return acc;
    }, {});
    return {
        type: 'Counter',
        metric: metric,
        value: 1,
        tags: __assign(__assign({}, formattedTags), { library: 'receiver.js', library_version: versionType === 'web' ? "next-".concat(version) : "npm:next-".concat(version) }),
    };
};
function logError(err) {
    console.error('Error sending tronic performance metrics', err);
}
var RemoteMetrics = /** @class */ (function () {
    function RemoteMetrics(options) {
        var _this = this;
        var _a, _b, _c, _d;
        this.host = (_a = options === null || options === void 0 ? void 0 : options.host) !== null && _a !== void 0 ? _a : TRONIC_API_HOST;
        this.sampleRate = (_b = options === null || options === void 0 ? void 0 : options.sampleRate) !== null && _b !== void 0 ? _b : 1;
        this.flushTimer = (_c = options === null || options === void 0 ? void 0 : options.flushTimer) !== null && _c !== void 0 ? _c : 30 * 1000; /* 30s */
        this.maxQueueSize = (_d = options === null || options === void 0 ? void 0 : options.maxQueueSize) !== null && _d !== void 0 ? _d : 20;
        this.queue = [];
        if (this.sampleRate > 0) {
            var flushing_1 = false;
            var run_1 = function () {
                if (flushing_1) {
                    return;
                }
                flushing_1 = true;
                _this.flush().catch(logError);
                flushing_1 = false;
                setTimeout(run_1, _this.flushTimer);
            };
            run_1();
        }
    }
    RemoteMetrics.prototype.increment = function (metric, tags) {
        // All metrics are part of an allow list in Tracking API
        if (!metric.includes('receiver_js.')) {
            return;
        }
        // /m doesn't like empty tags
        if (tags.length === 0) {
            return;
        }
        if (Math.random() > this.sampleRate) {
            return;
        }
        if (this.queue.length >= this.maxQueueSize) {
            return;
        }
        var remoteMetric = createRemoteMetric(metric, tags, getVersionType());
        this.queue.push(remoteMetric);
        if (metric.includes('error')) {
            this.flush().catch(logError);
        }
    };
    RemoteMetrics.prototype.flush = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.queue.length <= 0) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.send().catch(function (error) {
                                logError(error);
                                _this.sampleRate = 0;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RemoteMetrics.prototype.send = function () {
        return __awaiter(this, void 0, Promise, function () {
            var payload, headers, url;
            return __generator(this, function (_a) {
                payload = { series: this.queue };
                this.queue = [];
                headers = { 'Content-Type': 'text/plain' };
                url = "https://".concat(this.host, "/m");
                return [2 /*return*/, fetch(url, {
                        headers: headers,
                        body: JSON.stringify(payload),
                        method: 'POST',
                    })];
            });
        });
    };
    return RemoteMetrics;
}());


;// CONCATENATED MODULE: ./src/core/stats/index.ts
var __extends = (undefined && undefined.__extends) || (function () {
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


var remoteMetrics;
var Stats = /** @class */ (function (_super) {
    __extends(Stats, _super);
    function Stats() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Stats.initRemoteMetrics = function (options) {
        remoteMetrics = new RemoteMetrics(options);
    };
    Stats.prototype.increment = function (metric, by, tags) {
        _super.prototype.increment.call(this, metric, by, tags);
        remoteMetrics === null || remoteMetrics === void 0 ? void 0 : remoteMetrics.increment(metric, tags !== null && tags !== void 0 ? tags : []);
    };
    return Stats;
}(stats/* CoreStats */.s));


;// CONCATENATED MODULE: ./src/core/context/index.ts
var context_extends = (undefined && undefined.__extends) || (function () {
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


var Context = /** @class */ (function (_super) {
    context_extends(Context, _super);
    function Context(event, id) {
        return _super.call(this, event, id, new Stats()) || this;
    }
    Context.system = function () {
        return new this({ type: 'track', event: 'system' });
    };
    return Context;
}(context/* CoreContext */._));



// EXTERNAL MODULE: ../core/dist/esm/callback/index.js
var callback = __webpack_require__(888);
;// CONCATENATED MODULE: ../core/dist/esm/receiver/dispatch.js
var dispatch_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var dispatch_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

/* The amount of time in ms to wait before invoking the callback. */
var getDelay = function (startTimeInEpochMS, timeoutInMS) {
    var elapsedTime = Date.now() - startTimeInEpochMS;
    // increasing the timeout increases the delay by almost the same amount -- this is weird legacy behavior.
    return Math.max((timeoutInMS !== null && timeoutInMS !== void 0 ? timeoutInMS : 300) - elapsedTime, 0);
};
/**
 * Push an event into the dispatch queue and invoke any callbacks.
 *
 * @param event - Event to enqueue.
 * @param queue - Queue to dispatch against.
 * @param emitter - This is typically an instance of "Receiver" -- used for metrics / progress information.
 * @param options
 */
function dispatch(ctx, queue, emitter, options) {
    return dispatch_awaiter(this, void 0, void 0, function () {
        var startTime, dispatched;
        return dispatch_generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    emitter.emit('dispatch_start', ctx);
                    startTime = Date.now();
                    if (!queue.isEmpty()) return [3 /*break*/, 2];
                    return [4 /*yield*/, queue.dispatchSingle(ctx)];
                case 1:
                    dispatched = _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, queue.dispatch(ctx)];
                case 3:
                    dispatched = _a.sent();
                    _a.label = 4;
                case 4:
                    if (!(options === null || options === void 0 ? void 0 : options.callback)) return [3 /*break*/, 6];
                    return [4 /*yield*/, (0,callback/* invokeCallback */.UI)(dispatched, options.callback, getDelay(startTime, options.timeout))];
                case 5:
                    dispatched = _a.sent();
                    _a.label = 6;
                case 6:
                    if (options === null || options === void 0 ? void 0 : options.debug) {
                        dispatched.flush();
                    }
                    return [2 /*return*/, dispatched];
            }
        });
    });
}
//# sourceMappingURL=dispatch.js.map
;// CONCATENATED MODULE: ../core/dist/esm/emitter/index.js
/**
 * Event Emitter that takes the expected contract as a generic
 * @example
 * ```ts
 *  type Contract = {
 *    delivery_success: [DeliverySuccessResponse, Metrics],
 *    delivery_failure: [DeliveryError]
 * }
 *  new Emitter<Contract>()
 *  .on('delivery_success', (res, metrics) => ...)
 *  .on('delivery_failure', (err) => ...)
 * ```
 */
var Emitter = /** @class */ (function () {
    function Emitter() {
        this.callbacks = {};
    }
    Emitter.prototype.on = function (event, callback) {
        if (!this.callbacks[event]) {
            this.callbacks[event] = [callback];
        }
        else {
            this.callbacks[event].push(callback);
        }
        return this;
    };
    Emitter.prototype.once = function (event, callback) {
        var _this = this;
        var on = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _this.off(event, on);
            callback.apply(_this, args);
        };
        this.on(event, on);
        return this;
    };
    Emitter.prototype.off = function (event, callback) {
        var _a;
        var fns = (_a = this.callbacks[event]) !== null && _a !== void 0 ? _a : [];
        var without = fns.filter(function (fn) { return fn !== callback; });
        this.callbacks[event] = without;
        return this;
    };
    Emitter.prototype.emit = function (event) {
        var _this = this;
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var callbacks = (_a = this.callbacks[event]) !== null && _a !== void 0 ? _a : [];
        callbacks.forEach(function (callback) {
            callback.apply(_this, args);
        });
        return this;
    };
    return Emitter;
}());

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ../../node_modules/@lukeed/uuid/dist/index.mjs
var dist = __webpack_require__(831);
// EXTERNAL MODULE: ../../node_modules/dset/dist/index.mjs
var dset_dist = __webpack_require__(380);
// EXTERNAL MODULE: ../../node_modules/spark-md5/spark-md5.js
var spark_md5 = __webpack_require__(791);
var spark_md5_default = /*#__PURE__*/__webpack_require__.n(spark_md5);
;// CONCATENATED MODULE: ./src/lib/pick.ts
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * @example
 * pick({ 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c'])
 * => { 'a': 1, 'c': 3 }
 */
function pick(object, keys) {
    return Object.assign.apply(Object, __spreadArray([{}], keys.map(function (key) {
        var _a;
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            return _a = {}, _a[key] = object[key], _a;
        }
    }), false));
}

;// CONCATENATED MODULE: ./src/core/page/get-page-context.ts

var BufferedPageContextDiscriminant = 'bpc';
/**
 * `BufferedPageContext` object builder
 */
var createBufferedPageContext = function (url, canonicalUrl, search, path, title, referrer) { return ({
    __t: BufferedPageContextDiscriminant,
    c: canonicalUrl,
    p: path,
    u: url,
    s: search,
    t: title,
    r: referrer,
}); };
// my clever/dubious way of making sure this type guard does not get out sync with the type definition
var BUFFERED_PAGE_CONTEXT_KEYS = Object.keys(createBufferedPageContext('', '', '', '', '', ''));
function isBufferedPageContext(bufferedPageCtx) {
    if (!(0,helpers/* isPlainObject */.PO)(bufferedPageCtx))
        return false;
    if (bufferedPageCtx.__t !== BufferedPageContextDiscriminant)
        return false;
    // ensure obj has all the keys we expect, and none we don't.
    for (var k in bufferedPageCtx) {
        if (!BUFFERED_PAGE_CONTEXT_KEYS.includes(k)) {
            return false;
        }
    }
    return true;
}
//  Legacy logic: we are we appending search parameters to the canonical URL -- I guess the canonical URL is  "not canonical enough" (lol)
var createCanonicalURL = function (canonicalUrl, searchParams) {
    return canonicalUrl.indexOf('?') > -1
        ? canonicalUrl
        : canonicalUrl + searchParams;
};
/**
 * Strips hash from URL.
 */
var removeHash = function (href) {
    var hashIdx = href.indexOf('#');
    return hashIdx === -1 ? href : href.slice(0, hashIdx);
};
var parseCanonicalPath = function (canonicalUrl) {
    try {
        return new URL(canonicalUrl).pathname;
    }
    catch (_e) {
        // this is classic behavior -- we assume that if the canonical URL is invalid, it's a raw path.
        return canonicalUrl[0] === '/' ? canonicalUrl : '/' + canonicalUrl;
    }
};
/**
 * Create a `PageContext` from a `BufferedPageContext`.
 * `BufferedPageContext` keys are minified to save bytes in the snippet.
 */
var createPageContext = function (_a) {
    var canonicalUrl = _a.c, pathname = _a.p, search = _a.s, url = _a.u, referrer = _a.r, title = _a.t;
    var newPath = canonicalUrl ? parseCanonicalPath(canonicalUrl) : pathname;
    var newUrl = canonicalUrl
        ? createCanonicalURL(canonicalUrl, search)
        : removeHash(url);
    return {
        path: newPath,
        referrer: referrer,
        search: search,
        title: title,
        url: newUrl,
    };
};
/**
 * Get page properties from the browser window/document.
 */
var getDefaultBufferedPageContext = function () {
    var c = document.querySelector("link[rel='canonical']");
    return createBufferedPageContext(location.href, (c && c.getAttribute('href')) || undefined, location.search, location.pathname, document.title, document.referrer);
};
/**
 * Get page properties from the browser window/document.
 */
var getDefaultPageContext = function () {
    return createPageContext(getDefaultBufferedPageContext());
};

;// CONCATENATED MODULE: ./src/core/page/add-page-context.ts
var add_page_context_assign = (undefined && undefined.__assign) || function () {
    add_page_context_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return add_page_context_assign.apply(this, arguments);
};


/**
 * Augments a Tronic event with information about the current page.
 * Page information like URL changes frequently, so this is meant to be captured as close to the event call as possible.
 * Things like `userAgent` do not change, so they can be added later in the flow.
 * We prefer not to add this information to this function, as it increases the main bundle size.
 */
var addPageContext = function (event, pageCtx) {
    if (pageCtx === void 0) { pageCtx = getDefaultPageContext(); }
    var evtCtx = event.context; // Context should be set earlier in the flow
    var pageContextFromEventProps;
    if (event.type === 'track' && event.event === 'pageview') {
        pageContextFromEventProps =
            event.properties && pick(event.properties, Object.keys(pageCtx));
        event.properties = add_page_context_assign(add_page_context_assign(add_page_context_assign({}, pageCtx), event.properties), (event.name ? { name: event.name } : {}));
    }
    evtCtx.page = add_page_context_assign(add_page_context_assign(add_page_context_assign({}, pageCtx), pageContextFromEventProps), evtCtx.page);
};

;// CONCATENATED MODULE: ./src/core/events/index.ts
var events_assign = (undefined && undefined.__assign) || function () {
    events_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return events_assign.apply(this, arguments);
};
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};





var EventFactory = /** @class */ (function () {
    function EventFactory(user) {
        this.user = user;
    }
    EventFactory.prototype.page = function (category, page, properties, options, pageCtx) {
        var _a;
        var event = {
            type: 'track',
            event: 'pageview',
            properties: events_assign({}, properties),
            options: events_assign({}, options),
        };
        if (category !== null) {
            event.category = category;
            event.properties = (_a = event.properties) !== null && _a !== void 0 ? _a : {};
            event.properties.category = category;
        }
        if (page !== null) {
            event.name = page;
        }
        return this.normalize(events_assign(events_assign({}, this.baseEvent()), event), pageCtx);
    };
    EventFactory.prototype.track = function (eventName, 
    // channelId?: string,
    properties, options, pageCtx) {
        var event = this.normalize(events_assign(events_assign({}, this.baseEvent()), { type: 'track', event: eventName, properties: properties !== null && properties !== void 0 ? properties : {}, options: events_assign({}, options) }), pageCtx);
        /*
        if (channelId) {
          event.channelId = channelId;
          }
         */
        return event;
    };
    EventFactory.prototype.identify = function (userId, 
    // channelId?: string,
    traits, options, pageCtx) {
        var event = this.normalize(events_assign(events_assign({}, this.baseEvent()), { type: 'identify', userId: userId, traits: traits, options: events_assign({}, options) }), pageCtx);
        /*
        if (channelId) {
        event.channelId = channelId;
        }
         */
        return event;
    };
    EventFactory.prototype.baseEvent = function () {
        var base = {
            options: {},
        };
        var user = this.user;
        if (user.id()) {
            base.userId = user.id();
        }
        if (user.anonymousId()) {
            base.anonymousId = user.anonymousId();
        }
        return base;
    };
    /**
     * Builds the context part of an event based on "foreign" keys that
     * are provided in the `Options` parameter for an Event
     */
    EventFactory.prototype.context = function (event) {
        var _a, _b, _c;
        var optionsKeys = ['anonymousId', 'timestamp', 'userId'];
        var options = (_a = event.options) !== null && _a !== void 0 ? _a : {};
        var providedOptionsKeys = Object.keys(options);
        var context = (_c = (_b = event.options) === null || _b === void 0 ? void 0 : _b.context) !== null && _c !== void 0 ? _c : {};
        var overrides = {};
        providedOptionsKeys.forEach(function (key) {
            if (key === 'context') {
                return;
            }
            if (optionsKeys.includes(key)) {
                (0,dset_dist/* dset */.N)(overrides, key, options[key]);
            }
            else {
                (0,dset_dist/* dset */.N)(context, key, options[key]);
            }
        });
        return [context, overrides];
    };
    EventFactory.prototype.normalize = function (event, pageCtx) {
        // set anonymousId globally if we encounter an override
        var _a;
        ((_a = event.options) === null || _a === void 0 ? void 0 : _a.anonymousId) &&
            this.user.anonymousId(event.options.anonymousId);
        var _b = this.context(event), context = _b[0], overrides = _b[1];
        var options = event.options, rest = __rest(event, ["options"]);
        var newEvent = events_assign(events_assign(events_assign(events_assign({ timestamp: new Date() }, rest), { context: context }), overrides), { messageId: 'tjs-' + spark_md5_default().hash(JSON.stringify(event) + (0,dist.v4)()) });
        addPageContext(newEvent, pageCtx);
        return newEvent;
    };
    return EventFactory;
}());


;// CONCATENATED MODULE: ../core/dist/esm/priority-queue/backoff.js
function backoff(params) {
    var random = Math.random() + 1;
    var _a = params.minTimeout, minTimeout = _a === void 0 ? 500 : _a, _b = params.factor, factor = _b === void 0 ? 2 : _b, attempt = params.attempt, _c = params.maxTimeout, maxTimeout = _c === void 0 ? Infinity : _c;
    return Math.min(random * minTimeout * Math.pow(factor, attempt), maxTimeout);
}
//# sourceMappingURL=backoff.js.map
;// CONCATENATED MODULE: ../core/dist/esm/priority-queue/index.js
var priority_queue_extends = (undefined && undefined.__extends) || (function () {
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


/**
 * @internal
 */
var ON_REMOVE_FROM_FUTURE = 'onRemoveFromFuture';
var PriorityQueue = /** @class */ (function (_super) {
    priority_queue_extends(PriorityQueue, _super);
    function PriorityQueue(maxAttempts, queue, seen) {
        var _this = _super.call(this) || this;
        _this.future = [];
        _this.maxAttempts = maxAttempts;
        _this.queue = queue;
        _this.seen = seen !== null && seen !== void 0 ? seen : {};
        return _this;
    }
    PriorityQueue.prototype.push = function () {
        var _this = this;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var accepted = items.map(function (operation) {
            var attempts = _this.updateAttempts(operation);
            if (attempts > _this.maxAttempts || _this.includes(operation)) {
                return false;
            }
            _this.queue.push(operation);
            return true;
        });
        this.queue = this.queue.sort(function (a, b) { return _this.getAttempts(a) - _this.getAttempts(b); });
        return accepted;
    };
    PriorityQueue.prototype.pushWithBackoff = function (item) {
        var _this = this;
        if (this.getAttempts(item) === 0) {
            return this.push(item)[0];
        }
        var attempt = this.updateAttempts(item);
        if (attempt > this.maxAttempts || this.includes(item)) {
            return false;
        }
        var timeout = backoff({ attempt: attempt - 1 });
        setTimeout(function () {
            _this.queue.push(item);
            // remove from future list
            _this.future = _this.future.filter(function (f) { return f.id !== item.id; });
            // Lets listeners know that a 'future' message is now available in the queue
            _this.emit(ON_REMOVE_FROM_FUTURE);
        }, timeout);
        this.future.push(item);
        return true;
    };
    PriorityQueue.prototype.getAttempts = function (item) {
        var _a;
        return (_a = this.seen[item.id]) !== null && _a !== void 0 ? _a : 0;
    };
    PriorityQueue.prototype.updateAttempts = function (item) {
        this.seen[item.id] = this.getAttempts(item) + 1;
        return this.getAttempts(item);
    };
    PriorityQueue.prototype.includes = function (item) {
        return (this.queue.includes(item) ||
            this.future.includes(item) ||
            Boolean(this.queue.find(function (i) { return i.id === item.id; })) ||
            Boolean(this.future.find(function (i) { return i.id === item.id; })));
    };
    PriorityQueue.prototype.pop = function () {
        return this.queue.shift();
    };
    Object.defineProperty(PriorityQueue.prototype, "length", {
        get: function () {
            return this.queue.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PriorityQueue.prototype, "todo", {
        get: function () {
            return this.queue.length + this.future.length;
        },
        enumerable: false,
        configurable: true
    });
    return PriorityQueue;
}(Emitter));

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./src/lib/priority-queue/persisted.ts
var persisted_extends = (undefined && undefined.__extends) || (function () {
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
var persisted_assign = (undefined && undefined.__assign) || function () {
    persisted_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return persisted_assign.apply(this, arguments);
};
var persisted_spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};



var loc = {
    getItem: function () { },
    setItem: function () { },
    removeItem: function () { },
};
try {
    loc = isBrowser() && window.localStorage ? window.localStorage : loc;
}
catch (err) {
    console.warn('Unable to access localStorage', err);
}
function persisted(key) {
    var items = loc.getItem(key);
    return (items ? JSON.parse(items) : []).map(function (p) { return new Context(p.event, p.id); });
}
function persistItems(key, items) {
    var existing = persisted(key);
    var all = persisted_spreadArray(persisted_spreadArray([], items, true), existing, true);
    var merged = all.reduce(function (acc, item) {
        var _a;
        return persisted_assign(persisted_assign({}, acc), (_a = {}, _a[item.id] = item, _a));
    }, {});
    loc.setItem(key, JSON.stringify(Object.values(merged)));
}
function seen(key) {
    var stored = loc.getItem(key);
    return stored ? JSON.parse(stored) : {};
}
function persistSeen(key, memory) {
    var stored = seen(key);
    loc.setItem(key, JSON.stringify(persisted_assign(persisted_assign({}, stored), memory)));
}
function remove(key) {
    loc.removeItem(key);
}
var now = function () { return new Date().getTime(); };
function mutex(key, onUnlock, attempt) {
    if (attempt === void 0) { attempt = 0; }
    var lockTimeout = 50;
    var lockKey = "persisted-queue:v1:".concat(key, ":lock");
    var expired = function (lock) { return new Date().getTime() > lock; };
    var rawLock = loc.getItem(lockKey);
    var lock = rawLock ? JSON.parse(rawLock) : null;
    var allowed = lock === null || expired(lock);
    if (allowed) {
        loc.setItem(lockKey, JSON.stringify(now() + lockTimeout));
        onUnlock();
        loc.removeItem(lockKey);
        return;
    }
    if (!allowed && attempt < 3) {
        setTimeout(function () {
            mutex(key, onUnlock, attempt + 1);
        }, lockTimeout);
    }
    else {
        console.error('Unable to retrieve lock');
    }
}
var PersistedPriorityQueue = /** @class */ (function (_super) {
    persisted_extends(PersistedPriorityQueue, _super);
    function PersistedPriorityQueue(maxAttempts, key) {
        var _this = _super.call(this, maxAttempts, []) || this;
        var itemsKey = "persisted-queue:v1:".concat(key, ":items");
        var seenKey = "persisted-queue:v1:".concat(key, ":seen");
        var saved = [];
        var lastSeen = {};
        mutex(key, function () {
            try {
                saved = persisted(itemsKey);
                lastSeen = seen(seenKey);
                remove(itemsKey);
                remove(seenKey);
                _this.queue = persisted_spreadArray(persisted_spreadArray([], saved, true), _this.queue, true);
                _this.seen = persisted_assign(persisted_assign({}, lastSeen), _this.seen);
            }
            catch (err) {
                console.error(err);
            }
        });
        window.addEventListener('pagehide', function () {
            // we deliberately want to use the less powerful 'pagehide' API to only persist on events where the receiver instance gets destroyed, and not on tab away.
            if (_this.todo > 0) {
                var items_1 = persisted_spreadArray(persisted_spreadArray([], _this.queue, true), _this.future, true);
                try {
                    mutex(key, function () {
                        persistItems(itemsKey, items_1);
                        persistSeen(seenKey, _this.seen);
                    });
                }
                catch (err) {
                    console.error(err);
                }
            }
        });
        return _this;
    }
    return PersistedPriorityQueue;
}(PriorityQueue));


;// CONCATENATED MODULE: ../core/dist/esm/utils/group-by.js
var group_by_spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function groupBy(collection, grouper) {
    var results = {};
    collection.forEach(function (item) {
        var _a;
        var key = undefined;
        if (typeof grouper === 'string') {
            var suggestedKey = item[grouper];
            key =
                typeof suggestedKey !== 'string'
                    ? JSON.stringify(suggestedKey)
                    : suggestedKey;
        }
        else if (grouper instanceof Function) {
            key = grouper(item);
        }
        if (key === undefined) {
            return;
        }
        results[key] = group_by_spreadArray(group_by_spreadArray([], ((_a = results[key]) !== null && _a !== void 0 ? _a : []), true), [item], false);
    });
    return results;
}
//# sourceMappingURL=group-by.js.map
;// CONCATENATED MODULE: ../core/dist/esm/utils/is-thenable.js
/**
 *  Check if  thenable
 *  (instanceof Promise doesn't respect realms)
 */
var isThenable = function (value) {
    return typeof value === 'object' &&
        value !== null &&
        'then' in value &&
        typeof value.then === 'function';
};
//# sourceMappingURL=is-thenable.js.map
;// CONCATENATED MODULE: ../core/dist/esm/task/task-group.js

var createTaskGroup = function () {
    var taskCompletionPromise;
    var resolvePromise;
    var count = 0;
    return {
        done: function () { return taskCompletionPromise; },
        run: function (op) {
            var returnValue = op();
            if (isThenable(returnValue)) {
                if (++count === 1) {
                    taskCompletionPromise = new Promise(function (res) { return (resolvePromise = res); });
                }
                returnValue.finally(function () { return --count === 0 && resolvePromise(); });
            }
            return returnValue;
        },
    };
};
//# sourceMappingURL=task-group.js.map
;// CONCATENATED MODULE: ../core/dist/esm/queue/delivery.js
var delivery_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var delivery_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

function tryAsync(fn) {
    return delivery_awaiter(this, void 0, void 0, function () {
        var err_1;
        return delivery_generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fn()];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    err_1 = _a.sent();
                    return [2 /*return*/, Promise.reject(err_1)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function attempt(ctx, plugin) {
    ctx.log('debug', 'plugin', { plugin: plugin.name });
    var start = new Date().getTime();
    var hook = plugin[ctx.event.type];
    if (hook === undefined) {
        return Promise.resolve(ctx);
    }
    var newCtx = tryAsync(function () { return hook.apply(plugin, [ctx]); })
        .then(function (ctx) {
        var done = new Date().getTime() - start;
        ctx.stats.gauge('plugin_time', done, ["plugin:".concat(plugin.name)]);
        return ctx;
    })
        .catch(function (err) {
        if (err instanceof context/* ContextCancelation */.Y &&
            err.type === 'middleware_cancellation') {
            throw err;
        }
        if (err instanceof context/* ContextCancelation */.Y) {
            ctx.log('warn', err.type, {
                plugin: plugin.name,
                error: err,
            });
            return err;
        }
        ctx.log('error', 'plugin Error', {
            plugin: plugin.name,
            error: err,
        });
        ctx.stats.increment('plugin_error', 1, ["plugin:".concat(plugin.name)]);
        return err;
    });
    return newCtx;
}
function ensure(ctx, plugin) {
    return attempt(ctx, plugin).then(function (newContext) {
        if (newContext instanceof context/* CoreContext */._) {
            return newContext;
        }
        ctx.log('debug', 'Context canceled');
        ctx.stats.increment('context_canceled');
        ctx.cancel(newContext);
    });
}
//# sourceMappingURL=delivery.js.map
;// CONCATENATED MODULE: ../core/dist/esm/queue/event-queue.js
var event_queue_extends = (undefined && undefined.__extends) || (function () {
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
var event_queue_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var event_queue_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var CoreEventQueue = /** @class */ (function (_super) {
    event_queue_extends(CoreEventQueue, _super);
    function CoreEventQueue(priorityQueue) {
        var _this = _super.call(this) || this;
        /**
         * All event deliveries get suspended until all the tasks in this task group are complete.
         * For example: a middleware that augments the event object should be loaded safely as a
         * critical task, this way, event queue will wait for it to be ready before sending events.
         *
         * This applies to all the events already in the queue, and the upcoming ones
         */
        _this.criticalTasks = createTaskGroup();
        _this.plugins = [];
        _this.failedInitializations = [];
        _this.flushing = false;
        _this.queue = priorityQueue;
        _this.queue.on(ON_REMOVE_FROM_FUTURE, function () {
            _this.scheduleFlush(0);
        });
        return _this;
    }
    CoreEventQueue.prototype.register = function (ctx, plugin, instance) {
        return event_queue_awaiter(this, void 0, void 0, function () {
            var _this = this;
            return event_queue_generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve(plugin.load(ctx, instance))
                            .then(function () {
                            _this.plugins.push(plugin);
                        })
                            .catch(function (err) {
                            if (plugin.type === 'destination') {
                                _this.failedInitializations.push(plugin.name);
                                console.warn(plugin.name, err);
                                ctx.log('warn', 'Failed to load destination', {
                                    plugin: plugin.name,
                                    error: err,
                                });
                                return;
                            }
                            throw err;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CoreEventQueue.prototype.deregister = function (ctx, plugin, instance) {
        return event_queue_awaiter(this, void 0, void 0, function () {
            var e_1;
            return event_queue_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!plugin.unload) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.resolve(plugin.unload(ctx, instance))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.plugins = this.plugins.filter(function (p) { return p.name !== plugin.name; });
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        ctx.log('warn', 'Failed to unload destination', {
                            plugin: plugin.name,
                            error: e_1,
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CoreEventQueue.prototype.dispatch = function (ctx) {
        return event_queue_awaiter(this, void 0, void 0, function () {
            var willDeliver;
            return event_queue_generator(this, function (_a) {
                ctx.log('debug', 'Dispatching');
                ctx.stats.increment('message_dispatched');
                this.queue.push(ctx);
                willDeliver = this.subscribeToDelivery(ctx);
                this.scheduleFlush(0);
                return [2 /*return*/, willDeliver];
            });
        });
    };
    CoreEventQueue.prototype.subscribeToDelivery = function (ctx) {
        return event_queue_awaiter(this, void 0, void 0, function () {
            var _this = this;
            return event_queue_generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        var onDeliver = function (flushed, delivered) {
                            if (flushed.isSame(ctx)) {
                                _this.off('flush', onDeliver);
                                if (delivered) {
                                    resolve(flushed);
                                }
                                else {
                                    resolve(flushed);
                                }
                            }
                        };
                        _this.on('flush', onDeliver);
                    })];
            });
        });
    };
    CoreEventQueue.prototype.dispatchSingle = function (ctx) {
        return event_queue_awaiter(this, void 0, void 0, function () {
            var _this = this;
            return event_queue_generator(this, function (_a) {
                ctx.log('debug', 'Dispatching');
                ctx.stats.increment('message_dispatched');
                this.queue.updateAttempts(ctx);
                ctx.attempts = 1;
                return [2 /*return*/, this.deliver(ctx).catch(function (err) {
                        var accepted = _this.enqueuRetry(err, ctx);
                        if (!accepted) {
                            ctx.setFailedDelivery({ reason: err });
                            return ctx;
                        }
                        return _this.subscribeToDelivery(ctx);
                    })];
            });
        });
    };
    CoreEventQueue.prototype.isEmpty = function () {
        return this.queue.length === 0;
    };
    CoreEventQueue.prototype.scheduleFlush = function (timeout) {
        var _this = this;
        if (timeout === void 0) { timeout = 500; }
        if (this.flushing) {
            return;
        }
        this.flushing = true;
        setTimeout(function () {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            _this.flush().then(function () {
                setTimeout(function () {
                    _this.flushing = false;
                    if (_this.queue.length) {
                        _this.scheduleFlush(0);
                    }
                }, 0);
            });
        }, timeout);
    };
    CoreEventQueue.prototype.deliver = function (ctx) {
        return event_queue_awaiter(this, void 0, void 0, function () {
            var start, done, err_1, error;
            return event_queue_generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.criticalTasks.done()];
                    case 1:
                        _a.sent();
                        start = Date.now();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.flushOne(ctx)];
                    case 3:
                        ctx = _a.sent();
                        done = Date.now() - start;
                        this.emit('delivery_success', ctx);
                        ctx.stats.gauge('delivered', done);
                        ctx.log('debug', 'Delivered', ctx.event);
                        return [2 /*return*/, ctx];
                    case 4:
                        err_1 = _a.sent();
                        error = err_1;
                        ctx.log('error', 'Failed to deliver', error);
                        this.emit('delivery_failure', ctx, error);
                        ctx.stats.increment('delivery_failed');
                        throw err_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CoreEventQueue.prototype.enqueuRetry = function (err, ctx) {
        var retriable = !(err instanceof context/* ContextCancelation */.Y) || err.retry;
        if (!retriable) {
            return false;
        }
        return this.queue.pushWithBackoff(ctx);
    };
    CoreEventQueue.prototype.flush = function () {
        return event_queue_awaiter(this, void 0, void 0, function () {
            var ctx, err_2, accepted;
            return event_queue_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.queue.length === 0) {
                            return [2 /*return*/, []];
                        }
                        ctx = this.queue.pop();
                        if (!ctx) {
                            return [2 /*return*/, []];
                        }
                        ctx.attempts = this.queue.getAttempts(ctx);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.deliver(ctx)];
                    case 2:
                        ctx = _a.sent();
                        this.emit('flush', ctx, true);
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        accepted = this.enqueuRetry(err_2, ctx);
                        if (!accepted) {
                            ctx.setFailedDelivery({ reason: err_2 });
                            this.emit('flush', ctx, false);
                        }
                        return [2 /*return*/, []];
                    case 4: return [2 /*return*/, [ctx]];
                }
            });
        });
    };
    CoreEventQueue.prototype.isReady = function () {
        // return this.plugins.every((p) => p.isLoaded())
        // should we wait for every plugin to load?
        return true;
    };
    CoreEventQueue.prototype.availableExtensions = function (denyList) {
        var available = this.plugins.filter(function (p) {
            var _a, _b, _c;
            // Only filter out destination plugins or the Tronic plugin
            if (p.type !== 'destination' && p.name !== 'Tronic') {
                return true;
            }
            var alternativeNameMatch = undefined;
            (_a = p.alternativeNames) === null || _a === void 0 ? void 0 : _a.forEach(function (name) {
                if (denyList[name] !== undefined) {
                    alternativeNameMatch = denyList[name];
                }
            });
            // Explicit integration option takes precedence, `All: false` does not apply to Tronic
            return ((_c = (_b = denyList[p.name]) !== null && _b !== void 0 ? _b : alternativeNameMatch) !== null && _c !== void 0 ? _c : (p.name === 'Tronic' ? true : denyList.All) !== false);
        });
        var _a = groupBy(available, 'type'), _b = _a.before, before = _b === void 0 ? [] : _b, _c = _a.enrichment, enrichment = _c === void 0 ? [] : _c, _d = _a.destination, destination = _d === void 0 ? [] : _d, _e = _a.after, after = _e === void 0 ? [] : _e;
        return {
            before: before,
            enrichment: enrichment,
            destinations: destination,
            after: after,
        };
    };
    CoreEventQueue.prototype.flushOne = function (ctx) {
        return event_queue_awaiter(this, void 0, void 0, function () {
            var _a, before, enrichment, _i, before_1, beforeWare, temp, _b, enrichment_1, enrichmentWare, temp, _c, destinations, after, afterCalls;
            return event_queue_generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!this.isReady()) {
                            throw new Error('Not ready');
                        }
                        if (ctx.attempts > 1) {
                            this.emit('delivery_retry', ctx);
                        }
                        _a = this.availableExtensions(
                        /* ctx.event.integrations ?? */ {}), before = _a.before, enrichment = _a.enrichment;
                        _i = 0, before_1 = before;
                        _d.label = 1;
                    case 1:
                        if (!(_i < before_1.length)) return [3 /*break*/, 4];
                        beforeWare = before_1[_i];
                        return [4 /*yield*/, ensure(ctx, beforeWare)];
                    case 2:
                        temp = _d.sent();
                        if (temp instanceof context/* CoreContext */._) {
                            ctx = temp;
                        }
                        this.emit('message_enriched', ctx, beforeWare);
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        _b = 0, enrichment_1 = enrichment;
                        _d.label = 5;
                    case 5:
                        if (!(_b < enrichment_1.length)) return [3 /*break*/, 8];
                        enrichmentWare = enrichment_1[_b];
                        return [4 /*yield*/, attempt(ctx, enrichmentWare)];
                    case 6:
                        temp = _d.sent();
                        if (temp instanceof context/* CoreContext */._) {
                            ctx = temp;
                        }
                        this.emit('message_enriched', ctx, enrichmentWare);
                        _d.label = 7;
                    case 7:
                        _b++;
                        return [3 /*break*/, 5];
                    case 8:
                        _c = this.availableExtensions(
                        /* ctx.event.integrations ?? */ {}), destinations = _c.destinations, after = _c.after;
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                setTimeout(function () {
                                    var attempts = destinations.map(function (destination) {
                                        return attempt(ctx, destination);
                                    });
                                    Promise.all(attempts).then(resolve).catch(reject);
                                }, 0);
                            })];
                    case 9:
                        _d.sent();
                        ctx.stats.increment('message_delivered');
                        this.emit('message_delivered', ctx);
                        afterCalls = after.map(function (after) { return attempt(ctx, after); });
                        return [4 /*yield*/, Promise.all(afterCalls)];
                    case 10:
                        _d.sent();
                        return [2 /*return*/, ctx];
                }
            });
        });
    };
    return CoreEventQueue;
}(Emitter));

//# sourceMappingURL=event-queue.js.map
;// CONCATENATED MODULE: ./src/core/queue/event-queue.ts
var queue_event_queue_extends = (undefined && undefined.__extends) || (function () {
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
var queue_event_queue_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var queue_event_queue_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var EventQueue = /** @class */ (function (_super) {
    queue_event_queue_extends(EventQueue, _super);
    function EventQueue(nameOrQueue) {
        return _super.call(this, typeof nameOrQueue === 'string'
            ? new PersistedPriorityQueue(4, nameOrQueue)
            : nameOrQueue) || this;
    }
    EventQueue.prototype.flush = function () {
        return queue_event_queue_awaiter(this, void 0, Promise, function () {
            return queue_event_queue_generator(this, function (_a) {
                if (isOffline())
                    return [2 /*return*/, []];
                return [2 /*return*/, _super.prototype.flush.call(this)];
            });
        });
    };
    return EventQueue;
}(CoreEventQueue));


;// CONCATENATED MODULE: ./src/lib/bind-all.ts
function bindAll(obj) {
    var proto = obj.constructor.prototype;
    for (var _i = 0, _a = Object.getOwnPropertyNames(proto); _i < _a.length; _i++) {
        var key = _a[_i];
        if (key !== 'constructor') {
            var desc = Object.getOwnPropertyDescriptor(obj.constructor.prototype, key);
            if (!!desc && typeof desc.value === 'function') {
                obj[key] = obj[key].bind(obj);
            }
        }
    }
    return obj;
}

;// CONCATENATED MODULE: ./src/core/storage/types.ts
var StoreType = {
    Cookie: 'cookie',
    LocalStorage: 'localStorage',
    Memory: 'memory',
};

;// CONCATENATED MODULE: ./src/core/storage/universalStorage.ts
// not adding to private method because those method names do not get minified atm, and does not use 'this'
var _logStoreKeyError = function (store, action, key, err) {
    console.warn("".concat(store.constructor.name, ": Can't ").concat(action, " key \"").concat(key, "\" | Err: ").concat(err));
};
/**
 * Uses multiple storages in a priority list to get/set values in the order they are specified.
 */
var UniversalStorage = /** @class */ (function () {
    function UniversalStorage(stores) {
        this.stores = stores;
    }
    UniversalStorage.prototype.get = function (key) {
        var val = null;
        for (var _i = 0, _a = this.stores; _i < _a.length; _i++) {
            var store = _a[_i];
            try {
                val = store.get(key);
                if (val !== undefined && val !== null) {
                    return val;
                }
            }
            catch (e) {
                _logStoreKeyError(store, 'get', key, e);
            }
        }
        return null;
    };
    UniversalStorage.prototype.set = function (key, value) {
        this.stores.forEach(function (store) {
            try {
                store.set(key, value);
            }
            catch (e) {
                _logStoreKeyError(store, 'set', key, e);
            }
        });
    };
    UniversalStorage.prototype.clear = function (key) {
        this.stores.forEach(function (store) {
            try {
                store.remove(key);
            }
            catch (e) {
                _logStoreKeyError(store, 'remove', key, e);
            }
        });
    };
    /*
      This is to support few scenarios where:
      - value exist in one of the stores ( as a result of other stores being cleared from browser ) and we want to resync them
      - read values in AJS 1.0 format ( for customers after 1.0 --> 2.0 migration ) and then re-write them in AJS 2.0 format
    */
    UniversalStorage.prototype.getAndSync = function (key) {
        var val = this.get(key);
        // legacy behavior, getAndSync can change the type of a value from number to string (AJS 1.0 stores numerical values as a number)
        var coercedValue = (typeof val === 'number' ? val.toString() : val);
        this.set(key, coercedValue);
        return coercedValue;
    };
    return UniversalStorage;
}());


;// CONCATENATED MODULE: ./src/core/storage/memoryStorage.ts
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


;// CONCATENATED MODULE: ./src/core/storage/settings.ts

function isArrayOfStoreType(s) {
    return (s &&
        s.stores &&
        Array.isArray(s.stores) &&
        s.stores.every(function (e) { return Object.values(StoreType).includes(e); }));
}
function isStoreTypeWithSettings(s) {
    return typeof s === 'object' && s.name !== undefined;
}

;// CONCATENATED MODULE: ../../node_modules/js-cookie/dist/js.cookie.mjs
/*! js-cookie v3.0.1 | MIT */
/* eslint-disable no-var */
function js_cookie_assign (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      target[key] = source[key];
    }
  }
  return target
}
/* eslint-enable no-var */

/* eslint-disable no-var */
var defaultConverter = {
  read: function (value) {
    if (value[0] === '"') {
      value = value.slice(1, -1);
    }
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
  },
  write: function (value) {
    return encodeURIComponent(value).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    )
  }
};
/* eslint-enable no-var */

/* eslint-disable no-var */

function init (converter, defaultAttributes) {
  function set (key, value, attributes) {
    if (typeof document === 'undefined') {
      return
    }

    attributes = js_cookie_assign({}, defaultAttributes, attributes);

    if (typeof attributes.expires === 'number') {
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
    }
    if (attributes.expires) {
      attributes.expires = attributes.expires.toUTCString();
    }

    key = encodeURIComponent(key)
      .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
      .replace(/[()]/g, escape);

    var stringifiedAttributes = '';
    for (var attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue
      }

      stringifiedAttributes += '; ' + attributeName;

      if (attributes[attributeName] === true) {
        continue
      }

      // Considers RFC 6265 section 5.2:
      // ...
      // 3.  If the remaining unparsed-attributes contains a %x3B (";")
      //     character:
      // Consume the characters of the unparsed-attributes up to,
      // not including, the first %x3B (";") character.
      // ...
      stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
    }

    return (document.cookie =
      key + '=' + converter.write(value, key) + stringifiedAttributes)
  }

  function get (key) {
    if (typeof document === 'undefined' || (arguments.length && !key)) {
      return
    }

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all.
    var cookies = document.cookie ? document.cookie.split('; ') : [];
    var jar = {};
    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].split('=');
      var value = parts.slice(1).join('=');

      try {
        var foundKey = decodeURIComponent(parts[0]);
        jar[foundKey] = converter.read(value, foundKey);

        if (key === foundKey) {
          break
        }
      } catch (e) {}
    }

    return key ? jar[key] : jar
  }

  return Object.create(
    {
      set: set,
      get: get,
      remove: function (key, attributes) {
        set(
          key,
          '',
          js_cookie_assign({}, attributes, {
            expires: -1
          })
        );
      },
      withAttributes: function (attributes) {
        return init(this.converter, js_cookie_assign({}, this.attributes, attributes))
      },
      withConverter: function (converter) {
        return init(js_cookie_assign({}, this.converter, converter), this.attributes)
      }
    },
    {
      attributes: { value: Object.freeze(defaultAttributes) },
      converter: { value: Object.freeze(converter) }
    }
  )
}

var api = init(defaultConverter, { path: '/' });
/* eslint-enable no-var */

/* harmony default export */ var js_cookie = (api);

;// CONCATENATED MODULE: ./src/core/user/tld.ts

/**
 * Levels returns all levels of the given url.
 *
 * @param {string} url
 * @return {Array}
 * @api public
 */
function levels(url) {
    var host = url.hostname;
    var parts = host.split('.');
    var last = parts[parts.length - 1];
    var levels = [];
    // Ip address.
    if (parts.length === 4 && parseInt(last, 10) > 0) {
        return levels;
    }
    // Localhost.
    if (parts.length <= 1) {
        return levels;
    }
    // Create levels.
    for (var i = parts.length - 2; i >= 0; --i) {
        levels.push(parts.slice(i).join('.'));
    }
    return levels;
}
function parseUrl(url) {
    try {
        return new URL(url);
    }
    catch (_a) {
        return;
    }
}
function tld(url) {
    var parsedUrl = parseUrl(url);
    if (!parsedUrl)
        return;
    var lvls = levels(parsedUrl);
    // Lookup the real top level one.
    for (var i = 0; i < lvls.length; ++i) {
        var cname = '__tld__';
        var domain = lvls[i];
        var opts = { domain: '.' + domain };
        try {
            // cookie access throw an error if the library is ran inside a sandboxed environment (e.g. sandboxed iframe)
            js_cookie.set(cname, '1', opts);
            if (js_cookie.get(cname)) {
                js_cookie.remove(cname, opts);
                return domain;
            }
        }
        catch (_) {
            return;
        }
    }
}

;// CONCATENATED MODULE: ./src/core/storage/cookieStorage.ts
var cookieStorage_assign = (undefined && undefined.__assign) || function () {
    cookieStorage_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return cookieStorage_assign.apply(this, arguments);
};


var ONE_YEAR = 365;
/**
 * Data storage using browser cookies
 */
var CookieStorage = /** @class */ (function () {
    function CookieStorage(options) {
        if (options === void 0) { options = CookieStorage.defaults; }
        this.options = cookieStorage_assign(cookieStorage_assign({}, CookieStorage.defaults), options);
    }
    Object.defineProperty(CookieStorage, "defaults", {
        get: function () {
            return {
                maxage: ONE_YEAR,
                domain: tld(window.location.href),
                path: '/',
                sameSite: 'Lax',
            };
        },
        enumerable: false,
        configurable: true
    });
    CookieStorage.prototype.opts = function () {
        return {
            sameSite: this.options.sameSite,
            expires: this.options.maxage,
            domain: this.options.domain,
            path: this.options.path,
            secure: this.options.secure,
        };
    };
    CookieStorage.prototype.get = function (key) {
        var _a;
        try {
            var value = js_cookie.get(key);
            if (value === undefined || value === null) {
                return null;
            }
            try {
                return (_a = JSON.parse(value)) !== null && _a !== void 0 ? _a : null;
            }
            catch (e) {
                return (value !== null && value !== void 0 ? value : null);
            }
        }
        catch (e) {
            return null;
        }
    };
    CookieStorage.prototype.set = function (key, value) {
        if (typeof value === 'string') {
            js_cookie.set(key, value, this.opts());
        }
        else if (value === null) {
            js_cookie.remove(key, this.opts());
        }
        else {
            js_cookie.set(key, JSON.stringify(value), this.opts());
        }
    };
    CookieStorage.prototype.remove = function (key) {
        return js_cookie.remove(key, this.opts());
    };
    return CookieStorage;
}());


;// CONCATENATED MODULE: ./src/core/storage/localStorage.ts
/**
 * Data storage using browser's localStorage
 */
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
    }
    LocalStorage.prototype.localStorageWarning = function (key, state) {
        console.warn("Unable to access ".concat(key, ", localStorage may be ").concat(state));
    };
    LocalStorage.prototype.get = function (key) {
        var _a;
        try {
            var val = localStorage.getItem(key);
            if (val === null) {
                return null;
            }
            try {
                return (_a = JSON.parse(val)) !== null && _a !== void 0 ? _a : null;
            }
            catch (e) {
                return (val !== null && val !== void 0 ? val : null);
            }
        }
        catch (err) {
            this.localStorageWarning(key, 'unavailable');
            return null;
        }
    };
    LocalStorage.prototype.set = function (key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch (_a) {
            this.localStorageWarning(key, 'full');
        }
    };
    LocalStorage.prototype.remove = function (key) {
        try {
            return localStorage.removeItem(key);
        }
        catch (err) {
            this.localStorageWarning(key, 'unavailable');
        }
    };
    return LocalStorage;
}());


;// CONCATENATED MODULE: ./src/core/storage/index.ts











/**
 * Creates multiple storage systems from an array of StoreType and options
 * @param args StoreType and options
 * @returns Storage array
 */
function initializeStorages(args) {
    var storages = args.map(function (s) {
        var type;
        var settings;
        if (isStoreTypeWithSettings(s)) {
            type = s.name;
            settings = s.settings;
        }
        else {
            type = s;
        }
        switch (type) {
            case StoreType.Cookie:
                return new CookieStorage(settings);
            case StoreType.LocalStorage:
                return new LocalStorage();
            case StoreType.Memory:
                return new MemoryStorage();
            default:
                throw new Error("Unknown Store Type: ".concat(s));
        }
    });
    return storages;
}
/**
 * Injects the CookieOptions into a the arguments for initializeStorage
 * @param storeTypes list of storeType
 * @param cookieOptions cookie Options
 * @returns arguments for initializeStorage
 */
function applyCookieOptions(storeTypes, cookieOptions) {
    return storeTypes.map(function (s) {
        if (cookieOptions && s === StoreType.Cookie) {
            return {
                name: s,
                settings: cookieOptions,
            };
        }
        return s;
    });
}

;// CONCATENATED MODULE: ./src/core/user/index.ts
var user_extends = (undefined && undefined.__extends) || (function () {
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
var user_assign = (undefined && undefined.__assign) || function () {
    user_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return user_assign.apply(this, arguments);
};



var defaults = {
    persist: true,
    cookie: {
        key: 'rjs_user_id',
        oldKey: 'rjs_user',
    },
    localStorage: {
        key: 'rjs_user_traits',
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
            _this.identityStore.set(_this.anonKey, id !== null && id !== void 0 ? id : (0,dist.v4)());
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
        this.options = user_assign(user_assign({}, defaults), options);
        this.cookieOptions = cookieOptions;
        this.idKey = (_b = (_a = options.cookie) === null || _a === void 0 ? void 0 : _a.key) !== null && _b !== void 0 ? _b : defaults.cookie.key;
        this.traitsKey = (_d = (_c = options.localStorage) === null || _c === void 0 ? void 0 : _c.key) !== null && _d !== void 0 ? _d : defaults.localStorage.key;
        this.anonKey = 'rjs_anonymous_id';
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
        bindAll(this);
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
            traits = user_assign(user_assign({}, this.traits()), traits);
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

var groupDefaults = {
    persist: true,
    cookie: {
        key: 'rjs_group_id',
    },
    localStorage: {
        key: 'rjs_group_properties',
    },
};
var Group = /** @class */ (function (_super) {
    user_extends(Group, _super);
    function Group(options, cookie) {
        if (options === void 0) { options = groupDefaults; }
        var _this = _super.call(this, user_assign(user_assign({}, groupDefaults), options), cookie) || this;
        _this.anonymousId = function (_id) {
            return undefined;
        };
        bindAll(_this);
        return _this;
    }
    return Group;
}(User));


;// CONCATENATED MODULE: ./src/lib/is-thenable.ts
/**
 *  Check if  thenable
 *  (instanceof Promise doesn't respect realms)
 */
var is_thenable_isThenable = function (value) {
    return typeof value === 'object' &&
        value !== null &&
        'then' in value &&
        typeof value.then === 'function';
};

;// CONCATENATED MODULE: ./src/core/buffer/index.ts
var buffer_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var buffer_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var buffer_spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};




var flushSyncReceiverCalls = function (name, receiver, buffer) {
    buffer.getCalls(name).forEach(function (c) {
        // While the underlying methods are synchronous, the callReceiverMethod returns a promise,
        // which normalizes success and error states between async and non-async methods, with no perf penalty.
        callReceiverMethod(receiver, c).catch(console.error);
    });
};
var flushAddSourceMiddleware = function (receiver, buffer) { return buffer_awaiter(void 0, void 0, void 0, function () {
    var _i, _a, c;
    return buffer_generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _i = 0, _a = buffer.getCalls('addSourceMiddleware');
                _b.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 4];
                c = _a[_i];
                return [4 /*yield*/, callReceiverMethod(receiver, c).catch(console.error)];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); };
var flushOn = flushSyncReceiverCalls.bind(undefined, 'on');
/*
export const flushSetAnonymousID = flushSyncReceiverCalls.bind(
  this,
  'setAnonymousId'
)
 */
var flushReceiverCallsInNewTask = function (receiver, buffer) {
    buffer.toArray().forEach(function (m) {
        setTimeout(function () {
            callReceiverMethod(receiver, m).catch(console.error);
        }, 0);
    });
};
var popPageContext = function (args) {
    if (hasBufferedPageContextAsLastArg(args)) {
        var ctx = args.pop();
        return createPageContext(ctx);
    }
};
var hasBufferedPageContextAsLastArg = function (args) {
    var lastArg = args[args.length - 1];
    return isBufferedPageContext(lastArg);
};
/**
 *  Represents a buffered method call that occurred before initialization.
 */
var PreInitMethodCall = /** @class */ (function () {
    function PreInitMethodCall(method, args, resolve, reject) {
        if (resolve === void 0) { resolve = function () { }; }
        if (reject === void 0) { reject = console.error; }
        this.method = method;
        this.resolve = resolve;
        this.reject = reject;
        this.called = false;
        this.args = args;
    }
    return PreInitMethodCall;
}());

/**
 *  Represents any and all the buffered method calls that occurred before initialization.
 */
var PreInitMethodCallBuffer = /** @class */ (function () {
    function PreInitMethodCallBuffer() {
        var calls = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            calls[_i] = arguments[_i];
        }
        this._callMap = {};
        this.push.apply(this, calls);
    }
    Object.defineProperty(PreInitMethodCallBuffer.prototype, "calls", {
        /**
         * Pull any buffered method calls from the window object, and use them to hydrate the instance buffer.
         */
        get: function () {
            this._pushSnippetWindowBuffer();
            return this._callMap;
        },
        set: function (calls) {
            this._callMap = calls;
        },
        enumerable: false,
        configurable: true
    });
    PreInitMethodCallBuffer.prototype.getCalls = function (methodName) {
        var _a;
        return ((_a = this.calls[methodName]) !== null && _a !== void 0 ? _a : []);
    };
    PreInitMethodCallBuffer.prototype.push = function () {
        var _this = this;
        var calls = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            calls[_i] = arguments[_i];
        }
        calls.forEach(function (call) {
            var eventsExpectingPageContext = [
                'track',
                // 'screen',
                // 'alias',
                // 'group',
                // 'page',
                'identify',
            ];
            if (eventsExpectingPageContext.includes(call.method) &&
                !hasBufferedPageContextAsLastArg(call.args)) {
                call.args = buffer_spreadArray(buffer_spreadArray([], call.args, true), [getDefaultBufferedPageContext()], false);
            }
            if (_this.calls[call.method]) {
                _this.calls[call.method].push(call);
            }
            else {
                _this.calls[call.method] = [call];
            }
        });
    };
    PreInitMethodCallBuffer.prototype.clear = function () {
        // clear calls in the global snippet buffered array.
        this._pushSnippetWindowBuffer();
        // clear calls in this instance
        this.calls = {};
    };
    PreInitMethodCallBuffer.prototype.toArray = function () {
        var _a;
        return (_a = []).concat.apply(_a, Object.values(this.calls));
    };
    /**
     * Fetch the buffered method calls from the window object,
     * normalize them, and use them to hydrate the buffer.
     * This removes existing buffered calls from the window object.
     */
    PreInitMethodCallBuffer.prototype._pushSnippetWindowBuffer = function () {
        var wa = global_receiver_helper_getGlobalReceiver();
        if (!Array.isArray(wa))
            return undefined;
        var buffered = wa.splice(0, wa.length);
        var calls = buffered.map(function (_a) {
            var methodName = _a[0], args = _a.slice(1);
            return new PreInitMethodCall(methodName, args);
        });
        this.push.apply(this, calls);
    };
    return PreInitMethodCallBuffer;
}());

/**
 *  Call method and mark as "called"
 *  This function should never throw an error
 */
function callReceiverMethod(receiver, call) {
    return buffer_awaiter(this, void 0, Promise, function () {
        var result, err_1;
        return buffer_generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    if (call.called) {
                        return [2 /*return*/, undefined];
                    }
                    call.called = true;
                    result = receiver[call.method].apply(receiver, call.args);
                    if (!is_thenable_isThenable(result)) return [3 /*break*/, 2];
                    // do not defer for non-async methods
                    return [4 /*yield*/, result];
                case 1:
                    // do not defer for non-async methods
                    _a.sent();
                    _a.label = 2;
                case 2:
                    call.resolve(result);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    call.reject(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var ReceiverBuffered = /** @class */ (function () {
    function ReceiverBuffered(loader) {
        var _this = this;
        // trackSubmit = this._createMethod('trackSubmit')
        // trackClick = this._createMethod('trackClick')
        // trackLink = this._createMethod('trackLink')
        this.page = this._createMethod('page');
        this.pageView = this._createMethod('pageview');
        this.identify = this._createMethod('identify');
        this.reset = this._createMethod('reset');
        // group = this._createMethod('group') as ReceiverBrowserCore['group']
        this.track = this._createMethod('track');
        this.ready = this._createMethod('ready');
        // alias = this._createMethod('alias')
        this.debug = this._createChainableMethod('debug');
        this.once = this._createChainableMethod('once');
        this.off = this._createChainableMethod('off');
        this.on = this._createChainableMethod('on');
        this.addSourceMiddleware = this._createMethod('addSourceMiddleware');
        // setAnonymousId = this._createMethod('setAnonymousId')
        // addDestinationMiddleware = this._createMethod('addDestinationMiddleware')
        // screen = this._createMethod('screen')
        this.register = this._createMethod('register');
        this.deregister = this._createMethod('deregister');
        this.user = this._createMethod('user');
        this.VERSION = version;
        this._preInitBuffer = new PreInitMethodCallBuffer();
        this._promise = loader(this._preInitBuffer);
        this._promise
            .then(function (_a) {
            var ajs = _a[0], ctx = _a[1];
            _this.instance = ajs;
            _this.ctx = ctx;
        })
            .catch(function () {
            // intentionally do nothing...
            // this result of this promise will be caught by the 'catch' block on this class.
        });
    }
    ReceiverBuffered.prototype.then = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = this._promise).then.apply(_a, args);
    };
    ReceiverBuffered.prototype.catch = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = this._promise).catch.apply(_a, args);
    };
    ReceiverBuffered.prototype.finally = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = this._promise).finally.apply(_a, args);
    };
    ReceiverBuffered.prototype._createMethod = function (methodName) {
        var _this = this;
        return function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (_this.instance) {
                var result = (_a = _this.instance)[methodName].apply(_a, args);
                return Promise.resolve(result);
            }
            return new Promise(function (resolve, reject) {
                _this._preInitBuffer.push(new PreInitMethodCall(methodName, args, resolve, reject));
            });
        };
    };
    /**
     *  These are for methods that where determining when the method gets "flushed" is not important.
     *  These methods will resolve when receiver is fully initialized, and return type (other than Receiver)will not be available.
     */
    ReceiverBuffered.prototype._createChainableMethod = function (methodName) {
        var _this = this;
        return function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (_this.instance) {
                void (_a = _this.instance)[methodName].apply(_a, args);
                return _this;
            }
            else {
                _this._preInitBuffer.push(new PreInitMethodCall(methodName, args));
            }
            return _this;
        };
    };
    return ReceiverBuffered;
}());


;// CONCATENATED MODULE: ./src/core/receiver/index.ts
var receiver_extends = (undefined && undefined.__extends) || (function () {
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
var receiver_assign = (undefined && undefined.__assign) || function () {
    receiver_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return receiver_assign.apply(this, arguments);
};
var receiver_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var receiver_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var receiver_spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};











// import type { ExternalSettings } from '../../browser'

// import { setGlobalReceiver } from '../../lib/global-receiver-helper'

function createDefaultQueue(name, retryQueue, disablePersistance) {
    if (retryQueue === void 0) { retryQueue = false; }
    if (disablePersistance === void 0) { disablePersistance = false; }
    var maxAttempts = retryQueue ? 4 : 1;
    var priorityQueue = disablePersistance
        ? new PriorityQueue(maxAttempts, [])
        : new PersistedPriorityQueue(maxAttempts, name);
    return new EventQueue(priorityQueue);
}
var Receiver = /** @class */ (function (_super) {
    receiver_extends(Receiver, _super);
    function Receiver(
    // settings: ReceiverSettings,
    options, queue, user, group) {
        var _a, _b;
        var _this = _super.call(this) || this;
        _this._debug = false;
        _this.initialized = false;
        _this.user = function () {
            return _this._user;
        };
        var cookieOptions = options === null || options === void 0 ? void 0 : options.cookie;
        var disablePersistance = (_a = options === null || options === void 0 ? void 0 : options.disableClientPersistence) !== null && _a !== void 0 ? _a : false;
        _this.options = options !== null && options !== void 0 ? options : {};
        _this.options.timeout = (_b = _this.options.timeout) !== null && _b !== void 0 ? _b : 300;
        _this.queue =
            queue !== null && queue !== void 0 ? queue : createDefaultQueue("".concat(options.writeKey, ":event-queue"), options === null || options === void 0 ? void 0 : options.retryQueue, disablePersistance);
        var storageSetting = options === null || options === void 0 ? void 0 : options.storage;
        _this._universalStorage = _this.createStore(disablePersistance, storageSetting, cookieOptions);
        _this._user =
            user !== null && user !== void 0 ? user : new User(receiver_assign({ persist: !disablePersistance, storage: options === null || options === void 0 ? void 0 : options.storage }, options === null || options === void 0 ? void 0 : options.user), cookieOptions).load();
        _this._group =
            group !== null && group !== void 0 ? group : new Group(receiver_assign({ persist: !disablePersistance, storage: options === null || options === void 0 ? void 0 : options.storage }, options === null || options === void 0 ? void 0 : options.group), cookieOptions).load();
        _this.eventFactory = new EventFactory(_this._user);
        bindAll(_this);
        return _this;
    }
    // Creates the storage system based on the settings received
    Receiver.prototype.createStore = function (disablePersistance, storageSetting, cookieOptions) {
        // DisablePersistance option overrides all, no storage will be used outside of memory even if specified
        if (disablePersistance) {
            return new UniversalStorage([new MemoryStorage()]);
        }
        else {
            if (storageSetting) {
                if (isArrayOfStoreType(storageSetting)) {
                    // We will create the store with the priority for customer settings
                    return new UniversalStorage(initializeStorages(applyCookieOptions(storageSetting.stores, cookieOptions)));
                }
            }
        }
        // We default to our multi storage with priority
        return new UniversalStorage(initializeStorages([
            StoreType.LocalStorage,
            {
                name: StoreType.Cookie,
                settings: cookieOptions,
            },
            StoreType.Memory,
        ]));
    };
    Object.defineProperty(Receiver.prototype, "storage", {
        get: function () {
            return this._universalStorage;
        },
        enumerable: false,
        configurable: true
    });
    Receiver.prototype.page = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return receiver_awaiter(this, void 0, Promise, function () {
            var pageCtx, _a, category, page, properties, options, callback, tronicEvent;
            var _this = this;
            return receiver_generator(this, function (_b) {
                pageCtx = popPageContext(args);
                _a = resolvePageArguments.apply(void 0, args), category = _a[0], page = _a[1], properties = _a[2], options = _a[3], callback = _a[4];
                tronicEvent = this.eventFactory.page(category, page, properties, options, pageCtx);
                return [2 /*return*/, this._dispatch(tronicEvent, callback).then(function (ctx) {
                        _this.emit('page', category, page, ctx.event.properties, ctx.event.options);
                        return ctx;
                    })];
            });
        });
    };
    Receiver.prototype.track = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return receiver_awaiter(this, void 0, Promise, function () {
            var pageCtx, _a, name, data, options, callback, tronicEvent;
            var _this = this;
            return receiver_generator(this, function (_b) {
                pageCtx = popPageContext(args);
                _a = resolveTrackArguments.apply(void 0, args), name = _a[0], data = _a[1], options = _a[2], callback = _a[3];
                tronicEvent = this.eventFactory.track(name, data, options, pageCtx);
                return [2 /*return*/, this._dispatch(tronicEvent, callback).then(function (ctx) {
                        _this.emit('track', name, ctx.event.properties, ctx.event.options);
                        return ctx;
                    })];
            });
        });
    };
    Receiver.prototype.identify = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return receiver_awaiter(this, void 0, Promise, function () {
            var pageCtx, _a, id, _traits, options, callback, tronicEvent;
            var _this = this;
            return receiver_generator(this, function (_b) {
                pageCtx = popPageContext(args);
                _a = resolveUserArguments(this._user).apply(void 0, args), id = _a[0], _traits = _a[1], options = _a[2], callback = _a[3];
                this._user.identify(id, _traits);
                tronicEvent = this.eventFactory.identify(this._user.id(), this._user.traits(), options, pageCtx);
                return [2 /*return*/, this._dispatch(tronicEvent, callback).then(function (ctx) {
                        _this.emit('identify', ctx.event.userId, ctx.event.traits, ctx.event.options);
                        return ctx;
                    })];
            });
        });
    };
    Receiver.prototype.trackClick = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return receiver_awaiter(this, void 0, Promise, function () {
            var autotrack;
            var _a;
            return receiver_generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, __webpack_require__.e(/* import() | auto-track */ 119).then(__webpack_require__.bind(__webpack_require__, 956))];
                    case 1:
                        autotrack = _b.sent();
                        return [2 /*return*/, (_a = autotrack.link).call.apply(_a, receiver_spreadArray([this], args, false))];
                }
            });
        });
    };
    Receiver.prototype.trackLink = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return receiver_awaiter(this, void 0, Promise, function () {
            var autotrack;
            var _a;
            return receiver_generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, __webpack_require__.e(/* import() | auto-track */ 119).then(__webpack_require__.bind(__webpack_require__, 956))];
                    case 1:
                        autotrack = _b.sent();
                        return [2 /*return*/, (_a = autotrack.link).call.apply(_a, receiver_spreadArray([this], args, false))];
                }
            });
        });
    };
    Receiver.prototype.trackSubmit = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return receiver_awaiter(this, void 0, Promise, function () {
            var autotrack;
            var _a;
            return receiver_generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, __webpack_require__.e(/* import() | auto-track */ 119).then(__webpack_require__.bind(__webpack_require__, 956))];
                    case 1:
                        autotrack = _b.sent();
                        return [2 /*return*/, (_a = autotrack.form).call.apply(_a, receiver_spreadArray([this], args, false))];
                }
            });
        });
    };
    Receiver.prototype.trackForm = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return receiver_awaiter(this, void 0, Promise, function () {
            var autotrack;
            var _a;
            return receiver_generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, __webpack_require__.e(/* import() | auto-track */ 119).then(__webpack_require__.bind(__webpack_require__, 956))];
                    case 1:
                        autotrack = _b.sent();
                        return [2 /*return*/, (_a = autotrack.form).call.apply(_a, receiver_spreadArray([this], args, false))];
                }
            });
        });
    };
    Receiver.prototype.register = function () {
        var plugins = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            plugins[_i] = arguments[_i];
        }
        return receiver_awaiter(this, void 0, Promise, function () {
            var ctx, registrations;
            var _this = this;
            return receiver_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx = Context.system();
                        registrations = plugins.map(function (xt) {
                            return _this.queue.register(ctx, xt, _this);
                        });
                        return [4 /*yield*/, Promise.all(registrations)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, ctx];
                }
            });
        });
    };
    Receiver.prototype.deregister = function () {
        var plugins = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            plugins[_i] = arguments[_i];
        }
        return receiver_awaiter(this, void 0, Promise, function () {
            var ctx, deregistrations;
            var _this = this;
            return receiver_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx = Context.system();
                        deregistrations = plugins.map(function (pl) {
                            var plugin = _this.queue.plugins.find(function (p) { return p.name === pl; });
                            if (plugin) {
                                return _this.queue.deregister(ctx, plugin, _this);
                            }
                            else {
                                ctx.log('warn', "plugin ".concat(pl, " not found"));
                            }
                        });
                        return [4 /*yield*/, Promise.all(deregistrations)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, ctx];
                }
            });
        });
    };
    Receiver.prototype.debug = function (toggle) {
        // Make sure legacy ajs debug gets turned off if it was enabled before upgrading.
        if (toggle === false && localStorage.getItem('debug')) {
            localStorage.removeItem('debug');
        }
        this._debug = toggle;
        return this;
    };
    Receiver.prototype.reset = function () {
        this._user.reset();
        this._group.reset();
        this.emit('reset');
    };
    Receiver.prototype.timeout = function (timeout) {
        this.options.timeout = timeout;
    };
    Receiver.prototype._dispatch = function (event, callback) {
        return receiver_awaiter(this, void 0, Promise, function () {
            var ctx;
            return receiver_generator(this, function (_a) {
                ctx = new Context(event);
                if (isOffline() && !this.options.retryQueue) {
                    return [2 /*return*/, ctx];
                }
                return [2 /*return*/, dispatch(ctx, this.queue, this, {
                        callback: callback,
                        debug: this._debug,
                        timeout: this.options.timeout,
                    })];
            });
        });
    };
    Receiver.prototype.addSourceMiddleware = function (fn) {
        return receiver_awaiter(this, void 0, Promise, function () {
            var _this = this;
            return receiver_generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.queue.criticalTasks.run(function () { return receiver_awaiter(_this, void 0, void 0, function () {
                            var sourceMiddlewarePlugin, plugin;
                            return receiver_generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 338))
                                        /*
                                        const integrations: Record<string, boolean> = {}
                                      this.queue.plugins.forEach((plugin) => {
                                        if (plugin.type === 'destination') {
                                          return (integrations[plugin.name] = true)
                                        }
                                      })
                                         */
                                    ];
                                    case 1:
                                        sourceMiddlewarePlugin = (_a.sent()).sourceMiddlewarePlugin;
                                        plugin = sourceMiddlewarePlugin(fn) //, integrations)
                                        ;
                                        return [4 /*yield*/, this.register(plugin)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    // TODO: This does not have to return a promise?
    Receiver.prototype.addDestinationMiddleware = function (integrationName) {
        var middlewares = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            middlewares[_i - 1] = arguments[_i];
        }
        var legacyDestinations = this.queue.plugins.filter(function (xt) { return xt.name.toLowerCase() === integrationName.toLowerCase(); });
        legacyDestinations.forEach(function (destination) {
            destination.addMiddleware.apply(destination, middlewares);
        });
        return Promise.resolve(this);
    };
    Receiver.prototype.setAnonymousId = function (id) {
        return this._user.anonymousId(id);
    };
    Receiver.prototype.queryString = function (query) {
        return receiver_awaiter(this, void 0, Promise, function () {
            var queryString;
            return receiver_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.options.useQueryString === false) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, __webpack_require__.e(/* import() | queryString */ 96).then(__webpack_require__.bind(__webpack_require__, 473))];
                    case 1:
                        queryString = (_a.sent()).queryString;
                        return [2 /*return*/, queryString(this, query)];
                }
            });
        });
    };
    Receiver.prototype.ready = function (callback) {
        if (callback === void 0) { callback = function (res) { return res; }; }
        return receiver_awaiter(this, void 0, Promise, function () {
            return receiver_generator(this, function (_a) {
                return [2 /*return*/, Promise.all(this.queue.plugins.map(function (i) { return (i.ready ? i.ready() : Promise.resolve()); })).then(function (res) {
                        callback(res);
                        return res;
                    })];
            });
        });
    };
    Receiver.prototype.pageview = function (url) {
        return receiver_awaiter(this, void 0, Promise, function () {
            return receiver_generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page({ path: url })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    Object.defineProperty(Receiver.prototype, "VERSION", {
        get: function () {
            return version;
        },
        enumerable: false,
        configurable: true
    });
    // snippet function
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Receiver.prototype.push = function (args) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var an = this;
        var method = args.shift();
        if (method) {
            if (!an[method])
                return;
        }
        an[method].apply(this, args);
    };
    return Receiver;
}(Emitter));


;// CONCATENATED MODULE: ./src/lib/create-deferred.ts
/**
 * Return a promise that can be externally resolved
 */
var createDeferred = function () {
    var resolve;
    var reject;
    var promise = new Promise(function (_resolve, _reject) {
        resolve = _resolve;
        reject = _reject;
    });
    return {
        resolve: resolve,
        reject: reject,
        promise: promise,
    };
};

// EXTERNAL MODULE: ./src/core/query-string/gracefulDecodeURIComponent.ts
var gracefulDecodeURIComponent = __webpack_require__(863);
;// CONCATENATED MODULE: ./src/lib/client-hints/index.ts
var client_hints_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var client_hints_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function clientHints(hints) {
    return client_hints_awaiter(this, void 0, Promise, function () {
        var userAgentData;
        return client_hints_generator(this, function (_a) {
            userAgentData = navigator.userAgentData;
            if (!userAgentData)
                return [2 /*return*/, undefined];
            if (!hints)
                return [2 /*return*/, userAgentData.toJSON()];
            return [2 /*return*/, userAgentData
                    .getHighEntropyValues(hints)
                    .catch(function () { return userAgentData.toJSON(); })];
        });
    });
}

;// CONCATENATED MODULE: ./src/plugins/env-enrichment/index.ts
var env_enrichment_assign = (undefined && undefined.__assign) || function () {
    env_enrichment_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return env_enrichment_assign.apply(this, arguments);
};
var env_enrichment_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var env_enrichment_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var cookieOptions;
function getCookieOptions() {
    if (cookieOptions) {
        return cookieOptions;
    }
    var domain = tld(window.location.href);
    cookieOptions = {
        expires: 31536000000,
        secure: false,
        path: '/',
    };
    if (domain) {
        cookieOptions.domain = domain;
    }
    return cookieOptions;
}
function ads(query) {
    var queryIds = {
        btid: 'dataxu',
        urid: 'millennial-media',
    };
    if (query.startsWith('?')) {
        query = query.substring(1);
    }
    query = query.replace(/\?/g, '&');
    var parts = query.split('&');
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
        var part = parts_1[_i];
        var _a = part.split('='), k = _a[0], v = _a[1];
        if (queryIds[k]) {
            return {
                id: v,
                type: queryIds[k],
            };
        }
    }
}
function utm(query) {
    if (query.startsWith('?')) {
        query = query.substring(1);
    }
    query = query.replace(/\?/g, '&');
    return query.split('&').reduce(function (acc, str) {
        var _a = str.split('='), k = _a[0], _b = _a[1], v = _b === void 0 ? '' : _b;
        if (k.includes('utm_') && k.length > 4) {
            var utmParam = k.slice(4);
            if (utmParam === 'campaign') {
                utmParam = 'name';
            }
            acc[utmParam] = (0,gracefulDecodeURIComponent/* gracefulDecodeURIComponent */.a)(v);
        }
        return acc;
    }, {});
}
function ampId() {
    var ampId = js_cookie.get('_ga');
    if (ampId && ampId.startsWith('amp')) {
        return ampId;
    }
}
function referrerId(query, ctx, disablePersistance) {
    var _a;
    var storage = new UniversalStorage(disablePersistance ? [] : [new CookieStorage(getCookieOptions())]);
    var stored = storage.get('s:context.referrer');
    var ad = (_a = ads(query)) !== null && _a !== void 0 ? _a : stored;
    if (!ad) {
        return;
    }
    if (ctx) {
        ctx.referrer = env_enrichment_assign(env_enrichment_assign({}, ctx.referrer), ad);
    }
    storage.set('s:context.referrer', ad);
}
/**
 *
 * @param obj e.g. { foo: 'b', bar: 'd', baz: ['123', '456']}
 * @returns e.g. 'foo=b&bar=d&baz=123&baz=456'
 */
var objectToQueryString = function (obj) {
    try {
        var searchParams_1 = new URLSearchParams();
        Object.entries(obj).forEach(function (_a) {
            var k = _a[0], v = _a[1];
            if (Array.isArray(v)) {
                v.forEach(function (value) { return searchParams_1.append(k, value); });
            }
            else {
                searchParams_1.append(k, v);
            }
        });
        return searchParams_1.toString();
    }
    catch (_a) {
        return '';
    }
};
var EnvironmentEnrichmentPlugin = /** @class */ (function () {
    function EnvironmentEnrichmentPlugin() {
        var _this = this;
        this.name = 'Page Enrichment';
        this.type = 'before';
        this.version = '0.1.0';
        this.isLoaded = function () { return true; };
        this.load = function (_ctx, instance) { return env_enrichment_awaiter(_this, void 0, void 0, function () {
            var _a, _1;
            return env_enrichment_generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.instance = instance;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, clientHints(this.instance.options.highEntropyValuesClientHints)];
                    case 2:
                        _a.userAgentData = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _1 = _b.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, Promise.resolve()];
                }
            });
        }); };
        this.enrich = function (ctx) {
            var _a, _b;
            // Note: Types are off - context should never be undefined here, since it is set as part of event creation.
            var evtCtx = ctx.event.context;
            var search = evtCtx.page.search || '';
            var query = typeof search === 'object' ? objectToQueryString(search) : search;
            evtCtx.userAgent = navigator.userAgent;
            evtCtx.userAgentData = _this.userAgentData;
            // @ts-ignore
            var locale = navigator.userLanguage || navigator.language;
            if (typeof evtCtx.locale === 'undefined' && typeof locale !== 'undefined') {
                evtCtx.locale = locale;
            }
            (_a = evtCtx.library) !== null && _a !== void 0 ? _a : (evtCtx.library = {
                name: 'receiver.js',
                version: "".concat(getVersionType() === 'web' ? 'next' : 'npm:next', "-").concat(version),
            });
            if (query && !evtCtx.campaign) {
                evtCtx.campaign = utm(query);
            }
            var amp = ampId();
            if (amp) {
                evtCtx.amp = { id: amp };
            }
            referrerId(query, evtCtx, (_b = _this.instance.options.disableClientPersistence) !== null && _b !== void 0 ? _b : false);
            try {
                evtCtx.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            }
            catch (_) {
                // If browser doesn't have support leave timezone undefined
            }
            return ctx;
        };
        this.track = this.enrich;
        this.identify = this.enrich;
    }
    return EnvironmentEnrichmentPlugin;
}());
var envEnrichment = new EnvironmentEnrichmentPlugin();

;// CONCATENATED MODULE: ./src/lib/load-script.ts
function findScript(src) {
    var scripts = Array.prototype.slice.call(window.document.querySelectorAll('script'));
    return scripts.find(function (s) { return s.src === src; });
}
function loadScript(src, attributes) {
    var found = findScript(src);
    if (found !== undefined) {
        var status = found === null || found === void 0 ? void 0 : found.getAttribute('status');
        if (status === 'loaded') {
            return Promise.resolve(found);
        }
        if (status === 'loading') {
            return new Promise(function (resolve, reject) {
                found.addEventListener('load', function () { return resolve(found); });
                found.addEventListener('error', function (err) { return reject(err); });
            });
        }
    }
    return new Promise(function (resolve, reject) {
        var _a;
        var script = window.document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.async = true;
        script.setAttribute('status', 'loading');
        for (var _i = 0, _b = Object.entries(attributes !== null && attributes !== void 0 ? attributes : {}); _i < _b.length; _i++) {
            var _c = _b[_i], k = _c[0], v = _c[1];
            script.setAttribute(k, v);
        }
        script.onload = function () {
            script.onerror = script.onload = null;
            script.setAttribute('status', 'loaded');
            resolve(script);
        };
        script.onerror = function () {
            script.onerror = script.onload = null;
            script.setAttribute('status', 'error');
            reject(new Error("Failed to load ".concat(src)));
        };
        var tag = window.document.getElementsByTagName('script')[0];
        (_a = tag.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(script, tag);
    });
}
function unloadScript(src) {
    var found = findScript(src);
    if (found !== undefined) {
        found.remove();
    }
    return Promise.resolve();
}

// EXTERNAL MODULE: ./src/plugins/middleware/index.ts
var middleware = __webpack_require__(338);
;// CONCATENATED MODULE: ./src/plugins/remote-loader/index.ts
var remote_loader_assign = (undefined && undefined.__assign) || function () {
    remote_loader_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return remote_loader_assign.apply(this, arguments);
};
var remote_loader_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var remote_loader_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var RemoteDestinationPlugin = /** @class */ (function () {
    function RemoteDestinationPlugin(name, action) {
        this.version = '1.0.0';
        this.alternativeNames = [];
        this.middleware = [];
        this.identify = this._createMethod('identify');
        this.track = this._createMethod('track');
        this.action = action;
        this.name = name;
        this.type = action.type;
        this.alternativeNames.push(action.name);
    }
    RemoteDestinationPlugin.prototype.addMiddleware = function () {
        var _a;
        var fn = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fn[_i] = arguments[_i];
        }
        if (this.type === 'destination') {
            (_a = this.middleware).push.apply(_a, fn);
        }
    };
    RemoteDestinationPlugin.prototype.transform = function (ctx) {
        return remote_loader_awaiter(this, void 0, Promise, function () {
            var modifiedEvent;
            return remote_loader_generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0,middleware.applyDestinationMiddleware)(this.name, ctx.event, this.middleware)];
                    case 1:
                        modifiedEvent = _a.sent();
                        if (modifiedEvent === null) {
                            ctx.cancel(new context/* ContextCancelation */.Y({
                                retry: false,
                                reason: 'dropped by destination middleware',
                            }));
                        }
                        return [2 /*return*/, new Context(modifiedEvent)];
                }
            });
        });
    };
    RemoteDestinationPlugin.prototype._createMethod = function (methodName) {
        var _this = this;
        return function (ctx) { return remote_loader_awaiter(_this, void 0, Promise, function () {
            var transformedContext;
            return remote_loader_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.action[methodName])
                            return [2 /*return*/, ctx];
                        transformedContext = ctx;
                        if (!(this.type === 'destination')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.transform(ctx)];
                    case 1:
                        transformedContext = _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.action[methodName](transformedContext)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, ctx];
                }
            });
        }); };
    };
    // --- PASSTHROUGH METHODS ---
    RemoteDestinationPlugin.prototype.isLoaded = function () {
        return this.action.isLoaded();
    };
    RemoteDestinationPlugin.prototype.ready = function () {
        return this.action.ready ? this.action.ready() : Promise.resolve();
    };
    RemoteDestinationPlugin.prototype.load = function (ctx, receiver) {
        return this.action.load(ctx, receiver);
    };
    RemoteDestinationPlugin.prototype.unload = function (ctx, receiver) {
        var _a, _b;
        return (_b = (_a = this.action).unload) === null || _b === void 0 ? void 0 : _b.call(_a, ctx, receiver);
    };
    return RemoteDestinationPlugin;
}());

function validate(pluginLike) {
    if (!Array.isArray(pluginLike)) {
        throw new Error('Not a valid list of plugins');
    }
    var required = ['load', 'isLoaded', 'name', 'version', 'type'];
    pluginLike.forEach(function (plugin) {
        required.forEach(function (method) {
            var _a;
            if (plugin[method] === undefined) {
                throw new Error("Plugin: ".concat((_a = plugin.name) !== null && _a !== void 0 ? _a : 'unknown', " missing required function ").concat(method));
            }
        });
    });
    return true;
}
function isPluginDisabled(
// userIntegrations: Integrations,
// remotePlugin: RemotePluginConfig
) {
    /*
    const creationNameEnabled = userIntegrations[remotePlugin.creationName]
    const currentNameEnabled = userIntegrations[remotePlugin.name]
  
    // Check that the plugin isn't explicitly enabled when All: false
    if (
      userIntegrations.All === false &&
      !creationNameEnabled &&
      !currentNameEnabled
    ) {
      return true
    }
  
    // Check that the plugin isn't explicitly disabled
    if (creationNameEnabled === false || currentNameEnabled === false) {
      return true
    }
     */
    return false;
}
function loadPluginFactory(remotePlugin, obfuscate) {
    return remote_loader_awaiter(this, void 0, Promise, function () {
        var defaultCdn, cdn, urlSplit, name, obfuscatedURL, error_1;
        return remote_loader_generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    defaultCdn = new RegExp('https://cdn.tronic.(com|build)');
                    cdn = getCDN();
                    if (!obfuscate) return [3 /*break*/, 6];
                    urlSplit = remotePlugin.url.split('/');
                    name = urlSplit[urlSplit.length - 2];
                    obfuscatedURL = remotePlugin.url.replace(name, btoa(name).replace(/=/g, ''));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 5]);
                    return [4 /*yield*/, loadScript(obfuscatedURL.replace(defaultCdn, cdn))];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    // Due to syncing concerns it is possible that the obfuscated action destination (or requested version) might not exist.
                    // We should use the unobfuscated version as a fallback.
                    return [4 /*yield*/, loadScript(remotePlugin.url.replace(defaultCdn, cdn))];
                case 4:
                    // Due to syncing concerns it is possible that the obfuscated action destination (or requested version) might not exist.
                    // We should use the unobfuscated version as a fallback.
                    _a.sent();
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, loadScript(remotePlugin.url.replace(defaultCdn, cdn))];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    // @ts-expect-error
                    if (typeof window[remotePlugin.libraryName] === 'function') {
                        // @ts-expect-error
                        return [2 /*return*/, window[remotePlugin.libraryName]];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function remoteLoader(
// settings: ExternalSettings,
// obfuscate?: boolean,
options, pluginSources) {
    var _a;
    return remote_loader_awaiter(this, void 0, Promise, function () {
        var allPlugins, pluginPromises;
        var _this = this;
        return remote_loader_generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    allPlugins = [];
                    pluginPromises = ((_a = options.remotePlugins) !== null && _a !== void 0 ? _a : []).map(function (remotePlugin) { return remote_loader_awaiter(_this, void 0, void 0, function () {
                        var pluginFactory, _a, plugin, plugins, error_2;
                        return remote_loader_generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (isPluginDisabled( /* userIntegrations, remotePlugin */))
                                        return [2 /*return*/];
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 6, , 7]);
                                    _a = (pluginSources === null || pluginSources === void 0 ? void 0 : pluginSources.find(function (_a) {
                                        var pluginName = _a.pluginName;
                                        return pluginName === remotePlugin.name;
                                    }));
                                    if (_a) return [3 /*break*/, 3];
                                    return [4 /*yield*/, loadPluginFactory(remotePlugin, options.obfuscate)];
                                case 2:
                                    _a = (_b.sent());
                                    _b.label = 3;
                                case 3:
                                    pluginFactory = _a;
                                    if (!pluginFactory) return [3 /*break*/, 5];
                                    return [4 /*yield*/, pluginFactory(remote_loader_assign({}, remotePlugin.settings))];
                                case 4:
                                    plugin = _b.sent();
                                    plugins = Array.isArray(plugin) ? plugin : [plugin];
                                    validate(plugins);
                                    plugins.forEach(function (plugin) {
                                        var wrapper = new RemoteDestinationPlugin(remotePlugin.creationName, plugin);
                                        allPlugins.push(wrapper);
                                    });
                                    _b.label = 5;
                                case 5: return [3 /*break*/, 7];
                                case 6:
                                    error_2 = _b.sent();
                                    console.warn('Failed to load Remote Plugin', error_2);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(pluginPromises)];
                case 1:
                    _b.sent();
                    return [2 /*return*/, allPlugins.filter(Boolean)];
            }
        });
    });
}

// EXTERNAL MODULE: ./src/lib/to-facade.ts
var to_facade = __webpack_require__(950);
;// CONCATENATED MODULE: ./src/lib/on-page-change.ts
/**
 * Register event listener on document that fires when:
 * * tab change or tab close (in mobile or desktop)
 * * click back / forward button
 * * click any link or perform any other navigation action
 * * soft refresh / hard refresh
 *
 * adapted from https://stackoverflow.com/questions/3239834/window-onbeforeunload-not-working-on-the-ipad/52864508#52864508,
 */
var onPageChange = function (cb) {
    var unloaded = false; // prevents double firing if both are supported
    window.addEventListener('pagehide', function () {
        if (unloaded)
            return;
        unloaded = true;
        cb(unloaded);
    });
    // using document instead of window because of bug affecting browsers before safari 14 (detail in footnotes https://caniuse.com/?search=visibilitychange)
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState == 'hidden') {
            if (unloaded)
                return;
            unloaded = true;
        }
        else {
            unloaded = false;
        }
        cb(unloaded);
    });
};

;// CONCATENATED MODULE: ./src/plugins/tronic/batched-dispatcher.ts
var batched_dispatcher_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var batched_dispatcher_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var batched_dispatcher_rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};


var MAX_PAYLOAD_SIZE = 500;
function kilobytes(buffer) {
    var size = encodeURI(JSON.stringify(buffer)).split(/%..|./).length - 1;
    return size / 1024;
}
/**
 * Checks if the payload is over or close to
 * the maximum payload size allowed by tracking
 * API.
 */
function approachingTrackingAPILimit(buffer) {
    return kilobytes(buffer) >= MAX_PAYLOAD_SIZE - 50;
}
function chunks(batch) {
    var result = [];
    var index = 0;
    batch.forEach(function (item) {
        var size = kilobytes(result[index]);
        if (size >= 64) {
            index++;
        }
        if (result[index]) {
            result[index].push(item);
        }
        else {
            result[index] = [item];
        }
    });
    return result;
}
function batch(apiHost, config) {
    var _a, _b;
    var buffer = [];
    var pageUnloaded = false;
    var limit = (_a = config === null || config === void 0 ? void 0 : config.size) !== null && _a !== void 0 ? _a : 10;
    var timeout = (_b = config === null || config === void 0 ? void 0 : config.timeout) !== null && _b !== void 0 ? _b : 5000;
    function sendBatch(batch) {
        var _a;
        if (batch.length === 0) {
            return;
        }
        var writeKey = (_a = batch[0]) === null || _a === void 0 ? void 0 : _a.writeKey;
        // Remove sentAt from every event as batching only needs a single timestamp
        var updatedBatch = batch.map(function (event) {
            var _a = event, sentAt = _a.sentAt, newEvent = batched_dispatcher_rest(_a, ["sentAt"]);
            return newEvent;
        });
        return fetch("https://".concat(apiHost, "/b"), {
            keepalive: pageUnloaded,
            headers: {
                'Content-Type': 'text/plain',
            },
            method: 'post',
            body: JSON.stringify({
                writeKey: writeKey,
                batch: updatedBatch,
                sentAt: new Date().toISOString(),
            }),
        });
    }
    function flush() {
        return batched_dispatcher_awaiter(this, void 0, Promise, function () {
            var batch_1;
            return batched_dispatcher_generator(this, function (_a) {
                if (buffer.length) {
                    batch_1 = buffer;
                    buffer = [];
                    return [2 /*return*/, sendBatch(batch_1)];
                }
                return [2 /*return*/];
            });
        });
    }
    var schedule;
    function scheduleFlush() {
        if (schedule) {
            return;
        }
        schedule = setTimeout(function () {
            schedule = undefined;
            flush().catch(console.error);
        }, timeout);
    }
    onPageChange(function (unloaded) {
        pageUnloaded = unloaded;
        if (pageUnloaded && buffer.length) {
            var reqs = chunks(buffer).map(sendBatch);
            Promise.all(reqs).catch(console.error);
        }
    });
    function dispatch(_url, body) {
        return batched_dispatcher_awaiter(this, void 0, Promise, function () {
            var bufferOverflow;
            return batched_dispatcher_generator(this, function (_a) {
                buffer.push(body);
                bufferOverflow = buffer.length >= limit || approachingTrackingAPILimit(buffer);
                return [2 /*return*/, bufferOverflow || pageUnloaded ? flush() : scheduleFlush()];
            });
        });
    }
    return {
        dispatch: dispatch,
    };
}

;// CONCATENATED MODULE: ./src/plugins/tronic/fetch-dispatcher.ts

/* harmony default export */ function fetch_dispatcher(writeKey, config) {
    function dispatch(url, body) {
        return fetch(url, {
            keepalive: config === null || config === void 0 ? void 0 : config.keepalive,
            headers: {
                // 'Content-Type': 'text/plain',
                "Content-Type": "application/json",
            },
            method: "post",
            body: JSON.stringify(body),
        });
    }
    return {
        dispatch: dispatch,
    };
}

;// CONCATENATED MODULE: ./src/plugins/tronic/normalize.ts
function normalize(receiver, json, settings) {
    var _a, _b;
    var user = receiver.user();
    delete json.options;
    json.writeKey = (_b = (_a = settings === null || settings === void 0 ? void 0 : settings.apiKey) !== null && _a !== void 0 ? _a : receiver.options.writeKey) !== null && _b !== void 0 ? _b : '';
    json.userId = json.userId || user.id();
    if (json.userId) {
        delete json.anonymousId;
        json.anonymousId = json.anonymousId || user.anonymousId();
    }
    // json.sentAt = new Date()
    /*
    const failed = receiver.queue.failedInitializations || []
    if (failed.length > 0) {
      json._metadata = { failedInitializations: failed }
    }
     */
    return json;
}

;// CONCATENATED MODULE: ./src/lib/p-while.ts
var p_while_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var p_while_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var pWhile = function (condition, action) { return p_while_awaiter(void 0, void 0, Promise, function () {
    var loop;
    return p_while_generator(this, function (_a) {
        loop = function (actionResult) { return p_while_awaiter(void 0, void 0, Promise, function () {
            var _a;
            return p_while_generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!condition(actionResult)) return [3 /*break*/, 2];
                        _a = loop;
                        return [4 /*yield*/, action()];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        return [2 /*return*/, loop(undefined)];
    });
}); };

;// CONCATENATED MODULE: ./src/plugins/tronic/schedule-flush.ts
var schedule_flush_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var schedule_flush_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




function flushQueue(xt, queue) {
    return schedule_flush_awaiter(this, void 0, Promise, function () {
        var failedQueue;
        var _this = this;
        return schedule_flush_generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    failedQueue = [];
                    if (isOffline()) {
                        return [2 /*return*/, queue];
                    }
                    return [4 /*yield*/, pWhile(function () { return queue.length > 0 && !isOffline(); }, function () { return schedule_flush_awaiter(_this, void 0, void 0, function () {
                            var ctx, result, success;
                            return schedule_flush_generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        ctx = queue.pop();
                                        if (!ctx) {
                                            return [2 /*return*/];
                                        }
                                        return [4 /*yield*/, attempt(ctx, xt)];
                                    case 1:
                                        result = _a.sent();
                                        success = result instanceof Context;
                                        if (!success) {
                                            failedQueue.push(ctx);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); })
                        // re-add failed tasks
                    ];
                case 1:
                    _a.sent();
                    // re-add failed tasks
                    failedQueue.map(function (failed) { return queue.pushWithBackoff(failed); });
                    return [2 /*return*/, queue];
            }
        });
    });
}
function scheduleFlush(flushing, buffer, xt, scheduleFlush) {
    var _this = this;
    if (flushing) {
        return;
    }
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    setTimeout(function () { return schedule_flush_awaiter(_this, void 0, void 0, function () {
        var isFlushing, newBuffer;
        return schedule_flush_generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    isFlushing = true;
                    return [4 /*yield*/, flushQueue(xt, buffer)];
                case 1:
                    newBuffer = _a.sent();
                    isFlushing = false;
                    if (buffer.todo > 0) {
                        scheduleFlush(isFlushing, newBuffer, xt, scheduleFlush);
                    }
                    return [2 /*return*/];
            }
        });
    }); }, Math.random() * 5000);
}

;// CONCATENATED MODULE: ./src/plugins/tronic/index.ts
var tronic_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var tronic_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









/*
type JSON = ReturnType<Facade['json']>
function onAlias(receiver: Receiver, json: JSON): JSON {
  const user = receiver.user()
  json.previousId =
    json.previousId ?? json.from ?? user.id() ?? user.anonymousId()
  json.userId = json.userId ?? json.to
  delete json.from
  delete json.to
  return json
}
  */
function tronic(receiver, settings) {
    var _a, _b, _c, _d;
    // Attach `pagehide` before buffer is created so that inflight events are added
    // to the buffer before the buffer persists events in its own `pagehide` handler.
    window.addEventListener('pagehide', function () {
        buffer.push.apply(buffer, Array.from(inflightEvents));
        inflightEvents.clear();
    });
    var writeKey = (_b = (_a = settings === null || settings === void 0 ? void 0 : settings.apiKey) !== null && _a !== void 0 ? _a : receiver.options.writeKey) !== null && _b !== void 0 ? _b : '';
    var buffer = receiver.options.disableClientPersistence
        ? new PriorityQueue(receiver.queue.queue.maxAttempts, [])
        : new PersistedPriorityQueue(receiver.queue.queue.maxAttempts, "".concat(writeKey, ":dest-tronic"));
    var inflightEvents = new Set();
    var flushing = false;
    var apiHost = (_c = settings === null || settings === void 0 ? void 0 : settings.apiHost) !== null && _c !== void 0 ? _c : TRONIC_API_HOST;
    var protocol = (_d = settings === null || settings === void 0 ? void 0 : settings.protocol) !== null && _d !== void 0 ? _d : 'https';
    var remote = "".concat(protocol, "://").concat(apiHost);
    var deliveryStrategy = settings === null || settings === void 0 ? void 0 : settings.deliveryStrategy;
    var client = (deliveryStrategy === null || deliveryStrategy === void 0 ? void 0 : deliveryStrategy.strategy) === 'batching'
        ? batch(apiHost, deliveryStrategy.config)
        : fetch_dispatcher(writeKey, deliveryStrategy === null || deliveryStrategy === void 0 ? void 0 : deliveryStrategy.config);
    function send(ctx) {
        return tronic_awaiter(this, void 0, Promise, function () {
            var path, json;
            return tronic_generator(this, function (_a) {
                if (isOffline()) {
                    buffer.push(ctx);
                    // eslint-disable-next-line @typescript-eslint/no-use-before-define
                    scheduleFlush(flushing, buffer, tronic, scheduleFlush);
                    return [2 /*return*/, ctx];
                }
                inflightEvents.add(ctx);
                path = ctx.event.type;
                json = (0,to_facade/* toFacade */.D)(ctx.event).json();
                delete json.type;
                delete json.messageId;
                if (ctx.event.type === 'track') {
                    delete json.traits;
                    delete json.sentAt;
                }
                /*
                if (ctx.event.type === 'alias') {
                  json = onAlias(receiver, json)
                }
                 */
                return [2 /*return*/, client
                        .dispatch("".concat(remote, "/").concat(path), normalize(receiver, json, settings))
                        .then(function () { return ctx; })
                        .catch(function () {
                        buffer.pushWithBackoff(ctx);
                        // eslint-disable-next-line @typescript-eslint/no-use-before-define
                        scheduleFlush(flushing, buffer, tronic, scheduleFlush);
                        return ctx;
                    })
                        .finally(function () {
                        inflightEvents.delete(ctx);
                    })];
            });
        });
    }
    var tronic = {
        name: 'Tronic',
        type: 'after',
        version: '0.1.0',
        isLoaded: function () { return true; },
        load: function () { return Promise.resolve(); },
        track: send,
        identify: send,
    };
    // Buffer may already have items if they were previously stored in localStorage.
    // Start flushing them immediately.
    if (buffer.todo) {
        scheduleFlush(flushing, buffer, tronic, scheduleFlush);
    }
    return tronic;
}

;// CONCATENATED MODULE: ../core/dist/esm/validation/errors.js
var errors_extends = (undefined && undefined.__extends) || (function () {
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
var errors_ValidationError = /** @class */ (function (_super) {
    errors_extends(ValidationError, _super);
    function ValidationError(field, message) {
        var _this = _super.call(this, "".concat(field, " ").concat(message)) || this;
        _this.field = field;
        return _this;
    }
    return ValidationError;
}(Error));

//# sourceMappingURL=errors.js.map
;// CONCATENATED MODULE: ../core/dist/esm/validation/assertions.js


var stringError = 'is not a string';
var objError = 'is not an object';
var nilError = 'is nil';
function assertUserIdentity(event) {
    var USER_FIELD_NAME = '.userId/anonymousId/previousId/groupId';
    var getAnyUserId = function (event) { var _a, _b, _c; return (_c = (_b = (_a = event.userId) !== null && _a !== void 0 ? _a : event.anonymousId) !== null && _b !== void 0 ? _b : event.groupId) !== null && _c !== void 0 ? _c : event.previousId; };
    var id = getAnyUserId(event);
    if (!(0,helpers/* exists */.Gg)(id)) {
        throw new errors_ValidationError(USER_FIELD_NAME, nilError);
    }
    else if (!(0,helpers/* isString */.HD)(id)) {
        throw new errors_ValidationError(USER_FIELD_NAME, stringError);
    }
}
function assertEventExists(event) {
    if (!(0,helpers/* exists */.Gg)(event)) {
        throw new errors_ValidationError('Event', nilError);
    }
    if (typeof event !== 'object') {
        throw new errors_ValidationError('Event', objError);
    }
}
function assertEventType(event) {
    if (!(0,helpers/* isString */.HD)(event.type)) {
        throw new errors_ValidationError('.type', stringError);
    }
}
function assertTrackEventName(event) {
    if (!(0,helpers/* isString */.HD)(event.event)) {
        throw new errors_ValidationError('.event', stringError);
    }
}
function assertTrackEventProperties(event) {
    if (!isPlainObject(event.properties)) {
        throw new ValidationError('.properties', objError);
    }
}
function assertTraits(event) {
    if (!isPlainObject(event.traits)) {
        throw new ValidationError('.traits', objError);
    }
}
function validateEvent(event) {
    assertEventExists(event);
    assertEventType(event);
    if (event.type === 'track') {
        assertTrackEventName(event);
        assertTrackEventProperties(event);
    }
    if (['group', 'identify'].includes(event.type)) {
        assertTraits(event);
    }
    assertUserIdentity(event);
}
//# sourceMappingURL=assertions.js.map
;// CONCATENATED MODULE: ./src/plugins/validation/index.ts

function validation_validate(ctx) {
    var event = ctx.event;
    assertEventExists(event);
    assertEventType(event);
    if (event.type === 'track') {
        assertTrackEventName(event);
    }
    /*
  const props = event.properties ?? event.traits
  if (event.type !== 'alias' && !isPlainObject(props)) {
    throw new ValidationError('.properties', 'is not an object')
  }
     */
    assertUserIdentity(event);
    return ctx;
}
var validation = {
    name: 'Event Validation',
    type: 'before',
    version: '1.0.0',
    isLoaded: function () { return true; },
    load: function () { return Promise.resolve(); },
    track: validation_validate,
    identify: validation_validate,
};

;// CONCATENATED MODULE: ./src/core/inspector/index.ts
var _a;
var _b;

var env = getGlobal();
// The code below assumes the inspector extension will use Object.assign
// to add the inspect interface on to this object reference (unless the
// extension code ran first and has already set up the variable)
var inspectorHost = ((_a = (_b = env)['__TRONIC_INSPECTOR__']) !== null && _a !== void 0 ? _a : (_b['__TRONIC_INSPECTOR__'] = {}));
var attachInspector = function (receiver) { var _a; return (_a = inspectorHost.attach) === null || _a === void 0 ? void 0 : _a.call(inspectorHost, receiver); };

;// CONCATENATED MODULE: ./src/browser/index.ts
var browser_extends = (undefined && undefined.__extends) || (function () {
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
var browser_assign = (undefined && undefined.__assign) || function () {
    browser_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return browser_assign.apply(this, arguments);
};
var browser_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var browser_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var browser_spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};

// import { fetch } from '../lib/fetch'

// import { MetricsOptions } from '../core/stats/remote-metrics'
// import { mergedOptions } from '../lib/merged-options'









/*
export interface LegacyIntegrationConfiguration {
// @deprecated - This does not indicate browser types anymore
  type?: string

  versionSettings?: {
    version?: string
    override?: string
    componentTypes?: Array<'browser' | 'android' | 'ios' | 'server'>
  }

  bundlingStatus?: string

 // Consent settings for the integration
  consentSettings?: {
  // Consent categories for the integration
  // @example ["Receiver", "Advertising", "CAT001"]
    categories: string[]
  }

  // Tronic.com specific
  // retryQueue?: boolean

  // any extra unknown settings
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
*/
/*
export interface ExternalSettings {

  metrics?: MetricsOptions

  remotePlugins?: RemotePlugin[]

  // Top level consent settings
  consentSettings?: {

     // All unique consent categories.
     // There can be categories in this array that are important for consent that are not included in any integration  (e.g. 2 cloud mode categories).
     // @example ["Receiver", "Advertising", "CAT001"]

    allCategories: string[]
  }
}

export interface ReceiverBrowserSettings extends ReceiverSettings {

  // The settings for the Tronic Source.
  // If provided, `ReceiverBrowser` will not fetch remote settings
  // for the source.

  cdnSettings?: ExternalSettings & Record<string, unknown>
    // If provided, will override the default CDN.

  cdnURL?: string
}
  */
/*
export function fetchSettings(
  writeKey: string,
  cdnURL?: string
): Promise<ExternalSettings> {
  const baseUrl = cdnURL ?? getCDN()

  return fetch(`${baseUrl}/v1/projects/${writeKey}/settings`)
    .then((res) => {
      if (!res.ok) {
        return res.text().then((errorResponseMessage) => {
          throw new Error(errorResponseMessage)
        })
      }
      return res.json()
    })
    .catch((err) => {
      console.error(err.message)
      throw err
    })
}
 */
// With AJS classic, we allow users to call setAnonymousId before the library initialization.
// This is important because some of the destinations will use the anonymousId during the initialization,
// and if we set anonId afterwards, that wouldn’t impact the destination.
//
// Also Ensures events can be registered before library initialization.
// This is important so users can register to 'initialize' and any events that may fire early during setup.
function flushPreBuffer(receiver, buffer) {
    // flushSetAnonymousID(receiver, buffer)
    flushOn(receiver, buffer);
}
// Finish flushing buffer and cleanup.
function flushFinalBuffer(receiver, buffer) {
    return browser_awaiter(this, void 0, Promise, function () {
        return browser_generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Call popSnippetWindowBuffer before each flush task since there may be
                // receiver calls during async function calls.
                return [4 /*yield*/, flushAddSourceMiddleware(receiver, buffer)];
                case 1:
                    // Call popSnippetWindowBuffer before each flush task since there may be
                    // receiver calls during async function calls.
                    _a.sent();
                    flushReceiverCallsInNewTask(receiver, buffer);
                    // Clear buffer, just in case receiver is loaded twice; we don't want to fire events off again.
                    buffer.clear();
                    return [2 /*return*/];
            }
        });
    });
}
function registerPlugins(receiver, 
// writeKey: string,
// externalSettings: ExternalSettings,
options, pluginLikes) {
    var _a;
    if (pluginLikes === void 0) { pluginLikes = []; }
    return browser_awaiter(this, void 0, Promise, function () {
        var plugins, pluginSources, remotePlugins, toRegister, _b, ctx;
        return browser_generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    plugins = pluginLikes === null || pluginLikes === void 0 ? void 0 : pluginLikes.filter(function (pluginLike) { return typeof pluginLike === 'object'; });
                    pluginSources = pluginLikes === null || pluginLikes === void 0 ? void 0 : pluginLikes.filter(function (pluginLike) {
                        return typeof pluginLike === 'function' &&
                            typeof pluginLike.pluginName === 'string';
                    });
                    return [4 /*yield*/, remoteLoader(options, // externalSettings,
                        // { All: true }, // receiver.integrations,
                        // mergedSettings,
                        // options.obfuscate,
                        pluginSources).catch(function () { return []; })];
                case 1:
                    remotePlugins = _c.sent();
                    _b = [browser_spreadArray(browser_spreadArray([
                            validation,
                            envEnrichment
                        ], plugins, true), remotePlugins, true)];
                    return [4 /*yield*/, tronic(receiver, 
                        // mergedSettings['Tronic'] as TronicSettings,
                        (_a = options.pluginSettings) === null || _a === void 0 ? void 0 : _a['Tronic'])];
                case 2:
                    toRegister = browser_spreadArray.apply(void 0, _b.concat([[
                            _c.sent()
                        ], false]));
                    return [4 /*yield*/, receiver.register.apply(receiver, toRegister)];
                case 3:
                    ctx = _c.sent();
                    /*
                  if (
                    Object.entries(externalSettings.enabledMiddleware ?? {}).some(
                      ([, enabled]) => enabled
                    )
                  ) {
                    await import(
                    //// webpackChunkName: "remoteMiddleware" //// '../plugins/remote-middleware'
                    ).then(async ({ remoteMiddlewares }) => {
                      const middleware = await remoteMiddlewares(
                        ctx,
                        externalSettings,
                        options.obfuscate
                      )
                      const promises = middleware.map((mdw) =>
                        receiver.addSourceMiddleware(mdw)
                      )
                      return Promise.all(promises)
                    })
                  }
                  */
                    return [2 /*return*/, ctx];
            }
        });
    });
}
function loadReceiver(
// settings: ReceiverBrowserSettings,
options, preInitBuffer) {
    var _a, _b, _c;
    return browser_awaiter(this, void 0, Promise, function () {
        var receiver, plugins, ctx, search, hash, term;
        return browser_generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (options.globalReceiverKey) {
                        setGlobalReceiverKey(options.globalReceiverKey);
                    }
                    // this is an ugly side-effect, but it's for the benefits of the plugins that get their cdn via getCDN()
                    if (options.cdnURL) {
                        setGlobalCDNUrl(options.cdnURL);
                    }
                    receiver = new Receiver(options);
                    attachInspector(receiver);
                    plugins = (_a = options.plugins) !== null && _a !== void 0 ? _a : [];
                    Stats.initRemoteMetrics(options.metrics);
                    // needs to be flushed before plugins are registered
                    flushPreBuffer(receiver, preInitBuffer);
                    return [4 /*yield*/, registerPlugins(receiver, options, plugins)];
                case 1:
                    ctx = _d.sent();
                    search = (_b = window.location.search) !== null && _b !== void 0 ? _b : '';
                    hash = (_c = window.location.hash) !== null && _c !== void 0 ? _c : '';
                    term = search.length ? search : hash.replace(/(?=#).*(?=\?)/, '');
                    if (!term.includes('rjs_')) return [3 /*break*/, 3];
                    return [4 /*yield*/, receiver.queryString(term).catch(console.error)];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    receiver.initialized = true;
                    receiver.emit('initialize', options);
                    if (options.initialPageview) {
                        receiver.page().catch(console.error);
                    }
                    return [4 /*yield*/, flushFinalBuffer(receiver, preInitBuffer)];
                case 4:
                    _d.sent();
                    return [2 /*return*/, [receiver, ctx]];
            }
        });
    });
}
var ReceiverBrowser = /** @class */ (function (_super) {
    browser_extends(ReceiverBrowser, _super);
    function ReceiverBrowser() {
        var _this = this;
        var _a = createDeferred(), loadStart = _a.promise, resolveLoadStart = _a.resolve;
        _this = _super.call(this, function (buffer) {
            return loadStart.then(function (_a) {
                var options = _a[0];
                return loadReceiver(options, buffer);
            });
        }) || this;
        _this._resolveLoadStart = function (options) {
            return resolveLoadStart([options]);
        };
        return _this;
    }
    //
    // Fully initialize an receiver instance, including:
    // Fetching settings from the Tronic CDN (by default).
    // Fetching all remote destinations configured by the user (if applicable).
    // Flushing buffered receiver events.
    // Loading all middleware.
    //
    // Note:️  This method should only be called *once* in your application.
    ReceiverBrowser.prototype.load = function (options) {
        this._resolveLoadStart(options);
        return this;
    };
    // Instantiates an object exposing Receiver methods.
    ReceiverBrowser.load = function (options) {
        return new ReceiverBrowser().load(options);
    };
    ReceiverBrowser.standalone = function (writeKey, options) {
        return ReceiverBrowser.load(browser_assign(browser_assign({}, options), { writeKey: writeKey })).then(function (res) { return res[0]; });
    };
    return ReceiverBrowser;
}(ReceiverBuffered));


;// CONCATENATED MODULE: ./src/browser/browser-umd.ts


if (true) {
    if (false) {}
    else {
        var cdn = getCDN();
        setGlobalCDNUrl(cdn); // preserving original behavior -- TODO: neccessary?
        // @ts-ignore
        __webpack_require__.p = cdn + '/tronic-receiver/bundles/';
    }
}
setVersionType('web');


}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map