/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';

import CitizenRoute from "./components/router/CitizenRoute";

import { HashRouter, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

import Register from "./pages/security/Register"
import Login from "./pages/security/Login"

import Welcome from "./pages/app/Welcome"

const Router = ({ AuthHandler }) => {

	return (
		<HashRouter>		
			<Switch>
				<Route path="/register" component={Register} />
				<Route path="/login" component={Login} />
				<Route path="/" component={Welcome} />
			</Switch>
		</HashRouter>
	);
}

const mapStateToProps = (state) => {
	return state
}

export default connect(mapStateToProps)(Router);
