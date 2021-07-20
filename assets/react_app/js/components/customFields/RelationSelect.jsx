import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"
import styled from 'styled-components'
import RelationRepository from '../../services/ORM/repository/RelationRepository'

import Select, { components } from 'react-select';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'



const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const Placeholder = props => {
    return <components.Placeholder {...props} />
}
const DropdownIndicator = props => {
    return (
        <components.DropdownIndicator {...props}>
            <ArrowDropDownIcon />
        </components.DropdownIndicator>
    )
}

const RelationSelect = ({AuthHandler, onChange, value}) => {

	const [ relations, setRelations ] = useState([])

	useEffect(() => {

		const fetchData = async () => {
			const nextRelations = await RelationRepository.getRelationTypes(AuthHandler.token)
			const nextRelationsResult = nextRelations.map(relationData => {
				return {value: relationData.id, label: relationData.label}
			})
			setRelations(nextRelationsResult)
		};

		fetchData();
	}, [])

	const handleChange = (relation) => {
		onChange(relation)
	}

	return (
		<Container>
			<Select
				defaultValue={relations[0]}
				onChange={handleChange}
				value={value}
				isLoading={false}
				isClearable={false}
				isSearchable={true}
				name="relation"
				placeholder="Selectionnez un type de relation"
				options={relations}
				components={{ Placeholder, DropdownIndicator }}
			/>
		</Container>
	)
}

const mapStateToProps = (state) => {
	return state
}

export default connect(mapStateToProps)(RelationSelect);

const Container = styled.div`
	margin: 10px 0
`