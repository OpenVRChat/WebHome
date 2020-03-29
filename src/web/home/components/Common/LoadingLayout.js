var React = require("react"),
    LoadingSpinner = require("./LoadingSpinner"),
    Error = require("./Error");

module.exports = function(e) {
    var r = e.reducer,
        t = e.loading,
        n = e.error,
        a = e.statusCode,
        l = e.children;
    return null != a && 200 !== a && "200" !== a
            ? <Error error={n} statusCode={a} />
        : null != r && null != r.statusCode && 200 !== r.statusCode && "200" !== r.statusCode
            ? <Error error={r.error} statusCode={r.statusCode} />
        : n
            ? <Error error={n} />
        : null != r && r.error
            ? <Error error={r.error} />
        : t
            ? <LoadingSpinner />
        : null != r && r.fetching
            ? <LoadingSpinner />
        : null != r && r.loading
            ? <LoadingSpinner />
            : <div>{l}</div>
};
