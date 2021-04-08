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
import ResourceDeleteConfirmationForm from "../../form/app/resourceDeleteConfirmationForm";

import ResourceRepository from '../../../services/ORM/repository/ResourceRepository'
import UserRepository from "../../../services/ORM/repository/userRepository";
import CommentForm from "../../form/app/commentForm";
import CustomModal from "../../modals/Modal";
import {Delete} from "@material-ui/icons";
import Button from "@material-ui/core/Button";

const MyResourcesDisplay = ({AuthHandler}) => {

	const [ resources, setResources ] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const res = await UserRepository.getResources(AuthHandler.user.id,AuthHandler.token)
			setResources(res.data['hydra:member'])
			console.log(resources)
		}

		fetchData()
	} ,[])

	console.log(resources)

	return (
		<div>
			<TableContainer component={Paper}>
				<Table  size="small" aria-label="a dense table">
				<TableHead>
					<TableRow>
						<TableCell>Titre</TableCell>
						<TableCell align="right">Type</TableCell>
						<TableCell align="right">Catégorie</TableCell>
						<TableCell align="right">Créé le</TableCell>
						<TableCell align="right">Modifié le</TableCell>
						<TableCell align="right">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{resources.map(resource => {
						return (
							<TableRow key={resource.id}>
								<TableCell component="th" scope="row">{resource.title}</TableCell>
								<TableCell align="right">{resource.type.label}</TableCell>
								<TableCell align="right">{resource.category.label}</TableCell>
								<TableCell align="right">{resource.createdAt}</TableCell>
								<TableCell align="right">{resource.updatedAt}</TableCell>
								<TableCell align="right">
									<Link to={`/catalogue/${resource.id}`}>
										<MUILink style={{cursor: "pointer"}}>
											{`voir`}
										</MUILink>
									</Link>
									<Link currentResource={resource.id} to={`/profil/ressources/${resource.id}/modifier`} >
										<MUILink style={{cursor: "pointer"}}>
											{`modifier`}
										</MUILink>
									</Link>
									<CustomModal
										btnTitle='supprimer'
									>
										<div style={{
											position: 'absolute',
											left: '50%',
											top: '50%',
											transform: 'translate(-50%, -50%)'
										}}>
											< ResourceDeleteConfirmationForm resourceId = {resource.id} />
										</div>
									</CustomModal>
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

export default connect(mapStateToProps)(MyResourcesDisplay);