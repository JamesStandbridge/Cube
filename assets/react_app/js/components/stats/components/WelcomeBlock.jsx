import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';

const WelcomeBlock = ({AuthHandler}) => {
	const user = AuthHandler.user

	return (
		<Container>
			
			<Typography style={{marginBottom: "0"}} variant="h4" gutterBottom>
				{`Bienvenue ${user.firstname} ${user.lastname}`}
			</Typography>

		</Container>
	)
}

const mapStateToProps = (state) => {
	return state
}

export default connect(mapStateToProps)(WelcomeBlock);

const Container = styled.div`
	background-color: white;
	width: 50%;
	padding: 12px 24px;
	box-shadow: 0 0 6px 2px rgba(0,0,0,.1);
	 border-bottom: 2px solid transparent;

`
