/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import Store from './store/configureStore';
import AppContainer from './AppContainer';

//routes
import CitizenRoute from "./components/router/CitizenRoute";
import ModeratorRoute from "./components/router/ModeratorRoute";
import AdminRoute from "./components/router/AdminRoute";
import SuperAdminRoute from "./components/router/SuperAdminRoute";

import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

import Register from "./pages/security/Register"
import Login from "./pages/security/Login"

import Welcome from "./pages/app/Welcome"
import Resources from "./pages/app/Resources"

require("../css/main.css");

const CubeApp = () => {
	return (
		<BrowserRouter>	
			<Provider store={ Store }>	
				<AppContainer>		
					<Switch>
						<CitizenRoute path="/profil/relations" component={null} />
						<CitizenRoute path="/profil/ressources" component={null} />
						<ModeratorRoute path="/moderation/commentaires" component={null} />
						<ModeratorRoute path="/moderation/resources" component={null} />
						<Route path="/catalogue" component={Resources} />
						<Route path="/register" component={Register} />
						<Route path="/login" component={Login} />
						<Route path="/" component={Welcome} />
					</Switch>
				</AppContainer>
			</Provider>
		</BrowserRouter>
	);	
}

const rootElement = document.getElementById("root");
ReactDOM.render(<CubeApp />, rootElement);