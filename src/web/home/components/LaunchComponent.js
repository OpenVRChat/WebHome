var React = require("react"),
connect = require("react-redux").connect,
Route = require("react-router").Route,
Switch = require("react-router").Switch,
Icon = require("react-fontawesome"),
css = require("emotion").css,
LoadingSpinner = require("./Common/LoadingSpinner"),
axios = require("axios"),
//amplitude = require("../amplitude"),
Button = require("reactstrap").Button,
Row = require("reactstrap").Row,
Container = require("reactstrap").Container,
_require = require("../common"),
getPrettyInstanceType = _require.getPrettyInstanceType,
_require2 = require("../../../api_v1/tools/utilities"),
nullOrEmpty = _require2.nullOrEmpty,
TwitterShareButton = require("react-share").TwitterShareButton,
TwitterIcon = require("react-share").TwitterIcon,
YouTube = require("react-youtube").default,
SHOW_SHORTNAME = !0,
SHOW_INVITE_LINK = !0,
opts = { width: "100%" };

class LaunchComponent extends React.Component {

    constructor(settings) {
        this.state = {
            data: {},
            error: null,
            worldId: settings.worldId,
            instanceId: settings.instanceId,
            shortName: settings.shortName,
            popoverOpen: !1,
            successfulAuth: !1,
            showSendInviteLink: !1,
            invitePending: !1,
            inviteSent: !1,
            inviteError: !1
        }
        this.showYoutubeIfAvailable = this.showYoutubeIfAvailable.bind(this);
        this.renderHotWorlds = this.renderHotWorlds.bind(this);
        this.onLaunch = this.onLaunch.bind(this);
        this.sendInvite = this.sendInvite.bind(this);
    }

    async componentDidMount() {
        axios.get(`${API_ADDRESS}/api/1/config`).then(async function() {
            window.apiKey = a.data.clientApiKey;
            axios.get(`${API_ADDRESS}/api/1/worlds/${this.state.worldId}`).then(r => {
                this.setState({ data: r.data })
            }).catch(e => {
                console.error(e);
                this.setState({ error: e })
            })
            if(SHOW_SHORTNAME && null == this.state.shortName && null != this.state.worldId && null != this.state.instanceId) {
                axios.get(`${API_ADDRESS}/api/1/instances/${e.state.worldId}:${e.state.instanceId}/shortName`).then(r => {
                    this.setState({ shortName: r.data })
                }).catch(e => {
                    console.error(e);
                    this.setState({ error: e })
                })
            }
            axios.get(`${API_ADDRESS}/api/1/worlds?featured=false&releaseStatus=public&sort=shuffle&order=descending&n=4&tag=admin_community_spotlight`).then(function(t) {
                this.state.data.hotWorlds = t.data;
                this.forceUpdate();
            }).catch(e => {
                console.error(e);
                this.setState({ error: e })
            })
            axios.get(`${API_ADDRESS}/api/1/auth/user`).then(() => {
                this.setState({
                    successfulAuth: !0,
                    showSendInviteLink: null !== this.state.instanceId && "" !== this.state.instanceId
                })
            }).catch(e => {
                console.warn(e)
            });
        }).catch(e => {
            console.error(e);
            this.state.error = e;
            this.forceUpdate()
        })
    }

    showYoutubeIfAvailable() {
        return this.state.data.previewYoutubeId
            ? React.createElement("div", { className: "card flex-grow-1 mb-4 box-shadow" },
                React.createElement("div", { className: "p-1" },
                    React.createElement(YouTube, {
                        videoId: this.state.data.previewYoutubeId,
                        opts: opts
                    })))
            : void 0
    }

    renderHotWorlds() {
        var e = [];
        var e = [];
        if (this.state.data.hotWorlds && 0 < this.state.data.hotWorlds.length)
            for (var t, a = this.state.data.hotWorlds, n = 0; n < a.length; n++) {
                t = a[n];
                e.push(React.createElement("div", { className: "item-img", key: t.id + n },
                    React.createElement("a", { href: window.endpoint + "/home/launch?worldId=" + t.id },
                        React.createElement("img", { src: t.thumbnailImageUrl }))));
            }
        return e
    }

    onLaunch() {
        /*
        amplitude.logEvent("Launch", {
            worldId: this.state.worldId,
            worldName: this.state.data.name,
            occupants: this.state.data.occupants,
            instanceId: this.state.instanceId,
            instanceType: this.state.instanceId ? getPrettyInstanceType(this.state.instanceId) : null,
            launchType: this.state.instanceId ? "instance" : "new"
        })
        */
    }

