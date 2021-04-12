import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import AppContainer from './AppContainer';

import Register from "./pages/security/Register"
import Login from "./pages/security/Login"

import DashboardCitizen from "./pages/app/citizenSpace/DashboardCitizen"
import ResourceTemplate from "./pages/app/front/resourceTemplate"

import CreateCategory from "./pages/app/adminSpace/category/CreateCategory"
import VisualiseCategory from "./pages/app/adminSpace/category/VisualiseCategory"
import UserAdmin from "./pages/app/adminSpace/admin/UserAdmin"
import DashboardAdmin from "./pages/app/adminSpace/admin/DashboardAdmin"
import RelationShips from "./pages/app/citizenSpace/RelationShips"
import CreateResource from "./pages/app/citizenSpace/resourceManagement/CreateResource"
import MyResources from "./pages/app/citizenSpace/resourceManagement/MyResources"
import UpdateResource from "./pages/app/citizenSpace/resourceManagement/UpdateResource";
import Home from "./pages/app/front/home"
import Profile from "./pages/app/Profile"

//moderator
import ModerateResources from "./pages/app/moderatorSpace/ModerateResources"

//routes
import CitizenRoute from "./components/router/CitizenRoute";
import ModeratorRoute from "./components/router/ModeratorRoute";
import AdminRoute from "./components/router/AdminRoute";
import SuperAdminRoute from "./components/router/SuperAdminRoute";

import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

import ResourceStateRepository from './services/ORM/repository/ResourceStateRepository'
import MediaUploader from "./pages/app/citizenSpace/resourceManagement/mediaUploader";

const Router = ({AuthHandler, dispatch, ResourceUserStateHandler}) => {

	useEffect(() => {
		const fetchData = async () => {
			const res = await ResourceStateRepository.getStates(AuthHandler.token)
			dispatch({type: "REPLACE_STATES", resourceStates: res.data.resourceStates})
		}
		if(AuthHandler.token != null && !ResourceUserStateHandler.isUpdated) fetchData()
	}, [ResourceUserStateHandler.isUpdated])


	return (
		<BrowserRouter>	
			<AppContainer>		
				<Switch>
					<AdminRoute path="/categories/creer" component={CreateCategory} />
					<AdminRoute path="/categories/visualise" component={VisualiseCategory} />
					<AdminRoute path="/admin/utilisateur" component={UserAdmin} />
					<AdminRoute path="/admin/dashboard" component={DashboardAdmin} />

					<CitizenRoute path="/ressources/nouveau" component={CreateResource} />
					<CitizenRoute path="/ressources/:id/modifier" component={UpdateResource} />
					<CitizenRoute path="/ressources/:id/delete" component={null} />
					<CitizenRoute path={"/media/nouveau"} component={MediaUploader}/>
					<CitizenRoute path="/relations" component={RelationShips} />
					<CitizenRoute path="/mesRessources" component={MyResources} />
					<CitizenRoute path="/dashboard" component={DashboardCitizen} />
					<CitizenRoute path="/profil" component={Profile} />
					<ModeratorRoute path="/moderation/commentaires" component={null} />
					<ModeratorRoute path="/moderation/resources" component={ModerateResources} />

					<Route path="/catalogue/:id" component={ResourceTemplate}/>
					<Route path="/register" component={Register} />
					<Route path="/login" component={Login} />
					<Route path="/" component={Home} />
				</Switch>
			</AppContainer>
		</BrowserRouter>	
	)
}
	
const mapStateToProps = (state) => {
	return state
}

export default connect(mapStateToProps)(Router);