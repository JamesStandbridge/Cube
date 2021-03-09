import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import WelcomeBlock from './components/WelcomeBlock'
import ViewsChart from './components/ViewsChart'

const Dashboard = (props) => {
	return (
		<ContainerFluid>
			<WelcomeBlock />
			<ViewsChart />
		</ContainerFluid>
	)
}

export default Dashboard;


const ContainerFluid = styled.div`
	padding: 1%;
`