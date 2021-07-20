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

const RelationShipForm = ({AuthHandler, onRefresh}) => {
	const [relation, setRelation] = useState({
		type: "",
		user: ""
	})

	const [ error, setError ] = useState("")

	const handleUserChange = (user) => {
		setRelation({...relation, user})
		setError("")
	}

	const handleRelationChange = (type) => {
		setRelation({...relation, type})
		setError("")
	}

	const handleSubmit = () => {
		if(isValid()) {
			RelationRepository.createRelation(
				{type_id: relation.type.value, user_id: relation.user.value},
				AuthHandler.token
			).then(res => {
				if(res.status === 200) {
					setRelation({type: "", user: ""})
					onRefresh()
				}
			})
		}
	}

	const isValid = () => {
		if(relation.type === "" || relation.user === "") {
			setError("Veuillez saisir tous les champs")
			return false
		}
		return true
	}

	return (
		<Container>
			<Title>Ajouter une nouvelle relation</Title>
			<FormContainer>
				<SearchUser value={relation.user} onChange={handleUserChange} />
				<RelationSelect value={relation.type} onChange={handleRelationChange} />
				<div style={{display: "flex", marginTop: "20px"}}>
					{error !== "" ? (<FormHelperText error>{error}</FormHelperText>) : (null)}
					<Button 
						variant="contained" 
						onClick={handleSubmit}
						style={{marginLeft: 'auto', color: 'white', backgroundColor: '#577590'}}
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
    margin-top: 8%;
    margin-left: 28%;
    margin-bottom: 10%;
`