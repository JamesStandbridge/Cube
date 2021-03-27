import React from 'react';
import { connect } from 'react-redux'
import Layout from '../../views/Layout'

import ProfileView from '../../components/display/Profile/ProfileView'

const Profile = ({AuthHandler}) => {
	return (
		<Layout>
			<ProfileView user={AuthHandler.user} />
		</Layout>
	)
}

const mapStateToProps = (state) => {
	return state
}

export default connect(mapStateToProps)(Profile);