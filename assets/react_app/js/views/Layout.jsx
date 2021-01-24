import React from 'react';
import { connect } from 'react-redux';

import AnonymLayout from './AnonymLayout'
import CitizenLayout from './CitizenLayout'
import ModeratorLayout from './ModeratorLayout'
import AdminLayout from './AdminLayout'
import SuperAdminLayout from './SuperAdminLayout'

import TokenManager from '../services/security/TokenManager'

const Layout = ({dispatch, AuthHandler, children}) => {

	const handleDisconnect = () => {
		dispatch({type: 'RESET_AUTH'});
	}

	const layoutToDisplay = () => {
		if(AuthHandler.token === null) return (<AnonymLayout />)
		if(TokenManager.isCitizen(AuthHandler.token)) return (<CitizenLayout onDisconnect={handleDisconnect}/>)
		if(TokenManager.isModerator(AuthHandler.token)) return (<ModeratorLayout onDisconnect={handleDisconnect}/>)
		if(TokenManager.isAdmin(AuthHandler.token)) return (<AdminLayout onDisconnect={handleDisconnect}/>)
		if(TokenManager.isSuperAdmin(AuthHandler.token)) return (<SuperAdminLayout onDisconnect={handleDisconnect}/>)
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