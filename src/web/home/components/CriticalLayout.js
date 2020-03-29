var React = require("react"),
    connect = require("react-redux").connect,
    Container = require("reactstrap").Container,
    Col = require("reactstrap").Col,
    Link = require("react-router-dom").Link,
    Icon = require("react-fontawesome");

class CriticalLayout extends React.Component {

    render() {
        var e = this.props,
            t = e.statusCode,
            r = e.error;
        return <Container>
                <Col xs={{size: 4, offset: 4}} className="text-center">
                    <h2>Network Missing</h2>
                    <p><Icon name="plug" size="2x" /></p>
                    <p>Something has gone wrong with the network! Maybe our servers are down, maybe you're offline, maybe it's just a <em>horrifying clown-packed surprise</em>.</p>
                    <p>You could <Link to="/home">try again?</Link></p>
                    <p><pre>{t} : {r}</pre></p>
                </Col>
            </Container>
    }

}
