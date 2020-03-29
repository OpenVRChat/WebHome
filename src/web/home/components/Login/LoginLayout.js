var React = require("react"),
    connect = require("react-redux").connect,
    push = require("react-router-redux").push,
    Route = require("react-router").Route,
    login = require("../../actions/login").login,
    _require = require("../../actions/currentUser"),
    logout = _require.logout,
    LoadingSpinner = require("../Common/LoadingSpinner"),
    Row = require("reactstrap").Row,
    Col = require("reactstrap").Col,
    Container = require("reactstrap").Container,
    Alert = require("reactstrap").Alert;

class LoginPage extends React.Component {

    constructor() {
        this.state = {
            username: "",
            password: ""
        }
    }

    componentDidMount() {
        this.props.dispatch(logout())
    }

    handleUsernameChange(arg0) {
        var t = encodeURIComponent(e.target.value);
        this.setState({ username: t });
        arg0.preventDefault()
    }

    handlePasswordChange(arg0) {
        var t = encodeURIComponent(e.target.value);
        this.setState({ password: t });
        arg0.preventDefault()
    }

    handleSubmit(arg0) {
        arg0.preventDefault();
        this.props.dispatch(login({
            username: this.state.username,
            password: this.state.password,
            apiKey: this.props.apiKey
        }))
    }

    navRegister(arg0) {
        arg0.preventDefault();
        this.props.dispatch(push("/home/register"))
    }

    navPassword(arg0) {
        arg0.preventDefault();
        this.props.dispatch(push("/home/password"))
    }

    render() {
        var e = this.props,
            t = e.error,
            a = e.loading,
            r = "";

        return null != t && "" !== t && (r = <Alert color="warning">{t}</Alert>),
            <Container>
                <Col md={{ offset: 4, size: 4 }} style="margin-top: 50px">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a href="#" className="nav-link active">Login</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link" onClick={this.navRegister}>Registration</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link" onClick={this.navPassword}>Password Recovery</a>
                        </li>
                    </ul>
                    <div className="card nobottommargin">
                        <div className="card-body">
                            <form id="login-form" name="login-form" className="nobottommargin" onSubmit={this.handleSubmit}>
                                <h3>Login</h3>
                                <Row>{r}</Row>
                                <LoadingSpinner hidden={!a} />
                                <Row>
                                    <Col>
                                        <label htmlFor="login-form-username">Username/Email:</label>
                                        <input type="text" id="username_email" name="username_email" className="form-control" onChange={this.handleUsernameChange} onKeyUp={this.handleUsernameChange} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label htmlFor="login-form-password">Password:</label>
                                        <input type="password" id="password" name="password" className="form-control" onChange={this.handlePasswordChange} onKeyUp={this.handlePasswordChange} />
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col>
                                        <button className="btn btn-primary float-right" id="login-form-submit" name="login-form-submit" value="login">Login</button>
                                    </Col>
                                </Row>
                            </form>
                        </div>
                    </div>
                </Col>
            </Container>
    }

}

module.exports = connect(function(e) {
    return {
        error: e.login.error,
        loading: e.login.loading,
        loggedIn: e.login.loggedIn,
        apiKey: e.config.config.apiKey
    }
})(LoginPage);