    async sendInvite() {
        this.setState({ invitePending: !0 });
        try {
            await axios.post(`${API_ADDRESS}/api/1/instances/${this.state.worldId}:${this.state.instanceId}/invite`, {});
            this.setState({ inviteSent: !0 })
        }
        catch (e) {
            this.setState({ inviteError: !0 });
        }
    }

    render() {
        var e = "INVITE ME";
        if (
            this.state.invitePending && (e = <Icon name="spinner" spin={!0}></Icon>),
            this.state.inviteSent && (e = <Icon name="check"></Icon>),
            this.state.inviteError && (e = <Icon name="question"></Icon>),
            this.state.error)
            return <div><h1><p>{this.state.error.message}</p></h1></div>
        if (!nullOrEmpty(this.state.data)) {
            var t = `vrchat://launch?ref=vrchat.com&id=${this.state.worldId}:${this.state.instanceId}`;
            var rootCss = `
            & h2, h3, h4, h5 {
                text-transform: capitalize !important;
            }
            & h3 {
                border: 0;
            }
            & h4 {
                color: #0193af;
                font-size: normal;
            }
            & h5 {
                color: #0193af;
                font-size: normal;
            }
            & p {
                color: #8c8c8c;
            }
            & .container-bg {
                background: #111516;
            }
            & .box-shadow {
                border: 4px solid #051d22;
                border-radius: 10px;
                box-shadow: 10px 10px 40px 0px rgba(0,0,0,0.4);
                background-color: #060809;
            }
            & .navbar {
                font-size: 1.25rem;
                border-top: none !important;
            }
            & .navbar .container .col {
                padding: 0;
            }
            & .navbar span {
                padding-right: 15px;
                color: gray;
                font-size: 1rem;
            }
            & .navbar .sign-up-none {
                color: #f5b501;
            }
            & .navbar .sign-up-lg-none {
                color: #f5b501;
                font-size: 1rem !important;
            }
            & .navbar .home {
                color: #f5b501;
                font-size: 1rem !important;
            }
            & .logo {
                width: 80px;
            }
            & .launch-btn {
                background: #f5b501;
                color: #ffffff;
                border: 0;
                font-size: 1.5rem;
                font-weight: bold;
                border-radius: 25px;
                letter-spacing: 1px;
                padding: 5px 30px;
            }
            & .secondary-launch-btn {
                opacity: 0.9;
            }
            & .container-margin {
                margin-top: 2 rem !important;
            }
            & .section-bg {
                background-image: url(", ");
                background-size: cover;
                background-position: center;
                height: 400px;
            }
            & .header .card-text,
            .header .creator-link {
                font-size: 1.5rem;
            }
            & .header .card-title {
                margin: 0;
                line-height: 1;
            }
            & .header .card-text {
                color: #8c8c8c;
            }
            & .world-image .world-size,
            .world-image .world-users {
                text-align: right;
                background: gray;
                width: 55px;
                padding: 0 5px;
                flex-direction: flex-row-reverse;
                margin-bottom: 10px;
                border-radius: 5px;
                background: #777777;
            }
            & .world-description p {
                font-size: 1.25rem;
                line-height: normal;
            }
            & .world-description a.more-link {
                text-decoration: underline;
            }
            & .world-description .btn-primary {
                background: #011b22;
                color: #0193af;
                font-weight: bold;
                border: 2px solid #0193af;
                border-radius: 25px;
                letter-spacing: 1px;
                padding: 5px 30px;
            }
            & .world-share {
                bottom: 20px;
                position: absolute;
            }
            & .item-img {
                background: #ddd;
                width: 23.3%;
                margin: 6px;
            }
            & .item-img img {
                width: 100%;
            }
            & .description-height {
                min-height: 200px;
            }
            & .share-button {
                cursor:pointer;
            }
            `;
            return <div className={css(rootCss), this.state.data.imageUrl}>
                    <Container>
                        <Row className="navbar fixed-top box-shadow">
                            <div className="container">
                                <div className="col">
                                    <a href="http://vrchat.com/"><img className="logo" src="/public/media/logo.png" /></a>
                                </div>
                                {!1 === this.state.successfulAuth &&
                                <div>
                                    <div className="d-lg-none">
                                        <div className="col text-center">
                                            <a className="sign-up-lg-none" href={window.endpoint + "/register"} target="_blank">Don't Have a VRChat Account? Create One Now!</a>
                                        </div>
                                    </div>
                                    <div className="d-none d-lg-block">
                                        <div className="col text-center">
                                            <a className="sign-up-none" href={window.endpoint + "/register"} target="_blank">Don't Have a VRChat Account? Create One Now!</a>
                                        </div>
                                    </div>
                                </div>
                                }
                                <div className="col text-right">
                                    <a className="home" href={window.endpoint + "/home"} target="_black">Home</a>
                                </div>
                            </div>
                        </Row>
                        <Row className="header d-lg-none card mb-4 box-shadow" style="margin-top: 70px">
                            <div className="card-body d-flex">
                                <div className="w-100">
                                    <h2 className="card-title"><a href={window.endpoint + "/home/world/" + this.state.worldId}>{this.state.data.name}</a> - {getPrettyInstanceType(this.state.instanceId)}</h2>
                                    <span className="card-text font-weight-normal">Created by: </span><a className="font-weight-normal creator-link" href={window.endpoint + "/home/user/" + this.state.data.authorId} target="_blank">{this.state.data.authorName}</a><br />
                                    {SHOW_SHORTNAME && this.state.shortName &&
                                    <div>
                                        <span className="card-text font-weight-normal">Share: </span>
                                        <a className="font-weight-normal creator-link" href={window.endpoint + "/i/" + this.state.shortName}>{window.endpoint, "/i/", this.state.shortName}</a>
                                    </div>
                                    }
                                    <br />
                                    <div className="flex-shrink-1">
                                        <h2><a href={t} onClick={this.onLaunch} className="btn btn-primary launch-btn">LAUNCH WORLD</a></h2>
                                    </div>
                                    {SHOW_INVITE_LINK && this.state.showSendInviteLink &&
                                    <div>
                                        <Button onClick={this.sendInvite} className="btn-primary launch-btn secondary-launch-btn">{e}</Button>
                                    </div>
                                    }
                                </div>
                            </div>
                        </Row>
                        <Row className="header d-none d-lg-block card mb-4 box-shadow" style="margin-top: 70px">
                            <div className="card-body d-flex">
                                <div className="w-100">
                                    <h2 className="card-title">
                                        <a href={window.endpoint + "/home/world/" + this.state.worldId}>{this.state.data.name}</a> - {getPrettyInstanceType(this.state.instanceId)}
                                    </h2>
                                    <span className="card-text font-weight-normal">Created by: </span>
                                    <a className="font-weight-normal creator-link" href={window.endpoint + "/home/user/" + this.state.data.authorId} target="_blank">{this.state.data.authorName}</a>
                                    {SHOW_SHORTNAME && this.state.shortName &&
                                    <div>
                                        <span className="card-text font-weight-normal">Share: </span>
                                        <a className="font-weight-normal creator-link" href={window.endpoint + "/i/" + this.state.shortName}>{window.endpoint, "/i/", this.state.shortName}</a>
                                    </div>
                                    }
                                </div>
                                <div className="flex-shrink-1">
                                    <h2>
                                        <a href={t} onClick={this.onLaunch} className="btn btn-primary launch-btn">LAUNCH WORLD</a>
                                    </h2>
                                    {SHOW_INVITE_LINK && this.state.showSendInviteLink &&
                                    <h2 className="pull-right">
                                        <Button onClick={this.sendInvite} className="btn-primary launch-btn secondary-launch-btn">{e}</Button>
                                    </h2>
                                    }
                                </div>
                            </div>
                        </Row>
                        <Row className="world-image card mb-4 section-bg box-shadow">
                            <div className="card-body justify-content-end align-self-end">
                                <div className="world-users">
                                    <i className="fas fa-user mr-2">{this.state.data.occupants}</i>
                                </div>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-12 card mb-4 box-shadow description-height">
                                <div className="card-body d-flex">
                                    <div className="w-100">
                                        <h4 className="card-title font-weight-normal">Description</h4>
                                        <p className="card-text">{this.state.data.description}</p>
                                        <div className="world-share d-inline-flex"></div>
                                        <span className="mr-2">Share this world</span>
                                        <TwitterShareButton url={window.endpoint + "/home/launch?worldId=" + this.state.worldId} title="#MadeWithVRChat" />
                                        <TwitterIcon size="32" round="true" />
                                    </div>
                                </div>
                            </div>
                            {this.showYoutubeIfAvailable()}
                        </Row>
                        <Row className="popular-worlds card mb-4 pb-4 box-shadow">
                            <div className="card-body">
                                <h4 className="card-title font-weight-normal">Check out these Popular Worlds</h4>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center">
                                {this.renderHotWorlds()}
                            </div>
                        </Row>
                    </Container>
                </div>;
        }
        return <div><LoadingSpinner /></div>;
    }
}

module.exports = LaunchComponent;
