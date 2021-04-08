import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import MUIDataTable from "mui-datatables";
import { connect } from 'react-redux'

import CircularProgress from "@material-ui/core/CircularProgress";

import RelationRepository from '../../../../services/ORM/repository/RelationRepository'


import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import {
	Button,
	IconButton
} from '@material-ui/core'

import PieChart from '../../../stats/components/PieChart'

const RelationTable = ({AuthHandler, refresh}) => {
	const [ relations, setRelations ] = useState([])
	const [ loading, setLoading ] = useState(false);

	const fetchData = async () => {
		const result = await RelationRepository.getRelations(AuthHandler.token)
		setRelations(result.data.relations)
		setLoading(false)
	}

	useEffect(() => {
		setLoading(true)
		fetchData()
	}, [refresh])

	const handleDeleteRelation = (relationID) => {
		RelationRepository.deleteRelation(relationID, AuthHandler.token).then(res => {
			if(res.status === 200) {
				setLoading(true)
				fetchData()
			}
		})
	}

	const columns = [
		{
			name: "firstname",
			label: "Prénom",
			options: {
				filter: false,
				sort: true,
			}
		},
		{
			name: "lastname",
			label: "Nom",
			options: {
				filter: false,
				sort: true,
			}
		},
		{
			name: "label",
			label: "Relation",
			options: {
				filter: true,
				sort: true,
			}
		},
		{
			name: "actions",
			label: "Actions",
			options: {
				filter: false,
				sort: false,
		        customBodyRender: (value, tableMeta, updateValue) => {
					return (
						<IconButton onClick={() => handleDeleteRelation(value)} size="small">
							<PersonAddDisabledIcon />
						</IconButton>
					)
				},
			}
		}
	];

	const options = {
		filterType: "dropdown",
		customToolbarSelect: () => {},
		textLabels: {
			body: {
				noMatch: "Vous n'avez aucune relation",
				toolTip: "Trier",
				columnHeaderTooltip: (column) => `Trier par ${column.label}`,
			},
			pagination: {
				next: "Page suivante",
				previous: "Page précédente",
				rowsPerPage: "Lignes par page:",
				jumpToPage: "Page:",
				displayRows: "of",
			},
			toolbar: {
				search: "Recherche",
				downloadCsv: "Télécharger CSV",
				print: "Imprimer",
				viewColumns: "Montrer colonnes",
				filterTable: "Filter la table",
			},
			filter: {
				all: "Tout",
				title: "FILTERS",
				reset: "REINITIALISER",
			},
			viewColumns: {
				title: "Montrer colonnes",
				titleAria: "Cacher colonnes",
			},
			selectedRows: {
				text: "ligne(s) sélectionnée(s)",
				delete: "Supprimer",
				deleteAria: "Supprimer les lignes sélectionnées",
			},
		},
	};

	const dataTableFormat = () => {
		let newTableData = []
		relations.map(relation => {
			const newRelation = {
				firstname: relation.UserTarget.firstname,
				lastname: relation.UserTarget.lastname,
				label: relation.type.label,
				actions: relation.id,
			}
			newTableData.push(newRelation)
		})

		return newTableData
	}

	const tableData = dataTableFormat();

	const buildSerie = () => {
		let serie = {labels: [], data: []}

		relations.map(relation => {
			const index = serie.labels.findIndex(item => { 
				return item == relation.type.label
			})
			if(index === -1) {
				serie.labels.push(relation.type.label)
				serie.data.push(1)
			} else {
				serie.data[index]++
			}
		})
		console.log(serie)
		return serie
	}

	const data = buildSerie()

	return (
	    <div className={"muiDatatableDiv"} style={{ position: "relative" }}>
	      	{loading && loadingComponent}
			<MUIDataTable
			  title={"Mes relations"}
			  data={tableData}
			  columns={columns}
			  options={options}
			/>

			<PieChart serie={data}/>
		</div>
	)
}

const loadingComponent = (
	<div
		style={{
			position: "absolute",
			zIndex: 110,
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			background: "rgba(255,255,255,0.8)"
		}}
	>
		<CircularProgress
			size={64}
			style={{
				position: "absolute",
				top: "50%",
				left: "50%",
				color: "#3aafa0"
			}}
		/>
	</div>
);

const mapStateToProps = (state) => {
	return state
}

export default connect(mapStateToProps)(RelationTable);