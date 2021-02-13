import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import CategoryRepository from "../../../services/ORM/repository/CategoryRepository"

import { wrapComponent } from 'react-snackbar-alert';

require("../../../../css/category.css");

const CategoryForm = ({ dispatch, AuthHandler}) => {
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
		<div>
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
		</div>
	)
}

const mapStateToProps = (state) => {
	return state
}

export default connect(mapStateToProps)(CategoryForm)

    

    