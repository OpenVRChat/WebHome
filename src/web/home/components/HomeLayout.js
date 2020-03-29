var React = require("react"),
    connect = require("react-redux").connect,
    Route = require("react-router").Route,
    Switch = require("react-router").Switch,
    HashRouter = require("react-router-dom").HashRouter,
    Container = require("reactstrap").Container,
    Row = require("reactstrap").Row,
    Col = require("reactstrap").Col,
    LoadingSpinner = require("./Common/LoadingSpinner"),
    css = require("emotion").css,
    VariantSwitcher = require("./VariantSwitcher"),
    Navbar = require("./Navbar"),
    GlobalMessages = require("./GlobalMessages"),
    CurrentUserComponent = require("./CurrentUser/CurrentUserComponent"),
    FriendsComponent = require("./Friends/FriendsComponent"),
    HomePage = require("./HomePage"),
    DownloadPage = require("./DownloadPage"),
    AccountLinkPage = require("./AccountLinkComponent"),
    EditProfile = require("./CurrentUser/Profile/EditProfile"),
    EditWorldComponent = require("./World/EditWorldComponent"),
    MessagesComponent = require("./Notifications/MessagesComponent"),
    Search = require("./Search/Search"),
    UserLayout = require("./User/UserLayout"),
    WorldsComponent = require("./World/WorldsComponent"),
    WorldComponent = require("./World/WorldComponent"),
    AvatarsLayout = require("./Avatar/AvatarsLayout"),
    AvatarLayout = require("./Avatar/AvatarLayout"),
    MessagesLayout = require("./Notifications/MessagesLayout"),
    ModLayout = !1,
    LocationComponent = require("./Instances/LocationComponent"),
    PlayerModerationsComponent = require("./PlayerModerations/PlayerModerationsComponent"),
    PaymentComponent = !1,
    PaymentComplete = !1,
    PaymentCanceled = !1;

class HomeLayout extends React.Component {
    render() {
        return <div className={css(_templateObject())}>
            <Navbar />
            <GlobalMessages />
            <Container fluid={!0}>
                <Row>
                    <Col xs="2" className="d-none d-lg-block fixed-top bg-gradient-secondary leftbar">
                        <VariantSwitcher />
                        <CurrentUserComponent />
                        <Navbar horizontal={!0} />
                        <MessagesComponent n={1} slim={!0} />
                    </Col>
                    <Col className="offset-lg-2 col-lg-7 col-xs-12">
                        <div className="home-content">
                            <Switch>
                                <Route exact={!0} path="/home/search" component={Search} />
                                <Route path="/home/search/:query" component={Search} />
                                <Route exact={!0}, path="/home/user" component={CurrentUserComponent} />
                                <Route path="/home/profile" component={EditProfile} />
                                <Route path="/home/user/:userId" component={UserLayout} />
                                <Route path="/home/locations" component={LocationComponent} />
                                <Route path="/home/worlds" component={WorldsComponent} />
                                <Route path="/home/world/:worldId/edit" component={EditWorldComponent} />
                                <Route path="/home/world/:worldId" component={WorldComponent} />
                                <Route path="/home/avatars" component={AvatarsLayout} />
                                <Route path="/home/avatar/:avatarId" component={AvatarLayout} />
                                <Route path="/home/messages" component={MessagesLayout} />
                                <Route path="/home/friends" component={FriendsComponent} />
                                <Route path="/home/playermoderations" component={PlayerModerationsComponent} />
                                <Route path="/home/download" component={DownloadPage} />
                                <Route path="/home/accountlink" component={AccountLinkPage} />
                                <Route component={HomePage} />
                            </Switch>
                        </div>
                    </Col>
                    <Col xs={{ size: 3, offset: 9 }} className="d-none d-lg-block fixed-top bg-gradient-secondary rightbar">
                        <FriendsComponent />
                    </Col>
                </Row>
            </Container>
        </div>
    }
}
