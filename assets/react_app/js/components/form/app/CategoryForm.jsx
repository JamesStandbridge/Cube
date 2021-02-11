import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

require("../../../../css/category.css");

const CategoryForm = ({dispatch}) => {
	const [ category, setCategory ] = useState({
		label: {value: "", error: ""}
	})

    const handleChange = (event) => {
    	const value = event.currentTarget.value

 		setCategory({...category, label: {...category.label, value}})
    }

    const handleSubmit = () => {
    	//valider le formulaire
    	if(validateForm()) {
    		console.log("je poste")
    	}
    	//optionnel tu formate les données
    	//post
    }

    const validateForm = () => {
    	let bool = true

    	if(category.label.value.trim().length === 0) {
    		console.log('ici')
    		bool = false
    		setCategory({...category, label: {...category.label, error: "Le label est incorrect"}})
    	}

    	return bool
    }

    return (
    	<div>

    		{
    			category.label.error !== "" ? (
    				<p>{category.label.error}</p>
    			) : (
    				null
    			)
    		}

    		<input 
    			onChange={handleChange}
    		/>

    		<button
    			onClick={handleSubmit}
    		>
    			Confirmer
    		</button>
    	</div>
    )
}

export default CategoryForm

    

    