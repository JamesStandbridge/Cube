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

import { SnackbarProvider } from 'react-snackbar-alert';

import Register from "./pages/security/Register"
import Login from "./pages/security/Login"

import Welcome from "./pages/app/Welcome"
import Resources from "./pages/app/Resources"

import CreateCategory from "./pages/app/CreateCategory"
import VisualiseCategory from "./pages/app/VisualiseCategory"
import CreateResource from "./pages/app/resource/CreateResource";
import MyResources from "./pages/app/resource/MyResources";


require("../css/main.css");

const CubeApp = () => {
	return (
		<BrowserRouter>	
			<Provider store={ Store }>	
				<SnackbarProvider position="top-right">
					<AppContainer>		
						<Switch>
							<AdminRoute path="/categories/creer" component={CreateCategory} />
							<AdminRoute path="/categories/visualise" component={VisualiseCategory} />
							<CitizenRoute path="/profil/relations" component={null} />
							<CitizenRoute path="/profil/ressources/nouveau" component={CreateResource} />
							<CitizenRoute path="/profil/ressources" component={MyResources} />
							<ModeratorRoute path="/moderation/commentaires" component={null} />
							<ModeratorRoute path="/moderation/resources" component={null} />
							<Route path="/catalogue" component={Resources} />
							<Route path="/register" component={Register} />
							<Route path="/login" component={Login} />
							<Route path="/" component={Welcome} />
						</Switch>
					</AppContainer>
				</SnackbarProvider>
			</Provider>
		</BrowserRouter>
	);	
}

const rootElement = document.getElementById("root");
ReactDOM.render(<CubeApp />, rootElement);