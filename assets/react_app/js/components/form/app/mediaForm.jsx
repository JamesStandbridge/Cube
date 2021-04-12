import React, {useContext, useEffect, useState} from 'react'
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import { Redirect } from 'react-router-dom';
import {
    Checkbox,
    TextField,
    Button,
    TextareaAutosize,
    InputLabel,
    Select,
    MenuItem,
    FormControl, makeStyles, Input, Chip, Icon, Fab, CardActions, CardContent, Card, OutlinedInput, ButtonGroup, Tooltip
} from '@material-ui/core';


import ResourceRepository from "../../../services/ORM/repository/ResourceRepository"

import { wrapComponent } from 'react-snackbar-alert';

import ResourceAttributeRepository from "../../../services/ORM/repository/ResourceAttributeRepository";
import ResourceTypeRepository from "../../../services/ORM/repository/TypeResourceRepository";
import CategoryRepository from "../../../services/ORM/repository/CategoryRepository";
import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/table';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';
import 'tinymce/skins/content/default/content.min.css';
import { Editor } from '@tinymce/tinymce-react';
import clsx from "clsx";
import {PhotoCamera} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
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



