var axios = require("axios"),
    config = require("../config")

register = function(e) {
    var r = e.username,
        a = e.password,
        s = e.email,
        i = e.year,
        t = e.month,
        o = e.day,
        c = e.recaptchaCode,
        p = e.subscribe,
        d = e.acceptedTOSVersion;
    return {
        type: "REGISTER",
        payload: axios.post(config.API_ADDRESS + "/api/1/auth/register", {
            username: r,
            password: a,
            email: s,
            year: i,
            month: t,
            day: o,
            recaptchaCode: c,
            subscribe: p,
            acceptedTOSVersion: d
        })
    }
};

module.exports = {
    register: register
};
