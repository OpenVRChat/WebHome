var React = require("react"),
Icon = require("react-fontawesome"),
css = require("emotion").css;

module.exports = function(e) {
    var t = e.hidden;
    return <div className={css(`
            max-width: 25px;
            max-height: 25px;
            width: 25px;
            height: 25px;
        `)}>
            <Icon name="spinner" size="2x" hidden={t} spin={!0} />
        </div>
  };
