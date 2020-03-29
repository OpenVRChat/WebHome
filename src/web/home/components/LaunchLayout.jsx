var React = require("react"),
css = require("emotion").css,
LoadingSpinner = require("./Common/LoadingSpinner"),
LaunchComponent = require("./LaunchComponent.js"),
Container = require("reactstrap").Container,
Row = require("reactstrap").Row,
Col = require("reactstrap").Col,
Jumbotron = require("reactstrap").Jumbotron;

class LaunchLayout extends React.Component {

    constructor(e) {
        var a = new URL(document.location).searchParams,
            n = a.get("worldId"),
            i = a.get("instanceId"),
            o = a.get("shortName");
        t.state = {
            worldId: n,
            instanceId: i,
            shortName: o
        }
    }

    render() {
        return <LaunchComponent worldId={this.state.worldId} instanceId={this.state.instanceId} shortName={this.state.shortName} />
    }

}

module.exports = LaunchLayout;
