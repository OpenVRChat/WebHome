var React = require("react"),
    Icon = require("react-fontawesome");
module.exports = function(e) {
    var t = e.ok,
        c = e.size || "2x";
    return null == t ? null : t
        ? <Icon name="check" size={c} className="text-success" />
        : <Icon name="times" size={c} className="text-warning" />
};
