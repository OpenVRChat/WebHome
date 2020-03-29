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
    verifyTotpCode = _require2.verifyTotpCode,
    helpUrl = "https://docs.vrchat.com/docs/setup-2fa";

class TwoFactorAuthLayout extends React.Component {
    contructor() {
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
            this.props.dispatch(verifyTotpCode({ code: this.state.code }))
    }

    handleChangeCode(arg0) {
        this.state.isPreviousSubmissionRelevant = !1;
        var t = !1,
            r = arg0.target.value;
        ("string" == typeof r || r instanceof String) &&
            (t = 6 === (r = r.replace(/\D+/g, "").substr(0, 6)).length);
        this.setState({
            code: r,
            isCodeReady: t
        })
    }

    render() {
        var e = this.props.twoFactorAuth,
            t = e.isAwaitingTotpVerification,
            r = e.isTotpVerificationRejected,
            a = this.state.isCodeReady && !t,
            i = this.state.isPreviousSubmissionRelevant && r;
        return <Container>
            <Row className="justify-content-center">
                <Col md={{ size: 5 }} style={{ marginTop: "50px" }}>
                    <Row style={{ marginBottom: "1em" }}>
                        <Col>
                            <div className="card">,
                                <div className="card-body">
                                    <h3>Two-Factor Authentication</h3>
                                    <p>Enter a numeric code from your authenticator app. <a href={helpUrl} target="_blank">Help</a></p>
                                    <Alert isOpen={i} color="warning">
                                        <Icon name="warning" /> That code didn't work.
                                    </Alert>
                                    <form onSubmit={this.handleVerify}>
                                        <input type="text" style={{ marginRight: "1em" }} placeholder="000 000" value={function(e) {
                                            return ("string" == typeof e || e instanceof String) && 3 < e.length ? e.substr(0, 3) + " " + e.substr(3, 3) : e
                                        }(this.state.code)} onChange={this.handleChangeCode} />
                                        <LoadingButton color="primary" disabled={!a} loading={t}>Verify</LoadingButton>
                                    </form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ padding: "0em 1.5em 0em 1.5em" }}>
                        <Col>
                            <Link to="/home/twofactorauthrecovery">Use a recovery code instead</Link>
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
})(TwoFactorAuthLayout);
