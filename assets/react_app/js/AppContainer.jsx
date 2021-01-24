import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";

class App extends React.Component {
    componentDidMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            console.log("on route change");
        });
    }
    componentWillUnmount() {
        this.unlisten();
    }
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}
export default withRouter(App);