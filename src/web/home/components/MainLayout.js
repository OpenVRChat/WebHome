var React = require("react"),
connect = require("react-redux").connect,
Route = require("react-router").Route,
Switch = require("react-router").Switch,
LaunchLayout = require("./LaunchLayout");
EmailNotVerifiedLayout = require("./Login/EmailNotVerifiedLayout"),
EmailVerifyFailedLayout = require("./Login/EmailVerifyFailedLayout"),
CriticalLayout = require("./CriticalLayout"),
UnverifiedLayout = require("./UnverifiedLayout"),
LoginLayout = require("./Login/LoginLayout"),
RegisterLayout = require("./Login/RegistrationLayout"),
/*
PasswordLayout = require("./Login/RecoverPasswordLayout"),
*/
TwoFactorAuthLayout = require("./Login/TwoFactorAuthLayout"),
TwoFactorAuthOtpLayout = require("./Login/TwoFactorAuthOtpLayout"),
/*
AcceptNewTOSLayout = require("./CurrentUser/AcceptNewTOSLayout"),
OAuthLayout = require("./OAuthLayout"),
*/
HomeLayout = require("./HomeLayout");

class MainLayout extends React.Component {
    render() {
        return <main>
                <Switch>
                    <Route path="/home/launch" component={LaunchLayout} />
                    <Route path="/home/verify" component={EmailNotVerifiedLayout} />
                    <Route path="/home/failedverify" component={EmailVerifyFailedLayout} />
                    <Route path="/home/critical" component={CriticalLayout} />
                    <Route path="/home/unverified" component={UnverifiedLayout} />
                    <Route path="/home/login" component={LoginLayout} />
                    <Route path="/home/register" component={RegisterLayout} />
                    <Route path="/home/twofactorauth" component={TwoFactorAuthLayout} />
                    <Route path="/home/twofactorauthrecovery" component={TwoFactorAuthOtpLayout} />
                    /* TODO
                    <Route path="/home/tosupdated" component={AcceptNewTOSLayout} />
                    <Route path="/home/password" component={PasswordLayout} />
                    <Route path="/home/oauth" component={OAuthLayout} />
                    */
                    <Route path="/home" component={HomeLayout} />
                    <Route component={HomeLayout} />
                </Switch>
            </main>
    }
}
module.exports = MainLayout;
