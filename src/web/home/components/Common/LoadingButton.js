var React = require("react"),
    Icon = require("react-fontawesome"),
    Button = require("reactstrap").Button,
    spinnerMarginTop = "-1.25em";

module.exports = function(e) {
    var i = e.loading,
        n = e.className,
        a = e.onClick,
        t = e.color,
        r = e.children,
        c = e.hidden,
        s = e.disabled;
    return <Button className={n} onClick={a} color={t} hidden={c} disabled={s}>
        <div className={i ? "invisible" : "visible"}>{r}</div>
        <div className={i ? "invisible" : "visible"} style={{ marginTop: spinnerMarginTop }}>
            <Icon name="spinner" spin={!0} />
        </div>
    </Button>
};
