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

}

//TODO
