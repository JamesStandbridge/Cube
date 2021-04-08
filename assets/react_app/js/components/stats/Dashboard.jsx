import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import WelcomeBlock from './components/WelcomeBlock'
import ViewsChart from './components/ViewsChart'

import StatsRepository from '../../services/ORM/repository/StatsRepository'

const Dashboard = ({AuthHandler}) => {
	const [ resourcesSerie, setResourcesSerie ] = useState([])

	useEffect(() => {
		const fetchResourceSerie = async () => {
			const result = await StatsRepository.getUserResourceStats(AuthHandler.token)
			setResourcesSerie(result.data.serie)
			console.log(result)
		}

		fetchResourceSerie()
	}, [])

	return (
		<ContainerFluid>
			<WelcomeBlock />
			<ViewsChart resourcesSerie={resourcesSerie} />
		</ContainerFluid>
	)
}

const mapStateToProps = (state) => {
	return state
}

export default connect(mapStateToProps)(Dashboard);


const ContainerFluid = styled.div`
	padding: 1%;
`