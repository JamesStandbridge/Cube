import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import MainInformations from './components/MainInformations'


const ProfileView = ({user}) => {
	return (
		<Container>
			<MainInformations user={user} />
		</Container>
	)
}

export default ProfileView;

const Container = styled.div`
	background-color: white;
	padding: 1% 3%;
	height: 700px;
	margin-top: 30px;
`