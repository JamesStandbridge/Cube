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

import ResourceRepository from '../../../services/ORM/repository/ResourceRepository'

const Resources = ({AuthHandler}) => {

	const [ resources, setResources ] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const res = await ResourceRepository.getNewResources(AuthHandler.token)
			setResources(res.data.resources)
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
						<TableCell align="right">Auteur</TableCell>
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
								<TableCell align="right">{format(Date.parse(resource.createdAt), "d MMM yyyy hh:mm")}</TableCell>
								<TableCell align="right">{resource.updatedAt ? format(Date.parse(resource.updatedAt), "d MMM yyyy hh:mm") : "N/A"}</TableCell>
								<TableCell align="right">
									<MUILink>
										{`${resource.author.firstname} ${resource.author.lastname}`}
									</MUILink>
								</TableCell>
								<TableCell align="right">
									<Link to={`/catalogue/${resource.id}`}>
										<MUILink style={{cursor: "pointer"}}>
											{`voir`}
										</MUILink>
									</Link>
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

export default connect(mapStateToProps)(Resources);