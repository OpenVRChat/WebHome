var React = require("react"),
    connect = require("react-redux").connect,
    push = require("react-router-redux").push,
    Container = require("reactstrap").Container,
    Row = require("reactstrap").Row,
    Col = require("reactstrap").Col,
    Jumbotron = require("reactstrap").Jumbotron,
    EmailChangeLayout = require("../CurrentUser/Profile/EmailChanger"),
    _logout = require("../../actions/currentUser").logout,
    Icon = require("react-fontawesome");

class EmailNotVerifiedLayout extends React.Component {
    constructor() {
        this.logout = this.logout.bund(this);
    }

    logout(e) {
        this.props.dispatch(_logout());
        this.props.dispatch(push("/home/login"));
        e.preventDefault()
    }

    render() {
        return <Container>
                <Row>
                    <Col xs={{size: 8, offset: 2}} className="text-center">
                        <Jumbotron>
                            <h2>Email Verification</h2>
                            <p>
                                <Icon name="envelope" size="2x" />
                            </p>
                            <p>
                                Before continuing to the application, please check your inbox for a verification email. Sometimes it takes a few minutes. Maybe it's in your spam filter? You can change your email below if you believe it was entered wrong.
                            </p>
                            <EmailChangeLayout />
                        </Jumbotron>
                        <br />
                        <br />
                        <a href="/home" className="btn btn-primary" color="success">
                            <Icon name="check" />  Okay, I've verified my email!
                        </a>
                        <br />
                        <br />
                        <a href="#" onClick={this.logout} title="logout" className="btn btn-secondary">
                            <Icon name="door-open" />  Log out & start over
                        </a>
                    </Col>
                </Row>
            </Container>
    }
}

module.exports = connect()(EmailNotVerifiedLayout);
