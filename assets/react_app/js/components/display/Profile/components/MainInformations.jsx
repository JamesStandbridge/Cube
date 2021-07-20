import React from 'react'
import styled from 'styled-components'


const MainInformations = ({user}) => {

	console.log(user)

	return (
		<Container>
			<Name>{`${user.firstname} ${user.lastname}`}</Name>
			<Email>{`${user.email}`}</Email>
		</Container>
	)
}

export default MainInformations;

const Container = styled.div`
	display: flex;
	align-items: center;
`

const Name = styled.h2`

`

const Email = styled.h4`
	margin-left: 20px;
`