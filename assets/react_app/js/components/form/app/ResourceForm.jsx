import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import ResourceRepository from "../../../services/ORM/repository/ResourceRepository"

import { wrapComponent } from 'react-snackbar-alert';

require("../../../../css/resource.css");

const ResourceForm = wrapComponent(function({createSnackbar, dispatch, AuthHandler}) {
    const [ resource, setResource ] = useState({
        title: {value: "", error: ""}
    })
    const [ type, setType ] = useState({
        label: {value: "", error: ""},
    })
    const [ attribute, setAttribute ] = useState({
        label: {value: "", error: ""},
    })
    const [ content, setContent ] = useState({
        stringValue: {value: "", error: ""},
        textValue: {value: "", error: ""},
        imageValue: {value: "", error: ""}
    })

    function showSnackbar(theme, message) {
        createSnackbar({
            message: message,
            dismissable: true,
            pauseOnHover: true,
            theme: theme,
        });
    }

    const handleChange = (event) => {
        const value = event.currentTarget.value
        setResource({...resource, title: {...resource.title, value, error: ""},
            content:{...resource.content, value, error:""}})
    }

    const handleSubmit = () => {
        if(validateForm()) {
            const resourceToSend = {
                title: resource.title.value
            }

            ResourceRepository.create(resourceToSend, AuthHandler.token).then(res => {
                showSnackbar('success', "Nouvelle ressource enregistrée");
            })
        }
    }

    const validateForm = () => {
        let bool = true

        if(resource.title.value.trim().length === 0) {
            bool = false
            setResource({...resource, title: {...resource.title, error: "Le title est incorrect"}})
        }

        return bool
    }

    return (
        <div>
            {
                resource.title.error !== "" ? (
                    <TextField
                        error
                        title="Title"
                        variant="outlined"
                        onChange={handleChange}
                        helperText={resource.title.error}
                        size="small"
                    />
                ) : (
                    <TextField
                        title="Title"
                        variant="outlined"
                        onChange={handleChange}
                        size="small"
                    />
                )}
            {
                resource.content.error !== "" ? (
                    <TextField
                        error
                        title="Content"
                        variant="outlined"
                        onChange={handleChange}
                        helperText={resource.content.error}
                        size="small"
                    />
                ) : (
                    <TextField
                        title="TitleContent"
                        variant="outlined"
                        onChange={handleChange}
                        size="small"
                    />
                )
            }


            <Button
                onClick={handleSubmit}
                color='primary'
                variant="contained"
            >
                Confirmer
            </Button>
        </div>
    )
})

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(ResourceForm)



