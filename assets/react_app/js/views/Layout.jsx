import React, { useState } from 'react';
import { connect } from 'react-redux';

import AnonymLayout from './AnonymLayout'
import CitizenLayout from './CitizenLayout'
import ModeratorLayout from './ModeratorLayout'
import AdminLayout from './AdminLayout'
import SuperAdminLayout from './SuperAdminLayout'

import TokenManager from '../services/security/TokenManager'

const Layout = ({dispatch, AuthHandler, children}) => {
	const [ isCollapsed, collapse] = useState(false)

	const handleDisconnect = () => {
		dispatch({type: 'RESET_STATES'})
		dispatch({type: 'RESET_AUTH'});
		
	}

	const handleCollapse = () => {
		collapse(!isCollapsed)
	}

	const layoutToDisplay = () => {
		if(AuthHandler.token === null) return (<AnonymLayout />)
		if(TokenManager.isCitizen(AuthHandler.token)) return (<CitizenLayout collapse={handleCollapse} isCollapsed={isCollapsed} onDisconnect={handleDisconnect}/>)
		if(TokenManager.isModerator(AuthHandler.token)) return (<ModeratorLayout collapse={handleCollapse} isCollapsed={isCollapsed} onDisconnect={handleDisconnect}/>)
		if(TokenManager.isAdmin(AuthHandler.token)) return (<AdminLayout collapse={handleCollapse} isCollapsed={isCollapsed} onDisconnect={handleDisconnect}/>)
		if(TokenManager.isSuperAdmin(AuthHandler.token)) return (<SuperAdminLayout collapse={handleCollapse} isCollapsed={isCollapsed} onDisconnect={handleDisconnect}/>)
	}
	
	const bodyClassName = () => {
		if(AuthHandler.token === null) return "app-body-full"
		if(isCollapsed) return "app-body-collapse"
		return "app-body"
	}

	return (
		<>
			{layoutToDisplay()}
			<div className={bodyClassName()}>
				{children}
			</div>
		</>
	)
}

const mapStateToProps = (state) => {
	return state
}

export default connect(mapStateToProps)(Layout);