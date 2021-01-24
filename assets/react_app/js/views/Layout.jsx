import React from 'react';
import { connect } from 'react-redux';

import AnonymLayout from './AnonymLayout'
import CitizenLayout from './CitizenLayout'

import TokenManager from '../services/security/TokenManager'

const Layout = ({AuthHandler, children}) => {

	const layoutToDisplay = () => {
		if(AuthHandler.token === null) return (<AnonymLayout />)
		if(TokenManager.isCitizen(AuthHandler.token)) return (<CitizenLayout />)
	}

	return (
		<div>
			{layoutToDisplay()}
			<div className="app-body">
				{children}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return state
}

export default connect(mapStateToProps)(Layout);