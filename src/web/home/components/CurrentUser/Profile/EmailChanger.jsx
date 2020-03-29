React = require("react"),
   connect = require("react-redux").connect,
   validator = require("validator"),
   _ = require("lodash"),
   axios = require("axios"),
   LoadingLayout = require("../../Common/LoadingLayout"),
   Check = require("../../Common/Check"),
   Button = require("reactstrap").Button,
   Row = require("reactstrap").Row,
   Col = require("reactstrap").Col,
   Alert = require("reactstrap").Alert,
   Icon = require("react-fontawesome"),
   changeEmail = require("../../../actions/currentUser").changeEmail,
   resendVerificationEmail = require("../../../actions/currentUser").resendVerificationEmail,
   changeUnsubscribe = require("../../../actions/currentUser").changeUnsubscribe,
   isThrowawayEmail = require("../../../../../api_v1/tools/pookmail.js").isThrowawayEmail;

var checkEmail = _.debounce(function(e, t, a) {
   axios.get(`${API_ADDRESS}/api/1/auth/exists?email=${encodeURIComponent(e)}&excludeUserId={t}`).then(function(e) {
       a(e.data.userExists)
   })
}, 1e3);

class EmailChanger extends React.Component {

    constructor() {
        this.state = {
            currentPassword: "",
            email: "",
            emailTaken: !1,
            emailError: !1,
            emailOk: null,
            confirmation: "",
            confirmationError: !1,
            confirmationOk: null,
            showConfirmation: !1,
            showPassword: !1,
            verificationDisabled: !1,
            ready: !1,
            subscribe: !this.props.currentUser.unsubscribe
        };
        this.handleCurrentPassword = this.handleCurrentPassword.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleConfirmation = this.handleConfirmation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendVerification = this.sendVerification.bind(this);
        this.handleSubscribeChange = this.handleSubscribeChange.bind(this);
    }

    setStatePromisified(e) {
        return new Promise(function(a) {
            this.setState(e, a)
        })
    }

    async handleCurrentPassword(passwordElement) {
        var password = passwordElement.target.value;
        await this.setStatePromisified({
            currentPassword: password,
            verificationDisabled: "" !== email || "" !== this.state.confirmation || "" !== this.state.currentPassword,
            ready: this.state.emailOk && this.state.confirmationOk && "" !== a
        });
    }

    async handleEmailChange(emailElement) {
        var email = emailElement.target.value;
        await this.setStatePromisified({
            email: a,
            emailOk: null,
            emailError: !1,
            emailTaken: !1,
            verificationDisabled: "" !== email || "" !== this.state.confirmation || "" !== this.state.currentPassword,
            ready: !1
        });
        if(!(null == email || "" === email)) {
            await this.setStatePromisified({ emailTaken: null });
            checkEmail(email, this.props.currentUser.id, async function(checkedEmail) {
                var n = !1, i, s, o;
                (!validator.isEmail(email) || isThrowawayEmail(email)) && (n = "That's an invalid email"),
                i = !checkedEmail && !n,
                s = !1,
                o = !1,
                "" !== r.state.confirmation && (r.state.confirmation === email
                    ? o = !0
                    : s = "Email addresses don't match");

                await r.setStatePromisified({
                    emailOk: i,
                    emailError: n,
                    emailTaken: t,
                    confirmationError: s,
                    confirmationOk: o,
                    showConfirmation: "" !== r.state.confirmation || i,
                    showPassword: "" !== r.state.currentPassword || i && r.state.confirmationOk,
                    ready: i && r.state.confirmationOk && "" !== r.state.currentPassword
                });

            });
        }
    }

    async handleConfirmation(confirmationElement) {
        var confirmation = confirmationElement.target.value;
        await this.setStatePromisified({
            confirmation: confirmation,
            confirmationError: !1,
            confirmationOk: null,
            verificationDisabled: "" !== this.state.email || "" !== confirmation || "" !== this.state.currentPassword,
            ready: !1
        });
        if(!(null == confirmation || "" === confirmation)) {
            await this.setStatePromisified({ confirmationError: null });
            var r = !1;
            confirmation !== this.state.email && (r = "Email addresses don't match"),
            n = !r
            await this.setStatePromisified({
                confirmationError: r,
                confirmationOk: n,
                showPassword: "" !== this.state.currentPassword || this.state.emailOk && n,
                ready: this.state.emailOk && n && "" !== this.state.currentPassword
            });
        }
    }

    async handleSubmit(form) {
        arg0.preventDefault();
        await this.props.dispatch(changeEmail({
            userId: this.props.currentUser.id,
            email: this.state.email,
            currentPassword: this.state.currentPassword
        }));
        await this.setStatePromisified({
            currentPassword: "",
            email: "",
            emailTaken: !1,
            emailError: !1,
            emailOk: null,
            confirmation: "",
            confirmationError: !1,
            confirmationOk: null,
            showConfirmation: !1,
            verificationDisabled: !1,
            ready: !1
        });
    }

