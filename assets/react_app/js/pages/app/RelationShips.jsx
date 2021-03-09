/**
 * author: JamesStandbridge
 * date: 09/03/2021
 */

import React from 'react';
import Dashboard from '../../components/stats/Dashboard'
import Layout from '../../views/Layout'

import RelationShipForm from '../../components/form/app/RelationShipForm'

const RelationShip = (props) => {
	return (
		<Layout>
			<RelationShipForm />
		</Layout>
	)
}

export default RelationShip;