var React = require("react"),
    connect = require("react-redux").connect,
    _require = require("reactstrap"),
    Alert = _require.Alert,
    Button = _require.Button,
    Col = _require.Col,
    Container = _require.Container,
    Row = _require.Row,
    Link = require("react-router-dom").Link,
    Icon = require("react-fontawesome"),
    LoadingButton = require("../Common/LoadingButton"),
    _require2 = require("../../actions/login"),
    verifyOtpCode = _require2.verifyOtpCode,
    helpUrl = "https://docs.vrchat.com/docs/setup-2fa",

cleanCode = function(e) {
    return 4 < (e = (e = e.replace(/[^abcdefghjkmnpqrstuvwxyz234567890-]+/g, "").substr(0, 9)).split("").filter(function(e, t) {
        return "-" !== e || 4 === t
    }).join("")).length && "-" !== e[4] && (e = e.substr(0, 4) + "-" + e.substr(4, 4)), e
};

class TwoFactorAuthOtpLayout extends React.Component {
    constructor() {
        this.state = {
            code: "",
            isCodeReady: !1,
            isPreviousSubmissionRelevant: !1
        }
    }

    handleVerify(arg0) {
        arg0.preventDefault();
        this.state.isPreviousSubmissionRelevant = !0;
        this.state.isCodeReady &&
            this.props.dispatch(verifyOtpCode({ code: this.state.code }))
    }

    handleChangeCode(arg0) {
        this.state.isPreviousSubmissionRelevant = !1;
        var t = !1,
            r = e.target.value;
        ("string" == typeof r || r instanceof String) &&
            (t = 9 === (r = cleanCode(r)).length);
        this.setState({
            code: r,
            isCodeReady: t
        })
    }

    render() {
        var e = this.props.twoFactorAuth,
            t = e.isAwaitingOtpVerification,
            r = e.isOtpVerificationRejected,
            a = this.state.isCodeReady && !t,
            i = this.state.isPreviousSubmissionRelevant && r;

        return <Container>
            <Row className="justify-content-center">
                <Col md={{ size: 5 }} style={{ marginTop: "50px" }}>
                    <Row style={{ marginBottom: "1em" }}>
                        <Col>
                            <div className="card">
                                <div className="card-body">
                                    <h3>Two-Factor Authentication: Recovery Code</h3>
                                    <p>
                                        Enter one of your saved recovery codes. <a href={helpUrl} target="_blank">Help</a>
                                    </p>
                                    <Alert isOpen={i} color="warning">
                                        <Icon name="warning" /> That code didn't work.
                                    </Alert>
                                    <form onSubmit={this.handleVerify}>
                                        <input type="text" style={{ marginRight: "1em" }} placeholder="Enter code..." value={this.state.code} onChange={this.handleChangeCode} />
                                        <LoadingButton color="primary" disabled={!a} loading={t}>Verify</LoadingButton>
                                    </form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ padding: "0em 1.5em 0em 1.5em" }}>
                        <Col>
                            <Link to="/home/twofactorauth">Use your authenticator app instead</Link>
                        </Col>
                        <Col xs="3" lg="3" className="text-right">
                            <Link to="/home/login">Log out</Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    }
}

module.exports = connect(function(e) {
    return {
        twoFactorAuth: e.login.twoFactorAuth
    }
})(TwoFactorAuthOtpLayout);
