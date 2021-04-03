import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CategoryRepository from "../../services/ORM/repository/CategoryRepository"

import { wrapComponent } from 'react-snackbar-alert';
import { CardMembership } from '@material-ui/icons';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import { withStyles, makeStyles } from '@material-ui/core/styles';

require("../../../css/category.css");

const DisplayCategory = ({AuthHandler, update}) => {
	useEffect(() => {
        const init = async () => {
            let res = await CategoryRepository.visualise(AuthHandler.token);
            const newcategories = res.data["hydra:member"];
            setCategories(newcategories);
        }
        init();
    }, [update])

    const [ categories, setCategories ] = useState([]) 

    const useStyles = makeStyles({
        table: {
          minWidth: 200,
          maxWidth: 400,
        },
      });

    const classes = useStyles();

    return (
    	<div>
            <h3>Tableau des catégories</h3>
            <TableContainer component={Paper}> 
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Label</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableCell align="center">
                        {
                        categories.map(category => (
                            <p key={category.id}>{category.label}</p>
                        ))
                        } 
                        </TableCell>
                    </TableBody>
                </Table>
            </TableContainer>           
    	</div>
    )
}

const mapStateToProps = (state) => {
	return state
}

export default connect(mapStateToProps)(DisplayCategory)