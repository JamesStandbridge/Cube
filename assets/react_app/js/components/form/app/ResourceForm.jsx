import React, {useContext, useEffect, useState} from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    Checkbox,
    TextField,
    Button,
    TextareaAutosize,
    InputLabel,
    Select,
    MenuItem,
    FormControl, makeStyles
} from '@material-ui/core';


import ResourceRepository from "../../../services/ORM/repository/ResourceRepository"

import { wrapComponent } from 'react-snackbar-alert';

import ResourceAttributeRepository from "../../../services/ORM/repository/ResourceAttributeRepository";
import ResourceTypeRepository from "../../../services/ORM/repository/TypeResourceRepository";
import CategoryRepository from "../../../services/ORM/repository/CategoryRepository";



require("../../../../css/resource.css");


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const ResourceForm = wrapComponent(function({createSnackbar, dispatch, AuthHandler}) {

    const classes = useStyles();

    useEffect(() => {
        const init = async () => {
            let resType = await ResourceTypeRepository.getResourceTypesList(AuthHandler.token);
            const resourceTypes = resType.data["hydra:member"];
            setResourceTypeList(resourceTypes);

            let resAttr = await ResourceAttributeRepository.getResourceAttributeList();
            const newResourceAttributes = resAttr.data["hydra:member"];
            setResourceAttributesList(newResourceAttributes);

            let resCat = await CategoryRepository.getCategoriesList();
            const resourceCategories = resCat.data["hydra:member"];
            setResourceCategoryList(resourceCategories);
        }
        init()
    }, [])

    const [ resourceAttributes, setResourceAttributesList ] = useState([])
    const [resourceTypeList, setResourceTypeList] = useState([])
    const [resourceCategoryList, setResourceCategoryList] = useState([]);

    const [ resourceType, setResourceType ] = useState( '')
    const [ resourceAttribute, setResourceAttribute ] = useState( '')
    const [ resourceCategory, setResourceCategory ] = useState( '')


    const [ resource, setResource ] = useState({
        title: {value: "", error: ""},
        createdAt: {value: new Date()},
        author:{value: `/api/users/${AuthHandler.user.id}`},
        type: {
            value:"",
            attributes: {value: ""},
        },
        category: { value:""},
        content: {
            stringValue: {value: ""},
            textValue: {value: ""},
            attribute:{value: ""}
        }
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
        setResource(
            {
            ...resource,
                title: {...resource.title, value, error: ""},
                content: {
                    stringValue: {...resource.content.stringValue, value},
                    textValue: {...resource.content.textValue, value}
                }
            }
        )
    }

    const handleChangeType = (event) => {
        setResourceType(event.target.value)
        console.log((event.target.value))
    }

    const handleChangeAttribute = (event) => {
        setResourceAttribute(event.target.value)
        console.log((event.target.value))
    }

    const handleChangeCategory = (event) => {
        setResourceCategory(event.target.value)
        console.log((event.target.value))
    }

    const handleSubmit = () => {

            const resourceToSend = {
                author:resource.author.value,
                title: resource.title.value,
                type: `api/resource_types/${resourceType}`,
                createdAt: resource.createdAt.value,
                content: [
                    {
                        stringValue: resource.content.stringValue.value,
                        textValue: resource.content.textValue.value,
                        attribute: `api/resource_attributes/${resourceAttribute}`
                    }
                ],
                category: `api/categories/${resourceCategory}`
            }

        ResourceRepository.create(resourceToSend,AuthHandler.token).then(res => {
            showSnackbar('success', "Nouvelle ressource enregistrée")
        })
    }

    const validateForm = () => {
        let bool = true

        if(resource.title.value.trim().length === 0) {
            bool = false
            setResource({...resource, title: {...resource.title, error: "Le title est requis"}})
        }

        return bool
    }

    return (
        <div >

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

            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="resourceType-label">Type</InputLabel>
                <Select
                    labelId="resourceType-label"
                    id="resourceType"
                    value={resourceType}
                    onChange={handleChangeType}
                    label="resourceType"
                >
                    {
                        resourceTypeList.map(
                            resourceType =>(
                                <MenuItem key={resourceType.id}
                                          value={resourceType.id}
                                >
                                    {resourceType.label}
                                </MenuItem>
                            )
                        )
                    }
                </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="resourceAttribute-label">resourceAttribute</InputLabel>
                <Select
                    labelId="resourceAttribute-label"
                    id="resourceAttribute"
                    value={resourceAttribute}
                    onChange={handleChangeAttribute}
                    label="resourceAttribute"
                >
                    {
                        resourceAttributes.map(
                            resourceAttribute => (
                                <MenuItem key={resourceAttribute.id}
                                          value={resourceAttribute.id}
                                >
                                    {resourceAttribute.label}
                                </MenuItem>
                            )
                        )
                    }
                </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="resourceCategory-label">resourceCategory</InputLabel>
                <Select
                    labelId="resourceCategory-label"
                    id="resourceCategory"
                    value={resourceCategory}
                    onChange={handleChangeCategory}
                    label="resourceCategory"
                >
                    {
                        resourceCategoryList.map(
                            resourceCategory =>(
                                <MenuItem key={resourceCategory.id}
                                          value={resourceCategory.id}
                                >
                                    {resourceCategory.label}
                                </MenuItem>
                            )
                        )
                    }
                </Select>
            </FormControl>

                <TextareaAutosize
                    title="ContentText"
                    variant="outlined"
                    onChange={handleChange}
                    size="small"
                />

                <TextField
                    title="ContentString"
                    type="file"
                    variant="outlined"
                    onChange={handleChange}

                    size="small"
                />

            <Button
                onClick={handleSubmit}
                color='primary'
                variant="contained"
            >
                Envoyer
            </Button>

        </div>
    )
})

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(ResourceForm)




