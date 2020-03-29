var React = require("react"),
    connect = require("react-redux").connect,
    push = require("react-router-redux").push,
    Container = require("reactstrap").Container,
    Row = require("reactstrap").Row,
    Col = require("reactstrap").Col,
    Jumbotron = require("reactstrap").Jumbotron,
    _logout = require("../../actions/currentUser").logout,
    Icon = require("react-fontawesome");

class EmailVerifyFailedLayout extends React.Component {

    logout(arg0) {
        this.props.dispatch(_logout());
        this.props.dispatch(push("/home/login"));
        arg0.preventDefault()
    }

    render() {
        return <Container>
                <Row>
                    <Col xs={{size: 8, offset: 2}} className="text-center">
                        <Jumbotron>
                            <h2>Bad Email Verification</h2>
                            <p>
                                <Icon name="exclamation-triangle" size="2x"></Icon>
                            </p>
                            <p>
                                The link you followed is invalid, or you are already verified! Please log in and request a new verification link if prompted to do so.
                            </p>
                        </Jumbotron>
                        <br />
                        <br />
                        <a href="#" onClick={this.logout} className="btn btn-secondary">
                            <Icon name="door-open"> Back To Login</Icon>
                        </a>
                    </Col>
                </Row>
            </Container>
    }

}
