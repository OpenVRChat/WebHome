var React = require("react"),
    connect = require("react-redux").connect,
    push = require("react-router-redux").push,
    Recaptcha = require("react-recaptcha"),
    _ = require("lodash"),
    validator = require("validator"),
    moment = require("moment"),
    axios = require("axios"),
    Icon = require("react-fontawesome"),
    register = require("../../actions/register").register,
    sanitize = require("../../../../api_v1/tools/sanitize.js").sanitize,
    isThrowawayEmail = require("../../../../api_v1/tools/pookmail.js").isThrowawayEmail,
    LoadingSpinner = require("../Common/LoadingSpinner"),
    Check = require("../Common/Check"),
    Row = require("reactstrap").Row,
    Col = require("reactstrap").Col,
    Container = require("reactstrap").Container,
    Alert = require("reactstrap").Alert,
    config = require("../../config")
    MIN_NAME_LENGTH = 4,
    MAX_NAME_LENGTH = 15,
    MIN_PASSWORD_LENGTH = 8,
    isBadPassword = require("../../../../api_v1/tools/stupidPasswords").isBadPassword,
    checkUsername = _.debounce(function(e, t) {
        axios.get(`${config.API_ADDRESS}/api/1/auth/exists?username=${encodeURIComponent(e)}&displayName=${encodeURIComponent(e)}`).then(function(e) {
            t(e.data.userExists)
        })
    }, 1e3),
    checkEmail = _.debounce(function(e, t) {
        console.log(e), axios.get(`${config.API_ADDRESS}/api/1/auth/exists?email=${encodeURIComponent(e)}`).then(function(e) {
            t(e.data.userExists)
        })
    }, 1e3);

class RegistrationPage extends React.Component {
    constructor() {
        this.state = {
            username: "",
            usernameError: !1,
            usernameTaken: !1,
            usernameOk: null,
            email: "",
            emailError: !1,
            emailTaken: !1,
            emailOk: null,
            emailAgain: "",
            emailAgainOk: null,
            password: "",
            passwordError: !1,
            passwordOk: null,
            passwordAgain: "",
            passwordAgainOk: null,
            year: "",
            month: "1",
            day: "",
            birthdayError: !1,
            birthdayOk: null,
            tos: 0,
            subscribe: !0,
            recaptcha: !1,
            recaptchaCode: "",
            ready: !1
        }
    }

    setStatePromisified(arg0) {
        return new Promise(function(a) {
            t.setState(arg0, a)
        })
    }

    async checkIfReady() {
        if (!0 === this.state.usernameOk && !0 === this.state.emailOk && !0 === this.state.emailAgainOk && !0 === this.state.passwordOk && !0 === this.state.passwordAgainOk && !0 === this.state.birthdayOk && 0 < this.state.tos && !0 === this.state.recaptcha)
            await this.setStatePromisified({ ready: !0 });
        else
            await this.setStatePromisified({ ready: !1 });
    }

    async handleUsernameChange(arg0) {
        arg0.preventDefault();
        var a = arg0.target.value;
        await this.setStatePromisified({
            username: a,
            usernameOk: null,
            usernameTaken: !1,
            usernameError: !1
        });
        if (!("" === a)) {
            a = sanitize(a);
            await this.setStatePromisified({ usernameTaken: null });
          	checkUsername(a, async function(arg1) {
            	var n = !1;
            	"" !== a && a.length < MIN_NAME_LENGTH
					? n = "That username is too short"
                	: a.length > MAX_NAME_LENGTH && (n = "That username is too long");
                var i = !arg1 && !n;
                await r.setStatePromisified({
                    username: a,
                    usernameTaken: arg1,
                    usernameOk: i,
                    usernameError: n
                });
                await this.checkIfReady();
            });
        }
    }

    async handleEmailChange(arg0) {
        arg0.preventDefault();
        var a = arg0.target.value
        await this.setStatePromisified({
            email: a,
            emailOk: null,
            emailTaken: !1,
            emailError: !1,
            emailAgainOk: null
        });
        if (!("" === a)) {
            await this.setStatePromisified({ emailTaken: null });
            await checkEmail(a, async function(arg1) {
                var n = !1;
                (!validator.isEmail(a) || isThrowawayEmail(a)) && (n = "That's an invalid email");
                var i = !arg1 && !n;
                await r.setStatePromisified({
                    emailTaken: arg1,
                    emailOk: i,
                    emailError: n
                });
            });
            if (!(!i || "" === this.state.emailAgain)) {
                await this.setStatePromisified({ emailAgainOk: this.state.emailAgain === a });
                await this.checkIfReady();
            }
        }
    }

