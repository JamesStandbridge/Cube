import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CategoryRepository from "../../services/ORM/repository/CategoryRepository"

import { wrapComponent } from 'react-snackbar-alert';
import { CardMembership } from '@material-ui/icons';

require("../../../css/category.css");

const DisplayCategory = ({AuthHandler}) => {
	useEffect(() => {
        const init = async () => {
            let res = await CategoryRepository.visualise(AuthHandler.token);
            const newcategories = res.data["hydra:member"];
            setCategories(newcategories);
        }
        init();
    }, [])

    const [ categories, setCategories ] = useState([]) 

    

    return (
    	<div>
            <p>CATEGORIE</p>
            {
                categories.map(category => (
                    <p key={category.id}>{category.label}</p>

                ))
            }
    	</div>
    )
}

const mapStateToProps = (state) => {
	return state
}

export default connect(mapStateToProps)(DisplayCategory)