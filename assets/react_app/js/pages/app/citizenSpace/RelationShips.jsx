/**
 * author: JamesStandbridge
 * date: 09/03/2021
 */

import React, { useState } from 'react';
import Dashboard from '../../../components/stats/Dashboard'
import Layout from '../../../views/Layout'

import RelationShipForm from '../../../components/form/app/RelationShipForm'
import RelationTable from '../../../components/display/front/relation/RelationTable'

const RelationShip = (props) => {
	const [ refresh, setRefresh ] = useState(1)
	return (
		<Layout>
			
			<RelationTable refresh={refresh}/>
			<RelationShipForm onRefresh={() => setRefresh(refresh+1)}/>
		</Layout>
	)
}

export default RelationShip;