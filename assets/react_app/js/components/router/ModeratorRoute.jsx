/**
 * author: JamesStandbridge
 * date: 24/01/2021
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from "react-router-dom";

import TokenManager from "../../services/security/TokenManager"

const ModeratorRoute = ({path, component, AuthHandler, dispatch}) => {
	const token = AuthHandler.token;
  	return (
  		<>

		{
			TokenManager.isModerator(token) ? (
				<Route path={path} component={component} />
			) : (
				<Redirect to="/login" />
			)
		}
		</>
	)
}

const mapStateToProps = (state) => {
	return state
}

export default connect(mapStateToProps)(ModeratorRoute);
