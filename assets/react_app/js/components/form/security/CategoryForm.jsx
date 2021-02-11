import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

require("../../../../css/category.css");

const CategoryForm = ({dispatch}) => {
	const [ category, setCategory ] = useState({
		label: "",
	})

    const [ error, setError ] = useState({
		label: "",
		}	
	})

    const [ redirect, setRedirect ] = useState(false)

    const validateForm = () => {
		let bool = true;
		let nextError = {...error}

		if(FormValidator.isEmpty(category.label)) {
			nextError = {...nextError, label: "label non valide"}
			bool = false
		}
		setError(nextError)

		return bool
	}

    

    