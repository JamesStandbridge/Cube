
/**
 * Author: ManonSeznec
 * Date: 08/04/2021
 */

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { Redirect } from 'react-router-dom'
import {
    TextField,
    Button,
    InputLabel,
    Select,
    makeStyles, Input, Chip, Icon, Fab, CardActions, CardContent, Card, OutlinedInput, ButtonGroup, Tooltip
} from '@material-ui/core';

import { wrapComponent } from 'react-snackbar-alert'

import MediaObjectRepository from "../../../services/ORM/repository/mediaObjectRepository";

require("../../../../css/resource.css");

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },

    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },

    fieldroot: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    fieldmargin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}));

const MediaForm = wrapComponent(function({ createSnackbar, refresh, AuthHandler, onCloseModal}) {

    const classes = useStyles();
   /* const [mediaObject, setMediaObject] = useState([{
       file: null
    }]);*/
    const [selectedFile, setSelectedFile] = useState(null);


    const handleCapture = ({ target }) => {
        setSelectedFile(target.files[0])

    }

    console.log(selectedFile)
    function showSnackbar(theme, message) {
        createSnackbar({
            message: message,
            dismissable: true,
            pauseOnHover: true,
            theme: theme,
        });
    }

    const handleSubmit = () => {
        const data = new FormData()
        data.append('file', selectedFile)
        let url = "http://localhost:8002/contentUrl";
        MediaObjectRepository.upload(data,AuthHandler.token).then(res => {
            showSnackbar('success', "Nouvelle ressource enregistrée")
            if(res.status === 201) {
                onCloseModal()
                refresh()
            }
        }).then(res => {
            console.log(res.data.id);
            return res.data
        })
    }

    return (

        <div style={{
        position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
    }}>
                    <Card className={classes.root}>
                        <CardContent>
                                <InputLabel htmlFor="mediaObject" >
                                    <Input
                                        id="mediaObject"
                                        name="mediaObject"
                                        inputProps={{
                                            accept:
                                                "*",
                                        }}
                                        onChange={handleCapture}
                                        type="file"
                                    />
                                    Importer un fichier ou une image
                                </InputLabel>
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => handleSubmit()} color="primary" variant="contained">
                                Télécharger
                            </Button>
                        </CardActions>
                    </Card>
        </div>
    )
})

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(MediaForm)



