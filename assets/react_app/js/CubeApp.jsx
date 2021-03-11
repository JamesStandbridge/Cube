/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import Store from './store/configureStore';
import AppContainer from './AppContainer';
import 'fontsource-roboto';

//routes
import CitizenRoute from "./components/router/CitizenRoute";
import ModeratorRoute from "./components/router/ModeratorRoute";
import AdminRoute from "./components/router/AdminRoute";
import SuperAdminRoute from "./components/router/SuperAdminRoute";

import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

import { SnackbarProvider } from 'react-snackbar-alert';

import Register from "./pages/security/Register"
import Login from "./pages/security/Login"

import DashboardCitizen from "./pages/app/citizenSpace/DashboardCitizen"
import ResourceTemplate from "./pages/app/front/resourceTemplate"

import CreateCategory from "./pages/app/adminSpace/category/CreateCategory"
import VisualiseCategory from "./pages/app/adminSpace/category/VisualiseCategory"
import RelationShips from "./pages/app/citizenSpace/RelationShips"
import CreateResource from "./pages/app/citizenSpace/resourceManagement/CreateResource"
import MyResources from "./pages/app/citizenSpace/resourceManagement/MyResources"
import Home from "./pages/app/front/home"


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

							<CitizenRoute path="/profil/relations" component={RelationShips} />
							<CitizenRoute path="/profil/ressources/nouveau" component={CreateResource} />
							<CitizenRoute path="/profil/ressources" component={MyResources} />
							<CitizenRoute path="/profil" component={DashboardCitizen} />

							<ModeratorRoute path="/moderation/commentaires" component={null} />
							<ModeratorRoute path="/moderation/resources" component={null} />

							<Route path="/catalogue/:id" component={ResourceTemplate}/>
							<Route path="/register" component={Register} />
							<Route path="/login" component={Login} />
							<Route path="/" component={Home} />
						</Switch>
					</AppContainer>
				</SnackbarProvider>
			</Provider>
		</BrowserRouter>
	);	
}

const rootElement = document.getElementById("root");
ReactDOM.render(<CubeApp />, rootElement);