    async handleEmailAgainChange(arg0) {
        arg0.preventDefault();
        var a = arg0.target.value;
        await this.setStatePromisified({
            emailAgain: a,
            emailAgainOk: null
        });
        if (!("" === a || !this.state.emailOk)) {
            await this.setStatePromisified({ emailAgainOk: a === this.state.email });
        }
        await this.checkIfReady();
    }

    async handlePasswordChange(arg0) {
        arg0.preventDefault();
        var a = arg0.target.value;
        await this.setStatePromisified({
            password: a,
            passwordOk: null,
            passwordError: !1,
            passwordAgainOk: null
        });
        if (!("" === a)) {
            var r = !1;
            a.length < MIN_PASSWORD_LENGTH
                ? r = "That password is too short"
                : isBadPassword(a) && (r = "Please try a more secure password");
            var n = !r;
            await this.setStatePromisified({
                passwordOk: n,
                passwordError: r
            });
            if (!(!n || "" === this.state.passwordAgain)) {
                await this.setStatePromisified({ passwordAgainOk: this.state.passwordAgain === a });
            }
        }
        await this.checkIfReady();
    }

    async handlePasswordAgainChange(arg0) {
        arg0.preventDefault();
        var a = arg0.target.value;
        await this.setStatePromisified({
            passwordAgain: a,
            passwordAgainOk: null
        });
        if (!("" === a || !this.state.passwordOk)) {
            await this.setStatePromisified({ passwordAgainOk: a === this.state.password });
        }
        await this.checkIfReady();
    }

    async validateBirthday(t, a, r) {
        if (!("" !== r && "" !== a && "" !== t))
            return;
        if (!validator.isInt(r) || 1900 > r || 2017 < r) {
            await this.setStatePromisified({
                birthdayError: "That's not a valid year",
                birthdayOk: !1
            });
            return;
        }
        if (!validator.isInt(a) || 0 > a || 12 < a) {
            await this.setStatePromisified({
                birthdayError: "That's not a valid month",
                birthdayOk: !1
            });
            return;
        }
        if (!validator.isInt(t) || 0 > t || 31 < t) {
            await this.setStatePromisified({
                birthdayError: "That's not a valid day",
                birthdayOk: !1
            });
            return;
        }
        if (!moment({ year: r, month: a - 1, day: t }).isValid()) {
            await this.setStatePromisified({ birthdayError: "That's not a valid date", birthdayOk: !1 });
            return;
        }
        await this.setStatePromisified({ birthdayOk: !0 });
    }

    async handleDayChange(arg0) {
        arg0.preventDefault();
        var a = arg0.target.value;
        await this.setStatePromisified({
            day: a,
            birthdayOk: null,
            birthdayError: !1
        });
        this.validateBirthday(a, this.state.month, this.state.year);
        await this.checkIfReady();
    }

    async handleMonthChange(arg0) {
        arg0.preventDefault();
        var a = arg0.target.value;
        await this.setStatePromisified({
            month: a,
            birthdayOk: null,
            birthdayError: !1
        });
        this.validateBirthday(this.state.day, a, this.state.year);
        await this.checkIfReady();
    }

    async handleYearChange(arg0) {
        arg0.preventDefault();
        var a = arg0.target.value;
        await this.setStatePromisified({
            year: a,
            birthdayOk: null,
            birthdayError: !1
        });
        this.validateBirthday(this.state.day, this.state.month, a);
        await this.checkIfReady();
    }

    async handleTosChange(arg0) {
        if (arg0.target.checked) {
            await this.setStatePromisified({ tos: this.props.currentTOSVersion });
        }
        else {
            await this.setStatePromisified({ tos: 0 });
        }
        await this.checkIfReady();
    }

    async handleSubscribeChange(arg0) {
        a = arg0.target.checked;
        await this.setStatePromisified({
            subscribe: a
        });
    }

    async handleRecaptchaVerified(arg0) {
        await this.setStatePromisified({
            recaptcha: !0,
            recaptchaCode: arg0
        });
        await this.checkIfReady();
    }

    async handleRecaptchaExpired() {
        await this.setStatePromisified({
            recaptcha: !1,
            recaptchaCode: ""
        });
        await this.checkIfReady();
    }

    handleSubmit(arg0) {
        arg0.preventDefault();
        this.props.dispatch(register({
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            year: this.state.year,
            month: this.state.month,
            day: this.state.day,
            recaptchaCode: this.state.recaptchaCode,
            subscribe: this.state.subscribe,
            acceptedTOSVersion: this.state.tos
        })).then(function() {
            if (this.props.loggedIn) {
                var e = this.props.loginPath || "/";
                this.props.dispatch(push(e))
            }
            else
                console.error("somehow we're not logged in after all that")
        })
    }

