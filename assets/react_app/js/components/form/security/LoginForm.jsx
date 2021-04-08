/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

import React, { useState } from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import SecurityRepository from '../../../services/ORM/repository/SecurityRepository'

import TokenManager from '../../../services/security/TokenManager'
import FormValidator from '../../../services/validator/FormValidator'

//material-ui
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

require("../../../../css/login.css");

const LoginForm = ({dispatch}) => {

	const [ credentials, setCredentials ] = useState({
		email: {value: "", error:""},
		password: {value: "", error:""}
	})

	const [ redirect, setRedirect ] = useState(null)

	const handleChange = ({currentTarget}) => {
		const nextValue = {value: currentTarget.value, error: ""}
		setCredentials({...credentials, [currentTarget.name]: nextValue})
	}

	const validateForm = () => {
		let bool = true;
		let nextCredentials = {...credentials}

		if(!FormValidator.isValidEmail(credentials.email.value)) {
			nextCredentials = {...nextCredentials, email: {...credentials.email, error: "Email incorrect"}}
			bool = false
		}
		if(FormValidator.isEmpty(credentials.password.value)) {
			nextCredentials = {...nextCredentials, password: {...credentials.password, error: "Mot de passe obligatoire"}}
			bool = false
		}

		setCredentials(nextCredentials)
		return bool
	}

	const handleSubmit = () => {
		if(validateForm()) {
			SecurityRepository.getToken({
				username: credentials.email.value,
				password: credentials.password.value
			}).then(token => {
				if(token) {
					SecurityRepository.getUser(token).then(user => {
						const auth = {
							token,
							user: {
								id: user.id,
								username: user.username,
								firstname: user.firstname,
								lastname: user.lastname,
								role: TokenManager.getRole(token),
								email: user.email
							}
						}

						dispatch({type: "SET_AUTH", auth});
						setRedirect(TokenManager.getRole(token));
					})
				}
			}).catch(error => {
				setCredentials({...credentials,
					password: {...credentials.password, value: "", error:" Email ou mot de passe incorrect"},
					email: {...credentials.email, value: "", error: " "}
				})
			})
		}
	}

	if(redirect !== null) {
		if(redirect === "ROLE_CITIZEN") {
			return (<Redirect to="/dashboard" />)
		} else if (redirect === "ROLE_MODERATOR") {
			return (<Redirect to="/moderation/resources" />)
		} else if (redirect === "ROLE_ADMIN") {
			return (<Redirect to="/admin/dashboard" />)
		} else if (redirect === "ROLE_SUPER_ADMIN") {
			return (<Redirect to="/dashboard" />)
		}
	}

	return (
		<FormContainer> 
	        <TextField				
				label="Email"
				className="form-field email"
				type="email"
				variant="outlined"
				name="email"
				value={credentials.email.value}
				onChange={handleChange}
				error={credentials.email.error !== ""}
				helperText={credentials.email.error !== "" ? credentials.email.error : ""}
				required
			/>

	        <TextField				
	       		className="form-field password"
				label="Mot de passe"
				variant="outlined"
				type="password"
          		autoComplete="current-password"
          		name="password"
          		value={credentials.password.value}
          		onChange={handleChange}
          		error={credentials.password.error !== ""}
          		helperText={credentials.password.error !== "" ? credentials.password.error : ""}
          		required
			/>

			<Button 
				className="btn btn-success btn-confirm" 
				variant="contained" 
				onClick={handleSubmit}
				style={{
					backgroundColor: "#577590",
					color: "white",
					marginTop: "50px",
					height: "56px",
					fontSize: "25px"
				}}
			>
				Confirmer
			</Button>
		</FormContainer>
	)
}

const mapStateToProps = (state) => {
	return state
}

export default connect(mapStateToProps)(LoginForm);

const FormContainer = styled.div`
	margin-left: 27.5%;
    width: 50%;
`