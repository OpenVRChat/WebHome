var React = require("react"),
    Container = require("reactstrap").Container,
    Col = require("reactstrap").Col;


module.exports = function(e) {
    var t = e.error,
        r = e.statusCode;
    null == t && (t = "Something bad happened!");
    "string" != typeof t && (console.error(t), t = t.message);
    return <Container>
            <Col xs={{size: 4, offset: 4}}>
                <h2>VRChat</h2>
                <p>An error has occurred. To continue: </p>
                <p>Press the F5 to refresh the website, or </p>
                <p>Press the back button to leave the website, or </p>
                <p>Check our <a href="https://twitter.com/VRChatNet">twitter</a>? </p>
                <p>Press CTRL+ALT+DEL to restart your computer. If you do this, you will lose any unsaved information in all open applications. </p>
                <code>{r} {t}</code>
            </Col>
        </Container>
};
