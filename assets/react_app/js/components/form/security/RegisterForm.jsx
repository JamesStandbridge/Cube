/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import SecurityRepository from '../../../services/ORM/repository/SecurityRepository'

import TokenManager from '../../../services/security/TokenManager'
import FormValidator from '../../../services/validator/FormValidator'

//material-ui
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

require("../../../../css/register.css");

const RegisterForm = ({dispatch}) => {
	const [ user, setUser ] = useState({
		password: "",
		confirmPassword: "",
		email: "",
		lastname: "",
		firstname: "",

		address: {
			street: "",
			city: "",
			cp: ""
		}
	})

	const [ error, setError ] = useState({
		password: "",
		confirmPassword: "",
		email: "",
		lastname: "",
		firstname: "",
		address: {
			street: "",
			city: "",
			cp: ""
		}	
	})

	const [ redirect, setRedirect ] = useState(false)

	const validateForm = () => {
		let bool = true;
		let nextError = {...error}

		if(!FormValidator.isPasswordStrong(user.password)) {
			nextError = {...nextError, password: "8 caractères minimum, un caractère spécial, un chiffre"}
			bool = false
		}
		if(user.password !== user.confirmPassword) {
			nextError = {...nextError, confirmPassword: "Les mots de passe sont différents"}
			bool = false
		}
		if(!FormValidator.isValidEmail(user.email)) {
			nextError = {...nextError, email: "email incorrect"}
			bool = false
		}
		if(FormValidator.isEmpty(user.firstname)) {
			nextError = {...nextError, firstname: "prénom incorrect"}
			bool = false
		}
		if(FormValidator.isEmpty(user.lastname)) {
			nextError = {...nextError, lastname: "nom incorrect"}
			bool = false
		}
		let address = {...error.address}
		if(FormValidator.isEmpty(user.address.street)) {
			address = {...address, street: 'rue incorrect'}
			nextError = {...nextError, address}
			bool = false
		}
		if(FormValidator.isEmpty(user.address.city)) {
			address = {...address, city: 'ville incorrect'}
			nextError = {...nextError, address}
			bool = false
		}
		if(FormValidator.isEmpty(user.address.cp)) {
			address = {...address, cp: 'code postal incorrect'}
			nextError = {...nextError, address}
			bool = false
		}
		setError(nextError)

		return bool
	}

	const handleSubmit = () => {
		if(validateForm()) {
			SecurityRepository.register(user).then(status => {
				if(status === 200) {
					SecurityRepository.getToken({
						username: user.email,
						password: user.password
					}).then(token => {
						const auth = {
							token,
							user: {
								firstname: user.firstname,
								lastname: user.lastname,
								role: TokenManager.getRole(token),
								email: user.email
							}
						}

						dispatch({type: "SET_AUTH", auth});
						setRedirect(true);				
					})
				}
			})
		}
	}

	const handleChange = ({currentTarget}) => {
		setUser({...user, [currentTarget.name]: currentTarget.value})
		setError({...error, [currentTarget.name]: ""})
	}

	const handleAddressChange = ({currentTarget}) => {
		if(currentTarget.name === "cp" && currentTarget.value.length === 6) return  
		const address = {...user.address, [currentTarget.name]: currentTarget.value}
		const nextError = {...error.address, [currentTarget.name]: ""}
		setUser({...user, address })
		setError({...error, address: nextError})
	}

	if(redirect) {
		return (<Redirect to="/" />)
	}

	return (
		<form className="form form-register">
		        <TextField				
					label="Email"
					className="form-field email"
					type="email"
					variant="outlined"
					name="email"
					size="small"
					value={user.email}
					onChange={handleChange}
					error={error.email !== ""}
					helperText={error.email !== "" ? error.email : ""}
					required
				/>

		        <TextField				
		        	className="form-field firstname"	
					label="Prénom"
					variant="outlined"
					size="small"
					name="firstname"
					value={user.firstname}
					onChange={handleChange}
					error={error.firstname !== ""}
					helperText={error.firstname !== "" ? error.firstname : ""}
					required
				/>

		        <TextField		
		        	className="form-field lastname"		
					label="Nom"
					variant="outlined"
					size="small"
					name="lastname"
					value={user.lastname}
					onChange={handleChange}
					error={error.lastname !== ""}
					helperText={error.lastname !== "" ? error.lastname : ""}
					required
				/>

		        <TextField				
		       		className="form-field password"
					label="Mot de passe"
					variant="outlined"
					size="small"
					type="password"
	          		autoComplete="current-password"
	          		name="password"
	          		value={user.password}
	          		onChange={handleChange}
	          		error={error.password !== ""}
	          		helperText={error.password !== "" ? error.password : ""}
	          		required
				/>

		        <TextField				
		        	className="form-field confirm-password"
					label="Confirmer mot de passe"
					variant="outlined"
					size="small"
					type="password"
	          		autoComplete="current-password"
	          		name="confirmPassword"
	          		value={user.confirmPassword}
	          		onChange={handleChange}
	          		error={error.confirmPassword !== ""}
	          		helperText={error.confirmPassword !== "" ? error.confirmPassword : ""}
	          		required
				/>

		        <TextField		
		        	className="form-field street"		
					label="Rue"
					variant="outlined"
					size="small"
					name="street"
					value={user.address.street}
					onChange={handleAddressChange}
					error={error.address.street !== ""}
					helperText={error.address.street !== "" ? error.address.street : ""}
					required
				/>

		        <TextField					
		        	className="form-field city"
					label="Ville"
					variant="outlined"
					size="small"
					name="city"
					value={user.address.city}
					onChange={handleAddressChange}
					error={error.address.city !== ""}
					helperText={error.address.city !== "" ? error.address.city : ""}
					required
				/>

		        <TextField
		        	className="form-field cp"
					label="Code postal"
					variant="outlined"
					size="small"
					name="cp"
					value={user.address.cp}
					onChange={handleAddressChange}
					error={error.address.cp !== ""}
					helperText={error.address.cp !== "" ? error.address.cp : ""}
					type="number"
					onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
					required
				/>

			<Button className="btn btn-success btn-confirm" variant="contained" onClick={handleSubmit}>
				Confirmer
			</Button>
		</form>
	)
}

const mapStateToProps = (state) => {
	return state
}

export default connect(mapStateToProps)(RegisterForm);