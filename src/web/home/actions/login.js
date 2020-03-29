var axios = require("axios");
var config = require("../config");
var loginFormPaths = ["/home/login", "/home/twofactorauth", "/home/twofactorauthrecovery", "/home/verify"];
var errorPagePaths = ["/home/unverified", "/home/critical"];
var isLoginFormPath = function(r) { // Probably using a .forEach
    if (null == r) return !1;
    var o = !0,
     t = !1,
     a = void 0;
    try {
     for (var e, i, n = loginFormPaths[Symbol.iterator](); !(o = (e = n.next()).done); o = !0)
      if (i = e.value, r.startsWith(i)) return !0
    } catch (r) {
     t = !0, a = r
    } finally {
     try {
      o || null == n.return || n.return()
     } finally {
      if (t) throw a
     }
    }
    return !1
},
isErrorPagePath = function(r) { // Probably using a .forEach
    if (null == r) return !1;
    var o = !0,
     t = !1,
     a = void 0;
    try {
     for (var e, i, n = errorPagePaths[Symbol.iterator](); !(o = (e = n.next()).done); o = !0)
      if (i = e.value, r.startsWith(i)) return !0
    } catch (r) {
     t = !0, a = r
    } finally {
     try {
      o || null == n.return || n.return()
     } finally {
      if (t) throw a
     }
    }
    return !1
},
login = function(r) {
    var o = r.username,
        t = r.password;
    return {
        type: "LOGIN",
        payload: axios.get(`${config.API_ADDRESS}/api/1/auth/user`, {
            auth: {
                username: o,
                password: t
            },
            maxRedirects: 0
        })
    }
},
saveLoginTarget = function(r) {
    var o = r.targetPath;
    return isLoginFormPath(o) ? (console.warn("Trying to save login path while already login form: " + o), {
        type: "DO_NOTHING"
    }) : isErrorPagePath(o) ? (console.warn("Trying to save login path for an error page: " + o), {
        type: "DO_NOTHING"
    }) : {
        type: "SAVE_LOGIN_TARGET",
        payload: {
            loginPath: o
        }
    }
},
verifyTotpCode = function(r) {
    var o = r.code;
    return {
        type: "TWOFACTORAUTH_TOTP_VERIFY",
        payload: axios.post(`${config.API_ADDRESS}/api/1/auth/twofactorauth/totp/verify`, {
            code: o
        })
    }
},
verifyOtpCode = function(r) {
    var o = r.code;
    return {
        type: "TWOFACTORAUTH_OTP_VERIFY",
        payload: axios.post(`${config.API_ADDRESS}/api/1/auth/twofactorauth/otp/verify`, {
            code: o
        })
    }
};

module.exports = {
    login: login,
    saveLoginTarget: saveLoginTarget,
    verifyTotpCode: verifyTotpCode,
    verifyOtpCode: verifyOtpCode,
    isLoginFormPath: isLoginFormPath,
    isErrorPagePath: isErrorPagePath
};