    sendVerification(arg0) {
        this.props.dispatch(resendVerificationEmail());
        arg0.preventDefault()
    }

    handleSubscribeChange(arg0) {
        this.props.dispatch(changeUnsubscribe({
            userId: this.props.currentUser.id,
            unsubscribe: !e.target.checked
        }));
        e.preventDefault()
    }

    render() {
        var e = this.props,
            t = e.currentUser,
            a = e.email,
            r = t.obfuscatedEmail;
        null != t.obfuscatedPendingEmail && "" !== t.obfuscatedPendingEmail && (r = t.obfuscatedPendingEmail);
        var n = t.emailVerified && !t.hasPendingEmail;

        return <LoadingLayout loading={a.changing}>
                <div className="center-panel">
                    <form onSubmit={this.handleSubmit}>
                        {"" !== a.error &&
                        <Alert color="warning">
                            <Icon name="text-width" /> An error occurred: {a.error}
                        </Alert>
                        }
                        <Row>
                            <Col xs="1" style="text-align: right">
                                <Icon name="at" size="2x">
                            </Col>
                            <Col xs="10">
                                <Row>
                                    <input type="text" id="email" name="email" className="form-control" value={this.state.email} placeholder={r} onChange={this.handleEmailChange} onKeyUp={this.handleEmailChange} />
                                    {this.state.emailError &&
                                    <Alert color="warning">
                                        <Icon name="text-width" /> {this.state.emailError}
                                    </Alert>
                                    }
                                    {this.state.emailTaken
                                    <Alert color="warning">
                                        <Icon name="cookie-bite" /> That email is already in use.
                                    </Alert>
                                    }
                                    {t.hasPendingEmail &&
                                    <Alert color="info">
                                        <Icon name="info-circle" /> An email change is pending verification: {t.obfuscatedPendingEmail}
                                    </Alert>
                                    }
                                    {a.verificationSent && t.hasPendingEmail &&
                                    <Alert color="info">
                                        <Icon name="info-circle" /> Email verification sent to: {r}
                                    </Alert>
                                    }
                                    {a.changed &&
                                    <Alert color="success">
                                        <Icon name="text-width" /> Your email has been changed!
                                    </Alert>
                                    }
                                </Row>
                            </Col>
                            <Col xs="1" style="text-align: left">
                                {null == this.state.emailTaken &&
                                <Icon name="spinner" spin={!0} size="2x" />
                                <Check ok={this.state.emailOk} />
                                }
                            </Col>
                        </Row>
                        {this.state.showConfirmation &&
                        <Row>
                            <Col xs={{size: 10, offset: 1}}>
                                <Row>
                                    <input type="text" id="confirmEmail" className="form-control" placeholder="Please confirm email" onChange={this.handleConfirmation} onKeyUp={this.handleConfirmation} />
                                    {this.state.confirmationError &&
                                    <Alert color="warning">
                                        <Icon name="text-width" /> {this.state.confirmationError}
                                    </Alert>
                                    }
                                </Row>
                            </Col>
                            <Col xs="1" style="text-align: left">
                                <Check ok={this.state.confirmationOk} />
                            </Col>
                        </Row>
                        }
                        {this.state.showPassword &&
                        <Row>
                            <Col xs="1" style="text-align: right">
                                <Icon name="key" size="2x" />
                            </Col>
                            <Col xs="10">
                                <Row>
                                    <input type="password" id="emailPasswordVerify" name="emailPasswordVerify" className="form-control" placeholder="Please confirm current password" onChange={this.handleCurrentPassword} onKeyUp={this.handleCurrentPassword} />
                                </Row>
                            </Col>
                        </Row>
                        }
                        <hr />
                        <Row>
                            <Col xs={{size: 10, offset: 1}}>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="subscribe" checked={!t.unsubscribe} onChange={this.handleSubscribeChange} />
                                    <label className="custom-control-label" htmlFor="unsubscribe">Keep me up to date with the awesome power of your emails</label>
                                </div>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col xs={{size: 4, offset: 4}}>
                                <Button disabled={this.state.verificationDisabled || n} color="primary" outline={!0} block={!0} id="reverify" name="reverify" onClick={this.sendVerification}>
                                    {!n &&
                                    <span><Icon name="paper-plane" /> Resend Verification</Icon></span>
                                    }
                                    {n &&
                                    <span><Icon name="check" color="success" /> Email Verified</Icon></span>
                                    }
                                </Buttom>
                            </Col>
                            <Col xs="4">
                                <Button disabled={!this.state.ready && !a.changing} color="primary" block={!0} id="email-change-submit" name="email-change-submit" value="update">Change Email</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </LoadingLayout>
    }

}

module.exports = connect(function(e) {
    return {
        currentUser: e.currentUser.databaseUser,
        email: e.currentUser.email
    }
}

//TODO
