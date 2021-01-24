import React from 'react';
import { connect } from 'react-redux';

import AnonymLayout from './AnonymLayout'
import CitizenLayout from './CitizenLayout'
import ModeratorLayout from './ModeratorLayout'
import AdminLayout from './AdminLayout'
import SuperAdminLayout from './SuperAdminLayout'

import TokenManager from '../services/security/TokenManager'

const Layout = ({AuthHandler, children}) => {

	const layoutToDisplay = () => {
		if(AuthHandler.token === null) return (<AnonymLayout />)
		if(TokenManager.isCitizen(AuthHandler.token)) return (<CitizenLayout />)
		if(TokenManager.isModerator(AuthHandler.token)) return (<ModeratorLayout />)
		if(TokenManager.isAdmin(AuthHandler.token)) return (<AdminLayout />)
		if(TokenManager.isSuperAdmin(AuthHandler.token)) return (<SuperAdminLayout />)
	}

	return (
		<div>
			{layoutToDisplay()}
			<div className={AuthHandler.token === null ? "app-body full" : "app-body"}>
				{children}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return state
}

export default connect(mapStateToProps)(Layout);