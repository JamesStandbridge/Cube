import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"
import styled from 'styled-components'
import RelationRepository from '../../services/ORM/repository/RelationRepository'

import AsyncSelect from 'react-select/async'
import { components } from 'react-select'

import {
    FormHelperText,
    FormControl,
    MenuItem
} from '@material-ui/core'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'



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

const UserSearch = ({ AuthHandler, onChange }) => {
    const [user, setUser] = useState("");


    const fetchData = (inputValue, callback) => {
        if (!inputValue) {
            callback([]);
        } else {    
            RelationRepository.searchUser(inputValue, AuthHandler.token).then(res => {
                const tempArray = []
                res.data.users.map(userData => {
                    tempArray.push({ value: userData.id, label: userData.text})
                })
                callback(tempArray)
            })
        }
    }

    const onSearchChange = (newUser) => {
        setUser(newUser);
        onChange(newUser.value);
    }

  return (
        <Container>
            <AsyncSelect
                value={user}
                loadOptions={fetchData}
                placeholder="Rechercher un utilisateur"
                onChange={(e) => { onSearchChange(e) }}
                defaultOptions={false}
                components={{ Placeholder, DropdownIndicator }}
                name="user"
            />
        </Container>
    )
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(UserSearch);


const Container = styled.div`
    margin: 10px 0
`