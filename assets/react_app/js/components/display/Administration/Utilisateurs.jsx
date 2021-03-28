import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { format } from "date-fns";

import { Link, Redirect } from "react-router-dom";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MUILink from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

import UtilisateursRepository from '../../../services/ORM/repository/UtilisateursRepository'

const Utilisateurs = ({AuthHandler}) => {
   
	const [ utilisateurs, setUtilisateurs ] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const res = await UtilisateursRepository.getUtilisateurList(AuthHandler.token)
			setUtilisateurs(res.data["hydra:member"])
		}

		fetchData()
	} ,[])

    const handleChangeActivationCompte = (userID) => {
        UtilisateursRepository.updateUserEnabled(userID, AuthHandler.token)
        
    }

    
    
	console.log(utilisateurs)

	return (
		<div>            
			<TableContainer component={Paper}>
                <Table  size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Nom</TableCell>
                            <TableCell align="right">Prenom</TableCell>
                            <TableCell align="right">Username</TableCell>
                            <TableCell align="right">Actif</TableCell>
                            <TableCell align="right">Moderer</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {utilisateurs.map(utilisateur => {
                            return (
                                <TableRow key={utilisateur.id}>
                                    <TableCell component="th" scope="row">{utilisateur.id}</TableCell>
                                    <TableCell align="right">{utilisateur.lastname}</TableCell>
                                    <TableCell align="right">{utilisateur.firstname}</TableCell>
                                    <TableCell align="right">{utilisateur.username}</TableCell>
                                    <TableCell align="right">{utilisateur.enabled ? 'Actif' : 'Inactif'}</TableCell>
                                    <TableCell align="right" style={{cursor: "pointer"}}>
                                            <Button onClick={() => {handleChangeActivationCompte}} variant="outlined">désactiver</Button>
                                    </TableCell>               
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
		</div>
	)
}


const mapStateToProps = (state) => {
	return state
}

export default connect(mapStateToProps)(Utilisateurs);