var assert = require("assert");

var nullOrEmpty = function(e) {
    return !(void 0 !== e && "object" !== typeof e  && "string" != typeof e || null != e && "" !== e && Object.keys(e).length)
};
assert.equal(nullOrEmpty({}), !0);
assert.equal(nullOrEmpty([]), !0);
assert.equal(nullOrEmpty({ hello: "world" }), !1);
assert.equal(nullOrEmpty([1, 2, 3]), !1);
assert.equal(nullOrEmpty(), !0);
assert.equal(nullOrEmpty(""), !0);
assert.equal(nullOrEmpty("hello world"), !1);
assert.equal(nullOrEmpty(12345), !1);
assert.equal(nullOrEmpty(!0), !1);
assert.equal(nullOrEmpty(nullOrEmpty), !1);

var getPrintableString = function(e) {
    return e.replace(/[^\x20-\x7e\xa0-\xff]/g, function(e) {
        return "\\u{".concat(e.codePointAt(0).toString(16), "}")
    })
},
compose = function() {
    for (var e = arguments.length, r = Array(e), t = 0; t < e; t++)
        r[t] = arguments[t];
    return function(e) {
        return r.reduceRight(function(e, r) {
            return r(e)
        }, e)
    }
},
oneAtATime = function(e) {
    var r = Promise.resolve(null);
    return function(t) {
        var n = r,
        u = (async function(){
            await n
            return e(t);
        })();

        u.then(function() {
            return null
        }, function() {
            return null
        });

        return u;
    }
};

function completablePromise() {
    var e, r, t = new Promise(function(t, n) {
        e = t,
        r = n
    });
    return t.resolve = e, t.reject = r, t
}

module.exports = {
    nullOrEmpty: nullOrEmpty,
    getPrintableString: getPrintableString,
    compose: compose,
    oneAtATime: oneAtATime,
    completablePromise: completablePromise
};
