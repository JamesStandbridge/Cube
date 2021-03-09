import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"
import styled from 'styled-components'
import SearchUser from '../../customFields/UserSearch'
import RelationSelect from '../../customFields/RelationSelect'
import {
	Button,
	FormHelperText
} from '@material-ui/core'

import RelationRepository from '../../../services/ORM/repository/RelationRepository'

const RelationShipForm = ({AuthHandler}) => {
	const [relation, setRelation] = useState({
		type_id: null,
		user_id: null
	})

	const [ error, setError ] = useState("")

	const handleUserChange = (user_id) => {
		setRelation({...relation, user_id})
		setError("")
	}

	const handleRelationChange = (type_id) => {
		setRelation({...relation, type_id})
		setError("")
	}

	const handleSubmit = () => {
		if(isValid()) {
			console.log('submit')
			RelationRepository.createRelation(
				relation,
				AuthHandler.token
			).then(res => {
				console.log(res)
			})
		}
	}

	const isValid = () => {
		if(!relation.type_id || !relation.user_id) {
			setError("Veuillez remplir tout les champs")
			return false
		}
		return true
	}

	return (
		<Container>

			<Title>Ajouter une nouvelle relation</Title>
			<FormContainer>
				<SearchUser onChange={handleUserChange} />
				<RelationSelect onChange={handleRelationChange} />
				<div style={{display: "flex", marginTop: "20px"}}>
					{error !== "" ? (<FormHelperText error>{error}</FormHelperText>) : (null)}
					<Button 
						variant="contained" 
						onClick={handleSubmit}
						style={{marginLeft: 'auto', color: 'white', backgroundColor: '#50bd50'}}
					>
						Ajouter
					</Button>
				</div>
			</FormContainer>
		</Container>
	)
}

const mapStateToProps = (state) => {
	return state
}

export default connect(mapStateToProps)(RelationShipForm);

const Title = styled.h3`
`

const FormContainer = styled.div`
	
`

const Container = styled.div`
	background-color: white;
	padding: 12px 24px;
	width: 40%;
	box-shadow: 0 0 6px 2px rgba(0,0,0,.1);
	border-bottom: 2px solid transparent;
	margin: 1%;
`