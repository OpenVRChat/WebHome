var React = require("react"),
    connect = require("react-redux").connect,
    push = require("react-router-redux").push,
    Container = require("reactstrap").Container,
    Col = require("reactstrap").Col,
    Link = require("react-router-dom").Link,
    Icon = require("react-fontawesome"),
    _logout = require("../actions/currentUser").logout;

class UnverifiedLayout extends React.Component {

    logout(arg0) {
        this.props.dispatch(_logout());
        this.props.dispatch(push("/home/login"));
        arg0.preventDefault();
    }

    render() {
        var e = this.props,
            t = e.statusCode,
            r = (e.error, e.errorMessage);

        return <Container>
            <Col xs={{size: 8, offset: 2}} className="text-center">
                <h2>Missing Credentials</h2>
                <p><Icon name="plug" size="2x" /></p>
                <p>It appears something has gone wrong with your login.</p>
                <p><a href="#" onClick={this.logout} title="logout" className="btn btn-secondary"><Icon name="door-open" />  Log in again?</a></p>
                <p>Or try going <Link to="/home">home </p>
                <hr />
                <hr />
                <p>{t} : {r}</p>
            </Col>
        </Container>
    }

}