    navLogin(arg0) {
        arg0.preventDefault();
        this.props.dispatch(push("/home/login"));
    }

    navPassword(arg0) {
        arg0.preventDefault();
        this.props.dispatch(push("/home/password"));
    }

    render() { // TODO convert this back to JSX
        var e = this.props,
            t = e.error,
            a = e.loading,
            r = "";

        return null != t && "" !== t && (<Alert color="warning">{t}</Alert>),
        React.createElement(Container, null,
            React.createElement(Col, { md: { offset: 4, size: 4 }, style: { marginTop: "50px" } },
                React.createElement("ul", { className: "nav nav-tabs" },
                    React.createElement("li", { className: "nav-item" },
                        React.createElement("a", { href: "#", className: "nav-link", onClick: this.navLogin },
                            "Login")),
                    React.createElement("li", { className: "nav-item" },
                        React.createElement("a", { href: "#", className: "nav-link active" },
                            "Registration")),
                    React.createElement("li", { className: "nav-item" },
                        React.createElement("a", { href: "#", className: "nav-link", onClick: this.navPassword },
                            "Password Recovery"))),
                React.createElement("div", { className: "card nobottommargin" },
                    React.createElement("div", { className: "card-body" },
                        React.createElement("form", { id: "registration-form", name: "registration-form", className: "nobottommargin", onSubmit: this.handleSubmit },
                            React.createElement("h3", null,
                                "Register for an Account"),
                            React.createElement(Row, null,
                                r),
                            React.createElement(LoadingSpinner, { hidden: !a }),
                            React.createElement(Row, null,
                                React.createElement(Col, null,
                                    React.createElement("label", { htmlFor: "username" },
                                        "Choose a Username:"),
                                        " ",
                                        React.createElement(Check, { ok: this.state.usernameOk, size: "lg" }),
                                        null == this.state.usernameTaken &&
                                        React.createElement(Icon, { name: "spinner", spin: !0 }),
                                        React.createElement("input", { type: "text", id: "username", name: "username", className: "form-control", value: this.state.username, onChange: this.handleUsernameChange }),
                                        this.state.usernameError &&
                                        React.createElement(Alert, { color: "warning" },
                                            React.createElement(Icon, { name: "text-width" }),
                                            " ",
                                            this.state.usernameError),
                                        this.state.usernameTaken &&
                                        React.createElement(Alert, { color: "warning" },
                                            React.createElement(Icon, { name: "cookie-bite" }),
                                            " That username is already taken. "))),
                            React.createElement(Row, null,
                                React.createElement(Col, null,
                                    React.createElement("label", { htmlFor: "email" },
                                        "Email:"),
                                    " ",
                                    React.createElement(Check, { ok: this.state.emailOk, size: "lg" }),
                                    null == this.state.emailTaken &&
                                    React.createElement(Icon, { name: "spinner", spin: !0 }),
                                    React.createElement("input", { type: "text", id: "email", name: "email", className: "form-control", onChange: this.handleEmailChange }),
                                    this.state.emailTaken &&
                                    React.createElement(Alert, { color: "warning" },
                                        React.createElement(Icon, { name: "cookie-bite" }),
                                        " That email is already taken. "),
                                    this.state.emailError &&
                                    React.createElement(Alert, { color: "warning" },
                                        React.createElement(Icon, { name: "dizzy" }),
                                        " ",
                                        this.state.emailError,
                                        ". "))),
                            React.createElement(Row, null,
                                React.createElement(Col, null,
                                    React.createElement("label", { htmlFor: "email-again" },
                                        "Re-Enter Email:"),
                                    " ",
                                    React.createElement(Check, { ok: this.state.emailAgainOk, size: "lg" }),
                                    React.createElement("input", { type: "text", id: "email-again", name: "email-again", className: "form-control", onChange: this.handleEmailAgainChange }),
                                    !1 === this.state.emailAgainOk &&
                                    React.createElement(Alert, { color: "warning" },
                                        React.createElement(Icon, { name: "not-equal" }),
                                        " Email doesn't match. "))),
                            React.createElement(Row, null,
                                React.createElement(Col, null,
                                    React.createElement("label", { htmlFor: "password" },
                                        "Password:"),
                                    " ",
                                    React.createElement(Check, { ok: this.state.passwordOk, size: "lg" }),
                                    React.createElement("input", { type: "password", id: "password", name: "password", className: "form-control", onChange: this.handlePasswordChange }),
                                    this.state.passwordError &&
                                    React.createElement(Alert, { color: "warning" },
                                    React.createElement(Icon, { name: "dizzy" }),
                                    " ",
                                    this.state.passwordError, ". "))),
                            React.createElement(Row, null,
                                React.createElement(Col, null,
                                    React.createElement("label", { htmlFor: "password-again" },
                                        "Re-Enter Password:"),
                                        " ",
                                        React.createElement(Check, { ok: this.state.passwordAgainOk, size: "lg" }),
                                        React.createElement("input", { type: "password", id: "password-again", name: "password-again", className: "form-control", onChange: this.handlePasswordAgainChange }),
                                        !1 === this.state.passwordAgainOk &&
                                        React.createElement(Alert, { color: "warning" },
                                            React.createElement(Icon, { name: "not-equal" }),
                                            " Password doesn't match. "))),
                            React.createElement(Row, null, React.createElement(Col, null,
                                React.createElement("label", { htmlFor: "registration-form-birthday" },
                                    "Date of Birth:"),
                                " ",
                                React.createElement(Check, { ok: this.state.birthdayOk, size: "lg" }),
                                React.createElement(Row, { className: "no-gutters" },
                                    React.createElement(Col, { md: "5" },
                                    React.createElement("select", { className: "form-control", id: "age_month", name: "age_month", onChange: this.handleMonthChange },
                                        React.createElement("option", { value: "1" }, "January"),
                                        React.createElement("option", { value: "2" }, "February"),
                                        React.createElement("option", { value: "3" }, "March"),
                                        React.createElement("option", { value: "4" }, "April"),
                                        React.createElement("option", { value: "5" }, "May"),
                                        React.createElement("option", { value: "6" }, "June"),
                                        React.createElement("option", { value: "7" }, "July"),
                                        React.createElement("option", { value: "8" }, "August"),
                                        React.createElement("option", { value: "9" }, "September"),
                                        React.createElement("option", { value: "10" }, "October"),
                                        React.createElement("option", { value: "11" }, "November"),
                                        React.createElement("option", { value: "12" }, "December"))),
                                        React.createElement(Col, { md: "3" },
                                            React.createElement("input", { type: "text", id: "day", name: "day", className: "form-control", placeholder: "day", onChange: this.handleDayChange })),
                                        React.createElement(Col, { md: "4" },
                                            React.createElement("input", { type: "text", id: "year", name: "year", className: "form-control", placeholder: "year", onChange: this.handleYearChange }))),
                                React.createElement(Row, null,
                                    React.createElement(Col, null,
                                        this.state.birthdayError &&
                                        React.createElement(Alert, { color: "warning" },
                                        React.createElement(Icon, { name: "dizzy" }),
                                        " ",
                                        this.state.birthdayError,
                                        ". "))))),
                            React.createElement("hr", null),
                            React.createElement(Row, null,
                                React.createElement(Col, null,
                                    React.createElement("div", { className: "custom-control custom-checkbox" },
                                        React.createElement("input", { type: "checkbox", className: "custom-control-input", id: "tos", onChange: this.handleTosChange }),
                                        React.createElement("label", { className: "custom-control-label", htmlFor: "tos" },
                                            "I have read and agree to the  ",
                                            React.createElement("a", { href: "/community-guidelines", target: "_blank" },
                                                "Community Guidelines"),
                                            ", ",
                                            React.createElement("a", { href: "/legal/", target: "_blank" },
                                                "Terms of Service"),
                                            " and ",
                                            React.createElement("a", { href: "/privacy/", target: "_blank" },
                                                "Privacy Policy"))))),
                                React.createElement("hr", null),
                                React.createElement(Row, null,
                                    React.createElement(Col, null,
                                        React.createElement(Recaptcha, { theme: "dark", sitekey: "6LfxcQ4UAAAAAGNAOUtX3pADEAu-sCsQL6En2E9S", verifyCallback: this.handleRecaptchaVerified, expiredCallback: this.handleRecaptchaExpired }))),
                                React.createElement("hr", null),
                                React.createElement(Row, null,
                                    React.createElement(Col, null,
                                        React.createElement("div", { className: "custom-control custom-checkbox" },
                                            React.createElement("input", { type: "checkbox", className: "custom-control-input", id: "subscribe", checked: this.state.subscribe, onChange: this.handleSubscribeChange }),
                                            React.createElement("label", { className: "custom-control-label", htmlFor: "subscribe" },
                                                "Keep me up to date with the awesome power of your emails")))),
                                React.createElement("hr", null),
                                React.createElement(Row, null,
                                    React.createElement(Col, null,
                                        React.createElement("button", { disabled: !this.state.ready, className: "btn btn-primary float-right", id: "registration-form-submit", name: "registration-form-submit", value: "register" },
                                            "Create Account"))))))))
    }
}
