/**
 * author: JamesStandbridge
 * date: 09/03/2021
 */

import React from 'react';
import Dashboard from '../../../components/stats/Dashboard'
import Layout from '../../../views/Layout'

import ResourcesList from '../../../components/display/Moderation/Resources'

const ModerateResources = (props) => {
	return (
		<Layout>
			 <ResourcesList />
		</Layout>
	)
}

export default ModerateResources;