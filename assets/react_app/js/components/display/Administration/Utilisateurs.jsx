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
import Chip from '@material-ui/core/Chip';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import UtilisateursRepository from '../../../services/ORM/repository/UtilisateursRepository'

const Utilisateurs = ({AuthHandler, dispatch, UserListHandler}) => {

    const utilisateurs = UserListHandler.list

    const fetchUsers = async () => {
        const res = await UtilisateursRepository.getUtilisateurList(AuthHandler.token)
        
        dispatch({
            type: "REPLACE_USER_LIST",
            list: res.data["hydra:member"]
        })
    }

	useEffect(() => {
        if(UserListHandler.isUpdated === false || UserListHandler.list.length === 0) {
            fetchUsers()
        }
	}, [UserListHandler.isUpdated])

    const handleChangeActivationCompte = (userID) => {
        UtilisateursRepository.updateUserEnabled(userID, AuthHandler.token)
        dispatch({type: "RESET_UPDATE_USER_LIST"})
    }

    
    
	console.log(utilisateurs)

	return (
		<div>  
            <h3>Tableau des citoyens</h3>          
			<TableContainer component={Paper}>
                <Table  size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Nom</TableCell>
                            <TableCell align="right">Prenom</TableCell>
                            <TableCell align="right">Username</TableCell>
                            <TableCell align="right">Statut</TableCell>
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
                                    <TableCell align="right">

                                    {utilisateur.enabled ? (
                                        <Chip
                                            variant="outlined"
                                            size="small"
                                            label="Désactiver"
                                            onClick={() => handleChangeActivationCompte(utilisateur.id)}
                                            icon={<PowerSettingsNewIcon />}
                                        />  
                                    ) : (
                                        <Chip
                                            variant="outlined"
                                            size="small"
                                            label="Activer"
                                            onClick={() => handleChangeActivationCompte(utilisateur.id)}
                                            icon={<PowerSettingsNewIcon />}
                                        />                              
                                    )}
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