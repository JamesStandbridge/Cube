import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import CategoryRepository from "../../../services/ORM/repository/CategoryRepository"

import { wrapComponent } from 'react-snackbar-alert';

import styled from 'styled-components'

require("../../../../css/category.css");

const CategoryForm = ({ dispatch, AuthHandler, onCloseModal, refresh}) => {
	const [ category, setCategory ] = useState({
		label: {value: "", error: ""}
	})

	const handleChange = (event) => {
		const value = event.currentTarget.value
		setCategory({...category, label: {...category.label, value, error: ""}})
	}

	const handleSubmit = () => {
		if(validateForm()) {
			const categoryToSend = {
				label: category.label.value
			}

			CategoryRepository.create(categoryToSend, AuthHandler.token).then(res => {
				if(res.status === 201) {
					onCloseModal()
					refresh()
				}
			})
		}
	}

	const validateForm = () => {
		let bool = true

		if(category.label.value.trim().length === 0) {
			bool = false
			setCategory({...category, label: {...category.label, error: "Le label est incorrect"}})
		}

		return bool
	}

	return (
		<div               style={{
                  position: 'absolute', 
                  left: '50%', 
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
              }}>
		  <Container>
          <Title>Ajouter une nouvelle catégorie</Title>
          <FormContainer>
			{
				category.label.error !== "" ? (
					<TextField
						error
						label="Label"
						variant="outlined"
						onChange={handleChange}
						helperText={category.label.error}
						size="small"
					/>
				) : (
					<TextField
						label="Label"
						variant="outlined"
						onChange={handleChange}
						size="small"
					/>
				)
			}

			<Button
				onClick={handleSubmit}
				color='primary'
				variant="contained"
			>
				Confirmer
			</Button>

			</FormContainer>    
          </Container>
		</div>
	)
}

const mapStateToProps = (state) => {
	return state
}

export default connect(mapStateToProps)(CategoryForm)

const Title = styled.h3`
`

const FormContainer = styled.div`
	
`

const Container = styled.div`
	background-color: white;
	padding: 12px 24px;
	width: 100%;
	box-shadow: 0 0 6px 2px rgba(0,0,0,.1);
	border-bottom: 2px solid transparent;
	margin: 1%;
`

    