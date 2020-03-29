var moment = require("frozen-moment"),
NUM_SEARCH_RESULTS = 12,
NUM_ALIAS_RESULTS = 16,
NUM_FRIEND_RESULTS = 25,
NUM_MESSAGE_RESULTS = 25,
NOTIFICATION_TYPES = ["message", "invite", "friendRequest"],
MAX_INVITE_AGE = 4,
MAX_MESSAGE_LENGTH = 200,
REFRESH_RATE = 6e4,

getPrettyInstanceType = function(e) {
    var t = "Public";
    if (null == e || "" === e) return t;
    var r = [];
    e.toString().split("~").map(e => r.push(e.split("(")[0]));
    return 0 < r.length && (r.includes("private")
        ? (t = "Invite", r.includes("canRequestInvite") && (t = "Invite+"))
        : r.includes("hidden")
            ? t = "Friends+"
            : r.includes("friends") && (t = "Friends")), t
},
getRejectedStatusCode = function(e) {
    var t = 500;
    return null != e.response && null != e.response.status && "" !== e.response.status && (t = e.response.status), t
},
getActionPayloadResponseError = function(e) {
    var t = "An unknown error occurred";
    if (null == e.response)
        null != e.message && "" !== e.message && (t = e.message);
    else if (t = e.response.statusText, null != e.response.request && null != e.response.request.response && "" !== e.response.request.response) {
        var r;
        try {
            r = JSON.parse(e.response.request.response)
        } catch (t) {
            throw t instanceof SyntaxError && console.error("Could not parse payload response: ".concat(e.response.request.response)), t
        }
    if ("error" in r)
        if ("code" in r) t = r.error;
        else if ("message" in r.error) {
            var s, n = r.error.message;
            try {
                n = JSON.parse(r.error.message), "object" === (0, _typeof2.default)(n) && "hideStatus" in n && (s = n.hideStatus)
            } catch (e) {
                if (!(e instanceof SyntaxError)) throw e
            }
            s && "message" in n ? t = n.message : t += ": ".concat(n)
        }
    }
    return t
},
shouldDisplayMessage = function(e) {
    return !("friendRequest" !== e.type && "message" !== e.type) || moment(e.created_at).isAfter(moment().subtract(MAX_INVITE_AGE, "minute"))
},
getCurrentPath = function(e) {
    return null != e.router && null != e.router.location ? e.router.location.pathname + e.router.location.search : window.location.pathname + window.location.search
},
getUserLevel = function(e) {
    var t = new Set(e);
    return t.has("admin_moderator")
        ? "moderator"
        : t.has("system_legend")
            ? "legendary"
        : t.has("system_trust_legend")
            ? "veteran"
        : t.has("system_trust_veteran")
            ? "trusted"
        : t.has("system_trust_trusted")
            ? "known"
        : t.has("system_trust_known")
            ? "user"
        : t.has("system_trust_basic")
            ? "new"
        : t.has("system_probable_troll")
            ? "visitor"
        : t.has("system_troll")
            ? "troll"
            : "visitor"
};

module.exports = {
    NUM_SEARCH_RESULTS: NUM_SEARCH_RESULTS,
    NUM_ALIAS_RESULTS: NUM_ALIAS_RESULTS,
    NUM_FRIEND_RESULTS: NUM_FRIEND_RESULTS,
    NUM_MESSAGE_RESULTS: NUM_MESSAGE_RESULTS,
    NOTIFICATION_TYPES: NOTIFICATION_TYPES,
    MAX_INVITE_AGE: MAX_INVITE_AGE,
    REFRESH_RATE: REFRESH_RATE,
    MAX_MESSAGE_LENGTH: MAX_MESSAGE_LENGTH,
    getPrettyInstanceType: getPrettyInstanceType,
    shouldDisplayMessage: shouldDisplayMessage,
    getRejectedStatusCode: getRejectedStatusCode,
    getActionPayloadResponseError: getActionPayloadResponseError,
    getCurrentPath: getCurrentPath,
    getUserLevel: getUserLevel
};
