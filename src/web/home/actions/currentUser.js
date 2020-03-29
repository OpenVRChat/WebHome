var axios = require("axios");
var config = require("../config");

loadCurrentUser = function() {
    return $("#loading").remove(), {
        type: "LOAD_CURRENT_USER",
        payload: axios.get(`${config.API_ADDRESS}/api/1/auth/user`)
    }
},
changeName = function(a) {
    var e = a.userId,
        r = a.displayName,
        n = a.currentPassword;
    return {
        type: "CHANGE_NAME",
        payload: axios.put(`${config.API_ADDRESS}/api/1/users/${e}`, {
            displayName: r,
            currentPassword: n
        })
    }
},
changeEmail = function(a) {
    var e = a.userId,
        r = a.email,
        n = a.currentPassword;
    return {
        type: "CHANGE_EMAIL",
        payload: axios.put(`${config.API_ADDRESS}/api/1/users/${e}`, {
            email: r,
            currentPassword: n
        })
    }
},
changePassword = function(a) {
    var e = a.userId,
        r = a.password,
        n = a.currentPassword;
    return {
        type: "CHANGE_PASSWORD",
        payload: axios.put(`${config.API_ADDRESS}/api/1/users/${e}`, {
            password: r,
            currentPassword: n
        })
    }
},
changeUnsubscribe = function(a) {
    var e = a.userId,
        r = a.unsubscribe;
    return {
        type: "CHANGE_UNSUBSCRIBE",
        payload: axios.put(`${config.API_ADDRESS}/api/1/users/${e}`, {
            unsubscribe: r
        })
    }
},
resendVerificationEmail = function() {
    return {
        type: "RESEND_VERIFICATION",
        payload: axios.post(`${config.API_ADDRESS}/api/1/auth/user/resendEmail`, {})
    }
},
updateTOSAgreement = function(a) {
    var e = a.userId,
        r = a.acceptedTOSVersion;
    return {
        type: "UPDATE_TOS",
        payload: axios.put(`${config.API_ADDRESS}/api/1/users/${e}`, {
            acceptedTOSVersion: r
        })
    }
},
logout = function() {
    return {
        type: "LOGOUT",
        payload: axios.put(`${config.API_ADDRESS}/api/1/logout`, {})
    }
},
markAccountForDeletion = function(a) {
    var e = a.userId;
    return {
        type: "MARK_USER_FOR_DELETION",
        payload: axios.put(`${config.API_ADDRESS}/api/1/users/${e}/delete`, {})
    }
};

module.exports = {
    loadCurrentUser: loadCurrentUser,
    changeName: changeName,
    changeEmail: changeEmail,
    changePassword: changePassword,
    changeUnsubscribe: changeUnsubscribe,
    resendVerificationEmail: resendVerificationEmail,
    updateTOSAgreement: updateTOSAgreement,
    logout: logout,
    markAccountForDeletion: markAccountForDeletion
};
