"use strict";
(self["webpackChunk_tronic_receiver_browser"] = self["webpackChunk_tronic_receiver_browser"] || []).push([[119],{

/***/ 956:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   form: function() { return /* binding */ form; },
/* harmony export */   link: function() { return /* binding */ link; }
/* harmony export */ });
/* harmony import */ var _callback__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(888);

// const channelId = '';
// Check if a user is opening the link in a new tab
function userNewTab(event) {
    var typedEvent = event;
    if (typedEvent.ctrlKey ||
        typedEvent.shiftKey ||
        typedEvent.metaKey ||
        (typedEvent.button && typedEvent.button == 1)) {
        return true;
    }
    return false;
}
// Check if the link opens in new tab
function linkNewTab(element, href) {
    if (element.target === '_blank' && href) {
        return true;
    }
    return false;
}
function link(links, event, properties, options) {
    var _this = this;
    var elements = [];
    // always arrays, handles jquery
    if (!links) {
        return this;
    }
    if (links instanceof Element) {
        elements = [links];
    }
    else if ('toArray' in links) {
        elements = links.toArray();
    }
    else {
        elements = links;
    }
    elements.forEach(function (el) {
        el.addEventListener('click', function (elementEvent) {
            var _a, _b;
            var ev = event instanceof Function ? event(el) : event;
            var props = properties instanceof Function ? properties(el) : properties;
            var href = el.getAttribute('href') ||
                el.getAttributeNS('http://www.w3.org/1999/xlink', 'href') ||
                el.getAttribute('xlink:href') ||
                ((_a = el.getElementsByTagName('a')[0]) === null || _a === void 0 ? void 0 : _a.getAttribute('href'));
            var trackEvent = (0,_callback__WEBPACK_IMPORTED_MODULE_0__/* .pTimeout */ .FJ)(_this.track(/* channelId, */ ev, props, options !== null && options !== void 0 ? options : {}), (_b = _this.options.timeout) !== null && _b !== void 0 ? _b : 500);
            if (!linkNewTab(el, href) &&
                !userNewTab(elementEvent)) {
                if (href) {
                    elementEvent.preventDefault
                        ? elementEvent.preventDefault()
                        : (elementEvent.returnValue = false);
                    trackEvent
                        .catch(console.error)
                        .then(function () {
                        window.location.href = href;
                    })
                        .catch(console.error);
                }
            }
        }, false);
    });
    return this;
}
function form(forms, event, properties, options) {
    var _this = this;
    // always arrays, handles jquery
    if (!forms)
        return this;
    if (forms instanceof HTMLFormElement)
        forms = [forms];
    var elements = forms;
    elements.forEach(function (el) {
        if (!(el instanceof Element))
            throw new TypeError('Must pass HTMLElement to trackForm/trackSubmit.');
        var handler = function (elementEvent) {
            var _a;
            elementEvent.preventDefault
                ? elementEvent.preventDefault()
                : (elementEvent.returnValue = false);
            var ev = event instanceof Function ? event(el) : event;
            var props = properties instanceof Function ? properties(el) : properties;
            var trackEvent = (0,_callback__WEBPACK_IMPORTED_MODULE_0__/* .pTimeout */ .FJ)(_this.track(/* channelId, */ ev, props, options !== null && options !== void 0 ? options : {}), (_a = _this.options.timeout) !== null && _a !== void 0 ? _a : 500);
            trackEvent
                .catch(console.error)
                .then(function () {
                el.submit();
            })
                .catch(console.error);
        };
        // Support the events happening through jQuery or Zepto instead of through
        // the normal DOM API, because `el.submit` doesn't bubble up events...
        var $ = window.jQuery || window.Zepto;
        if ($) {
            $(el).submit(handler);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            el.addEventListener('submit', handler, false);
        }
    });
    return this;
}


/***/ })

}]);
//# sourceMappingURL=auto-track.bundle.26cb9f24f62c78e9f94a.js.map