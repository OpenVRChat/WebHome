var endpoint = require("./endpoint");
var React = require("react");
var ReactDOM = require("react-dom");
var Provider = require("react-redux").Provider;
var ConnectedRouter = require("react-router-redux").ConnectedRouter;
var push = require("react-router-redux").push;
var Route = require("react-router").Route;
var axios = require("axios");
//var MainLayout = require("./components/MainLayout");
//var UnverifiedLayout = require("./components/UnverifiedLayout"); TODO
var Error = require("./components/Common/Error");
var config = require("./config");
/* TODO
var store = require("./store").store;
var history = require("./store").history;
var clearStatusCode = require("./actions/lastAxios").clearStatusCode;
var saveLoginTarget = require("./actions/login").saveLoginTarget;
var exemptPaths = require("./noAuthPaths");
var _require = require("./actions/currentUser");
var logout = _require.logout;
var _require2 = require("./actions/notifications");
var getRecentNotifications = _require2.getRecentNotifications;
var getFriendRequests = _require2.getFriendRequests;
var _require3 = require("./actions/activeTab");
var tabActive = _require3.tabActive;
var tabInactive = _require3.tabInactive;
var _require4 = require("./actions/clock");
var clockDriftDetected = _require4.clockDriftDetected;
var resync = _require4.resync;
var pipelineRouter = require("./pipeline/pipelineRouter");
var app = document.getElementById("app");
var REESTABLISH_SOCKET_INTERVAL = 1e3;
var CLOCK_DRIFT_INTERVAL = 10 * REESTABLISH_SOCKET_INTERVAL;

var loadMainApp = function() {
    $("#loading").remove();
    $("#secondary-nav").remove();
    ReactDOM.render(
        React.createElement(Provider, { store: store },
            React.createElement(ConnectedRouter, { history: history },
                React.createElement("div", null,
                    React.createElement(Route, { path: "/", component: MainLayout })))), app);
    var e = 500;
    var t = !1;
    store.dispatch(getRecentNotifications()), store.dispatch(getFriendRequests());
    var r = (async function() {
        var o, n, i, a;
        pipelineRouter({store:store});
        n = await (o = axios.get(`${API_ADDRESS}/api/1/auth?apiKey=${window.apiKey}`));

        i = n.data.token;
        a = new WebSocket(endpoint.pipelineEndpoint + "?authToken=" + i);
        t = !1;
        a.addEventListener("open", () => console.log("Successfully created socket connection!"));
        a.addEventListener("message", function(t) {
            if (null != t.data) {
                var r = JSON.parse(t.data);
                if (null != r.err) {
                    console.error("SOCKET:", r.err);
                    return void(-1 <= r.err.indexOf("authToken") && (
                        store.dispatch(clearStatusCode()),
                        store.dispatch(logout()),
                            store.dispatch(saveLoginTarget({ targetPath: window.location.pathname + window.location.search })),
                            store.dispatch(push("/home/login"))));
                    e = 500;
                    try {
                        o(r)
                    } catch (e) {
                        console.error(e)
                        a.close();
                    }
                }
            }
        });
        a.addEventListener("error", console.error);
        a.addEventListener("close", function() {
            console.log("Closed socket connection!");
            e = Math.min(2 * e, 3e5);
            console.log("Doubling socket reconnection interval: ", e);
            window.socket.isClosed = !0;
        });
        window.socket = a;
    }), o = Date.now();

    setInterval(function() {
        var n = store.getState();
        var i = Date.now();
        return i - o > CLOCK_DRIFT_INTERVAL && (console.warn("Clock drift detected!"), store.dispatch(clockDriftDetected())), o = i, window.socket && !0 === window.socket.isClosed && (window.socket = null), !1 === n.currentUser.isLoggedIn
            ? void(null != window.socket && (window.socket.close(), window.socket.isClosed = !0))
            : 0 <= n.router.location.pathname.indexOf("/home/launch")
                ? void(window.socket = null)
                : void((null == window.socket || window.socket.readyState === WebSocket.CLOSED) && !t && (t = !0, setTimeout(r, e)))
    }, REESTABLISH_SOCKET_INTERVAL);
    document.addEventListener("visibilitychange", function() {
        console.log("Visibility change! ", document.visibilityState),
        "hidden" === document.visibilityState && store.dispatch(tabInactive()),
        "visible" === document.visibilityState && store.dispatch(tabActive())
    }, !1)
};
*/
var API_ADDRESS = "https://vrchat.com"; // TODO: USE ./config
console.log("Fetching config");
axios.get(`${config.API_ADDRESS}/api/1/config`)
    .then(function(e) {
        window.apiKey = e.clientApiKey, store.dispatch({
            type: "LOAD_CONFIG_FULFILLED",
            payload: e
        });
        return axios.get(`${config.API_ADDRESS}/api/1/auth/user?apiKey=${window.apiKey}`);
    }).then(function() {
        return e = (async function() {
            store.dispatch({
                type: "LOGIN_FULFILLED",
                payload: t
            });
            await loadMainApp();
        });
    }).catch(function(e) {
        console.error("An error as occured");
        $("#loading").remove(),
        $("#secondary-nav").remove(),
        -1 < e.message.indexOf("403")
            ? ReactDOM.render(<UnverifiedLayout />, app)
            : -1 < e.message.indexOf("401") || -1 < e.message.indexOf("429")
                ? exemptPaths.has(window.location.pathname)
                    ? loadMainApp()
                    : (console.warn(`${exemptPaths} didn't contain ${window.location.pathname}`),
                        store.dispatch(clearStatusCode()),
                        store.dispatch(logout()),
                        store.dispatch(saveLoginTarget({ targetPath: window.location.pathname + window.location.search })),
                        store.dispatch(push("/home/login")),
                        loadMainApp())
                : -1 < e.message.indexOf("500")
                    ? ReactDOM.render(<Error error={e} statusCode={500} />, app)
                    : ReactDOM.render(<Error error={e} />, app)
});
